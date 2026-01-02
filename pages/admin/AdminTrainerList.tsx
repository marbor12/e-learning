
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, MoreHorizontal, Check, X, UserPlus, Mail, Phone, MapPin, ChevronRight, Users, Send } from 'lucide-react';
import { TRAINERS_LIST } from '../../services/mockData';

const AdminTrainerList: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filteredList = filter === 'all' ? TRAINERS_LIST : TRAINERS_LIST.filter(t => t.status === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header - Scaled */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
           <h1 className="text-2xl font-bold text-brand-navy tracking-tight">Academic Personnel</h1>
           <p className="text-slate-500 text-sm font-medium">Manage and monitor instructional talent ecosystem.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <button className="flex-1 sm:flex-none px-4 py-2 bg-brand-navy text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4 text-brand-amber" /> Register Trainer
           </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex p-1 bg-slate-50 rounded-xl border border-slate-100 w-full md:w-auto">
            {['all', 'active', 'pending', 'suspended'].map(f => (
               <button 
                  key={f} 
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all capitalize ${filter === f ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                  {f}
               </button>
            ))}
         </div>
         <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
            <input type="text" placeholder="Lookup name or ID..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[13px] focus:outline-none focus:ring-4 focus:ring-brand-amber/5 font-medium" />
         </div>
      </div>

      {/* Trainer Grid - Redesigned Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredList.map(trainer => (
            <div 
               key={trainer.id} 
               className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-xl transition-all cursor-pointer bento-card relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-3 flex gap-2">
                  <span className={`px-2 py-0.5 rounded-lg text-[8px] font-bold uppercase tracking-widest ${
                    trainer.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                    trainer.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                    'bg-red-50 text-red-600 border border-red-100'
                  }`}>
                    {trainer.status}
                  </span>
               </div>

               <div onClick={() => navigate(`/admin/trainers/${trainer.id}`)} className="flex items-center gap-4 mb-5">
                  <img src={trainer.avatarUrl} alt={trainer.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm group-hover:scale-110 transition-transform" />
                  <div className="min-w-0">
                     <h4 className="text-sm font-bold text-brand-navy truncate group-hover:text-brand-amber transition-colors">{trainer.name}</h4>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate">{trainer.specialization}</p>
                  </div>
               </div>

               <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                     <Mail className="w-3.5 h-3.5 text-slate-300" />
                     <span className="truncate">{trainer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                     <MapPin className="w-3.5 h-3.5 text-slate-300" />
                     <span className="truncate">{trainer.location}</span>
                  </div>
               </div>

               <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex gap-2">
                     <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/admin/trainers/${trainer.id}/invite`); }}
                        className="px-3 py-1.5 bg-brand-cream text-brand-gold hover:bg-brand-amber hover:text-white rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 border border-brand-amber/10 shadow-sm"
                     >
                        <Send className="w-3 h-3" /> Invite
                     </button>
                     <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/admin/trainers/${trainer.id}`); }}
                        className="px-3 py-1.5 bg-slate-50 text-slate-400 hover:bg-brand-navy hover:text-white rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all border border-slate-100"
                     >
                        Profile
                     </button>
                  </div>
                  <div onClick={() => navigate(`/admin/trainers/${trainer.id}`)} className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand-navy group-hover:text-white transition-all">
                     <ChevronRight className="w-4 h-4" />
                  </div>
               </div>
            </div>
         ))}
      </div>

      {filteredList.length === 0 && (
         <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300 border border-slate-100">
               <Users className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-slate-400">No personnel found in this classification.</p>
         </div>
      )}
    </div>
  );
};

export default AdminTrainerList;
