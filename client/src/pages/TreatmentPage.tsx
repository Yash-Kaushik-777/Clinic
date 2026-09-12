/**
 * LUMINARA / ORBITAL CALM — TREATMENT PAGES
 * Smile Design uses a portrait arc; Preventive Care uses a protective field.
 * Both remain white, precise, and spatial, with cobalt reserved for movement and decisions.
 */
import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, ArrowRight, Check, ChevronRight, CircleDot, X } from "lucide-react";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

const appPath = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;

type TreatmentKind = "smile" | "preventive" | "digital";

const treatments = {
  smile: {
    index: "01",
    eyebrow: "SMILE DESIGN / TREATMENT PATH",
    title: <>A smile that<br /><em>looks like you.</em></>,
    shortTitle: "Smile Design",
    description: "A considered aesthetic plan built from your features, your preferences, and the way you want to feel every day.",
    visual: asset("luminara-smile-design-hero.jpg"),
    detailVisual: asset("luminara-hero-clarity-portrait.jpg"),
    visualAlt: "Pearlescent tooth form suspended in a cobalt smile arc",
    perspective: "DESIGN WITH DEPTH",
    lead: <>Good smile design begins with <em>listening.</em></>,
    body: "There is no template for a smile that feels right. We study the small details: proportion, movement, light, and what you want to preserve. Then we make the possibilities easy to see.",
    supportTitle: "Every decision, made visible.",
    supportCopy: "Digital previews, material references, and measured conversations help you move forward without having to imagine everything at once.",
    steps: [
      ["01", "Read your features", "We begin with what is already distinctive: facial balance, expression, bite, and the small details you care about."],
      ["02", "Map the possibilities", "We use digital planning to make shape, proportion, and treatment options easier to see and compare."],
      ["03", "Refine the finish", "The final details—material, shade, texture, and timing—are adjusted until the plan feels unmistakably yours."],
    ],
    focus: ["Digital smile planning", "Aesthetic dentistry", "Restorative refinement"],
    next: "Preventive Care",
    nextHref: appPath("/preventive-care"),
    aftercare: ["Follow the individual guidance your clinician provides.", "Keep your planned review so we can refine details together.", "Contact the clinic if you have questions about your specific care plan."],
    faqs: [["How does a Smile Design consultation begin?", "Your first visit is a conversation about what matters to you, followed by a considered assessment and a clear explanation of the options that may be relevant."], ["Will I be able to see the plan before deciding?", "We use visual planning and material references to make the direction easier to understand before you decide how to proceed."], ["How long does treatment take?", "Timing depends on the treatment path selected. Your clinician will explain the sequence and expected appointment rhythm during your consultation."]],
    aftercareTitle: <>Keep the design<br /><em>in view.</em></>,
    aftercareIntro: "A considered result is supported by a clear review rhythm. Use these prompts alongside the personal guidance you receive at Luminara.",
    faqTitle: <>The detail you’re<br /><em>considering.</em></>,
    faqIntro: "Your clinician can always bring the conversation back to the details that matter to you.",
  },
  preventive: {
    index: "02",
    eyebrow: "PREVENTIVE CARE / TREATMENT PATH",
    title: <>Care that keeps<br /><em>you ahead.</em></>,
    shortTitle: "Preventive Care",
    description: "A calm, consistent approach to oral health—designed to protect what is working and catch the small things early.",
    visual: asset("luminara-preventive-care-hero.jpg"),
    detailVisual: asset("luminara-service-scanner.jpg"),
    visualAlt: "Enamel-like form inside a luminous blue protective sphere",
    perspective: "PROTECTION IN MOTION",
    lead: <>Small rituals create <em>lasting calm.</em></>,
    body: "Preventive care is not a single appointment. It is a clear, sustainable rhythm of check-ins, hygiene, and practical insight that helps you stay connected to your oral health.",
    supportTitle: "A routine you can actually keep.",
    supportCopy: "We focus on the observations that matter and translate them into low-friction routines that work with your actual schedule.",
    steps: [
      ["01", "Build a baseline", "A full review gives us a detailed, shared picture of your oral health and the habits that support it."],
      ["02", "Protect the everyday", "Professional hygiene and tailored guidance make the everyday fundamentals feel simpler, not more demanding."],
      ["03", "Stay one step ahead", "Regular check-ins let us notice subtle changes early and keep your care plan responsive over time."],
    ],
    focus: ["Comprehensive hygiene", "Digital monitoring", "Long-term recall care"],
    next: "Digital Dentistry",
    nextHref: appPath("/digital-dentistry"),
    aftercare: ["Use the daily routine agreed with your clinician.", "Keep your planned hygiene and review appointments.", "Bring any changes or questions to your next check-in, or contact the clinic sooner if needed."],
    faqs: [["What happens at a preventive care visit?", "Your visit is shaped around your current needs and may include a review, hygiene care, and practical guidance from your clinician."], ["How often should I return?", "The right recall rhythm depends on your oral-health history and goals. Your clinician will recommend a schedule designed around you."], ["What should I do between visits?", "Follow your clinician’s individual guidance and keep the everyday routine that has been agreed for your care."]],
    aftercareTitle: <>A rhythm that<br /><em>protects.</em></>,
    aftercareIntro: "Preventive care works through a steady rhythm. Let these prompts support the individual routine agreed with your Luminara clinician.",
    faqTitle: <>The questions that<br /><em>keep you ahead.</em></>,
    faqIntro: "A clear routine leaves more room for everyday life. Ask the Luminara team whenever you need perspective.",
  },
  digital: {
    index: "03",
    eyebrow: "DIGITAL DENTISTRY / TREATMENT PATH",
    title: <>See with<br /><em>better clarity.</em></>,
    shortTitle: "Digital Dentistry",
    description: "Advanced digital imaging and planning that makes the fine detail clearer—so every choice begins with a fuller picture.",
    visual: asset("luminara-service-scanner.jpg"),
    detailVisual: asset("luminara-hero-clarity-portrait.jpg"),
    visualAlt: "Pearlescent dental model aligned in translucent calibration planes",
    perspective: "CALIBRATED CLARITY",
    lead: <>Precision works best when it <em>feels human.</em></>,
    body: "Digital tools help us resolve the small details more clearly, then explain them in language that is simple, visual, and useful to you.",
    supportTitle: "A closer look, with less guesswork.",
    supportCopy: "We turn detailed imaging into a shared reference point, allowing the clinical picture and your own priorities to sit in the same frame.",
    steps: [["01", "Capture the detail", "Digital records build a precise reference point for the conversation ahead."], ["02", "Align the plan", "We bring the relevant information into one clear view, then talk through what it means for you."], ["03", "Move with confidence", "Your next step is guided by a more complete picture and a care plan you can understand."],],
    focus: ["Digital records", "Guided treatment planning", "Clear visual explanation"],
    next: "Smile Design",
    nextHref: appPath("/smile-design"),
    aftercare: ["Follow the personal care plan agreed with your clinician.", "Keep any recommended review appointments so your progress stays visible.", "Ask the team whenever you want more clarity on your treatment records or next step."],
    faqs: [["What is Digital Dentistry used for?", "It gives your clinical team a detailed visual reference that can support assessment, planning, and clearer communication about the care being discussed."], ["Will I see the information captured during my visit?", "Your clinician will explain the information that is relevant to your treatment plan and use it to help make the next steps easier to understand."], ["Does digital planning replace a consultation?", "No. Technology supports the clinical conversation; it does not replace the time, expertise, and individual context brought to your consultation."]],
    aftercareTitle: <>Keep the detail<br /><em>aligned.</em></>,
    aftercareIntro: "Digital records are most useful when they stay connected to an understandable care plan and a considered review rhythm.",
    faqTitle: <>See how the detail<br /><em>comes together.</em></>,
    faqIntro: "Technology should make the next step clearer. The Luminara team is here when you want to talk it through.",
  },
} as const;

export function SmileDesignPage() { return <TreatmentPage kind="smile" />; }
export function PreventiveCarePage() { return <TreatmentPage kind="preventive" />; }
export function DigitalDentistryPage() { return <TreatmentPage kind="digital" />; }

function TreatmentPage({ kind }: { kind: TreatmentKind }) {
  const service = treatments[kind];
  const heroRef = useRef<HTMLElement>(null);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, -108]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [0, kind === "smile" ? -17 : kind === "preventive" ? 13 : -7]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, kind === "smile" ? 118 : kind === "preventive" ? -132 : 62]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -44]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => { setAppointmentOpen(false); setSubmitted(false); }, 1800);
  };

  return (
    <main className={`treatment-page treatment-${kind}`}>
      <header className="treatment-header">
        <a href={import.meta.env.BASE_URL} className="treatment-brand" aria-label="Return to Luminara Clinic home">
          <img src={asset("luminara-mark.png")} alt="" />
          <span>LUMINARA</span><i /> <small>CLINIC</small>
        </a>
        <nav aria-label="Treatment navigation">
          <a href={appPath("/smile-design")} className={kind === "smile" ? "active" : ""}>Smile Design</a>
          <a href={appPath("/preventive-care")} className={kind === "preventive" ? "active" : ""}>Preventive Care</a>
          <a href={appPath("/digital-dentistry")} className={kind === "digital" ? "active" : ""}>Digital Dentistry</a>
        </nav>
        <button onClick={() => setAppointmentOpen(true)}>Book a visit <span>↗</span></button>
      </header>

      <section className="treatment-hero" ref={heroRef}>
        <div className="treatment-grid" />
        <div className="treatment-tint treatment-tint-one" /><div className="treatment-tint treatment-tint-two" />
        <motion.div className="treatment-hero-copy" style={{ y: copyY }}>
          <div className="treatment-eyebrow"><CircleDot size={11} /><span>{service.eyebrow}</span></div>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div className="treatment-hero-actions">
            <button className="treatment-cta" onClick={() => setAppointmentOpen(true)}>Plan a consultation <ArrowRight size={17} /></button>
            <a href="#process">See the process <ChevronRight size={16} /></a>
          </div>
          <div className="treatment-caption"><span>{service.index} / 02</span><span>{service.perspective}</span></div>
        </motion.div>
        <motion.div className="treatment-hero-art" style={{ y: artY, rotate: artRotate }}>
          <motion.span className="treatment-orbit treatment-orbit-wide" style={{ rotate: ringRotate }} />
          <motion.span className="treatment-orbit treatment-orbit-tall" style={{ rotate: useTransform(ringRotate, value => value * -.62) }} />
          {kind === "smile" ? <span className="portrait-arc" /> : kind === "preventive" ? <><span className="protective-ring ring-one" /><span className="protective-ring ring-two" /><span className="protective-ring ring-three" /></> : <><span className="calibration-plane calibration-plane-a" /><span className="calibration-plane calibration-plane-b" /><span className="calibration-beam" /></>}
          <motion.div className="treatment-image-frame" whileHover={{ rotateY: kind === "smile" ? -5 : 5, rotateX: 3, y: -5 }} transition={{ duration: .35 }}>
            <img src={service.visual} alt={service.visualAlt} />
          </motion.div>
        </motion.div>
        <div className="treatment-scroll-label"><span>SCROLL TO CONTINUE</span><i /></div>
      </section>

      <section className={`treatment-intro treatment-intro-${kind}`}>
        <div className="intro-index"><span>{service.index}</span><span>THE LUMINARA METHOD</span></div>
        <div className="treatment-intro-copy">
          <p className="treatment-eyebrow plain">THE POINT OF VIEW</p>
          <h2>{service.lead}</h2>
          <p>{service.body}</p>
        </div>
        <div className="intro-spatial-element" aria-hidden="true"><span /><span /><b>{kind === "smile" ? "FORM" : kind === "preventive" ? "RHYTHM" : "ALIGN"}</b></div>
      </section>

      <section className={`process-section process-section-${kind}`} id="process">
        <div className="process-title"><p className="treatment-eyebrow plain">A PLAN WITH PERSPECTIVE</p><h2>{service.supportTitle}</h2></div>
        <div className="process-wrap">
          <motion.div className={`process-visual process-visual-${kind}`} initial={{ opacity: 0, y: 40, rotate: kind === "smile" ? -5 : 5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .8, ease: [0.23, 1, 0.32, 1] }}>
            {kind === "smile" ? (
              <div className="smile-material-study" aria-label="Three-dimensional smile design material study">
                <span className="smile-surface surface-left" /><span className="smile-surface surface-center" /><span className="smile-surface surface-right" />
                <span className="smile-visual-arc" /><span className="smile-material-dot" />
              </div>
            ) : kind === "preventive" ? (
              <div className="preventive-material-study" aria-label="Three-dimensional preventive care protective field">
                <span className="protective-core" /><span className="field-ring field-ring-a" /><span className="field-ring field-ring-b" /><span className="field-ring field-ring-c" />
                <span className="field-droplet drop-a" /><span className="field-droplet drop-b" /><span className="field-droplet drop-c" />
              </div>
            ) : (
              <div className="digital-material-study" aria-label="Three-dimensional digital dentistry calibration model">
                <span className="digital-core" /><span className="digital-plane digital-plane-a" /><span className="digital-plane digital-plane-b" /><span className="digital-plane digital-plane-c" />
                <span className="digital-marker marker-a" /><span className="digital-marker marker-b" /><span className="digital-marker marker-c" />
              </div>
            )}
            <div className="process-visual-orbit" /><div className="process-visual-tag"><span>VIEW</span><b>{kind === "smile" ? "A/01" : kind === "preventive" ? "B/02" : "C/03"}</b></div>
          </motion.div>
          <div className="process-side"><p>{service.supportCopy}</p><div className="focus-list">{service.focus.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div></div>
        </div>
        <div className={`treatment-steps treatment-steps-${kind}`}>
          {service.steps.map(([number, title, copy], index) => <motion.article key={number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .6, delay: index * .08, ease: [0.23, 1, 0.32, 1] }}><span>{number}</span><h3>{title}</h3><p>{copy}</p><i /></motion.article>)}
        </div>
      </section>

      <CareSupport kind={kind} />

      <section className={`treatment-decision treatment-decision-${kind}`}>
        <div className="decision-orbit decision-orbit-one" /><div className="decision-orbit decision-orbit-two" />
        <div><p className="treatment-eyebrow light">A GOOD START, CLEARLY MADE</p><h2>Let’s make the<br /><em>next step yours.</em></h2><p>A consultation is a space to ask, see your options, and decide at a pace that feels right.</p><button onClick={() => setAppointmentOpen(true)}>Book a consultation <ArrowRight size={18} /></button></div>
        <a className="other-care" href={service.nextHref}><span>OTHER CARE</span><b>{service.next}</b><ArrowRight size={20} /></a>
      </section>

      <footer className="treatment-footer"><a href={import.meta.env.BASE_URL}><ArrowLeft size={16} /> Return to Luminara Clinic</a><span>© 2026 LUMINARA CLINIC</span></footer>

      <AnimatePresence>{appointmentOpen && <motion.div className="treatment-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setAppointmentOpen(false)}><motion.div className="treatment-modal" initial={{ opacity: 0, y: 22, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .97 }} transition={{ duration: .32, ease: [0.23, 1, 0.32, 1] }} onMouseDown={event => event.stopPropagation()}><button className="treatment-modal-close" onClick={() => setAppointmentOpen(false)} aria-label="Close appointment form"><X size={20} /></button>{submitted ? <div className="treatment-submitted"><span><Check size={26} /></span><p className="treatment-eyebrow plain">REQUEST RECEIVED</p><h2>We’ll be in touch<br />shortly.</h2><p>A member of the Luminara team will help you find a thoughtful next step.</p></div> : <><p className="treatment-eyebrow plain">YOUR FIRST STEP</p><h2>Start with a<br /><em>clearer view.</em></h2><p className="treatment-modal-intro">Share a few details and we’ll help you find a consultation time that suits you.</p><form onSubmit={handleSubmit}><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label><label>Interested in<select required defaultValue=""><option value="" disabled>Select a care path</option><option>Smile Design</option><option>Preventive Care</option><option>Something else</option></select></label><button type="submit">Send appointment request <ArrowRight size={17} /></button></form></>}</motion.div></motion.div>}</AnimatePresence>
    </main>
  );
}

function CareSupport({ kind }: { kind: TreatmentKind }) {
  const service = treatments[kind];
  return <>
    <section className={`aftercare-section aftercare-${kind}`}>
      <div className="aftercare-head"><p className="treatment-eyebrow plain">AFTERCARE, WITH INTENTION</p><h2>{service.aftercareTitle}</h2></div>
      <div className="aftercare-body"><p>{service.aftercareIntro}</p><div className="aftercare-list">{service.aftercare.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p><i /></div>)}</div></div>
      <div className="aftercare-motif" aria-hidden="true"><span /><span /><span /></div>
    </section>
    <section className="faq-section">
      <div className="faq-intro"><p className="treatment-eyebrow plain">QUESTIONS, MADE CLEAR</p><h2>{service.faqTitle}</h2><p>{service.faqIntro}</p></div>
      <Accordion type="single" collapsible className="care-faq-list">
        {service.faqs.map(([question, answer], index) => <AccordionItem key={question} value={`item-${index}`}><AccordionTrigger><span>0{index + 1}</span>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}
      </Accordion>
    </section>
  </>;
}
