import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Github, Linkedin, Mail, ExternalLink, MapPin, Calendar, Twitter, Clock, Copy, Check, Music, Code2, Terminal, Cpu, Box, Brain } from 'lucide-react';

export const ProfileCard = () => {
    const [time, setTime] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Jerusalem',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            setTime(now.toLocaleTimeString('en-GB', options));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCopyEmail = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText('gllip80@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const container = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.02}
            transitionSpeed={2000}
            className="tilt-wrapper"
        >
            <motion.div
                className="profile-card"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <div className="profile-header">
                    <motion.div
                        className="avatar-container"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img
                            src="https://github.com/glip80.png"
                            alt="Glip80"
                            className="avatar"
                        />
                        <div className="status-indicator" title="Online" />
                    </motion.div>

                    <motion.div variants={item} className="profile-info">
                        <h1 className="name">Alexander Polyakov</h1>
                        <p className="handle">@glip80</p>
                        <p className="bio">Software Developer. Passionate about building modern web experiences.</p>

                        <div className="meta-info">
                            <span className="meta-item">
                                <MapPin size={14} /> Global
                            </span>
                            <span className="meta-item">
                                <Calendar size={14} /> Joined Github 2023
                            </span>
                            <span className="meta-item location-time">
                                <Clock size={14} /> {time} (IL)
                            </span>
                        </div>

                        <div className="tech-stack">
                            <div className="tech-badge" title="React"><Code2 size={14} /> <span>React</span></div>
                            <div className="tech-badge" title="TypeScript"><Terminal size={14} /> <span>TS</span></div>
                            <div className="tech-badge" title="C#"><Box size={14} /> <span>C#</span></div>
                            <div className="tech-badge" title="AI Models"><Brain size={14} /> <span>AI</span></div>
                            <div className="tech-badge" title="Kubernetes"><Cpu size={14} /> <span>K8s</span></div>
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={item} className="actions">
                    <a
                        href="https://github.com/glip80"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn github"
                    >
                        <Github size={20} />
                        <span>GitHub</span>
                        <ExternalLink size={14} className="external-icon" />
                    </a>

                    <a
                        href="https://x.com/Glip80"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn twitter"
                    >
                        <Twitter size={20} />
                        <span>X (Twitter)</span>
                        <ExternalLink size={14} className="external-icon" />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/alexpolyakov/"
                        target="_blank"
                        className="action-btn linkedin"
                    >
                        <Linkedin size={20} />
                        <span>LinkedIn</span>
                        <ExternalLink size={14} className="external-icon" />
                    </a>

                    <a
                        href="mailto:gllip80@gmail.com"
                        className="action-btn email"
                        onClick={handleCopyEmail}
                        style={{ position: 'relative' }}
                    >
                        {copied ? <Check size={20} /> : <Mail size={20} />}
                        <span>{copied ? 'Copied!' : 'Email Me'}</span>
                        <button className="copy-btn-icon" title="Copy to clipboard">
                            <Copy size={16} />
                        </button>
                        <AnimatePresence>
                            {copied && (
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="tooltip-copied"
                                >
                                    Copied!
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </a>

                    <div className="music-widget">
                        <div className="music-icon">
                            <Music size={16} />
                        </div>
                        <div className="music-info">
                            <span className="music-status">Coding Vibe</span>
                            <div className="visualizer">
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </Tilt>
    );
};
