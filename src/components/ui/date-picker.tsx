
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface DatePickerProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: boolean
  showTooltip?: boolean
  tooltipText?: string
}

export function DatePicker({ 
  selected, 
  onSelect, 
  disabled = false,
  showTooltip = false,
  tooltipText = "Select a date"
}: DatePickerProps) {
  const content = (
    <Button
      variant={"outline"}
      disabled={disabled}
      className={cn(
        "w-full justify-start text-left font-normal",
        !selected && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {selected ? format(selected, "PPP") : <span>Pick a date</span>}
    </Button>
  );

  return (
    <Popover>
      {showTooltip ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              {content}
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      ) : (
        <PopoverTrigger asChild>
          {content}
        </PopoverTrigger>
      )}
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
