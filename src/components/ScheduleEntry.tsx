import { ScheduleEntry as ScheduleEntryType } from '@/types/schedule';
import { cn } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScheduleEntryProps {
  entry: ScheduleEntryType;
  onEdit: (entry: ScheduleEntryType) => void;
  onDelete: (id: string) => void;
}

function getLevelClass(level: string): string {
  if (level.startsWith('Little Creator')) return 'level-little-creator';
  if (level.startsWith('Junior')) return 'level-junior';
  if (level.startsWith('Teenager')) return 'level-teenager';
  if (level === 'Trial Class') return 'level-trial';
  return '';
}

export function ScheduleEntryCard({ entry, onEdit, onDelete }: ScheduleEntryProps) {
  const coachClass = entry.coach === 'Mr. Bani' ? 'coach-bani' : 'coach-argy';
  const levelClass = getLevelClass(entry.level);

  return (
    <div className={cn('schedule-entry group relative', coachClass)}>
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">{entry.studentName}</p>
          <p className="text-xs text-muted-foreground">{entry.coach}</p>
          <span className={cn('level-badge mt-1 inline-block', levelClass)}>
            {entry.level}
          </span>
          {entry.notes && (
            <p className="text-xs text-muted-foreground mt-1 italic">({entry.notes})</p>
          )}
        </div>
        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(entry);
            }}
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(entry.id);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
