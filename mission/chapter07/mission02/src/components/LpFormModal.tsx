import { useState, useRef } from 'react';

interface LpFormData {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  initialData?: LpFormData;
  onSubmit: (data: LpFormData) => void;
  isPending: boolean;
}

const LpFormContent = ({ onClose, modalTitle, initialData, onSubmit, isPending }: Omit<Props, 'isOpen'>) => {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [thumbnail, setThumbnail] = useState<string | undefined>(initialData?.thumbnail);
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setThumbnail(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput('');
  };

  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim(), thumbnail, tags });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-4 mb-4 sm:mb-0 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <h2 className="text-white font-semibold text-sm">{modalTitle}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">제목 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="LP 제목을 입력해주세요"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-rose-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="LP에 대한 설명을 입력해주세요"
              rows={3}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-rose-500 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">사진</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 rounded-xl border border-dashed border-zinc-700 bg-zinc-800 flex items-center justify-center cursor-pointer hover:border-rose-500/50 transition overflow-hidden"
            >
              {thumbnail ? (
                <img src={thumbnail} alt="thumbnail preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-zinc-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span className="text-xs">클릭하여 사진 선택</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">태그</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); addTag(); } }}
                placeholder="태그 입력"
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-rose-500 transition"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2.5 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white text-sm transition-colors"
              >
                추가
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-zinc-800 border border-zinc-700 text-zinc-300"
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-zinc-500 hover:text-red-400 transition-colors ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pb-5 pt-3 border-t border-zinc-800">
          {tags.length === 0 && (
            <p className="text-xs text-rose-400 mb-2">태그를 최소 1개 이상 입력해주세요.</p>
          )}
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              if (!title.trim() || tags.length === 0 || isPending) return;
              handleSubmit();
            }}
            disabled={!title.trim() || tags.length === 0 || isPending}
            className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
          >
            {isPending ? '저장 중...' : modalTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

const LpFormModal = (props: Props) => {
  if (!props.isOpen) return null;

  return <LpFormContent {...props} />;
};

export default LpFormModal;
