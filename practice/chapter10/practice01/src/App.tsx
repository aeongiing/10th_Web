import { useCallback, useState } from 'react';
import CountButton from './components/CountButton';
import TextInput from './components/TextInput';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-start p-8 gap-6">
      <h1 className="text-lg font-medium">같이 배우는 리액트 useCallback편</h1>
      <CountButton count={count} onClick={handleIncrement} />
      <TextInput text={text} onChange={handleChange} />
    </div>
  );
}

export default App;
