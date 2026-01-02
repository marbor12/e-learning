import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Upload, FileText, CheckCircle, Plus, Trash2, ListChecks, HelpCircle } from 'lucide-react';
import { COURSES } from '../../services/mockData';
import { QuizQuestion } from '../../types';

const TrainerMaterialSubmission: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get('courseId');
  const typeParam = searchParams.get('type');
  
  const [submitted, setSubmitted] = useState(false);
  const [submissionType, setSubmissionType] = useState(typeParam === 'quiz' ? 'Quiz' : 'Update Material');
  
  // Quiz Builder State
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    if (field === 'question') newQuestions[index].question = value;
    if (field === 'correctAnswer') newQuestions[index].correctAnswer = parseInt(value);
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        navigate('/trainer/courses');
    }, 2000);
  };

  if (submitted) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Sent to Admin!</h2>
            <p className="text-slate-500 max-w-md mb-8">
                Your content has been submitted. Admin will review the structure and notify you once it's published.
            </p>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-4">
        <Link to="/trainer/courses" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
        </Link>
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Material Submission</h1>
            <p className="text-slate-500 text-sm">Submit your resources for Admin review and publishing.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Submission Type</label>
                    <select 
                      value={submissionType}
                      onChange={(e) => setSubmissionType(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                    >
                        <option value="Update Material">Update Modules/Content</option>
                        <option value="Quiz">Interactive Quiz Builder</option>
                        <option value="Requirements">Technical Requirements</option>
                        <option value="New Course">New Course Proposal</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Target Course</label>
                    <select defaultValue={courseId || ""} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium">
                        <option value="" disabled>-- Select Course --</option>
                        {COURSES.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        <option value="new">New Course Proposition</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Message to Admin</label>
                <textarea rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Explain the changes or provide context for the admin team..."></textarea>
            </div>
        </div>

        {/* Dynamic Section: Quiz Builder */}
        {submissionType === 'Quiz' && (
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                    <ListChecks className="w-6 h-6 text-indigo-600" /> Quiz Builder
                 </h2>
                 <button 
                   type="button" 
                   onClick={addQuestion}
                   className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-colors"
                 >
                    <Plus className="w-4 h-4" /> Add Question
                 </button>
              </div>

              {questions.map((q, qIdx) => (
                 <div key={qIdx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative group">
                    <button 
                       type="button" 
                       onClick={() => removeQuestion(qIdx)}
                       className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                       <Trash2 className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-start gap-4 mb-6">
                       <span className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black shrink-0 shadow-lg shadow-indigo-100">
                          {qIdx + 1}
                       </span>
                       <div className="flex-1">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Question Title</label>
                          <input 
                            type="text" 
                            value={q.question}
                            onChange={(e) => updateQuestion(qIdx, 'question', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-800"
                            placeholder="e.g. What is the difference between Padding and Margin?"
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14">
                       {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="relative">
                             <input 
                               type="text" 
                               value={opt}
                               onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                               className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all
                                  ${q.correctAnswer === oIdx ? 'bg-green-50 border-green-300 ring-2 ring-green-100' : 'bg-slate-50 border-slate-100'}`}
                               placeholder={`Option ${oIdx + 1}`}
                             />
                             <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <input 
                                  type="radio" 
                                  name={`correct-${qIdx}`} 
                                  checked={q.correctAnswer === oIdx}
                                  onChange={() => updateQuestion(qIdx, 'correctAnswer', oIdx)}
                                  className="w-5 h-5 accent-green-600 cursor-pointer"
                                />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              ))}
           </div>
        )}

        {/* Regular Material Upload */}
        {submissionType !== 'Quiz' && (
           <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                 <Upload className="w-5 h-5 text-indigo-600" /> Digital Assets
              </h3>
              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                     <Upload className="w-8 h-8" />
                  </div>
                  <p className="text-lg font-bold text-slate-700">Drag and drop your content</p>
                  <p className="text-sm text-slate-400 mt-1 max-w-xs">Upload slides, documents, or reference images for the course update.</p>
              </div>
           </div>
        )}

        <div className="flex items-center justify-end gap-4 pt-4">
            <Link to="/trainer/courses" className="px-8 py-3 rounded-2xl text-slate-500 font-bold hover:bg-slate-100 transition-colors">
                Cancel
            </Link>
            <button type="submit" className="px-10 py-3 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all flex items-center gap-3 shadow-xl shadow-indigo-100">
                <Send className="w-5 h-5" /> Submit to Admin
            </button>
        </div>
      </form>
    </div>
  );
};

export default TrainerMaterialSubmission;