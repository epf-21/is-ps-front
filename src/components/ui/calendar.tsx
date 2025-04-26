"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        month_caption: "relative flex flex-col items-start gap-2 mb-4 px-4",
        caption_label: "text-sm font-medium mt-6",
        nav: "absolute right-4 top-1 flex items-center gap-1 z-10",
        button_previous:
          "p-1 rounded hover:bg-gray-100 transition [&>svg]:!fill-black",
        button_next:
          "p-1 rounded hover:bg-gray-100 transition [&>svg]:!fill-black",

        //el fill para que cabie a fuerza el color de los iconos de cambiar de es a negro
        //button_previous: "p-1 rounded hover:bg-gray-100 transition [&>svg]:!fill-black",
        //button_next: "p-1 rounded hover:bg-gray-100 transition [&>svg]:!fill-black",
        month_grid: "w-full border-collapse space-x-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_button: "",
        range_start:
          "aria-selected:bg-primary aria-selected:text-primary-foreground",
        range_end:
          "aria-selected:bg-primary aria-selected:text-primary-foreground",
          selected:
          "bg-primary text-white hover:bg-primary hover:text-white data-outside:text-white",        
        //  selected: "bg-primary text-white data-outside:bg-transparent data-outside:text-muted-foreground",para que no se pinte de la otra semana
        today: "bg-accent text-accent-foreground",
        outside: "text-muted-foreground aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}

export { Calendar };
