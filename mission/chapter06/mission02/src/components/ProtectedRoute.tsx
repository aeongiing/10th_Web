import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인을 해주세요!');
      navigate('/login', { state: { from: location.pathname }, replace: true });
    }
  }, [isLoggedIn, isLoading, navigate, location]);

  if (isLoading) return null;
  if (!isLoggedIn) return null;
  return <>{children}</>;
};

export default ProtectedRoute;
