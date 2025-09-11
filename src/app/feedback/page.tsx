'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GameSession } from '@/types';
import { 
  ArrowRightIcon, 
  StarIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function FeedbackPage() {
  const router = useRouter();
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [feedback, setFeedback] = useState({
    overallRating: 0,
    appUsability: 0,
    informationClarity: 0,
    decisionSupport: 0,
    improvements: '',
    experience: '',
    wouldRecommend: '',
    additionalComments: ''
  });

  useEffect(() => {
    const storedSession = localStorage.getItem('gameSession');
    if (storedSession) {
      setGameSession(JSON.parse(storedSession));
    } else {
      router.push('/');
    }
  }, [router]);

  const handleRatingChange = (category: string, rating: number) => {
    setFeedback(prev => ({
      ...prev,
      [category]: rating
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save feedback data
    const feedbackData = {
      gameSession,
      feedback,
      submittedAt: new Date()
    };
    
    localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
    
    // You would typically send this to your backend here
    console.log('Feedback submitted:', feedbackData);
    
    // Show thank you message or redirect
    alert('Thank you for your feedback!');
  };

  const playAgain = () => {
    router.push('/scenario-builder');
  };

  const startOver = () => {
    // Clear all stored data
    localStorage.removeItem('userProfile');
    localStorage.removeItem('floodScenario');
    localStorage.removeItem('gameSession');
    router.push('/');
  };

  if (!gameSession) {
    return <div>Loading...</div>;
  }

  const RatingComponent = ({ 
    label, 
    category, 
    value 
  }: { 
    label: string; 
    category: string; 
    value: number; 
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(category, star)}
            className="focus:outline-none"
          >
            {star <= value ? (
              <StarIconSolid className="h-6 w-6 text-yellow-400" />
            ) : (
              <StarIcon className="h-6 w-6 text-gray-300" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const sessionDuration = gameSession.endTime && gameSession.startTime 
    ? Math.round((new Date(gameSession.endTime).getTime() - new Date(gameSession.startTime).getTime()) / 1000 / 60)
    : 0;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <CheckCircleIcon className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simulation Complete!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for participating in our flood forecasting app evaluation. 
            Your feedback will help us improve emergency warning systems.
          </p>
        </motion.div>

        {/* Session Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="game-card mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Session Summary</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Scenario</h3>
              <p className="text-sm text-gray-600">{gameSession.scenario.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {gameSession.scenario.riskLevel.toUpperCase()} Risk Level
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
              <p className="text-sm text-gray-600">{sessionDuration} minutes</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Role</h3>
              <p className="text-sm text-gray-600 capitalize">
                {gameSession.userProfile.userCategory.replace('-', ' ')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feedback Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="game-card space-y-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900">Your Feedback</h2>

          {/* Rating Questions */}
          <div className="grid md:grid-cols-2 gap-8">
            <RatingComponent
              label="Overall Experience"
              category="overallRating"
              value={feedback.overallRating}
            />
            <RatingComponent
              label="App Usability"
              category="appUsability"
              value={feedback.appUsability}
            />
            <RatingComponent
              label="Information Clarity"
              category="informationClarity"
              value={feedback.informationClarity}
            />
            <RatingComponent
              label="Decision Support"
              category="decisionSupport"
              value={feedback.decisionSupport}
            />
          </div>

          {/* Experience Questions */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How was your experience using the flood forecasting app?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'excellent', label: 'Excellent - Very intuitive and helpful' },
                  { value: 'good', label: 'Good - Mostly easy to use' },
                  { value: 'fair', label: 'Fair - Some difficulties but manageable' },
                  { value: 'poor', label: 'Poor - Difficult to use or understand' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="experience"
                      value={option.value}
                      checked={feedback.experience === option.value}
                      onChange={(e) => setFeedback(prev => ({ ...prev, experience: e.target.value }))}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Would you recommend this app to others in your role?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'definitely', label: 'Definitely' },
                  { value: 'probably', label: 'Probably' },
                  { value: 'maybe', label: 'Maybe' },
                  { value: 'probably-not', label: 'Probably not' },
                  { value: 'definitely-not', label: 'Definitely not' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="wouldRecommend"
                      value={option.value}
                      checked={feedback.wouldRecommend === option.value}
                      onChange={(e) => setFeedback(prev => ({ ...prev, wouldRecommend: e.target.value }))}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Text Feedback */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What improvements would you suggest for the app?
              </label>
              <textarea
                value={feedback.improvements}
                onChange={(e) => setFeedback(prev => ({ ...prev, improvements: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your suggestions for improving the app..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Any additional comments about your experience?
              </label>
              <textarea
                value={feedback.additionalComments}
                onChange={(e) => setFeedback(prev => ({ ...prev, additionalComments: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share any other thoughts or observations..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="game-button flex items-center gap-2 text-lg px-8 py-4"
            >
              Submit Feedback
              <ArrowRightIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.form>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playAgain}
            className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Try Another Scenario
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startOver}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Start Over
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}