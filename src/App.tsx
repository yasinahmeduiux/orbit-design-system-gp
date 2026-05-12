import { useState, useEffect, useCallback, type ReactNode } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Smartphone, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Layout, 
  Accessibility, 
  Type,
  Settings2,
  Workflow,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Check,
  Orbit,
  BookOpen,
  Github,
  Gauge,
  ShieldAlert,
  FileJson,
  History,
  Trello,
  Search,
  MessageSquare,
  Users,
  Monitor,
  MousePointer2,
  Wifi,
  Tv,
  Cpu,
  Tablet
} from 'lucide-react';

// --- Components ---

const Slide = ({ children, isActive }: { children: ReactNode, isActive: boolean, key?: string | number }) => {
  return (isActive ? 
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="h-full flex flex-col pt-12 overflow-y-auto custom-scrollbar pb-20"
    >
      {children}
    </motion.div> : null
  );
};

const StaggerContainer = ({ children, delay = 0.1, className = "" }: { children: ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      hidden: {}
    }}
    className={`w-full ${className}`}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <motion.div
    className={className}
    variants={{
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      hidden: { opacity: 0, y: 20 }
    }}
  >
    {children}
  </motion.div>
);

const Badge = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <div className={`flex items-center gap-2 mb-4 shrink-0 ${className}`}>
    <span className="w-4 h-0.5 bg-brand"></span>
    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand leading-none">
      {children}
    </span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm flex gap-4 hover:border-brand/20 transition-colors group">
    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-brand transition-colors">
      <Icon size={18} />
    </div>
    <div>
      <h4 className="font-bold text-gray-900 text-sm mb-1 tracking-tight">{title}</h4>
      <p className="text-gray-500 text-[11px] leading-relaxed">{desc}</p>
    </div>
  </div>
);

// --- Content Data ---

const slideTitles = [
  "Cover & Vision",
  "Agenda",
  "Top Global Systems",
  "Orbit Design System",
  "Scale · Maintain · Review",
  "Foundation",
  "Adaptive & Responsive",
  "Component Library",
  "Future Roadmap",
  "Final Vision"
];

const componentCategories = [
  {
    title: 'General Components',
    items: [
      { n: 'Button', d: 'Primary, Secondary, Ghost, Icon, FAB, Split' },
      { n: 'Input Field', d: 'Text, Password, Number, Search, OTP' },
      { n: 'Text Area', d: 'Multi-line input with validation' },
      { n: 'Checkbox', d: 'Multi-select control' },
      { n: 'Radio Button', d: 'Single-select option' },
      { n: 'Dropdown / Select', d: 'Expandable selection menu' },
      { n: 'Switch / Toggle', d: 'On–Off interaction' },
      { n: 'Chips', d: 'Filter, Choice, Assist, Input chips' }
    ]
  },
  {
    title: 'Interaction & Feedback',
    items: [
      { n: 'Tooltip', d: 'Contextual helper information' },
      { n: 'Snackbar / Toast', d: 'Temporary feedback message' },
      { n: 'Progress Bar', d: 'Determinate & indeterminate loading' },
      { n: 'Loader / Spinner', d: 'Loading states & processing' },
      { n: 'Skeleton Loader', d: 'Placeholder loading UI' },
      { n: 'Bottom Sheet', d: 'Mobile action modal' },
      { n: 'Dialog / Popup', d: 'Confirmation & alert modal' }
    ]
  },
  {
    title: 'Navigation',
    items: [
      { n: 'Bottom Navigation', d: 'Primary mobile navigation' },
      { n: 'Top App Bar', d: 'Header navigation system' },
      { n: 'Breadcrumb', d: 'Navigation hierarchy' },
      { n: 'Side Navigation', d: 'Tablet/Desktop navigation' },
      { n: 'Mega Menu', d: 'Large navigation menu' },
      { n: 'Pagination', d: 'Large dataset navigation' }
    ]
  },
  {
    title: 'Telecom-Specific',
    items: [
      { n: 'Recharge Card', d: 'Recharge amount selection' },
      { n: 'SIM Status Card', d: 'Active/Suspended SIM state' },
      { n: 'Usage Meter', d: 'Data/minute/SMS usage visualization' },
      { n: 'Network Signal', d: 'Signal quality feedback' },
      { n: 'Balance Card', d: 'Remaining balance display' },
      { n: 'Offer Card', d: 'Package & offer promotion' }
    ]
  },
  {
    title: 'Enterprise & Data',
    items: [
      { n: 'Data Table', d: 'Enterprise data visualization' },
      { n: 'Analytics Card', d: 'KPI & metrics display' },
      { n: 'Chart Components', d: 'Graphs & statistics' },
      { n: 'Filter Panel', d: 'Advanced filtering system' },
      { n: 'Search & Sort', d: 'Enterprise data discovery' },
      { n: 'User Management', d: 'Role & permission management' }
    ]
  },
  {
    title: 'Security & Auth',
    items: [
      { n: 'Login Form', d: 'Secure authentication' },
      { n: 'OTP Verification', d: 'SMS verification flow' },
      { n: 'Biometric Login', d: 'Face ID / Fingerprint' },
      { n: 'PIN Input', d: 'Secure code entry' },
      { n: '2FA', d: 'Extra account security' }
    ]
  }
];

const systemStatusStates = [
  { s: 'Success State', p: 'Transaction completed successfully' },
  { s: 'Error State', p: 'Generic error handling' },
  { s: 'No Internet', p: 'Offline / network failure' },
  { s: 'Server Error', p: 'Backend/server unavailable' },
  { s: 'Payment Failure', p: 'Payment unsuccessful' },
  { s: 'Session Timeout', p: 'User session expired' },
  { s: 'SIM Error', p: 'SIM detection / telecom issue' },
  { s: 'Empty State', p: 'No content available' },
  { s: 'Maintenance', p: 'System temporarily unavailable' },
  { s: 'App Update', p: 'Force update experience' }
];

const componentArchitecture = [
  { l: 'Atoms', d: 'Buttons · Icons · Labels · Inputs · Dividers · Toggles' },
  { l: 'Molecules', d: 'Search Bar · Form Group · Card Header · Chips Group · Snackbar' },
  { l: 'Organisms', d: 'Navbar · Dashboard · Recharge Flow · Offer Catalog · Payment Sheet' },
  { l: 'Patterns', d: 'Login Flow · Recharge Flow · Empty States · Success States · Error Recovery' }
];

const SystemCard = ({ name, tags, desc, score, color }: { name: string, tags: string, desc: string, score: number, color: string }) => (
  <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col h-full hover:border-brand/20 transition-all group relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
    <div className="flex justify-between items-start mb-4">
      <h4 className="font-black text-gray-900 text-sm tracking-tight">{name}</h4>
      <div className="w-10 h-10 border border-gray-100 rounded flex items-center justify-center bg-gray-50/50">
        <span className="text-[10px] font-black text-gray-400 group-hover:text-brand transition-colors">{score}</span>
      </div>
    </div>
    <div className="mb-4">
      <p className="text-brand text-[9px] font-black uppercase tracking-widest">{tags}</p>
    </div>
    <p className="text-gray-500 text-[10px] font-medium leading-relaxed mt-auto">
      {desc}
    </p>
  </div>
);

const systemsDetailData = [
  {
    name: "Apple Human Interface Guidelines",
    tags: "Accessibility · UX Thinking · Motion · Platform Consistency",
    worldClass: [
      "Industry-leading accessibility standards",
      "Human-centered interaction design",
      "Native platform behavior & motion clarity",
      "Exceptional visual hierarchy and spacing",
      "Premium touch-first experience"
    ],
    learns: [
      "Better readability for all users",
      "Cleaner mobile interactions",
      "Inclusive design for Bangladesh’s diverse audience",
      "Premium telecom experience with simplicity"
    ],
    application: [
      "MyGP mobile usability",
      "Accessibility-first component system",
      "Motion & gesture consistency",
      "Touch optimization for all age groups"
    ]
  },
  {
    name: "Google Material Design 3",
    tags: "Mobile-First · Dynamic Color · Adaptive UI · Scalable Architecture",
    worldClass: [
      "Most scalable Android design framework",
      "Dynamic color token system",
      "Responsive adaptive layouts",
      "Production-ready component architecture",
      "Strong accessibility and motion standards"
    ],
    learns: [
      "Token-driven scalable architecture",
      "Faster product development cycles",
      "Consistent Android ecosystem experience",
      "Better responsive behavior across devices"
    ],
    application: [
      "MyGP Android ecosystem",
      "Telecom mobile architecture",
      "Responsive layout system",
      "Token-first scalable UI foundation"
    ],
    quote: "Material Design remains one of the strongest mobile-first systems globally."
  },
  {
    name: "CRED Design System",
    tags: "Fintech Premium · Trust Signals · Emotional Micro-Interactions",
    worldClass: [
      "Premium fintech aesthetics",
      "Emotional motion system",
      "Exceptional dark mode experience",
      "Trust-building interaction design",
      "High-end visual storytelling"
    ],
    learns: [
      "Emotional product experience",
      "Premium fintech perception",
      "Trust-driven UI architecture",
      "Micro-interactions that increase engagement"
    ],
    application: [
      "GP Wallet ecosystem",
      "Recharge & payment journeys",
      "Rewards & loyalty products",
      "Subscription experience"
    ],
    quote: "Emotion-driven design increases retention and trust in financial products."
  },
  {
    name: "Wise Design System",
    tags: "Typography · Readability · Financial Clarity · Global UX",
    worldClass: [
      "Extremely readable typography system",
      "Clean financial information architecture",
      "Inter font optimization",
      "Minimal but scalable layouts",
      "International accessibility support"
    ],
    learns: [
      "Better Bangla + English readability",
      "Financial data clarity",
      "Cleaner dashboard structures",
      "Simplified telecom information display"
    ],
    application: [
      "Usage dashboards",
      "Billing & recharge systems",
      "Financial summaries",
      "Enterprise reporting"
    ],
    quote: "Inter typography is widely recognized for scalable digital readability."
  },
  {
    name: "IBM Carbon Design System",
    tags: "Enterprise Governance · Documentation · Accessibility · Tokens",
    worldClass: [
      "One of the strongest enterprise design systems",
      "Best-in-class documentation maturity",
      "Strict governance & contribution models",
      "Accessibility-focused architecture",
      "Multi-framework implementation support"
    ],
    learns: [
      "Enterprise-grade DesignOps",
      "Governance workflows",
      "Documentation standards",
      "Scalable component maintenance"
    ],
    application: [
      "Cockpit 360",
      "Internal telecom systems",
      "Zeroheight documentation structure",
      "Enterprise dashboard ecosystem"
    ],
    quote: "Carbon is considered one of the most mature enterprise design systems globally."
  },
  {
    name: "Ant Design System",
    tags: "Enterprise Components · Forms · Data Tables · Dashboard UX",
    worldClass: [
      "Excellent enterprise component architecture",
      "Advanced form & table systems",
      "Complex workflow support",
      "Strong developer integration",
      "Production-ready React ecosystem"
    ],
    learns: [
      "Dashboard scalability",
      "Data-heavy interface optimization",
      "Enterprise workflow patterns",
      "Faster internal tool development"
    ],
    application: [
      "Admin portals",
      "Cockpit 360 dashboards",
      "Enterprise forms",
      "Internal operational systems"
    ],
    quote: "Ant Design is highly respected for enterprise dashboard and admin experiences."
  },
  {
    name: "Uber Base Design System",
    tags: "Multi-Brand · Cross-Platform · Token Architecture · Scale",
    worldClass: [
      "Massive scalability architecture",
      "Token-first ecosystem",
      "Cross-platform consistency",
      "Shared component libraries",
      "Multi-team collaboration system"
    ],
    learns: [
      "Faster cross-team scaling",
      "Unified web + mobile architecture",
      "Shared libraries across products",
      "Better engineering collaboration"
    ],
    application: [
      "Multi-product telecom ecosystem",
      "Shared tokens across GP platforms",
      "Cross-platform consistency",
      "Faster deployment cycles"
    ],
    quote: "Uber Base demonstrates how large-scale systems unify multiple teams and products."
  },
  {
    name: "Salesforce Lightning Design System",
    tags: "Enterprise Workflows · Data UX · Operational Systems",
    worldClass: [
      "Enterprise workflow optimization",
      "Advanced form validation patterns",
      "CRM-focused dashboard architecture",
      "Trust-driven operational UX"
    ],
    learns: [
      "Better operational systems",
      "Enterprise data visualization",
      "Internal workflow optimization",
      "High-volume admin usability"
    ],
    application: [
      "CRM interfaces",
      "Internal telecom operations",
      "Customer service dashboards",
      "Enterprise management systems"
    ]
  },
  {
    name: "Airbnb Design Language System",
    tags: "Human Emotion · Storytelling · Warm UX · Trust",
    worldClass: [
      "Emotion-led product experience",
      "Human-centered storytelling",
      "Warm interaction design",
      "Trust-focused photography & visuals",
      "Community-first UX strategy"
    ],
    learns: [
      "Human emotional connection",
      "Customer trust & retention",
      "Better onboarding experience",
      "Loyalty-focused product storytelling"
    ],
    application: [
      "Customer engagement journeys",
      "Rewards & loyalty ecosystem",
      "Personalized experiences",
      "Telecom storytelling strategy"
    ],
    quote: "Emotion-led design significantly improves customer engagement and loyalty."
  }
];

const ecosystemStack = [
  { cat: 'Design System', plat: 'Figma', purp: 'Components, variables, libraries, collaboration', i: Layers },
  { cat: 'Documentation', plat: 'Zeroheight', purp: 'Living documentation & usage guidelines', i: BookOpen },
  { cat: 'Token Management', plat: 'Tokens Studio', purp: 'Token synchronization & theming', i: FileJson },
  { cat: 'Engineering', plat: 'GitHub', purp: 'Code versioning & pull requests', i: Github },
  { cat: 'UI Development', plat: 'Storybook', purp: 'Production-ready UI components', i: Layout },
  { cat: 'Project Management', plat: 'Jira', purp: 'Sprint planning & issue tracking', i: Trello },
  { cat: 'Accessibility QA', plat: 'Stark', purp: 'WCAG accessibility validation', i: Accessibility }
];

const maintenanceWorkflow = [
  {
    step: 'STEP 1 — PROPOSE',
    goal: 'Enable product teams to continuously improve the system through structured contributions.',
    details: [
      { t: 'Contribution Types', d: 'New UI components, Token updates, Accessibility improvements, UX enhancements, Motion patterns, Responsive behavior improvements.' },
      { t: 'Real Workflow', d: 'UX Designer Creates RFC (Request for Change), Use-case documentation, Edge-case analysis, Interaction behavior, Responsive examples, Accessibility considerations.' },
      { t: 'Figma Collaboration', d: 'Proposal workspace, Component playground, Branch-based experimentation, Team comments & reviews, Version tracking.' }
    ],
    roles: [
      { r: 'UX Designer', d: 'Create proposals & UX flows' },
      { r: 'DS Core Team', d: 'Ensure consistency & scalability' },
      { r: 'UX Researchers', d: 'Validate usability & user impact' },
      { r: 'Product Managers', d: 'Define business priority' },
      { r: 'Engineers', d: 'Validate technical feasibility' }
    ]
  },
  {
    step: 'STEP 2 — DESIGN REVIEW',
    goal: 'Ensure every component meets enterprise-grade standards before development begins.',
    details: [
      { t: 'Accessibility', d: 'WCAG 2.2 AA compliance, Keyboard navigation, Screen reader compatibility, Color contrast validation.' },
      { t: 'Consistency', d: 'Token usage, Typography hierarchy, Spacing system, Grid alignment.' },
      { t: 'Scalability', d: 'Multi-platform support, Responsive behavior, Variant architecture, Reusability across all GP products.' },
      { t: 'Brand Alignment', d: 'GP visual language, Tone consistency, Interaction quality, Premium telecom experience.' }
    ],
    roles: [
      { r: 'Head of Design System', d: 'Final approval & governance' },
      { r: 'Senior Designers', d: 'UX consistency review' },
      { r: 'Accessibility Lead', d: 'WCAG validation' },
      { r: 'Motion Designer', d: 'Motion & interaction review' },
      { r: 'Frontend Engineers', d: 'Technical feasibility review' }
    ]
  },
  {
    step: 'STEP 3 — BUILD & TEST',
    goal: 'Transform design specifications into scalable production-ready components.',
    details: [
      { t: 'Technology Integration', d: 'Figma Variables → Design Tokens → Code Components → Storybook → Production Applications.' },
      { t: 'Design Layer', d: 'Figma Variables, Design Tokens, Component APIs.' },
      { t: 'Engineering Layer', d: 'React Components, Flutter Components, CSS Variables, Token JSON synchronization.' },
      { t: 'Documentation Layer', d: 'Storybook integration, Zeroheight publishing, Code guidelines.' }
    ],
    roles: [
      { r: 'Frontend Engineers', d: 'Build reusable components' },
      { r: 'QA Engineers', d: 'Validate all states & variants' },
      { r: 'Accessibility QA', d: 'Screen reader & keyboard testing' },
      { r: 'Product Teams', d: 'Product-level implementation' },
      { r: 'DesignOps Team', d: 'Maintain system integrity' }
    ]
  },
  {
    step: 'STEP 4 — QA & AUDIT',
    goal: 'Maintain quality, accessibility, and consistency across all GP products.',
    details: [
      { t: 'Quality Assurance', d: 'Visual QA, Layout consistency, Token verification, Responsive behavior.' },
      { t: 'Accessibility QA', d: 'WCAG audits, Focus visibility, Contrast validation, Keyboard interaction testing.' },
      { t: 'Motion QA', d: 'Animation duration, Reduced motion support, Transition consistency.' },
      { t: 'Audit Types', d: 'Visual Regression, Accessibility Audit, Token Audit, Component Audit, Cross-Product Audit.' }
    ]
  },
  {
    step: 'STEP 5 — PUBLISH',
    goal: 'Release stable, versioned design system updates to all teams.',
    details: [
      { t: 'Figma', d: 'Updated component library, Published variables, New variants.' },
      { t: 'Documentation', d: 'Usage guidelines, Do & Don’t examples, Accessibility notes, Release changelog.' },
      { t: 'Engineering', d: 'Storybook deployment, Token sync, Version tagging, Package release.' }
    ],
    summary: 'Figma Library → Tokens Studio → GitHub → Storybook → Product Teams → Production Apps'
  }
];

const foundationData = [
  { id: 1, category: 'Foundation', element: 'Typography Scale', desc: 'Display → Caption · Inter + Noto Sans Bengali · Line-height tokens', deadline: 'May 3, 2026', status: 'Done', notes: 'Create text styles, define scale (12–64), use variables' },
  { id: 2, category: 'Foundation', element: 'Color System', desc: 'Primary · Secondary · Semantic · Brand · Surface · On-Surface', deadline: 'May 11, 2026', status: 'Done', notes: 'Create color styles + variables (light/dark ready)' },
  { id: 3, category: 'Foundation', element: 'Spacing System', desc: '4pt Base Grid · 4-8-12-16-24-32-48-64px · Component spacing', deadline: 'May 3, 2026', status: 'Done', notes: 'Define spacing tokens, apply auto layout spacing' },
  { id: 4, category: 'Foundation', element: 'Grid & Layout', desc: '12-col desktop · 4-col mobile · Margin · Gutter · Column tokens', deadline: 'May 3, 2026', status: 'Done', notes: 'Setup layout grids (columns, margins) in Figma frames' },
  { id: 5, category: 'Foundation', element: 'Border Radius', desc: 'xs:4 · sm:8 · md:12 · lg:16 · xl:24 · pill:999 · none:0', deadline: 'May 3, 2026', status: 'Done', notes: 'Define radius tokens and reusable corner variables' },
  { id: 6, category: 'Foundation', element: 'Elevation & Shadow', desc: '6 elevation levels · Ambient + Key light · Dark mode shadow', deadline: 'May 15, 2026', status: 'In Progress', notes: 'Create shadow styles (low, medium, high elevation)' },
  { id: 7, category: 'Foundation', element: 'Motion Tokens', desc: 'Duration: 100-500ms · Easing curves · Spring configs', deadline: 'May 31, 2026', status: 'Not Started', notes: 'Define motion duration, easing, animation principles documentation' },
  { id: 8, category: 'Foundation', element: 'Size System', desc: 'Component sizing scale for height, width & spacing', deadline: 'May 6, 2026', status: 'Done', notes: 'Create size tokens and adaptive sizing variables' },
  { id: 9, category: 'Foundation', element: 'Icon System', desc: '24px grid · 2px stroke · Filled & Outlined · 200+ icons', deadline: 'May 10, 2026', status: 'Done', notes: 'Create icon components using consistent 24px grid system' }
];

// --- Main App ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slideTitles.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="h-screen w-full bg-white flex flex-col font-sans overflow-hidden text-black select-none">
      
      {/* Top Navbar */}
      <nav className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[#333333] font-bold text-2xl tracking-tighter" style={{ fontFamily: 'Inter, sans-serif' }}>Grameenphone</span>
          </div>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <span className="font-bold tracking-tight text-sm uppercase text-gray-400 mt-0.5">Orbit Design System</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          <span className="text-black border-b-2 border-brand py-5">Presentation</span>
        </div>
        
        <div className="flex items-center gap-4">
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Index */}
        <aside className="w-72 border-r border-gray-100 bg-gray-50/50 flex flex-col p-8 gap-2 shrink-0 overflow-hidden">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Presentation Index</p>
          <div className="space-y-1.5 overflow-y-auto flex-1 pr-2">
            {slideTitles.map((title, i) => (
              <button 
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all text-left group ${
                  currentSlide === i 
                    ? "bg-white shadow-sm border-gray-200 opacity-100" 
                    : "border-transparent opacity-40 hover:opacity-100"
                }`}
              >
                <span className={`text-[10px] font-mono font-bold ${currentSlide === i ? 'text-brand' : 'text-gray-400'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`text-xs font-bold truncate ${currentSlide === i ? 'text-black' : 'text-gray-700'}`}>
                  {title}
                </span>
              </button>
            ))}
          </div>
          
          <div className="mt-auto border-t border-gray-200 pt-8 mt-4 shrink-0">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-[10px] font-bold text-gray-400 tracking-widest">
                <span>PROGRESS</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative bg-surface overflow-hidden geometric-bg">
          <div className="max-w-6xl mx-auto h-full px-12 relative flex flex-col">
            <AnimatePresence mode="wait">
          {/* Slide 1: Cover */}
          <Slide key={0} isActive={currentSlide === 0}>
            <StaggerContainer className="h-full flex flex-col">
              <StaggerItem>
                <div className="flex items-center gap-4 mb-8">
                  <Badge className="mb-0">Orbit Design System</Badge>
                </div>
                <h1 className="text-6xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tighter">
                  Building the <br />
                  <span className="text-brand">Future of GP.</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-xl font-medium leading-relaxed mb-12">
                  Scaling digital ecosystems for 85M users through an atomic governance model.
                </p>
              </StaggerItem>
              <StaggerItem className="flex-1 flex flex-col justify-end pb-8">
                 <div className="mb-6">
                   <p className="text-[10px] font-black text-brand uppercase tracking-[0.3em] mb-4">Product Ecosystem</p>
                   <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                      {[ 
                        'MyGP 6.0', 'Smart IVR', 'Skill HUB', 'Payroll', 'One GP', 
                        'GP Cloud', 'Web Next', 'Cockpit 360', 'Bioscope'
                      ].map((app, i) => (
                        <div key={i} className="px-3 py-2 rounded-lg border border-gray-100 bg-white shadow-sm text-[10px] font-bold text-gray-600 truncate">
                          {app}
                        </div>
                      ))}
                   </div>
                 </div>
              </StaggerItem>
            </StaggerContainer>
          </Slide>

          {/* Slide 2: Agenda */}
          <Slide key={1} isActive={currentSlide === 1}>
            <StaggerContainer>
              <StaggerItem>
                <Badge>Agenda</Badge>
                <h2 className="text-5xl font-black mb-2">What We’ll Cover Today.</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-10">Building a scalable telecom ecosystem</p>
              </StaggerItem>
              <StaggerItem className="flex-1">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 pb-12">
                  {[
                    { n: '01', t: 'Top Global Design Systems We Follow', d: 'Scalable telecom ecosystem inspiration.' },
                    { n: '02', t: 'Orbit Design System', d: 'Philosophy, architecture, and systems thinking.' },
                    { n: '03', t: 'Scale · Maintain · Review', d: 'Governance, quality gates, and workflow.' },
                    { n: '04', t: 'Foundation', d: 'Typography, Color, Spacing, Iconography, and more.' },
                    { n: '05', t: 'Adaptive & Responsive System', d: 'Breakpoints and cross-platform scaling.' },
                    { n: '06', t: 'Component Library', d: 'Massive ecosystem of reusable widgets.' },
                    { n: '07', t: 'Future Roadmap', d: 'Project timeline and upcoming milestones.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <span className="text-brand font-black text-xs mt-1 shrink-0">
                        {item.n}
                      </span>
                      <div>
                        <h4 className="font-black text-gray-900 text-sm tracking-tight group-hover:text-brand transition-colors">{item.t}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </StaggerItem>
            </StaggerContainer>
          </Slide>

          {/* Slide 3: Top Global Systems (Item 01) */}
          <Slide key={2} isActive={currentSlide === 2}>
            <StaggerContainer>
              <StaggerItem>
                <Badge>01 · Inspiration</Badge>
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  Top Global Design Systems <br />We Follow.
                </h2>
                <p className="text-sm text-gray-500 font-bold max-w-3xl mb-8 leading-relaxed">
                  Building a scalable telecom ecosystem inspired by the world’s best design systems to ensure consistency and speed across 85M+ users.
                </p>
                <blockquote className="text-lg text-gray-400 font-bold mb-10 border-l-4 border-brand pl-6 italic">
                  “We do not copy any system. We learn the best principles from each.”
                </blockquote>
              </StaggerItem>
              <StaggerItem className="flex-1 pb-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SystemCard 
                    name="Apple HIG" 
                    tags="Accessibility · UX Thinking · Color Smoothing" 
                    desc="Accessibility rules, human-centered design principles, contrast & visual hierarchy" 
                    score={92} 
                    color="bg-gray-400" 
                  />
                  <SystemCard 
                    name="Material 3" 
                    tags="Mobile-First · Expressive · Dynamic Color" 
                    desc="Best mobile component architecture. Dynamic theming, adaptive layouts, motion spec" 
                    score={95} 
                    color="bg-blue-500" 
                  />
                  <SystemCard 
                    name="CRED" 
                    tags="Fintech Premium · Dark Mode · Trust" 
                    desc="Fintech-oriented premium feel. Dark UI excellence, micro-animation delight, trust signals" 
                    score={88} 
                    color="bg-orange-400" 
                  />
                  <SystemCard 
                    name="Wise" 
                    tags="Inter Typography · Global · Clean" 
                    desc="Global fintech clarity. Inter as primary typeface, consistent tone, multi-currency UX" 
                    score={85} 
                    color="bg-emerald-500" 
                  />
                  <SystemCard 
                    name="IBM Carbon" 
                    tags="Rules · Docs · Enterprise" 
                    desc="Strictest governance. Best-in-class documentation, contribution model, tokens structure" 
                    score={90} 
                    color="bg-blue-600" 
                  />
                  <SystemCard 
                    name="Ant Design" 
                    tags="Button Structure · Form · Enterprise" 
                    desc="Most complete component API. Button variants, form architecture, table patterns" 
                    score={87} 
                    color="bg-red-500" 
                  />
                  <SystemCard 
                    name="Uber Base" 
                    tags="Mobile-First · Scalable · Multi-Brand" 
                    desc="Best for scalable mobile apps. Multi-brand theming, Base Web for consistency at scale" 
                    score={93} 
                    color="bg-gray-900" 
                  />
                  <SystemCard 
                    name="Salesforce Lightning" 
                    tags="Enterprise · Trustworthy · Data-Heavy" 
                    desc="Enterprise data tables, form validation patterns, admin UX best practices" 
                    score={82} 
                    color="bg-blue-400" 
                  />
                  <SystemCard 
                    name="Airbnb" 
                    tags="Emotion · Human · Storytelling" 
                    desc="Emotional design language, human photography guidelines, warmth & trust in UI" 
                    score={89} 
                    color="bg-rose-500" 
                  />
                </div>

                {/* Detailed Breakdown Section */}
                <div className="mt-32 space-y-32">
                  {systemsDetailData.map((system) => (
                    <div key={system.name} className="relative">
                      <div className="mb-12">
                        <Badge className="mb-4">System Analysis</Badge>
                        <h3 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
                          {system.name}
                        </h3>
                        <p className="text-brand text-xs font-black uppercase tracking-widest">
                          {system.tags}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">
                            What Makes It World-Class
                          </h4>
                          <ul className="space-y-4">
                            {system.worldClass.map((point, i) => (
                              <li key={i} className="text-sm font-medium text-gray-600 flex gap-3 leading-relaxed">
                                <span className="text-brand mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">
                            What GP Learns
                          </h4>
                          <ul className="space-y-4">
                            {system.learns.map((point, i) => (
                              <li key={i} className="text-sm font-medium text-gray-600 flex gap-3 leading-relaxed">
                                <span className="text-brand mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">
                            GP Application
                          </h4>
                          <ul className="space-y-4">
                            {system.application.map((point, i) => (
                              <li key={i} className="text-sm font-medium text-gray-600 flex gap-3 leading-relaxed">
                                <span className="text-brand mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {system.quote && (
                        <div className="mt-12 p-6 bg-gray-50 rounded-2xl border-l-4 border-brand">
                          <p className="text-sm text-gray-500 font-bold italic leading-relaxed">
                            “{system.quote}”
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Why This Matters Section */}
                <div className="mt-40 pt-20 border-t border-gray-100">
                  <div className="max-w-2xl">
                    <h3 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
                      Why This Matters for <br />Grameenphone
                    </h3>
                    <p className="text-lg text-gray-500 font-medium mb-12 leading-relaxed">
                      The Orbit Design System is not just a UI library. It is the connective tissue of our digital ecosystem.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "A scalable telecom infrastructure",
                      "A shared product language",
                      "A governance framework",
                      "An accessibility-first ecosystem",
                      "A faster design-to-development pipeline",
                      "A foundation for AI-ready products"
                    ].map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                          <Check size={16} />
                        </div>
                        <span className="text-sm font-black text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Orbit Design Philosophy Table */}
                <div className="mt-40 pb-20">
                  <h3 className="text-3xl font-black mb-12">The Orbit Design Philosophy</h3>
                  <div className="overflow-x-auto rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Global System</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">What We Learn</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">GP Outcome</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {[
                          { s: 'Apple HIG', l: 'Accessibility & UX thinking', o: 'Premium usability' },
                          { s: 'Material 3', l: 'Mobile scalability', o: 'Faster Android ecosystem' },
                          { s: 'CRED', l: 'Fintech emotional design', o: 'Trust-driven GP Wallet' },
                          { s: 'Wise', l: 'Typography clarity', o: 'Better bilingual readability' },
                          { s: 'IBM Carbon', l: 'Governance & documentation', o: 'Enterprise DesignOps' },
                          { s: 'Ant Design', l: 'Enterprise architecture', o: 'Better dashboards' },
                          { s: 'Uber Base', l: 'Token scalability', o: 'Shared component ecosystem' },
                          { s: 'Salesforce', l: 'Operational workflows', o: 'Internal telecom systems' },
                          { s: 'Airbnb', l: 'Emotion & storytelling', o: 'Customer retention' }
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-8 py-6 font-black text-sm text-gray-900">{row.s}</td>
                            <td className="px-8 py-6 font-medium text-xs text-gray-500">{row.l}</td>
                            <td className="px-8 py-6">
                              <span className="px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest rounded-full">
                                {row.o}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </Slide>

          {/* Slide 4: Orbit Design System (Item 02) */}
          <Slide key={3} isActive={currentSlide === 3}>
            <StaggerContainer>
              <StaggerItem>
                <Badge>02 · System Identity</Badge>
                <h2 className="text-6xl font-black mb-8 leading-tight tracking-tighter">
                  Orbit Design <br />
                  <span className="text-brand">System.</span>
                </h2>
                <p className="text-xl text-gray-500 font-bold max-w-2xl mb-10 leading-relaxed">
                  Orbit Design System is a scalable, enterprise-grade design ecosystem built to unify all Grameenphone digital products under one consistent experience.
                </p>
                <blockquote className="text-xl text-gray-400 font-bold leading-relaxed border-l-4 border-brand pl-8 mb-16 italic">
                  “Orbit connects every GP product, team, and platform through one scalable design language.”
                </blockquote>
              </StaggerItem>

              <StaggerItem className="space-y-32">
                {/* Orbit is... list */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-black mb-8">Orbit is:</h3>
                    <div className="space-y-4">
                      {[
                        "A shared design language",
                        "A scalable component ecosystem",
                        "A governance framework",
                        "A token-driven infrastructure",
                        "A collaboration system",
                        "A foundation for AI-ready products"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                          <div className="w-8 h-8 rounded-full bg-brand/5 border border-brand/20 flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
                            <Check size={14} />
                          </div>
                          <span className="text-sm font-bold text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 relative overflow-hidden group">
                    <History size={120} className="absolute -right-8 -bottom-8 text-gray-200 opacity-20 group-hover:rotate-12 transition-transform duration-700" />
                    <h4 className="text-brand font-black text-xs uppercase tracking-widest mb-4">Why the Name?</h4>
                    <h3 className="text-3xl font-black mb-6">“Orbit”</h3>
                    <p className="text-xs text-gray-500 font-medium leading-[1.8] mb-6">
                      Connection. Consistency. Movement. Scalability. Just like planets orbit around one center, 
                      all GP products orbit around one unified design foundation.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-[10px] font-black uppercase text-gray-400">Center of Consistency</span>
                      <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-[10px] font-black uppercase text-gray-400">Source of Truth</span>
                    </div>
                  </div>
                </div>

                {/* Orbit Design Philosophy */}
                <div>
                  <div className="mb-12">
                    <Badge>Guiding Principles</Badge>
                    <h3 className="text-4xl font-black tracking-tighter">Orbit Design Philosophy</h3>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { 
                        t: '1. Human-Centered', 
                        d: 'Built for real people across Bangladesh.', 
                        f: ['Accessibility', 'Readability', 'Simplicity', 'Trust', 'Inclusive UX'],
                        i: Heart
                      },
                      { 
                        t: '2. Scalable by Default', 
                        d: 'Designed to support 85M+ subscribers and future platforms.', 
                        f: ['Multiple apps', 'Enterprise dashboards', 'AI-driven interfaces'],
                        i: Zap
                      },
                      { 
                        t: '3. Token-Driven', 
                        d: 'Every design decision becomes reusable and synchronized.', 
                        f: ['Figma Variables', 'Tokens Studio', 'GitHub Sync'],
                        i: FileJson
                      },
                      { 
                        t: '4. Cross-Platform', 
                        d: 'One design language across all touchpoints.', 
                        f: ['Android', 'iOS', 'Web', 'Smart IVR', 'Internal Systems'],
                        i: Globe
                      }
                    ].map((phil, i) => (
                      <div key={i} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:border-brand/40 transition-colors">
                        <phil.i className="text-brand mb-6" size={32} />
                        <h4 className="text-lg font-black mb-4 tracking-tight">{phil.t}</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">{phil.d}</p>
                        <div className="flex flex-wrap gap-2">
                          {phil.f.map((tag, ti) => (
                            <span key={ti} className="text-[9px] font-black uppercase tracking-widest text-gray-300">• {tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Orbit Design System Layers */}
                <div className="pt-20 border-t border-gray-100">
                  <div className="text-center mb-16">
                    <Badge className="justify-center">System Architecture</Badge>
                    <h3 className="text-5xl font-black tracking-tighter">Orbit Design System Layers</h3>
                  </div>
                  <div className="max-w-4xl mx-auto space-y-4">
                    {[
                      { n: '01', t: 'Foundation', d: 'Design Tokens (Color, Typo, Spacing, Shadow)' },
                      { n: '02', t: 'Component', d: 'Atoms & Molecules (Buttons, Inputs, Modals)' },
                      { n: '03', t: 'Pattern Library', d: 'Organisms & Templates (Login, Checkout, Profile)' },
                      { n: '04', t: 'Whole Grameenphone Product', d: 'The final orchestrated ecosystem delivery' }
                    ].map((layer, i) => (
                      <div key={i} className="flex items-center gap-8 p-10 rounded-3xl bg-white border border-gray-100 hover:shadow-lg transition-shadow group">
                        <span className="text-6xl font-black text-brand/10 group-hover:text-brand transition-colors">{layer.n}</span>
                        <div>
                          <h4 className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-brand transition-colors">{layer.t}</h4>
                          <p className="text-sm text-gray-500 font-medium italic mt-2">{layer.d}</p>
                        </div>
                        <ArrowRight size={24} className="ml-auto text-gray-200 group-hover:text-brand transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brief Workflow Preview */}
                <div className="p-12 rounded-[3.5rem] bg-gray-900 text-white text-center">
                  <Badge className="justify-center mb-8">DesignOps</Badge>
                  <h3 className="text-4xl font-black mb-12">Orbit DesignOps Workflow</h3>
                  <div className="flex flex-wrap justify-center gap-12">
                    {['PROPOSE', 'REVIEW', 'BUILD', 'TEST', 'PUBLISH'].map((step, i) => (
                      <div key={i} className="flex items-center gap-6 group">
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full border-2 border-brand/40 flex items-center justify-center text-brand text-xs font-black group-hover:bg-brand group-hover:text-white transition-all">
                            0{i + 1}
                          </div>
                          <span className="block text-[10px] font-black tracking-widest mt-4 group-hover:text-brand transition-colors">{step}</span>
                        </div>
                        {i < 4 && <ArrowRight size={16} className="text-gray-700 hidden lg:block" />}
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </Slide>

          {/* Slide 5: Scale · Maintain · Review (Item 03) */}
          <Slide key={4} isActive={currentSlide === 4}>
            <StaggerContainer>
              <StaggerItem>
                <Badge>03 · Operations</Badge>
                <h2 className="text-4xl font-black mb-4 leading-tight">
                  Scale, Maintain & Review — <br />
                  <span className="text-brand">Enterprise Design System Strategy.</span>
                </h2>
                <p className="text-sm text-gray-500 font-bold max-w-3xl mb-8 leading-relaxed">
                  Building a scalable DesignOps ecosystem for Grameenphone’s 85M+ subscribers across multiple digital products.
                </p>
                <blockquote className="text-lg text-gray-400 font-bold mb-10 border-l-4 border-brand pl-6 italic">
                  “A successful Design System is not only about UI components — it is about governance, collaboration, scalability, accessibility, and operational excellence.”
                </blockquote>
              </StaggerItem>

              <StaggerItem className="space-y-20 pb-20">
                {/* Frameworks */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-gray-900 text-white">
                      <h4 className="text-brand font-black text-xs uppercase tracking-widest mb-4">Core Framework 01</h4>
                      <h3 className="text-2xl font-black mb-4">Maintenance & Governance Cycle</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">Defines how components, tokens, and patterns evolve through structured feedback and contribution.</p>
                    </div>
                    <div className="p-8 rounded-3xl border border-gray-100 bg-white">
                      <h4 className="text-brand font-black text-xs uppercase tracking-widest mb-4">Core Framework 02</h4>
                      <h3 className="text-2xl font-black mb-4">System Evaluation & Quality Metrics</h3>
                      <p className="text-xs text-gray-500 leading-relaxed font-medium">Measures consistency, scalability, adoption, and performance across all GP products.</p>
                    </div>
                  </div>

                  {/* Ecosystem Stack Table */}
                  <div>
                    <h3 className="text-2xl font-black mb-8">Core Ecosystem & Collaboration Stack</h3>
                    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm font-sans">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-100 italic">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Platform</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Purpose</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs">
                          {ecosystemStack.map((item, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-6 py-4 font-black text-gray-900">{item.cat}</td>
                              <td className="px-6 py-4 font-bold text-brand flex items-center gap-2">
                                <item.i size={14} />
                                {item.plat}
                              </td>
                              <td className="px-6 py-4 text-gray-500 font-medium">{item.purp}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Workflow Steps */}
                  <div className="space-y-16">
                    {maintenanceWorkflow.map((w, i) => (
                      <div key={i} className="relative pl-8 border-l-2 border-gray-100 group">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-brand group-hover:bg-brand transition-colors"></div>
                        <div className="mb-8">
                          <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">{w.step}</span>
                          <h3 className="text-3xl font-black text-gray-900 mt-2 mb-4">{w.goal}</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                            {w.details.map((detail, di) => (
                              <div key={di}>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{detail.t}</h4>
                                <p className="text-xs text-gray-600 font-medium leading-relaxed">{detail.d}</p>
                              </div>
                            ))}
                            {w.summary && (
                              <div className="p-4 rounded-xl bg-brand/5 border border-brand/10 mt-6">
                                <p className="text-[10px] font-black text-brand tracking-widest uppercase">{w.summary}</p>
                              </div>
                            )}
                          </div>
                          {w.roles && (
                            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Cross-Functional Collaboration</h4>
                              <div className="space-y-4">
                                {w.roles.map((role, ri) => (
                                  <div key={ri} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{role.r}</span>
                                    <span className="text-[10px] font-bold text-gray-400 italic text-right">{role.d}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* KPIs for Success */}
                  <div className="pt-20 border-t border-gray-100">
                    <h3 className="text-3xl font-black mb-12">KPIs for Success</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { l: 'Consistency', v: '90%+', i: ShieldCheck },
                        { l: 'Accessibility', v: 'WCAG 2.2 AA', i: Accessibility },
                        { l: 'Reuse', v: '70%+', i: Workflow },
                        { l: 'Speed', v: '2× Faster', i: Zap }
                      ].map((kpi, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-white border border-gray-100 text-center shadow-sm hover:border-brand transition-colors">
                          <kpi.i className="mx-auto mb-4 text-brand" size={24} />
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.l}</h4>
                          <div className="text-xl font-black text-gray-900 tracking-tighter">{kpi.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vision Section */}
                  <div className="p-12 rounded-[3rem] bg-gray-900 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <Badge className="mb-6">GP DesignOps Vision</Badge>
                      <h3 className="text-4xl font-black mb-8 leading-tight">The GP Design System is <br />not just a UI library.</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "A scalable telecom product infrastructure",
                          "A shared design language",
                          "A collaboration framework",
                          "A faster product delivery ecosystem",
                          "An accessibility-first platform",
                          "A long-term governance model"
                        ].map((vision, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm font-bold opacity-80">
                            <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                              <Check size={12} className="text-brand" />
                            </div>
                            {vision}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
              </StaggerItem>
            </StaggerContainer>
          </Slide>

          <Slide key={5} isActive={currentSlide === 5}>
            <StaggerContainer>
              <StaggerItem>
                <Badge>04 · Foundations</Badge>
                <h2 className="text-5xl font-black mb-10">Foundation.</h2>
              </StaggerItem>
              <StaggerItem className="space-y-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-10 rounded-3xl bg-white border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 block mb-6">Inter</span>
                    <div className="text-5xl font-black mb-4 tracking-tighter">Inter Type.</div>
                    <p className="text-xs font-bold text-gray-400 leading-relaxed">
                      Default for functional UI. Sturdy, neutral, and optimized for screen legibility.
                    </p>
                  </div>
                  <div className="p-10 rounded-3xl bg-white border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 block mb-6">Bangla · Noto Sans Bengali</span>
                    <div className="text-4xl font-bold mb-4 tracking-tight">গ্রামীণফোন</div>
                    <p className="text-xs font-bold text-gray-400 leading-relaxed">
                      Noto Sans Bengali ensures crystal clear rendering of script for our mass user base.
                    </p>
                  </div>
                  <div className="md:col-span-2 p-10 rounded-3xl bg-brand/5 border border-brand/10">
                    <div className="mb-8">
                      <Badge className="mb-2">Multilingual Strategy</Badge>
                      <h4 className="text-2xl font-black text-gray-900 tracking-tight">Supporting diverse communities <br />across Bangladesh.</h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {[
                        { l: 'Arabic / Urdu', n: 'اردو' },
                        { l: 'Chinese', n: '中文' },
                        { l: 'Russian', n: 'Русский' },
                        { l: 'Hindi', n: 'हिन्दी' },
                        { l: 'Urdu', n: 'اردو' }
                      ].map((lang, i) => (
                        <div key={lang.l + i} className="p-5 rounded-2xl bg-white border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
                          <div className="text-lg font-bold mb-1 text-gray-900 tracking-tight">{lang.n}</div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">{lang.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Foundation Details Table */}
                <div className="mt-20">
                  <h3 className="text-2xl font-black mb-8 underline decoration-brand/30 underline-offset-8 text-gray-900">Foundation Details</h3>
                  <div className="overflow-x-auto rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">No</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Element</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Status</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 w-1/4">Notes (Figma Execution)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {foundationData.map((row) => (
                          <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-6 py-5">
                              <span className="text-[10px] font-bold text-gray-300">{row.id.toString().padStart(2, '0')}</span>
                            </td>
                            <td className="px-6 py-5">
                              <span className="text-[9px] font-black uppercase tracking-widest text-brand/60">{row.category}</span>
                            </td>
                            <td className="px-6 py-5">
                              <div>
                                <h4 className="font-black text-xs text-gray-900 mb-1">{row.element}</h4>
                                <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{row.desc}</p>
                                <span className="text-[8px] font-bold text-gray-400 block mt-1 uppercase tracking-tighter">Deadline: {row.deadline}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                                row.status === 'Done' ? 'bg-emerald-100 text-emerald-600' : 
                                row.status === 'In Progress' ? 'bg-amber-100 text-amber-600' : 
                                'bg-gray-100 text-gray-400'
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-6 py-5">
                              <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">{row.notes}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </Slide>

          {/* Slide 8: Adaptive & Responsive (Item 06) */}
          <Slide key={6} isActive={currentSlide === 6}>
            <StaggerContainer>
              <StaggerItem>
                <Badge>05 · Adaptive System</Badge>
                <h2 className="text-6xl font-black mb-8 leading-tight tracking-tighter">
                  Adaptive & <br />
                  <span className="text-brand">Responsive System.</span>
                </h2>
                <p className="text-xl text-gray-500 font-bold max-w-2xl mb-10 leading-relaxed">
                  Building One Unified Experience Across Every Device, Screen Size, and Platform.
                </p>
                <blockquote className="text-xl text-gray-400 font-bold leading-relaxed border-l-4 border-brand pl-8 mb-16 italic">
                  “Orbit Design System is built mobile-first, accessibility-first, and scalable-first — ensuring every GP product works seamlessly across Bangladesh’s diverse digital ecosystem.”
                </blockquote>
              </StaggerItem>

              <StaggerItem className="space-y-32">
                {/* Why it Matters */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 relative overflow-hidden">
                    <Globe size={180} className="absolute -right-12 -bottom-12 text-gray-200 opacity-20" />
                    <h4 className="text-brand font-black text-xs uppercase tracking-widest mb-4">The Context</h4>
                    <h3 className="text-3xl font-black mb-6">Why Responsive Matters for Grameenphone</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "85M+ Subscribers",
                        "Low-end Android",
                        "Tablets & iPad",
                        "Enterprise Desktops",
                        "Rural Connectivity",
                        "Diverse Screen Sizes"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Check size={14} className="text-brand" />
                          <span className="text-xs font-bold text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-8">
                    <h3 className="text-3xl font-black tracking-tight">One system. <br />Every single device.</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      Grameenphone’s digital ecosystem serves 85 millions of users across Bangladesh from customers using entry-level Android devices in rural areas to enterprise teams and leadership operating on large-scale desktop systems. Orbit adapts seamlessly across every screen, platform, and experience with consistency, accessibility, and performance at its core.
                    </p>
                  </div>
                </div>

                {/* Adaptive Principles Grid */}
                <div>
                  <div className="mb-12">
                    <Badge>Design Strategy</Badge>
                    <h3 className="text-4xl font-black tracking-tighter">Adaptive Design Principles</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        t: "1. Mobile-First Architecture",
                        d: "Designed starting from the smallest screen. Most GP users access services through mobile devices.",
                        f: ["Fast loading", "Thumb-friendly", "Lightweight UI"],
                        i: Smartphone
                      },
                      {
                        t: "2. Responsive Layout System",
                        d: "The layout automatically adapts across Mobile, Tablet, and Desktop displays.",
                        f: ["Fluid containers", "Flexible grids", "Responsive spacing"],
                        i: Layout
                      },
                      {
                        t: "3. Adaptive Components",
                        d: "The same component intelligently changes behavior based on the platform and input method.",
                        f: ["Hover states", "Touch targets", "Contextual density"],
                        i: Sparkles
                      },
                      {
                        t: "4. Accessibility Scalability",
                        d: "Ensuring clarity across OS-level text scaling and diverse readability needs.",
                        f: ["Text scaling", "Focus visibility", "Touch areas"],
                        i: Accessibility
                      },
                      {
                        t: "5. Cross-Platform Sync",
                        d: "Consistency across Android, iOS, and Web environments through one token language.",
                        f: ["iOS 44pt targets", "Android 48dp", "Web optimization"],
                        i: Cpu
                      },
                      {
                        t: "6. Performance-First",
                        d: "Optimized for rural connectivity and mid-range devices across Bangladesh.",
                        f: ["Skeleton loading", "Reduced motion", "Low-bandwidth UI"],
                        i: Wifi
                      }
                    ].map((princ, i) => (
                      <div key={princ.t} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:border-brand/40 transition-colors">
                        <princ.i className="text-brand mb-6" size={32} />
                        <h4 className="text-lg font-black mb-4 tracking-tight">{princ.t}</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">{princ.d}</p>
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                          {princ.f.map((tag, ti) => (
                            <span key={ti} className="text-[9px] font-black uppercase tracking-widest text-gray-400">{tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Breakpoint System table */}
                <div className="grid lg:grid-cols-2 gap-12 pt-20 border-t border-gray-100">
                  <div>
                    <h3 className="text-2xl font-black mb-8">Grid & Breakpoint System</h3>
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-100">
                             <th className="px-5 py-3 font-black text-gray-400 uppercase tracking-widest text-[10px]">Break</th>
                             <th className="px-5 py-3 font-black text-gray-400 uppercase tracking-widest text-[10px]">Size</th>
                             <th className="px-5 py-3 font-black text-gray-400 uppercase tracking-widest text-[10px]">Grid</th>
                             <th className="px-5 py-3 font-black text-gray-400 uppercase tracking-widest text-[10px]">Device</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {[
                            { b: 'xs', s: '< 360px', g: '4-col', d: 'Small Phone' },
                            { b: 'sm', s: '360–599px', g: '4-col', d: 'Standard Mobile' },
                            { b: 'md', s: '600–904px', g: '8-col', d: 'Tablet / Foldable' },
                            { b: 'lg', s: '905–1239px', g: '12-col', d: 'Laptop' },
                            { b: 'xl', s: '1240–1439px', g: '12-col', d: 'Desktop' },
                            { b: '2xl', s: '≥ 1440px', g: '12-col', d: 'Enterprise' },
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50/50">
                              <td className="px-5 py-3 font-black text-brand">{row.b}</td>
                              <td className="px-5 py-3 font-bold text-gray-600">{row.s}</td>
                              <td className="px-5 py-3 font-medium text-gray-400">{row.g}</td>
                              <td className="px-5 py-3 font-black text-gray-900 uppercase tracking-tighter">{row.d}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-8">Accessibility Standards</h3>
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-100">
                             <th className="px-5 py-3 font-black text-gray-400 uppercase tracking-widest text-[10px]">Feature</th>
                             <th className="px-5 py-3 font-black text-gray-400 uppercase tracking-widest text-[10px]">Orbit Standard</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {[
                            { f: 'Min Touch Target', s: '44 × 44 px' },
                            { f: 'Text Scaling', s: 'OS-Native support' },
                            { f: 'Reflow', s: 'WCAG 2.2 compliant' },
                            { f: 'Focus State', s: 'Always visible indicators' },
                            { f: 'Keyboard Nav', s: 'Tab-index fully supported' },
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50/50">
                              <td className="px-5 py-3 font-black text-gray-900">{row.f}</td>
                              <td className="px-5 py-3 font-bold text-brand uppercase tracking-widest text-[10px]">{row.s}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Adaptive Component Examples */}
                <div className="pt-20">
                  <div className="grid md:grid-cols-2 gap-8">
                     {/* Buttons Example */}
                     <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                          <MousePointer2 className="text-brand" size={24} />
                          <h4 className="text-xl font-black">Button Behavior</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           {[
                             { d: 'Mobile', n: 'Large touch target (48px)', a: 'Bottom aligned' },
                             { d: 'Tablet', n: 'Balanced spacing', a: 'Split layouts' },
                             { d: 'Desktop', n: 'Dense hover states', a: 'Inline placement' }
                           ].map((item, i) => (
                             <div key={i} className="space-y-1">
                               <span className="text-[10px] font-black text-brand uppercase tracking-widest">{item.d}</span>
                               <p className="text-xs font-bold text-gray-900">{item.n}</p>
                               <p className="text-[10px] text-gray-400 font-medium italic">{item.a}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                     {/* Navigation Example */}
                     <div className="p-10 rounded-[3rem] bg-gray-900 text-white">
                        <div className="flex items-center gap-4 mb-8">
                          <Monitor className="text-brand" size={24} />
                          <h4 className="text-xl font-black text-white">Navigation System</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                           {[
                             { d: 'Mobile', t: 'Bottom Nav' },
                             { d: 'Tablet', t: 'Side + Tabs' },
                             { d: 'Desktop', t: 'Full Sidebar' }
                           ].map((item, i) => (
                             <div key={i} className="space-y-1 text-center">
                               <span className="text-[9px] font-black text-brand uppercase tracking-widest">{item.d}</span>
                               <div className="w-full h-1 bg-white/10 rounded-full mt-2 mb-3"></div>
                               <p className="text-[10px] font-bold text-gray-400">{item.t}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
                </div>

                {/* Typography & Spacing Scaling */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge>Scaling Logic</Badge>
                    <h3 className="text-4xl font-black tracking-tighter mb-8">Typography & Spacing Intelligence</h3>
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-white border border-gray-100">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Typography Scaling</h4>
                        <div className="flex items-baseline gap-4">
                          <span className="text-xl font-black">28px</span>
                          <span className="text-3xl font-black text-brand">40px</span>
                          <span className="text-5xl font-black opacity-20">64px</span>
                        </div>
                      </div>
                      <div className="p-6 rounded-2xl bg-white border border-gray-100">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Adaptive Spacing Padding</h4>
                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <div className="w-8 h-8 rounded border-2 border-brand/20 mb-2 mx-auto"></div>
                            <span className="text-[10px] font-black text-gray-400">16px (Mobile)</span>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 rounded border-2 border-brand/40 mb-2 mx-auto"></div>
                            <span className="text-[10px] font-black text-gray-400">24px (Tablet)</span>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 rounded border-2 border-brand mb-2 mx-auto"></div>
                            <span className="text-[10px] font-black text-brand">32px (Desktop)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-12 rounded-[3.5rem] bg-brand text-white text-center shadow-2xl shadow-brand/20">
                     <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">The Workflow</h4>
                     <h3 className="text-3xl font-black mb-8 leading-tight">From Logic To Pixels.</h3>
                     <div className="space-y-4">
                       {[
                         { s: 'Design Layer', d: 'Figma Variables → Tokens Studio' },
                         { s: 'Logic Layer', d: 'Adaptive Components → Breakpoint Logic' },
                         { s: 'Engineering Layer', d: 'React / Flutter → Media Queries' },
                         { s: 'QA Layer', d: 'Cross-device visual regression testing' }
                       ].map((step, i) => (
                         <div key={i} className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-left">
                            <span className="text-[9px] font-black uppercase tracking-widest opacity-60 block mb-1">{step.s}</span>
                            <span className="text-xs font-bold">{step.d}</span>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>

                {/* Final Responsive Strategy Vision */}
                <div className="text-center space-y-12">
                   <div className="max-w-2xl mx-auto">
                     <h3 className="text-5xl font-black tracking-tighter mb-6">Built for the Future of GP.</h3>
                     <p className="text-gray-400 font-bold">One system, every screen, every user. Orbit prepares Grameenphone for foldable devices, smart TVs, and AI-driven interfaces.</p>
                   </div>
                   <div className="flex flex-wrap justify-center gap-4">
                      {[
                        { l: 'ANDROID', i: Smartphone },
                        { l: 'IOS', i: Smartphone },
                        { l: 'WEB', i: Globe },
                        { l: 'TABLET', i: Tablet },
                        { l: 'TV', i: Tv },
                        { l: 'IVR', i: MessageSquare }
                      ].map((plat, i) => (
                        <div key={i} className="px-6 py-4 rounded-2xl bg-white border border-gray-100 flex items-center gap-3 shadow-sm hover:border-brand transition-all">
                          <plat.i className="text-brand" size={18} />
                          <span className="text-[10px] font-black tracking-widest text-gray-900">{plat.l}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </Slide>

          {/* Slide 9: Component Library (Item 07) */}
          <Slide key={7} isActive={currentSlide === 7}>
            <StaggerContainer>
              <StaggerItem>
                <Badge>07 · Library</Badge>
                <h2 className="text-6xl font-black mb-8 leading-tight tracking-tighter">
                  Component <br />
                  <span className="text-brand">Library.</span>
                </h2>
                <p className="text-xl text-gray-500 font-bold max-w-2xl mb-12 leading-relaxed">
                  A massive ecosystem of reusable, production-ready components built for scalability across the GP landscape.
                </p>
              </StaggerItem>

              <StaggerItem className="space-y-40">
                {/* Component Architecture */}
                <div className="p-12 rounded-[3.5rem] bg-gray-900 text-white overflow-hidden relative group">
                  <Orbit size={200} className="absolute -right-20 -top-20 text-brand/20 group-hover:rotate-45 transition-transform duration-1000" />
                  <h3 className="text-3xl font-black mb-12 text-center">Orbit Component Architecture</h3>
                  <div className="grid md:grid-cols-4 gap-4 relative z-10">
                    {componentArchitecture.map((layer, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-brand/40 transition-colors">
                        <span className="text-[10px] font-black text-brand uppercase tracking-widest block mb-4">Layer 0{i+1}</span>
                        <h4 className="text-xl font-black mb-4">{layer.l}</h4>
                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{layer.d}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Component Categories */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {componentCategories.map((cat, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
                      <h4 className="text-lg font-black mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-brand"></div>
                        {cat.title}
                      </h4>
                      <div className="space-y-4">
                        {cat.items.map((item, ii) => (
                          <div key={ii} className="group">
                            <h5 className="text-[11px] font-black uppercase text-gray-900 group-hover:text-brand transition-colors">{item.n}</h5>
                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">{item.d}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* System Status & Feedback */}
                <div>
                   <div className="text-center mb-16">
                     <Badge className="justify-center">Edge Cases</Badge>
                     <h3 className="text-4xl font-black tracking-tighter">Feedback & System Status States</h3>
                     <p className="text-sm text-gray-400 mt-4 max-w-xl mx-auto">Universal patterns for consistent error handling and success feedback across the ecosystem.</p>
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                     {systemStatusStates.map((state, i) => (
                       <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:border-brand transition-all">
                         <div className="w-8 h-8 rounded-full bg-brand/5 flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white transition-all">
                           <ShieldAlert size={16} />
                         </div>
                         <h5 className="text-[10px] font-black text-gray-900 mb-2 leading-tight">{state.s}</h5>
                         <p className="text-[9px] text-gray-400 font-medium leading-relaxed">{state.p}</p>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Interaction & Motion */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="p-12 rounded-[3.5rem] border border-gray-100 bg-white relative overflow-hidden">
                    <Sparkles size={120} className="absolute -left-8 -bottom-8 text-brand/5" />
                    <Badge>Delight</Badge>
                    <h3 className="text-3xl font-black mb-8 leading-tight">Motion & Interaction Components</h3>
                    <div className="space-y-4">
                      {[
                        { t: 'Micro-interactions', d: 'Button & touch feedback' },
                        { t: 'Pull-to-Refresh', d: 'Refresh gesture' },
                        { t: 'Swipe Actions', d: 'Mobile gesture interaction' },
                        { t: 'Success Animation', d: 'Reward & completion feedback' },
                        { t: 'Skeleton Animation', d: 'Loading placeholders' }
                      ].map((m, i) => (
                        <div key={i} className="flex justify-between items-center pb-3 border-b border-gray-50">
                          <span className="text-[11px] font-black">{m.t}</span>
                          <span className="text-[10px] text-gray-400 italic">{m.d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black tracking-tighter mb-8 italic text-brand">“Atomic stability, <br />infinite flexibility.”</h3>
                    <p className="text-gray-400 font-bold leading-relaxed">
                      Every Orbit component is versioned, tested for accessibility, and synchronized through tokens 
                      from Figma to Production. This ensures that when a brand decision changes, it propagates 
                      across 85M users instantly.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </Slide>

          {/* Slide 10: Roadmap */}
          <Slide key={8} isActive={currentSlide === 8}>
            <StaggerContainer>
              <StaggerItem>
                <Badge>Future Vision</Badge>
                <h2 className="text-6xl font-black mb-6 leading-tight tracking-tighter">
                  Rollout <br />
                  <span className="text-brand">Roadmap.</span>
                </h2>
                <p className="text-xl text-gray-500 font-bold max-w-3xl mb-12 leading-relaxed">
                  Scaling One Unified Design Ecosystem Across All Grameenphone Products.
                </p>
                <blockquote className="text-xl text-gray-400 font-bold leading-relaxed border-l-4 border-brand pl-8 mb-20 italic max-w-3xl">
                  “Orbit will gradually unify every GP digital product into one scalable, accessible, and enterprise-ready design ecosystem.”
                </blockquote>
              </StaggerItem>

              <StaggerItem className="space-y-40">
                {/* Timeline Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      q: "Q2 2026",
                      t: "MyGP V6.0 Core Migration",
                      f: "Focus Product: MyGP App",
                      d: "The first phase focuses on rebuilding and migrating the core MyGP experience into Orbit Design System foundations.",
                      p: "Active",
                      tags: ["Design Audit", "Token Migration", "Foundation Build"]
                    },
                    {
                      q: "Q3 2026",
                      t: "Orbit Product Expansion",
                      f: "Product Lineup",
                      d: "Expanding the system to high-traffic web and auxiliary service layers.",
                      p: "Planned",
                      products: ["Web Next", "One GP", "GP Cloud", "Smart IVR"]
                    },
                    {
                      q: "Q4 2026",
                      t: "Enterprise & Ecosystem Integration",
                      f: "Product Lineup",
                      d: "Unifying internal management tools and entertainment ecosystem.",
                      p: "Planned",
                      products: ["Cockpit 360", "Payroll", "Skill HUB", "Bioscope"]
                    },
                    {
                      q: "2027 Vision",
                      t: "AI-Native Design Ecosystem",
                      f: "Full Orbit Ecosystem",
                      d: "All Grameenphone digital products will operate under one unified Orbit Design System with AI-driven adaptive logic.",
                      p: "Vision",
                      tags: ["AI Adapters", "Predictive UX", "Auto-Theming"]
                    }
                  ].map((phase, i) => (
                    <div key={i} className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-brand transition-all">
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-brand">{phase.q}</span>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${phase.p === 'Active' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {phase.p}
                          </span>
                        </div>
                        <h4 className="text-2xl font-black mb-4 tracking-tighter leading-tight">{phase.t}</h4>
                        <div className="mb-6">
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">{phase.f}</span>
                           {phase.products ? (
                              <div className="flex flex-wrap gap-2">
                                {phase.products.map(p => (
                                  <span key={p} className="text-[10px] font-bold text-gray-900 border-b-2 border-brand/20">{p}</span>
                                ))}
                              </div>
                           ) : (
                              <p className="text-xs text-gray-500 font-medium leading-relaxed">{phase.d}</p>
                           )}
                        </div>
                      </div>
                      <div className="pt-6 border-t border-gray-50 flex gap-4">
                         {phase.tags && phase.tags.map(tag => (
                           <span key={tag} className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{tag}</span>
                         ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scaling Vision */}
                <div className="p-16 rounded-[4rem] bg-brand text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                     <div className="flex-1">
                        <Badge className="bg-white/20 border-white/30 text-white mb-6">The Goal</Badge>
                        <h3 className="text-5xl font-black mb-8 leading-tight tracking-tighter">Scale to the <br />Entire Ecosystem.</h3>
                        <p className="text-xl font-bold opacity-80 leading-relaxed">
                          Grameenphone serves 85M+ users through hundreds of digital touchpoints. 
                          Orbit is the common language that ties them all together, ensuring 
                          consistency and quality at every interaction.
                        </p>
                     </div>
                     <div className="flex-1 grid grid-cols-2 gap-4">
                        {[
                          { l: 'Consistency', v: '100%' },
                          { l: 'Efficiency', v: '3.5x' },
                          { l: 'Development', v: 'Fast' },
                          { l: 'Accessibility', v: 'Global' }
                        ].map((stat, i) => (
                          <div key={i} className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
                            <h5 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">{stat.l}</h5>
                            <span className="text-4xl font-black">{stat.v}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </Slide>

          {/* Slide 11: Final */}
          <Slide key={9} isActive={currentSlide === 9}>
            <StaggerContainer className="h-full flex flex-col">
              <StaggerItem className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center text-[#333333] mb-10 gap-4">
                  <span className="font-bold text-6xl tracking-tighter" style={{ fontFamily: 'Inter, sans-serif' }}>Orbit</span>
                </div>
                <h2 className="text-xl font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">Orbit Design System 1.0</h2>
                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter">
                  Built for <br />
                  <span className="text-brand">Bangladesh.</span>
                </h1>
                <p className="text-lg text-gray-400 font-bold max-w-lg mb-12">
                  One language. Nine products. Infinite scale.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(0)}
                  className="mt-16 px-8 py-3 bg-gray-900 text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] hover:bg-black transition-colors"
                >
                  Thank You
                </motion.button>
              </StaggerItem>
            </StaggerContainer>
          </Slide>
        </AnimatePresence>
          </div>
        </main>
      </div>

    </div>
  );
}
