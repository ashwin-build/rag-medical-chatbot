const skeletonCards = Array.from({ length: 6 }, (_, index) => index);

const GitHubSkeleton = () => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {skeletonCards.map((card) => (
      <div
        key={card}
        className="section-card overflow-hidden p-5 animate-pulse"
      >
        <div className="h-5 w-2/3 rounded-full bg-white/10" />
        <div className="mt-4 h-4 w-full rounded-full bg-white/10" />
        <div className="mt-2 h-4 w-4/5 rounded-full bg-white/10" />
        <div className="mt-6 flex gap-3">
          <div className="h-8 w-20 rounded-full bg-white/10" />
          <div className="h-8 w-24 rounded-full bg-white/10" />
        </div>
        <div className="mt-8 h-10 rounded-2xl bg-white/10" />
      </div>
    ))}
  </div>
);

export default GitHubSkeleton;
