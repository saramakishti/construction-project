# Construction Project Management Dashboard: Biba X

A full-stack web application to manage construction projects, tasks, users, and progress tracking. Built with role-based access control to provide tailored functionality for Admins, Clients, and Workers.

## 🚀 Technologies Used

- **Frontend**: Next.js 14 (App Router), React 19, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Data Visualization**: Recharts
- **State Management**: React Context

## 🧩 Features

- **Role-based dashboards and access**
- Real-time CRUD operations for:
  - Projects
  - Users
  - Tasks
  - Comments
- Dashboard charts (Project Progress, Task Load, Budget Allocation, etc.)
- Conditional rendering and data filtering based on user role

## 👤 User Roles

### 🔑 Admin

- Full access to:
  - All projects
  - All users
  - All tasks
  - Dashboard overview (global stats)
- Can create, edit, and delete any resource

### 👷 Worker

- Can view only:
  - Projects they are assigned to
  - Tasks assigned to them
- Can:
  - Edit and delete their own tasks
  - Comment on projects
  - See their task stats and workload in the dashboard
- Cannot access user management

### 🧑‍💼 Client

- Can view only:
  - Projects where they are the client
- Can:
  - Comment on their projects
  - See dashboard overview for their own projects
- Cannot access task or user management

## 📁 Folder Structure

```bash
/app → Next.js pages & routes
/components → UI components (table, form, dashboard, etc.)
/context → User context provider for auth & role
/services → API service files for projects, users, tasks
/routes → Express.js backend routes
/utils → Date formatters, Firebase config
```

## 🛠️ Setup Instructions

1. Clone the repo
2. Set up Firebase and populate Firestore collections:
   - `users`
   - `projects`
   - `tasks`
   - Enable Firebase Auth
3. Add your environment variables (`.env.local`)
4. Run the backend:
   ```bash
   npm install
   node server.js
   ```
5. Run the frontend:
   ```bash
   npm install
   npm run dev
   ```
