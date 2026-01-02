
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, XCircle, Search, 
  Users, Calendar, Save, AlertCircle
} from 'lucide-react';
import { EVENTS } from '../../services/mockData';

const TrainerAttendance: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventId = searchParams.get('eventId');
  const event = EVENTS.find(e => e.id === eventId);
  const [isSaving, setIsSaving] = useState(false);

  if (!event) return <div className="p-10 text-center">Context not found.</div>;

  const participants = [
    { id: '1', name: 'Alex Johnson', email: 'alex@example.com', status: 'Pending' },
    { id: '2', name: 'Maria Garcia', email: 'maria@example.com', status: 'Pending' },
    { id: '3', name: 'David Lee', email: 'david@example.com', status: 'Pending' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
       navigate(`/trainer/events/${eventId}`);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate(`/trainer/events/${eventId}`)} className="p-2.5 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
           </button>
           <div>
              <h1 className="text-2xl font-black text-slate-900">Attendance Validation</h1>
              <p className="text-slate-500 text-sm font-medium">Context: {event.title}</p>
           </div>
        </div>
        <button 
           onClick={handleSave}
           disabled={isSaving}
           className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 flex items-center gap-2 disabled:opacity-50"
        >
           {isSaving ? 'Processing...' : <><Save className="w-4 h-4" /> Save Validation</>}
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Calendar className="w-4 h-4" /> {new Date(event.date).toDateString()}
               </div>
               <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Users className="w-4 h-4" /> {participants.length} Participants
               </div>
            </div>
            <div className="relative">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input type="text" placeholder="Search name..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none" />
            </div>
         </div>

         <div className="divide-y divide-slate-100">
            {participants.map(p => (
               <div key={p.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-indigo-600">
                        {p.name.charAt(0)}
                     </div>
                     <div>
                        <p className="text-sm font-black text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.email}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Present
                     </button>
                     <button className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5" /> Absent
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-start gap-4">
         <AlertCircle className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
         <p className="text-xs text-indigo-700 font-medium leading-relaxed">
            Attendance status will be reflected in the participant's certificate eligibility. Once saved, validation is forwarded to Admin for final verification.
         </p>
      </div>
    </div>
  );
};

export default TrainerAttendance;
