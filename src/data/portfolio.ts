export interface Project {
  id: string
  title: string
  description: string
  live_url: string | null
  github_url: string | null
  technologies: string
  key_features: string
  image_url: string | null
  image_urls: string[]
  created_at: string
}

export interface Certificate {
  id: number
  title: string
  image_url: string | null
  created_at: string
}

export interface TechStack {
  id: number
  name: string
  logo_url: string | null
  created_at: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description: "A modern portfolio built with Next.js, featuring 3D visuals, smooth animations, and a clean design.",
    live_url: null,
    github_url: "https://github.com/skadaria/Portfolio-Website-new-.git",
    technologies: "Next.js, React",
    key_features: "3D animated background, Smooth page transitions, Responsive design, Dark theme, Interactive UI components",
    image_url: "/assets/portfolio.png",
    image_urls: [],
    created_at: "2026-01-15",
  },
  {
    id: "2",
    title: "E-Commerce App (CleckCollect)",
    description: "CleckCollect lets customers buy from multiple local traders online and collect everything in one pickup.",
    live_url: null,
    github_url: "https://github.com/skadaria/CleckCollect.git",
    technologies: "Laravel, PHP, SQL, Oracle, Apex",
    key_features: "Product catalog, Shopping cart, Payment integration, Admin dashboard, User authentication",
    image_url: "/assets/cleckcollect.png",
    image_urls: [],
    created_at: "2025-11-20",
  },
  {
    id: "3",
    title: "Bidding App (Buildbid Pro)",
    description: "A web application for councils and bidders to bid and manage tenders related to construction.",
    live_url: null,
    github_url: "https://github.com/skadaria/BuildBid-pro.git",
    technologies: "Python, Django",
    key_features: "Real-time weather data, 7-day forecast, Interactive charts, Location search, Responsive design",
    image_url: "/assets/buildbid.png",
    image_urls: [],
    created_at: "2025-09-10",
  }
]

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Frontend Development Certification",
    image_url: null,
    created_at: "2025-12-01",
  },
  {
    id: 2,
    title: "React Advanced Concepts",
    image_url: null,
    created_at: "2025-10-15",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    image_url: null,
    created_at: "2025-08-20",
  },
]

export const techStacks: TechStack[] = [
  { id: 1, name: "HTML", logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", created_at: "2025-01-01" },
  { id: 2, name: "CSS", logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", created_at: "2025-01-01" },
  { id: 3, name: "JavaScript", logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", created_at: "2025-01-01" },
  { id: 4, name: "Python", logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", created_at: "2025-01-01" },
  { id: 5, name: "PHP", logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", created_at: "2025-01-01" },
  { id: 6, name: "Django", logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", created_at: "2025-01-01" },
  { id: 7, name: "Laravel", logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", created_at: "2025-01-01" },
  { id: 8, name: "Oracle", logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", created_at: "2025-01-01" },
  { id: 9, name: "SQL", logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg", created_at: "2025-01-01" },
  { id: 10, name: "Apex", logo_url: "https://raw.githubusercontent.com/Dani3lSun/awesome-orclapex/master/apex-logo.svg", created_at: "2025-01-01" },
]

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  tags: string
  image_url: string | null
  created_at: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Web Apps with Next.js",
    excerpt: "A deep dive into server-side rendering, static generation, and the new App Router patterns.",
    content: "Next.js has evolved significantly over the years. With the introduction of the App Router, we now have a more intuitive way to build full-stack applications. Server Components allow us to reduce client-side JavaScript while keeping interactivity where it matters. The new data fetching patterns make it easier than ever to build hybrid applications that are both fast and dynamic.",
    tags: "Next.js, React, Web Dev",
    image_url: null,
    created_at: "2026-06-10",
  },
  {
    id: "2",
    title: "Why I Switched from EmailJS to Gmail SMTP",
    excerpt: "Comparing email services and why direct SMTP gave me full control over my contact form.",
    content: "EmailJS was great for quick prototyping, but I needed unlimited quota and direct inbox control. Switching to Gmail SMTP with an App Password was straightforward: set up nodemailer, add proper email validation with DNS MX lookups, and handle spam with disposable domain checks. The result is a contact form that's both reliable and secure.",
    tags: "Email, SMTP, Backend",
    image_url: null,
    created_at: "2026-06-08",
  },
  {
    id: "3",
    title: "Custom Toast Notifications with Framer Motion",
    excerpt: "Building a lightweight toast system without external libraries using React context and framer-motion.",
    content: "When I needed toast notifications for my portfolio, I decided not to reach for a library. Using React Context for state management and framer-motion for animations, I built a custom toast system with progress bars, pause-on-hover, and smooth enter/exit transitions. The result is lightweight, fully customizable, and integrates perfectly with the existing theme system.",
    tags: "React, Framer Motion, UI",
    image_url: null,
    created_at: "2026-06-05",
  },
]

export interface SiteStats {
  projects: number
  certificates: number
  completedWorks: number
  cvUrl: string
}

export const defaultStats: SiteStats = {
  projects: 4,
  certificates: 1,
  completedWorks: 4,
  cvUrl: "https://drive.google.com/file/d/1B29j43onUHFPezPAyN8okMfG1fZ6BoVK/view?usp=sharing",
}
