
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-trustBlue-600 text-white hover:bg-trustBlue-500",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-trustBlue-800 text-trustBlue-400",
        trust: "border-trustBlue-700/30 bg-trustBlue-900/30 text-trustBlue-400 hover:bg-trustBlue-800/50",
        secure: "border-trustBlue-700/30 bg-trustBlue-900/30 text-trustBlue-400 hover:bg-trustBlue-800/50 shadow-trust animate-trust-pulse",
        warm: "border-transparent bg-warmAccent-600 text-black hover:bg-warmAccent-500",
        pulse: "border-transparent bg-trustBlue-600 text-white animate-pulse shadow-neon",
        glow: "border-transparent bg-trustBlue-500 text-white shadow-neon animate-glow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
