
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, XCircle, Search, 
  Users, Calendar, ShieldCheck, AlertCircle, ChevronRight,
  Clock, Check
} from 'lucide-react';
import { EVENTS } from '../../services/mockData';

const AdminAttendance: React.FC = () => {
  const navigate = useNavigate();
  const [activeEvent, setActiveEvent] = useState(EVENTS[0]);
  const [isValidating, setIsValidating] = useState(false);
  const [validatedIds, setValidatedIds] = useState<string[]>([]);

  const participants = [
    { id: '1', name: 'Alex Johnson', email: 'alex@example.com' },
    { id: '2', name: 'Maria Garcia', email: 'maria@example.com' },
    { id: '3', name: 'David Lee', email: 'david@example.com' },
    { id: '4', name: 'Sophie Taylor', email: 'sophie@example.com' },
  ];

  const toggleValidate = (id: string) => {
    if (validatedIds.includes(id)) {
      setValidatedIds(validatedIds.filter(v => v !== id));
    } else {
      setValidatedIds([...validatedIds, id]);
    }
  };

  const handleBulkApprove = () => {
    setIsValidating(true);
    setTimeout(() => {
       setIsValidating(false);
       navigate('/admin');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in duration-500 px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
           <button onClick={() => navigate('/admin')} className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 transition-all shadow-sm active:scale-90">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
           </button>
           <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ledger Validation</h1>
              <p className="text-slate-500 font-medium">Verify presence for certification issuance.</p>
           </div>
        </div>
        <button 
           onClick={handleBulkApprove}
           disabled={isValidating || validatedIds.length === 0}
           className="w-full md:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 transition-all disabled:opacity-30 disabled:shadow-none active:scale-95"
        >
           {isValidating ? (
              <><Clock className="w-4 h-4 animate-spin" /> Processing Ledger...</>
           ) : (
              <><ShieldCheck className="w-4 h-4" /> Finalize {validatedIds.length} Presences</>
           )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-4 space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Active Schedule Queue</h3>
            <div className="space-y-3">
               {EVENTS.map(event => (
                  <button 
                    key={event.id}
                    onClick={() => { setActiveEvent(event); setValidatedIds([]); }}
                    className={`w-full p-6 rounded-[2rem] border transition-all text-left flex items-center justify-between group
                      ${activeEvent.id === event.id ? 'bg-white border-indigo-600 shadow-xl translate-x-1' : 'bg-white border-slate-100 hover:border-indigo-300'}
                    `}
                  >
                     <div>
                        <p className="text-sm font-black text-slate-800">{event.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">{event.type} • Today</p>
                     </div>
                     <ChevronRight className={`w-5 h-5 ${activeEvent.id === event.id ? 'text-indigo-600' : 'text-slate-300 group-hover:text-indigo-600'} transition-all`} />
                  </button>
               ))}
            </div>
         </div>

         <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/30">
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Users className="w-4 h-4 text-indigo-500" /> {participants.length} Potential Learners
                     </div>
                     <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                        <Check className="w-4 h-4" /> {validatedIds.length} Checked
                     </div>
                  </div>
                  <div className="relative w-full md:w-auto">
                     <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input type="text" placeholder="Find learner..." className="w-full md:w-64 pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                  </div>
               </div>

               <div className="divide-y divide-slate-50">
                  {participants.map(p => (
                     <div key={p.id} className={`p-8 flex flex-col sm:flex-row items-center justify-between hover:bg-slate-50/50 transition-all gap-6 ${validatedIds.includes(p.id) ? 'bg-emerald-50/20' : ''}`}>
                        <div className="flex items-center gap-5 w-full">
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm transition-all
                              ${validatedIds.includes(p.id) ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              {validatedIds.includes(p.id) ? <Check /> : p.name.charAt(0)}
                           </div>
                           <div>
                              <p className="text-base font-black text-slate-800 leading-tight">{p.name}</p>
                              <p className="text-xs text-slate-400 font-medium">{p.email}</p>
                           </div>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                           <button 
                             onClick={() => toggleValidate(p.id)}
                             className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2
                               ${validatedIds.includes(p.id) ? 'bg-red-50 text-red-700 hover:bg-red-600 hover:text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white'}`}
                           >
                              {validatedIds.includes(p.id) ? <><XCircle className="w-4 h-4" /> Revoke</> : <><CheckCircle2 className="w-4 h-4" /> Approve</>}
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100 flex items-start gap-5">
               <AlertCircle className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
               <p className="text-xs text-indigo-700 font-medium leading-relaxed">
                  Bulk validation ensures high throughput. Once <span className="font-bold">Finalized</span>, participants will receive automated email triggers containing their encrypted certificates linked to idSpora’s academic ledger.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminAttendance;
