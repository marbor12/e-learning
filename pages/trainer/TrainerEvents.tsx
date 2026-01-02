
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Search, Filter, 
  Sparkles, Zap, Timer, Users2, ArrowRight
} from 'lucide-react';
import { EVENTS } from '../../services/mockData';

const TrainerEvents: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-1">
           <div className="flex items-center gap-2">
              <span className="bg-brand-navy text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Hub</span>
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                 <Sparkles className="w-3 h-3 text-brand-amber" /> Session Management
              </span>
           </div>
           <h1 className="text-2xl md:text-3xl font-bold text-brand-navy tracking-tight">Schedule Hub</h1>
           <p className="text-slate-500 text-sm font-medium">Manage your academic teaching commitments.</p>
        </div>
        
        <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="Find session..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-4 focus:ring-brand-amber/5 font-medium text-brand-navy shadow-sm" 
                />
            </div>
            <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-brand-navy hover:bg-slate-50 shadow-sm transition-all">
                <Filter className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Events Grid - Corrected realistic scaling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVENTS.map(event => (
          <div 
            key={event.id} 
            onClick={() => navigate(`/trainer/events/${event.id}`)}
            className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full bento-card"
          >
            {/* Image Preview - realistic height */}
            <div className="h-44 overflow-hidden relative">
               <img 
                 src={event.image} 
                 alt={event.title} 
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent"></div>
               
               <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-lg border ${
                    event.status === 'Upcoming' 
                      ? 'bg-brand-amber text-brand-navy border-white/20' 
                      : 'bg-emerald-500 text-white border-white/20'
                  }`}>
                    {event.status}
                  </span>
               </div>

               <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-brand-amber mb-1 flex items-center gap-1.5">
                     <Zap className="w-3 h-3 fill-brand-amber" /> {event.type}
                  </p>
                  <h3 className="text-base font-bold tracking-tight leading-tight line-clamp-1">
                     {event.title}
                  </h3>
               </div>
            </div>

            {/* Content & Quick Stats */}
            <div className="p-5 flex flex-col flex-1 space-y-5">
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-brand-navy transition-all duration-300">
                 <div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Starts</span>
                    <p className="text-[11px] font-bold text-brand-navy group-hover:text-white transition-colors">
                       {event.time.split('-')[0]}
                    </p>
                 </div>
                 <div className="w-px h-6 bg-slate-200 group-hover:bg-white/10"></div>
                 <div className="text-right">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Learners</span>
                    <p className="text-[11px] font-bold text-brand-navy group-hover:text-white transition-colors">
                       {event.attendees} Reg.
                    </p>
                 </div>
              </div>

              <div className="space-y-2 text-[12px] text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-amber" />
                  <span className="font-bold text-brand-navy">
                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center mt-auto">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                       <img 
                         key={i} 
                         src={`https://i.pravatar.cc/100?u=${event.id + i}`} 
                         className="w-8 h-8 rounded-full border-2 border-white object-cover"
                         alt="Avatar"
                       />
                    ))}
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand-amber group-hover:text-brand-navy transition-all">
                    <ArrowRight className="w-5 h-5" />
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerEvents;
