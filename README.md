# College Performance Management System (PMS)

A centralized web portal where Faculty, HOD, Principal, Shareholders, and Administrators can securely manage faculty-related information.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Shadcn/UI, React Router
- **Backend**: Laravel 13, MySQL
- **Authentication**: Laravel Sanctum

## Features
- **Role-Based Access Control**: Different dashboards and permissions for Faculty, HOD, Principal, Shareholder, and Admin.
- **Approval Workflow**: All edits from faculty members are routed through an approval process.
- **Excel Uploads**: Bulk upload records using Excel templates with a diff review before submission.
- **Reporting**: Advanced analytics and report exports.

## Directory Structure
- `/frontend`: React + Vite application.
- `/backend`: Laravel application.

## Demo Users
- Administrator: `admin@college.edu`
- Faculty: `faculty@college.edu`
- HOD: `hod@college.edu`
- Principal: `principal@college.edu`
- Shareholder: `shareholder@college.edu`
*(Demo password for all: `password`)*

## Local Setup

### Backend
1. Navigate to the `backend` directory.
2. Run `composer install`.
3. Copy `.env.example` to `.env` and configure your database settings.
4. Run `php artisan key:generate`.
5. Run `php artisan migrate --seed` to populate the database and demo users.
6. Start the server using `php artisan serve`.

### Frontend
1. Navigate to the `frontend` directory.
2. Run `npm install`.
3. Run `npm run dev` to start the development server.

## Deployment to Railway
1. Push this repository to your GitHub account.
2. Log into Railway.app and create a new project.
3. Provision a **MySQL Database** from the Railway dashboard.
4. Add a new service -> **Deploy from GitHub repo** and select this repository.
5. In your Railway service settings:
   - Root Directory: `/backend` (for the backend service)
   - Add Environment Variables (`DB_CONNECTION=mysql`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) matching your Railway MySQL instance.
   - Run migrations by adding `php artisan migrate --force` to your build/start scripts.
6. For the frontend, create another service pointing to `/frontend` and use standard Node.js/Vite deployment settings.
