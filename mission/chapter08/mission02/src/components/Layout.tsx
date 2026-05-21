import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen" style={{ background: '#09090b' }}>
      <Header onMenuClick={() => setSidebarOpen(prev => !prev)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className={`pt-14 min-h-screen transition-all duration-300 ${sidebarOpen ? 'md:pl-60' : ''}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
