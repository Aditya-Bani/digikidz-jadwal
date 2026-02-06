import { CalendarDays, GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DIGIKIDZ
              </h1>
              <p className="text-sm text-muted-foreground">Kota Wisata Cibubur</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="w-5 h-5" />
            <span className="text-sm font-medium">Jadwal Les</span>
          </div>
        </div>
      </div>
    </header>
  );
}
