'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useEngageStore } from '@/lib/store'
import { generateId, formatDate, calculateProgress } from '@/lib/utils'
import type { Goal, Task, PulseCheck } from '@/lib/types'

export default function DashboardPage() {
  const router = useRouter()
  const {
    currentUser,
    goals,
    tasks,
    pulseChecks,
    recognitions,
    feedbacks,
    learningPaths,
    insights,
    notifications,
    addGoal,
    addTask,
    addPulseCheck,
    addRecognition,
    addFeedback,
    addLearningPath,
    completeTask,
    updateGoal,
    generateInsights,
    generateGrowthReport,
    setCurrentUser,
  } = useEngageStore()

  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'pulse' | 'recognition' | 'feedback' | 'learning' | 'insights' | 'coach' | 'reports'>('overview')
  const [newGoalTitle, setNewGoalTitle] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [todayMood, setTodayMood] = useState<PulseCheck['mood']>('good')
  const [recognitionText, setRecognitionText] = useState('')

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/signin')
    }
  }, [currentUser, router])

  useEffect(() => {
    // Generate sample data if empty
    if (currentUser && goals.length === 0) {
      addGoal({
        userId: currentUser.id,
        title: 'Launch new product feature',
        description: 'Complete the customer dashboard redesign',
        category: 'performance',
        priority: 'high',
        status: 'active',
        progress: 35,
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        milestones: [
          { id: generateId(), title: 'User research', completed: true, completedAt: new Date().toISOString() },
          { id: generateId(), title: 'Design mockups', completed: true, completedAt: new Date().toISOString() },
          { id: generateId(), title: 'Development', completed: false },
          { id: generateId(), title: 'Testing', completed: false },
        ],
      })

      addTask({
        userId: currentUser.id,
        title: 'Review design system updates',
        status: 'todo',
        priority: 'high',
        dueDate: new Date().toISOString(),
        estimatedTime: 30,
      })

      addTask({
        userId: currentUser.id,
        title: 'Team standup meeting',
        status: 'todo',
        priority: 'medium',
        dueDate: new Date().toISOString(),
        estimatedTime: 15,
      })

      addLearningPath({
        userId: currentUser.id,
        skill: 'Design Systems',
        targetLevel: 'advanced',
        currentLevel: 'intermediate',
        progress: 60,
        resources: [
          { id: generateId(), type: 'course', title: 'Advanced Design Systems', url: '#', completed: true, completedAt: new Date().toISOString() },
          { id: generateId(), type: 'article', title: 'Scalable Design Patterns', url: '#', completed: false },
        ],
        milestones: ['Complete 3 courses', 'Build component library', 'Lead design review'],
      })
    }
  }, [currentUser, goals.length])

  if (!currentUser) {
    return null
  }

  const userGoals = goals.filter(g => g.userId === currentUser.id)
  const userTasks = tasks.filter(t => t.userId === currentUser.id)
  const userPulseChecks = pulseChecks.filter(p => p.userId === currentUser.id)
  const userRecognitions = recognitions.filter(r => r.toUserId === currentUser.id || r.fromUserId === currentUser.id)
  const userFeedbacks = feedbacks.filter(f => f.toUserId === currentUser.id || f.fromUserId === currentUser.id)
  const userLearningPaths = learningPaths.filter(l => l.userId === currentUser.id)
  const unreadNotifications = notifications.filter(n => n.userId === currentUser.id && !n.read)

  const handleAddGoal = () => {
    if (!newGoalTitle.trim()) return

    addGoal({
      userId: currentUser.id,
      title: newGoalTitle,
      description: '',
      category: 'performance',
      priority: 'medium',
      status: 'active',
      progress: 0,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      milestones: [],
    })
    setNewGoalTitle('')
  }

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return

    addTask({
      userId: currentUser.id,
      title: newTaskTitle,
      status: 'todo',
      priority: 'medium',
    })
    setNewTaskTitle('')
  }

  const handlePulseCheck = () => {
    addPulseCheck({
      userId: currentUser.id,
      date: new Date().toISOString(),
      mood: todayMood,
      energy: 7,
      stress: 4,
      motivation: 8,
    })
  }

  const handleSendRecognition = () => {
    if (!recognitionText.trim()) return

    addRecognition({
      fromUserId: currentUser.id,
      toUserId: 'team-member-1',
      type: 'kudos',
      title: 'Great work!',
      message: recognitionText,
      tags: ['teamwork'],
      isPublic: true,
    })
    setRecognitionText('')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    router.push('/')
  }

  const activeGoals = userGoals.filter(g => g.status === 'active')
  const completedGoals = userGoals.filter(g => g.status === 'completed')
  const todayTasks = userTasks.filter(t => t.status !== 'completed')

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Hi, {currentUser.name}! 👋</h1>
                <p className="text-sm text-gray-600">{currentUser.role} • {currentUser.team}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {unreadNotifications.length > 0 && (
                <div className="relative">
                  <span className="text-2xl cursor-pointer">🔔</span>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                </div>
              )}
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'goals', label: '🎯 Goals', icon: '🎯' },
              { id: 'pulse', label: '💚 Wellbeing', icon: '💚' },
              { id: 'recognition', label: '🙏 Recognition', icon: '🙏' },
              { id: 'feedback', label: '💬 Feedback', icon: '💬' },
              { id: 'learning', label: '📚 Learning', icon: '📚' },
              { id: 'insights', label: '🔍 Insights', icon: '🔍' },
              { id: 'coach', label: '🤖 Coach', icon: '🤖' },
              { id: 'reports', label: '📈 Reports', icon: '📈' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-blue-600">{activeGoals.length}</div>
                  <p className="text-sm text-gray-600 mt-2">{completedGoals.length} completed this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tasks Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-teal-600">{todayTasks.length}</div>
                  <p className="text-sm text-gray-600 mt-2">Stay focused!</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600">{userRecognitions.length}</div>
                  <p className="text-sm text-gray-600 mt-2">This quarter</p>
                </CardContent>
              </Card>
            </div>

            {/* Priority Goal */}
            {activeGoals.length > 0 && (
              <Card className="border-l-4 border-blue-600">
                <CardHeader>
                  <CardTitle>🎯 Priority #1</CardTitle>
                  <CardDescription>Your most important goal</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold mb-4">{activeGoals[0].title}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progress</span>
                      <span>{activeGoals[0].progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                        style={{ width: `${activeGoals[0].progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      📅 Due {formatDate(activeGoals[0].dueDate)}
                    </p>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Milestones:</h4>
                    <div className="space-y-2">
                      {activeGoals[0].milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center gap-2">
                          <span>{milestone.completed ? '✅' : '⭕'}</span>
                          <span className={milestone.completed ? 'line-through text-gray-500' : ''}>
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Tasks</CardTitle>
                <CardDescription>Focus on what matters most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer"
                      onClick={() => completeTask(task.id)}
                    >
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                        task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}>
                        {task.status === 'completed' && <span className="text-white text-sm">✓</span>}
                      </div>
                      <div className="flex-1">
                        <p className={task.status === 'completed' ? 'line-through text-gray-500' : 'font-medium'}>
                          {task.title}
                        </p>
                        {task.estimatedTime && (
                          <p className="text-sm text-gray-500">⏱ {task.estimatedTime} min</p>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-4">
                    <Input
                      placeholder="Add a new task..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                    />
                    <Button onClick={handleAddTask}>Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>GoalHub - Your Goals</CardTitle>
                <CardDescription>Track and achieve meaningful goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userGoals.map((goal) => (
                    <Card key={goal.id} className="border-l-4 border-blue-500">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{goal.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            goal.priority === 'high' ? 'bg-red-100 text-red-700' :
                            goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {goal.priority}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-4 mt-4 text-sm text-gray-600">
                          <span>📅 Due {formatDate(goal.dueDate)}</span>
                          <span>📁 {goal.category}</span>
                          <span>✅ {goal.status}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a new goal..."
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                    />
                    <Button onClick={handleAddGoal}>Add Goal</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* PulseCheck Tab */}
        {activeTab === 'pulse' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>💚 PulseCheck - How are you feeling?</CardTitle>
                <CardDescription>Track your wellbeing and energy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold mb-4">How's your mood today?</p>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {[
                        { mood: 'energized', emoji: '😊', label: 'Energized' },
                        { mood: 'good', emoji: '😌', label: 'Good' },
                        { mood: 'okay', emoji: '😐', label: 'Okay' },
                        { mood: 'tired', emoji: '😓', label: 'Tired' },
                        { mood: 'stressed', emoji: '😰', label: 'Stressed' },
                        { mood: 'overwhelmed', emoji: '😰', label: 'Overwhelmed' },
                      ].map((option) => (
                        <button
                          key={option.mood}
                          onClick={() => setTodayMood(option.mood as PulseCheck['mood'])}
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                            todayMood === option.mood
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className="text-3xl">{option.emoji}</span>
                          <span className="text-sm font-medium">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handlePulseCheck} className="w-full">
                    Save Pulse Check
                  </Button>

                  {userPulseChecks.length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-semibold mb-4">Your Recent Check-ins</h3>
                      <div className="space-y-3">
                        {userPulseChecks.slice(-5).reverse().map((check) => (
                          <div key={check.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                            <span className="text-2xl">
                              {check.mood === 'energized' ? '😊' :
                               check.mood === 'good' ? '😌' :
                               check.mood === 'okay' ? '😐' :
                               check.mood === 'tired' ? '😓' : '😰'}
                            </span>
                            <div className="flex-1">
                              <p className="font-medium capitalize">{check.mood}</p>
                              <p className="text-sm text-gray-600">{formatDate(check.date)}</p>
                            </div>
                            <div className="text-sm text-gray-600">
                              Energy: {check.energy}/10
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recognition Tab */}
        {activeTab === 'recognition' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🙏 KudosStream - Recognition Feed</CardTitle>
                <CardDescription>Give and receive recognition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold mb-2">Send Recognition</p>
                    <textarea
                      className="w-full p-4 border border-gray-200 rounded-xl resize-none"
                      rows={3}
                      placeholder="Recognize someone's great work..."
                      value={recognitionText}
                      onChange={(e) => setRecognitionText(e.target.value)}
                    />
                    <Button onClick={handleSendRecognition} className="mt-2">
                      Send Recognition 🎉
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Recent Recognition</h3>
                    <div className="space-y-4">
                      {userRecognitions.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No recognition yet. Be the first to send some kudos!</p>
                      ) : (
                        userRecognitions.slice(-5).reverse().map((recognition) => (
                          <Card key={recognition.id}>
                            <CardContent className="pt-6">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                  {recognition.fromUserId === currentUser.id ? 'You' : 'TM'}
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold">{recognition.title}</p>
                                  <p className="text-gray-600 mt-1">{recognition.message}</p>
                                  <div className="flex gap-2 mt-2">
                                    {recognition.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  <p className="text-sm text-gray-500 mt-2">{formatDate(recognition.createdAt)}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>💬 FeedbackLoop - Continuous Feedback</CardTitle>
                <CardDescription>Share and receive constructive feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">💬</span>
                  <h3 className="text-xl font-bold mb-2">Feedback Makes Us Better</h3>
                  <p className="text-gray-600 mb-6">Share constructive feedback with your team</p>
                  <Button onClick={() => {
                    addFeedback({
                      fromUserId: currentUser.id,
                      toUserId: 'team-member-1',
                      type: 'positive',
                      category: 'communication',
                      title: 'Great presentation',
                      message: 'Your presentation was very clear and engaging',
                      isAnonymous: false,
                      status: 'pending',
                    })
                  }}>
                    Give Feedback
                  </Button>
                </div>
                {userFeedbacks.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h3 className="font-semibold">Recent Feedback</h3>
                    {userFeedbacks.map((feedback) => (
                      <Card key={feedback.id} className="border-l-4 border-green-500">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{feedback.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{feedback.message}</p>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              {feedback.type}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Learning Tab */}
        {activeTab === 'learning' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>📚 LearnPath - Your Learning Journey</CardTitle>
                <CardDescription>Develop skills and grow your career</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userLearningPaths.map((path) => (
                    <Card key={path.id} className="border-l-4 border-purple-500">
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-bold mb-4">{path.skill}</h3>
                        <div className="flex gap-4 mb-4 text-sm">
                          <span className="px-3 py-1 bg-gray-100 rounded-full">
                            Current: {path.currentLevel}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                            Target: {path.targetLevel}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{path.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                              style={{ width: `${path.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="font-semibold text-sm mb-2">Resources:</p>
                          <div className="space-y-2">
                            {path.resources.map((resource) => (
                              <div key={resource.id} className="flex items-center gap-2 text-sm">
                                <span>{resource.completed ? '✅' : '📄'}</span>
                                <span className={resource.completed ? 'line-through text-gray-500' : ''}>
                                  {resource.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button onClick={() => {
                    addLearningPath({
                      userId: currentUser.id,
                      skill: 'Leadership',
                      targetLevel: 'advanced',
                      currentLevel: 'beginner',
                      progress: 0,
                      resources: [],
                      milestones: [],
                    })
                  }}>
                    Add Learning Path
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🔍 InsightHub - Your Analytics</CardTitle>
                <CardDescription>Data-driven insights about your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-blue-50">
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-600 mb-2">Goal Completion Rate</p>
                      <p className="text-4xl font-bold text-blue-600">
                        {userGoals.length > 0 ? Math.round((completedGoals.length / userGoals.length) * 100) : 0}%
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {completedGoals.length} of {userGoals.length} goals completed
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50">
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-600 mb-2">Recognition Received</p>
                      <p className="text-4xl font-bold text-green-600">{userRecognitions.length}</p>
                      <p className="text-sm text-gray-600 mt-2">This quarter</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50">
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-600 mb-2">Skills Learning</p>
                      <p className="text-4xl font-bold text-purple-600">{userLearningPaths.length}</p>
                      <p className="text-sm text-gray-600 mt-2">Active learning paths</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-teal-50">
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-600 mb-2">Wellbeing Check-ins</p>
                      <p className="text-4xl font-bold text-teal-600">{userPulseChecks.length}</p>
                      <p className="text-sm text-gray-600 mt-2">Total pulse checks</p>
                    </CardContent>
                  </Card>
                </div>
                <Button onClick={generateInsights} className="mt-6">
                  Generate New Insights
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Coach Tab */}
        {activeTab === 'coach' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🤖 Engage Coach - Your AI Mentor</CardTitle>
                <CardDescription>Get personalized guidance for your career</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">🤖</span>
                  <h3 className="text-xl font-bold mb-2">Your AI Career Coach</h3>
                  <p className="text-gray-600 mb-6">
                    Get personalized advice on goals, skills, and career development
                  </p>
                  <div className="max-w-md mx-auto">
                    <Input placeholder="Ask me anything about your career..." className="mb-4" />
                    <Button className="w-full">Get Coaching</Button>
                  </div>
                  <div className="mt-8 text-left max-w-md mx-auto">
                    <p className="font-semibold mb-2">Suggested topics:</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">• How can I improve my leadership skills?</p>
                      <p className="text-sm text-gray-600">• What should I focus on this month?</p>
                      <p className="text-sm text-gray-600">• How do I handle stress better?</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>📈 GrowthReports - Your Progress</CardTitle>
                <CardDescription>Comprehensive reports on your achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <p className="text-3xl font-bold text-blue-600">{completedGoals.length}</p>
                      <p className="text-sm text-gray-600 mt-2">Goals Completed</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <p className="text-3xl font-bold text-green-600">{userRecognitions.length}</p>
                      <p className="text-sm text-gray-600 mt-2">Recognition Received</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <p className="text-3xl font-bold text-purple-600">{userLearningPaths.length}</p>
                      <p className="text-sm text-gray-600 mt-2">Skills Developing</p>
                    </div>
                  </div>
                  <Button onClick={() => generateGrowthReport(currentUser.id, 'Q1 2025')} className="w-full">
                    Generate Growth Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
