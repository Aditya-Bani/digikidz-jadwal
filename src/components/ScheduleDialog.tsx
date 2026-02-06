import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  ScheduleEntry,
  COACHES,
  LEVELS,
  DAYS,
  TIME_SLOTS,
  DAY_LABELS,
  DayOfWeek,
  TimeSlot,
} from '@/types/schedule';

const formSchema = z.object({
  studentName: z.string().min(1, 'Nama murid wajib diisi').max(100),
  coach: z.enum(['Mr. Bani', 'Mr. Argy']),
  level: z.enum([
    'Little Creator 1', 'Little Creator 2', 'Little Creator 3',
    'Junior 1', 'Junior 2', 'Junior 3',
    'Teenager 1', 'Teenager 2', 'Teenager 3',
    'Trial Class'
  ]),
  day: z.enum(['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu']),
  time: z.enum(['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']),
  notes: z.string().max(200).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry?: ScheduleEntry | null;
  defaultDay?: DayOfWeek;
  defaultTime?: TimeSlot;
  onSave: (data: Omit<ScheduleEntry, 'id'>) => void;
}

export function ScheduleDialog({
  open,
  onOpenChange,
  entry,
  defaultDay,
  defaultTime,
  onSave,
}: ScheduleDialogProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: '',
      coach: 'Mr. Bani',
      level: 'Little Creator 1',
      day: defaultDay || 'senin',
      time: defaultTime || '08:00',
      notes: '',
    },
  });

  useEffect(() => {
    if (entry) {
      form.reset({
        studentName: entry.studentName,
        coach: entry.coach,
        level: entry.level,
        day: entry.day,
        time: entry.time,
        notes: entry.notes || '',
      });
    } else {
      form.reset({
        studentName: '',
        coach: 'Mr. Bani',
        level: 'Little Creator 1',
        day: defaultDay || 'senin',
        time: defaultTime || '08:00',
        notes: '',
      });
    }
  }, [entry, defaultDay, defaultTime, form]);

  const handleSubmit = (data: FormData) => {
    onSave({
      studentName: data.studentName,
      coach: data.coach,
      level: data.level,
      day: data.day,
      time: data.time,
      notes: data.notes || undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {entry ? 'Edit Jadwal Murid' : 'Tambah Jadwal Baru'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Murid</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama murid" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="coach"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coach</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih coach" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover">
                        {COACHES.map((coach) => (
                          <SelectItem key={coach} value={coach}>
                            {coach}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenjang</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenjang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover">
                        {LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hari</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih hari" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover">
                        {DAYS.map((day) => (
                          <SelectItem key={day} value={day}>
                            {DAY_LABELS[day]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jam" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover">
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan (opsional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tambahkan catatan jika perlu..." 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit">
                {entry ? 'Simpan Perubahan' : 'Tambah Jadwal'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
