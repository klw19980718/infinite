"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="top-center"
      duration={6000}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "rounded-lg border shadow-lg p-4 bg-background text-foreground border-border flex items-start gap-3 min-w-[400px] max-w-[600px]",
          title: "font-semibold text-foreground",
          description: "text-sm text-muted-foreground",
          error: "bg-destructive text-destructive-foreground border-destructive",
          success: "bg-emerald-600 text-white border-emerald-500",
          actionButton: "bg-primary text-primary-foreground hover:bg-primary/90",
          cancelButton: "bg-muted text-muted-foreground hover:bg-muted/80",
          closeButton: "absolute right-2 top-2 text-foreground/50 hover:text-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

