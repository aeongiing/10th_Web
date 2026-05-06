import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: Props) => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-5 gap-4"
      style={{ background: 'rgba(9,9,11,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(39,39,42,0.6)' }}
    >
      <button
        onClick={onMenuClick}
        className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
        aria-label="메뉴"
      >
        <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32" />
        </svg>
      </button>

      <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center text-white text-[10px] font-bold">LP</div>
        <span className="text-white font-semibold text-sm tracking-tight">돌려돌려LP판</span>
      </button>

      <div className="ml-auto flex items-center gap-3">
        {isLoggedIn ? (
          <>
            <span className="text-zinc-400 text-xs hidden sm:block">{user?.name}님 반갑습니다.</span>
            <button onClick={logout} className="text-zinc-500 hover:text-white text-xs transition-colors">로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="text-zinc-400 hover:text-white text-xs transition-colors">로그인</button>
            <button
              onClick={() => navigate('/signup')}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
