export interface Goal {
  id: string
  name: string
  description?: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  category: GoalCategory
  priority: "low" | "medium" | "high"
  status: "active" | "completed" | "paused" | "cancelled"
  milestones: GoalMilestone[]
  linkedWalletId?: string
  autoContribution?: AutoContribution
  createdAt: string
  updatedAt: string
}

export interface GoalCategory {
  id: string
  name: string
  icon: string
  color: string
}

export interface GoalMilestone {
  id: string
  name: string
  targetAmount: number
  isCompleted: boolean
  completedAt?: string
  reward?: string
}

export interface AutoContribution {
  amount: number
  frequency: "daily" | "weekly" | "monthly"
  nextContribution: string
  isActive: boolean
}

export interface GoalProgress {
  goalId: string
  percentage: number
  amountRemaining: number
  daysRemaining: number
  projectedCompletionDate: string
  monthlyContributionNeeded: number
  isOnTrack: boolean
}