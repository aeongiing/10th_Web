import { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

function Header() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">ZOEY's App</h1>
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
      >
        {isDark ? '☀️ 라이트 모드' : '🌙 다크 모드'}
      </button>
    </header>
  );
}

function MainContent() {
  const { isDark } = useContext(ThemeContext);

  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-6 px-6 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {isDark ? '다크 모드' : '라이트 모드'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          우측 상단 버튼을 눌러 테마를 전환해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        {['카드 1', '카드 2', '카드 3'].map((title) => (
          <div
            key={title}
            className="rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              다크모드가 적용된 카드 예시입니다.
            </p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl rounded-xl p-6 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700">
        <p className="text-indigo-700 dark:text-indigo-300 text-sm font-medium">
          현재 테마: <span className="font-bold">{isDark ? 'Dark' : 'Light'}</span>
        </p>
        <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-1">
          ThemeContext의 <code className="bg-indigo-100 dark:bg-indigo-800 px-1 rounded">isDark</code> 상태가 전역으로 공유되고 있습니다.
        </p>
      </div>
    </main>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <MainContent />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
