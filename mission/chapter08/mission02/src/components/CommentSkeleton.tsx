const CommentSkeleton = () => (
  <div className="flex gap-3 animate-pulse">
    <div className="w-7 h-7 rounded-full bg-zinc-800 flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-20 bg-zinc-800 rounded" />
      <div className="h-3 w-full bg-zinc-800 rounded" />
      <div className="h-3 w-2/3 bg-zinc-800 rounded" />
    </div>
  </div>
);

export default CommentSkeleton;
