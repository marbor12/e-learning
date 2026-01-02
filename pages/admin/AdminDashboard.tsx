
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, CheckCircle, FileSearch, GraduationCap, 
  ArrowRight, Clock, ShieldCheck, Calendar, Activity,
  AlertCircle, ChevronRight, BarChart3, Lock, Zap,
  Layers, UserCheck, Send
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const kpis = [
    { label: 'Platform Users', value: '1.4k', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Validation Queue', value: 7, icon: FileSearch, color: 'text-brand-amber', bg: 'bg-brand-cream' },
    { label: 'Active Sessions', value: 4, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'System Health', value: '98%', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header - Scaled Appropriately */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
           <h1 className="text-2xl font-bold text-brand-navy tracking-tight">System Oversight Hub</h1>
           <p className="text-slate-500 text-sm font-medium">Monitoring pedagogical quality and operational governance.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <button onClick={() => navigate('/admin/trainers')} className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
              <Send className="w-3.5 h-3.5" /> Invite Trainer
           </button>
           <button className="flex-1 sm:flex-none px-4 py-2 bg-brand-navy text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">
              Manual Sync
           </button>
        </div>
      </div>

      {/* KPI Grid - Balanced Sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 bento-card">
             <div className={`${kpi.bg} ${kpi.color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm`}>
                <kpi.icon className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{kpi.label}</p>
                <h3 className="text-xl font-bold text-brand-navy leading-none">{kpi.value}</h3>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Validation Queue */}
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Layers className="w-4 h-4 text-brand-amber" /> Pedagogical Queue
              </h2>
              <span className="text-[10px] font-bold text-brand-amber uppercase tracking-widest">7 Pending Audit</span>
           </div>
           
           <div className="space-y-4">
              {[
                { title: 'Figma Constraints Practical Guide', type: 'Course Material', trainer: 'Sarah Jenkins', time: '2h ago', level: 'Intermediate' },
                { title: 'Module 4 Certification Quiz', type: 'Assessment', trainer: 'Sarah Jenkins', time: '5h ago', level: 'Advanced' },
                { title: 'Data Strategy Consulting PPT', type: 'Event Asset', trainer: 'Michael Chen', time: '1d ago', level: 'Beginner' },
              ].map((item, i) => (
                 <div key={i} onClick={() => navigate('/admin/validation')} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-brand-amber transition-all bento-card">
                    <div className="flex items-center gap-5 min-w-0">
                       <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand-navy group-hover:text-white transition-all shadow-sm shrink-0">
                          {item.type.includes('Quiz') ? <ShieldCheck className="w-6 h-6" /> : <FileSearch className="w-6 h-6" />}
                       </div>
                       <div className="min-w-0">
                          <h4 className="text-sm font-bold text-brand-navy truncate group-hover:text-brand-amber transition-colors">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                             <span className="text-[10px] font-bold text-brand-gold">{item.trainer}</span>
                             <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item.type}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="hidden sm:inline-block px-2 py-0.5 bg-brand-cream text-brand-gold text-[8px] font-bold rounded uppercase tracking-widest">Priority</span>
                       <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand-navy group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                       </div>
                    </div>
                 </div>
              ))}
           </div>
           <button onClick={() => navigate('/admin/validation')} className="w-full py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:bg-white hover:text-brand-navy transition-all">
              Load Audit History
           </button>
        </div>

        {/* Real-time Monitoring Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-brand-navy p-6 rounded-2xl text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                 <Zap className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-[10px] font-bold text-brand-amber uppercase tracking-widest">Active Monitors</h3>
                    <div className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                       <span className="text-[9px] font-bold uppercase text-emerald-500">Live</span>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    {[
                      { event: 'Figma Masterclass', current: 45, total: 50, color: 'bg-indigo-500' },
                      { event: 'UX Audit Training', current: 12, total: 20, color: 'bg-brand-amber' }
                    ].map((prog, i) => (
                       <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center text-[11px] font-bold">
                             <p className="truncate pr-4">{prog.event}</p>
                             <p className="text-slate-400">{prog.current}/{prog.total}</p>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                             <div className={`h-full ${prog.color} rounded-full`} style={{ width: `${(prog.current/prog.total)*100}%` }}></div>
                          </div>
                       </div>
                    ))}
                 </div>

                 <button onClick={() => navigate('/admin/attendance')} className="w-full py-3 bg-white text-brand-navy rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-amber transition-all shadow-md">
                    Attendance Ledger
                 </button>
              </div>
           </div>

           {/* New Invitation Tracker */}
           <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-3">Sent invitations</h3>
              <div className="space-y-3">
                 {[
                   { name: 'Sarah Jenkins', event: 'Mastering Layout', status: 'Accepted', date: 'Oct 12' },
                   { name: 'Michael Chen', event: 'Python 101', status: 'Pending', date: 'Oct 14' }
                 ].map((invite, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                       <div className="min-w-0">
                          <p className="text-[11px] font-bold text-brand-navy truncate">{invite.name}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase">{invite.event}</p>
                       </div>
                       <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter ${invite.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-cream text-brand-gold'}`}>
                          {invite.status}
                       </span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
