# MediCare CMS — Unified original modules

Run `npm install` then `npm run dev`. No backend/API calls.

Sources: Auth & Access (`medicare-minimal-ui (2).zip`), Tenant Admin (`medicare-tenant-admin-module-3.zip`), Patients (`medicare-module-4-patients.zip`), Appointments (`medicare-module-5.zip`). Module 2 intentionally absent.

Original screen component files are retained under `src/auth/pages`, `src/tenant-admin/pages`, `src/patients`, and `src/appointments/pages`. CSS is selector-scoped in each module CSS file to prevent conflicts; original declarations are preserved. Only Auth Login.jsx receives a minimal demo-login callback to enter the dashboard with any input. Original per-module App.jsx files are superseded by `src/App.jsx` which combines the navigation/state handlers and uses the original patient records and original appointment records. Auth screen preview links are in the footer. One `package.json`, `index.html`, `main.jsx` and shell layout. No new libraries beyond the uploaded ZIPs.

Module 5's original standalone App.jsx imports screen and data paths not bundled inside its own ZIP; these are resolved using the supplied Module 3/4 ZIPs. The standalone Module 5 original App.jsx is used as the basis for the shared handlers, with Module 3's original fourth staff member restored.
