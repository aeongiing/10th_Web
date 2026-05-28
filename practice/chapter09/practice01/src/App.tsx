import { useReducer } from 'react';
import CounterButtons from './components/CounterButtons';

interface State {
  count: number;
}

export type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md px-12 py-10 flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold text-gray-800">useReducer 카운터</h1>
        <span className="text-7xl font-bold text-indigo-600">{state.count}</span>
        <CounterButtons dispatch={dispatch} />
      </div>
    </div>
  );
};

export default App;
