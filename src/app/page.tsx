"use client";
import React, { useState, useEffect } from "react";
import { motion, circOut } from "framer-motion";
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiFramer, SiSocketdotio, SiVercel, SiSass, SiExpress, SiMongodb, SiPython } from "react-icons/si";
import { FaLinkedin, FaGithub, FaTwitter, FaArrowRight, FaRegLightbulb, FaCode, FaCheckCircle, FaShieldAlt, FaRocket } from "react-icons/fa";
import Carousel from "../components/Carousel";
import { SiVscodium, SiFigma, SiDocker, SiPostman, SiGit, SiJira, SiAdobephotoshop, SiVmware, SiCloudflare, SiAmazon } from "react-icons/si";
import { FaQuestionCircle, FaPlusCircle } from "react-icons/fa";
import { FaCertificate, FaTrophy } from "react-icons/fa";
import emailjs from 'emailjs-com';
import { Highlight, Language, themes } from "prism-react-renderer";
import ReactDOM from "react-dom";

const techIcons: Record<string, React.ReactNode> = {
  "Next.js": <SiNextdotjs className="inline mr-2 text-xl align-middle" />,
  "React": <SiReact className="inline mr-2 text-xl align-middle" />,
  "TypeScript": <SiTypescript className="inline mr-2 text-xl align-middle" />,
  "Tailwind": <SiTailwindcss className="inline mr-2 text-xl align-middle" />,
  "Node.js": <SiNodedotjs className="inline mr-2 text-xl align-middle" />,
  "Framer Motion": <SiFramer className="inline mr-2 text-xl align-middle" />,
  "Socket.io": <SiSocketdotio className="inline mr-2 text-xl align-middle" />,
  "Vercel": <SiVercel className="inline mr-2 text-xl align-middle" />,
  "Sass": <SiSass className="inline mr-2 text-xl align-middle" />,
  "Express": <SiExpress className="inline mr-2 text-xl align-middle" />,
  "MongoDB": <SiMongodb className="inline mr-2 text-xl align-middle" />,
  "Python": <SiPython className="inline mr-2 text-xl align-middle" />,
  "VS Code": <SiVscodium className="inline mr-2 text-xl align-middle" />,
  "Figma": <SiFigma className="inline mr-2 text-xl align-middle" />,
  "Docker": <SiDocker className="inline mr-2 text-xl align-middle" />,
  "Postman": <SiPostman className="inline mr-2 text-xl align-middle" />,
  "Git": <SiGit className="inline mr-2 text-xl align-middle" />,
  "Jira": <SiJira className="inline mr-2 text-xl align-middle" />,
  "Photoshop": <SiAdobephotoshop className="inline mr-2 text-xl align-middle" />,
  "VMWare": <SiVmware className="inline mr-2 text-xl align-middle" />,
  "CloudFlare": <SiCloudflare className="inline mr-2 text-xl align-middle" />,
  "AWS": <SiAmazon className="inline mr-2 text-xl align-middle" />,
};

const projects = [
  {
    title: "DevConnect Platform",
    description: "A real-time chat and collaboration platform for developers, featuring channels, DMs, and code sharing.",
    image: "/project-devconnect.jpg",
    tech: ["Next.js", "TypeScript", "Socket.io", "Tailwind"],
    demo: "#",
    github: "#",
  },
  {
    title: "Portfolio Builder",
    description: "A drag-and-drop portfolio site builder with live preview, custom themes, and instant deployment.",
    image: "/project-portfolio.jpg",
    tech: ["React", "Framer Motion", "Vercel", "Sass"],
    demo: "#",
    github: "#",
  },
  {
    title: "CodeQuest Game",
    description: "A gamified coding challenge platform with leaderboards, badges, and interactive puzzles.",
    image: "/project-codequest.jpg",
    tech: ["Node.js", "Express", "MongoDB", "React"],
    demo: "#",
    github: "#",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: circOut } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: circOut },
  }),
  hover: { scale: 1.04, boxShadow: "0 8px 32px rgba(80,80,180,0.15)" },
};

function TypewriterText({ text, delay = 30, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayed < text.length) {
      const timeout = setTimeout(() => setDisplayed(displayed + 1), delay);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [displayed, text.length, delay]);

  return (
    <span className={className}>
      {text.slice(0, displayed)}
      {!isComplete && <span className="animate-blink">|</span>}
    </span>
  );
}

interface CodeExampleCardProps {
  title: string;
  code: string;
  description: string;
  details: string;
  language: string;
}

// Add a utility function to count lines
function getLineCount(code: string) {
  return code.split('\n').length;
}

function CodeExampleCard(props: CodeExampleCardProps) {
  const { title, code, description, details, language } = props;
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const lineCount = getLineCount(code);
  const codeBlockClass =
    "w-full rounded-lg custom-scrollbar overflow-x-auto mb-2" +
    (lineCount > 8 ? " overflow-y-auto" : "");
  const codeBlockStyle = {
    background: '#282a36',
    maxHeight: lineCount > 8 ? 140 : 'none',
  };

  // Helper for modal portal
  const Modal = ({ children }: { children: React.ReactNode }) => {
    if (!mounted) return null;
    const modalRoot = typeof window !== 'undefined' ? document.body : null;
    return modalRoot ? ReactDOM.createPortal(children, modalRoot) : null;
  };

  return (
    <div className={`relative flex-1 min-w-[280px] max-w-[350px] min-h-[420px] bg-gray-900/80 border border-blue-700 rounded-2xl shadow-xl p-6 flex flex-col justify-between items-start h-full transition-transform duration-300 hover:scale-105 hover:border-pink-400 cursor-pointer ${open ? 'z-20' : ''}`}
      onClick={() => setOpen(true)}>
      <h4 className="text-lg font-bold mb-2 text-blue-300">{title}</h4>
      <div className={codeBlockClass} style={codeBlockStyle}>
        {mounted && (
          <Highlight code={code} language={language as Language} theme={themes.duotoneDark}>
            {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
              <pre className={className + " text-xs p-3 m-0"} style={{ ...style, background: 'none' }}>
                {tokens.map((line: any, i: number) => {
                  const lineProps = getLineProps({ line, key: i });
                  const { key: lineKey, ...restLineProps } = lineProps;
                  return (
                    <div key={lineKey} {...restLineProps}>
                      {line.map((token: any, key: number) => {
                        const tokenProps = getTokenProps({ token, key });
                        const { key: tokenKey, ...restTokenProps } = tokenProps;
                        return <span key={tokenKey} {...restTokenProps} />;
                      })}
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
        )}
      </div>
      <p className="text-gray-300 text-sm mb-2">{description}</p>
      <button
        className="mt-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        onClick={e => { e.stopPropagation(); setOpen(true); }}
      >
        Learn more <FaArrowRight className="text-base" />
      </button>
      {open && mounted && (
        <Modal>
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setOpen(false)} aria-modal="true" role="dialog">
            <div className="bg-gray-900 border border-blue-700 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-3 right-4 text-gray-400 hover:text-pink-400 text-xl font-bold" onClick={() => setOpen(false)}>&times;</button>
              <h4 className="text-xl font-bold mb-4 text-blue-300">{title}</h4>
              <div className={codeBlockClass.replace('mb-2', 'mb-4')} style={{ ...codeBlockStyle, maxHeight: lineCount > 8 ? 320 : 'none' }}>
                <Highlight code={code} language={language as Language} theme={themes.duotoneDark}>
                  {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
                    <pre className={className + " text-sm p-4 m-0"} style={{ ...style, background: 'none' }}>
                      {tokens.map((line: any, i: number) => {
                        const lineProps = getLineProps({ line, key: i });
                        const { key: lineKey, ...restLineProps } = lineProps;
                        return (
                          <div key={lineKey} {...restLineProps}>
                            {line.map((token: any, key: number) => {
                              const tokenProps = getTokenProps({ token, key });
                              const { key: tokenKey, ...restTokenProps } = tokenProps;
                              return <span key={tokenKey} {...restTokenProps} />;
                            })}
                          </div>
                        );
                      })}
                    </pre>
                  )}
                </Highlight>
              </div>
              <div className="text-gray-200 text-base mb-2">{details}</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ message: '', type: null }), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Invalid email.";
    if (!form.message.trim()) errs.message = "Message is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    emailjs.send(
      'service_jr8bjo6',
      'template_z1qfeir',
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      'Qtw_7F6GzBARukVJW'
    )
    .then(
      (result) => {
        setNotification({ message: 'Message sent!', type: 'success' });
        setForm({ name: '', email: '', message: '' });
      },
      (error) => {
        setNotification({ message: 'Failed to send message. Please try again later.', type: 'error' });
      }
    );
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Toast Notification */}
      {notification.message && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all duration-300
          ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {notification.message}
        </div>
      )}
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col items-center w-80 min-h-screen bg-black/70 border-r border-gray-800 px-8 py-12 fixed left-0 top-0 z-20 shadow-2xl backdrop-blur-md">
        <img
          src="/1732760719879.jpg"
          alt="Jaydn D. Lemin profile picture"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-xl mb-6"
        />
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">Jaydn D. Lemin</h1>
        <h2 className="text-lg font-semibold text-gray-400 mb-4 text-center">Systems Specialist & Full Stack Developer</h2>
        <div className="text-gray-300 text-center mb-6">
          <div className="text-sm">Altoona, PA</div>
        </div>
        {/* Skills Section */}
        {/* Quick Facts Section */}
        <div className="w-full mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Quick Facts</h3>
          <ul className="flex flex-col gap-3 text-gray-200 text-sm bg-gray-800/80 rounded-xl p-4 border border-gray-700 shadow">
            <li><span className="font-semibold text-blue-400">8+ Years</span> Experience</li>
            <li><span className="font-semibold text-purple-400">Full Stack Developer</span></li>
            <li><span className="font-semibold text-green-400">Based in Altoona, PA</span></li>
            <li><span className="font-semibold text-pink-400">Open to Remote Work</span></li>
          </ul>
        </div>
        {/* Certifications Section */}
        {/* Removed Certifications section for a cleaner sidebar */}
        <div className="flex gap-4 mb-8">
          <a href="https://www.linkedin.com/in/jaydnlemin/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaLinkedin className="text-2xl" /></a>
          <a href="https://github.com/Lucid1608" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400"><FaGithub className="text-2xl" /></a>
          <a href="#" className="hover:text-blue-400"><FaTwitter className="text-2xl" /></a>
        </div>
        <div className="flex flex-col gap-2 mt-auto text-xs text-gray-600">
          <span>Last updated: 7/23/2025</span>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center ml-0 lg:ml-80 px-4 sm:px-8 lg:px-16 py-12 gap-16">
        {/* Hero Section */}
        <motion.section
          id="hero"
          className="w-full max-w-6xl px-8 lg:px-12 flex flex-col items-center justify-center py-32 gap-8 text-center relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={sectionVariants}
        >
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">Jaydn D. Lemin</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4">Systems Specialist & Full Stack Developer</h2>
          <p className="max-w-2xl mt-6 text-xl text-gray-200 bg-black/30 rounded-xl px-6 py-4 mx-auto backdrop-blur-md shadow-lg">Cybersecurity professional with expertise in IT infrastructure, web development, and system administration. Building secure, scalable solutions that drive business efficiency.</p>
          <a href="#contact" className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-xl hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition-transform text-lg">Contact Me</a>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="w-full max-w-5xl px-8 lg:px-12 py-24 flex flex-col items-center text-center border-b border-gray-800/60 mb-12 bg-white/10 dark:bg-black/30 rounded-3xl shadow-2xl backdrop-blur-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={sectionVariants}
        >
          <h3 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">About Me</h3>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">I'm a cybersecurity professional and systems specialist with expertise in IT infrastructure, web development, and system administration. I build secure, scalable solutions and maintain critical business systems while staying current with emerging technologies.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl">
            <motion.div 
              className="bg-gray-900/80 border border-blue-700 text-blue-200 rounded-2xl shadow-xl p-8 transform hover:scale-105 hover:border-blue-400 transition-all duration-300 backdrop-blur"
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0 }}
            >
              <div className="text-3xl font-extrabold mb-2">8+ Years</div>
              <div className="text-blue-300">Experience</div>
            </motion.div>
            <motion.div 
              className="bg-gray-900/80 border border-green-700 text-green-200 rounded-2xl shadow-xl p-8 transform hover:scale-105 hover:border-green-400 transition-all duration-300 backdrop-blur"
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="text-3xl font-extrabold mb-2">Security</div>
              <div className="text-green-300">Focused</div>
            </motion.div>
            <motion.div 
              className="bg-gray-900/80 border border-purple-700 text-purple-200 rounded-2xl shadow-xl p-8 transform hover:scale-105 hover:border-purple-400 transition-all duration-300 backdrop-blur"
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="text-3xl font-extrabold mb-2">Problem</div>
              <div className="text-purple-300">Solver</div>
            </motion.div>
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section
          id="tech"
          className="w-full max-w-5xl px-8 lg:px-12 py-20 flex flex-col items-center text-center border-b border-gray-800/60 mb-12 bg-white/10 dark:bg-black/30 rounded-3xl shadow-2xl backdrop-blur-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">Tech Stack</h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "Framer Motion", "Python"].map((tech, idx) => (
              <motion.span
                key={tech}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-lg font-medium shadow flex items-center gap-2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                <span className="text-4xl">{techIcons[tech]}</span>
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* How I Work Section (Reimagined) */}
        <motion.section
          id="approach"
          className="w-full max-w-5xl px-8 lg:px-12 py-20 flex flex-col items-center text-center border-b border-gray-800/60 mb-12 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-pink-900/20 rounded-3xl shadow-2xl backdrop-blur-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          {/* Bold Intro */}
          <motion.h3 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            How I Work
          </motion.h3>
          <motion.p className="text-xl text-gray-200 mb-10 font-semibold" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            I build secure, scalable, and maintainable solutions—always with the user in mind.
          </motion.p>

          {/* Animated Workflow Timeline */}
          <div className="flex flex-row items-center justify-center gap-0 mb-12 w-full max-w-2xl">
            <WorkflowStep icon={<FaRegLightbulb className="text-yellow-300 text-3xl" />} label="Plan" delay={0} />
            <WorkflowArrow />
            <WorkflowStep icon={<FaCode className="text-blue-400 text-3xl" />} label="Code" delay={0.1} />
            <WorkflowArrow />
            <WorkflowStep icon={<FaCheckCircle className="text-green-400 text-3xl" />} label="Test" delay={0.2} />
            <WorkflowArrow />
            <WorkflowStep icon={<FaShieldAlt className="text-purple-400 text-3xl" />} label="Secure" delay={0.3} />
            <WorkflowArrow />
            <WorkflowStep icon={<FaRocket className="text-pink-400 text-3xl" />} label="Deploy" delay={0.4} />
          </div>

          {/* Animated Skill Badges */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {[
              { icon: <SiNextdotjs />, name: "Next.js", color: "from-blue-400 to-gray-900" },
              { icon: <SiReact />, name: "React", color: "from-blue-400 to-cyan-400" },
              { icon: <SiTypescript />, name: "TypeScript", color: "from-blue-500 to-blue-900" },
              { icon: <SiPython />, name: "Python", color: "from-yellow-400 to-blue-400" },
              { icon: <SiTailwindcss />, name: "Tailwind", color: "from-cyan-400 to-blue-900" },
              { icon: <SiNodedotjs />, name: "Node.js", color: "from-green-400 to-gray-900" },
              { icon: <SiDocker />, name: "Docker", color: "from-blue-400 to-blue-900" },
              { icon: <SiGit />, name: "Git", color: "from-orange-400 to-gray-900" },
              { icon: <SiCloudflare />, name: "Cloudflare", color: "from-yellow-400 to-orange-400" },
              { icon: <FaShieldAlt />, name: "Security", color: "from-purple-400 to-blue-900" },
            ].map((item, idx) => (
              <motion.span
                key={item.name}
                className={`flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r ${item.color} text-white font-semibold shadow-lg text-lg cursor-pointer hover:scale-110 transition-transform duration-200`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
              >
                <span className="text-2xl">{item.icon}</span> {item.name}
              </motion.span>
            ))}
          </div>

          {/* Personal Philosophy Quote */}
          <blockquote className="italic text-lg text-gray-300 mt-4 max-w-2xl mx-auto border-l-4 border-blue-400 pl-6 py-2">
            “Great code is secure, readable, and built for people.”
          </blockquote>
        </motion.section>
        {/* How I Work Section */}
        <motion.section
          id="github"
          className="w-full max-w-5xl px-8 lg:px-12 py-16 flex flex-col items-center text-center border-b border-gray-800/60 mb-12 bg-white/10 dark:bg-black/30 rounded-3xl shadow-2xl backdrop-blur-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">Find Me on GitHub</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            While much of my work is confidential, I am committed to open source and continuous learning. Connect with me on GitHub to follow my public projects and contributions.
          </p>
          <a
            href="https://github.com/Lucid1608"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-xl hover:scale-105 transition-transform text-lg"
          >
            View My GitHub
          </a>
        </motion.section>
        {/* Software Used Section */}
        <motion.section
          id="software"
          className="w-full max-w-5xl px-8 lg:px-12 py-16 flex flex-col items-center text-center border-b border-gray-800/60 mb-12 bg-white/10 dark:bg-black/30 rounded-3xl shadow-2xl backdrop-blur-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">Software Used</h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { icon: techIcons["VS Code"], name: "VS Code" },
              { icon: techIcons["Figma"], name: "Figma" },
              { icon: techIcons["Docker"], name: "Docker" },
              { icon: techIcons["Postman"], name: "Postman" },
              { icon: techIcons["Git"], name: "Git" },
              { icon: techIcons["Jira"], name: "Jira" },
              { icon: techIcons["Photoshop"], name: "Photoshop" },
              { icon: techIcons["VMWare"], name: "VMWare" },
              { icon: techIcons["CloudFlare"], name: "CloudFlare" },
              { icon: techIcons["AWS"], name: "AWS" },
              { icon: <span className="text-4xl"><FaPlusCircle /></span>, name: "& more" },
            ].map((item, idx) => (
              <motion.span
                key={item.name}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-lg font-medium shadow flex items-center gap-2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                <span className="text-4xl">{item.icon}</span>
                {item.name}
              </motion.span>
            ))}
          </div>
        </motion.section>
        {/* Education Section */}
        <motion.section
          id="education"
          className="w-full max-w-4xl px-8 lg:px-12 py-16 flex flex-col items-center text-center border-b border-gray-800/60 mb-12 bg-white/10 dark:bg-black/30 rounded-3xl shadow-2xl backdrop-blur-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">Education</h3>
          <div className="flex flex-col gap-6 w-full items-center">
            <motion.div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex items-center gap-4 w-full max-w-xl mx-auto" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-4xl text-blue-500"><FaShieldAlt /></span>
              <div className="text-left">
                <div className="font-semibold text-lg">Allegany College of Maryland</div>
                <div className="text-gray-500 dark:text-gray-400">A.A.S Cybersecurity</div>
              </div>
            </motion.div>
            <motion.div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex items-center gap-4 w-full max-w-xl mx-auto" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
              <span className="text-4xl text-blue-500"><SiReact /></span>
              <div className="text-left">
                <div className="font-semibold text-lg">SNHU</div>
                <div className="text-gray-500 dark:text-gray-400">B.S Computer Science</div>
              </div>
            </motion.div>
          </div>
        </motion.section>
        {/* Work Experience Section */}
        <motion.section
          id="work"
          className="w-full max-w-4xl px-8 lg:px-12 py-16 flex flex-col items-center text-center border-b border-gray-800/60 mb-12 bg-white/10 dark:bg-black/30 rounded-3xl shadow-2xl backdrop-blur-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">Work Experience</h3>
          <div className="flex flex-col gap-6 w-full items-center">
            <motion.div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex items-center gap-4 w-full max-w-xl mx-auto" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-4xl text-green-500"><SiNextdotjs /></span>
              <div className="text-left">
                <div className="font-semibold text-lg">C-Store Corporate</div>
                <div className="text-gray-500 dark:text-gray-400">Systems Specialist</div>
                <div className="text-sm text-gray-400">2019 - 2025</div>
                <ul className="list-disc ml-5 mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>Built and maintained internal tools and applications</li>
                  <li>Managed and maintained the company's IT infrastructure</li>
                  <li>Provided technical support to employees</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="w-full max-w-2xl px-8 lg:px-12 py-20 flex flex-col items-center text-center bg-white/10 dark:bg-black/30 rounded-3xl shadow-2xl backdrop-blur-md mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">Contact</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Let’s work together! Reach out via the form below or connect on social media.</p>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.name} onChange={handleChange} />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            <input type="email" name="email" placeholder="Your Email" className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.email} onChange={handleChange} />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            <textarea name="message" placeholder="Your Message" rows={4} className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.message} onChange={handleChange} />
            {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
            <button type="submit" className="mt-2 px-8 py-3 rounded-full bg-foreground text-background font-semibold shadow-lg hover:scale-105 transition-transform">Send Message</button>
          </form>
          <div className="flex gap-6 mt-8 justify-center">
            <a href="#" className="hover:text-blue-500"><FaLinkedin className="inline mr-2 text-xl align-middle" />LinkedIn</a>
            <a href="https://github.com/Lucid1608" className="hover:text-blue-500"><FaGithub className="inline mr-2 text-xl align-middle" />GitHub</a>
            <a href="#" className="hover:text-blue-500"><FaTwitter className="inline mr-2 text-xl align-middle" />Twitter</a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

function WorkflowStep({ icon, label, delay }: { icon: React.ReactNode; label: string; delay: number }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 min-w-[70px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="bg-black/60 rounded-full p-3 shadow-lg mb-1">{icon}</div>
      <span className="text-xs text-gray-200 font-semibold tracking-wide uppercase">{label}</span>
    </motion.div>
  );
}
function WorkflowArrow() {
  return <span className="mx-2 text-2xl text-blue-400">→</span>;
}
function ThemeDemoToggle() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setDark(document.documentElement.classList.contains('dark'));
    }
  }, []);
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  };
  return (
    <button
      className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold shadow-lg border-2 border-blue-400 transition-colors duration-300 ${dark ? 'bg-gray-900 text-blue-200' : 'bg-white text-blue-700'}`}
      onClick={toggleTheme}
      aria-label="Toggle theme demo"
    >
      {dark ? <FaRegLightbulb className="text-yellow-300" /> : <FaRegLightbulb className="text-blue-400" />}
      {dark ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}
