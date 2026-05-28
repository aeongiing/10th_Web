import type { Action } from '../App';

interface Props {
  dispatch: React.Dispatch<Action>;
}

const CounterButtons = ({ dispatch }: Props) => {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => dispatch({ type: 'increment' })}
        className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
      >
        +1
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'decrement' })}
        className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
      >
        -1
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'reset' })}
        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-500 font-semibold hover:bg-gray-100 transition-colors"
      >
        Reset
      </button>
    </div>
  );
};

export default CounterButtons;
