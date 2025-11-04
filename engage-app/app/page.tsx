'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useEngageStore } from '@/lib/store'

export default function Home() {
  const router = useRouter()
  const { currentUser } = useEngageStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
    if (currentUser) {
      router.push('/dashboard')
    }
  }, [currentUser, router])

  const handleGetStarted = () => {
    router.push('/auth/signup')
  }

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
        <div className="animate-pulse text-2xl font-semibold text-blue-600">Loading Engage...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">E</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Engage</span>
          </div>
          <Button variant="outline" onClick={handleSignIn}>
            Sign In
          </Button>
        </nav>

        <div className="max-w-4xl mx-auto text-center mt-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Your Intelligent
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Work Companion
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Succeed at your job, get recognized for your work, and stay fulfilled — without burning out.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-32 max-w-4xl mx-auto">
          <Card className="p-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <h2 className="text-4xl font-bold mb-4 text-center">
              Ready to transform your work life?
            </h2>
            <p className="text-xl mb-8 text-center opacity-90">
              Join thousands of professionals using Engage to achieve more while feeling fulfilled.
            </p>
            <div className="flex justify-center">
              <Button size="lg" variant="secondary" onClick={handleGetStarted}>
                Start Your Journey
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-32 text-center text-gray-600">
          <p>&copy; 2025 Engage. Built with care for humans at work.</p>
        </footer>
      </div>
    </div>
  )
}

const features = [
  {
    icon: '🎯',
    title: 'GoalHub',
    description: 'Set, track, and achieve meaningful goals that align with your career growth.',
  },
  {
    icon: '📊',
    title: 'FlowBoard',
    description: 'Your daily command center for prioritizing work and maintaining focus.',
  },
  {
    icon: '💚',
    title: 'PulseCheck',
    description: 'Track your wellbeing and energy levels to prevent burnout.',
  },
  {
    icon: '🙏',
    title: 'KudosStream',
    description: 'Give and receive recognition that builds team culture.',
  },
  {
    icon: '💬',
    title: 'FeedbackLoop',
    description: 'Continuous feedback that drives real improvement.',
  },
  {
    icon: '📚',
    title: 'LearnPath',
    description: 'Adaptive learning paths tailored to your career goals.',
  },
  {
    icon: '✅',
    title: 'ReviewFlow',
    description: 'Streamlined performance reviews that focus on growth.',
  },
  {
    icon: '🔍',
    title: 'InsightHub',
    description: 'Data-driven insights about team and individual performance.',
  },
  {
    icon: '🤖',
    title: 'Engage Coach',
    description: 'AI-powered guidance for career development and wellbeing.',
  },
  {
    icon: '📈',
    title: 'GrowthReports',
    description: 'Visual progress reports that celebrate your achievements.',
  },
]
