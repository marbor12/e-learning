import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Calendar, Edit, Award, ArrowRight } from 'lucide-react';
import { TRAINERS_LIST, EVENTS, COURSES, FEEDBACKS } from '../../services/mockData';

const AdminTrainerDetail: React.FC = () => {
  const { trainerId } = useParams();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'schedule' | 'evaluation'>('profile');
  
  const trainer = TRAINERS_LIST.find(t => t.id === trainerId);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['profile', 'history', 'schedule', 'evaluation'].includes(tabParam)) {
        setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  if (!trainer) return <div>Trainer not found</div>;

  return (
    <div className="space-y-6">
      <Link to="/admin-trainer/trainers" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600">
         <ArrowLeft className="w-4 h-4 mr-1" /> Back to Trainers
      </Link>

      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 md:items-center">
         <div className="relative">
            <img src={trainer.avatarUrl} alt={trainer.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-50" />
            <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white 
               ${trainer.status === 'active' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
         </div>
         <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800">{trainer.name}</h1>
            <p className="text-slate-500">{trainer.specialization}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
               <div className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-400" /> {trainer.location}</div>
               <div className="flex items-center gap-1"><Mail className="w-4 h-4 text-slate-400" /> {trainer.email}</div>
               <div className="flex items-center gap-1"><Phone className="w-4 h-4 text-slate-400" /> {trainer.phone}</div>
            </div>
         </div>
         <div className="flex gap-3">
             <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-600">
                Suspend
             </button>
             <Link to={`/admin-trainer/trainers/${trainer.id}/edit`} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                <Edit className="w-4 h-4" /> Edit Profile
             </Link>
         </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex gap-6">
         {['profile', 'history', 'schedule', 'evaluation'].map(tab => (
            <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`pb-3 text-sm font-bold capitalize transition-all border-b-2 
                  ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-600'}`}
            >
               {tab}
            </button>
         ))}
      </div>

      <div className="min-h-[300px]">
         {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4">Bio</h3>
                  <p className="text-slate-600 leading-relaxed">{trainer.bio}</p>
                  
                  <h3 className="font-bold text-slate-800 mt-6 mb-4">Professional Info</h3>
                  <ul className="space-y-3">
                     <li className="flex justify-between text-sm"><span className="text-slate-500">Joined Date</span> <span className="font-medium">{new Date(trainer.joinedDate).toLocaleDateString()}</span></li>
                     <li className="flex justify-between text-sm"><span className="text-slate-500">Employee ID</span> <span className="font-medium">TR-{trainer.id.toUpperCase()}</span></li>
                  </ul>
               </div>
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4">Certifications</h3>
                  <div className="space-y-3">
                     <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <Award className="w-8 h-8 text-indigo-500" />
                        <div>
                           <p className="font-bold text-sm text-slate-800">Certified Senior UX Designer</p>
                           <p className="text-xs text-slate-500">Issued by Google • 2021</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {activeTab === 'history' && (
            <div className="space-y-4">
               <h3 className="font-bold text-slate-800">Teaching History</h3>
               <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  {EVENTS.map(event => (
                     <Link to={`/admin-trainer/events/${event.id}`} key={event.id} className="p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 flex justify-between items-center group transition-colors">
                        <div>
                           <p className="font-bold text-slate-800 group-hover:text-indigo-600">{event.title}</p>
                           <p className="text-xs text-slate-500">{new Date(event.date).toLocaleDateString()} • {event.attendees} Attendees</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded capitalize">Completed</span>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                        </div>
                     </Link>
                  ))}
                  {COURSES.map(course => (
                     <Link to={`/admin-trainer/courses/${course.id}`} key={course.id} className="p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 flex justify-between items-center group transition-colors">
                        <div>
                           <p className="font-bold text-slate-800 group-hover:text-indigo-600">{course.title}</p>
                           <p className="text-xs text-slate-500">{course.students} Students Enrolled</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded capitalize">Ongoing</span>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         )}

         {activeTab === 'evaluation' && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                      <h4 className="text-3xl font-bold text-slate-800">{trainer.rating}</h4>
                      <p className="text-sm text-slate-500">Average Rating</p>
                   </div>
                   <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                      <h4 className="text-3xl font-bold text-slate-800">98%</h4>
                      <p className="text-sm text-slate-500">Attendance Rate</p>
                   </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                   <h3 className="font-bold text-slate-800 mb-4">Student Reviews</h3>
                   <div className="space-y-4">
                      {FEEDBACKS.map(f => (
                         <div key={f.id} className="p-4 bg-slate-50 rounded-lg">
                            <div className="flex justify-between mb-2">
                               <span className="font-bold text-sm">{f.studentName}</span>
                               <span className="text-yellow-500 text-sm font-bold">★ {f.rating}</span>
                            </div>
                            <p className="text-sm text-slate-600">"{f.comment}"</p>
                            <div className="mt-2 text-xs text-indigo-600 hover:underline cursor-pointer">
                                {f.targetType === 'Event' ? (
                                    <Link to={`/admin-trainer/events/${f.targetId}`}>View Event Context</Link>
                                ) : (
                                    <Link to={`/admin-trainer/courses/${f.targetId}`}>View Course Context</Link>
                                )}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
            </div>
         )}
         
         {activeTab === 'schedule' && (
             <div className="bg-white p-6 rounded-xl border border-slate-200 text-center py-12">
                <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <h3 className="text-slate-800 font-bold mb-1">Calendar Integration</h3>
                <p className="text-slate-500 text-sm">View the trainer's complete monthly schedule here.</p>
                <div className="mt-6 flex flex-col gap-2 max-w-sm mx-auto">
                    {EVENTS.map(event => (
                        <Link to={`/admin-trainer/events/${event.id}`} key={event.id} className="text-left bg-slate-50 p-3 rounded-lg flex justify-between items-center hover:bg-slate-100">
                            <div>
                                <p className="text-xs font-bold text-indigo-600">{new Date(event.date).toLocaleDateString()}</p>
                                <p className="text-sm font-medium text-slate-800">{event.title}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400" />
                        </Link>
                    ))}
                </div>
             </div>
         )}
      </div>
    </div>
  );
};

export default AdminTrainerDetail;