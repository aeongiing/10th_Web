interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: '홈', active: true },
  { label: '내 레시피' },
  { label: '즐겨찾기' },
  { label: '장보기 목록' },
  { label: '설정' },
];

const categories = [
  { label: '한식', emoji: '🥘', count: 2 },
  { label: '양식', emoji: '🍝', count: 2 },
  { label: '일식', emoji: '🍣', count: 2 },
  { label: '중식', emoji: '🥢', count: 2 },
  { label: '디저트', emoji: '🍰', count: 1 },
];

const Sidebar = ({ isOpen, onClose }: Props) => {
  return (
    <>
      {/* 오버레이 */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 사이드바 */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col bg-white border-r border-stone-200 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-stone-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-lg">👨‍🍳</span>
            <span className="font-bold text-stone-800">Recette</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 네비게이션 */}
        <nav className="px-3 py-4 border-b border-stone-100 flex-shrink-0">
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-stone-400">메뉴</p>
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* 카테고리 */}
        <div className="px-3 py-4 flex-1 overflow-y-auto">
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-stone-400">카테고리</p>
          <div className="space-y-0.5">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
              >
                <span>{cat.emoji}</span>
                <span className="flex-1 text-left">{cat.label}</span>
                <span className="text-xs text-stone-400 tabular-nums">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 유저 */}
        <div className="px-3 py-4 border-t border-stone-100 flex-shrink-0">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-rose-300 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-800 truncate">User Name</p>
              <p className="text-xs text-stone-400 truncate">user@example.com</p>
            </div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-300 flex-shrink-0">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
