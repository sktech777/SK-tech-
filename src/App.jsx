import React, { useMemo, useState } from "react";
import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";

const articles = [
  {
    slug: "ai-tools-for-creators",
    title: "AI Tools Every Modern Creator Should Explore",
    category: "AI Tools",
    excerpt: "A practical guide to discovering AI tools for writing, images, video, audio and productivity.",
    date: "September 2026",
    read: "6 min read"
  },
  {
    slug: "better-mobile-video-editing",
    title: "A Smarter Workflow for Mobile Video Editing",
    category: "Video Editing",
    excerpt: "Build a repeatable editing workflow that saves time without sacrificing quality.",
    date: "September 2026",
    read: "5 min read"
  },
  {
    slug: "useful-websites-for-creators",
    title: "Useful Websites That Can Make Creator Work Easier",
    category: "Websites",
    excerpt: "A curated starting point for online tools that help with everyday creator tasks.",
    date: "September 2026",
    read: "7 min read"
  }
];

const tools = [
  {name:"AI Writing Tools", cat:"Writing", desc:"Explore tools for drafting, brainstorming and rewriting workflows."},
  {name:"AI Image Tools", cat:"Image", desc:"Discover image-generation and image-editing workflows."},
  {name:"AI Video Tools", cat:"Video", desc:"Find tools for captions, clips, enhancement and creative video work."},
  {name:"AI Audio Tools", cat:"Audio", desc:"Explore practical audio cleanup and creator workflows."},
  {name:"Productivity AI", cat:"Productivity", desc:"Tools that can help organize research and repetitive tasks."},
  {name:"Coding AI", cat:"Coding", desc:"Explore AI-assisted development and debugging workflows."}
];

function Layout({children}) {
  const [open,setOpen]=useState(false);
  return <div className="app-shell">
    <div className="noise" />
    <header className="nav">
      <Link className="brand" to="/" onClick={()=>setOpen(false)}>
        <span className="brand-mark">SK</span><span>TECH7</span>
      </Link>
      <button className="menu" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">☰</button>
      <nav className={open?"nav-links open":"nav-links"}>
        {["AI Tools","Video Editing","Websites","Tech Tips","Tutorials","Blog","About"].map((x)=>
          <Link key={x} to={"/"+x.toLowerCase().replaceAll(" ","-")} onClick={()=>setOpen(false)}>{x}</Link>
        )}
        <Link className="nav-cta" to="/contact" onClick={()=>setOpen(false)}>Contact</Link>
      </nav>
    </header>
    <main>{children}</main>
    <footer className="footer">
      <div>
        <div className="brand footer-brand"><span className="brand-mark">SK</span><span>TECH7</span></div>
        <p>Technology, AI tools, editing tips and useful websites for modern creators.</p>
      </div>
      <div><h4>Explore</h4><Link to="/ai-tools">AI Tools</Link><Link to="/video-editing">Video Editing</Link><Link to="/websites">Websites</Link><Link to="/blog">Blog</Link></div>
      <div><h4>Company</h4><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/privacy-policy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/disclaimer">Disclaimer</Link></div>
      <div><h4>Social</h4>
  <a href="https://www.facebook.com/share/1SgM9ZE7PP/" target="_blank" rel="noopener noreferrer">Facebook</a>
  <a href="https://www.tiktok.com/@sk.tech78" target="_blank" rel="noopener noreferrer">TikTok</a>
  <a href="https://youtube.com/@sktecchh" target="_blank" rel="noopener noreferrer">YouTube</a>
  <a href="https://www.instagram.com/sktech_77" target="_blank" rel="noopener noreferrer">Instagram</a>
</div>
      <div className="copyright">© 2026 SK TECH7. All rights reserved.</div>
    </footer>
  </div>
}

function AdSlot({label="Advertisement"}) {
  return <div className="ad-slot" aria-label={label}>{label}</div>
}

function Home(){
  return <Layout>
    <section className="hero">
      <div className="hero-grid"/>
      <div className="hero-copy">
        <div className="eyebrow"><span/> FUTURE-READY TECH</div>
        <h1>Discover the <em>Future</em> of Tech.</h1>
        <p>AI tools, powerful websites, editing secrets, tech tips and creator resources — all in one place.</p>
        <div className="hero-actions"><Link className="btn primary" to="/ai-tools">Explore AI Tools ↗</Link><Link className="btn ghost" to="/blog">Read Latest Tips</Link></div>
        <div className="stats"><div><b>AI</b><span>Tools & Guides</span></div><div><b>EDIT</b><span>Creator Workflows</span></div><div><b>WEB</b><span>Useful Finds</span></div></div>
      </div>
      <div className="orb">
        <div className="orb-core">SK<br/><small>TECH7</small></div>
        <div className="ring r1"/><div className="ring r2"/><div className="ring r3"/>
        <div className="float-card fc1">✦ AI TOOLS</div><div className="float-card fc2">3D / EDIT</div><div className="float-card fc3">WEB × TECH</div>
      </div>
    </section>
    <AdSlot/>
    <section className="section">
      <div className="section-head"><div><span className="kicker">EXPLORE</span><h2>Built for curious creators.</h2></div><p>Practical tech content without the clutter.</p></div>
      <div className="category-grid">
        {[["AI Tools","🤖","Discover useful AI workflows and tools."],["Video Editing","🎬","Editing tips, workflows and creator techniques."],["Useful Websites","🌐","Hand-picked online resources for everyday work."],["Tech Tips","💡","Short, practical technology tips."],["Creator Tools","⚡","Tools for thumbnails, captions and content."],["Tutorials","🚀","Step-by-step guides you can actually follow."]].map(([name,icon,desc])=><Link className="category-card" to={"/"+name.toLowerCase().replaceAll(" ","-")} key={name}><span className="icon">{icon}</span><h3>{name}</h3><p>{desc}</p><span className="arrow">↗</span></Link>)}
      </div>
    </section>
    <section className="section dark-section">
      <div className="section-head"><div><span className="kicker">TRENDING</span><h2>AI tools, explained.</h2></div><Link className="text-link" to="/ai-tools">View all ↗</Link></div>
      <div className="tool-grid">{tools.slice(0,4).map(t=><ToolCard t={t} key={t.name}/>)}</div>
    </section>
    <section className="section">
      <div className="section-head"><div><span className="kicker">LATEST</span><h2>From the journal.</h2></div><Link className="text-link" to="/blog">All articles ↗</Link></div>
      <div className="article-grid">{articles.map(a=><ArticleCard a={a} key={a.slug}/>)}</div>
    </section>
    <section className="newsletter"><div><span className="kicker">WEEKLY SIGNAL</span><h2>Get the best tech finds.</h2><p>AI tools, useful websites, editing tricks and practical technology tips.</p></div><form onSubmit={e=>{e.preventDefault();alert("Thanks! Connect this form to your email provider before launch.")}}><input required type="email" placeholder="Your email address"/><button className="btn primary">Subscribe</button></form></section>
  </Layout>
}

function ToolCard({t}){return <article className="tool-card"><div className="tool-icon">✦</div><span className="pill">{t.cat}</span><h3>{t.name}</h3><p>{t.desc}</p><button className="small-btn" onClick={()=>alert("Add the official tool URL and your detailed review here.")}>Read review ↗</button></article>}
function ArticleCard({a}){return <Link className="article-card" to={"/blog/"+a.slug}><div className="article-visual"><span>{a.category}</span><strong>SK<span>7</span></strong></div><div className="article-body"><div className="meta">{a.date} · {a.read}</div><h3>{a.title}</h3><p>{a.excerpt}</p><span className="text-link">Read article ↗</span></div></Link>}

function Listing({title,kicker,items=articles}){return <Layout><section className="page-head"><span className="kicker">{kicker}</span><h1>{title}</h1><p>Explore SK TECH7's practical guides and resources.</p></section><AdSlot/><section className="section"><div className="article-grid">{items.map(a=><ArticleCard a={a} key={a.slug}/>)}</div></section></Layout>}

function ToolsPage(){return <Layout><section className="page-head"><span className="kicker">DIRECTORY</span><h1>AI Tools</h1><p>Explore categories of AI tools and learn how to use them effectively.</p></section><section className="section"><div className="tool-grid">{tools.map(t=><ToolCard t={t} key={t.name}/>)}</div></section></Layout>}

function ArticlePage(){const {slug}=useParams(); const a=articles.find(x=>x.slug===slug)||articles[0]; return <Layout><article className="article-page"><span className="kicker">{a.category}</span><h1>{a.title}</h1><div className="meta">{a.date} · {a.read}</div><div className="article-hero"><strong>SK TECH7</strong></div><AdSlot/><div className="prose"><p>{a.excerpt}</p><h2>Start with the problem, not the hype</h2><p>Technology changes quickly, so useful content should focus on what a tool actually helps you accomplish. Before choosing a tool, define the task, check its limitations and compare the workflow with your existing process.</p><h2>Build a repeatable workflow</h2><p>Good creator workflows are simple enough to repeat. Save useful resources, document your steps and keep the tools that consistently improve your output.</p><h2>Check the details</h2><p>Pricing, availability, privacy practices and features can change. Verify important information on the official provider website before relying on it.</p></div></article></Layout>}

function Legal({type}){const copy={privacy:["Privacy Policy","SK TECH7 respects your privacy. This page is a starter template and should be reviewed and customized to match the analytics, advertising, forms and third-party services actually used on your website."],terms:["Terms & Conditions","By using SK TECH7, you agree to use the website lawfully and responsibly. Content is provided for general informational purposes and may change without notice."],disclaimer:["Disclaimer","SK TECH7 provides technology information, tutorials and recommendations for educational and informational purposes. Verify important product, pricing, security and availability information with official sources."],cookie:["Cookie Policy","SK TECH7 may use cookies and similar technologies for essential functionality, analytics and advertising. Update this page to reflect the services actually enabled on the site."]}; const [h,p]=copy[type]; return <Layout><section className="legal"><span className="kicker">LEGAL</span><h1>{h}</h1><p>{p}</p><h2>Important</h2><p>Replace this starter text with a policy reviewed for your actual business, audience, jurisdiction, advertising providers and data practices. Do not publish placeholder legal text unchanged.</p></section></Layout>}

function About(){return <Layout><section className="legal"><span className="kicker">THE BRAND</span><h1>About SK TECH7</h1><p>SK TECH7 is a technology-focused platform covering AI tools, useful websites, video editing, creator tools and practical tutorials.</p><p>The goal is simple: turn interesting technology discoveries into clear, useful guides that creators can apply.</p></section></Layout>}
function Contact(){return <Layout><section className="legal"><span className="kicker">GET IN TOUCH</span><h1>Contact SK TECH7</h1><p>Use the form below for general questions, corrections or collaboration enquiries.</p><form className="contact-form" onSubmit={e=>{e.preventDefault();alert("Connect this form to your backend/email provider before launch.")}}><input required placeholder="Name"/><input required type="email" placeholder="Email"/><input required placeholder="Subject"/><textarea required rows="7" placeholder="Message"/><button className="btn primary">Send message</button></form></section></Layout>}

function Search(){const [q,setQ]=useState(""); const results=useMemo(()=>articles.filter(a=>(a.title+a.excerpt+a.category).toLowerCase().includes(q.toLowerCase())),[q]); return <Layout><section className="page-head"><span className="kicker">SEARCH</span><h1>Find something useful.</h1><input className="search-input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search articles..."/><p>{q?`${results.length} result(s) found.`:"Start typing to search."}</p></section><section className="section"><div className="article-grid">{results.map(a=><ArticleCard a={a} key={a.slug}/>)}</div></section></Layout>}

export default function App(){
  return <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/ai-tools" element={<ToolsPage/>}/>
    <Route path="/video-editing" element={<Listing title="Video Editing" kicker="CREATOR LAB"/>}/>
    <Route path="/websites" element={<Listing title="Useful Websites" kicker="WEB DISCOVERY"/>}/>
    <Route path="/tech-tips" element={<Listing title="Tech Tips" kicker="QUICK WINS"/>}/>
    <Route path="/tutorials" element={<Listing title="Tutorials" kicker="HOW TO"/>}/>
    <Route path="/blog" element={<Listing title="SK TECH7 Journal" kicker="THE JOURNAL"/>}/>
    <Route path="/blog/:slug" element={<ArticlePage/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/privacy-policy" element={<Legal type="privacy"/>}/>
    <Route path="/terms" element={<Legal type="terms"/>}/>
    <Route path="/disclaimer" element={<Legal type="disclaimer"/>}/>
    <Route path="/cookie-policy" element={<Legal type="cookie"/>}/>
    <Route path="/search" element={<Search/>}/>
    <Route path="*" element={<Listing title="Page not found" kicker="404"/>}/>
  </Routes>
}
