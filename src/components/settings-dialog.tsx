"use client"

import * as React from "react"
import { useAtom } from "jotai"
import { isSettingsOpenAtom } from "@/lib/store"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { UserCircleIcon, Settings2Icon, CreditCardIcon, Trash2Icon, MoonIcon, FontBlackIcon, ShieldAlertIcon } from "lucide-react"
import { useFundFlow } from "@/context/fund-flow-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "./ui/separator"
import { useRouter } from "next/navigation"

export function SettingsDialog() {
  const [isOpen, setIsOpen] = useAtom(isSettingsOpenAtom)
  const { user, updateUser } = useFundFlow()
  const [activeTab, setActiveTab] = React.useState("profile")
  const router = useRouter()

  // Local form state
  const [localName, setLocalName] = React.useState(user?.name || "")
  const [localEmail, setLocalEmail] = React.useState(user?.email || "")

  React.useEffect(() => {
    setLocalName(user?.name || "")
    setLocalEmail(user?.email || "")
  }, [user])

  const handleUpdateProfile = () => {
    localStorage.setItem("fundflow_user_name", localName)
    localStorage.setItem("fundflow_user_email", localEmail)
    updateUser({ name: localName, email: localEmail })
    // show sonner/toast here if we had one
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      localStorage.clear()
      router.push("/login")
    }
  }

  const tabs = [
    { id: "profile", label: "User Profile", icon: UserCircleIcon },
    { id: "account", label: "Account Setup", icon: Settings2Icon },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Ensure dialog doesn't visually overflow but also isn't just standard max-w-sm */}
      <DialogContent className="max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] w-full h-[90vh] md:h-[80vh] max-h-[850px] p-0 overflow-hidden flex flex-col md:flex-row gap-0">
         <div className="hidden">
           <DialogTitle>Settings</DialogTitle>
           <DialogDescription>Modify your user profile and application settings</DialogDescription>
         </div>

         {/* Settings Sidebar */}
         <div className="w-full md:w-72 bg-muted/30 border-b md:border-r md:border-b-0 border-border/50 flex flex-col h-auto md:h-full overflow-y-auto backdrop-blur-md">
             <div className="p-4 md:p-8 md:pb-6">
                <h2 className="text-xl font-bold tracking-tight">Settings</h2>
                <p className="text-xs text-muted-foreground mt-1 tracking-tight hidden md:block">Manage your account parameters.</p>
             </div>
             <nav className="flex flex-row md:flex-col px-4 md:px-4 pb-4 md:pb-0 gap-2 md:space-y-1 overflow-x-auto">
                 {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg font-medium transition-all whitespace-nowrap ${
                            activeTab === tab.id 
                                ? "bg-background shadow-xs text-foreground ring-1 ring-border/50" 
                                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                        }`}
                    >
                        <tab.icon className="size-4" />
                        {tab.label}
                    </button>
                 ))}
             </nav>
         </div>

         {/* Settings Content Area */}
         <div className="flex-1 bg-background p-6 md:p-12 overflow-y-auto w-full h-full max-h-full">
            {activeTab === "profile" && (
                <div className="space-y-8 max-w-2xl mx-auto md:mx-0">
                    <div>
                        <h3 className="text-2xl font-semibold tracking-tight">User Personalization</h3>
                        <p className="text-muted-foreground mt-1">Manage your display name, linked email address, and personal data.</p>
                    </div>
                    <Separator className="bg-border/60" />
                    <div className="space-y-6">
                        <div className="grid gap-3">
                            <Label htmlFor="s-name" className="text-base">Display Name</Label>
                            <Input id="s-name" className="max-w-md h-11" value={localName} onChange={e => setLocalName(e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="s-email" className="text-base">Email Address</Label>
                            <Input id="s-email" type="email" className="max-w-md h-11" value={localEmail} onChange={e => setLocalEmail(e.target.value)} />
                        </div>
                        <div className="pt-2">
                           <Button onClick={handleUpdateProfile} size="lg" className="w-full sm:w-auto">Save Changes</Button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "account" && (
                <div className="space-y-8 max-w-2xl mx-auto md:mx-0">
                    <div>
                        <h3 className="text-2xl font-semibold tracking-tight">Account Settings</h3>
                        <p className="text-muted-foreground mt-1">Advanced app preferences and destructive actions.</p>
                    </div>
                    <Separator className="bg-border/60" />
                    <div className="space-y-6">
                        <div className="grid gap-3">
                            <Label className="text-base">Base Currency</Label>
                            <Select defaultValue={user?.currency || "USD"} onValueChange={(val) => updateUser({ currency: val })}>
                                <SelectTrigger className="max-w-[200px] h-11">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD ($)</SelectItem>
                                    <SelectItem value="EUR">EUR (€)</SelectItem>
                                    <SelectItem value="GBP">GBP (£)</SelectItem>
                                    <SelectItem value="INR">INR (₹)</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-muted-foreground mt-1">Sets the default display currency across all reports and charts.</p>
                        </div>
                    </div>
                    
                    <div className="pt-10 mt-10 border-t border-destructive/20 space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-destructive tracking-tight">Danger Zone</h3>
                            <p className="text-sm text-destructive/80 mt-1">Permanently delete your FundFlow account and all its data. This action cannot be undone.</p>
                        </div>
                        <Button variant="destructive" size="lg" onClick={handleDeleteAccount} className="flex items-center justify-center gap-2 w-full sm:w-auto">
                             <Trash2Icon className="size-4" />
                             Delete Account
                        </Button>
                    </div>
                </div>
            )}
         </div>
      </DialogContent>
    </Dialog>
  )
}