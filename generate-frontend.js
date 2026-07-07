const fs = require('fs');
const path = require('path');

const frontendPath = path.join(__dirname, 'frontend/src');

function ensureDirSync(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function writeFileSync(filePath, content) {
    ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
}

const files = {
    'App.jsx': `
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import FacultyProfile from './pages/FacultyProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<FacultyProfile />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
`,
    'main.jsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`,
    'pages/Login.jsx': `
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('faculty@college.edu');
  
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          College PMS
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Performance Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email" type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border"
                  placeholder="you@college.edu"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password" type="password" required defaultValue="password"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
`,
    'layouts/DashboardLayout.jsx': `
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, User, BookOpen, FileText, Bell, LogOut, Award, CheckSquare } from 'lucide-react';

export default function DashboardLayout() {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Profile', href: '/dashboard/profile', icon: User },
    { name: 'Publications', href: '#', icon: BookOpen },
    { name: 'Achievements', href: '#', icon: Award },
    { name: 'Approvals', href: '#', icon: CheckSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="text-xl font-bold text-slate-800 tracking-tight">College PMS</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={\`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors \${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}\`}
                >
                  <item.icon className={\`mr-3 flex-shrink-0 h-5 w-5 \${active ? 'text-blue-700' : 'text-slate-400'}\`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-slate-200">
          <Link to="/login" className="flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors">
            <LogOut className="mr-3 h-5 w-5 text-red-500" />
            Logout
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-slate-800">Faculty Portal</h1>
          <div className="flex items-center space-x-4">
            <button className="text-slate-400 hover:text-slate-500">
              <Bell className="h-6 w-6" />
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              F
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
`,
    'pages/DashboardHome.jsx': `
import React from 'react';
import { BookOpen, Award, FileText, CheckCircle } from 'lucide-react';

export default function DashboardHome() {
  const stats = [
    { name: 'Publications', stat: '12', icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Achievements', stat: '4', icon: Award, color: 'bg-green-500' },
    { name: 'Pending Approvals', stat: '2', icon: FileText, color: 'bg-yellow-500' },
    { name: 'Approved Requests', stat: '15', icon: CheckCircle, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Overview</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-lg border border-slate-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={\`rounded-md p-3 \${item.color}\`}>
                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-slate-500 truncate">{item.name}</dt>
                    <dd className="text-2xl font-semibold text-slate-900">{item.stat}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Recent Activity</h3>
        <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
          <ul className="divide-y divide-slate-200">
            {[1, 2, 3].map((item) => (
              <li key={item} className="px-6 py-4 flex items-center hover:bg-slate-50 transition-colors">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-4"></span>
                <p className="text-sm text-slate-600 flex-1">
                  Your publication <span className="font-semibold">"Advanced Machine Learning"</span> was approved by the HOD.
                </p>
                <span className="text-xs text-slate-400">2 days ago</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
`,
    'pages/FacultyProfile.jsx': `
import React from 'react';

export default function FacultyProfile() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          Edit Profile
        </button>
      </div>
      <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200">
          <h3 className="text-lg font-medium leading-6 text-slate-900">Personal Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">Details and contact information.</p>
        </div>
        <div className="px-6 py-5">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-slate-500">Full name</dt>
              <dd className="mt-1 text-sm text-slate-900">Dr. Demo Faculty</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-slate-500">Department</dt>
              <dd className="mt-1 text-sm text-slate-900">Computer Science</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-slate-500">Email address</dt>
              <dd className="mt-1 text-sm text-slate-900">faculty@college.edu</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-slate-500">Employee ID</dt>
              <dd className="mt-1 text-sm text-slate-900">CS-2023-04</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
`
};

for (const [filename, content] of Object.entries(files)) {
    writeFileSync(path.join(frontendPath, filename), content);
}
console.log('Frontend pages generated successfully!');
