import { Users, UserCheck, BookOpen, Clock } from 'lucide-react';
import { ScheduleEntry, COACHES } from '@/types/schedule';

interface StatsCardsProps {
  schedule: ScheduleEntry[];
}

export function StatsCards({ schedule }: StatsCardsProps) {
  const totalStudents = new Set(schedule.map((e) => e.studentName)).size;
  const coachStats = COACHES.map((coach) => ({
    name: coach,
    count: schedule.filter((e) => e.coach === coach).length,
  }));
  const totalSessions = schedule.length;

  const stats = [
    {
      icon: Users,
      label: 'Total Murid',
      value: totalStudents,
      color: 'from-primary to-primary/70',
    },
    {
      icon: UserCheck,
      label: coachStats[0].name,
      value: `${coachStats[0].count} sesi`,
      color: 'from-[hsl(var(--coach-bani))] to-[hsl(var(--coach-bani)/0.7)]',
    },
    {
      icon: UserCheck,
      label: coachStats[1].name,
      value: `${coachStats[1].count} sesi`,
      color: 'from-[hsl(var(--coach-argy))] to-[hsl(var(--coach-argy)/0.7)]',
    },
    {
      icon: Clock,
      label: 'Total Sesi',
      value: totalSessions,
      color: 'from-accent to-accent/70',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
