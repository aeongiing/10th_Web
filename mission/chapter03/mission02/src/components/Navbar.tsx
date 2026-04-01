import { NavLink } from 'react-router-dom';

const navItems = [
  { label: '홈', path: '/' },
  { label: '인기 영화', path: '/popular' },
  { label: '개봉 예정', path: '/upcoming' },
  { label: '평점 높은', path: '/top-rated' },
  { label: '상영 중', path: '/now-playing' },
];

const Navbar = () => {
  return (
    <nav className="flex gap-4 bg-gray-900 px-6 py-4">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            isActive
              ? 'font-bold text-white'
              : 'text-gray-400 hover:text-white transition-colors'
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
