interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Props {
  data: User | null;
  isPending: boolean;
  isError: boolean;
  userId: number;
}

const UserDisplay = ({ data, isPending, isError, userId }: Props) => {
  if (isPending) {
    return (
      <div style={{ padding: '16px', color: '#888' }}>
        Loading... (User ID: {userId})
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: '16px', color: '#e53e3e' }}>
        오류가 발생했습니다. (최대 재시도 초과)
      </div>
    );
  }

  if (!data) return null;

  return (
    <div
      style={{
        padding: '16px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        background: '#f7fafc',
      }}
    >
      <p style={{ fontSize: '11px', color: '#a0aec0', marginBottom: '4px' }}>
        User ID: {data.id}
      </p>
      <h2 style={{ margin: '0 0 4px', fontSize: '18px' }}>{data.name}</h2>
      <p style={{ margin: '0 0 2px', color: '#4a5568' }}>
        @{data.username}
      </p>
      <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>
        {data.email}
      </p>
    </div>
  );
};

export default UserDisplay;
export type { User };
