/**
 * LUMINARA / ORBITAL CALM
 * Neo-Swiss healthcare editorialism: white depth, Luminara Cobalt direction,
 * frosted diagnostic panels, asymmetrical staging, and restrained 3D motion.
 */
import { FormEvent, PointerEvent as ReactPointerEvent, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Menu,
  X,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const services = [
  {
    number: "01",
    title: "Smile Design",
    copy: "Aesthetic treatment plans shaped around your features, habits, and goals.",
    tag: "PERSONAL EXPRESSION",
  },
  {
    number: "02",
    title: "Preventive Care",
    copy: "The small, regular decisions that keep your oral health moving forward.",
    tag: "EVERYDAY CLARITY",
  },
  {
    number: "03",
    title: "Digital Dentistry",
    copy: "Detailed diagnostics and gentle precision, with every next step made visible.",
    tag: "MEASURED PRECISION",
  },
];

const journey = [
  {
    number: "01",
    eyebrow: "YOUR FIRST VISIT",
    title: "Begin with a conversation, not a procedure.",
    copy: "Tell us what feels important. We make room for the questions behind the questions.",
  },
  {
    number: "02",
    eyebrow: "A CLEARER PICTURE",
    title: "See the full picture before you decide.",
    copy: "Your clinician translates scans, options, and priorities into a plan you can actually hold onto.",
  },
  {
    number: "03",
    eyebrow: "CARE THAT CONTINUES",
    title: "Leave with a path designed for real life.",
    copy: "Appointments, aftercare, and ongoing check-ins fit into the pace of your everyday.",
  },
];

const homeFaqs = [
  ["How do I choose the right place to begin?", "Start with the area that feels most relevant, or book a consultation and let the Luminara team help you find the clearest first step."],
  ["What should I expect at a first visit?", "Your first visit makes room for your questions, a considered review, and an unhurried conversation about the options that may be relevant to you."],
  ["Can I explore a treatment plan before deciding?", "Yes. We use visual planning and clear conversations to help you understand the direction before you decide how you would like to proceed."],
  ["How can I request an appointment?", "Use the appointment request form on this page. A member of the Luminara team will contact you to help find a time that fits."],
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

type JourneyItem = (typeof journey)[number];

function VisitCard({ item, index, progress }: { item: JourneyItem; index: number; progress: MotionValue<number> }) {
  const start = index * 0.18;
  const y = useTransform(progress, [start, start + 0.2, start + 0.38], [42, 0, -10]);
  const opacity = useTransform(progress, [start, start + 0.14, start + 0.31], [0.2, 1, 1]);
  const scale = useTransform(progress, [start, start + 0.2], [0.985, 1]);
  return (
    <motion.article className="visit-card" style={{ y, opacity, scale }} tabIndex={0} aria-label={`${item.eyebrow}: show more details`}>
      <div className="visit-card-inner">
        <div className="visit-card-face visit-card-front"><span className="visit-card-number">{item.number}</span><p className="journey-eyebrow">{item.eyebrow}</p><h3>{item.title}</h3><span className="visit-card-hint">HOVER TO OPEN <ArrowRight size={13} /></span></div>
        <div className="visit-card-face visit-card-back"><span className="visit-card-number">{item.number}</span><p className="journey-eyebrow">{item.eyebrow}</p><h3>{item.title}</h3><p className="visit-card-detail">{item.copy}</p><span className="visit-card-return">THE PATH, HELD CLEARLY</span></div>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const deviceStageRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLElement>(null);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const laptopPointerX = useMotionValue(0);
  const laptopCursorRotateY = useSpring(laptopPointerX, { stiffness: 140, damping: 22, mass: .7 });

  const handleLaptopPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width;
    laptopPointerX.set((normalizedX - .5) * 5);
  };

  const handleLaptopPointerLeave = () => laptopPointerX.set(0);

  const { scrollYProgress: deviceProgress } = useScroll({
    target: deviceStageRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: pageProgress } = useScroll();
  const laptopScale = useTransform(deviceProgress, [0, .32, .68, 1], [.62, .78, .94, 1.04]);
  const laptopY = useTransform(deviceProgress, [0, .36, .72, 1], [54, 18, 3, 0]);
  const laptopRotateX = useTransform(deviceProgress, [0, .28, .56], [7, 2, 0]);
  const laptopRotateZ = useTransform(deviceProgress, [0, .4, .8], [-1.8, -.5, 0]);
  const laptopOpacity = useTransform(deviceProgress, [0, .2, .7, 1], [1, 1, 1, 1]);
  const stageWordOpacity = useTransform(deviceProgress, [0, .36, .68], [.92, .42, 0]);
  const stageCableRotate = useTransform(deviceProgress, [0, 1], [-8, 72]);
  const headerOpacity = useTransform(deviceProgress, [.58, .78], [0, 1]);
  const headerY = useTransform(deviceProgress, [.58, .78], [-22, 0]);
  const smoothPageProgress = useSpring(pageProgress, { stiffness: 80, damping: 25 });
  const introDrift = useTransform(pageProgress, [0.08, 0.32], [34, -28]);
  const introOrbitRotate = useTransform(pageProgress, [0.08, 0.32], [-5, 14]);
  const portraitDrift = useTransform(pageProgress, [0.26, 0.56], [38, -31]);
  const storyDrift = useTransform(pageProgress, [0.34, 0.72], [45, -36]);
  const { scrollYProgress: journeyProgress } = useScroll({ target: journeyRef, offset: ["start end", "end start"] });
  const journeySideY = useTransform(journeyProgress, [0, 1], [-48, 48]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submitAppointment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => {
      setAppointmentOpen(false);
      setSubmitted(false);
    }, 1900);
  };

  return (
    <main className="site-shell">
      <motion.div className="scroll-track" style={{ scaleX: smoothPageProgress }} />

      <motion.header className="site-header" style={{ opacity: 1, y: 0 }}>
        <button className="brand-lockup" aria-label="Luminara Clinic home" onClick={() => goTo("top")}>
          <img src="/manus-storage/luminara-mark_021dca97.png" alt="" className="brand-mark" />
          <span className="brand-name">LUMINARA</span>
          <span className="brand-divider" />
          <span className="brand-subtitle">CLINIC</span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <button onClick={() => goTo("care")}>Care</button>
          <button onClick={() => goTo("approach")}>Our approach</button>
          <button onClick={() => goTo("visit")}>Your visit</button>
        </nav>

        <button className="header-action" onClick={() => setAppointmentOpen(true)}>
          <span>Book a visit</span>
          <ArrowUpRightIcon />
        </button>

        <button className="mobile-menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <Menu size={20} />
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={21} />
            </button>
            <p className="eyebrow">NAVIGATE</p>
            <button onClick={() => goTo("care")}>Care</button>
            <button onClick={() => goTo("approach")}>Our approach</button>
            <button onClick={() => goTo("visit")}>Your visit</button>
            <button className="menu-appointment" onClick={() => setAppointmentOpen(true)}>Book a visit <ArrowRight size={17} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="device-stage" id="top" ref={deviceStageRef}>
        <div className="device-stage-sticky">
          <div className="device-stage-grid" />
          <motion.div className="device-stage-wordmark" style={{ opacity: stageWordOpacity }}>LUMINARA</motion.div>
          <motion.div className="device-stage-cable" style={{ rotate: stageCableRotate }} aria-hidden="true"><span /></motion.div>
          <motion.div className="laptop-stage" style={{ scale: laptopScale, y: laptopY, rotateX: laptopRotateX, rotateZ: laptopRotateZ, rotateY: laptopCursorRotateY, opacity: laptopOpacity }} onPointerMove={handleLaptopPointerMove} onPointerLeave={handleLaptopPointerLeave}>
                          <img className="laptop-stage-render" src="/manus-storage/luminara-macbook-stage_edba3a47.png" alt="Premium silver MacBook-style laptop displaying the Luminara clinic" />

            <div className="laptop-display">
              <div className="laptop-camera" />
              <div className="laptop-screen">
                <div className="screen-grid" />
                <div className="screen-nav"><span className="screen-mini-brand"><img src="/manus-storage/luminara-mark_021dca97.png" alt="" />LUMINARA</span><span>CARE</span><span>APPROACH</span><span>VISIT</span></div>
                <div className="screen-copy"><p>CLINIC / 01</p><h2>Your smile,<br /><em>in full dimension.</em></h2><button onClick={() => setAppointmentOpen(true)}>Book a visit <ArrowRight size={11} /></button></div>
                <div className="screen-art"><img src="/manus-storage/luminara-hero-clarity-portrait_3ae596b3.jpg" alt="" /><span /><i /></div>
              </div>
            </div>
            <div className="laptop-hinge" />
            <div className="laptop-base"><span /></div>
          </motion.div>
        </div>
      </section>

      <section className="hero hero-after-stage">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid" />
        <motion.div className="hero-copy">
          <motion.div
            className="eyebrow-group"
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.72, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="eyebrow-dot" />
            <span className="eyebrow">A DENTAL WELLNESS PRACTICE</span>
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ delay: 0.08, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            Your smile,<br />
            <span>in full dimension.</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ delay: 0.16, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
          >
            Thoughtful dentistry for the way you live now—combining rigorous clinical care with an unusually human point of view.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ delay: 0.24, duration: 0.72, ease: [0.23, 1, 0.32, 1] }}
          >
            <button className="primary-cta" onClick={() => setAppointmentOpen(true)}>
              <span>Find a time that fits</span>
              <ArrowRight size={18} />
            </button>
            <button className="text-cta" onClick={() => goTo("care")}>
              <span>Explore care</span>
              <ArrowDownRight size={18} />
            </button>
          </motion.div>
        </motion.div>

        <motion.div className="hero-art">
          <motion.div className="orbit orbit-a" />
          <motion.div className="orbit orbit-b" />
          <motion.div className="hero-art-card" whileHover={{ rotateY: -5, rotateX: 4, y: -6 }} transition={{ duration: 0.35 }}>
            <img src="/manus-storage/luminara-hero-clarity-portrait_3ae596b3.jpg" alt="Pearlescent clinic sculpture with a cobalt orbital ribbon" />
          </motion.div>
        </motion.div>

      </section>

      <section className="introduction" id="approach">
        <div className="section-pin"><span>02</span><span>OUR POINT OF VIEW</span></div>
        <motion.div className="introduction-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal} transition={{ duration: 0.76, ease: [0.23, 1, 0.32, 1] }}>
          <p className="eyebrow">THE LUMINARA WAY</p>
          <h2>Care can feel <em>clearer.</em></h2>
          <div className="intro-detail">
            <p>We created Luminara for people who want their care to feel less transactional and more attuned: one team, a full picture, and decisions made at a human pace.</p>
            <button className="circle-arrow" aria-label="Discover our approach" onClick={() => goTo("visit")}><ArrowDownRight size={27} /></button>
          </div>
        </motion.div>
        <motion.div className="care-lens-detail" aria-hidden="true" style={{ y: introDrift, rotate: introOrbitRotate }}>
          <div className="care-lens-ring care-lens-ring-one" />
          <div className="care-lens-ring care-lens-ring-two" />
          <div className="care-lens-core"><span>01</span><strong>Care<br /><em>in view.</em></strong><small>THE FULL PICTURE, HELD GENTLY</small></div>
          <div className="care-lens-sweep" />
        </motion.div>
      </section>

      <section className="care-section" id="care">
        <div className="care-thread" aria-hidden="true"><span /><span /><span /></div>
        <div className="care-header">
          <div><p className="eyebrow">CARE, CONSIDERED</p><h2>Made to meet<br /><em>your life.</em></h2></div>
          <p>Our care is designed around the whole of you. Choose a starting point; we’ll help make sense of what follows.</p>
        </div>

        <div className="services-layout">
          <div className="service-art-stage">
            <motion.div
              className="scanner-frame"
              animate={{ rotateY: activeService === 2 ? -8 : 0, rotateX: activeService === 0 ? 4 : 0, y: activeService === 1 ? -9 : 0, scale: activeService === 2 ? 1.035 : 1 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <img src="/manus-storage/luminara-service-scanner_736747c3.jpg" alt="Translucent blue diagnostic tooth scan" />
              <span className="frame-corner corner-a" /><span className="frame-corner corner-b" /><span className="frame-corner corner-c" /><span className="frame-corner corner-d" />
              <div className="scan-cross scan-cross-h" /><div className="scan-cross scan-cross-v" />
            </motion.div>
            <div className="service-art-caption"><span>SCAN / 04</span><span>PRECISION IN PRACTICE</span></div>
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <button
                className={`service-item ${activeService === index ? "is-active" : ""}`}
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
                onClick={() => setActiveService(index)}
                key={service.number}
              >
                <span className="service-number">{service.number}</span>
                <span className="service-text"><span className="service-title">{service.title}</span><span className="service-copy">{service.copy}</span></span>
                <span className="service-right"><span>{service.tag}</span><ArrowUpRightIcon /></span>
              </button>
            ))}
            <AnimatePresence mode="wait">
              <motion.div key={services[activeService].number} className="service-focus-panel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .26, ease: [0.23,1,0.32,1] }} aria-live="polite">
                <div><span className="focus-label">SELECTED CARE PATH</span><strong>{services[activeService].title}</strong><p>{services[activeService].copy}</p></div><span className="focus-pulse" aria-hidden="true" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="portrait-section">
        <div className="portrait-path" aria-hidden="true"><span>02</span><i /><span>03</span></div>
        <div className="portrait-copy">
          <p className="eyebrow">A DIFFERENT TEMPO</p>
          <h2>Expertise that<br />makes space.</h2>
          <p>We use technology to make the complex more visible. We use time, attention, and conversation to make it feel more manageable.</p>
          <button className="text-cta dark-text-cta" onClick={() => goTo("visit")}><span>How your visit works</span><ArrowDownRight size={18} /></button>
        </div>
        <motion.div className="portrait-wrap" style={{ y: portraitDrift }} initial={{ opacity: 0, rotate: 5 }} whileInView={{ opacity: 1, rotate: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}>
          <img src="/manus-storage/luminara-care-portrait_95e298aa.jpg" alt="Dentist in a luminous contemporary clinic" />
          <div className="portrait-diagnostic-frame" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="portrait-orbit" />
        </motion.div>
      </section>

      <section className="expertise-section" id="expertise" aria-label="Our expertise">
        <div className="expertise-intro"><p className="eyebrow">OUR EXPERTISE</p><h2>Deep expertise.<br /><em>Humanly held.</em></h2><p>Clinical precision, aesthetic judgment, and calm coordination brought into the same room.</p></div>
        <div className="expertise-grid">
          <motion.article className="expertise-card expertise-card-featured" whileHover={{ y: -8, rotateY: -3 }} transition={{ duration: .28 }}><span className="expertise-orbit" /><div className="expertise-card-index">01</div><h3>Clinical direction</h3><p>Seeing the full picture before recommending the next step.</p><div className="expertise-card-line" /></motion.article>
          <motion.article className="expertise-card" whileHover={{ y: -8, rotateY: 3 }} transition={{ duration: .28 }}><div className="expertise-card-index">02</div><h3>Restorative craft</h3><p>Material, proportion, and comfort considered together.</p><div className="expertise-card-line" /></motion.article>
          <motion.article className="expertise-card" whileHover={{ y: -8, rotateY: -3 }} transition={{ duration: .28 }}><div className="expertise-card-index">03</div><h3>Care coordination</h3><p>A steady point of contact from first conversation to follow-through.</p><div className="expertise-card-line" /></motion.article>
        </div>
      </section>

      <section className="patient-stories-section" id="stories" aria-label="Patient testimonials">
        <motion.div className="stories-orbit" aria-hidden="true" style={{ y: storyDrift }}><span /><span /></motion.div>
        <div className="stories-title"><p className="eyebrow">PATIENT STORIES / VERIFIED CONTENT</p><h2>Voices, shared<br /><em>with care.</em></h2><p>Our testimonial space is reserved for real experiences shared with clear consent.</p></div>
        <div className="stories-content"><div className="verified-story-panel"><div className="story-panel-mark">“</div><p>Patient testimonials will appear here after they have been personally approved for publication. We do not create, anonymise, or invent patient feedback.</p><div className="story-panel-status"><span>VERIFIED STORY SPACE</span><span>CONSENT REQUIRED</span></div></div><a href="mailto:hello@luminaraclinic.com?subject=Patient%20Story">Share your story <ArrowRight size={17} /></a><div className="stories-approval"><span>STORIES APPEAR HERE</span><span>WITH PATIENT PERMISSION</span></div></div>
      </section>

      <section className="home-faq-section" id="faq">
        <div className="home-faq-orbit" aria-hidden="true"><span /><span /></div>
        <div className="home-faq-title"><p className="eyebrow">QUESTIONS, MADE CLEAR</p><h2>A little more<br /><em>perspective.</em></h2><p>Helpful answers for the first questions people often bring to Luminara.</p></div>
        <Accordion type="single" collapsible className="home-faq-list">
          {homeFaqs.map(([question, answer], index) => <AccordionItem key={question} value={`home-faq-${index}`}><AccordionTrigger><span>0{index + 1}</span>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}
        </Accordion>
      </section>

      <section className="journey-section" id="visit" ref={journeyRef}>
        <motion.div className="journey-side-motion" aria-hidden="true" style={{ y: journeySideY }} />
        <div className="journey-main">
          <div className="journey-title"><h2>A visit with<br /><em>room to breathe.</em></h2><p>The clearest care pathways begin with a good first conversation.</p></div>
          <div className="journey-list">
            {journey.map((item, index) => <VisitCard key={item.number} item={item} index={index} progress={journeyProgress} />)}
          </div>
        </div>
      </section>

      <section className="appointment-section">
        <div className="appointment-orb appointment-orb-a" /><div className="appointment-orb appointment-orb-b" />
        <div className="appointment-content">
          <p className="eyebrow light-eyebrow">A BETTER FIRST STEP</p>
          <h2>When you’re ready,<br /><em>we’re here.</em></h2>
          <p>Book an initial conversation, ask a question, or simply find out what care at Luminara could look like for you.</p>
          <button className="light-cta" onClick={() => setAppointmentOpen(true)}>Plan your first visit <ArrowRight size={18} /></button>
        </div>
        <div className="appointment-meta"><CalendarDays size={18} /><span>MON—SAT / BY APPOINTMENT</span><Clock3 size={18} /><span>UNHURRIED BY DESIGN</span></div>
      </section>

      <footer className="site-footer">
        <div className="footer-top"><button className="brand-lockup footer-brand" onClick={() => goTo("top")}><img src="/manus-storage/luminara-mark_021dca97.png" alt="" className="brand-mark" /><span className="brand-name">LUMINARA</span></button><a href="#top">Back to top <ArrowUpRightIcon /></a></div>
        <div className="footer-main"><p>Dental wellness made personal, precise, and beautifully clear.</p><div><span>CLARITY, GUIDED.</span><span>© 2026 LUMINARA CLINIC</span></div></div>
      </footer>

      <AnimatePresence>
        {appointmentOpen && (
          <motion.div className="appointment-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setAppointmentOpen(false)}>
            <motion.div className="appointment-modal" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }} onMouseDown={(event) => event.stopPropagation()}>
              <button className="modal-close" onClick={() => setAppointmentOpen(false)} aria-label="Close appointment form"><X size={20} /></button>
              {submitted ? (
                <motion.div className="submit-state" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><span className="submit-check"><Check size={28} /></span><p className="eyebrow">REQUEST RECEIVED</p><h2>We’ll be in touch<br />shortly.</h2><p>Thank you. A member of the Luminara team will help you find the right next step.</p></motion.div>
              ) : (
                <>
                  <p className="eyebrow">YOUR FIRST STEP</p><h2>Find a time<br /><em>that fits.</em></h2><p className="modal-intro">Tell us a little about what you’re looking for. This is an appointment request, not a confirmation.</p>
                  <form onSubmit={submitAppointment}>
                    <label><span>Name</span><input required name="name" placeholder="Your name" /></label>
                    <label><span>Email</span><input required type="email" name="email" placeholder="you@example.com" /></label>
                    <label><span>What brings you in?</span><select required defaultValue=""><option value="" disabled>Select a care direction</option><option>Smile design</option><option>Preventive care</option><option>Digital dentistry</option><option>I’m not sure yet</option></select></label>
                    <button className="primary-cta modal-submit" type="submit"><span>Send appointment request</span><ArrowRight size={18} /></button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function ArrowUpRightIcon() {
  return <span className="arrow-up-right" aria-hidden="true">↗</span>;
}
