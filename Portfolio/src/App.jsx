import { useEffect, useMemo, useState } from "react";
import GitHubSkeleton from "./components/GitHubSkeleton";
import ProjectCard from "./components/ProjectCard";
import SectionHeading from "./components/SectionHeading";
import { education, experience, profile, skills } from "./data/portfolio";

const projectSearchFields = (repo) =>
  [repo.name, repo.description, repo.language, ...(repo.topics || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const rankRepositories = (repositories) => {
  const now = Date.now();

  return [...repositories]
    .filter((repo) => !repo.fork)
    .map((repo) => {
      const updatedDaysAgo = Math.max(
        1,
        Math.round((now - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)),
      );

      // Rank by stars first, then give a smaller boost to actively maintained repositories.
      const score = repo.stargazers_count * 5 + 240 / updatedDaysAgo;

      return { ...repo, score };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 9);
};

function App() {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRepositories() {
      setIsLoading(true);
      setError("");

      try {
        // GitHub's REST API is used here so projects stay live and never need to be hardcoded.
        const response = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Unable to fetch GitHub repositories right now.");
        }

        const data = await response.json();
        setRepositories(rankRepositories(data));
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepositories();

    return () => controller.abort();
  }, []);

  const languageOptions = useMemo(() => {
    const values = new Set(
      repositories
        .map((repo) => repo.language)
        .filter(Boolean),
    );

    return ["All", ...Array.from(values).sort()];
  }, [repositories]);

  const filteredProjects = useMemo(() => {
    return repositories.filter((repo) => {
      const matchesSearch = projectSearchFields(repo).includes(search.toLowerCase());
      const matchesLanguage = language === "All" || repo.language === language;

      return matchesSearch && matchesLanguage;
    });
  }, [repositories, search, language]);

  const stats = useMemo(() => {
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalRepos = repositories.length;
    const languages = new Set(repositories.map((repo) => repo.language).filter(Boolean)).size;

    return [
      { label: "Curated Repos", value: totalRepos },
      { label: "Total Stars", value: totalStars },
      { label: "Languages", value: languages },
    ];
  }, [repositories]);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:34px_34px] opacity-[0.08]" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="section-shell flex h-16 items-center justify-between">
          <a href="#home" className="font-display text-lg font-semibold text-white">
            Ashwin<span className="text-electric">.AI</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#skills" className="transition hover:text-white">Skills</a>
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#experience" className="transition hover:text-white">Experience</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-electric/40 bg-electric/10 px-4 py-2 text-sm font-medium text-electric transition hover:border-electric/70 hover:bg-electric/20"
          >
            LinkedIn
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="section-shell relative pt-20 pb-16 sm:pt-24 lg:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="animate-fadeUp">
              <p className="subtle-label">Data Science · ML · AI</p>
              <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
                Building futuristic data products with{" "}
                <span className="bg-gradient-to-r from-electric via-cyan-200 to-neon bg-clip-text text-transparent">
                  machine intelligence
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {profile.heroDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {profile.focusAreas.map((area) => (
                  <span key={area} className="glass-chip">
                    {area}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-full bg-gradient-to-r from-electric to-neon px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
                >
                  Explore Projects
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Contact Me
                </a>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-x-10 top-10 h-48 rounded-full bg-electric/30 blur-3xl animate-pulseGlow" />
              <div className="absolute bottom-12 right-0 h-48 w-48 rounded-full bg-neon/30 blur-3xl animate-pulseGlow" />
              <div className="section-card relative w-full max-w-xl overflow-hidden p-6 sm:p-8 animate-float">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                      Neural Profile
                    </p>
                    <p className="mt-2 font-display text-3xl font-semibold text-white">
                      {profile.name}
                    </p>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                    Online
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-400">Role</p>
                    <p className="mt-2 text-lg font-medium text-white">{profile.role}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="mt-2 text-lg font-medium text-white">{profile.location}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:col-span-2">
                    <p className="text-sm text-slate-400">Current mission</p>
                    <p className="mt-2 text-lg font-medium text-white">{profile.heroTagline}</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-2xl font-semibold text-white">{stat.value}</p>
                      <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-shell py-12 sm:py-16">
          <div className="section-card grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr]">
            <SectionHeading
              eyebrow="About Me"
              title="A learner focused on practical AI and thoughtful product building."
              description={profile.about}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Model experimentation",
                "End-to-end project building",
                "Insight-driven dashboards",
                "Clean Python workflows",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                  <p className="text-sm text-slate-400">Strength</p>
                  <p className="mt-3 text-lg font-medium text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section-shell py-12 sm:py-16">
          <SectionHeading
            eyebrow="Skill Stack"
            title="Tools and technologies I use to train, analyze, and ship."
            description="A blend of data science, AI tooling, and software engineering fundamentals for building polished, production-minded projects."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-electric/40 hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" className="section-shell py-12 sm:py-16">
          <SectionHeading
            eyebrow="Live GitHub Projects"
            title="Featured repositories pulled directly from GitHub."
            description="The project grid is generated from the GitHub API and ranked using stars plus recent activity, so the most relevant work rises to the top automatically."
          />

          <div className="mt-8 section-card p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <label htmlFor="search" className="mb-2 block text-sm font-medium text-slate-300">
                  Search projects
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name, description, language, or topic..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-electric/50"
                />
              </div>

              <div className="lg:w-64">
                <label htmlFor="language" className="mb-2 block text-sm font-medium text-slate-300">
                  Filter by language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-electric/50"
                >
                  {languageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8">
              {isLoading ? <GitHubSkeleton /> : null}

              {!isLoading && error ? (
                <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-5 text-sm text-rose-100">
                  {error} Update the GitHub username in <code>src/data/portfolio.js</code> if you
                  still have the placeholder value.
                </div>
              ) : null}

              {!isLoading && !error && filteredProjects.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                  No repositories match the current search and language filter.
                </div>
              ) : null}

              {!isLoading && !error && filteredProjects.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section id="experience" className="section-shell py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="section-card p-6 sm:p-8">
              <SectionHeading
                eyebrow="Experience"
                title="Hands-on learning with a product and experimentation mindset."
              />
              <div className="mt-8 space-y-5">
                {experience.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-electric">{item.organization}</p>
                      </div>
                      <span className="text-sm text-slate-400">{item.timeline}</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-card p-6 sm:p-8">
              <SectionHeading
                eyebrow="Education"
                title="Academic growth centered on AI, data, and intelligent systems."
              />
              <div className="mt-8 space-y-5">
                {education.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-electric">{item.organization}</p>
                      </div>
                      <span className="text-sm text-slate-400">{item.timeline}</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell py-12 pb-20 sm:py-16 sm:pb-24">
          <div className="section-card relative overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-electric/10 to-transparent" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="subtle-label">Contact</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                  Let’s collaborate on machine learning, analytics, or AI product ideas.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
                  I’m open to project collaborations, internships, learning opportunities, and
                  conversations around data science and intelligent systems.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  {profile.email}
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-gradient-to-r from-electric to-neon px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
