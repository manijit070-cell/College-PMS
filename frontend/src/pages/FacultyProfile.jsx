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
