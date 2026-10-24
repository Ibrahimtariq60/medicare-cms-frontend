import React from "react";
import {
  formatTime,
  doctors,
  today
} from "../data/appointments";

export default function AppointmentDashboard({
  appointments,
  patients,
  onBook,
  onView
}) {
  const todayDate = today();

  const todayAppointments = appointments
    .filter(a => a.date === todayDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  const upcoming = appointments.filter(
    a => a.status === "Scheduled" &&
      `${a.date}T${a.time}` >=
      `${todayDate}T${new Date().toTimeString().slice(0, 5)}`
  ).length;

  const completed = appointments.filter(
    a => a.status === "Completed"
  ).length;

  const cancelled = appointments.filter(
    a => a.status === "Cancelled"
  ).length;

  const getPatient = id =>
    patients.find(p => p.id === id)?.name || "Unknown Patient";

  const getDoctor = id =>
    doctors.find(d => d.id === id)?.name || "Unknown Doctor";

  const metrics = [
    ["Today's Appointments", todayAppointments.length],
    ["Upcoming", upcoming],
    ["Completed", completed],
    ["Cancelled", cancelled]
  ];

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Appointment Dashboard</h1>
          <p>Overview of clinic appointments and schedules.</p>
        </div>

        <button className="primary-btn" onClick={onBook}>
          Book Appointment
        </button>
      </div>

      <div className="appointment-stats">
        {metrics.map(([label, value]) => (
          <div className="appointment-card" key={label}>
            <p className="stat-label">{label}</p>
            <h2 className="stat-value">{value}</h2>
          </div>
        ))}
      </div>

      <section className="appointment-card">
        <h2 className="section-title">Today's Appointments</h2>

        <div className="table-scroll">
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {todayAppointments.map(a => (
                <tr key={a.id}>
                  <td>{formatTime(a.time)}</td>
                  <td>{getPatient(a.patientId)}</td>
                  <td>{getDoctor(a.doctorId)}</td>
                  <td>
                    <span className={`appointment-status ${a.status.toLowerCase()}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="text-btn"
                      onClick={() => onView(a.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {todayAppointments.length === 0 && (
            <p className="empty-message">
              No appointments scheduled for today.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
