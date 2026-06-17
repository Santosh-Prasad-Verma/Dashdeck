import { PatientVolume } from "./_components/patient-volume";
import { DepartmentBreakdown } from "./_components/department-breakdown";
import { AppointmentSchedule } from "./_components/appointment-schedule";
import { StaffOverview } from "./_components/staff-overview";
import { BedHeatmap } from "./_components/bed-heatmap";
import { MedicationSchedule } from "./_components/medication-schedule";
import { ReadmissionGauge } from "./_components/readmission-gauge";
import { Activity, Bed, Clock, Heart, Stethoscope, Users } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Healthcare</h1>
        <p className="text-muted-foreground text-sm">Monitor patient statistics, appointments, and staff performance.</p>
      </div>

      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        {[
          { icon: Users, label: "Patients Today", value: "142", sub: "32 remaining", color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-500/10" },
          { icon: Bed, label: "Beds Available", value: "58", sub: "of 240 total", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
          { icon: Clock, label: "Avg Wait", value: "14m", sub: "↓ 3 min", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
          { icon: Stethoscope, label: "In Surgery", value: "3", sub: "2 scheduled", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10" },
          { icon: Heart, label: "ICU", value: "12", sub: "3 critical", color: "text-red-600 dark:text-red-400", bg: "bg-red-500/10" },
          { icon: Activity, label: "Discharges", value: "18", sub: "today", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-4">
            <div className={`mb-2 flex size-10 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="size-5" />
            </div>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-muted-foreground text-xs">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Patient Volume + Department */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <PatientVolume />
        </div>
        <div className="xl:col-span-4">
          <DepartmentBreakdown />
        </div>
      </div>

      {/* Bed Heatmap + Readmission */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <BedHeatmap />
        </div>
        <div className="xl:col-span-4">
          <ReadmissionGauge />
        </div>
      </div>

      {/* Medication + Appointments */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <MedicationSchedule />
        </div>
        <div className="xl:col-span-5">
          <AppointmentSchedule />
        </div>
      </div>

      <StaffOverview />
    </div>
  );
}
