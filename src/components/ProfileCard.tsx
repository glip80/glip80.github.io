import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useAnalytics } from '../hooks/useAnalytics';
import { Github, Linkedin, Mail, MapPin, Twitter, Clock, Check, Code2, Cpu, Box } from 'lucide-react';

export const ProfileCard = () => {
    const { trackVisit } = useAnalytics();
    const [time, setTime] = useState('');
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

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
        trackVisit('copy_email', 'glip80@gmail.com');
        navigator.clipboard.writeText('glip80@gmail.com');
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
            tiltMaxAngleX={isExpanded ? 0 : 5}
            tiltMaxAngleY={isExpanded ? 0 : 5}
            scale={isExpanded ? 1 : 1.02}
            transitionSpeed={2000}
            className={`tilt-wrapper ${isExpanded ? 'expanded' : ''}`}
        >
            <motion.div
                className={`profile-card ${isExpanded ? 'expanded' : ''}`}
                variants={container}
                initial="hidden"
                animate="visible"
                layout
            >
                <div className="profile-header">
                    <motion.div
                        className="avatar-container"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        layout
                    >
                        <img
                            src="https://github.com/glip80.png"
                            alt="Glip80"
                            className="avatar"
                        />
                        <div className="status-indicator" title="Online" />
                    </motion.div>

                    <motion.div variants={item} className="profile-info" layout>
                        <h1 className="name">Alexander Polyakov</h1>
                        <h2 className="role-title">Backend Software Developer | Tech Lead</h2>
                        <p className="bio">
                            Senior Software Engineer with 20+ years of experience in backend infrastructure, big data, and cloud-native environments.
                            Expert in designing high-availability solutions for FinTech and AdTech sectors.
                        </p>

                        <div className="meta-info">
                            <span className="meta-item">
                                <MapPin size={14} /> Herzliya, Israel
                            </span>
                            <span className="meta-item location-time">
                                <Clock size={14} /> {time} (IL)
                            </span>
                        </div>

                        {!isExpanded && (
                            <div className="tech-stack">
                                <div className="tech-badge"><Code2 size={14} /> <span>C#</span></div>
                                <div className="tech-badge"><Code2 size={14} /> <span>Java</span></div>
                                <div className="tech-badge"><Code2 size={14} /> <span>Scala</span></div>
                                <div className="tech-badge"><Cpu size={14} /> <span>Azure/AWS</span></div>
                                <div className="tech-badge"><Box size={14} /> <span>K8s</span></div>
                            </div>
                        )}
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="expanded-content"
                        >
                            <div className="section">
                                <h3>Technical Skills</h3>
                                <div className="skills-grid">
                                    <div className="skill-category">
                                        <h4>Languages</h4>
                                        <div className="skill-tags">
                                            <span>C#</span><span>Java</span><span>Scala</span><span>JavaScript</span><span>Python</span>
                                        </div>
                                    </div>
                                    <div className="skill-category">
                                        <h4>Cloud & DevOps</h4>
                                        <div className="skill-tags">
                                            <span>Azure</span><span>AWS</span><span>Docker</span><span>K8s (AKS)</span><span>Helm</span><span>CI/CD</span>
                                        </div>
                                    </div>
                                    <div className="skill-category">
                                        <h4>Data</h4>
                                        <div className="skill-tags">
                                            <span>SQL</span><span>MongoDB</span><span>Redis</span><span>Exasol</span><span>BigQuery</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div variants={item} className="actions" layout>
                    <button
                        className="action-btn expand-btn"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? 'Show Less' : 'View Full Profile'}
                    </button>

                    <div className="social-links">
                        <a
                            href="https://github.com/glip80"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn github"
                            onClick={() => trackVisit('link_click', 'GitHub')}
                        >
                            <Github size={20} />
                        </a>

                        <a
                            href="https://x.com/Glip80"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn twitter"
                            onClick={() => trackVisit('link_click', 'Twitter')}
                        >
                            <Twitter size={20} />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/alexpolyakov/"
                            target="_blank"
                            className="action-btn linkedin"
                            onClick={() => trackVisit('link_click', 'LinkedIn')}
                        >
                            <Linkedin size={20} />
                        </a>

                        <a
                            href="mailto:glip80@gmail.com"
                            className="action-btn email"
                            onClick={handleCopyEmail}
                        >
                            {copied ? <Check size={20} /> : <Mail size={20} />}
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </Tilt>
    );
};
