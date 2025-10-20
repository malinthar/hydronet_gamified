'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FloodScenario, UserProfile, GameAction } from '@/types/index';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  DevicePhoneMobileIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function GamePage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [scenario, setScenario] = useState<FloodScenario | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameActions, setGameActions] = useState<GameAction[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [actionLogOpen, setActionLogOpen] = useState(false);
  
  // Emergency action options
  const emergencyActions = [
    { id: 'call-emergency', label: 'Call Emergency Services', icon: '🚨', description: 'Contact 111 for immediate emergency assistance' },
    { id: 'contact-family', label: 'Check on Family/Neighbors', icon: '👪', description: 'Ensure loved ones are safe and informed' },
    { id: 'evacuate', label: 'Evacuate Area', icon: '🚗', description: 'Leave flood-prone area immediately' },
    { id: 'shelter', label: 'Seek Higher Ground', icon: '🏔️', description: 'Move to designated safe area or higher ground' },
    { id: 'prepare-home', label: 'Secure Property', icon: '🏠', description: 'Protect home with sandbags or barriers' },
    { id: 'gather-supplies', label: 'Gather Emergency Supplies', icon: '🎒', description: 'Collect food, water, medications, etc.' },
    { id: 'monitor-updates', label: 'Monitor Official Updates', icon: '📱', description: 'Stay informed via emergency broadcasts' },
    { id: 'help-others', label: 'Assist Vulnerable People', icon: '🤝', description: 'Help elderly, disabled, or those with children' }
  ];

  useEffect(() => {
    // Create default user profile and scenario for demo
    const defaultProfile: UserProfile = {
      id: 'demo-user',
      userCategory: 'general-resident',
      floodExperience: 'none',
      location: 'Westport',
      age: 30,
      occupation: 'other',
      techProficiency: 'intermediate',
      educationLevel: 'bachelor',
      createdAt: new Date()
    };

    const defaultScenario: FloodScenario = {
      id: 'demo-scenario',
      name: 'Westport Flash Flood',
      location: { name: 'Westport, New Zealand', lat: -41.7506, lng: 171.6075 },
      riskLevel: 'high',
      catchment: 'Buller River',
      parameters: {
        rainfall: 50,
        riverLevel: 2.5,
        soilSaturation: 85,
        urbanization: 65,
        drainageCapacity: 40,
        timeOfYear: 'wet',
        duration: 6,
        intensity: 'high'
      }
    };

    setUserProfile(defaultProfile);
    setScenario(defaultScenario);
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setStartTime(new Date());
  };

  const recordAction = (actionId: string) => {
    const action = emergencyActions.find(a => a.id === actionId);
    if (!action) return;
    
    const newAction: GameAction = {
      id: `${Date.now()}`,
      actionId: actionId,
      actionLabel: action.label,
      timestamp: new Date(),
      scenarioId: scenario?.id || '',
      userId: userProfile?.id || ''
    };
    
    setGameActions(prev => [...prev, newAction]);
  };
  
  const toggleActionLog = () => {
    setActionLogOpen(prev => !prev);
  };

  const endGame = () => {
    // Save game session data locally for reference
    const gameSession = {
      id: Date.now().toString(),
      userProfile: userProfile!,
      scenario: scenario!,
      actions: gameActions,
      startTime: startTime!,
      endTime: new Date()
    };
    
    localStorage.setItem('gameSession', JSON.stringify(gameSession));
    
    // Open Google Form in a new tab for feedback
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdnRb0S8cP6aprOTOMtbpeSVSLHjf4tW-fNA4e4BVHBOwRHiw/viewform?usp=header'; // Replace with your actual Google Form URL
    window.open(googleFormUrl, '_blank');
    
    // Optionally redirect to a thank you page or home
    router.push('/');
  };

  const goBackToScenario = () => {
    router.push('/scenario-builder');
  };

  if (!userProfile || !scenario) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Main game interface with embedded app */}
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Raining background effect - no white overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Darker background to make rain pop */}
          <div className="absolute inset-0 bg-slate-900"></div>
          
          {/* Full opacity rain animation */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url("https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExajIzc2oxODEyNGFqZjZ3b281aHVzNTZoMGZqOTl3eG4wYnE1dm9yYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tnPxFTth7qoDiw1rnm/giphy.gif")`,
              backgroundBlendMode: 'screen',
              opacity: 1
            }} 
          />
        </div>
          
          {/* Game Header */}
          <div className="bg-gradient-to-r from-blue-800 to-indigo-900 border-b border-blue-700 px-2 sm:px-6 py-2 sm:py-4 shadow-lg relative z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div className="bg-blue-600 p-1 sm:p-2 rounded-full shadow-inner shadow-blue-500/50 flex-shrink-0">
                  <DevicePhoneMobileIcon className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm sm:text-xl font-bold text-white truncate">
                      <span className="hidden sm:inline">Flood Response Simulation</span>
                      <span className="sm:hidden">Flood Simulation</span>
                    </h1>
                    <span className="px-2 py-1 rounded-full bg-blue-600/30 text-blue-100 text-xs font-medium border border-blue-500/50 hidden lg:inline">LIVE</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-200 truncate">{scenario.name} • {scenario.location.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-4 flex-shrink-0">
                <div className="flex items-center gap-1 bg-blue-800/50 py-1 px-2 rounded-full text-xs text-blue-200 border border-blue-700/50 hidden sm:flex">
                  <ClockIcon className="h-3 w-3 animate-pulse" />
                  <span>Active</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={endGame}
                  className="px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-lg border border-red-500/50 hover:shadow-red-700/20 text-xs sm:text-sm whitespace-nowrap"
                >
                  End
                </motion.button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-transparent p-3 sm:p-6 relative z-10">
            <div className="max-w-7xl mx-auto h-full">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6 h-full">
                
                {/* Mobile App Embed Area */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg shadow-lg h-full flex flex-col border border-blue-800">
                    <div className="p-3 sm:p-4 border-b border-blue-800 flex items-center justify-between">
                      <h2 className="font-semibold text-blue-300 text-sm sm:text-base">Flood Forecasting App</h2>
                      <div className="text-xs sm:text-sm text-blue-200 hidden sm:block">Westport, New Zealand</div>
                    </div>
                    
                    {/* App Integration Options */}
                    <div className="flex-1 sm:p-6 flex items-center justify-center">
                      <div className="text-center space-y-3 sm:space-y-6 w-full">
                        
                        {/* Embedded flood forecasting app iframe */}
                        <div className="w-full h-[750px] sm:h-[600px] lg:h-[800px] border border-blue-700 rounded-lg overflow-hidden shadow-lg bg-slate-900/90">
                          <div className="w-full h-full p-1 border border-blue-900 rounded-lg overflow-hidden">
                            <iframe 
                              src={"https://hydronet-eta.vercel.app/"}
                              className="w-full h-full border-0 rounded-lg"
                              title="Flood Forecasting App"
                              sandbox="allow-same-origin allow-scripts allow-forms"
                              style={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)', /* slate-900 with opacity */
                                boxShadow: 'inset 0 0 20px rgba(37, 99, 235, 0.2)'
                              }}
                            />
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-8 text-center hidden sm:block">
                          <div className="p-3 sm:p-4 bg-blue-900/40 rounded-lg inline-block border border-blue-800">
                            <p className="text-xs text-blue-200 mt-1">
                              You can adjust simulation parameters by modifying the scenario settings
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Sidebar */}
                <div className="lg:col-span-1 space-y-3 sm:space-y-6 order-1 lg:order-2">
                  
                  {/* Mission Objectives */}
                  <div className="bg-slate-900/70 backdrop-blur-sm rounded-lg p-3 sm:p-5 shadow-lg border border-blue-800">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <h3 className="font-bold text-blue-300 text-sm sm:text-base">Mission Objectives</h3>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm">
                      <li className="flex items-start gap-2">
                        <div className="bg-indigo-800 text-indigo-200 rounded-full p-1 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-blue-100">Use the app to see flood impact forecasts at your location</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-indigo-800 text-indigo-200 rounded-full p-1 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-blue-100">Select emergency actions based on the information gained from the app</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-indigo-800 text-indigo-200 rounded-full p-1 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-blue-100">Complete the survey</span>
                      </li>
                    </ul>
                  </div>

                  {/* Current Scenario - Hidden */}
                  <div className="hidden bg-slate-900/70 backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-5 border border-blue-800">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <h3 className="font-bold text-blue-300 text-sm sm:text-base">Mission Parameters</h3>
                    </div>
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                      <div className="flex justify-between items-center pb-2 border-b border-blue-800">
                        <span className="text-blue-300">Risk Level:</span>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                          scenario.riskLevel === 'low' ? 'bg-green-900/70 text-green-200 border border-green-700' :
                          scenario.riskLevel === 'moderate' ? 'bg-yellow-900/70 text-yellow-200 border border-yellow-700' :
                          scenario.riskLevel === 'high' ? 'bg-orange-900/70 text-orange-200 border border-orange-700' :
                          'bg-red-900/70 text-red-200 border border-red-700'
                        }`}>
                          {scenario.riskLevel.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-blue-800">
                        <span className="text-blue-300">Rainfall:</span>
                        <span className="font-semibold text-blue-100">{scenario.parameters.rainfall} mm/hr</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-blue-800">
                        <span className="text-blue-300">River Level:</span>
                        <span className="font-semibold text-blue-100">+{scenario.parameters.riverLevel}m</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-blue-800">
                        <span className="text-blue-300">Duration:</span>
                        <span className="font-semibold text-blue-100">{scenario.parameters.duration} hours</span>
                      </div>
                    </div>
                  </div>

                  {/* User Context - Hidden */}
                  <div className="hidden bg-slate-900/70 backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-5 border border-blue-800">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <h3 className="font-bold text-blue-300 text-sm sm:text-base">Your Role</h3>
                    </div>
                    <div className="bg-blue-900/50 rounded-lg p-3 border border-blue-700">
                      <p className="text-blue-100 font-medium text-xs sm:text-sm">
                        You are a <span className="font-bold text-blue-200 uppercase">{userProfile.userCategory.replace('-', ' ')}</span> 
                        {userProfile.floodExperience !== 'none' && (
                          <span className="block mt-1 text-xs sm:text-sm">Experience Level: <span className="font-semibold">{userProfile.floodExperience}</span></span>
                        )}
                      </p>
                    </div>
                    <div className="mt-3 text-xs text-blue-400 italic">Your decisions impact community safety</div>
                  </div>

                  {/* Emergency Actions Panel */}
                  <div className="bg-slate-900/70 backdrop-blur-sm rounded-lg p-3 sm:p-5 shadow-lg border border-blue-800">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <h3 className="font-bold text-blue-300 text-sm sm:text-base">Emergency Actions</h3>
                      </div>
                      <button 
                        onClick={toggleActionLog}
                        className="text-xs text-blue-300 bg-blue-900/40 px-2 py-1 rounded border border-blue-800 hover:bg-blue-800/50"
                      >
                        {actionLogOpen ? 'Hide Log' : 'View Log'}
                      </button>
                    </div>
                    
                    {actionLogOpen ? (
                      <div className="space-y-3">
                        <p className="text-xs text-blue-200 mb-2">Action History:</p>
                        {gameActions.length === 0 ? (
                          <p className="text-xs text-blue-400 italic">No actions taken yet</p>
                        ) : (
                          <div className="max-h-32 sm:max-h-40 overflow-y-auto pr-1 space-y-2">
                            {gameActions.map((action) => (
                              <div key={action.id} className="border-l-2 border-blue-700 pl-2 py-1">
                                <p className="text-xs text-blue-100 font-medium">{action.actionLabel}</p>
                                <p className="text-xs text-blue-400">
                                  {new Date(action.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={toggleActionLog}
                          className="w-full text-xs bg-blue-900/40 py-1 rounded border border-blue-800 text-blue-300 mt-2"
                        >
                          Return to Actions
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {emergencyActions.map((action) => (
                          <button
                            key={action.id}
                            onClick={() => recordAction(action.id)}
                            className="flex flex-col items-center justify-center gap-1 bg-slate-800/80 hover:bg-slate-700/80 border border-blue-800 rounded p-2 transition-colors group min-h-[60px] sm:min-h-[70px]"
                          >
                            <span className="text-sm sm:text-lg">{action.icon}</span>
                            <span className="text-xs text-blue-200 text-center font-medium leading-tight group-hover:text-blue-100">
                              {action.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Instructions - Hidden on small screens */}
                  <div className="hidden sm:block bg-slate-900/70 backdrop-blur-sm rounded-lg p-5 shadow-lg border border-blue-800">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <h3 className="font-bold text-blue-300">Mission Objectives</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="bg-indigo-800 text-indigo-200 rounded-full p-1 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-blue-100">Use the app to check flood impact forecasts &amp; risks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-indigo-800 text-indigo-200 rounded-full p-1 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-blue-100">Take appropriate emergency actions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-indigo-800 text-indigo-200 rounded-full p-1 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-blue-100">Complete mission debrief</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}