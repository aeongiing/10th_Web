import { memo } from 'react';

interface Props {
  query: string;
  includeAdult: boolean;
  language: string;
  onQueryChange: (value: string) => void;
  onAdultChange: (value: boolean) => void;
  onLanguageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchForm = memo(function SearchForm({
  query,
  includeAdult,
  language,
  onQueryChange,
  onAdultChange,
  onLanguageChange,
  onSubmit,
}: Props) {
  console.log('SearchForm 렌더링');

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="영화 제목을 입력하세요"
        className="flex-1 min-w-48 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
      />

      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          checked={includeAdult}
          onChange={(e) => onAdultChange(e.target.checked)}
          className="w-4 h-4"
        />
        성인 콘텐츠 포함
      </label>

      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
      >
        <option value="ko-KR">한국어</option>
        <option value="en-US">영어</option>
        <option value="ja-JP">일본어</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium cursor-pointer"
      >
        검색
      </button>
    </form>
  );
});

export default SearchForm;
