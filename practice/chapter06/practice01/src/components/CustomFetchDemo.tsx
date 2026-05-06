import { useState } from 'react';
import { useCustomFetch } from '../hooks/useCustomFetch';
import UserDisplay, { type User } from './UserDisplay';

const BASE = 'https://jsonplaceholder.typicode.com/users';

const UserCard = ({ userId }: { userId: number }) => {
  const url = userId === 0 ? `${BASE}/999999` : `${BASE}/${userId}`;
  const { data, isPending, isError } = useCustomFetch<User>(url);
  return (
    <UserDisplay data={data} isPending={isPending} isError={isError} userId={userId} />
  );
};

const CustomFetchDemo = () => {
  const [userId, setUserId] = useState(1);
  const [visible, setVisible] = useState(true);

  const randomUser = () => setUserId(Math.floor(Math.random() * 10) + 1);
  const triggerError = () => setUserId(0);

  return (
    <section>
      <h2 style={{ marginBottom: '8px' }}>커스텀 useCustomFetch</h2>
      <p style={{ fontSize: '13px', color: '#718096', marginBottom: '16px' }}>
        localStorage 캐싱 · AbortController · 지수 백오프 재시도 직접 구현
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <button onClick={randomUser}>다른 사용자 불러오기</button>
        <button onClick={() => setVisible((v) => !v)}>
          컴포넌트 토글 (언마운트 테스트)
        </button>
        <button onClick={triggerError} style={{ background: '#f6ad55', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', color: 'white' }}>
          재시도 테스트 (404 에러)
        </button>
      </div>
      {visible && <UserCard userId={userId} />}
      <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '12px' }}>
        콘솔에서 [Cache Hit] / [Retry] / [Fetch Cancelled] 로그 확인
      </p>
    </section>
  );
};

export default CustomFetchDemo;
