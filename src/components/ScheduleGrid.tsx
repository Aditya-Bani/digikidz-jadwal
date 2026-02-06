import { DAYS, TIME_SLOTS, DAY_LABELS, DayOfWeek, TimeSlot, ScheduleEntry } from '@/types/schedule';
import { ScheduleEntryCard } from './ScheduleEntry';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScheduleGridProps {
  getEntriesForCell: (day: DayOfWeek, time: TimeSlot) => ScheduleEntry[];
  onAddEntry: (day: DayOfWeek, time: TimeSlot) => void;
  onEditEntry: (entry: ScheduleEntry) => void;
  onDeleteEntry: (id: string) => void;
}

const dayColorClasses: Record<DayOfWeek, string> = {
  senin: 'bg-[hsl(var(--day-senin))] text-white',
  selasa: 'bg-[hsl(var(--day-selasa))] text-white',
  rabu: 'bg-[hsl(var(--day-rabu))] text-white',
  kamis: 'bg-[hsl(var(--day-kamis))] text-white',
  jumat: 'bg-[hsl(var(--day-jumat))] text-white',
  sabtu: 'bg-[hsl(var(--day-sabtu))] text-white',
  minggu: 'bg-[hsl(var(--day-minggu))] text-white',
};

export function ScheduleGrid({
  getEntriesForCell,
  onAddEntry,
  onEditEntry,
  onDeleteEntry,
}: ScheduleGridProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Header Row */}
        <div className="grid grid-cols-8 border-t border-l border-border">
          {/* Time Column Header */}
          <div className="day-header bg-muted border-r border-b border-border">
            <span className="text-muted-foreground">Jam</span>
          </div>
          {/* Day Headers */}
          {DAYS.map((day) => (
            <div
              key={day}
              className={cn('day-header border-r border-b border-border', dayColorClasses[day])}
            >
              {DAY_LABELS[day]}
            </div>
          ))}
        </div>

        {/* Time Slots */}
        {TIME_SLOTS.map((time) => (
          <div key={time} className="grid grid-cols-8 border-l border-border">
            {/* Time Label */}
            <div className="time-slot border-r border-b border-border flex items-center justify-center">
              <span className="font-medium">{time}</span>
            </div>
            {/* Day Cells */}
            {DAYS.map((day) => {
              const entries = getEntriesForCell(day, time);
              return (
                <div
                  key={`${day}-${time}`}
                  className="schedule-cell group relative"
                >
                  {entries.map((entry) => (
                    <ScheduleEntryCard
                      key={entry.id}
                      entry={entry}
                      onEdit={onEditEntry}
                      onDelete={onDeleteEntry}
                    />
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full h-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
                    onClick={() => onAddEntry(day, time)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Tambah
                  </Button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
