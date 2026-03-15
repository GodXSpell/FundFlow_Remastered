export default function SettingsBillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing & Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="rounded-lg border p-6">
          <h4 className="text-base font-medium">Current Plan</h4>
          <p className="text-sm text-muted-foreground mt-1">
            You are currently on the Free plan.
          </p>
          <div className="mt-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Upgrade Plan
            </button>
          </div>
        </div>
        
        <div className="rounded-lg border p-6">
          <h4 className="text-base font-medium">Payment Method</h4>
          <p className="text-sm text-muted-foreground mt-1">
            No payment method on file.
          </p>
          <div className="mt-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Add Payment Method
            </button>
          </div>
        </div>
        
        <div className="rounded-lg border p-6">
          <h4 className="text-base font-medium">Billing History</h4>
          <p className="text-sm text-muted-foreground mt-1">
            No billing history available.
          </p>
        </div>
      </div>
    </div>
  )
}
