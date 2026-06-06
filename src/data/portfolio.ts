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
    github_url: "",
    technologies: "Next.js, React, TypeScript, Framer Motion, Three.js, Tailwind CSS",
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
    technologies: "React, Node.js, MongoDB, Express, Stripe API",
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
    technologies: "React, Chart.js, OpenWeather API, CSS Modules",
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
]
