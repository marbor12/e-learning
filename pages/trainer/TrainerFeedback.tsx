
import React, { useState } from 'react';
import { 
  Star, ThumbsUp, MessageSquare, Send, X, 
  CheckCircle2, TrendingUp, Filter, Search,
  MessageCircle, Users, Award
} from 'lucide-react';
import { FEEDBACKS, CURRENT_TRAINER } from '../../services/mockData';

const TrainerFeedback: React.FC = () => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleReplySubmit = (feedbackId: string) => {
    if (!replyText.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessId(feedbackId);
      setReplyingTo(null);
      setReplyText('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessId(null), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Dynamic Header Node */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-12 opacity-5">
            <MessageCircle className="w-48 h-48" />
         </div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
               <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">Sentiment Analytics</span>
               </div>
               <h1 className="text-4xl font-black tracking-tight leading-tight">Learner Voice Hub</h1>
               <p className="text-indigo-200 font-medium text-lg mt-2">Manage your pedagogical reputation and engage with your students.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
               <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl min-w-[120px]">
                  <div className="text-3xl font-black text-white mb-1">4.8</div>
                  <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Global Rating</div>
               </div>
               <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl min-w-[120px]">
                  <div className="text-3xl font-black text-white mb-1">98%</div>
                  <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Satisfaction</div>
               </div>
               <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl min-w-[120px]">
                  <div className="text-3xl font-black text-white mb-1">1.2k</div>
                  <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Total Mentions</div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Perspective & Filters Column */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-24">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 border-b border-slate-50 pb-4">Insight Breakdown</h3>
               <div className="space-y-6">
                  {[5, 4, 3, 2, 1].map(stars => (
                     <div key={stars} className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                           <div className="flex items-center gap-1.5">
                              <Star className={`w-3 h-3 ${stars >= 1 ? 'text-yellow-400 fill-current' : 'text-slate-200'}`} />
                              <span>{stars} Star Focus</span>
                           </div>
                           <span>{stars === 5 ? '70%' : stars === 4 ? '20%' : '5%'}</span>
                        </div>
                        <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                           <div 
                              className={`h-full rounded-full transition-all duration-1000 ${stars === 5 ? 'bg-indigo-600' : 'bg-slate-300'}`} 
                              style={{ width: stars === 5 ? '70%' : stars === 4 ? '20%' : '5%' }}
                           ></div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="mt-12 pt-8 border-t border-slate-50 space-y-4">
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3">
                     <Filter className="w-4 h-4" /> Filter by Content
                  </button>
                  <button className="w-full py-4 bg-white border border-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                     Download Audit Report
                  </button>
               </div>
            </div>

            <div className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100">
               <h4 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Master Tip
               </h4>
               <p className="text-xs text-indigo-700 font-medium leading-relaxed italic">
                  Responding to feedback within 24 hours increases student retention and pedagogical trust by 35%. 
               </p>
            </div>
         </div>

         {/* Interaction Stream Column */}
         <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-2 mb-2">
               <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                  <Users className="w-6 h-6 text-indigo-600" /> Recent Student Dialogues
               </h2>
               <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search comments..." 
                    className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-indigo-50 shadow-sm"
                  />
               </div>
            </div>

            <div className="space-y-6">
               {FEEDBACKS.map(feedback => (
                  <div key={feedback.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
                     <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                           <div className="flex gap-4">
                              <img src={feedback.studentAvatar} alt={feedback.studentName} className="w-14 h-14 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                              <div>
                                 <h4 className="font-black text-slate-800 text-lg leading-tight">{feedback.studentName}</h4>
                                 <div className="flex items-center gap-2 mt-1">
                                    <div className="flex">
                                       {[...Array(5)].map((_, i) => (
                                          <Star key={i} className={`w-3.5 h-3.5 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-slate-100'}`} />
                                       ))}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest"> • {new Date(feedback.date).toLocaleDateString()}</span>
                                 </div>
                              </div>
                           </div>
                           <div className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black rounded-lg uppercase tracking-widest border border-slate-100">
                              {feedback.targetType}: {feedback.targetName}
                           </div>
                        </div>
                        
                        <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-50 relative mb-8">
                           <p className="text-slate-600 text-lg leading-relaxed font-medium italic">"{feedback.comment}"</p>
                        </div>

                        {/* Reply Interaction Area */}
                        {replyingTo === feedback.id ? (
                           <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 mb-6 animate-in slide-in-from-top-4 duration-300">
                              <div className="flex items-center gap-3 mb-4">
                                 <img src={CURRENT_TRAINER.avatarUrl} className="w-8 h-8 rounded-lg object-cover" alt="Me" />
                                 <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Replying as {CURRENT_TRAINER.name}</span>
                              </div>
                              <textarea 
                                 autoFocus
                                 value={replyText}
                                 onChange={(e) => setReplyText(e.target.value)}
                                 placeholder="Craft your response..." 
                                 className="w-full bg-white border border-indigo-100 rounded-2xl p-5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-100/50 min-h-[120px] transition-all mb-4"
                              ></textarea>
                              <div className="flex justify-end gap-3">
                                 <button 
                                    onClick={() => setReplyingTo(null)}
                                    className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors"
                                 >
                                    Cancel
                                 </button>
                                 <button 
                                    onClick={() => handleReplySubmit(feedback.id)}
                                    disabled={isSubmitting || !replyText.trim()}
                                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50"
                                 >
                                    {isSubmitting ? 'Sending...' : <><Send className="w-4 h-4" /> Post Reply</>}
                                 </button>
                              </div>
                           </div>
                        ) : successId === feedback.id ? (
                           <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 mb-6 animate-in zoom-in-95 flex items-center gap-4">
                              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                              <div>
                                 <p className="text-emerald-800 font-black text-xs uppercase tracking-widest">Reply Synchronized</p>
                                 <p className="text-emerald-600 text-[10px] font-medium mt-0.5">Your response has been sent to the student's learning dashboard.</p>
                              </div>
                           </div>
                        ) : null}
                        
                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                           <div className="flex gap-6">
                              <button className="flex items-center text-[10px] font-black text-slate-400 hover:text-indigo-600 gap-2 transition-all uppercase tracking-widest">
                                 <ThumbsUp className="w-4 h-4" /> Helpful (24)
                              </button>
                              <button 
                                 onClick={() => {
                                    setReplyingTo(feedback.id);
                                    setReplyText('');
                                 }}
                                 className={`flex items-center text-[10px] font-black gap-2 transition-all uppercase tracking-widest ${replyingTo === feedback.id ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
                              >
                                 <MessageSquare className="w-4 h-4" /> {replyingTo === feedback.id ? 'Crafting Reply...' : 'Write Reply'}
                              </button>
                           </div>
                           <button className="text-[10px] font-black text-slate-300 hover:text-slate-500 transition-all uppercase tracking-widest">
                              Report Policy Violation
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <button className="w-full py-6 bg-white border border-slate-100 rounded-[2.5rem] text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm">
               Load Historical Engagement
            </button>
         </div>
      </div>
    </div>
  );
};

export default TrainerFeedback;
