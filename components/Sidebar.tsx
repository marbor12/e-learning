
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  User, 
  LogOut,
  GraduationCap,
  Zap,
  Menu,
  X,
  ShieldCheck,
  Users,
  FileCheck,
  Settings
} from 'lucide-react';
import { CURRENT_TRAINER } from '../services/mockData';

interface SidebarProps {
  role: 'trainer' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const trainerLinks = [
    { name: 'Home', path: '/trainer', icon: LayoutDashboard, end: true },
    { name: 'Event', path: '/trainer/events', icon: Calendar, end: false },
    { name: 'Course', path: '/trainer/courses', icon: BookOpen, end: false },
    { name: 'Feedback', path: '/trainer/feedback', icon: MessageSquare, end: false },
    { name: 'Profile', path: '/trainer/profile', icon: User, end: false },
  ];

  const adminLinks = [
    { name: 'System Hub', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Trainers', path: '/admin/trainers', icon: Users, end: false },
    { name: 'Validation', path: '/admin/validation', icon: FileCheck, end: false },
    { name: 'Attendance', path: '/admin/attendance', icon: ShieldCheck, end: false },
  ];

  const links = role === 'trainer' ? trainerLinks : adminLinks;

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] p-3 bg-brand-navy text-white rounded-full shadow-2xl md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 flex flex-col z-50 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-brand-navy p-2 rounded-xl shadow-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black text-brand-navy tracking-tighter">idSpora</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
            {role === 'trainer' ? 'Instructor Menu' : 'Governance'}
          </div>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'sidebar-link-active'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-brand-navy'
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span className="text-sm font-semibold">{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6">
          {role === 'trainer' ? (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4 hidden md:block">
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-brand-amber">
                     <Zap className="w-4 h-4 fill-brand-amber" />
                  </div>
                  <div className="overflow-hidden">
                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Instructor</p>
                     <p className="text-[11px] font-bold text-brand-navy truncate">{CURRENT_TRAINER.name}</p>
                  </div>
               </div>
               <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-brand-amber rounded-full"></div>
               </div>
            </div>
          ) : (
            <div className="p-4 bg-brand-navy/5 rounded-2xl border border-brand-navy/5 mb-4 hidden md:block">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-navy text-white flex items-center justify-center">
                     <Settings className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">System Role</p>
                     <p className="text-[11px] font-bold text-brand-navy truncate">Super Administrator</p>
                  </div>
               </div>
            </div>
          )}

          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all font-bold text-[11px] uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
