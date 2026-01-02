import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload } from 'lucide-react';

const AdminTrainerCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add trainer would go here
    navigate('/admin-trainer/trainers');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Link to="/admin-trainer/trainers" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
               <ArrowLeft className="w-5 h-5 text-slate-500" />
            </Link>
            <div>
               <h1 className="text-2xl font-bold text-slate-800">Add New Trainer</h1>
               <p className="text-slate-500 text-sm">Onboard a new instructor to the platform</p>
            </div>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
         <div className="space-y-6">
            <div className="flex justify-center">
               <div className="w-32 h-32 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs text-slate-500 font-medium">Upload Photo</span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. John Doe" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. john@edutrain.com" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Specialization <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                     <option value="">Select Specialization</option>
                     <option value="UI/UX Design">UI/UX Design</option>
                     <option value="Data Science">Data Science</option>
                     <option value="Digital Marketing">Digital Marketing</option>
                     <option value="Web Development">Web Development</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="+1 (555) 000-0000" />
               </div>
               <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Location</label>
                  <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="City, Country" />
               </div>
               <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Bio / Introduction</label>
                  <textarea rows={4} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Short description about the trainer..."></textarea>
               </div>
            </div>
         </div>

         <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
            <Link to="/admin-trainer/trainers" className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
               Cancel
            </Link>
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
               <Save className="w-4 h-4" /> Save Trainer
            </button>
         </div>
      </form>
    </div>
  );
};

export default AdminTrainerCreate;