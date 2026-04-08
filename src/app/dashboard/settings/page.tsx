"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFundFlow } from "@/context/fund-flow-context"
import { useTheme } from "next-themes"
import { toast } from "sonner"

export default function SettingsPage() {
    const { user, updateUser } = useFundFlow()
    const { setTheme, theme } = useTheme()

    const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        updateUser({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
        })
        toast.success("Profile updated successfully")
    }

    const handleSavePreferences = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        updateUser({
            currency: formData.get("currency") as string,
            notifications: formData.get("notifications") === "on",
        })
        toast.success("Preferences saved")
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full max-w-4xl mx-auto">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator className="my-6" />
            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="account">Preferences</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>
                                This is how others will see you on the site.
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSaveProfile}>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" defaultValue={user.name} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" defaultValue={user.email} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Save changes</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferences</CardTitle>
                            <CardDescription>
                                Manage your application settings and currency.
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSavePreferences}>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select name="currency" defaultValue={user.currency}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USD">USD ($)</SelectItem>
                                            <SelectItem value="EUR">EUR (€)</SelectItem>
                                            <SelectItem value="GBP">GBP (£)</SelectItem>
                                            <SelectItem value="JPY">JPY (¥)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="notifications" className="flex flex-col space-y-1">
                                        <span>Notifications</span>
                                        <span className="font-normal text-xs text-muted-foreground">
                                            Receive alerts for budget limits.
                                        </span>
                                    </Label>
                                    <Switch id="notifications" name="notifications" defaultChecked={user.notifications} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Save preferences</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>
                                Customize the look and feel of the application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Theme</Label>
                                <div className="flex gap-2">
                                    <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')} className="w-24">
                                        Light
                                    </Button>
                                    <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')} className="w-24">
                                        Dark
                                    </Button>
                                    <Button variant={theme === 'system' ? 'default' : 'outline'} onClick={() => setTheme('system')} className="w-24">
                                        System
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
