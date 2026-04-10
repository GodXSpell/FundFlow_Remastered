"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import { useSetAtom } from "jotai"
import { isSettingsOpenAtom, isCommandMenuOpenAtom } from "@/lib/store"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const setIsSettingsOpen = useSetAtom(isSettingsOpenAtom)
  const setIsCommandMenuOpen = useSetAtom(isCommandMenuOpenAtom)

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url} onClick={(e) => {
                  if (item.title === "Settings") {
                    e.preventDefault()
                    setIsSettingsOpen(true)
                  } else if (item.title === "Search") {
                    e.preventDefault()
                    setIsCommandMenuOpen(true)
                  }
                }}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
