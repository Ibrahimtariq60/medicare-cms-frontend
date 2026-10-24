const dateOffset = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
};

export const today = () => dateOffset(0);

export const doctors = [
  { id: "DOC-01", name: "Dr. Ahmed Raza" },
  { id: "DOC-02", name: "Dr. Sana Malik" },
  { id: "DOC-03", name: "Dr. Hina Farooq" }
];

export const timeSlots = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30"
];

export const initialAppointments = [
  {
    id: "APT-1001",
    patientId: "PAT-1001",
    doctorId: "DOC-01",
    date: dateOffset(0),
    time: "09:00",
    reason: "Routine checkup",
    notes: "Follow-up consultation",
    status: "Scheduled"
  },
  {
    id: "APT-1002",
    patientId: "PAT-1002",
    doctorId: "DOC-02",
    date: dateOffset(0),
    time: "10:30",
    reason: "Fever and headache",
    notes: "Symptoms started yesterday",
    status: "Scheduled"
  },
  {
    id: "APT-1003",
    patientId: "PAT-1003",
    doctorId: "DOC-03",
    date: dateOffset(0),
    time: "11:30",
    reason: "General consultation",
    notes: "",
    status: "Completed"
  },
  {
    id: "APT-1004",
    patientId: "PAT-1004",
    doctorId: "DOC-01",
    date: dateOffset(0),
    time: "14:00",
    reason: "Back pain",
    notes: "Review previous symptoms",
    status: "Cancelled"
  },
  {
    id: "APT-1005",
    patientId: "PAT-1001",
    doctorId: "DOC-02",
    date: dateOffset(1),
    time: "10:00",
    reason: "Follow-up visit",
    notes: "",
    status: "Scheduled"
  },
  {
    id: "APT-1006",
    patientId: "PAT-1002",
    doctorId: "DOC-01",
    date: dateOffset(3),
    time: "15:00",
    reason: "Blood pressure review",
    notes: "",
    status: "Scheduled"
  }
];

export function formatDate(value) {
  if (!value) return "—";

  return new Date(`${value}T00:00:00`)
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
}

export function formatTime(value) {
  if (!value) return "—";

  const [hours, minutes] = value.split(":").map(Number);

  return new Date(2000, 0, 1, hours, minutes)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    });
}
