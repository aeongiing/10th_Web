import { useNavigate, useParams } from 'react-router-dom';

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500 text-sm">Movie ID: {movieId}</p>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 cursor-pointer"
      >
        돌아가기
      </button>
    </div>
  );
}
