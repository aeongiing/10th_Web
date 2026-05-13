import { useNavigate } from 'react-router-dom';
import type { Lp } from '../types';
import { formatRelativeTime } from '../utils/time';

const LpCard = ({ lp }: { lp: Lp }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lps/${lp.id}`)}
      className="group relative aspect-square cursor-pointer overflow-hidden bg-zinc-900"
    >
      {lp.thumbnail ? (
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
          <span className="text-zinc-700 text-3xl">♪</span>
        </div>
      )}

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }}
      >
        <p className="text-white text-xs font-semibold truncate leading-snug">{lp.title}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-zinc-500 text-[10px]">{formatRelativeTime(lp.createdAt)}</span>
          <span className="text-rose-400 text-[10px]">♥ {lp.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
