'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FloodScenario, UserProfile } from '@/types';
import { 
  ArrowRightIcon, 
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  CloudIcon,
  
} from '@heroicons/react/24/outline';

export default function ScenarioBuilderPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [scenario, setScenario] = useState<Partial<FloodScenario>>({
    name: 'Custom Scenario',
    location: {
      lat: -41.7506,
      lng: 171.6070,
      name: 'Westport, New Zealand'
    },
    catchment: 'buller-river',
    parameters: {
      rainfall: 25,
      riverLevel: 2,
      soilSaturation: 60,
      urbanization: 80,
      drainageCapacity: 70,
      timeOfYear: 'wet',
      duration: 6,
      intensity: 'moderate'
    },
    riskLevel: 'moderate'
  });
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    // Load user profile
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      setUserProfile(JSON.parse(stored));
    } else {
      router.push('/user-profile');
    }
  }, [router]);

  const updateParameter = (param: string, value: any) => {
    setScenario(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters!,
        [param]: value
      }
    }));
    
    // Mark as modified if a preset was selected
    if (selectedPreset) {
      setIsModified(true);
    }
  };

  const updateCatchment = (value: string) => {
    setScenario(prev => ({
      ...prev,
      catchment: value
    }));
  };

  const calculateRiskLevel = () => {
    const params = scenario.parameters!;
    const score = (
      (params.rainfall / 100) * 0.3 +
      (params.riverLevel / 10) * 0.25 +
      (params.soilSaturation / 100) * 0.2 +
      (params.urbanization / 100) * 0.15 +
      ((100 - params.drainageCapacity) / 100) * 0.1
    );

    if (score < 0.3) return 'low';
    if (score < 0.6) return 'moderate';
    if (score < 0.8) return 'high';
    return 'critical';
  };

  useEffect(() => {
    const riskLevel = calculateRiskLevel();
    setScenario(prev => ({ ...prev, riskLevel }));
  }, [scenario.parameters]);

  const handleSubmit = () => {
    const finalScenario: FloodScenario = {
      ...scenario as FloodScenario,
      id: Date.now().toString()
    };

    localStorage.setItem('floodScenario', JSON.stringify(finalScenario));
    router.push('/game');
  };

  const presetScenarios = [
    {
      name: 'Buller River Floods 2021 ',
      description: 'Rainfall and storm surge causing flooding in Buller River catchment',
      parameters: {
        rainfall: 50,
        riverLevel: 1,
        soilSaturation: 40,
        urbanization: 90,
        drainageCapacity: 60,
        timeOfYear: 'wet' as const,
        duration: 3,
        intensity: 'high' as const
      }
    },
    {
      name: 'Buller River Floods 2022',
      description: 'Rainfall and storm surge causing flooding in Buller River catchment',
      parameters: {
        rainfall: 15,
        riverLevel: 5,
        soilSaturation: 80,
        urbanization: 30,
        drainageCapacity: 80,
        timeOfYear: 'wet' as const,
        duration: 12,
        intensity: 'moderate' as const
      }
    }
  ];

  const applyPreset = (preset: typeof presetScenarios[0]) => {
    setScenario(prev => ({
      ...prev,
      name: preset.name,
      parameters: preset.parameters
    }));
    setSelectedPreset(preset.name);
    setIsModified(false);
  };

  const resetToCustom = () => {
    setSelectedPreset(null);
    setIsModified(false);
    setScenario(prev => ({
      ...prev,
      name: 'Custom Scenario'
    }));
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <AdjustmentsHorizontalIcon className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Flood Scenario
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose preset scenarios or customise parameters to create a realistic flood situation. 
            These settings will determine the conditions you'll face in the simulation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scenario Configuration */}
          <div className="lg:col-span-2 space-y-8">
            {/* Preset Scenarios */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="game-card"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Scenario Parameters
                </h2>
                {selectedPreset && (
                  <button
                    onClick={resetToCustom}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Start from scratch
                  </button>
                )}
              </div>
              
              {/* Quick Start Presets Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Start Presets
                </h3>
                
                {/* Current scenario status */}
                {selectedPreset && (
                  <div className={`mb-4 p-3 rounded-lg border ${
                    isModified 
                      ? 'bg-orange-50 border-orange-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isModified ? (
                        <>
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm font-medium text-orange-800">
                            Modified "{selectedPreset}" - Your custom variation
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-blue-800">
                            Using preset: "{selectedPreset}"
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              
                <div className="grid md:grid-cols-3 gap-4">
                  {presetScenarios.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyPreset(preset)}
                      className={`p-4 border-2 rounded-lg transition-all text-left ${
                        selectedPreset === preset.name && !isModified
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{preset.name}</h3>
                      <p className="text-sm text-gray-600">{preset.description}</p>
                    </button>
                  ))}
                  
                  {/* More to come placeholder */}
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center text-center min-h-[120px]">
                    <div className="text-gray-400 mb-2">
                      <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-500 mb-1">More Scenarios</h3>
                    <p className="text-xs text-gray-400">Additional flood scenarios are coming soon</p>
                  </div>
                </div>
              </div>

              {/* Environmental Parameters - Connected to Presets */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <CloudIcon className="h-5 w-5" />
                    Customize Environmental Conditions
                  </h3>
                  {!selectedPreset && (
                    <div className="text-sm text-gray-500 font-medium">
                      Custom Scenario
                    </div>
                  )}
                </div>
                
                {/* Instructions */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {selectedPreset 
                      ? `Adjust the parameters below to modify the "${selectedPreset}" scenario. Changes will create your custom variation.`
                      : 'Configure the environmental conditions to create your custom flood scenario.'
                    }
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rainfall Intensity: {scenario.parameters?.rainfall} mm/hour
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={scenario.parameters?.rainfall || 0}
                      onChange={(e) => updateParameter('rainfall', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Light</span>
                      <span>Moderate</span>
                      <span>Heavy</span>
                      <span>Extreme</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      River Level: {scenario.parameters?.riverLevel} meters above normal
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={scenario.parameters?.riverLevel || 0}
                      onChange={(e) => updateParameter('riverLevel', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Soil Saturation: {scenario.parameters?.soilSaturation}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={scenario.parameters?.soilSaturation || 0}
                      onChange={(e) => updateParameter('soilSaturation', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urbanization Level: {scenario.parameters?.urbanization}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={scenario.parameters?.urbanization || 0}
                      onChange={(e) => updateParameter('urbanization', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Drainage Capacity: {scenario.parameters?.drainageCapacity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={scenario.parameters?.drainageCapacity || 0}
                      onChange={(e) => updateParameter('drainageCapacity', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Season
                      </label>
                      <select
                        value={scenario.parameters?.timeOfYear || 'wet'}
                        onChange={(e) => updateParameter('timeOfYear', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="wet">Wet Season</option>
                        <option value="dry">Dry Season</option>
                        <option value="transition">Transition</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration: {scenario.parameters?.duration} hours
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="24"
                        value={scenario.parameters?.duration || 6}
                        onChange={(e) => updateParameter('duration', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Catchment Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="game-card"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <MapPinIcon className="h-6 w-6" />
                Catchment
              </h2>
              <div className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Catchment/Flood Prone Area *
                  </label>
                  <div className="space-y-3">
                    {[
                      {
                        value: 'buller-river',
                        name: 'Buller River Catchment',
                        description: 'Main river system - high flood risk during heavy rainfall',
                        risk: 'High'
                      }
                    ].map((catchment) => (
                      <label
                        key={catchment.value}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all block ${
                          scenario.catchment === catchment.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="catchment"
                          value={catchment.value}
                          checked={scenario.catchment === catchment.value}
                          onChange={(e) => updateCatchment(e.target.value)}
                          className="sr-only"
                          required
                        />
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{catchment.name}</div>
                            <div className="text-sm text-gray-600 mt-1">{catchment.description}</div>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            catchment.risk === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {catchment.risk} Risk
                          </div>
                        </div>
                      </label>
                    ))}
                    
                    {/* More catchments coming soon */}
                    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center text-center">
                      <div className="flex-1">
                        <div className="text-gray-400 mb-2">
                          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <div className="font-medium text-gray-500 mb-1">More Catchments</div>
                        <div className="text-xs text-gray-400">Additional flood-prone areas coming soon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Risk Assessment Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="game-card sticky top-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                {/* <WaterIcon className="h-6 w-6" /> */}
                Risk Assessment
              </h2>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                    scenario.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                    scenario.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    scenario.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {scenario.riskLevel?.toUpperCase()} RISK
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Scenario Summary</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {scenario.parameters?.rainfall} mm/hour rainfall</li>
                    <li>• River +{scenario.parameters?.riverLevel}m above normal</li>
                    <li>• {scenario.parameters?.soilSaturation}% soil saturation</li>
                    <li>• {scenario.parameters?.urbanization}% urbanized area</li>
                    <li>• {scenario.parameters?.drainageCapacity}% drainage capacity</li>
                    <li>• {scenario.parameters?.duration} hour duration</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">What to Expect</h3>
                  <p className="text-sm text-blue-800">
                    {scenario.riskLevel === 'low' && 'Minor flooding possible in low-lying areas. Standard precautions recommended.'}
                    {scenario.riskLevel === 'moderate' && 'Moderate flooding likely. Residents should prepare for potential evacuations.'}
                    {scenario.riskLevel === 'high' && 'Significant flooding expected. Emergency preparations should begin immediately.'}
                    {scenario.riskLevel === 'critical' && 'Severe flooding imminent. Immediate evacuation may be necessary.'}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="w-full game-button flex items-center justify-center gap-2"
                >
                  Start Simulation
                  <ArrowRightIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
