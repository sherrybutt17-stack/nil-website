import * as React from "react"
import { cn } from "@/lib/utils"

/* Native <label>: no client JS needed. */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("text-sm leading-snug font-semibold text-ink", className)}
      {...props}
    />
  )
}

export { Label }
