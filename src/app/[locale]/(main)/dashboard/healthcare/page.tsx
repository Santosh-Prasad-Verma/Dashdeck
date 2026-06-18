import { Activity, Bed, Clock, Heart, Stethoscope, Users } from "lucide-react";

import { AppointmentSchedule } from "./_components/appointment-schedule";
import { BedHeatmap } from "./_components/bed-heatmap";
import { DepartmentBreakdown } from "./_components/department-breakdown";
import { MedicationSchedule } from "./_components/medication-schedule";
import { PatientVolume } from "./_components/patient-volume";
import { ReadmissionGauge } from "./_components/readmission-gauge";
import { StaffOverview } from "./_components/staff-overview";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Healthcare</h1>
        <p className="text-muted-foreground text-sm">
          Monitor patient statistics, appointments, and staff performance.
        </p>
      </div>

      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        {[
          { icon: Users, label: "Patients Today", value: "142", sub: "32 remaining", showSparkline: true },
          { icon: Bed, label: "Beds Available", value: "58", sub: "of 240 total" },
          { icon: Clock, label: "Avg Wait", value: "14m", sub: "↓ 3 min" },
          { icon: Stethoscope, label: "In Surgery", value: "3", sub: "2 scheduled" },
          { icon: Heart, label: "ICU", value: "12", sub: "3 critical" },
          { icon: Activity, label: "Discharges", value: "18", sub: "today" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-4 flex flex-col justify-between">
            <div>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
                <stat.icon className="size-5" />
              </div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="mt-1">
              <p className="text-muted-foreground text-xs">{stat.sub}</p>
              {stat.showSparkline && (
                <svg
                  className="h-6 w-full mt-2 text-muted-foreground/40"
                  viewBox="0 0 100 30"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0,20 C 10,15 15,25 25,18 C 35,11 40,28 50,15 C 60,2 65,22 75,10 C 85,-2 90,15 100,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
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
