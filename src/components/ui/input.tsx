import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-[#6D6D6D] text-background selection:bg-primary selection:text-primary-foreground h-[60px] w-full min-w-0 rounded-lg bg-input-blank px-3 py-4 lg:text-base transition-[color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:bg-input-hover hover:placeholder:text-background",
        "focus-visible:border-ring focus-visible:ring-background focus-visible:ring-[1px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
