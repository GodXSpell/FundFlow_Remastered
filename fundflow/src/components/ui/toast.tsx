"use client"

import { toast as sonnerToast } from "sonner"


// Toast hook
export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: sonnerToast.dismiss,
  }
}

export { sonnerToast as toast }
