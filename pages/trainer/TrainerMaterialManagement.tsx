
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, Plus, Send,
  FileText, HelpCircle, AlertCircle,
  Calendar, BookOpen, Video, FileUp, PlayCircle,
  Zap, CheckCircle2
} from 'lucide-react';
import { QuizQuestion } from '../../types';
import { EVENTS, COURSES } from '../../services/mockData';

const TrainerMaterialManagement: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const eventId = searchParams.get('eventId');
  const courseId = searchParams.get('courseId');
  const typeParam = searchParams.get('type');
  
  const [step, setStep] = useState<'upload' | 'quiz'>(typeParam === 'quiz' ? 'quiz' : 'upload');
  const [assetType, setAssetType] = useState<'document' | 'video'>('document');
  const [status, setStatus] = useState<'idle' | 'pending'>('idle');

  const contextTitle = eventId 
    ? EVENTS.find(e => e.id === eventId)?.title 
    : COURSES.find(c => c.id === courseId)?.title;

  const returnPath = eventId ? `/trainer/events/${eventId}` : `/trainer/courses/${courseId}`;

  const [questions, setQuestions] = useState<QuizQuestion[]>([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  const addQuestion = () => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);

  const handleFinalSubmit = () => {
    setStatus('pending');
    setTimeout(() => {
       navigate(returnPath);
    }, 2000);
  };

  if (status === 'pending') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-20 h-20 bg-brand-navy text-brand-amber rounded-2xl flex items-center justify-center mb-6 animate-bounce shadow-xl">
          <Clock className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-brand-navy mb-4">Awaiting Validation</h2>
        <div className="max-w-md space-y-4">
           <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
             Your curriculum update for <span className="text-brand-navy font-bold">"{contextTitle}"</span> has been submitted to the Academic Review Board.
           </p>
           <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-[11px] font-bold text-emerald-700 leading-tight">
                 Review cycles typically conclude within 24 working hours.
              </p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-100 pb-6 gap-6">
        <div className="flex items-center gap-5 w-full">
           <button onClick={() => navigate(returnPath)} className="p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-all shadow-sm shrink-0">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
           </button>
           <div className="min-w-0">
              <p className="text-[9px] font-bold text-brand-gold uppercase tracking-widest mb-1 truncate">Module Validation Hub</p>
              <h1 className="text-xl md:text-2xl font-bold text-brand-navy leading-tight truncate">
                {contextTitle}
              </h1>
           </div>
        </div>
        
        {/* Step Switcher - Proportional */}
        <div className="flex p-1.5 bg-slate-100 rounded-xl border border-slate-200 w-full md:w-auto shrink-0">
           <button 
             onClick={() => setStep('upload')}
             className={`flex-1 md:px-8 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${step === 'upload' ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
           >
              Media
           </button>
           <button 
             onClick={() => setStep('quiz')}
             className={`flex-1 md:px-8 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${step === 'quiz' ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
           >
              Quiz
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            {step === 'upload' ? (
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
                 {/* Asset Type Selector */}
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Classification</label>
                    <div className="grid grid-cols-2 gap-4">
                       <button 
                         onClick={() => setAssetType('document')}
                         className={`group p-5 rounded-xl border-2 transition-all text-left ${assetType === 'document' ? 'bg-brand-navy border-brand-navy shadow-lg' : 'bg-slate-50 border-slate-100 hover:border-brand-amber'}`}
                       >
                          <FileText className={`w-8 h-8 mb-3 transition-colors ${assetType === 'document' ? 'text-brand-amber' : 'text-slate-300 group-hover:text-brand-amber'}`} />
                          <p className={`text-sm font-bold transition-colors ${assetType === 'document' ? 'text-white' : 'text-brand-navy'}`}>Course Document</p>
                          <p className="text-[9px] font-bold uppercase tracking-widest mt-1 text-slate-400">PDF, PPT, DOCX</p>
                       </button>
                       <button 
                         onClick={() => setAssetType('video')}
                         className={`group p-5 rounded-xl border-2 transition-all text-left ${assetType === 'video' ? 'bg-brand-navy border-brand-navy shadow-lg' : 'bg-slate-50 border-slate-100 hover:border-brand-amber'}`}
                       >
                          <Video className={`w-8 h-8 mb-3 transition-colors ${assetType === 'video' ? 'text-brand-amber' : 'text-slate-300 group-hover:text-brand-amber'}`} />
                          <p className={`text-sm font-bold transition-colors ${assetType === 'video' ? 'text-white' : 'text-brand-navy'}`}>Masterclass Video</p>
                          <p className="text-[9px] font-bold uppercase tracking-widest mt-1 text-slate-400">MP4, MOV (MAX 2GB)</p>
                       </button>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Asset Heading</label>
                       <input 
                         type="text" 
                         placeholder="Title of this learning resource..." 
                         className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-amber/10 font-bold text-brand-navy text-sm transition-all" 
                       />
                    </div>
                 </div>

                 {/* Dropzone - Realistic Sizing */}
                 <div className="border-2 border-dashed border-slate-100 rounded-2xl p-12 text-center hover:bg-slate-50 hover:border-brand-amber/30 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm text-slate-300 group-hover:bg-brand-navy group-hover:text-brand-amber transition-all group-hover:scale-105">
                       {assetType === 'document' ? <FileUp className="w-8 h-8" /> : <PlayCircle className="w-8 h-8" />}
                    </div>
                    <p className="font-bold text-brand-navy text-lg tracking-tight">
                       {assetType === 'document' ? 'Select Digital File' : 'Transmit High-Def Video'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-widest">
                       Drag & Drop or Browse Internal Storage
                    </p>
                 </div>

                 <div className="flex justify-end items-center gap-6 pt-6 border-t border-slate-50">
                    <button onClick={() => navigate(returnPath)} className="px-6 py-3 font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest text-[10px] transition-colors">Discard Draft</button>
                    <button onClick={handleFinalSubmit} className="bg-brand-navy text-white px-10 py-3 rounded-xl font-bold shadow-lg flex items-center gap-3 hover:bg-slate-800 transition-all text-[10px] uppercase tracking-widest active:scale-95">
                       Register For Review <Send className="w-4 h-4 text-brand-amber" />
                    </button>
                 </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center justify-between px-2">
                    <h2 className="text-sm font-bold text-brand-navy uppercase tracking-widest">Assessment Builder</h2>
                    <button onClick={addQuestion} className="px-4 py-2 bg-slate-50 text-brand-navy rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all shadow-sm border border-slate-100">
                       Add Question
                    </button>
                 </div>

                 {questions.map((q, idx) => (
                   <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-8 relative group">
                      <div className="flex items-start gap-5">
                         <div className="w-10 h-10 bg-brand-navy text-brand-amber rounded-xl flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                            {idx + 1}
                         </div>
                         <div className="flex-1 space-y-4">
                            <input type="text" placeholder="Formulate assessment query..." className="w-full py-2 border-b-2 border-slate-100 focus:border-brand-amber transition-all focus:outline-none font-bold text-base bg-transparent text-brand-navy placeholder:text-slate-200" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                               {[1,2,3,4].map((o) => (
                                  <div key={o} className="relative group/opt">
                                     <input type="text" placeholder={`Option ${o}`} className="w-full pl-4 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-amber/5 transition-all text-slate-600" />
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                 ))}
                 
                 <div className="flex justify-end py-6">
                    <button onClick={handleFinalSubmit} className="bg-brand-navy text-white px-12 py-4 rounded-2xl font-bold shadow-xl flex items-center gap-3 hover:bg-slate-800 transition-all text-[10px] uppercase tracking-widest active:scale-95">
                       Finalize Quiz <Send className="w-4 h-4 text-brand-amber" />
                    </button>
                 </div>
              </div>
            )}
         </div>

         {/* Sidebar Intel */}
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-brand-navy p-6 rounded-2xl text-white shadow-lg relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <h3 className="text-[10px] font-bold text-brand-amber uppercase tracking-widest">Governance</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Learning assets undergo a multi-layered audit for <span className="text-white font-bold">QA Compliance</span> before reaching students.
                  </p>
                  <ul className="space-y-3 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                     <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-brand-amber" /> Pedagogy Review</li>
                     <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-brand-amber" /> Legal Compliance</li>
                  </ul>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-4">
                     <AlertCircle className="w-5 h-5 text-brand-amber" />
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Average Review: 24h</p>
                  </div>
               </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
               <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest border-b border-slate-50 pb-4">Context Indicator</h3>
               <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-brand-navy">
                     {eventId ? <Calendar className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Class Type</p>
                     <p className="text-sm font-bold text-brand-navy truncate">{eventId ? 'Event Asset' : 'Course Update'}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TrainerMaterialManagement;
