import { useState } from 'react';
import { Header } from '@/components/Header';
import { StatsCards } from '@/components/StatsCards';
import { ScheduleGrid } from '@/components/ScheduleGrid';
import { ScheduleDialog } from '@/components/ScheduleDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { useSchedule } from '@/hooks/useSchedule';
import { ScheduleEntry, DayOfWeek, TimeSlot } from '@/types/schedule';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { schedule, addEntry, updateEntry, deleteEntry, getEntriesForCell } = useSchedule();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ScheduleEntry | null>(null);
  const [defaultDay, setDefaultDay] = useState<DayOfWeek>('senin');
  const [defaultTime, setDefaultTime] = useState<TimeSlot>('08:00');

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingEntry, setDeletingEntry] = useState<ScheduleEntry | null>(null);

  const handleAddClick = (day: DayOfWeek, time: TimeSlot) => {
    setEditingEntry(null);
    setDefaultDay(day);
    setDefaultTime(time);
    setDialogOpen(true);
  };

  const handleEditClick = (entry: ScheduleEntry) => {
    setEditingEntry(entry);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const entry = schedule.find((e) => e.id === id);
    if (entry) {
      setDeletingEntry(entry);
      setDeleteDialogOpen(true);
    }
  };

  const handleSave = (data: Omit<ScheduleEntry, 'id'>) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, data);
      toast({
        title: 'Berhasil!',
        description: `Jadwal ${data.studentName} berhasil diperbarui.`,
      });
    } else {
      addEntry(data);
      toast({
        title: 'Berhasil!',
        description: `Jadwal ${data.studentName} berhasil ditambahkan.`,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deletingEntry) {
      deleteEntry(deletingEntry.id);
      toast({
        title: 'Dihapus',
        description: `Jadwal ${deletingEntry.studentName} berhasil dihapus.`,
        variant: 'destructive',
      });
      setDeletingEntry(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Stats */}
        <StatsCards schedule={schedule} />

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Jadwal Mingguan</h2>
            <p className="text-sm text-muted-foreground">
              Klik pada sel untuk menambah atau mengedit jadwal murid
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingEntry(null);
              setDefaultDay('senin');
              setDefaultTime('08:00');
              setDialogOpen(true);
            }}
            className="shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Jadwal
          </Button>
        </div>

        {/* Schedule Grid */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <ScheduleGrid
            getEntriesForCell={getEntriesForCell}
            onAddEntry={handleAddClick}
            onEditEntry={handleEditClick}
            onDeleteEntry={handleDeleteClick}
          />
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[hsl(var(--coach-bani)/0.3)] border-l-4 border-[hsl(var(--coach-bani))]" />
            <span className="text-sm text-muted-foreground">Mr. Bani</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[hsl(var(--coach-argy)/0.3)] border-l-4 border-[hsl(var(--coach-argy))]" />
            <span className="text-sm text-muted-foreground">Mr. Argy</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <span className="level-badge level-little-creator">Little Creator</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="level-badge level-junior">Junior</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="level-badge level-teenager">Teenager</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="level-badge level-trial">Trial Class</span>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <ScheduleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        entry={editingEntry}
        defaultDay={defaultDay}
        defaultTime={defaultTime}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        studentName={deletingEntry?.studentName}
      />
    </div>
  );
};

export default Index;
