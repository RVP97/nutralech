"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const activities = [
  { value: "caminar", label: "Caminar" },
  { value: "correr", label: "Correr" },
  { value: "ciclismo", label: "Ciclismo" },
  { value: "natacion", label: "Natación" },
  { value: "baloncesto", label: "Baloncesto" },
  { value: "futbol", label: "Fútbol" },
  { value: "voleibol", label: "Voleibol" },
  { value: "tenis", label: "Tenis" },
  { value: "badminton", label: "Bádminton" },
  { value: "pesas", label: "Pesas" },
  { value: "crossfit", label: "CrossFit" },
  { value: "yoga", label: "Yoga" },
  { value: "boxeo", label: "Boxeo" },
  { value: "artesMarciales", label: "Artes Marciales" },
  { value: "baile", label: "Baile" },
  { value: "esqui", label: "Esquí" },
  { value: "remo", label: "Remo" },
  { value: "senderismo", label: "Senderismo" },
  { value: "escalada", label: "Escalada" },
  { value: "pilates", label: "Pilates" },
  { value: "zumba", label: "Zumba" },
  { value: "spinning", label: "Spinning" },
  { value: "aerobics", label: "Aeróbics" },
  { value: "eliptica", label: "Elíptica" },
  { value: "paddel", label: "Pádel" },
  { value: "rugby", label: "Rugby" },
  { value: "hockey", label: "Hockey" },
  { value: "patinaje", label: "Patinaje" },
  { value: "surfing", label: "Surf" },
  { value: "jumpingRope", label: "Saltar la Cuerda" },
  { value: "taichi", label: "Tai Chi" },
  { value: "kickboxing", label: "Kickboxing" },
  { value: "atletismo", label: "Atletismo" },
  { value: "gimnasiaRitmica", label: "Gimnasia Rítmica" },
].sort((a, b) => a.label.localeCompare(b.label));

interface ActivityComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function ActivityCombobox({ value, onChange }: ActivityComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? activities.find((activity) => activity.value === value)?.label
            : "Selecciona una actividad..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar actividad..." />
          <CommandList>
            <CommandEmpty>No se encontró ninguna actividad.</CommandEmpty>
            <CommandGroup>
              {activities.map((activity) => (
                <CommandItem
                  key={activity.value}
                  value={activity.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {activity.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === activity.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
