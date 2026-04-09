import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { CategoryChart } from "@/components/category-chart"
import { BudgetWatchlist } from "@/components/budget-watchlist"
import { RecentTransactions } from "@/components/recent-transactions"

export default function Page() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>

        {/* 3-way split layout */}
        <div className="px-4 lg:px-6 grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
            <CategoryChart />
            <BudgetWatchlist />
          </div>
          <div className="lg:col-span-1">
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  )
}
