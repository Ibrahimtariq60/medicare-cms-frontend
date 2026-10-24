import React, { useState } from "react";
import {
  doctors,
  formatTime
} from "../data/appointments";

export default function AppointmentCalendar({
  appointments,
  patients,
  onView,
  onBook
}) {
  const [month, setMonth] = useState(new Date());
  const [doctorFilter, setDoctorFilter] = useState("All");

  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  function changeMonth(amount) {
    setMonth(new Date(year, monthIndex + amount, 1));
  }

  function dateString(day) {
    return [
      year,
      String(monthIndex + 1).padStart(2, "0"),
      String(day).padStart(2, "0")
    ].join("-");
  }

  function getPatient(id) {
    return patients.find(p => p.id === id)?.name || "Unknown Patient";
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Appointment Calendar</h1>
          <p>View scheduled appointments by date and doctor.</p>
        </div>

        <button className="primary-btn" onClick={onBook}>
          Book Appointment
        </button>
      </div>

      <section className="appointment-card">
        <div className="calendar-toolbar">
          <div className="calendar-month-controls">
            <button
              className="outline-btn"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
            >
              Previous
            </button>

            <h2>
              {month.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric"
              })}
            </h2>

            <button
              className="outline-btn"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
            >
              Next
            </button>
          </div>

          <div className="form-field calendar-doctor-filter">
            <label htmlFor="calendar-doctor">Filter by Doctor</label>
            <select
              id="calendar-doctor"
              value={doctorFilter}
              onChange={e => setDoctorFilter(e.target.value)}
            >
              <option value="All">All Doctors</option>

              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="calendar-scroll">
          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
              .map(day => (
                <div className="calendar-day-label" key={day}>
                  {day}
                </div>
              ))}

            {cells.map((day, index) => {
              const date = day ? dateString(day) : null;

              const dayAppointments = appointments.filter(
                a =>
                  a.date === date &&
                  (doctorFilter === "All" ||
                    a.doctorId === doctorFilter)
              );

              return (
                <div
                  className={`calendar-cell ${!day ? "calendar-empty" : ""}`}
                  key={index}
                >
                  {day && (
                    <>
                      <span className="calendar-date">{day}</span>

                      <div className="calendar-events">
                        {dayAppointments.map(a => (
                          <button
                            key={a.id}
                            className={`calendar-event ${a.status.toLowerCase()}`}
                            onClick={() => onView(a.id)}
                            title={`${formatTime(a.time)} - ${getPatient(a.patientId)}`}
                          >
                            <strong>{formatTime(a.time)}</strong>
                            <span>{getPatient(a.patientId)}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
