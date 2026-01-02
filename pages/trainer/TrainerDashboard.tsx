
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, CheckCircle2, 
  TrendingUp, Users, Zap, ArrowRight,
  BookOpen, Mail, MessageSquare
} from 'lucide-react';
import { 
  CURRENT_TRAINER, EVENTS, MATERIAL_STATUSES, INVITATIONS, FEEDBACKS 
} from '../../services/mockData';

const TrainerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { 
      label: 'Active Learners', 
      value: CURRENT_TRAINER.totalStudents.toLocaleString(), 
      icon: Users, 
      color: 'text-brand-amber', 
      bg: 'bg-brand-cream' 
    },
    { 
      label: 'Validation Queue', 
      value: MATERIAL_STATUSES.filter(m => m.status.includes('Waiting')).length.toString(), 
      icon: Clock, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50' 
    },
    { 
      label: 'Feedback Count', 
      value: FEEDBACKS.length.toString(), 
      icon: MessageSquare, 
      color: 'text-rose-600', 
      bg: 'bg-rose-50' 
    },
    { 
      label: 'Validated Assets', 
      value: MATERIAL_STATUSES.filter(m => m.status === 'Approved').length.toString(), 
      icon: CheckCircle2, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50' 
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header - Balanced Scale */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
           <h1 className="text-2xl font-bold text-brand-navy tracking-tight">
             Good morning, {CURRENT_TRAINER.name.split(' ')[0]}
           </h1>
           <p className="text-slate-500 text-sm font-medium">You have 1 session scheduled for today.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <button onClick={() => navigate('/trainer/events')} className="flex-1 sm:flex-none px-4 py-2 bg-brand-navy text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">
              Manage Schedule
           </button>
        </div>
      </div>

      {/* Stats - Realistic Sizing & Expanded Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 bento-card border-b-2 border-b-transparent hover:border-b-brand-amber transition-all">
             <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                <stat.icon className="w-5 h-5" />
             </div>
             <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5 truncate">{stat.label}</p>
                <h3 className="text-xl font-bold text-brand-navy leading-none">{stat.value}</h3>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-10">
           
           {/* Invitations Section */}
           {INVITATIONS.length > 0 && (
             <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                   <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Mail className="w-4 h-4 text-brand-amber" /> Engagement Offers
                   </h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                   {INVITATIONS.map(invitation => (
                      <div key={invitation.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group bento-card border-l-4 border-l-brand-amber">
                         <div className="flex items-center gap-4 min-w-0">
                            <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center text-brand-gold shrink-0">
                               <Calendar className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                               <h4 className="text-sm font-bold text-brand-navy truncate">{invitation.title}</h4>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                                  {new Date(invitation.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                               </p>
                            </div>
                         </div>
                         <button 
                            onClick={() => navigate(`/trainer/events/${invitation.id}`)}
                            className="ml-4 px-4 py-2 bg-slate-50 hover:bg-brand-navy hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 border border-slate-100"
                         >
                            View Details
                         </button>
                      </div>
                   ))}
                </div>
             </div>
           )}

           <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                 <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand-amber fill-brand-amber" /> Session Stream
                 </h2>
              </div>
              
              <div className="space-y-4">
                 {EVENTS.map(event => (
                    <div key={event.id} onClick={() => navigate(`/trainer/events/${event.id}`)} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group cursor-pointer flex items-center gap-5 hover:border-brand-amber transition-all bento-card">
                       <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
                          <img src={event.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={event.title} />
                       </div>
                       <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                             <span className="px-2 py-0.5 bg-brand-cream text-brand-gold text-[8px] font-bold rounded uppercase tracking-widest">{event.type}</span>
                             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <h4 className="text-base font-bold text-brand-navy line-clamp-1 group-hover:text-brand-amber transition-colors">{event.title}</h4>
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                             <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                          </div>
                       </div>
                       <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand-navy group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar Intelligence */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-3">Validation Queue</h3>
              <div className="space-y-4">
                 {MATERIAL_STATUSES.slice(0, 3).map(m => (
                    <div key={m.id} className="flex gap-3 group cursor-pointer">
                       <div className={`w-1 h-8 rounded-full shrink-0 ${m.status === 'Approved' ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
                       <div className="flex-1 overflow-hidden">
                          <p className="text-xs font-bold text-brand-navy truncate group-hover:text-brand-amber transition-colors">{m.title}</p>
                          <p className="text-[9px] font-bold uppercase text-slate-400">{m.status}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-brand-navy p-6 rounded-2xl text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-brand-amber" />
                    <h4 className="text-sm font-bold">Trainer Rating</h4>
                 </div>
                 <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">4.8</span>
                    <span className="text-slate-400 text-xs">/ 5.0</span>
                 </div>
                 <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[96%] h-full bg-brand-amber rounded-full"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
