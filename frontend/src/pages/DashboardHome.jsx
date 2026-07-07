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
                  <div className={`rounded-md p-3 ${item.color}`}>
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
