'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  CloudIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  PlayIcon,
  ShieldCheckIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import './globals.css';

export default function Home() {
  const [isStarting, setIsStarting] = useState(false);

  const features = [
    {
      icon: CloudIcon,
      title: "Realistic Flood Scenarios",
      description: "Experience various flood conditions with scientifically accurate parameters"
    },
    {
      icon: UserGroupIcon,
      title: "User-Centered Evaluation",
      description: "Help improve flood forecasting apps through your gameplay experience"
    },
    {
      icon: ChartBarIcon,
      title: "Impact Assessment",
      description: "Make critical decisions and see their real-world impact on flood response"
    },
    {
      icon: ShieldCheckIcon,
      title: "Safe Learning Environment",
      description: "Practice emergency decision-making without real-world consequences"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Game Graphic */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <Image
                  src="/web_background.png"
                  alt="HydroNet Flood Forecasting Game - Interactive flood simulation with mobile app interface"
                  width={800}
                  height={500}
                  className="rounded-2xl shadow-2xl border-4 border-white/20"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </motion.div>
            </div>
            
            {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              HydroNet Flood Impact Forecasting 
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Experience Simulation Game
              </span>
            </h1> */}
            
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience impact based flood forecasting and warning through interactive scenarios. Help evaluate and improve 
              impact-based flood warning systems while making critical emergency decisions.
            </p>

            {/* Ethics and Consent Notice */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Important Notice</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    We are currently in the process of obtaining ethics approval for this user evaluation study. 
                    Participation in this simulation and feedback process is entirely voluntary.
                  </p>
                  <p>
                    If you are not comfortable providing feedback or taking part in the simulation, you may exit 
                    or close the page at any time — there are no penalties or consequences for doing so.
                  </p>
                  <p className="font-medium">By proceeding, you confirm that you:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Understand the purpose of this activity (to help improve real-time flood forecasting 
                      and emergency warning systems), and
                    </li>
                    <li>
                      Consent to share your responses for research and app improvement purposes.
                    </li>
                  </ul>
                  <p className="italic text-gray-600">
                    Your participation is greatly appreciated and will contribute to developing more effective, 
                    user-friendly flood forecasting tools.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/game">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="game-button flex items-center gap-2 text-lg px-8 py-4"
                  onClick={() => setIsStarting(true)}
                >
                  <PlayIcon className="h-6 w-6" />
                  Start Experience
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Participate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your participation helps researchers understand how people interact with flood warning systems 
              and contributes to saving lives through better technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="game-card text-center"
              >
                <div className="flex justify-center mb-4">
                  <feature.icon className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              A simple 4-step gamified process that takes about 15-20 minutes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Profile Setup",
                description: "Tell us about your background and experience with floods"
              },
              {
                step: "2", 
                title: "Scenario Selection",
                description: "Choose parameters to create a realistic flood scenario"
              },
              {
                step: "3",
                title: "App Interaction",
                description: "Use the embedded flood forecasting app and make decisions"
              },
              {
                step: "4",
                title: "Feedback",
                description: "Share your experience to help improve the technology"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="game-card">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-300 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join the research and help improve flood warning systems that protect communities worldwide.
            </p>
            <Link href="/game">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Your Experience
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
