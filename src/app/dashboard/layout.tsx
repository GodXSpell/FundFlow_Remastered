import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { FundFlowProvider } from "@/context/fund-flow-context"
import { SettingsDialog } from "@/components/settings-dialog"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <FundFlowProvider>
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col">
                        {children}
                    </div>
                </SidebarInset>
                <SettingsDialog />
            </SidebarProvider>
        </FundFlowProvider>
    )
}
