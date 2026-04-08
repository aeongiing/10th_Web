import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950">
      <header className="flex items-center justify-between border-b border-white/10 px-8 py-4">
        <span className="text-lg font-bold tracking-tight text-white">🎬 MovieApp</span>
        <div className="flex gap-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
            >
              로그아웃
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                로그인
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-4xl font-bold text-white">
          {isLoggedIn ? '어서오세요!' : '로그인하고 시작하세요'}
        </h1>
        <p className="text-white/40">
          {isLoggedIn ? '로그인 상태입니다.' : '우측 상단 버튼을 눌러 로그인해 주세요.'}
        </p>
      </main>
    </div>
  );
};

export default HomePage;
