
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, Star, Users, ChevronDown, 
  Upload, ListChecks, FileText, CheckCircle, 
  AlertTriangle, Clock, Zap, Trophy, Activity, ArrowUpRight
} from 'lucide-react';
import { COURSES, MATERIAL_STATUSES } from '../../services/mockData';

const TrainerCourseDetail: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === courseId);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'curriculum' | 'participants'>('curriculum');

  if (!course) return <div className="p-10 text-center text-slate-400">Course not found.</div>;

  const participants = [
    { name: 'Alex Rivera', progress: 85, score: 92, lastActive: '2h ago', avatar: 'https://i.pravatar.cc/150?u=alex' },
    { name: 'Samantha Wu', progress: 42, score: 78, lastActive: '5h ago', avatar: 'https://i.pravatar.cc/150?u=sam' },
    { name: 'Jordan Smyth', progress: 100, score: 98, lastActive: '1d ago', avatar: 'https://i.pravatar.cc/150?u=jordan' },
    { name: 'Elena Gilbert', progress: 12, score: 0, lastActive: '3d ago', avatar: 'https://i.pravatar.cc/150?u=elena' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Context Header - Realistic Scale */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-3">
          <button onClick={() => navigate('/trainer/courses')} className="inline-flex items-center text-[10px] font-bold text-slate-400 hover:text-brand-navy uppercase tracking-widest transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-2" /> All Courses
          </button>
          <div className="flex items-center gap-2">
             <span className="px-2.5 py-0.5 bg-brand-cream text-brand-gold text-[9px] font-bold rounded uppercase tracking-widest border border-brand-amber/10">{course.level}</span>
             <span className="text-[11px] font-bold text-brand-amber flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-current" /> {course.rating} Avg</span>
          </div>
          <h1 className="text-2xl font-bold text-brand-navy tracking-tight">{course.title}</h1>
        </div>
        <div className="flex gap-3">
           <button onClick={() => navigate(`/trainer/materials?courseId=${courseId}`)} className="px-5 py-2.5 bg-brand-navy text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2">
              <Upload className="w-4 h-4 text-brand-amber" /> Update Material
           </button>
        </div>
      </div>

      {/* Internal Nav - Compact */}
      <div className="flex gap-6 border-b border-slate-100 overflow-x-auto pb-px">
        {['curriculum', 'participants'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-3 text-[10px] font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-brand-navy' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {tab === 'curriculum' ? 'Curriculum Structure' : 'Learner Intelligence'}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-amber rounded-full"></div>}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
           {activeTab === 'curriculum' ? (
             <div className="space-y-4">
                {[...Array(course.modules)].map((_, i) => (
                   <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                      <button 
                        onClick={() => setOpenModule(openModule === i ? null : i)}
                        className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                      >
                         <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-slate-200">0{i+1}</span>
                            <div className="text-left">
                               <h4 className="text-sm font-bold text-brand-navy">Module Title Part {i+1}</h4>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">2 Lessons • 1 Lab</p>
                            </div>
                         </div>
                         <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${openModule === i ? 'rotate-180' : ''}`} />
                      </button>
                      {openModule === i && (
                         <div className="p-5 pt-0 space-y-4 animate-in slide-in-from-top-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                               <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-default">
                                  <div className="flex items-center gap-3">
                                     <FileText className="w-4 h-4 text-brand-amber" />
                                     <span className="text-xs font-bold text-slate-700">Visual Core Standards</span>
                                  </div>
                                  <span className="text-[8px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded border border-emerald-100">Live</span>
                               </div>
                               <button 
                                  onClick={() => navigate(`/trainer/materials?courseId=${courseId}`)}
                                  className="p-4 rounded-xl border border-dashed border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                               >
                                  <Upload className="w-3.5 h-3.5 text-slate-300" />
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add Module File</span>
                               </button>
                            </div>
                         </div>
                      )}
                   </div>
                ))}
             </div>
           ) : (
             <div className="space-y-4">
                {participants.map((p, i) => (
                   <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-4 group hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                         <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                         <div>
                            <h4 className="font-bold text-brand-navy text-sm leading-tight">{p.name}</h4>
                            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Active {p.lastActive}</p>
                         </div>
                      </div>
                      <div className="flex-1 max-w-[120px] hidden sm:block">
                         <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                            <div className="h-full bg-brand-amber" style={{ width: `${p.progress}%` }}></div>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-bold text-slate-400 uppercase">Score</p>
                         <p className="text-sm font-bold text-brand-navy">{p.score}</p>
                      </div>
                      <button className="p-2 bg-slate-50 hover:bg-brand-navy hover:text-white rounded-lg transition-all">
                         <ArrowUpRight className="w-4 h-4" />
                      </button>
                   </div>
                ))}
             </div>
           )}
        </div>

        {/* Sidebar - Proportional */}
        <div className="lg:col-span-4 space-y-6">
           <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-3">Course Health</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-2"><Users className="w-4 h-4" /> Total Enrolled</span>
                    <span className="text-xs font-bold text-brand-navy">{course.students.toLocaleString()}</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-2"><Activity className="w-4 h-4" /> Completion</span>
                    <span className="text-xs font-bold text-brand-navy">72%</span>
                 </div>
              </div>
           </section>

           <section className="bg-brand-navy p-6 rounded-2xl text-white shadow-xl space-y-4">
              <h3 className="text-[10px] font-bold text-brand-amber uppercase tracking-widest flex items-center gap-2">
                 <Trophy className="w-4 h-4" /> Elite Students
              </h3>
              <div className="space-y-3">
                 {participants.slice(0, 2).map((p, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                       <div className="w-8 h-8 rounded-lg bg-brand-amber text-brand-navy flex items-center justify-center font-bold text-xs">#{i+1}</div>
                       <p className="text-xs font-bold">{p.name}</p>
                    </div>
                 ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default TrainerCourseDetail;
