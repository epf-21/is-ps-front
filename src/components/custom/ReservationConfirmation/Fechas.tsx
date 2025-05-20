"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, XCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

type ElegirFechasProps = {
  onChange: (fechas: { pickupDate?: Date; returnDate?: Date }) => void;
};

export default function ElegirFechas({ onChange }: ElegirFechasProps) {
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);

  const clearPickupDate = () => setPickupDate(undefined);
  const clearReturnDate = () => setReturnDate(undefined);

  const [pickupOpen, setPickupOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center sm:flex-row gap-3 w-full">
      {/* Fecha de Recogida */}
      <Popover open={pickupOpen} onOpenChange={setPickupOpen}>  {/* para cerrar cuando se seleccione una feca */}
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full sm:w-45 h-auto flex items-center gap-2 text-left font-normal border border-gray-500 px-4 py-2"
          >
            <CalendarIcon className="h-5 w-5" />
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold">Fecha de recogida</span>
              <span className="text-sm">
                {pickupDate
                  ? format(pickupDate, "dd '/' MMMM '/' yyyy", { locale: es })
                  : "Agrega una Fecha"}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={pickupDate}
            onSelect={(date) => {
              setPickupDate(date);
              if (date) {
                //const fechaFormateada = format(date, "dd '/' MMMM '/' yyyy", {
                //  locale: es,
                //});
                onChange({ pickupDate: date, returnDate }); ///cambiao
                setPickupOpen(false);//cerrar cuando se selecciono una fecha
              }
            }}
            disabled={(date) => date < new Date()}
          />
          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearPickupDate}
              className="w-full flex items-center justify-center text-red-500"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Limpiar fecha
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Fecha de Devolución */}
      <Popover open={returnOpen} onOpenChange={setReturnOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full sm:w-45 h-auto flex items-center gap-2 text-left font-normal border border-gray-500 px-4 py-2"
          >
            <CalendarIcon className="h-5 w-5" />
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold">Fecha de devolución</span>
              <span className="text-sm">
                {returnDate
                  ? format(returnDate, "dd '/' MMMM '/' yyyy", { locale: es })
                  : "Agrega una Fecha"}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={returnDate}
            onSelect={(date) => {
              setReturnDate(date);
              if (date) {
                //const fechaFormateada = format(date, "dd '/' MMMM '/' yyyy", {
                //  locale: es,
                //});
                onChange({ pickupDate, returnDate: date });
                setReturnOpen(false);
              }
            }}
            disabled={(date) => {
              if (!pickupDate) return false;
              return date < pickupDate;
            }}
          />

          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearReturnDate}
              className="w-full flex items-center justify-center text-red-500"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Limpiar fecha
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
