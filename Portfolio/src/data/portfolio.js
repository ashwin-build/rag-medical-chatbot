const env = import.meta.env;

export const profile = {
  name: "Ashwin Kumar",
  role: "Data Science & AI Enthusiast",
  location: "India",
  focusAreas: ["Machine Learning", "Artificial Intelligence", "Data Analysis", "Python"],
  githubUsername: env.VITE_GITHUB_USERNAME || "YOUR_USERNAME",
  linkedinUrl: env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/",
  email: env.VITE_CONTACT_EMAIL || "ashwin@example.com",
  heroTagline: "Designing intelligent systems with data, code, and curiosity.",
  heroDescription:
    "I’m a student focused on machine learning, AI systems, and analytical problem solving. I enjoy building practical products that turn messy data into clear decisions, predictive models, and polished user experiences.",
  about:
    "I’m building my career at the intersection of data science, artificial intelligence, and software engineering. My work centers on Python-based experimentation, model development, analytics, and translating technical ideas into products people can actually use.",
};

export const skills = [
  "Python",
  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Data Analysis",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "TensorFlow",
  "PyTorch",
  "SQL",
  "Data Visualization",
  "Git & GitHub",
  "Jupyter",
  "Statistics",
  "API Integration",
];

export const experience = [
  {
    title: "Data Science & AI Student",
    organization: "Academic Journey",
    timeline: "Present",
    description:
      "Focused on machine learning foundations, applied AI systems, experimentation, and building a strong software engineering workflow around data products.",
  },
  {
    title: "Hands-on ML Project Builder",
    organization: "Personal & Open Source Work",
    timeline: "Ongoing",
    description:
      "Building end-to-end projects involving model pipelines, exploratory analysis, data preprocessing, and deployment-friendly frontend experiences.",
  },
];

export const education = [
  {
    title: "Student in Data Science, Machine Learning & AI",
    organization: "Current Academic Program",
    timeline: "In Progress",
    description:
      "Developing practical expertise in model training, intelligent systems, data analysis, and production-focused project design.",
  },
];
