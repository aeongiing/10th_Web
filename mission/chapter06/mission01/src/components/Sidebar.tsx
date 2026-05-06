import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  const active = (path: string) => location.pathname === path;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 flex flex-col md:top-14 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ transition: 'transform 0.3s ease-in-out', background: '#0a0a0a', borderRight: '1px solid rgba(39,39,42,0.5)' }}
      >
        <div className="h-14 flex items-center justify-between px-5 md:hidden"
          style={{ borderBottom: '1px solid rgba(39,39,42,0.5)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center text-white text-[9px] font-bold">LP</div>
            <span className="text-white font-semibold text-sm">돌려돌려LP판</span>
          </div>
          <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <nav className="flex-1 p-3 pt-5 flex flex-col gap-0.5">
          <p className="text-zinc-700 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">메뉴</p>

          <button
            onClick={() => go('/')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
              active('/') ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            LP 탐색
            {active('/') && <span className="ml-auto w-1 h-1 rounded-full bg-rose-500" />}
          </button>

          {isLoggedIn && (
            <button
              onClick={() => go('/my')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                active('/my') ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              마이페이지
              {active('/my') && <span className="ml-auto w-1 h-1 rounded-full bg-rose-500" />}
            </button>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
