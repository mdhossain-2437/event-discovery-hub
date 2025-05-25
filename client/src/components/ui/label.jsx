import React from 'react'
import * as React from "react"
import * "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from '../../lib/utils.js'

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }


