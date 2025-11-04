// User Types
export interface User {
  id: string
  email: string
  name: string
  role: string
  team: string
  avatar?: string
  createdAt: string
}

// Goal Types
export interface Goal {
  id: string
  userId: string
  title: string
  description: string
  category: 'performance' | 'learning' | 'leadership' | 'personal'
  priority: 'high' | 'medium' | 'low'
  status: 'active' | 'completed' | 'paused'
  progress: number
  dueDate: string
  milestones: Milestone[]
  createdAt: string
  updatedAt: string
}

export interface Milestone {
  id: string
  title: string
  completed: boolean
  completedAt?: string
}

// Task Types
export interface Task {
  id: string
  userId: string
  goalId?: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'completed'
  priority: 'high' | 'medium' | 'low'
  dueDate?: string
  estimatedTime?: number // in minutes
  completedAt?: string
  createdAt: string
}

// PulseCheck Types
export interface PulseCheck {
  id: string
  userId: string
  date: string
  mood: 'energized' | 'good' | 'okay' | 'tired' | 'stressed' | 'overwhelmed'
  energy: number // 1-10
  stress: number // 1-10
  motivation: number // 1-10
  notes?: string
  createdAt: string
}

// Recognition Types
export interface Recognition {
  id: string
  fromUserId: string
  toUserId: string
  type: 'kudos' | 'thank-you' | 'celebration' | 'milestone'
  title: string
  message: string
  tags: string[]
  isPublic: boolean
  reactions: Reaction[]
  createdAt: string
}

export interface Reaction {
  userId: string
  emoji: string
  createdAt: string
}

// Feedback Types
export interface Feedback {
  id: string
  fromUserId: string
  toUserId: string
  type: 'positive' | 'constructive' | 'request'
  category: 'skill' | 'behavior' | 'communication' | 'leadership' | 'other'
  title: string
  message: string
  isAnonymous: boolean
  status: 'pending' | 'acknowledged' | 'actioned'
  createdAt: string
}

// Learning Types
export interface LearningPath {
  id: string
  userId: string
  skill: string
  targetLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  currentLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  progress: number
  resources: LearningResource[]
  milestones: string[]
  createdAt: string
  updatedAt: string
}

export interface LearningResource {
  id: string
  type: 'article' | 'video' | 'course' | 'book' | 'practice'
  title: string
  url?: string
  completed: boolean
  completedAt?: string
}

// Review Types
export interface Review {
  id: string
  userId: string
  period: string // e.g., "Q1 2024"
  type: 'self' | 'manager' | 'peer' | '360'
  status: 'draft' | 'submitted' | 'completed'
  goals: ReviewGoal[]
  strengths: string[]
  improvements: string[]
  overallRating?: number
  createdAt: string
  updatedAt: string
}

export interface ReviewGoal {
  goalId: string
  title: string
  achievement: number
  notes: string
}

// Insight Types
export interface Insight {
  id: string
  type: 'team' | 'individual' | 'organization'
  category: 'productivity' | 'wellbeing' | 'recognition' | 'growth' | 'engagement'
  title: string
  description: string
  metric: string
  value: number
  trend: 'up' | 'down' | 'stable'
  createdAt: string
}

// Coach Message Types
export interface CoachMessage {
  id: string
  userId: string
  role: 'user' | 'assistant'
  content: string
  suggestions?: CoachSuggestion[]
  createdAt: string
}

export interface CoachSuggestion {
  type: 'goal' | 'task' | 'learning' | 'wellbeing'
  title: string
  description: string
  actionable: boolean
}

// Growth Report Types
export interface GrowthReport {
  id: string
  userId: string
  period: string
  metrics: {
    goalsCompleted: number
    recognitionReceived: number
    feedbackGiven: number
    skillsLearned: number
    averageWellbeing: number
  }
  highlights: string[]
  recommendations: string[]
  createdAt: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'goal' | 'recognition' | 'feedback' | 'review' | 'system'
  title: string
  message: string
  read: boolean
  link?: string
  createdAt: string
}
