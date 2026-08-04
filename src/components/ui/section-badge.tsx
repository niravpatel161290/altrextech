import * as React from "react"
import { Badge } from "@/components/ui/badge"
import InViewDecryptedText from "@/components/InViewDecryptedText"
import { cn } from "@/lib/utils"

export interface SectionBadgeProps extends React.ComponentProps<typeof Badge> {
  title?: string
  dot?: boolean
  dotColor?: string
  pulse?: boolean
  decryptedTextClassName?: string
}

export function SectionBadge({
  title,
  dot = false,
  dotColor = "bg-emerald-500",
  pulse = true,
  className,
  decryptedTextClassName,
  variant = "secondary",
  children,
  ...props
}: SectionBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn("border-border bg-card shadow-sm px-3 py-2 gap-2", className)}
      {...props}
    >
      {dot && pulse && (
        <div className={cn("flex h-4 w-4 shrink-0 items-center self-start mt-0.5 sm:self-center sm:mt-0 justify-center rounded-full", dotColor)}>
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        </div>
      )}
      {dot && !pulse && (
        <span className={cn("inline-block h-2 w-2 shrink-0 self-start mt-1.5 sm:self-center sm:mt-0 rounded-full", dotColor)} />
      )}
      {title ? (
        <span className="font-mono text-[11px] leading-snug sm:text-xs sm:leading-normal md:text-sm text-foreground">
          <InViewDecryptedText
            text={title}
            speed={60}
            maxIterations={12}
            className={cn("text-foreground uppercase", decryptedTextClassName)}
            encryptedClassName="text-muted-foreground"
          />
        </span>
      ) : (
        children
      )}
    </Badge>
  );
}
