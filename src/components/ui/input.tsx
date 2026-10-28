import * as React from "react"
import { cn } from "@/lib/utils"

const fieldBase =
  "w-full min-w-0 rounded-[3px] border-2 border-smoke bg-paper px-3.5 text-base text-ink transition-[border-color,box-shadow] placeholder:text-smoke/80 hover:border-ink disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-danger aria-invalid:bg-danger/[0.03]"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldBase, "h-12", className)}
      {...props}
    />
  )
}

export { Input, fieldBase }
