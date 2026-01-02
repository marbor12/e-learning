import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, User, ShieldCheck } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-2xl">
            <GraduationCap className="w-12 h-12 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Welcome to EduTrain</h1>
        <p className="text-slate-500 text-lg mb-12 max-w-2xl mx-auto">
          Please select your role to proceed to the demonstration dashboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link to="/trainer" className="group p-8 border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-100 transition-all text-left">
            <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
              <User className="w-6 h-6 text-indigo-600 group-hover:text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Trainer Portal</h2>
            <p className="text-slate-500 text-sm">Access your schedule, manage courses, and view student feedback.</p>
          </Link>

          <Link to="/admin-trainer" className="group p-8 border border-slate-200 rounded-2xl hover:border-purple-500 hover:shadow-xl hover:shadow-purple-100 transition-all text-left">
            <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
              <ShieldCheck className="w-6 h-6 text-purple-600 group-hover:text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Admin Portal</h2>
            <p className="text-slate-500 text-sm">Manage trainers, approve applications, and monitor platform performance.</p>
          </Link>
        </div>
        
        <p className="mt-12 text-slate-400 text-sm">
          EduTrain Demo v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Landing;