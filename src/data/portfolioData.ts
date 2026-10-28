import { Project, SkillGroup, TimelineEntry, CreativeArtifact } from './types';

export const personalInfo = {
  name: 'Sharvari Potdar',
  tagline: 'Sharvari Potdar',
  subheading: 'A Digital Story of Becoming',
  headline: 'Engineering scalable web systems with computational logic and intentional design.',
  role: 'Full-Stack Developer · AI Application Builder · UI/UX Designer',
  status: 'Open to Work',
  availability: 'Seeking Entry-Level Software Engineering Roles & Summer 2026/2027 Internships',
  location: 'Kolhapur, Maharashtra, India',
  email: 'sharvarii3108@gmail.com',
  phone: '+91-9370532187',
  github: 'https://github.com/sharyuu3108',
  linkedin: 'https://www.linkedin.com/in/sharvari-potdar-a600a52aa/',
  resumePdf: '/documents/Sharvari_Potdar_Resume.pdf',
  bio: [
    "I am a Computer Science and Engineering undergraduate at KIT's College of Engineering, Kolhapur (graduating 2027, CGPA 8.59), exploring the dynamic convergence of full-stack engineering, generative AI integration, and user-centered design.",
    "My engineering philosophy operates where computational architecture meets human curiosity. Through projects like CodeSage AI and CereBro, I build complete applications from clean REST API layers and database models to interactive Monaco Editor interfaces and responsive client experiences.",
    "Beyond pure code, my leadership as Vice President of AURA Club and Design Associate at ACSES grounds my technical capabilities in real-world team coordination, visual storytelling, and intentional interface craftsmanship."
  ]
};

export const projects: Project[] = [
  {
    id: 'codesage-ai',
    title: 'CodeSage AI',
    subtitle: 'AI-Assisted Code Review, Optimization & Language Conversion',
    tagline: 'Bridging static code analysis and LLM intelligence for developer clarity.',
    category: 'ai-development',
    status: 'Completed',
    featured: true,
    overview:
      'CodeSage AI is a full-stack developer workspace combining real-time Monaco Editor code editing, automated static analysis (Pylint & ESLint), and the Google Gemini API to deliver human-readable code reviews, refactoring recommendations, and multi-language conversion.',
    problem:
      'Traditional linters output dense, cryptic error logs that fail to explain the rationale or architectural impact, while generic LLMs often propose changes without syntactic validation across different language paradigms.',
    solution:
      'Built a dedicated developer pipeline where code submitted in Python, JavaScript, Java, or C++ is analyzed via static linting engines and synthesized through Google Gemini into contextual severity breakdowns, actionable code fixes, and automated translation between programming languages.',
    highlights: [
      'Engineered React + Vite frontend integrating Microsoft Monaco Editor with customized dark themes, syntax highlighting, and live code manipulation.',
      'Developed Node.js & Express RESTful APIs executing multi-stage analysis workflows (/api/analyze, /api/optimize, /api/convert).',
      'Configured Google Gemini API backend with strict server-side key isolation and graceful client fallback handling.',
      'Constructed MongoDB Atlas persistent history layer tracking user review sessions and converted code iterations.',
      'Enabled cross-language conversion across Python, Java, JavaScript, and C++ while preserving functional intent.'
    ],
    technologies: [
      'React.js',
      'Vite',
      'Node.js',
      'Express',
      'Google Gemini API',
      'Monaco Editor',
      'MongoDB Atlas',
      'Pylint',
      'ESLint'
    ],
    metricsOrScope: [
      { label: 'Supported Languages', value: 'Python · Java · C++ · JS' },
      { label: 'Analysis Engines', value: 'Pylint · ESLint · Gemini LLM' },
      { label: 'Architecture', value: 'REST API + Cloud Database' }
    ],
    githubUrl: 'https://github.com/sharyuu3108',
    codeSnippet: {
      language: 'javascript',
      filename: 'server/controllers/analyzeController.js',
      code: `// Multi-stage code review pipeline
async function analyzeCode(req, res) {
  const { code, language } = req.body;
  
  // Step 1: Run static analysis linters (Pylint / ESLint)
  const staticFindings = await runLinter(language, code);
  
  // Step 2: Formulate prompt with static analysis findings
  const prompt = buildReviewPrompt(language, code, staticFindings);
  
  // Step 3: Stream synthesis via Google Gemini API
  const geminiResponse = await aiModel.generateContent(prompt);
  const parsedReview = formatReviewOutput(geminiResponse.text());
  
  // Step 4: Persist session trail in MongoDB Atlas
  await SessionHistory.create({ language, findings: parsedReview });
  
  return res.json(parsedReview);
}`,
      explanation: 'Server-side analysis controller combining local static diagnostics with Google Gemini generative synthesis.'
    }
  },
  {
    id: 'cerebro',
    title: 'CereBro',
    subtitle: 'Career Guidance, Skill Roadmaps & Resume Builder Platform',
    tagline: 'Personalized career exploration and skill development for engineering students.',
    category: 'fullstack-web',
    status: 'Completed',
    featured: true,
    overview:
      'CereBro is a comprehensive career guidance and learning roadmap platform engineered to help students navigate engineering specializations, track skill progression, and dynamically construct professional resumes.',
    problem:
      'Undergraduate students frequently struggle with fragmented career paths, lacking structured guidance on prerequisite skills, relevant industry roles, and unified tools to build targeted resumes.',
    solution:
      'Engineered a centralized web application featuring four core modules: interactive career path discovery, personalized milestone-driven learning roadmaps, a live customizable resume builder, and an ongoing skill progress tracker.',
    highlights: [
      'Constructed responsive client UI using React and Tailwind CSS featuring dynamic career explorer dashboards and interactive roadmap nodes.',
      'Implemented secure user authentication and authorization using Firebase Authentication.',
      'Utilized Google Cloud Firestore as the document database for real-time synchronization of user roadmaps, goals, and resume states.',
      'Built a live-preview Resume Builder allowing instantaneous PDF generation and customized section ordering.',
      'Engineered progress-tracking dashboards with persistent state management across learning milestones.'
    ],
    technologies: [
      'React.js',
      'Tailwind CSS',
      'Vite',
      'Firebase Auth',
      'Cloud Firestore',
      'React Router'
    ],
    metricsOrScope: [
      { label: 'Core Modules', value: '4 (Careers · Roadmaps · Resume · Tracker)' },
      { label: 'Auth & Data', value: 'Firebase Authentication + Firestore' },
      { label: 'Responsive Design', value: 'Mobile · Tablet · Desktop' }
    ],
    githubUrl: 'https://github.com/sharyuu3108',
    codeSnippet: {
      language: 'javascript',
      filename: 'src/services/roadmapService.js',
      code: `// Real-time Firestore roadmap subscriber
export function subscribeToUserRoadmap(userId, onUpdate) {
  const roadmapRef = doc(db, 'users', userId, 'roadmap', 'active');
  
  return onSnapshot(roadmapRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const progress = calculateProgress(data.milestones);
      onUpdate({ ...data, progress });
    }
  });
}`,
      explanation: 'Real-time synchronization hook for tracking student milestone completion in Cloud Firestore.'
    }
  },
  {
    id: 'careertrack',
    title: 'CareerTrack',
    subtitle: 'Placement & Professional Milestones Management Platform',
    tagline: 'Centralized workspace for job applications, goals, and interview preparation.',
    category: 'fullstack-web',
    status: 'In Progress',
    featured: false,
    overview:
      'CareerTrack is an active project concept centralizing recruitment cycles, job and internship application pipelines, certification deadlines, and interview readiness metrics into a unified dashboard.',
    problem:
      'Managing campus recruitment drives, off-campus internship applications, competitive programming targets, and deadline reminders across disparate spreadsheets leads to missed opportunities.',
    solution:
      'Developing a full-stack portal with RESTful endpoints, Kanban-style application stage tracking, deadline alerts, and Gemini-assisted interview preparation modules.',
    highlights: [
      'Application status lifecycle (Applied, Shortlisted, OA, Technical Round, HR, Offer).',
      'Integration with MongoDB Atlas for persistent application logging and timeline metrics.',
      'Designed responsive dashboard layouts in Figma before initiating full-stack implementation.'
    ],
    technologies: ['React.js', 'Vite', 'Node.js', 'MongoDB Atlas', 'Firebase Auth', 'Gemini API'],
    metricsOrScope: [
      { label: 'Phase', value: 'Active Architecture & Prototype' },
      { label: 'Focus', value: 'Application Pipeline & Prep Tracker' }
    ]
  },
  {
    id: 'academic-explorations',
    title: 'Academic & Hackathon Explorations',
    subtitle: 'JobSensei, TechNova & Movie Recommendation Engine',
    tagline: 'Foundational web applications and machine learning experiments.',
    category: 'academic-concept',
    status: 'Academic Exploration',
    featured: false,
    overview:
      'A collection of foundational projects exploring diverse problem spaces: JobSensei (multilingual career accessibility for Tier-2/3 students), TechNova (freelancing marketplace built with HTML/CSS/JS), and a content-based Movie Recommendation System built in Python during the CodSoft AI internship.',
    problem:
      'Exploring end-to-end software lifecycles across diverse constraints—from regional language barriers in career discovery to recommendation heuristics.',
    solution:
      'Implemented functional prototypes validating user interfaces, algorithmic data filtering, and responsive frontend architecture.',
    highlights: [
      'JobSensei: Designed multilingual accessibility workflows for Tier-2 & Tier-3 engineering students.',
      'TechNova Freelance Portal: Developed modular UI components and service order flows.',
      'Movie Recommender (Python): Implemented content-based similarity algorithms during CodSoft AI internship.'
    ],
    technologies: ['Python', 'JavaScript', 'HTML5', 'CSS3', 'Firebase', 'Data Filtering'],
    metricsOrScope: [
      { label: 'Domains', value: 'Accessibility · E-Commerce · AI/ML' },
      { label: 'Context', value: 'Academic Projects & Internship' }
    ]
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend Engineering',
    description: 'Building performant, accessible, and reactive user interfaces.',
    skills: [
      { name: 'React.js', highlighted: true, context: 'Core SPA framework for CodeSage AI & CereBro' },
      { name: 'Next.js', highlighted: true, context: 'App Router, SSR, SEO optimization' },
      { name: 'TypeScript', highlighted: true, context: 'Type-safe component architecture' },
      { name: 'JavaScript (ES6+)', highlighted: true, context: 'Asynchronous flows, DOM, Web APIs' },
      { name: 'Tailwind CSS', highlighted: true, context: 'Utility-first rapid styling in CereBro' },
      { name: 'SCSS & CSS Modules', highlighted: true, context: 'Structured design systems, BEM tokens' },
      { name: 'HTML5 & Semantic Web', context: 'Accessibility, ARIA semantics, document outlines' },
      { name: 'Vite', context: 'High-speed build tooling and dev server setup' }
    ]
  },
  {
    category: 'Backend & APIs',
    description: 'Structuring resilient REST endpoints and server-side processing.',
    skills: [
      { name: 'Node.js', highlighted: true, context: 'Runtime for CodeSage AI analysis servers' },
      { name: 'Express.js', highlighted: true, context: 'REST routing, middleware, error handling' },
      { name: 'RESTful API Design', highlighted: true, context: 'Contract design, JSON schemas, status codes' },
      { name: 'API Integration', highlighted: true, context: 'Gemini API, Firebase SDKs, static analyzers' }
    ]
  },
  {
    category: 'Databases & Authentication',
    description: 'Managing structured and document storage with secure access control.',
    skills: [
      { name: 'MongoDB Atlas', highlighted: true, context: 'NoSQL document storage, schemas, aggregation' },
      { name: 'Firebase Authentication', highlighted: true, context: 'Secure user identity and session management' },
      { name: 'Cloud Firestore', highlighted: true, context: 'Real-time NoSQL synchronization in CereBro' },
      { name: 'MySQL', context: 'Relational database schema modeling, queries, joins' },
      { name: 'PostgreSQL', context: 'Relational data integrity and ACID transactions' }
    ]
  },
  {
    category: 'Programming Languages',
    description: 'Multi-paradigm problem solving from algorithms to system scripts.',
    skills: [
      { name: 'Java', highlighted: true, context: 'Data structures, algorithms, object-oriented design' },
      { name: 'JavaScript / TypeScript', highlighted: true, context: 'Full-stack application logic' },
      { name: 'Python', highlighted: true, context: 'AI/ML scripts, CodSoft recommendation task' },
      { name: 'C++', context: 'Competitive programming, algorithmic memory models' },
      { name: 'C', context: 'Systems fundamentals, pointers, memory allocation' }
    ]
  },
  {
    category: 'AI & Computational Integration',
    description: 'Bridging modern generative models with deterministic developer tools.',
    skills: [
      { name: 'Google Gemini API', highlighted: true, context: 'Prompt engineering, code review synthesis' },
      { name: 'Generative AI Studio', highlighted: true, context: 'Certified by Google Cloud / Simplilearn' },
      { name: 'Static Code Analysis', highlighted: true, context: 'Pylint & ESLint execution pipelines' },
      { name: 'Content-Based Filtering', context: 'Recommendation mechanics in Python' }
    ]
  },
  {
    category: 'CS Fundamentals & Design',
    description: 'Foundational algorithmic thinking and intentional interface craft.',
    skills: [
      { name: 'Data Structures & Algorithms', highlighted: true, context: 'Strong foundation in Java' },
      { name: 'Object-Oriented Programming (OOP)', context: 'Inheritance, encapsulation, design patterns' },
      { name: 'Database Management Systems (DBMS)', context: 'Normalization, indexing, relational algebra' },
      { name: 'Figma', highlighted: true, context: 'Conducted 50+ student workshop, UI wireframing' },
      { name: 'UI/UX Interface Design', context: 'User flows, information hierarchy, typography' },
      { name: 'Git & GitHub', context: 'Version control, branch workflows, repo management' }
    ]
  }
];

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'kit-btech',
    type: 'education',
    title: 'Bachelor of Technology in Computer Science & Engineering',
    organization: "KIT's College of Engineering, Kolhapur",
    period: 'July 2023 – May 2027 (Expected)',
    location: 'Kolhapur, India',
    scoreOrAward: 'CGPA: 8.59',
    summary:
      'Pursuing comprehensive CSE curriculum focusing on Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Computer Networks, and Full-Stack Engineering.',
    highlight: true,
    details: [
      'Maintaining strong academic standing with current CGPA of 8.59.',
      'Active participant in technical symposiums, coding challenges, and departmental initiatives.',
      'Applying academic theory directly into practical full-stack applications like CodeSage AI and CereBro.'
    ]
  },
  {
    id: 'technostav-2026',
    type: 'achievement',
    title: 'Second Prize — Infinity Hunt (National Level)',
    organization: 'Technostav, Dr. D.Y. Patil College of Engineering, Kolhapur',
    period: '2026',
    scoreOrAward: 'National 2nd Prize Winner',
    summary:
      'Secured 2nd Prize at the prestigious national-level Infinity Hunt competition during Technostav 2026, competing against engineering teams across the country in technical problem-solving and algorithmic challenges.',
    highlight: true,
    image: '/images/sharvari-technostav.jpg',
    details: [
      'Demonstrated high-speed technical problem solving, logical deduction, and team collaboration under competitive time constraints.',
      'Earned trophy and official merit certificate.'
    ]
  },
  {
    id: 'technostav-2025',
    type: 'achievement',
    title: 'Third Prize — Infinity Hunt (National Level)',
    organization: 'Technostav, Dr. D.Y. Patil College of Engineering, Kolhapur',
    period: '2025',
    scoreOrAward: 'National 3rd Prize Winner',
    summary:
      'Achieved 3rd Prize in the national-level Infinity Hunt technical event, showcasing consistency in competitive engineering challenges.',
    details: [
      'Proven competitive problem-solving track record across consecutive national editions (2025 & 2026).'
    ]
  },
  {
    id: 'genai-cert',
    type: 'certification',
    title: 'Introduction to Generative AI Studio',
    organization: 'Simplilearn (Powered by Google Cloud Content)',
    period: 'October 2, 2026',
    credentialId: 'Certificate Code: 10826482',
    scoreOrAward: 'Google Cloud Verified',
    summary:
      'Comprehensive training in Google Cloud Generative AI Studio, covering model tuning, prompt design, multimodal APIs, and GenAI application architectures.',
    details: [
      'Directly verified against official declaration of completion.',
      'Practical foundation applied in Google Gemini API integration for CodeSage AI.'
    ]
  },
  {
    id: 'delta-cert',
    type: 'certification',
    title: 'Delta — Full Stack Web Development',
    organization: 'Apna College (Co-founder Shradha Khapra)',
    period: 'Completed Course',
    credentialId: 'Credential ID: 6abd69621fe8a32d970c4103',
    scoreOrAward: 'Official Certificate of Completion',
    summary:
      'Intensive full-stack web development program covering frontend engineering (HTML, CSS, JavaScript, React), backend (Node.js, Express), databases (MongoDB, SQL), and production deployment workflows.',
    details: [
      'Mastered core web fundamentals, asynchronous JavaScript, and RESTful client-server design.',
      'Directly verified against official certificate issued by Apna College.'
    ]
  },
  {
    id: 'aura-vp',
    type: 'leadership',
    title: 'Vice President — AURA Club',
    organization: "KIT's College of Engineering, Kolhapur",
    period: 'Active Student Leadership',
    location: 'Kolhapur, India',
    scoreOrAward: 'Core Team Leader',
    summary:
      'Leading operations, event planning, and creative initiatives for the college art and cultural society.',
    highlight: true,
    image: '/images/sharvari-aura-leadership.jpg',
    details: [
      'Led the end-to-end planning, team coordination, and curation for Kaladalan 2026, an extensive campus art exhibition.',
      'Organized and managed operations for a hands-on Figma Workshop attended by 50+ students, teaching interface design fundamentals.',
      'Coordinated across multi-disciplinary student teams to execute impactful creative and cultural events.'
    ]
  },
  {
    id: 'acses-design',
    type: 'leadership',
    title: 'Design Associate — ACSES (Departmental Association)',
    organization: 'Association of Computer Science & Engineering Students, KITCoEK',
    period: 'Departmental Leadership',
    summary:
      'Designing official digital posters, visual brand creatives, and promotional media for departmental technical workshops, hackathons, and symposiums.',
    details: [
      'Combined visual hierarchy and technical messaging to drive student engagement for departmental events.',
      'Collaborated closely with faculty coordinators and student council leads.'
    ]
  },
  {
    id: 'codsoft-intern',
    type: 'internship',
    title: 'Artificial Intelligence Virtual Intern',
    organization: 'CodSoft',
    period: 'July 15, 2024 – August 15, 2024',
    location: 'Remote',
    scoreOrAward: 'Virtual AI Internship',
    summary:
      'Completed a structured 1-month virtual internship in Artificial Intelligence, developing a content-based Movie Recommendation System in Python.',
    details: [
      'Built a recommendation pipeline filtering movies based on user preferences and content metadata.',
      'Strengthened practical Python scripting, data structures, and recommendation mechanics.'
    ]
  },
  {
    id: 'hsc-education',
    type: 'education',
    title: 'Higher Secondary Certificate (HSC — Class XII)',
    organization: 'Shri Shamrao Patil College, Talsande',
    period: '2023',
    scoreOrAward: '82.17%',
    summary: 'Higher secondary education with strong focus on Mathematics, Physics, and Chemistry.'
  },
  {
    id: 'ssc-education',
    type: 'education',
    title: 'Secondary School Certificate (SSC — Class X)',
    organization: 'Mahaveer English School',
    period: '2021',
    scoreOrAward: '100% (Perfect Score)',
    summary: 'Secondary education with distinction and a perfect academic score of 100%.'
  }
];

export const creativeArtifacts: CreativeArtifact[] = [
  {
    id: 'kaladalan-exhibition',
    title: 'Kaladalan 2026 Art Exhibition',
    category: 'Exhibition Curation & Leadership',
    role: 'Vice President, AURA Club',
    eventOrContext: 'Annual Art Exhibition at KIT College of Engineering',
    description:
      'Curated and coordinated the Kaladalan campus exhibition, spotlighting diverse artwork, traditional portraits, multi-medium paintings, and cultural installations. Oversaw space allocation, artist coordination, and exhibition walkthroughs.',
    image: '/images/kaladalan-exhibition.jpg',
    tags: ['Curation', 'Event Operations', 'Team Leadership', 'Art Exhibition']
  },
  {
    id: 'figma-workshop',
    title: 'Hands-On Figma Workshop',
    category: 'Design Mentorship & Workshop',
    role: 'Lead Organizer & Operator',
    eventOrContext: 'Conducted for 50+ Engineering Students',
    description:
      'Organized and managed operations for a practical UI/UX Figma workshop. Introduced beginner and intermediate engineering students to vector tools, auto-layout, components, typography hierarchy, and collaborative wireframing.',
    image: '/images/figma-workshop.jpg',
    tags: ['Figma', 'UI/UX Workshop', 'Mentorship', 'Auto Layout']
  }
];
