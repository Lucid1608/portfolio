"use client";
import React, { useState, useEffect } from "react";
import { motion, circOut } from "framer-motion";
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiFramer, SiSocketdotio, SiVercel, SiSass, SiExpress, SiMongodb, SiPython } from "react-icons/si";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import Carousel from "../components/Carousel";
import { SiVscodium, SiFigma, SiDocker, SiPostman, SiGit, SiJira, SiAdobephotoshop, SiVmware, SiCloudflare, SiAmazon } from "react-icons/si";
import { FaQuestionCircle, FaPlusCircle, FaShieldAlt } from "react-icons/fa";

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

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [loading, setLoading] = useState(true);
  const [typed, setTyped] = useState(0);
  const loadingText = "Booting portfolio...";

  useEffect(() => {
    if (loading) {
      if (typed < loadingText.length) {
        const timeout = setTimeout(() => setTyped(typed + 1), 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timeout);
      }
    }
  }, [typed, loading]);

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
    // TODO: Integrate EmailJS here
    // Example: emailjs.sendForm(...)
    alert("Message sent! (EmailJS integration pending)");
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-green-400 text-lg sm:text-2xl font-mono transition-opacity duration-700 select-none">
          <span>
            <TypewriterText text={loadingText} delay={40} />
          </span>
          <style>{`
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            .animate-blink { animation: blink 1s steps(1) infinite; }
          `}</style>
        </div>
      )}
      <div className={`font-sans min-h-screen bg-background text-foreground flex flex-col items-center transition-opacity duration-700 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Hero Section */}
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-400/60 via-purple-400/40 to-pink-400/30 blur-2xl animate-gradient-move"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: '100% 50%' }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.section
          id="hero"
          className="w-full flex flex-col items-center justify-center py-24 gap-6 text-center relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={sectionVariants}
        >
          <img
            src="1732760719879.jpg"
            alt="Jaydn D. Lemin profile picture"
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-400 shadow-lg mb-6"
          />
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4">Jaydn D. Lemin</h1>
          <h2 className="text-xl sm:text-2xl font-medium text-gray-500 dark:text-gray-400">Systems Specialist & Full Stack Developer</h2>
          <p className="max-w-xl mt-6 text-lg text-gray-600 dark:text-gray-300">
            Cybersecurity professional with expertise in IT infrastructure, web development, and system administration. Building secure, scalable solutions that drive business efficiency.
          </p>
          <a href="#contact" className="mt-8 px-8 py-3 rounded-full bg-foreground text-background font-semibold shadow-lg hover:scale-105 transition-transform">Contact Me</a>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="w-full max-w-3xl py-20 px-4 flex flex-col items-center text-center border-b border-gray-200 dark:border-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={sectionVariants}
        >
          <h3 className="text-3xl font-bold mb-4">About Me</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            I’m a passionate developer with experience in building scalable web apps, designing delightful UIs, and solving complex problems. I love working with modern technologies and always strive to learn more.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div 
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl shadow-lg p-6 transform hover:scale-105 hover:border-blue-500 transition-all duration-300" 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0 }}
            >
              <div className="text-2xl font-bold mb-2 text-blue-400">8+ Years</div>
              <div className="text-gray-300">Experience</div>
            </motion.div>
            <motion.div 
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl shadow-lg p-6 transform hover:scale-105 hover:border-green-500 transition-all duration-300" 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="text-2xl font-bold mb-2 text-green-400">Security</div>
              <div className="text-gray-300">Focused</div>
            </motion.div>
            <motion.div 
              className="bg-gray-800 border border-gray-700 text-gray-100 rounded-xl shadow-lg p-6 transform hover:scale-105 hover:border-purple-500 transition-all duration-300" 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="text-2xl font-bold mb-2 text-purple-400">Problem</div>
              <div className="text-gray-300">Solver</div>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="w-full max-w-5xl py-20 px-4 flex flex-col items-center text-center border-b border-gray-200 dark:border-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
        >
          <h3 className="text-3xl font-bold mb-8">Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-0 flex flex-col items-start cursor-pointer"
                custom={i}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                    style={{ minHeight: 160 }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 w-full">
                  <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium shadow">
                        {techIcons[tech]}
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <a href={project.demo} className="text-blue-600 dark:text-blue-400 hover:underline">Demo</a>
                    <a href={project.github} className="text-gray-500 hover:underline">GitHub</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section
          id="tech"
          className="w-full max-w-4xl py-20 px-4 flex flex-col items-center text-center border-b border-gray-200 dark:border-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
          <Carousel
            items={[
              { icon: <div className="text-4xl mb-2">{techIcons["Next.js"]}</div>, name: "Next.js" },
              { icon: <div className="text-4xl mb-2">{techIcons["React"]}</div>, name: "React" },
              { icon: <div className="text-4xl mb-2">{techIcons["TypeScript"]}</div>, name: "TypeScript" },
              { icon: <div className="text-4xl mb-2">{techIcons["Tailwind"]}</div>, name: "Tailwind" },
              { icon: <div className="text-4xl mb-2">{techIcons["Node.js"]}</div>, name: "Node.js" },
              { icon: <div className="text-4xl mb-2">{techIcons["Framer Motion"]}</div>, name: "Framer Motion" },
              { icon: <div className="text-4xl mb-2">{techIcons["Python"]}</div>, name: "Python" },
            ]}
          />
        </motion.section>
        {/* Software Carousel Section */}
        <motion.section
          id="software"
          className="w-full max-w-3xl py-16 px-4 flex flex-col items-center text-center border-b border-gray-200 dark:border-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-bold mb-6">Software Used</h3>
          <Carousel
            items={[
              { icon: <SiVscodium />, name: "VS Code" },
              { icon: <SiFigma />, name: "Figma" },
              { icon: <SiDocker />, name: "Docker" },
              { icon: <SiPostman />, name: "Postman" },
              { icon: <SiGit />, name: "Git" },
              { icon: <SiJira />, name: "Jira" },
              { icon: <SiAdobephotoshop />, name: "Photoshop" },
              { icon: <SiVmware />, name: "VMWare" },
              { icon: <SiCloudflare />, name: "CloudFlare" },
              { icon: <SiAmazon />, name: "AWS" },
              { icon: <FaPlusCircle />, name: "& more" },
            ]}
          />
        </motion.section>
        {/* Education Section */}
        <motion.section
          id="education"
          className="w-full max-w-3xl py-16 px-4 flex flex-col items-center text-center border-b border-gray-200 dark:border-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-bold mb-6">Education</h3>
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
          className="w-full max-w-3xl py-16 px-4 flex flex-col items-center text-center border-b border-gray-200 dark:border-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h3 className="text-2xl font-bold mb-6">Work Experience</h3>
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
          className="w-full max-w-xl py-20 px-4 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h3 className="text-3xl font-bold mb-4">Contact</h3>
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
            <a href="#" className="hover:text-blue-500"><FaGithub className="inline mr-2 text-xl align-middle" />GitHub</a>
            <a href="#" className="hover:text-blue-500"><FaTwitter className="inline mr-2 text-xl align-middle" />Twitter</a>
          </div>
        </motion.section>
    </div>
    </>
  );
}
