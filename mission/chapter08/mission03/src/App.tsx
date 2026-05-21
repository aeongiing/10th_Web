import Sidebar from './components/Sidebar';
import useSidebar from './hooks/useSidebar';

type Difficulty = '쉬움' | '보통' | '어려움';

type Recipe = {
  id: number;
  name: string;
  category: string;
  time: string;
  difficulty: Difficulty;
  emoji: string;
  bg: string;
  serves: number;
};

const recipes: Recipe[] = [
  { id: 1, name: '된장찌개', category: '한식', time: '25분', difficulty: '쉬움', emoji: '🥘', bg: 'from-orange-50 to-amber-50', serves: 2 },
  { id: 2, name: '카르보나라', category: '양식', time: '20분', difficulty: '보통', emoji: '🍝', bg: 'from-yellow-50 to-orange-50', serves: 2 },
  { id: 3, name: '연어 초밥', category: '일식', time: '40분', difficulty: '어려움', emoji: '🍣', bg: 'from-red-50 to-rose-50', serves: 4 },
  { id: 4, name: '마파두부', category: '중식', time: '30분', difficulty: '보통', emoji: '🫕', bg: 'from-rose-50 to-orange-50', serves: 3 },
  { id: 5, name: '티라미수', category: '디저트', time: '60분', difficulty: '어려움', emoji: '🍰', bg: 'from-amber-50 to-yellow-50', serves: 6 },
  { id: 6, name: '비빔밥', category: '한식', time: '30분', difficulty: '쉬움', emoji: '🍱', bg: 'from-green-50 to-emerald-50', serves: 1 },
  { id: 7, name: '마르게리타 피자', category: '양식', time: '90분', difficulty: '어려움', emoji: '🍕', bg: 'from-red-50 to-orange-50', serves: 4 },
  { id: 8, name: '라멘', category: '일식', time: '45분', difficulty: '보통', emoji: '🍜', bg: 'from-amber-50 to-stone-50', serves: 2 },
  { id: 9, name: '짜장면', category: '중식', time: '35분', difficulty: '보통', emoji: '🥢', bg: 'from-stone-50 to-neutral-50', serves: 2 },
];

const difficultyStyle: Record<Difficulty, string> = {
  쉬움: 'bg-emerald-100 text-emerald-700',
  보통: 'bg-amber-100 text-amber-700',
  어려움: 'bg-rose-100 text-rose-700',
};

const stats = [
  { label: '한식', style: 'bg-orange-50 border-orange-100 text-orange-600' },
  { label: '양식', style: 'bg-sky-50 border-sky-100 text-sky-600' },
  { label: '일식', style: 'bg-rose-50 border-rose-100 text-rose-600' },
  { label: '중식', style: 'bg-amber-50 border-amber-100 text-amber-600' },
].map((s) => ({ ...s, count: recipes.filter((r) => r.category === s.label).length }));

function App() {
  const { isOpen, open, close, toggle } = useSidebar();

  return (
    <div className="min-h-screen bg-[#f9f8f6]">
      <Sidebar isOpen={isOpen} onClose={close} />

      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="메뉴"
              className="flex flex-col gap-1.5 p-2 -ml-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <span className="w-5 h-0.5 bg-stone-500 rounded block" />
              <span className="w-3 h-0.5 bg-stone-500 rounded block" />
              <span className="w-5 h-0.5 bg-stone-500 rounded block" />
            </button>
            <div className="flex items-center gap-1.5">
              <span className="text-lg">👨‍🍳</span>
              <span className="font-bold text-stone-800">Recette</span>
            </div>
          </div>
          <button
            onClick={open}
            className="h-8 px-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium transition-colors"
          >
            + 레시피 추가
          </button>
        </div>
      </header>

      {/* 메인 */}
      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* 페이지 타이틀 */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-stone-800">오늘 뭐 먹지? 🍴</h1>
          <p className="text-sm text-stone-400 mt-1">레시피 {recipes.length}개 저장됨 · ESC 또는 배경 클릭으로 사이드바 닫기</p>
        </div>

        {/* 카테고리 통계 */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-xl border p-4 ${s.style}`}>
              <p className="text-2xl font-bold">{s.count}</p>
              <p className="text-xs font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 레시피 그리드 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-stone-700">전체 레시피</h2>
          <span className="text-xs text-stone-400">최신순</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <div className={`h-28 bg-gradient-to-br ${recipe.bg} flex items-center justify-center`}>
                <span className="text-5xl group-hover:scale-110 transition-transform duration-200">{recipe.emoji}</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="font-semibold text-sm text-stone-800 leading-tight">{recipe.name}</p>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${difficultyStyle[recipe.difficulty]}`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mb-3">{recipe.category}</p>
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span>⏱ {recipe.time}</span>
                  <span>👤 {recipe.serves}인분</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
