import React from "react";
import {
  doctors,
  formatDate,
  formatTime
} from "../data/appointments";

export default function AppointmentDetails({
  appointment,
  patients,
  onBack,
  onManage,
  onComplete
}) {
  const patient = patients.find(
    p => p.id === appointment.patientId
  );

  const doctor = doctors.find(
    d => d.id === appointment.doctorId
  );

  const isScheduled = appointment.status === "Scheduled";

  const details = [
    ["Appointment ID", appointment.id],
    ["Patient", patient?.name || "Unknown Patient"],
    ["Doctor", doctor?.name || "Unknown Doctor"],
    ["Date", formatDate(appointment.date)],
    ["Time", formatTime(appointment.time)],
    ["Reason for Visit", appointment.reason]
  ];

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Appointment Details</h1>
          <p>Review appointment information and status.</p>
        </div>

        <button className="outline-btn" onClick={onBack}>
          Back to Appointments
        </button>
      </div>

      <section className="appointment-card appointment-details-card">
        <div className="appointment-details-header">
          <div>
            <h2>{appointment.id}</h2>
            <p>Appointment record</p>
          </div>

          <span className={`appointment-status ${appointment.status.toLowerCase()}`}>
            {appointment.status}
          </span>
        </div>

        <div className="appointment-details-grid">
          {details.map(([label, value]) => (
            <div key={label}>
              <p className="detail-label">{label}</p>
              <p className="detail-value">{value}</p>
            </div>
          ))}
        </div>

        <div className="appointment-notes">
          <h3>Notes</h3>
          <p>{appointment.notes || "No additional notes."}</p>
        </div>

        {appointment.status === "Cancelled" &&
          appointment.cancellationReason && (
            <div className="appointment-notes">
              <h3>Cancellation Reason</h3>
              <p>{appointment.cancellationReason}</p>
            </div>
          )}

        {isScheduled && (
          <div className="appointment-actions">
            <button
              className="primary-btn"
              onClick={() => onComplete(appointment.id)}
            >
              Mark as Completed
            </button>

            <button
              className="outline-btn"
              onClick={() => onManage("reschedule")}
            >
              Reschedule
            </button>

            <button
              className="outline-btn"
              onClick={() => onManage("cancel")}
            >
              Cancel Appointment
            </button>
          </div>
        )}
      </section>
    </>
  );
}
