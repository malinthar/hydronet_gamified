'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserProfile } from '@/types';
import { ArrowRightIcon, UserIcon } from '@heroicons/react/24/outline';

export default function UserProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    userCategory: 'general-resident',
    age: 25,
    occupation: '',
    location: '',
    floodExperience: 'none',
    techProficiency: 'intermediate',
    educationLevel: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create user profile with ID and timestamp
    const userProfile: UserProfile = {
      ...formData as UserProfile,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    // Store in localStorage for this demo
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // Navigate to scenario builder
    router.push('/scenario-builder');
  };

  const updateField = (field: keyof UserProfile, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <UserIcon className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tell Us About Yourself
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This information helps us understand different user perspectives and improve flood warning systems for everyone.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="game-card space-y-8"
        >
          {/* User Category */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Which category best describes you? *
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { 
                  value: 'emergency-professional', 
                  label: 'Emergency Management Professional', 
                  desc: 'Emergency managers, first responders, disaster coordinators'
                },
                { 
                  value: 'flood-professional', 
                  label: 'Flood/Water Management Professional', 
                  desc: 'Hydrologists, meteorologists, water resource managers'
                },
                { 
                  value: 'local-authority', 
                  label: 'Local Authority/Government Official', 
                  desc: 'Municipal officials, planners, policy makers'
                },
                { 
                  value: 'general-resident', 
                  label: 'General Resident', 
                  desc: 'Community member not in high-risk flood area'
                },
                { 
                  value: 'at-risk-resident', 
                  label: 'At-Risk Resident', 
                  desc: 'Living in flood-prone area or previously affected'
                }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.userCategory === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="userCategory"
                    value={option.value}
                    checked={formData.userCategory === option.value}
                    onChange={(e) => updateField('userCategory', e.target.value)}
                    className="sr-only"
                    required
                  />
                  <div className="font-medium text-gray-900 mb-1">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Questions */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Experience & Background
            </h3>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                How much experience do you have with floods? *
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { value: 'none', label: 'No direct experience', desc: 'Never experienced flooding' },
                  { value: 'minimal', label: 'Minimal experience', desc: 'Heard about floods or minor exposure' },
                  { value: 'moderate', label: 'Moderate experience', desc: 'Experienced flooding once or twice' },
                  { value: 'extensive', label: 'Extensive experience', desc: 'Multiple flood experiences or professional involvement' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.floodExperience === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="floodExperience"
                      value={option.value}
                      checked={formData.floodExperience === option.value}
                      onChange={(e) => updateField('floodExperience', e.target.value)}
                      className="sr-only"
                    />
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                How would you rate your technology proficiency? *
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { value: 'beginner', label: 'Beginner', desc: 'Basic smartphone/computer use' },
                  { value: 'intermediate', label: 'Intermediate', desc: 'Comfortable with most apps and websites' },
                  { value: 'advanced', label: 'Advanced', desc: 'Very comfortable with technology' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center ${
                      formData.techProficiency === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="techProficiency"
                      value={option.value}
                      checked={formData.techProficiency === option.value}
                      onChange={(e) => updateField('techProficiency', e.target.value)}
                      className="sr-only"
                    />
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Privacy Notice:</strong> This information is collected for research purposes only. 
              Your data will be anonymized and used solely to improve flood warning systems. 
              You can withdraw at any time.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="game-button flex items-center gap-2 text-lg px-8 py-4"
            >
              Continue to Scenario Builder
              <ArrowRightIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
