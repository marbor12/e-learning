import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, XCircle, Download, User, Send, ListChecks, HelpCircle } from 'lucide-react';
import { COURSE_SUBMISSIONS } from '../../services/mockData';

const AdminSubmissionDetail: React.FC = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState<'none' | 'approved' | 'rejected'>('none');
  const submission = COURSE_SUBMISSIONS.find(s => s.id === submissionId);

  if (!submission) return <div className="p-10 text-center text-slate-400 font-bold">Submission not found</div>;

  const handleAction = (type: 'approved' | 'rejected') => {
    setDecision(type);
    setTimeout(() => {
        navigate('/admin-trainer');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <Link to="/admin-trainer" className="inline-flex items-center text-sm font-black text-slate-400 hover:text-indigo-600 transition-colors">
         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Review List
      </Link>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
         <div className="p-10 border-b border-slate-100 bg-slate-50/50">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div>
                   <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-3 inline-block shadow-lg shadow-indigo-100">
                      {submission.type} Request
                   </span>
                   <h1 className="text-3xl font-black text-slate-800 leading-tight">{submission.courseTitle}</h1>
                   <p className="text-slate-400 font-bold text-xs mt-2 flex items-center gap-2">
                      <HelpCircle className="w-3 h-3" /> Submitted on {new Date(submission.date).toLocaleDateString()}
                   </p>
                </div>
                <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm">
                   <img src={`https://ui-avatars.com/api/?name=${submission.trainerName}&background=6366f1&color=fff`} className="w-12 h-12 rounded-xl" />
                   <div>
                      <p className="text-sm font-black text-slate-800">{submission.trainerName}</p>
                      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Narasumber</p>
                   </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative">
               <div className="absolute top-4 right-6 opacity-10">
                  <FileText className="w-16 h-16" />
               </div>
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Trainer Message</h3>
               <p className="text-slate-600 font-medium italic leading-relaxed text-lg">"{submission.message}"</p>
            </div>
         </div>

         <div className="p-10 space-y-10">
            {/* Structured Quiz Preview */}
            {submission.quizData && (
               <div>
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                     <ListChecks className="w-6 h-6 text-indigo-600" /> Interactive Quiz Preview
                  </h3>
                  <div className="space-y-6">
                     {submission.quizData.map((q, idx) => (
                        <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                           <p className="text-sm font-black text-slate-800 mb-4">{idx + 1}. {q.question}</p>
                           <div className="grid grid-cols-2 gap-3">
                              {q.options.map((opt, oIdx) => (
                                 <div key={oIdx} className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between
                                    ${q.correctAnswer === oIdx ? 'bg-green-100 border-green-200 text-green-700' : 'bg-white border-slate-100 text-slate-500'}`}>
                                    {opt}
                                    {q.correctAnswer === oIdx && <CheckCircle className="w-4 h-4" />}
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* Attachments */}
            {submission.attachments.length > 0 && (
               <div>
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                     <Download className="w-6 h-6 text-indigo-600" /> Asset Bundle
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {submission.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-300 transition-all cursor-pointer group">
                           <div className="flex items-center gap-4">
                              <FileText className="w-5 h-5 text-indigo-400" />
                              <span className="text-sm font-bold text-slate-700">{file}</span>
                           </div>
                           <Download className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* Admin Decision */}
            <div className="pt-10 border-t border-slate-100">
               {decision === 'none' ? (
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                     <div className="space-y-1">
                        <p className="text-xl font-black text-slate-800">Publish this content?</p>
                        <p className="text-sm font-medium text-slate-400">Approved content will be automatically formatted and live for students.</p>
                     </div>
                     <div className="flex gap-4 w-full md:w-auto">
                        <button 
                           onClick={() => handleAction('rejected')}
                           className="flex-1 md:flex-none px-10 py-4 border border-red-100 text-red-600 rounded-2xl font-black hover:bg-red-50 transition-all uppercase tracking-widest text-xs"
                        >
                           Reject
                        </button>
                        <button 
                           onClick={() => handleAction('approved')}
                           className="flex-1 md:flex-none px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest text-xs"
                        >
                           Approve & Publish
                        </button>
                     </div>
                  </div>
               ) : (
                  <div className={`p-6 rounded-2xl text-center font-black flex items-center justify-center gap-4 animate-pulse uppercase tracking-widest text-sm
                     ${decision === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                     {decision === 'approved' ? <CheckCircle /> : <XCircle />}
                     {decision === 'approved' ? 'Content is Now Live' : 'Submission Rejected'}
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminSubmissionDetail;