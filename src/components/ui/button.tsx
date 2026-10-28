import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[3px] font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        athlete: "bg-flare text-ink hover:bg-flare-hover",
        agency: "bg-ultra text-white hover:bg-ultra-hover",
        ink: "bg-ink text-chalk hover:bg-ink-raised",
        chalk: "bg-chalk text-ink hover:bg-white",
        outline: "border-2 border-current bg-transparent hover:bg-current/10",
        link: "h-auto px-0 normal-case tracking-normal underline decoration-2 underline-offset-4 hover:decoration-[3px]",
      },
      size: {
        default: "min-h-12 px-5 text-[0.8125rem]",
        sm: "min-h-10 px-3.5 text-xs",
        lg: "min-h-14 px-7 text-sm",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "ink",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "ink",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
