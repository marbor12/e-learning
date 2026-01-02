
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, Search, ChevronRight, Check, Shield } from 'lucide-react';
import { CURRENT_TRAINER, NOTIFICATIONS } from '../services/mockData';

const Header: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getBreadcrumbName = (path: string) => {
    switch (path) {
      case 'trainer': return 'Dashboard';
      case 'admin': return 'System Overview';
      case 'events': return 'My Events';
      case 'courses': return 'My Courses';
      case 'feedback': return 'Feedback';
      case 'profile': return 'Profile';
      case 'trainers': return 'Trainers List';
      case 'validation': return 'Audit Ledger';
      case 'attendance': return 'Presences';
      default: return path.charAt(0).toUpperCase() + path.slice(1);
    }
  };

  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
      <nav className="flex items-center text-xs md:text-sm text-slate-500 overflow-hidden">
        <span className="font-medium text-slate-400 hidden sm:inline">Home</span>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const name = getBreadcrumbName(value);

          return (
            <React.Fragment key={to}>
              <ChevronRight className="w-4 h-4 mx-2 text-slate-300 hidden sm:inline" />
              {isLast ? (
                <span className="font-bold text-brand-navy capitalize truncate max-w-[120px] md:max-w-none">
                  {name}
                </span>
              ) : (
                <Link to={to} className="hover:text-brand-amber transition-colors capitalize hidden sm:inline">
                  {name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative hidden lg:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="System lookup..." 
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-4 focus:ring-brand-amber/5 w-48 md:w-64"
          />
        </div>
        
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-xl transition-all ${showNotifications ? 'bg-slate-100 text-brand-navy' : 'text-slate-400 hover:bg-slate-50 hover:text-brand-navy'}`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-amber rounded-full border-2 border-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-brand-navy text-[13px]">Notifications</h3>
                <span className="text-[10px] text-brand-amber font-bold cursor-pointer hover:underline uppercase tracking-tight">Mark all read</span>
              </div>
              <div className="max-h-[350px] overflow-y-auto">
                {NOTIFICATIONS.map(notification => (
                  <div key={notification.id} className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex gap-3">
                    <div className={`w-1.5 h-1.5 mt-1.5 rounded-full shrink-0 ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-brand-amber'}`}></div>
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-800 leading-tight">{notification.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-bold text-brand-navy leading-tight">{isAdmin ? 'Admin Team' : CURRENT_TRAINER.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isAdmin ? 'Superuser' : 'Instructor'}</p>
          </div>
          {isAdmin ? (
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-brand-navy flex items-center justify-center text-white shadow-lg">
               <Shield className="w-5 h-5" />
            </div>
          ) : (
            <img src={CURRENT_TRAINER.avatarUrl} alt="Profile" className="w-9 h-9 md:w-10 md:h-10 rounded-xl object-cover border border-slate-100 shadow-md" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
