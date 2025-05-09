# 🧑‍💻 School Vaccination Portal – Frontend

This is the React-based frontend for the School Vaccination Portal app.

---

## 🚀 Features

- Login / Signup
- Dashboard with vaccination stats
- Student registration & list view
- Vaccination drives management
- Filterable vaccination reports
- Auth-guarded routing (private pages)
- Bootstrap UI

---

## 🧱 Tech Stack

- React.js
- Axios
- Bootstrap 5
- React Router DOM
- LocalStorage for auth token

---

## 📦 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the App
```bash
npm start
```

Runs at: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuration

- Base URL: `src/api/axios.js`  
Change the `baseURL` if backend is hosted elsewhere.

---

## 🔐 Auth Flow

- Token is saved in `localStorage`
- Routes are protected using `PrivateRoute`
- Logout clears token and redirects to `/login`

---

## 🗂 Folder Structure

```
src/
├── api/axios.js
├── components/         # Navbar, PrivateRoute
├── pages/              # Login, Signup, Dashboard, Students, Drives, Reports
├── App.js
├── App.css
└── index.js
```

---

## 🧪 Sample Credentials

You can create your own user via the Signup page.

---

## 📝 License

This project is part of an academic assignment (SE ZG503 - BITS Pilani).
