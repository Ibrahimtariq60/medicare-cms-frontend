import React, { useState } from "react";
import {
  doctors,
  timeSlots,
  today
} from "../data/appointments";

export default function ManageAppointment({
  appointment,
  appointments,
  initialMode = "reschedule",
  onSave,
  onBack
}) {
  const [mode, setMode] = useState(initialMode);

  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);
  const [reason, setReason] = useState("");

  const [cancelReason, setCancelReason] = useState("");
  const [error, setError] = useState("");

  const doctor = doctors.find(
    d => d.id === appointment.doctorId
  );

  const availableSlots = timeSlots.filter(slot =>
    !appointments.some(a =>
      a.id !== appointment.id &&
      a.doctorId === appointment.doctorId &&
      a.date === date &&
      a.time === slot &&
      a.status !== "Cancelled"
    )
  );

  function submit(event) {
    event.preventDefault();

    if (mode === "reschedule") {
      if (!date || !time || !reason.trim()) {
        setError("Please complete all required fields.");
        return;
      }

      if (date < today()) {
        setError("Please choose today or a future date.");
        return;
      }

      if (!availableSlots.includes(time)) {
        setError("This time slot is not available.");
        return;
      }

      onSave({
        ...appointment,
        date,
        time,
        rescheduleReason: reason,
        status: "Scheduled"
      });
    } else {
      if (!cancelReason) {
        setError("Please select a cancellation reason.");
        return;
      }

      onSave({
        ...appointment,
        status: "Cancelled",
        cancellationReason: cancelReason
      });
    }
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Manage Appointment</h1>
          <p>{appointment.id} · {doctor?.name}</p>
        </div>
      </div>

      <section className="appointment-card appointment-form-card">
        <div className="appointment-mode-tabs">
          <button
            className={mode === "reschedule" ? "selected" : ""}
            onClick={() => {
              setMode("reschedule");
              setError("");
            }}
            type="button"
          >
            Reschedule
          </button>

          <button
            className={mode === "cancel" ? "selected" : ""}
            onClick={() => {
              setMode("cancel");
              setError("");
            }}
            type="button"
          >
            Cancel Appointment
          </button>
        </div>

        <form onSubmit={submit}>
          {mode === "reschedule" ? (
            <>
              <div className="appointment-form-grid">
                <div className="form-field">
                  <label htmlFor="new-date">New Date</label>
                  <input
                    id="new-date"
                    type="date"
                    min={today()}
                    value={date}
                    onChange={e => {
                      setDate(e.target.value);
                      setTime("");
                      setError("");
                    }}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="new-time">New Time</label>
                  <select
                    id="new-time"
                    value={time}
                    onChange={e => {
                      setTime(e.target.value);
                      setError("");
                    }}
                    required
                  >
                    <option value="">Select time</option>

                    {availableSlots.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="reschedule-reason">
                  Reason for Rescheduling
                </label>
                <textarea
                  id="reschedule-reason"
                  rows={3}
                  value={reason}
                  onChange={e => {
                    setReason(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter reason"
                  required
                />
              </div>
            </>
          ) : (
            <div className="form-field">
              <label htmlFor="cancel-reason">
                Cancellation Reason
              </label>

              <select
                id="cancel-reason"
                value={cancelReason}
                onChange={e => {
                  setCancelReason(e.target.value);
                  setError("");
                }}
                required
              >
                <option value="">Select reason</option>
                <option>Patient unavailable</option>
                <option>Doctor unavailable</option>
                <option>Schedule conflict</option>
                <option>Other</option>
              </select>
            </div>
          )}

          {error && (
            <p className="appointment-error" role="alert">
              {error}
            </p>
          )}

          <div className="appointment-actions">
            <button className="primary-btn" type="submit">
              {mode === "reschedule"
                ? "Save New Schedule"
                : "Confirm Cancellation"}
            </button>

            <button
              className="outline-btn"
              type="button"
              onClick={onBack}
            >
              Back
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
