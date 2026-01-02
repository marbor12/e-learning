
import React from 'react';
import { 
  CheckCircle2, Mail, Phone, MapPin, Award, Star, Sparkles, Share2, 
  History, GraduationCap, ArrowUpRight, Wallet, BadgeDollarSign,
  TrendingUp
} from 'lucide-react';
import { CURRENT_TRAINER, EVENTS, COURSES } from '../../services/mockData';

const TrainerProfile: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
      
      {/* Brand Hero Section - Proporsional height */}
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-brand-navy p-6 md:p-12 text-white shadow-xl">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-transparent"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 text-center md:text-left">
            <div className="relative group shrink-0">
               <img src={CURRENT_TRAINER.avatarUrl} className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white/10 shadow-xl" alt={CURRENT_TRAINER.name} />
               <div className="absolute -bottom-2 -right-2 bg-brand-amber p-1.5 rounded-lg text-brand-navy shadow-lg border-2 border-brand-navy">
                  <CheckCircle2 className="w-5 h-5" />
               </div>
            </div>
            <div className="flex-1 space-y-4">
               <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-amber/20 rounded-full text-brand-amber text-[9px] font-bold uppercase tracking-widest mb-3">
                     <Sparkles className="w-3 h-3" /> Certified Expert
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight">{CURRENT_TRAINER.name}</h1>
                  <p className="text-lg md:text-xl font-bold text-slate-400 mt-1">{CURRENT_TRAINER.headline}</p>
               </div>
               
               <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-300 text-xs font-medium">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-amber" /> {CURRENT_TRAINER.location}</span>
                  <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-brand-amber" /> {CURRENT_TRAINER.email}</span>
               </div>
               
               <div className="flex justify-center md:justify-start gap-3 pt-4">
                  <button className="px-6 py-2.5 bg-white text-brand-navy rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-amber transition-all shadow-lg">
                     Resume
                  </button>
                  <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                     <Share2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* Sidebar Content (Left) */}
         <div className="lg:col-span-4 space-y-8">
            
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="relative z-10">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <BadgeDollarSign className="w-4 h-4 text-brand-amber" /> Career Revenue
                  </h3>
                  
                  <div className="mb-6 p-6 bg-brand-navy rounded-2xl text-white shadow-lg">
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Earnings</p>
                     <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black tracking-tight">${CURRENT_TRAINER.totalEarnings.toLocaleString()}</span>
                        <span className="text-sm text-brand-amber font-bold">.00</span>
                     </div>
                     <div className="mt-3 flex items-center gap-2 text-emerald-400">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">+12% growth</span>
                     </div>
                  </div>

                  <div className="space-y-4 mb-6">
                     {CURRENT_TRAINER.collaborationRates.map((rate, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                           <span className="font-bold text-slate-500">{rate.service}</span>
                           <span className="font-black text-brand-navy">{rate.price}</span>
                        </div>
                     ))}
                  </div>

                  <button className="w-full py-3 bg-slate-50 border border-slate-100 text-brand-navy rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all">
                     View Payouts
                  </button>
               </div>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Achievements</h3>
               <div className="space-y-4">
                  {CURRENT_TRAINER.achievements.map((ach, i) => (
                     <div key={i} className="flex items-center gap-4 p-4 bg-brand-cream/30 rounded-xl border border-brand-cream/20">
                        <div className="w-10 h-10 bg-brand-amber text-brand-navy rounded-lg flex items-center justify-center shrink-0">
                           <Award className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-brand-navy leading-tight">{ach.title}</p>
                           <p className="text-[9px] font-bold text-brand-gold uppercase tracking-widest mt-0.5">{ach.date}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </section>
         </div>

         {/* Main Content Column (Right) */}
         <div className="lg:col-span-8 space-y-8">
            <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
               <h2 className="text-xl font-bold text-brand-navy mb-4">Biography</h2>
               <p className="text-slate-600 text-base leading-relaxed font-medium">
                  {CURRENT_TRAINER.bio}
               </p>
            </section>

            <section className="space-y-6">
               <div className="flex items-center justify-between px-2">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">History</h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...EVENTS, ...COURSES].slice(0, 4).map((item, i) => (
                     <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                           <div className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[8px] font-bold rounded uppercase">
                              {'date' in item ? 'Event' : 'Course'}
                           </div>
                           <div className="flex items-center gap-1 text-brand-gold font-bold text-xs">
                              <Star className="w-3 h-3 fill-current" /> {'rating' in item ? item.rating : 4.8}
                           </div>
                        </div>
                        <h4 className="text-base font-bold text-brand-navy group-hover:text-brand-amber transition-colors line-clamp-1">
                           {item.title}
                        </h4>
                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                           <span>{'students' in item ? `${item.students} Enrolled` : `${item.attendees} Attended`}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </section>
         </div>

      </div>
    </div>
  );
};

export default TrainerProfile;
