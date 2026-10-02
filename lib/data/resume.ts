// Content: the resume surface — experience, education and certifications.
import {
  ChartColumn,
  FlaskConical,
  GraduationCap,
  Target,
  Cloud,
  BrainCircuit,
  TrendingUp,
  FileCode2,
  type LucideIcon,
} from 'lucide-react'

export interface Experience {
  role: string
  org: string
  period: string
  color: string
  icon: LucideIcon
  /** Logo image for the card tile — falls back to the icon when absent. */
  logo?: string
  /** External link, rendered on the card as a glowing live pill. */
  link?: string
  /** Founder roles get their own group above the internships. */
  kind?: 'founder' | 'internship'
  desc: string
  skills: string[]
  achievements: string[]
  impact: { metric: string; label: string }
}

export const EXPERIENCES: Experience[] = [
  {
    role: 'Founder & Full-Stack Developer',
    org: 'BroCode — AI & Developer Learning Platform',
    period: '2026 – Present',
    color: '#3B9EFF',
    icon: GraduationCap,
    logo: '/logos/brocode.png',
    link: 'https://mybrocode.vercel.app',
    kind: 'founder',
    desc: 'I kept watching people finish courses and still not be able to build anything on their own, so I built the platform I wished existed. On BroCode you pick a roadmap, write real code in an in-browser notebook, and walk away with projects instead of just certificates. Product, frontend, APIs and the curriculum are all mine — from the first sketch to the live release.',
    skills: ['Next.js', 'Python', 'Flask APIs', 'Coding Notebook', 'Generative AI', 'Product Design'],
    achievements: [
      'Shipped the platform end to end — concept, design, frontend, APIs and content',
      'Built the in-browser coding notebook, so learners practise with zero local setup',
      'Wrote the AI & GenAI track — LLMs, prompt engineering and automation basics',
      'Turned the roadmap into a progression system that ends in shipped projects',
      'Still maintaining and growing it release by release — mybrocode.vercel.app',
    ],
    impact: { metric: 'LIVE', label: 'Platform Shipped' },
  },
  {
    role: 'Power BI Intern',
    org: 'Skill Academy',
    period: '2024',
    color: '#FF4500',
    icon: ChartColumn,
    kind: 'internship',
    desc: 'Developed interactive Power BI dashboards for business intelligence reporting. Worked on data modeling, DAX calculations, and visualization best practices.',
    skills: ['Power BI', 'DAX', 'Data Modeling', 'Visualization'],
    achievements: [
      'Built 5+ interactive dashboards for business stakeholders',
      'Reduced report generation time by 40% through DAX optimization',
      'Collaborated with cross-functional teams on data requirements',
    ],
    impact: { metric: '40%', label: 'Faster Reports' },
  },
  {
    role: 'Data Science Intern',
    org: 'Data Analytics Certification Program',
    period: '2025',
    color: '#10b981',
    icon: FlaskConical,
    kind: 'internship',
    desc: 'Applied data science methodologies including EDA, statistical analysis, and predictive modeling. Built end-to-end analytics pipelines with Python and SQL.',
    skills: ['Python', 'SQL', 'EDA', 'Predictive Modeling'],
    achievements: [
      'Developed end-to-end analytics pipeline with Python & SQL',
      'Built predictive models achieving 85%+ accuracy',
      'Created automated data cleaning and transformation workflows',
    ],
    impact: { metric: '85%', label: 'Model Accuracy' },
  },
]

export interface Education {
  degree: string
  school: string
  location: string
  period: string
  logo: string
  description: string
  highlights: string[]
  accentColor: string
}

export const EDUCATION: Education[] = [
  {
    degree: 'B.Tech — Computer Science Engineering',
    school: 'Dr. Babasaheb Ambedkar Technological University',
    location: 'Latur, Maharashtra',
    period: '2021–2025',
    logo: '/logos/dbatu.png',
    description: 'State technical university established in 2009, recognized by UGC and AICTE, offering engineering and technology programs across Maharashtra.',
    highlights: ['UGC Recognized', 'AICTE Approved', 'NAAC Accredited'],
    accentColor: '#FF4500',
  },
  {
    degree: 'HSC Science',
    school: 'BZ High School and Junior College',
    location: 'Maharashtra',
    period: '2018–2020',
    logo: '/logos/hsc-board.png',
    description: 'Higher secondary education under Maharashtra State Board with focus on Science stream.',
    highlights: ['Maharashtra Board', 'Science Stream'],
    accentColor: '#FF8C00',
  },
]

export interface Certification {
  name: string
  issuer: string
  date: string
  credentialId?: string
  url?: string
  image: string
  description: string
  accentColor: string
  /** Lucide badge icon that matches the certificate topic. */
  badgeIcon: LucideIcon
}

export const CERTIFICATIONS: Certification[] = [
  { name: 'Ace a Data Scientist Interview in 2025', issuer: 'Analytics Vidhya', date: 'Feb 2026', credentialId: '5vqcdllllu', url: 'https://courses.analyticsvidhya.com/certificates/5vqcdllllu', image: '/certificates/ace-data-scientist.jpg', description: 'Comprehensive data science interview preparation covering ML, statistics, and problem-solving.', accentColor: '#10b981', badgeIcon: Target },
  { name: 'AWS Cloud Practitioner Foundation', issuer: 'ScholarHat', date: 'Aug 2026', credentialId: 'IVLC280826', url: 'https://www.scholarhat.com/user/app/training/details/3/234330/0/certificate', image: '/certificates/aws-cloud-practitioner.jpg', description: 'AWS cloud services fundamentals including compute, storage, and networking basics.', accentColor: '#FF4500', badgeIcon: Cloud },
  { name: 'Machine Learning with Python', issuer: 'ScholarHat', date: 'Aug 2026', credentialId: 'TUMU280826', url: 'https://www.scholarhat.com/user/app/training/details/580/234332/0/certificate', image: '/certificates/machine-learning-python.jpg', description: 'Python-based ML algorithms, model training, and predictive analytics techniques.', accentColor: '#8b5cf6', badgeIcon: BrainCircuit },
  { name: 'Microsoft Power BI', issuer: 'Skill Course', date: 'Nov 2025', credentialId: 'SC-173F76BBCE', url: 'https://exam.skillcourse.in/student/view_certificate?uid=SC-173F76BBCE', image: '/certificates/microsoft-power-bi.jpg', description: 'Data visualization, DAX formulas, and interactive dashboard creation with Power BI.', accentColor: '#f59e0b', badgeIcon: ChartColumn },
  { name: 'Data Analytics Essentials', issuer: 'Cisco Networking Academy', date: 'Jan 2025', credentialId: 'netacad', url: 'https://www.netacad.com/courses/data-analytics', image: '/certificates/data-analytics-essentials.jpg', description: 'Core analytics concepts including data cleaning, transformation, and visualization.', accentColor: '#FF8C00', badgeIcon: TrendingUp },
  { name: 'Python Programming', issuer: 'Cursa', date: 'Mar 2024', credentialId: 'u5360149', image: '/certificates/python-certificate.jpg', description: 'Python programming fundamentals including variables, loops, functions, and OOP concepts.', accentColor: '#22c55e', badgeIcon: FileCode2 },
]
