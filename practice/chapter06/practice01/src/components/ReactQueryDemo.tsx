import { useState } from 'react';
import { useRQFetch } from '../hooks/useRQFetch';
import UserDisplay, { type User } from './UserDisplay';

const BASE = 'https://jsonplaceholder.typicode.com/users';

const UserCard = ({ userId }: { userId: number }) => {
  const url = userId === 0 ? `${BASE}/999999` : `${BASE}/${userId}`;
  const { data, isPending, isError } = useRQFetch<User>(url);
  return (
    <UserDisplay
      data={data ?? null}
      isPending={isPending}
      isError={isError}
      userId={userId}
    />
  );
};

const ReactQueryDemo = () => {
  const [userId, setUserId] = useState(1);
  const [visible, setVisible] = useState(true);

  const randomUser = () => setUserId(Math.floor(Math.random() * 10) + 1);
  const triggerError = () => setUserId(0);

  return (
    <section>
      <h2 style={{ marginBottom: '8px' }}>React Query useRQFetch</h2>
      <p style={{ fontSize: '13px', color: '#718096', marginBottom: '16px' }}>
        동일 기능을 React Query 선언적 API로 구현 (코드 90% 감소)
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <button onClick={randomUser}>다른 사용자 불러오기</button>
        <button onClick={() => setVisible((v) => !v)}>
          컴포넌트 토글 (언마운트 테스트)
        </button>
        <button
          onClick={triggerError}
          style={{ background: '#f6ad55', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', color: 'white' }}
        >
          재시도 테스트 (404 에러)
        </button>
      </div>
      {visible && <UserCard userId={userId} />}
      <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '12px' }}>
        DevTools 패널에서 쿼리 캐시 상태 확인
      </p>
    </section>
  );
};

export default ReactQueryDemo;
