
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileText, CheckCircle, XCircle, 
  Download, ListChecks, ShieldCheck, Eye, 
  MessageCircle, Send, AlertTriangle, Video, PlayCircle
} from 'lucide-react';
import { MATERIAL_STATUSES } from '../../services/mockData';

const AdminMaterialValidation: React.FC = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(MATERIAL_STATUSES[1]); // Set a pending item
  const [adminNote, setAdminNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDecision = (type: 'approve' | 'reject') => {
    setIsProcessing(true);
    setTimeout(() => {
       setIsProcessing(false);
       navigate('/admin');
    }, 1500);
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-b border-slate-100 pb-12">
        <div className="flex items-center gap-8">
           <button onClick={() => navigate('/admin')} className="p-5 bg-white hover:bg-slate-50 rounded-[1.5rem] border border-slate-200 transition-all shadow-sm active:scale-90">
              <ArrowLeft className="w-6 h-6 text-slate-400" />
           </button>
           <div>
              <h1 className="text-4xl font-black text-brand-navy tracking-tighter">Pedagogical Audit</h1>
              <p className="text-slate-400 font-medium text-xl mt-2">Verify and finalize instructor-led learning assets.</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
         {/* Queue List */}
         <div className="lg:col-span-4 space-y-10">
            <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] px-4">Validation Ledger</h3>
            <div className="space-y-4">
               {MATERIAL_STATUSES.filter(m => m.status.includes('Waiting')).map(m => (
                  <button 
                    key={m.id}
                    onClick={() => setSelectedItem(m)}
                    className={`w-full p-8 rounded-[3rem] border transition-all text-left group
                      ${selectedItem.id === m.id ? 'bg-brand-navy border-brand-navy shadow-2xl translate-x-2' : 'bg-white border-slate-100 hover:border-brand-amber hover:bg-slate-50'}
                    `}
                  >
                     <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${selectedItem.id === m.id ? 'bg-brand-amber text-brand-navy' : 'bg-slate-50 text-slate-300'}`}>
                           {m.type === 'Material' ? <FileText size={24} /> : m.type === 'Video' ? <Video size={24} /> : <ListChecks size={24} />}
                        </div>
                        <div>
                           <p className={`text-base font-black leading-tight transition-colors ${selectedItem.id === m.id ? 'text-white' : 'text-brand-navy'}`}>{m.title}</p>
                           <p className={`text-[10px] font-black uppercase mt-2 tracking-widest ${selectedItem.id === m.id ? 'text-slate-400' : 'text-slate-300'}`}>{m.timestamp}</p>
                        </div>
                     </div>
                  </button>
               ))}
            </div>
         </div>

         {/* Review Area */}
         <div className="lg:col-span-8 space-y-12">
            <div className="bg-white rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-12 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="space-y-3">
                     <span className="px-5 py-1.5 bg-brand-navy text-brand-amber text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-brand-navy/10">
                        {selectedItem.type} Inspection
                     </span>
                     <h2 className="text-4xl font-black text-brand-navy tracking-tight leading-none">{selectedItem.title}</h2>
                     <p className="text-xs text-slate-400 font-black mt-2 uppercase tracking-[0.2em] flex items-center gap-3">
                        Instructor: <span className="text-brand-gold">Sarah Jenkins</span> 
                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div> 
                        Security: Verified
                     </p>
                  </div>
                  <button className="p-6 bg-white border border-slate-100 rounded-[2rem] text-brand-navy shadow-sm hover:text-brand-amber hover:shadow-xl transition-all active:scale-95 group">
                     <Download size={28} className="group-hover:scale-110 transition-transform" />
                  </button>
               </div>

               <div className="p-12 space-y-12">
                  {/* Visual Preview Container */}
                  <div className="aspect-video bg-brand-navy rounded-[3.5rem] flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-2xl">
                     <div className="absolute inset-0 bg-gradient-to-br from-brand-amber/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="text-center relative z-10 transition-transform duration-700 group-hover:scale-110">
                        {selectedItem.type === 'Video' ? (
                           <>
                              <PlayCircle className="w-20 h-20 text-brand-amber mx-auto mb-6 shadow-2xl" />
                              <p className="text-[11px] font-black text-brand-amber uppercase tracking-[0.4em]">Initialize Stream Preview</p>
                           </>
                        ) : (
                           <>
                              <Eye className="w-16 h-16 text-white/20 mx-auto mb-6" />
                              <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Open Interactive Viewer</p>
                           </>
                        )}
                     </div>
                  </div>

                  <div className="space-y-8">
                     <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-3">
                        <MessageCircle className="w-5 h-5" /> Academic Review Logs
                     </h3>
                     <textarea 
                        value={adminNote}
                        onChange={(e) => setAdminNote(e.target.value)}
                        placeholder="Draft your evaluation or request specific revisions..." 
                        className="w-full px-10 py-8 bg-slate-50 border border-slate-100 rounded-[3rem] focus:outline-none focus:ring-8 focus:ring-brand-amber/5 transition-all font-bold text-slate-700 min-h-[180px] placeholder:text-slate-300"
                     ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                     <button 
                        onClick={() => handleDecision('reject')}
                        disabled={isProcessing}
                        className="w-full sm:flex-1 py-6 border-2 border-slate-100 text-slate-400 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.25em] hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all disabled:opacity-50 active:scale-95"
                     >
                        Request Revision
                     </button>
                     <button 
                        onClick={() => handleDecision('approve')}
                        disabled={isProcessing}
                        className="w-full sm:flex-1 py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.25em] shadow-2xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                     >
                        {isProcessing ? 'Synchronizing...' : <><ShieldCheck size={20} /> Authorize & Publish</>}
                     </button>
                  </div>
               </div>
            </div>

            <div className="bg-brand-cream/30 p-10 rounded-[3.5rem] border border-brand-cream/50 flex items-start gap-8 shadow-sm">
               <AlertTriangle className="w-8 h-8 text-brand-gold shrink-0 mt-1" />
               <p className="text-base text-brand-gold font-bold leading-relaxed">
                  Platform Notice: Publishing this {selectedItem.type.toLowerCase()} will trigger a global update for <span className="text-brand-navy font-black">1,250 Active Learners</span>. Please ensure video transcoding and document compression are optimal.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminMaterialValidation;
