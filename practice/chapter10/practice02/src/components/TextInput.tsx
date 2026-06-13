interface Props {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ label, value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-base">{label}</label>
      <input
        type="number"
        value={value === 0 ? '' : value}
        onChange={onChange}
        className="border border-blue-400 rounded px-3 py-1 text-base w-40 focus:outline-none"
      />
    </div>
  );
}
