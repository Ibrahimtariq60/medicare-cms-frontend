import React,{useState} from 'react';
import{LayoutDashboard,Building2,Users,ContactRound,CalendarDays,LogOut}from'lucide-react';
import Login from './auth/pages/Login';
import ForgotPassword from './auth/pages/ForgotPassword';
import ChooseClinic from './auth/pages/ChooseClinic';
import Invitation from './auth/pages/Invitation';
import AccessDenied from './auth/pages/AccessDenied';
import ClinicDashboard from './tenant-admin/pages/ClinicDashboard';
import ClinicProfile from './tenant-admin/pages/ClinicProfile';
import StaffDirectory from './tenant-admin/pages/StaffDirectory';
import StaffForm from './tenant-admin/pages/StaffForm';
import PatientDirectory from './patients/PatientDirectory';
import RegisterPatient from './patients/RegisterPatient';
import EditPatient from './patients/EditPatient';
import PatientProfile from './patients/PatientProfile';
import PatientHistory from './patients/PatientHistory';
import AppointmentDashboard from './appointments/pages/AppointmentDashboard';
import AppointmentCalendar from './appointments/pages/AppointmentCalendar';
import BookAppointment from './appointments/pages/BookAppointment';
import AppointmentDetails from './appointments/pages/AppointmentDetails';
import ManageAppointment from './appointments/pages/ManageAppointment';
import{initialPatients}from'./patients/data';
import{initialAppointments}from'./appointments/data/appointments';
const initialClinic = {
  name: "City Care Clinic",
  address: "Main Boulevard, Gulberg, Lahore",
  phone: "+92 42 3578 1234",
  email: "info@citycare.example"
};

const initialStaff = [
  {
    id: 1,
    name: "Ahmed Raza",
    email: "ahmed@citycare.example",
    phone: "0300-1234567",
    role: "Doctor",
    status: "Active"
  },
  {
    id: 2,
    name: "Sara Khan",
    email: "sara@citycare.example",
    phone: "0301-2345678",
    role: "Nurse",
    status: "Active"
  },
  {
    id: 3,
    name: "Ali Hassan",
    email: "ali@citycare.example",
    phone: "0302-3456789",
    role: "Receptionist",
    status: "Active"
  },
  {id:4,name:"Fatima Noor",email:"fatima@citycare.example",phone:"0303-4567890",role:"Pharmacist",status:"Inactive"}
];

export default function App() {
  const [page, setPage] = useState("login");

  const [clinic, setClinic] = useState(initialClinic);
  const [clinicId,setClinicId]=useState('city');
  const [authClinicName,setAuthClinicName]=useState('City Care Clinic');
  const [staff, setStaff] = useState(initialStaff);
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] =
    useState(initialAppointments);

  const [editingStaff, setEditingStaff] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState(null);

  const [manageMode, setManageMode] = useState("reschedule");
  const [message, setMessage] = useState("");

  const selectedPatient = patients.find(
    p => p.id === selectedPatientId
  );

  const selectedAppointment = appointments.find(
    a => a.id === selectedAppointmentId
  );

  function navigate(nextPage) {
    setPage(nextPage);
    setMessage("");
  }

  function notify(text, nextPage) {
    setMessage(text);
    setPage(nextPage);
  }

  // Staff actions

  function saveStaff(person) {
    if (editingStaff) {
      setStaff(previous =>
        previous.map(s =>
          s.id === editingStaff.id ? person : s
        )
      );
    } else {
      setStaff(previous => [
        ...previous,
        { ...person, id: Date.now() }
      ]);
    }

    setEditingStaff(null);
    notify("Staff saved successfully.", "staff");
  }

  // Patient actions

  function registerPatient(form) {
    const highest = patients.reduce((max, patient) => {
      return Math.max(max, Number(patient.id.split("-")[1]) || 0);
    }, 1000);

    const id = `PAT-${highest + 1}`;

    setPatients(previous => [
      ...previous,
      {
        ...form,
        id,
        status: "Active",
        allergies: "None reported",
        visits: []
      }
    ]);

    setSelectedPatientId(id);
    notify("Patient registered successfully.", "patient-profile");
  }

  function updatePatient(form) {
    setPatients(previous =>
      previous.map(patient =>
        patient.id === selectedPatientId
          ? { ...patient, ...form }
          : patient
      )
    );

    notify("Patient updated successfully.", "patient-profile");
  }

  function addVisit(patientId, visit) {
    setPatients(previous =>
      previous.map(patient =>
        patient.id === patientId
          ? {
              ...patient,
              visits: [...(patient.visits || []), visit]
            }
          : patient
      )
    );

    setMessage("Visit note saved successfully.");
  }

  // Appointment actions

  function viewAppointment(id) {
    setSelectedAppointmentId(id);
    navigate("appointment-details");
  }

  function bookAppointment(form) {
    const highest = appointments.reduce((max, a) => {
      return Math.max(max, Number(a.id.split("-")[1]) || 0);
    }, 1000);

    const id = `APT-${highest + 1}`;

    setAppointments(previous => [
      ...previous,
      { ...form, id, status: "Scheduled" }
    ]);

    setSelectedAppointmentId(id);

    notify(
      "Appointment booked successfully.",
      "appointment-details"
    );
  }

  function manageAppointment(mode) {
    setManageMode(mode);
    navigate("appointment-manage");
  }

  function saveManagedAppointment(updated) {
    setAppointments(previous =>
      previous.map(a =>
        a.id === updated.id ? updated : a
      )
    );

    notify(
      updated.status === "Cancelled"
        ? "Appointment cancelled successfully."
        : "Appointment rescheduled successfully.",
      "appointment-details"
    );
  }

  function completeAppointment(id) {
    setAppointments(previous =>
      previous.map(a =>
        a.id === id
          ? { ...a, status: "Completed" }
          : a
      )
    );

    setMessage("Appointment marked as completed.");
  }

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Clinic Profile", icon: Building2 },
    { id: "staff", label: "Staff", icon: Users },
    { id: "patients", label: "Patients", icon: ContactRound },
    { id: "appointments", label: "Appointments", icon: CalendarDays }
  ];

  const patientPages = [
    "patients",
    "patient-register",
    "patient-edit",
    "patient-profile",
    "patient-history"
  ];

  const appointmentPages = [
    "appointments",
    "appointment-calendar",
    "appointment-book",
    "appointment-details",
    "appointment-manage"
  ];

  const authPages=['login','forgot','clinic','invitation','denied'];
  if(authPages.includes(page))return <div className="unified-auth module-auth">
    {page==='login'&&<Login go={navigate} clinic={authClinicName} onLogin={()=>navigate('dashboard')}/>}
    {page==='forgot'&&<ForgotPassword go={navigate}/>}
    {page==='clinic'&&<ChooseClinic go={navigate} selected={clinicId} onChoose={(id,name)=>{setClinicId(id);setAuthClinicName(name);setClinic(prev=>({...prev,name}))}}/>}
    {page==='invitation'&&<Invitation go={navigate}/>}
    {page==='denied'&&<AccessDenied go={navigate}/>}
    <div className="unified-auth-footer"><details><summary>Demo: preview auth screens</summary>{[['login','Sign in'],['forgot','Forgot password'],['clinic','Choose clinic'],['invitation','Invitation acceptance'],['denied','Access denied']].map(([id,label])=><button key={id} onClick={()=>navigate(id)}>{label}</button>)}</details></div>
  </div>;
  return <div className="unified-shell">
    <aside className="unified-sidebar"><div className="unified-brand"><span className="unified-brandmark">+</span>MediCare CMS</div><small>ORGANIZATION</small><nav aria-label="Main navigation">
      {menu.map(item=>{const Icon=item.icon;const active=page===item.id||(item.id==='staff'&&page==='staff-form')||(item.id==='patients'&&patientPages.includes(page))||(item.id==='appointments'&&appointmentPages.includes(page));return <button key={item.id} className={'unified-nav '+(active?'selected':'')} onClick={()=>navigate(item.id)} aria-current={active?'page':undefined}><Icon size={20}/>{item.label}</button>})}
    </nav><footer><button className="unified-nav" onClick={()=>navigate('login')}><LogOut size={19}/> Logout</button>Tenant Administrator<br/>Visual prototype only</footer></aside>
    <div className="unified-main"><header className="unified-topbar"><strong>{clinic.name}</strong><span>Tenant Administrator</span></header><main className="unified-content">
      {message&&<div className="unified-feedback" role="status">{message}</div>}
      <div className={page==='dashboard'||page==='profile'||page==='staff'||page==='staff-form'?'module-tenant':patientPages.includes(page)?'module-patients':'module-appointments'}>
        {page==='dashboard'&&<ClinicDashboard staff={staff}/>}
        {page==='profile'&&<ClinicProfile clinic={clinic} onSave={setClinic}/>}
        {page==='staff'&&<StaffDirectory staff={staff} onAdd={()=>{setEditingStaff(null);navigate('staff-form')}} onEdit={person=>{setEditingStaff(person);navigate('staff-form')}}/>}
        {page==='staff-form'&&<StaffForm key={editingStaff?.id||'new'} initialStaff={editingStaff} existingStaff={staff} onSave={saveStaff} onCancel={()=>navigate('staff')}/>}
        {page==='patients'&&<PatientDirectory patients={patients} onRegister={()=>navigate('patient-register')} onView={id=>{setSelectedPatientId(id);navigate('patient-profile')}} onEdit={id=>{setSelectedPatientId(id);navigate('patient-edit')}}/>}
        {page==='patient-register'&&<RegisterPatient onSave={registerPatient} onCancel={()=>navigate('patients')}/>}
        {page==='patient-edit'&&selectedPatient&&<EditPatient key={selectedPatient.id} patient={selectedPatient} onSave={updatePatient} onCancel={()=>navigate('patient-profile')}/>}
        {page==='patient-profile'&&selectedPatient&&<PatientProfile patient={selectedPatient} onHistory={()=>navigate('patient-history')} onEdit={()=>navigate('patient-edit')} onBack={()=>navigate('patients')}/>}
        {page==='patient-history'&&selectedPatient&&<PatientHistory key={selectedPatient.id} patient={selectedPatient} onAddVisit={addVisit} onBack={()=>navigate('patient-profile')}/>}
        {page==='appointments'&&<><div className="unified-appointment-links"><button onClick={()=>navigate('appointment-calendar')}>View Calendar</button></div><AppointmentDashboard appointments={appointments} patients={patients} onBook={()=>navigate('appointment-book')} onView={viewAppointment}/></>}
        {page==='appointment-calendar'&&<AppointmentCalendar appointments={appointments} patients={patients} onBook={()=>navigate('appointment-book')} onView={viewAppointment}/>}
        {page==='appointment-book'&&<BookAppointment patients={patients} appointments={appointments} onSave={bookAppointment} onCancel={()=>navigate('appointments')}/>}
        {page==='appointment-details'&&selectedAppointment&&<AppointmentDetails appointment={selectedAppointment} patients={patients} onBack={()=>navigate('appointments')} onManage={manageAppointment} onComplete={completeAppointment}/>}
        {page==='appointment-manage'&&selectedAppointment&&<ManageAppointment key={`${selectedAppointment.id}-${manageMode}`} appointment={selectedAppointment} appointments={appointments} initialMode={manageMode} onSave={saveManagedAppointment} onBack={()=>navigate('appointment-details')}/>}
      </div>
    </main></div>
  </div>;
}
