'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useEngageStore } from '@/lib/store'
import { generateId } from '@/lib/utils'

export default function SignupPage() {
  const router = useRouter()
  const { setCurrentUser } = useEngageStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    team: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const user = {
      id: generateId(),
      ...formData,
      createdAt: new Date().toISOString(),
    }

    setCurrentUser(user)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">E</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-gray-600">Join thousands using Engage</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input
              type="text"
              placeholder="Sarah Chen"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Work Email</label>
            <Input
              type="email"
              placeholder="sarah@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <Input
              type="text"
              placeholder="Product Designer"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Team</label>
            <Input
              type="text"
              placeholder="Product Team"
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Get Started →
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/auth/signin" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </Card>
    </div>
  )
}
