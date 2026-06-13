import { memo, useRef } from 'react';

interface Props {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = memo(function TextInput({ text, onChange }: Props) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500">
        TextInput 렌더링 횟수: {renderCount.current}
      </p>
      <p className="text-base font-medium">Text</p>
      <p className="text-base">{text}</p>
      <input
        type="text"
        value={text}
        onChange={onChange}
        className="border border-gray-300 rounded px-3 py-2 text-base w-72 focus:outline-none focus:border-gray-500"
      />
    </div>
  );
});

export default TextInput;
