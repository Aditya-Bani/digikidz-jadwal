import { useState, useCallback } from 'react';
import { ScheduleEntry, DayOfWeek, TimeSlot } from '@/types/schedule';

// Sample data based on the Excel file
const initialSchedule: ScheduleEntry[] = [
  { id: '1', studentName: 'Neil', coach: 'Mr. Bani', level: 'Little Creator 1', day: 'sabtu', time: '09:00' },
  { id: '2', studentName: 'Aufar', coach: 'Mr. Argy', level: 'Teenager 1', day: 'sabtu', time: '10:00' },
  { id: '3', studentName: 'Chelsea', coach: 'Mr. Bani', level: 'Junior 1', day: 'sabtu', time: '10:00' },
  { id: '4', studentName: 'Donna', coach: 'Mr. Bani', level: 'Junior 1', day: 'sabtu', time: '10:00' },
  { id: '5', studentName: 'George', coach: 'Mr. Argy', level: 'Teenager 1', day: 'sabtu', time: '11:00' },
  { id: '6', studentName: 'Marchia', coach: 'Mr. Bani', level: 'Junior 1', day: 'sabtu', time: '11:00' },
  { id: '7', studentName: 'Veve', coach: 'Mr. Bani', level: 'Junior 1', day: 'senin', time: '13:00' },
  { id: '8', studentName: 'Donna', coach: 'Mr. Bani', level: 'Junior 1', day: 'senin', time: '13:00' },
  { id: '9', studentName: 'Kristof', coach: 'Mr. Bani', level: 'Little Creator 1', day: 'selasa', time: '13:00' },
  { id: '10', studentName: 'Jetro', coach: 'Mr. Argy', level: 'Teenager 2', day: 'sabtu', time: '13:00' },
  { id: '11', studentName: 'El', coach: 'Mr. Bani', level: 'Teenager 1', day: 'selasa', time: '14:00' },
  { id: '12', studentName: 'Ismail', coach: 'Mr. Bani', level: 'Little Creator 1', day: 'rabu', time: '14:00' },
  { id: '13', studentName: 'Darren', coach: 'Mr. Argy', level: 'Teenager 1', day: 'kamis', time: '14:00' },
  { id: '14', studentName: 'Clarisha', coach: 'Mr. Bani', level: 'Teenager 1', day: 'jumat', time: '14:00' },
  { id: '15', studentName: 'Lubna', coach: 'Mr. Bani', level: 'Trial Class', day: 'sabtu', time: '14:00' },
  { id: '16', studentName: 'Lionel', coach: 'Mr. Argy', level: 'Teenager 2', day: 'jumat', time: '14:00' },
  { id: '17', studentName: 'Kania', coach: 'Mr. Bani', level: 'Teenager 2', day: 'senin', time: '15:00' },
  { id: '18', studentName: 'Nora', coach: 'Mr. Bani', level: 'Little Creator 1', day: 'selasa', time: '15:00' },
  { id: '19', studentName: 'Safaa', coach: 'Mr. Bani', level: 'Junior 1', day: 'rabu', time: '15:00' },
  { id: '20', studentName: 'Nael', coach: 'Mr. Bani', level: 'Teenager 1', day: 'kamis', time: '15:00' },
  { id: '21', studentName: 'Nael', coach: 'Mr. Argy', level: 'Teenager 1', day: 'jumat', time: '15:00' },
  { id: '22', studentName: 'Sherleen', coach: 'Mr. Argy', level: 'Junior 1', day: 'kamis', time: '15:00' },
  { id: '23', studentName: 'Ara', coach: 'Mr. Bani', level: 'Little Creator 1', day: 'rabu', time: '16:00' },
  { id: '24', studentName: 'Jacob', coach: 'Mr. Argy', level: 'Teenager 2', day: 'kamis', time: '16:00', notes: 'Cuti' },
  { id: '25', studentName: 'Barta', coach: 'Mr. Argy', level: 'Teenager 2', day: 'kamis', time: '16:00' },
  { id: '26', studentName: 'Nehal', coach: 'Mr. Bani', level: 'Junior 1', day: 'jumat', time: '16:00' },
  { id: '27', studentName: 'Ara', coach: 'Mr. Bani', level: 'Little Creator 1', day: 'senin', time: '16:00' },
  { id: '28', studentName: 'Bilal', coach: 'Mr. Bani', level: 'Junior 1', day: 'kamis', time: '16:00' },
  { id: '29', studentName: 'Barta', coach: 'Mr. Argy', level: 'Teenager 1', day: 'jumat', time: '16:00' },
  { id: '30', studentName: 'Luna', coach: 'Mr. Argy', level: 'Little Creator 1', day: 'kamis', time: '17:00', notes: 'Keep' },
  { id: '31', studentName: 'Abee', coach: 'Mr. Bani', level: 'Trial Class', day: 'rabu', time: '17:00' },
  { id: '32', studentName: 'Leia', coach: 'Mr. Bani', level: 'Junior 1', day: 'kamis', time: '17:00', notes: 'Keep' },
];

export function useSchedule() {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(initialSchedule);

  const addEntry = useCallback((entry: Omit<ScheduleEntry, 'id'>) => {
    const newEntry: ScheduleEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setSchedule((prev) => [...prev, newEntry]);
  }, []);

  const updateEntry = useCallback((id: string, updates: Partial<Omit<ScheduleEntry, 'id'>>) => {
    setSchedule((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setSchedule((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const getEntriesForCell = useCallback(
    (day: DayOfWeek, time: TimeSlot) => {
      return schedule.filter((entry) => entry.day === day && entry.time === time);
    },
    [schedule]
  );

  return {
    schedule,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesForCell,
  };
}
