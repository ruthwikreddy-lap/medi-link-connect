
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-trustBlue-600 text-white hover:bg-trustBlue-500 shadow-md hover:shadow-neon",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-trustBlue-700 bg-transparent hover:bg-trustBlue-950/50 hover:text-trustBlue-400 hover:border-trustBlue-600",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-trustBlue-950/50 hover:text-trustBlue-400",
        link: "text-trustBlue-500 underline-offset-4 hover:underline",
        warm: "bg-warmAccent-600 text-black hover:bg-warmAccent-500 shadow-md",
        trust: "bg-trustBlue-900/70 text-trustBlue-300 hover:bg-trustBlue-800 border border-trustBlue-700/30 hover:border-trustBlue-600/50",
        clinical: "bg-trustBlue-700 text-white hover:bg-trustBlue-600 shadow-sm",
        priority: "bg-warmAccent-700 text-white hover:bg-warmAccent-600 shadow-sm font-medium",
        success: "bg-green-600 text-white hover:bg-green-500 shadow-sm",
        warning: "bg-amber-600 text-white hover:bg-amber-500 shadow-sm",
        critical: "bg-red-600 text-white hover:bg-red-500 shadow-sm font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xl: "h-12 rounded-md px-10 text-base",
        compact: "h-8 rounded px-2 text-xs",
        pill: "h-9 rounded-full px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
