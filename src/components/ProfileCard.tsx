import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, MapPin, Calendar } from 'lucide-react';

export const ProfileCard = () => {
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
                    <p className="bio">Full Stack Developer. Passionate about building modern web experiences.</p>

                    <div className="meta-info">
                        <span className="meta-item">
                            <MapPin size={14} /> Global
                        </span>
                        <span className="meta-item">
                            <Calendar size={14} /> Joined Github 2023
                        </span>
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
                    href="#"
                    className="action-btn linkedin"
                    onClick={(e) => { e.preventDefault(); alert('LinkedIn not provided yet'); }}
                >
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                    <ExternalLink size={14} className="external-icon" />
                </a>

                <a
                    href="mailto:gllip80@gmail.com"
                    className="action-btn email"
                >
                    <Mail size={20} />
                    <span>Email Me</span>
                </a>
            </motion.div>
        </motion.div>
    );
};
