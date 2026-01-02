
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Send, Calendar, CheckCircle, 
  Sparkles, Mail, Clock, Info, AlertCircle,
  ShieldCheck, User, Zap
} from 'lucide-react';
import { TRAINERS_LIST, EVENTS } from '../../services/mockData';

const AdminInviteTrainer: React.FC = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const trainer = TRAINERS_LIST.find(t => t.id === trainerId);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [priority, setPriority] = useState('standard');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!trainer) return <div className="p-10 text-center text-slate-400">Trainer not found.</div>;

  const handleSend = () => {
    if (!selectedEventId) return;
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      setTimeout(() => navigate('/admin/trainers'), 2000);
    }, 1500);
  };

  const selectedEvent = EVENTS.find(e => e.id === selectedEventId);

  if (sent) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-300 px-6">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-emerald-100/50">
           <ShieldCheck className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">Invitation Sent Successfully</h2>
        <p className="text-slate-500 max-w-md font-medium leading-relaxed">
           The engagement offer has been dispatched to <span className="text-brand-navy font-bold">{trainer.name}'s</span> dashboard. You can track their response in the System Hub.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-5 border-b border-slate-100 pb-8">
         <button onClick={() => navigate('/admin/trainers')} className="p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-all shadow-sm shrink-0">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
         </button>
         <div>
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-1">Engagement Governance</p>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-navy tracking-tight">Invite {trainer.name.split(' ')[0]} to Session</h1>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         
         {/* Invitation Form */}
         <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
               
               {/* Selection Section */}
               <div className="space-y-6">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Calendar className="w-4 h-4 text-brand-amber" /> Session Specification
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                     {EVENTS.map(event => (
                        <button 
                           key={event.id}
                           onClick={() => setSelectedEventId(event.id)}
                           className={`p-5 rounded-2xl border-2 transition-all text-left flex items-center justify-between group
                              ${selectedEventId === event.id ? 'bg-brand-navy border-brand-navy shadow-xl translate-x-1' : 'bg-slate-50 border-slate-100 hover:border-brand-amber'}
                           `}
                        >
                           <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${selectedEventId === event.id ? 'bg-brand-amber text-brand-navy' : 'bg-white text-slate-300'}`}>
                                 <Zap className="w-6 h-6 fill-current" />
                              </div>
                              <div>
                                 <p className={`text-sm font-bold transition-colors ${selectedEventId === event.id ? 'text-white' : 'text-brand-navy'}`}>{event.title}</p>
                                 <p className={`text-[10px] font-bold uppercase tracking-tight ${selectedEventId === event.id ? 'text-slate-400' : 'text-slate-400'}`}>
                                    {new Date(event.date).toLocaleDateString()} • {event.type}
                                 </p>
                              </div>
                           </div>
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedEventId === event.id ? 'bg-brand-amber border-brand-amber' : 'border-slate-200 group-hover:border-brand-amber'}`}>
                              {selectedEventId === event.id && <CheckCircle className="w-4 h-4 text-brand-navy" />}
                           </div>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Priority Toggle */}
               <div className="space-y-4">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Engagement Priority</label>
                  <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                     {['standard', 'high-priority', 'critical'].map(p => (
                        <button 
                           key={p} 
                           onClick={() => setPriority(p)}
                           className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all capitalize ${priority === p ? 'bg-white text-brand-navy shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                           {p.replace('-', ' ')}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Message */}
               <div className="space-y-4">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Personalized Offer (Optional)</label>
                  <textarea 
                     rows={4}
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     placeholder="Customize the invitation message for the trainer..."
                     className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-amber/5 font-medium text-brand-navy text-sm transition-all"
                  ></textarea>
               </div>

               <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                     <Info className="w-4 h-4" /> Final Audit Pending
                  </div>
                  <button 
                     onClick={handleSend}
                     disabled={!selectedEventId || isSending}
                     className="px-10 py-4 bg-brand-navy text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-brand-navy/20 hover:bg-slate-800 transition-all flex items-center gap-3 disabled:opacity-30 active:scale-95"
                  >
                     {isSending ? <Clock className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 text-brand-amber" />}
                     Dispatch Invitation
                  </button>
               </div>

            </div>
         </div>

         {/* Context Preview Sidebar */}
         <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-navy p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                  <Mail className="w-40 h-40" />
               </div>
               <div className="relative z-10 space-y-8">
                  <h3 className="text-[11px] font-bold text-brand-amber uppercase tracking-widest border-b border-white/10 pb-4">Trainer Summary</h3>
                  <div className="flex items-center gap-5">
                     <img src={trainer.avatarUrl} className="w-16 h-16 rounded-2xl border-2 border-white/10 shadow-lg object-cover" alt="" />
                     <div>
                        <h4 className="text-xl font-bold">{trainer.name}</h4>
                        <p className="text-sm text-slate-400 font-medium">{trainer.specialization}</p>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Rating</p>
                        <p className="text-lg font-bold text-brand-amber">4.8 / 5.0</p>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Active Status</p>
                        <p className="text-lg font-bold text-emerald-400 capitalize">{trainer.status}</p>
                     </div>
                  </div>

                  <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100/10 flex items-start gap-4">
                     <AlertCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                     <p className="text-[10px] text-brand-gold font-bold leading-relaxed">
                        Notice: Sarah Jenkins is currently managing 2 active courses. Ensure session timing does not overlap with existing commitments.
                     </p>
                  </div>
               </div>
            </div>

            {/* Live Invitation Preview */}
            <div className="space-y-4">
               <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2">Preview on Trainer's Dashboard</h3>
               <div className="bg-white p-6 rounded-[2.5rem] border-2 border-dashed border-slate-200 opacity-60 pointer-events-none scale-95 origin-top">
                   <div className="flex items-center justify-between group border-l-4 border-brand-amber pl-4">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center text-brand-gold shrink-0">
                            <Calendar className="w-5 h-5" />
                         </div>
                         <div>
                            <h4 className="text-sm font-bold text-brand-navy truncate">
                               {selectedEvent ? selectedEvent.title : 'Selected Event Title'}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                               {selectedEvent ? new Date(selectedEvent.date).toLocaleDateString() : 'Date Preview'}
                            </p>
                         </div>
                      </div>
                      <span className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-slate-100">
                         View Details
                      </span>
                   </div>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default AdminInviteTrainer;
