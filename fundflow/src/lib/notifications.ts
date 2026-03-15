// Push notification utilities
// TODO: Implement web push notifications

export interface NotificationConfig {
  vapidPublicKey?: string
  vapidPrivateKey?: string
  subject?: string
}

export interface NotificationPayload {
  title: string
  body: string
  icon?: string
  badge?: string
  image?: string
  data?: any
  actions?: NotificationAction[]
  tag?: string
  requireInteraction?: boolean
}

export interface NotificationAction {
  action: string
  title: string
  icon?: string
}

export class NotificationService {
  private config: NotificationConfig

  constructor(config: NotificationConfig = {}) {
    this.config = {
      vapidPublicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      vapidPrivateKey: process.env.VAPID_PRIVATE_KEY,
      subject: process.env.VAPID_SUBJECT || "mailto:support@fundflow.app",
      ...config,
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!("Notification" in window)) {
      throw new Error("This browser does not support notifications")
    }

    return await Notification.requestPermission()
  }

  async sendLocalNotification(payload: NotificationPayload): Promise<void> {
    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications")
      return
    }

    if (Notification.permission !== "granted") {
      console.warn("Notification permission not granted")
      return
    }

    new Notification(payload.title, {
      body: payload.body,
      icon: payload.icon || "/icons/icon-192x192.png",
      badge: payload.badge || "/icons/icon-192x192.png",
      image: payload.image,
      data: payload.data,
      tag: payload.tag,
      requireInteraction: payload.requireInteraction,
    })
  }

  async subscribeToWebPush(): Promise<PushSubscription | null> {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("Push messaging is not supported")
      return null
    }

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.config.vapidPublicKey,
      })

      return subscription
    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error)
      return null
    }
  }

  async unsubscribeFromWebPush(): Promise<boolean> {
    if (!("serviceWorker" in navigator)) {
      return false
    }

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()
      
      if (subscription) {
        return await subscription.unsubscribe()
      }
      
      return true
    } catch (error) {
      console.error("Failed to unsubscribe from push notifications:", error)
      return false
    }
  }

  async sendWebPushNotification(
    subscription: PushSubscription,
    payload: NotificationPayload
  ): Promise<void> {
    // TODO: Implement server-side web push notification sending
    // This would typically be done on the server using libraries like web-push
    console.log("Sending web push notification:", payload)
  }
}

// Create singleton instance
export const notificationService = new NotificationService()

// Predefined notification templates
export const notificationTemplates = {
  budgetExceeded: (budgetName: string, percentage: number): NotificationPayload => ({
    title: "Budget Alert",
    body: `You've exceeded ${percentage}% of your ${budgetName} budget`,
    icon: "/icons/warning.png",
    tag: "budget-alert",
    data: { type: "budget_exceeded", budgetName, percentage },
    actions: [
      { action: "view", title: "View Budget" },
      { action: "dismiss", title: "Dismiss" },
    ],
  }),

  goalAchieved: (goalName: string): NotificationPayload => ({
    title: "Goal Achieved! 🎉",
    body: `Congratulations! You've reached your ${goalName} goal`,
    icon: "/icons/success.png",
    tag: "goal-achieved",
    data: { type: "goal_achieved", goalName },
    requireInteraction: true,
    actions: [
      { action: "celebrate", title: "Celebrate" },
      { action: "view", title: "View Goal" },
    ],
  }),

  transactionAdded: (amount: number, category: string): NotificationPayload => ({
    title: "Transaction Added",
    body: `New ${category} transaction: $${amount.toFixed(2)}`,
    icon: "/icons/transaction.png",
    tag: "transaction-added",
    data: { type: "transaction_added", amount, category },
  }),

  lowBalance: (walletName: string, balance: number): NotificationPayload => ({
    title: "Low Balance Alert",
    body: `Your ${walletName} balance is low: $${balance.toFixed(2)}`,
    icon: "/icons/warning.png",
    tag: "low-balance",
    data: { type: "low_balance", walletName, balance },
    actions: [
      { action: "add-funds", title: "Add Funds" },
      { action: "view", title: "View Wallet" },
    ],
  }),

  monthlyReport: (totalIncome: number, totalExpenses: number): NotificationPayload => ({
    title: "Monthly Report Ready",
    body: `Income: $${totalIncome.toFixed(2)}, Expenses: $${totalExpenses.toFixed(2)}`,
    icon: "/icons/report.png",
    tag: "monthly-report",
    data: { type: "monthly_report", totalIncome, totalExpenses },
    actions: [
      { action: "view-report", title: "View Report" },
      { action: "dismiss", title: "Dismiss" },
    ],
  }),
}

// Utility functions
export async function requestNotificationPermission(): Promise<boolean> {
  const permission = await notificationService.requestPermission()
  return permission === "granted"
}

export async function sendBudgetAlert(budgetName: string, percentage: number): Promise<void> {
  const notification = notificationTemplates.budgetExceeded(budgetName, percentage)
  await notificationService.sendLocalNotification(notification)
}

export async function sendGoalAchievedNotification(goalName: string): Promise<void> {
  const notification = notificationTemplates.goalAchieved(goalName)
  await notificationService.sendLocalNotification(notification)
}

export async function sendLowBalanceAlert(walletName: string, balance: number): Promise<void> {
  const notification = notificationTemplates.lowBalance(walletName, balance)
  await notificationService.sendLocalNotification(notification)
}