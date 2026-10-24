import React, { useState } from "react";
import {
  doctors,
  timeSlots,
  today
} from "../data/appointments";

export default function BookAppointment({
  patients,
  appointments,
  onSave,
  onCancel
}) {
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    date: today(),
    time: "",
    reason: "",
    notes: ""
  });

  const [error, setError] = useState("");

  function update(event) {
    const { name, value } = event.target;

    setForm(previous => ({
      ...previous,
      [name]: value,
      ...(name === "date" || name === "doctorId"
        ? { time: "" }
        : {})
    }));

    setError("");
  }

  const availableSlots = timeSlots.filter(slot =>
    !appointments.some(a =>
      a.doctorId === form.doctorId &&
      a.date === form.date &&
      a.time === slot &&
      a.status !== "Cancelled"
    )
  );

  function submit(event) {
    event.preventDefault();

    if (
      !form.patientId ||
      !form.doctorId ||
      !form.date ||
      !form.time ||
      !form.reason.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.date < today()) {
      setError("Please choose today or a future date.");
      return;
    }

    onSave(form);
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Book Appointment</h1>
          <p>Schedule a new patient appointment.</p>
        </div>
      </div>

      <section className="appointment-card appointment-form-card">
        <form onSubmit={submit}>
          <div className="appointment-form-grid">
            <div className="form-field">
              <label htmlFor="book-patient">Patient</label>
              <select
                id="book-patient"
                name="patientId"
                value={form.patientId}
                onChange={update}
                required
              >
                <option value="">Select patient</option>

                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} ({patient.id})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="book-doctor">Doctor</label>
              <select
                id="book-doctor"
                name="doctorId"
                value={form.doctorId}
                onChange={update}
                required
              >
                <option value="">Select doctor</option>

                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="book-date">Appointment Date</label>
              <input
                id="book-date"
                name="date"
                type="date"
                min={today()}
                value={form.date}
                onChange={update}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="book-time">Time Slot</label>
              <select
                id="book-time"
                name="time"
                value={form.time}
                onChange={update}
                disabled={!form.doctorId || !form.date}
                required
              >
                <option value="">Select time</option>

                {availableSlots.map(slot => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {form.doctorId && !availableSlots.length && (
                <small>No available slots for this date.</small>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="book-reason">Reason for Visit</label>
            <input
              id="book-reason"
              name="reason"
              value={form.reason}
              onChange={update}
              placeholder="e.g. Routine checkup"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="book-notes">Notes (optional)</label>
            <textarea
              id="book-notes"
              name="notes"
              rows={4}
              value={form.notes}
              onChange={update}
              placeholder="Additional information"
            />
          </div>

          {error && (
            <p className="appointment-error" role="alert">
              {error}
            </p>
          )}

          <div className="appointment-actions">
            <button className="primary-btn" type="submit">
              Book Appointment
            </button>

            <button
              className="outline-btn"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
