import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-[#6D6D6D] text-background selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-32 w-full rounded-md bg-input-blank px-3 py-4 transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 text-base md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
