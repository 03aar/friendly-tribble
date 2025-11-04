import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  User, Goal, Task, PulseCheck, Recognition, Feedback,
  LearningPath, Review, Insight, CoachMessage, GrowthReport, Notification
} from './types'
import { generateId } from './utils'

interface EngageStore {
  // User
  currentUser: User | null
  setCurrentUser: (user: User | null) => void

  // Goals
  goals: Goal[]
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateGoal: (id: string, goal: Partial<Goal>) => void
  deleteGoal: (id: string) => void

  // Tasks
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void
  completeTask: (id: string) => void

  // PulseChecks
  pulseChecks: PulseCheck[]
  addPulseCheck: (check: Omit<PulseCheck, 'id' | 'createdAt'>) => void

  // Recognition
  recognitions: Recognition[]
  addRecognition: (recognition: Omit<Recognition, 'id' | 'createdAt' | 'reactions'>) => void
  addReaction: (recognitionId: string, userId: string, emoji: string) => void

  // Feedback
  feedbacks: Feedback[]
  addFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt'>) => void
  updateFeedback: (id: string, feedback: Partial<Feedback>) => void

  // Learning Paths
  learningPaths: LearningPath[]
  addLearningPath: (path: Omit<LearningPath, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateLearningPath: (id: string, path: Partial<LearningPath>) => void

  // Reviews
  reviews: Review[]
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateReview: (id: string, review: Partial<Review>) => void

  // Insights
  insights: Insight[]
  generateInsights: () => void

  // Coach Messages
  coachMessages: CoachMessage[]
  addCoachMessage: (message: Omit<CoachMessage, 'id' | 'createdAt'>) => void

  // Growth Reports
  growthReports: GrowthReport[]
  generateGrowthReport: (userId: string, period: string) => void

  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
  markNotificationRead: (id: string) => void
}

export const useEngageStore = create<EngageStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      goals: [],
      tasks: [],
      pulseChecks: [],
      recognitions: [],
      feedbacks: [],
      learningPaths: [],
      reviews: [],
      insights: [],
      coachMessages: [],
      growthReports: [],
      notifications: [],

      // User methods
      setCurrentUser: (user) => set({ currentUser: user }),

      // Goal methods
      addGoal: (goal) =>
        set((state) => ({
          goals: [
            ...state.goals,
            {
              ...goal,
              id: generateId(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateGoal: (id, updates) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, ...updates, updatedAt: new Date().toISOString() } : g
          ),
        })),

      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),

      // Task methods
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: generateId(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      completeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, status: 'completed' as const, completedAt: new Date().toISOString() }
              : t
          ),
        })),

      // PulseCheck methods
      addPulseCheck: (check) =>
        set((state) => ({
          pulseChecks: [
            ...state.pulseChecks,
            {
              ...check,
              id: generateId(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      // Recognition methods
      addRecognition: (recognition) =>
        set((state) => ({
          recognitions: [
            ...state.recognitions,
            {
              ...recognition,
              id: generateId(),
              reactions: [],
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      addReaction: (recognitionId, userId, emoji) =>
        set((state) => ({
          recognitions: state.recognitions.map((r) =>
            r.id === recognitionId
              ? {
                  ...r,
                  reactions: [
                    ...r.reactions,
                    { userId, emoji, createdAt: new Date().toISOString() },
                  ],
                }
              : r
          ),
        })),

      // Feedback methods
      addFeedback: (feedback) =>
        set((state) => ({
          feedbacks: [
            ...state.feedbacks,
            {
              ...feedback,
              id: generateId(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateFeedback: (id, updates) =>
        set((state) => ({
          feedbacks: state.feedbacks.map((f) => (f.id === id ? { ...f, ...updates } : f)),
        })),

      // Learning Path methods
      addLearningPath: (path) =>
        set((state) => ({
          learningPaths: [
            ...state.learningPaths,
            {
              ...path,
              id: generateId(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateLearningPath: (id, updates) =>
        set((state) => ({
          learningPaths: state.learningPaths.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        })),

      // Review methods
      addReview: (review) =>
        set((state) => ({
          reviews: [
            ...state.reviews,
            {
              ...review,
              id: generateId(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateReview: (id, updates) =>
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
          ),
        })),

      // Insights generation
      generateInsights: () => {
        const state = get()
        const userId = state.currentUser?.id
        if (!userId) return

        const userGoals = state.goals.filter((g) => g.userId === userId)
        const completedGoals = userGoals.filter((g) => g.status === 'completed')
        const userPulseChecks = state.pulseChecks.filter((p) => p.userId === userId)
        const recentPulse = userPulseChecks.slice(-7)

        const newInsights: Insight[] = [
          {
            id: generateId(),
            type: 'individual',
            category: 'productivity',
            title: 'Goal Completion Rate',
            description: 'Your goal completion rate this month',
            metric: 'completion_rate',
            value: userGoals.length > 0 ? (completedGoals.length / userGoals.length) * 100 : 0,
            trend: 'stable',
            createdAt: new Date().toISOString(),
          },
          {
            id: generateId(),
            type: 'individual',
            category: 'wellbeing',
            title: 'Average Energy Level',
            description: 'Your energy levels over the past week',
            metric: 'energy',
            value: recentPulse.length > 0
              ? recentPulse.reduce((sum, p) => sum + p.energy, 0) / recentPulse.length
              : 5,
            trend: 'stable',
            createdAt: new Date().toISOString(),
          },
        ]

        set((state) => ({
          insights: [...state.insights.filter((i) => i.type !== 'individual'), ...newInsights],
        }))
      },

      // Coach methods
      addCoachMessage: (message) =>
        set((state) => ({
          coachMessages: [
            ...state.coachMessages,
            {
              ...message,
              id: generateId(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      // Growth Report generation
      generateGrowthReport: (userId, period) => {
        const state = get()
        const completedGoals = state.goals.filter(
          (g) => g.userId === userId && g.status === 'completed'
        ).length
        const recognitionReceived = state.recognitions.filter((r) => r.toUserId === userId).length
        const feedbackGiven = state.feedbacks.filter((f) => f.fromUserId === userId).length
        const skillsLearned = state.learningPaths.filter((p) => p.userId === userId).length
        const pulseChecks = state.pulseChecks.filter((p) => p.userId === userId)
        const averageWellbeing =
          pulseChecks.length > 0
            ? pulseChecks.reduce((sum, p) => sum + p.mood.length, 0) / pulseChecks.length
            : 5

        const report: GrowthReport = {
          id: generateId(),
          userId,
          period,
          metrics: {
            goalsCompleted: completedGoals,
            recognitionReceived,
            feedbackGiven,
            skillsLearned,
            averageWellbeing,
          },
          highlights: [
            `Completed ${completedGoals} goals`,
            `Received ${recognitionReceived} recognition messages`,
            `Developing ${skillsLearned} new skills`,
          ],
          recommendations: [
            'Continue setting challenging goals',
            'Share feedback with your team',
            'Maintain regular pulse check-ins',
          ],
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          growthReports: [...state.growthReports, report],
        }))
      },

      // Notification methods
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: generateId(),
              read: false,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
    }),
    {
      name: 'engage-storage',
    }
  )
)
