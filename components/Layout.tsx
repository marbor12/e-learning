
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  const location = useLocation();
  const isTrainer = location.pathname.startsWith('/trainer');
  const role = isTrainer ? 'trainer' : 'admin';

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-brand-amber selection:text-brand-navy">
      <Sidebar role={role} />
      
      <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">
        <Header />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
            <Outlet />
          </div>
        </main>
        
        <footer className="px-6 py-8 border-t border-slate-100 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} idSpora Master Studio &bull; Professional Academy Ecosystem
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
