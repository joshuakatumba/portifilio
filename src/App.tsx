import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Terminal,
    Layout,
    Server,
    ChevronDown,
    Menu,
    X,
    Send,
    Globe
} from 'lucide-react';

// --- Types ---

interface Skill {
    category: string;
    icon: React.ReactNode;
    items: string[];
}

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    links: {
        demo: string;
        code: string;
    };
    image: string;
}

interface RevealOnScrollProps {
    children: React.ReactNode;
    delay?: number;
}

interface NavbarProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
    activeSection: string;
}

// --- Data ---

const SKILLS: Skill[] = [
    { category: "Frontend", icon: <Layout className="w-6 h-6" />, items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML5/CSS3", "Word Press"] },
    { category: "Backend", icon: <Server className="w-6 h-6" />, items: ["Node.js", "Python", "PostgreSQL", "Laravel"] },
    { category: "Tools & DevOps", icon: <Terminal className="w-6 h-6" />, items: ["Git", "Docker", "AWS", "CI/CD", "Linux"] },
    { category: "Design", icon: <Globe className="w-6 h-6" />, items: ["Figma", "UI/UX Principles", "Responsive Design"] },
];

const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Automobile Car Purchase",
        description: "A comprehensive analytics dashboard for online retailers. Features real-time sales tracking, inventory management, and customizable reporting widgets.",
        tags: ["React", "Recharts", "Node.js", "MongoDB"],
        links: { demo: "https://eminentauto.online/", code: "https://github.com/joshuakatumba/eminentautodealership.git" },
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Gyneo App",
        description: "A comprehensive health tracking application designed for women to monitor menstruation cycles, track symptoms, predict fertile windows, and gain insights into their reproductive health patterns.",
        tags: ["React", "Firebase", "Health Tech", "Analytics"],
        links: { demo: "https://gyneoapp-t3mz.vercel.app/", code: "https://github.com/joshuakatumba/gyneoapp.git" },
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "AI Poem Chatbot",
        description: "An interactive AI-powered chatbot that generates creative and personalized poems based on user prompts. Features real-time conversation, multiple poetry styles, and emotion-based verse generation.",
        tags: ["Python", "FastAPI", "OpenAI API", "React"],
        links: { demo: "#", code: "#" },
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "MedTrack",
        description: "A comprehensive web application for healthcare providers to track patient progress, manage medical records, monitor treatment plans, and visualize health metrics over time.",
        tags: ["React", "Node.js", "PostgreSQL", "Health Tech"],
        links: { demo: "https://med-track-zehk.vercel.app/", code: "https://github.com/joshuakatumba/med-track.git" },
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
    }
];

// --- Utility Components ---

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// --- Components ---

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen, activeSection }) => {
    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 group cursor-pointer">
                        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300">
                            DevPortfolio.
                        </span>
                        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"></div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`${activeSection === link.name.toLowerCase()
                                        ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                                        : 'text-slate-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]'
                                        } px-3 py-2 rounded-md text-sm font-medium transition-all duration-200`}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 group"
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#22d3ee_0%,#0ea5e9_50%,#22d3ee_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-900 group-hover:text-cyan-300">
                                    Hire Me
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-in slide-in-from-top-5 duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

const Hero: React.FC = () => {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
            {/* Background blobs with animation */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <RevealOnScroll>
                        <div className="inline-block p-1 px-3 rounded-full bg-slate-800/50 border border-slate-700 mb-6 backdrop-blur-sm hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 cursor-default">
                            <span className="text-cyan-400 text-sm font-medium flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                </span>
                                Available for freelance work
                            </span>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Building digital
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x bg-[length:200%_auto]">
                                experiences that matter.
                            </span>
                        </h1>
                    </RevealOnScroll>

                    <RevealOnScroll delay={400}>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10">
                            Hi, I'm Joshua. A Full Stack Developer passionate about building accessible,
                            pixel-perfect, and performant web applications.
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={600}>
                        <div className="flex justify-center gap-4">
                            <a
                                href="#projects"
                                className="px-8 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1"
                            >
                                View Work <ChevronDown className="w-4 h-4" />
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-3 rounded-full border border-slate-700 text-white font-bold hover:bg-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-1"
                            >
                                Contact Me
                            </a>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={800}>
                        <div className="mt-12 flex justify-center gap-6 text-slate-400">
                            <a href="https://github.com/joshuakatumba" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"><Github className="w-6 h-6" /></a>
                            <a href="https://ug.linkedin.com/in/joshua-katumba-aab89234b" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"><Linkedin className="w-6 h-6" /></a>
                            <a href="mailto:katumbajoshua10@gmail.com" className="hover:text-cyan-400 transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"><Mail className="w-6 h-6" /></a>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

const AboutMe: React.FC = () => {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <RevealOnScroll>
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                    Full-stack web and mobile
                                    <br />
                                    app developer.
                                </span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                                I specialize in building innovative applications across multiple domains.
                                From automotive e-commerce platforms to health tech solutions, business
                                management tools, and AI-powered creative apps, I create scalable, secure,
                                and user-friendly applications that solve real-world problems.
                            </p>
                        </div>
                    </RevealOnScroll>

                    {/* Right Column - Image with Halftone Effect */}
                    <RevealOnScroll delay={200}>
                        <div className="relative group">
                            {/* Halftone overlay effect */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_1px,#0f172a_1px)] bg-[length:4px_4px] z-10 rounded-3xl opacity-40 group-hover:opacity-30 transition-opacity duration-500" />

                            {/* Glow effect on hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                            {/* Image container */}
                            <div className="relative rounded-3xl overflow-hidden border border-slate-700 group-hover:border-cyan-500/50 transition-all duration-500 aspect-[4/5] bg-slate-800">
                                {/* User's Profile Image */}
                                <img
                                    src="/profile.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

const Skills: React.FC = () => {
    return (
        <section id="skills" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Proficiency</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            A curated list of the technologies and tools I use to bring ideas to life.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SKILLS.map((skill, index) => (
                        <RevealOnScroll key={index} delay={index * 100}>
                            <div className="group bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] hover:-translate-y-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-cyan-950/50 group-hover:text-cyan-300 transition-all duration-300 shadow-lg group-hover:shadow-cyan-500/20">
                                    {skill.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{skill.category}</h3>
                                <ul className="space-y-2">
                                    {skill.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors">
                                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-shadow"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Projects: React.FC = () => {
    return (
        <section id="projects" className="py-24 bg-slate-900 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
                            <p className="text-slate-400 max-w-xl">
                                Some of my favorite projects that showcase my passion for coding and design.
                            </p>
                        </div>
                        <a href="#" className="hidden md:flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mt-4 md:mt-0 font-medium group hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                            View All Projects <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <RevealOnScroll key={project.id} delay={index * 150}>
                            <div className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)] transition-all duration-500 hover:-translate-y-2">
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                </div>

                                <div className="p-6 relative z-20">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors drop-shadow-sm group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-3">
                                            <a
                                                href={project.links.code}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transition-all transform hover:scale-110"
                                                title="View Code"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={project.links.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transition-all transform hover:scale-110"
                                                title="Live Demo"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>

                                    <p className="text-slate-400 mb-6 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-950/50 rounded-full border border-cyan-900/50 group-hover:border-cyan-500/30 group-hover:bg-cyan-900/30 transition-all duration-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <a href="#" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                        View All Projects <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                </div>
            </div>
        </section>
    );
};

const Contact: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

    // Initialize EmailJS (optional, can also be done in main file)
    // useEffect(() => { emailjs.init("YOUR_PUBLIC_KEY"); }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: '' });

        if (!formRef.current) return;

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error("EmailJS credentials not found in environment variables.");
            }

            // Note: Make sure your input fields have name attributes: "from_name", "from_email", "message"
            // matching your EmailJS template variables.
            await emailjs.sendForm(
                serviceId,
                templateId,
                formRef.current,
                publicKey
            );

            setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
            formRef.current.reset();
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-slate-950">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition-colors duration-500">
                        {/* Decorative gradients */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all duration-1000 group-hover:bg-cyan-500/20" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 transition-all duration-1000 group-hover:bg-purple-500/20" />

                        <div className="relative z-10 text-center mb-10">
                            <h2 className="text-3xl font-bold text-white mb-4">Let's Work Together</h2>
                            <p className="text-slate-400">
                                Have a project in mind or want to say hello? I'm currently open to new opportunities.
                            </p>
                        </div>

                        <form ref={formRef} className="space-y-4 relative z-10" onSubmit={handleSubmit}>
                            {status.message && (
                                <div className={`p-4 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {status.message}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="from_name"
                                        required
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:border-slate-700"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="from_email"
                                        required
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:border-slate-700"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:border-slate-700 resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                                {!loading && <Send className="w-4 h-4" />}
                            </button>
                        </form>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-950 py-12 border-t border-slate-900 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <span className="text-xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">DevPortfolio.</span>
                    <p className="text-slate-500 text-sm mt-1">© {new Date().getFullYear()} Joshua Katumba. All rights reserved.</p>
                </div>

                <div className="flex gap-6">
                    <a href="https://github.com/joshuakatumba" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all transform hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                        <span className="sr-only">GitHub</span>
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="mailto:katumbajoshua10@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-all transform hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                        <span className="sr-only">Email</span>
                        <Mail className="w-5 h-5" />
                    </a>
                    <a href="https://ug.linkedin.com/in/joshua-katumba-aab89234b" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all transform hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    // Handle smooth scroll and active section update
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'skills', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-slate-900 min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
            <Navbar
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                activeSection={activeSection}
            />

            <main>
                <Hero />
                <AboutMe />
                <Skills />
                <Projects />
                <Contact />
            </main>

            <Footer />
        </div>
    );
};

export default App;
