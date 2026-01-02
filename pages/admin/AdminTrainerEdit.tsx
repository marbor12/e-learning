import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { TRAINERS_LIST } from '../../services/mockData';

const AdminTrainerEdit: React.FC = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const trainer = TRAINERS_LIST.find(t => t.id === trainerId);

  if (!trainer) return <div>Trainer not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/admin-trainer/trainers/${trainerId}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Link to={`/admin-trainer/trainers/${trainerId}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
               <ArrowLeft className="w-5 h-5 text-slate-500" />
            </Link>
            <div>
               <h1 className="text-2xl font-bold text-slate-800">Edit Trainer</h1>
               <p className="text-slate-500 text-sm">Update information for {trainer.name}</p>
            </div>
         </div>
         <button className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Delete Trainer
         </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
         <div className="space-y-6">
            <div className="flex justify-center">
                <img src={trainer.avatarUrl} alt={trainer.name} className="w-32 h-32 rounded-full object-cover border-4 border-slate-50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input required type="text" defaultValue={trainer.name} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input required type="email" defaultValue={trainer.email} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Status</label>
                  <select defaultValue={trainer.status} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                     <option value="active">Active</option>
                     <option value="pending">Pending</option>
                     <option value="suspended">Suspended</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <input type="tel" defaultValue={trainer.phone} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
               </div>
               <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Location</label>
                  <input type="text" defaultValue={trainer.location} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
               </div>
               <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Bio</label>
                  <textarea rows={4} defaultValue={trainer.bio} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
               </div>
            </div>
         </div>

         <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
            <Link to={`/admin-trainer/trainers/${trainerId}`} className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
               Cancel
            </Link>
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
               <Save className="w-4 h-4" /> Save Changes
            </button>
         </div>
      </form>
    </div>
  );
};

export default AdminTrainerEdit;