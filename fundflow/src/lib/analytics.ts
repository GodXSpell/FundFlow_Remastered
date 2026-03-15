// Analytics and tracking utilities
// TODO: Implement analytics tracking (Google Analytics, Mixpanel, etc.)

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  userId?: string
  timestamp?: number
}

export interface AnalyticsConfig {
  enabled: boolean
  debug: boolean
  trackingId?: string
  apiKey?: string
}

export class AnalyticsService {
  private config: AnalyticsConfig
  private eventQueue: AnalyticsEvent[] = []

  constructor(config: AnalyticsConfig) {
    this.config = config
  }

  track(eventName: string, properties?: Record<string, any>, userId?: string): void {
    if (!this.config.enabled) {
      return
    }

    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      userId,
      timestamp: Date.now(),
    }

    if (this.config.debug) {
      console.log("[Analytics] Event tracked:", event)
    }

    this.eventQueue.push(event)
    this.flushEvents()
  }

  identify(userId: string, traits?: Record<string, any>): void {
    if (!this.config.enabled) {
      return
    }

    this.track("identify", { ...traits, userId }, userId)
  }

  page(pageName: string, properties?: Record<string, any>): void {
    if (!this.config.enabled) {
      return
    }

    this.track("page_view", { page: pageName, ...properties })
  }

  private async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) {
      return
    }

    // TODO: Send events to analytics service
    console.log("Flushing analytics events:", this.eventQueue)
    this.eventQueue = []
  }
}

// Create singleton instance
export const analytics = new AnalyticsService({
  enabled: process.env.NODE_ENV === "production",
  debug: process.env.NODE_ENV === "development",
  trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  apiKey: process.env.ANALYTICS_API_KEY,
})

// Predefined event tracking functions
export const trackEvent = {
  // User authentication events
  signUp: (method: string) => 
    analytics.track("sign_up", { method }),
  
  signIn: (method: string) => 
    analytics.track("sign_in", { method }),
  
  signOut: () => 
    analytics.track("sign_out"),

  // Transaction events
  transactionCreated: (amount: number, category: string, type: "income" | "expense") =>
    analytics.track("transaction_created", { amount, category, type }),
  
  transactionUpdated: (transactionId: string) =>
    analytics.track("transaction_updated", { transaction_id: transactionId }),
  
  transactionDeleted: (transactionId: string) =>
    analytics.track("transaction_deleted", { transaction_id: transactionId }),

  // Budget events
  budgetCreated: (amount: number, period: string) =>
    analytics.track("budget_created", { amount, period }),
  
  budgetExceeded: (budgetName: string, percentage: number) =>
    analytics.track("budget_exceeded", { budget_name: budgetName, percentage }),

  // Wallet events
  walletAdded: (type: string) =>
    analytics.track("wallet_added", { wallet_type: type }),
  
  walletConnected: (provider: string) =>
    analytics.track("wallet_connected", { provider }),

  // Goal events
  goalCreated: (targetAmount: number, category: string) =>
    analytics.track("goal_created", { target_amount: targetAmount, category }),
  
  goalAchieved: (goalName: string, amount: number) =>
    analytics.track("goal_achieved", { goal_name: goalName, amount }),

  // Export events
  dataExported: (format: string, recordCount: number) =>
    analytics.track("data_exported", { format, record_count: recordCount }),

  // Navigation events
  pageViewed: (pageName: string) =>
    analytics.page(pageName),
  
  featureUsed: (featureName: string) =>
    analytics.track("feature_used", { feature_name: featureName }),

  // Error events
  errorOccurred: (errorType: string, errorMessage: string) =>
    analytics.track("error_occurred", { error_type: errorType, error_message: errorMessage }),
}

// Performance tracking
export const trackPerformance = {
  pageLoad: (pageName: string, loadTime: number) =>
    analytics.track("page_load_time", { page_name: pageName, load_time: loadTime }),
  
  apiCall: (endpoint: string, duration: number, status: number) =>
    analytics.track("api_call", { endpoint, duration, status }),
  
  searchPerformed: (query: string, resultCount: number, duration: number) =>
    analytics.track("search_performed", { query, result_count: resultCount, duration }),
}

// User behavior tracking
export const trackUserBehavior = {
  sessionStart: () =>
    analytics.track("session_start"),
  
  sessionEnd: (duration: number) =>
    analytics.track("session_end", { duration }),
  
  settingsChanged: (setting: string, value: any) =>
    analytics.track("settings_changed", { setting, value }),
  
  helpViewed: (topic: string) =>
    analytics.track("help_viewed", { topic }),
  
  feedbackSubmitted: (rating: number, category: string) =>
    analytics.track("feedback_submitted", { rating, category }),
}

// Conversion tracking
export const trackConversion = {
  trialStarted: () =>
    analytics.track("trial_started"),
  
  subscriptionUpgraded: (plan: string, amount: number) =>
    analytics.track("subscription_upgraded", { plan, amount }),
  
  subscriptionCancelled: (reason?: string) =>
    analytics.track("subscription_cancelled", { reason }),
}