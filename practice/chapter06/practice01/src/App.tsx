import CustomFetchDemo from './components/CustomFetchDemo';
import ReactQueryDemo from './components/ReactQueryDemo';

function App() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ marginBottom: '4px' }}>React Query 알고 쓰기</h1>
      <p style={{ color: '#718096', marginBottom: '40px', fontSize: '14px' }}>
        useCustomFetch 직접 구현 vs React Query 비교
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
        }}
      >
        <CustomFetchDemo />
        <ReactQueryDemo />
      </div>
    </div>
  );
}

export default App;
