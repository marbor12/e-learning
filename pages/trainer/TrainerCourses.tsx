
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, BookOpen, ArrowRight, Upload, Plus, Layers, GraduationCap } from 'lucide-react';
import { COURSES } from '../../services/mockData';

const TrainerCourses: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Header - Balanced Scale */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-brand-navy tracking-tight">Academic Curriculum</h1>
          <p className="text-slate-500 text-xs md:text-sm font-medium">Structure and manage your professional learning pathways.</p>
        </div>
        <button 
          onClick={() => navigate('/trainer/materials')}
          className="w-full sm:w-auto px-5 py-2.5 bg-brand-navy text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-800 shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Upload className="w-4 h-4 text-brand-amber" /> Propose Module
        </button>
      </div>

      {/* Course Grid - Consistent & Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map(course => (
          <div 
            key={course.id} 
            onClick={() => navigate(`/trainer/courses/${course.id}`)}
            className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer bento-card"
          >
            {/* Image Section - Proportional 16:9 Aspect */}
            <div className="aspect-video relative overflow-hidden shrink-0">
               <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent"></div>
               
               <div className="absolute top-3 left-3">
                  <span className="bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-brand-navy shadow-sm border border-slate-100">
                     {course.level}
                  </span>
               </div>
               
               <div className="absolute bottom-3 right-3">
                  <div className="flex items-center gap-1 bg-brand-navy/80 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-bold border border-white/10">
                     <Star className="w-3 h-3 text-brand-amber fill-brand-amber" /> {course.rating}
                  </div>
               </div>
            </div>

            {/* Content Section - Realistic Typography */}
            <div className="p-5 flex flex-col flex-1">
               <div className="mb-4 space-y-2">
                  <h3 className="text-base font-bold text-brand-navy group-hover:text-brand-amber transition-colors line-clamp-1">{course.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 font-medium">{course.description}</p>
               </div>
               
               {/* Metadata Row */}
               <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex gap-4">
                     <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-600 tracking-tight">{course.students.toLocaleString()} Learners</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-600 tracking-tight">{course.modules} Units</span>
                     </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand-navy group-hover:text-white transition-all shadow-sm">
                     <ArrowRight className="w-4 h-4" />
                  </div>
               </div>
            </div>
          </div>
        ))}
        
        {/* Propose Course Placeholder - Refined */}
        <div 
          onClick={() => navigate('/trainer/materials?type=new')}
          className="bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-8 hover:bg-white hover:border-brand-amber transition-all cursor-pointer group h-full"
        >
           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-brand-navy group-hover:text-brand-amber transition-all shadow-sm mb-4 border border-slate-100">
              <Plus className="w-5 h-5" />
           </div>
           <h4 className="text-sm font-bold text-brand-navy mb-1">New Curriculum</h4>
           <p className="text-[10px] text-slate-400 font-medium max-w-[180px]">Propose a new module for academic validation.</p>
        </div>
      </div>
    </div>
  );
};

export default TrainerCourses;
