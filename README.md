# 🦷 Dental Care Dashboard

A responsive, frontend-only **Dental Care Management System** built with **React + Tailwind CSS**.
It simulates a patient and admin dashboard with role-based login, UI components, and local storage for authentication.

---

## 📦 Tech Stack

* ⚛️ React (with Vite)
* 🌬️ Tailwind CSS (v4)
* 🧠 React Router DOM
* 🗓️ localStorage (to simulate backend)
* 💡 Icons from icons8

---

## 🚀 Getting Started

### 1. Clone the Repository

bash-
git clone https://github.com/yourusername/dental-dashboard.git
cd dental-dashboard


### 2. Install Dependencies

bash-
npm install


### 3. Start the Development Server

bash-
npm run dev


> The app will be available at [http://localhost:5173](http://localhost:5173)

---

## 👥 Demo Login Credentials

| Role    | Email          | Password   |
| ------- | -------------- | ---------- |
| Admin   | admin@entnt.in | admin123   |
| Patient | john@entnt.in  | patient123 |

Or use the **"Quick Demo Access"** buttons on the login page to autofill the credentials.

---

## ✨ Features

* 🔐 Role-based Login: Admin & Patient
* 📆 Authentication simulated via `localStorage`
* 💫 Gradient UI with TailwindCSS and glassmorphism effects
* 📱 Fully responsive design
* 💻 No backend required

---

## 📁 Project Structure (Simplified)


src/
├── components/
│   └── DashboardLayout.jsx
├── pages/
│   ├── AdminPage.jsx
│   ├── PatientPage.jsx
│   └── LoginPage.jsx
├── utils/
│   └── auth.js
├── App.jsx
└── main.jsx


---

## 🔓 Auth Logic (utils/auth.js)

* authenticate(email, password) → checks login and saves to `localStorage`
* getCurrentUser() → retrieves current user
* logout() → clears login session

---

## 📼 To Reset

If anything breaks or you want to logout manually:

1. Open browser DevTools
2. Run: `localStorage.clear()`
3. Refresh the page

---

## 🤝 License

This is a simulated frontend-only project for ENTNT assignment/demo purposes.

---

