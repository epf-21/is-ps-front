"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { es } from "date-fns/locale";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
    locale={es}
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        //month_caption: "relative flex items-center justify-start mb-4 text-lg font-semibold",////

        caption_label: "text-sm font-medium text-left mt-4 ml-4",
        /*nav: "absolute right-0 top-0 flex items-center gap-1", 
        //el fill para que cabie a fuerza el color de los iconos de cambiar de es a negro
        button_previous: "p-1 rounded hover:bg-gray-100 transition [&>svg]:!fill-black mt-2",
        button_next: "p-1 rounded hover:bg-gray-100 transition [&>svg]:!fill-black mt-2",*/
        month_caption:
          "relative flex items-center justify-start text-lg font-semibold h-10",
        nav: "absolute right-4 top-1 flex items-center gap-1 z-10",
        button_previous:
          "p-1 rounded hover:bg-gray-100 transition [&>svg]:!fill-black",
        button_next:
          "p-1 rounded hover:bg-gray-100 transition [&>svg]:!fill-black",

        month_grid: "w-full border-collapse space-x-0",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        week: "flex w-full mt-1",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "w-7 h-7 p-0 font-normal aria-selected:opacity-100"
        ),
        day_button: "",
        range_start:
          "aria-selected:bg-primary aria-selected:text-primary-foreground",
        range_end:
          "aria-selected:bg-primary aria-selected:text-primary-foreground",
        selected:
          "bg-blue-600 text-white data-outside:bg-transparent data-outside:text-muted-foreground",
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
