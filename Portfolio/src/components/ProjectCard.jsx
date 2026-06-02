const formatDate = (dateString) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));

const ProjectCard = ({ project }) => (
  <article className="section-card group flex h-full flex-col overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-electric/40 hover:bg-white/10">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="font-display text-xl font-semibold text-white">{project.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {project.description || "No project description was provided on GitHub yet."}
        </p>
      </div>
      <div className="rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
        ⭐ {project.stargazers_count}
      </div>
    </div>

    <div className="mt-6 flex flex-wrap gap-2">
      {project.language ? <span className="glass-chip">{project.language}</span> : null}
      <span className="glass-chip">Updated {formatDate(project.updated_at)}</span>
      {project.fork ? <span className="glass-chip">Fork</span> : null}
    </div>

    <div className="mt-8 flex items-center justify-between gap-4">
      <div className="text-sm text-slate-400">
        {project.topics?.length ? project.topics.slice(0, 2).join(" · ") : "Live GitHub repository"}
      </div>
      <a
        href={project.html_url}
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl border border-electric/30 bg-electric/10 px-4 py-2 text-sm font-semibold text-electric transition hover:border-electric/60 hover:bg-electric/20"
      >
        View on GitHub
      </a>
    </div>
  </article>
);

export default ProjectCard;
