import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Box,
  Check,
  Compass,
  Eye,
  Layers,
  LayoutGrid,
  Mail,
  Menu,
  PenTool,
  Phone,
  Ruler,
  ScanLine,
  Sun,
  X,
} from 'lucide-react';
import './style.css';

const instagramUrl = 'https://www.instagram.com/one8interiors/';
const contactEmail = 'one8interiors.in@gmail.com';
const contactPhone = '+91 89787 14130';
const contactPhoneLink = '+918978714130';

const photos = {
  hero: 'photo-1600210492486-724fe5c67fb0',
  about: 'photo-1600607687939-ce8a6c25118c',
  living: 'photo-1600210492493-0946911123ea',
  room: 'photo-1600607687920-4e2a09cf159d',
  kitchen: 'photo-1600607687644-c7171b42498f',
  detail: 'photo-1600566753086-00f18fb6b3ea',
};

const imageUrl = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const navigation = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Why us', '#why'],
  ['Contact', '#contact'],
];

const services = [
  {
    title: 'Client Consultation',
    description:
      'Understanding your vision, requirements, lifestyle, and design expectations through in-depth architectural dialogue.',
    detail: 'Design Brief & Spatial Strategy',
    Icon: Compass,
  },
  {
    title: 'Conceptual Drawing',
    description:
      'Transforming initial ideas into creative design concepts that set the aesthetic tone and artistic direction.',
    detail: 'Mood Boards & Hand Concept Sketches',
    Icon: PenTool,
  },
  {
    title: 'Space Planning',
    description:
      'Creating functional layouts that maximise the potential of every space, optimising flow and ergonomic balance.',
    detail: 'Zoning & Circulation Schematics',
    Icon: LayoutGrid,
  },
  {
    title: '2D Drawing & Floor Plan',
    description:
      'Detailed architectural drawings and floor plans to bring clarity, precision, and purpose to every space.',
    detail: 'Technical Plans & Dimensions',
    Icon: Ruler,
  },
  {
    title: 'Material & Furniture Selection',
    description:
      'Thoughtful selections of materials, finishes, furniture, and textures, tailored to your space and way of living.',
    detail: 'Finishes & Furniture Schedules',
    Icon: Layers,
  },
  {
    title: 'Lighting Design',
    description:
      'Designing lighting solutions that enhance atmosphere while supporting the everyday function of each space.',
    detail: 'Lighting Plans & Fixture Selection',
    Icon: Sun,
  },
  {
    title: 'Elevations',
    description:
      'Detailed interior elevations that communicate dimensions, finishes, and the finer details of your design.',
    detail: 'Interior Elevations & Details',
    Icon: ScanLine,
  },
  {
    title: '3D Designs / Renders',
    description:
      'Realistic visualisations that bring the proposed materials, furnishings, and spatial composition to life.',
    detail: 'Photorealistic 3D Views',
    Icon: Box,
  },
  {
    title: '3D Walkthroughs',
    description:
      'Immersive walkthroughs to help you experience the flow, scale, and atmosphere of a design before it takes shape.',
    detail: 'Immersive Design Walkthrough',
    Icon: Eye,
  },
];

const projects = [
  {
    id: 'residential-living',
    category: 'Residential',
    title: 'Residential Living',
    image: '/images/portfolio/residential-living.jpg',
  },
  {
    id: 'residential-lounge',
    category: 'Residential',
    title: 'Residential Lounge',
    image: '/images/portfolio/residential-lounge.jpg',
  },
  {
    id: 'cafe-restaurant',
    category: 'Commercial',
    title: 'Café & Restaurant',
    image: '/images/portfolio/cafe-restaurant.jpg',
  },
  {
    id: 'restaurant-bar',
    category: 'Commercial',
    title: 'Restaurant Bar & Dining',
    image: '/images/portfolio/restaurant-bar.jpg',
  },
  {
    id: 'institutional-interior',
    category: 'Institutional',
    title: 'Institutional Interior',
    image: '/images/portfolio/institutional-interior.jpg',
  },
];

const values = [
  'Creative & purposeful designs',
  'Functional space planning',
  'Attention to detail',
  'Timeless aesthetics',
  'Sustainable design approach',
  'Client-focused process',
];

const process = [
  'Consultation',
  'Concept development',
  'Space planning',
  'Design & material selection',
  '3D visualisation',
  'Final design presentation',
];

function InstagramMark({ size = 17 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.75, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function BrandLogo({ footer = false }) {
  return (
    <a
      href="#home"
      className={`brand-logo${footer ? ' brand-logo-footer' : ''}`}
      aria-label="ONE 8 INTERIORS — home"
    >
      <img src="/images/one8-interiors-logo.png" alt="ONE 8 INTERIORS" />
    </a>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const categories = ['All', ...new Set(projects.map((project) => project.category))];
  const visibleProjects =
    category === 'All'
      ? projects
      : projects.filter((project) => project.category === category);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedProject]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
        <BrandLogo />
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">
          Start a conversation <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <main>
        <section
          className="hero"
          id="home"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(28, 25, 21, .53), rgba(28, 25, 21, .08)), url(${imageUrl(photos.hero, 2200)})`,
          }}
        >
          <div className="hero-copy">
            <motion.p
              className="eyebrow eyebrow-light"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              INTERIOR DESIGN STUDIO
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Spaces that
              <br />
              <i>tell your story.</i>
            </motion.h1>
            <motion.p
              className="hero-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              Thoughtfully designed interiors that bring together functionality, aesthetics and
              timeless elegance.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <a className="button button-ivory" href="#projects">
                Explore our work <ArrowRight size={16} />
              </a>
              <a className="text-link text-link-light" href="#contact">
                Let’s talk <ArrowUpRight size={15} />
              </a>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#about">
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown size={15} />
          </a>
          <span className="hero-index">ONE 8 — INTERIORS</span>
        </section>

        <section className="about section-pad" id="about">
          <Reveal className="about-photo">
            <img
              src={imageUrl(photos.about)}
              alt="Sunlit living space with natural materials and a soft neutral palette"
              loading="lazy"
            />
            <span className="photo-note">A thoughtful balance of form & feeling</span>
          </Reveal>
          <Reveal className="about-copy" delay={0.12}>
            <p className="eyebrow">ABOUT ONE 8 INTERIORS</p>
            <h2>
              Spaces designed
              <br />
              <i>with intention.</i>
            </h2>
            <div className="bronze-rule" />
            <p>
              ONE 8 INTERIORS designs all types of spaces — residential, commercial, institutional,
              hospital and industrial.
            </p>
            <p>
              We focus on functional, aesthetic and purposeful design tailored to each project’s
              needs. Our approach blends creativity with practical planning to bring every space to
              life.
            </p>
            <a className="text-link" href="#services">
              Discover our approach <ArrowRight size={16} />
            </a>
          </Reveal>
        </section>

        <section className="services section-pad" id="services">
          <Reveal className="section-heading">
            <p className="eyebrow">WHAT WE DO</p>
            <h2>
              Thoughtfully designed.
              <br />
              <i>Beautifully delivered.</i>
            </h2>
            <p>
              Considered design support from the first conversation through the final visualisation.
            </p>
          </Reveal>
          <div className="service-grid">
            {services.map(({ title, description, detail, Icon }, index) => (
              <Reveal key={title} delay={(index % 3) * 0.05}>
                <article className="service-card">
                  <div className="service-card-top">
                    <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="service-icon">
                      <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="service-card-copy">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <div className="service-card-detail">
                    <span>{detail}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="portfolio section-pad" id="projects">
          <Reveal className="portfolio-heading">
            <div>
              <p className="eyebrow">A VISUAL STUDY</p>
              <h2>
                Our spaces.
                <br />
                <i>Our stories.</i>
              </h2>
            </div>
            <a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">
              More on Instagram <ArrowUpRight size={16} />
            </a>
          </Reveal>
          <div className="project-filters" role="group" aria-label="Filter images by space type">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? 'is-active' : ''}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <Reveal key={project.id} delay={(index % 2) * 0.06}>
                <button
                  className={`project-card${project.shape ? ` ${project.shape}` : ''}`}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View ${project.title.toLowerCase()} project visualisation`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} interior visualisation`}
                    loading="lazy"
                  />
                  <span className="project-overlay">
                    <span>
                      <small>{project.category} · PROJECT VISUALISATION</small>
                      <b>{project.title}</b>
                    </span>
                    <span className="round-arrow">
                      <ArrowUpRight size={18} />
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
          <p className="gallery-note">
            Selected interior visualisations from the ONE 8 INTERIORS portfolio.
          </p>
        </section>

        <section className="why" id="why">
          <div
            className="why-image"
            role="img"
            aria-label="Warm neutral interior detail with natural textures"
            style={{ backgroundImage: `url(${imageUrl(photos.detail, 1500)})` }}
          />
          <div className="why-content">
            <Reveal>
              <p className="eyebrow">THE ONE 8 APPROACH</p>
              <h2>
                WHY ONE 8
                <br />
                <i>INTERIORS?</i>
              </h2>
              <p className="why-lead">
                Your vision, our design — crafted with creativity, precision, and a stress-free
                process.
              </p>
              <p>
                We blend sustainability, timeless style, and modern trends for spaces that inspire.
              </p>
              <div className="value-grid">
                {values.map((value) => (
                  <div key={value}>
                    <span>
                      <Check size={14} />
                    </span>
                    {value}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="process section-pad">
          <Reveal className="section-heading centered">
            <p className="eyebrow">A CLEAR, CONSIDERED JOURNEY</p>
            <h2>
              From vision
              <br />
              <i>to reality.</i>
            </h2>
          </Reveal>
          <div className="process-grid">
            {process.map((step, index) => (
              <Reveal key={step} delay={index * 0.06}>
                <div className="process-item">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="instagram section-pad">
          <Reveal>
            <p className="eyebrow">
              <InstagramMark size={14} /> FOLLOW ALONG
            </p>
            <div className="instagram-heading">
              <h2>
                Follow our
                <br />
                <i>design journey.</i>
              </h2>
              <a
                className="button button-outline"
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                Follow us on Instagram <ArrowUpRight size={15} />
              </a>
            </div>
          </Reveal>
          <div className="instagram-grid">
            {[photos.living, photos.kitchen, photos.room, photos.about].map((image, index) => (
              <a
                href={instagramUrl}
                key={`${image}-${index}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Visit ONE 8 INTERIORS on Instagram"
              >
                <img
                  src={imageUrl(image, 650)}
                  alt={`Interior design editorial placeholder ${index + 1}`}
                  loading="lazy"
                />
                <span>
                  <InstagramMark size={19} />
                </span>
              </a>
            ))}
          </div>
          <p className="gallery-note">
            Follow our Instagram for the latest studio updates. Gallery images shown here are
            placeholders.
          </p>
        </section>

        <section className="contact section-pad" id="contact">
          <Reveal className="contact-copy">
            <p className="eyebrow eyebrow-light">YOUR NEXT CHAPTER</p>
            <h2>
              Let’s create
              <br />
              <i>something beautiful.</i>
            </h2>
            <p>
              Have a space in mind? Let’s discuss your ideas and bring your vision to life.
            </p>
            <div className="contact-methods">
              <a href={`mailto:${contactEmail}`}>
                <Mail size={17} aria-hidden="true" />
                <span>{contactEmail}</span>
              </a>
              <a href={`tel:${contactPhoneLink}`}>
                <Phone size={17} aria-hidden="true" />
                <span>{contactPhone}</span>
              </a>
            </div>
            <a
              className="text-link text-link-light"
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramMark size={16} /> Connect on Instagram <ArrowUpRight size={15} />
            </a>
          </Reveal>
          <Reveal className="form-wrap" delay={0.1}>
            {submitted ? (
              <div className="success-message" role="status">
                <Check size={25} />
                <h3>Thank you for reaching out.</h3>
                <p>
                  This preview doesn’t send or store enquiries. Please contact ONE 8 INTERIORS
                  directly by email or phone.
                </p>
                <div className="success-contact-links">
                  <a className="button button-outline" href={`mailto:${contactEmail}`}>
                    Email us <Mail size={15} />
                  </a>
                  <a className="button button-outline" href={`tel:${contactPhoneLink}`}>
                    Call us <Phone size={15} />
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <label>
                  Full name
                  <input autoComplete="name" name="name" placeholder="Your name" required />
                </label>
                <label>
                  Email address
                  <input
                    autoComplete="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label>
                  Phone number <span className="optional">(optional)</span>
                  <input autoComplete="tel" name="phone" type="tel" placeholder="Your number" />
                </label>
                <label>
                  Type of project
                  <select name="project" defaultValue="" required>
                    <option value="" disabled>
                      Select a project type
                    </option>
                    {['Residential', 'Commercial', 'Institutional', 'Healthcare', 'Industrial', 'Other'].map(
                      (item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <label className="form-full">
                  Message
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Tell us a little about your space..."
                    required
                  />
                </label>
                <button className="button button-ivory submit-button" type="submit">
                  Send enquiry <ArrowRight size={16} />
                </button>
                <p className="form-note">
                  This preview form does not transmit data. Connect it to a form service to receive
                  enquiries.
                </p>
              </form>
            )}
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <BrandLogo footer />
          <p className="footer-statement">
            Designing spaces.
            <br />
            Creating experiences.
          </p>
          <div className="footer-links">
            <div>
              <small>EXPLORE</small>
              {navigation.slice(1).map(([label, href]) => (
                <a href={href} key={label}>
                  {label}
                </a>
              ))}
            </div>
            <div>
              <small>FOLLOW</small>
              <a href={instagramUrl} target="_blank" rel="noreferrer">
                Instagram <ArrowUpRight size={13} />
              </a>
              <small className="footer-note">Interior design for considered living.</small>
            </div>
            <div>
              <small>CONTACT</small>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <a href={`tel:${contactPhoneLink}`}>{contactPhone}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ONE 8 INTERIORS</span>
          <span>Designing Spaces. Creating Experiences.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>

      {selectedProject && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} project visualisation`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <button
            className="lightbox-close"
            type="button"
            aria-label="Close image"
            onClick={() => setSelectedProject(null)}
          >
            <X size={23} />
          </button>
          <img
            src={selectedProject.image}
            alt={`${selectedProject.title} interior visualisation`}
          />
          <div>
            <small>{selectedProject.category} · PROJECT VISUALISATION</small>
            <h3>{selectedProject.title}</h3>
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
