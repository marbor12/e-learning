
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, MapPin, Users, 
  Upload, Info, ListOrdered, ShieldCheck, 
  Sparkles, ChevronDown
} from 'lucide-react';
import { EVENTS, INVITATIONS } from '../../services/mockData';

const TrainerEventDetail: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find(e => e.id === eventId) || INVITATIONS.find(e => e.id === eventId);
  const isInvitation = INVITATIONS.some(e => e.id === eventId);
  
  if (!event) return <div className="p-10 text-center text-slate-400">Session not found.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Top Nav */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
         <button onClick={() => navigate('/trainer/events')} className="inline-flex items-center text-[10px] font-bold text-slate-400 hover:text-brand-navy uppercase tracking-widest transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" /> All Sessions
         </button>
         <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${isInvitation ? 'bg-brand-cream text-brand-gold border border-brand-amber/20' : 'bg-brand-navy text-white'}`}>
            {isInvitation ? 'Engagement Offer' : 'Active Commitment'}
         </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
         {/* Core Context */}
         <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
               <h1 className="text-2xl md:text-3xl font-bold text-brand-navy tracking-tight leading-tight">{event.title}</h1>
               
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-slate-100">
                  <div className="flex items-center gap-3">
                     <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100"><Calendar className="w-4 h-4" /></div>
                     <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Date</p><p className="text-[13px] font-bold text-slate-800">{new Date(event.date).toDateString()}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100"><Clock className="w-4 h-4" /></div>
                     <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Time</p><p className="text-[13px] font-bold text-slate-800">{event.time}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100"><MapPin className="w-4 h-4" /></div>
                     <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Venue</p><p className="text-[13px] font-bold text-slate-800 truncate">{event.location}</p></div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
               <h2 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-brand-amber" /> Pedagogical Context
               </h2>
               <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">{event.description}</p>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">Session Breakdown</h3>
               <div className="space-y-4">
                  {event.rundown.map((item, i) => (
                     <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group">
                        <div className="flex gap-5">
                           <div className="w-1.5 bg-brand-amber rounded-full"></div>
                           <div>
                              <p className="text-[9px] font-bold text-brand-amber uppercase tracking-widest">{item.timeRange}</p>
                              <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-amber transition-colors">{item.activity}</h4>
                              {item.notes && <p className="text-[11px] text-slate-400 mt-1 italic">Note: {item.notes}</p>}
                           </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-200" />
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar Actions */}
         <div className="lg:col-span-4 space-y-6">
            {isInvitation ? (
               <div className="bg-brand-navy p-6 rounded-2xl text-white shadow-xl sticky top-24">
                  <h3 className="text-[10px] font-bold text-brand-amber uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Sparkles className="w-3.5 h-3.5" /> Engagement Offer
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-8">
                    We’ve selected your profile for this masterclass based on your expertise and rating.
                  </p>
                  <div className="space-y-3">
                     <button className="w-full py-3 bg-brand-amber text-brand-navy rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all">
                        Accept Commitment
                     </button>
                     <button className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all">
                        Decline
                     </button>
                  </div>
               </div>
            ) : (
               <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24 space-y-6">
                  <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest border-b border-slate-50 pb-3">Instructor Hub</h3>
                  <div className="space-y-3">
                     <button 
                        onClick={() => navigate(`/trainer/materials?eventId=${eventId}`)}
                        className="w-full p-4 bg-slate-50 hover:bg-brand-cream rounded-xl border border-slate-100 transition-all text-left group"
                     >
                        <Upload className="w-5 h-5 text-brand-amber mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-sm font-bold text-slate-800">Submit Assets</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight mt-1">Slides, Video, Quizzes</p>
                     </button>
                     <button className="w-full p-4 bg-slate-50 hover:bg-indigo-50 rounded-xl border border-slate-100 transition-all text-left group">
                        <Users className="w-5 h-5 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-sm font-bold text-slate-800">Learner Ledger</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight mt-1">View Registered List</p>
                     </button>
                  </div>
                  
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
                     <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                     <p className="text-[10px] text-emerald-700 font-bold leading-relaxed">
                        Validation required: Ensure all pedagogical assets are uploaded 24h prior to the session.
                     </p>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default TrainerEventDetail;
