import React, { useMemo, useState } from "react";
import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";

const tools = [
  {name:"AI Writing Assistants", cat:"Writing", desc:"Draft blog posts, captions and outlines faster, then edit for your own voice."},
  {name:"AI SEO Assistants", cat:"Writing", desc:"Get keyword suggestions and readability feedback while you write."},
  {name:"AI Repurposing Tools", cat:"Writing", desc:"Turn one long article into social captions, threads and summaries."},
  {name:"AI Image Generators", cat:"Image", desc:"Turn text prompts into concept art, thumbnails and social graphics."},
  {name:"AI Image Upscalers", cat:"Image", desc:"Sharpen low-resolution photos and old images without losing detail."},
  {name:"AI Background Removers", cat:"Image", desc:"Cut out subjects instantly for product shots and thumbnails."},
  {name:"AI Video Enhancers", cat:"Video", desc:"Automatically stabilize, upscale and clean up shaky footage."},
  {name:"AI Caption & Subtitle Tools", cat:"Video", desc:"Generate accurate subtitles and auto-sync captions for reels."},
  {name:"AI Video Summarizers", cat:"Video", desc:"Turn long recordings into short highlight clips automatically."},
  {name:"AI Voice Cleanup Tools", cat:"Audio", desc:"Remove background noise and level out voice recordings automatically."},
  {name:"AI Text-to-Speech", cat:"Audio", desc:"Convert scripts into natural-sounding voiceovers in multiple languages."},
  {name:"Productivity AI Assistants", cat:"Productivity", desc:"Summarize documents and organize research notes automatically."},
  {name:"AI Meeting Transcription", cat:"Productivity", desc:"Automatically transcribe and summarize calls and meetings."},
  {name:"AI Coding Assistants", cat:"Coding", desc:"Get inline code suggestions, explanations and quick debugging help."},
  {name:"AI Code Review Tools", cat:"Coding", desc:"Catch bugs and style issues automatically before you ship."}
];

const videoEditing = [
  {slug:"better-mobile-video-editing", title:"A Smarter Workflow for Mobile Video Editing", excerpt:"Build a repeatable editing workflow that saves time without sacrificing quality.", date:"September 2026", read:"5 min read"},
  {slug:"color-grading-basics-for-beginners", title:"Color Grading Basics for Beginners", excerpt:"A simple approach to giving your footage a consistent, polished look.", date:"September 2026", read:"6 min read"},
  {slug:"how-to-cut-jump-cuts-cleanly", title:"How to Cut Jump Cuts Cleanly", excerpt:"Keep talking-head videos tight and watchable without jarring transitions.", date:"August 2026", read:"4 min read"},
  {slug:"best-export-settings-for-social-media", title:"Best Export Settings for Social Media", excerpt:"Avoid blurry uploads by matching your export settings to each platform.", date:"August 2026", read:"5 min read"},
  {slug:"building-a-b-roll-library", title:"Building a B-Roll Library You'll Actually Use", excerpt:"Organize supporting footage so it's easy to find when you're editing.", date:"August 2026", read:"6 min read"},
  {slug:"audio-ducking-explained", title:"Audio Ducking Explained", excerpt:"Automatically lower music when someone's talking for a cleaner mix.", date:"July 2026", read:"4 min read"},
  {slug:"transitions-that-dont-look-cheesy", title:"Transitions That Don't Look Cheesy", excerpt:"A few tasteful transition styles that hold up over time.", date:"July 2026", read:"5 min read"},
  {slug:"speed-ramping-for-dynamic-clips", title:"Speed Ramping for More Dynamic Clips", excerpt:"Add energy to footage by easing between fast and slow motion.", date:"July 2026", read:"5 min read"},
  {slug:"organizing-your-editing-timeline", title:"Organizing Your Editing Timeline", excerpt:"A folder and track naming system that keeps big projects manageable.", date:"June 2026", read:"4 min read"},
  {slug:"shooting-footage-that-edits-itself", title:"Shooting Footage That Edits Itself", excerpt:"Plan your shots so the edit comes together with far less effort.", date:"June 2026", read:"6 min read"},
  {slug:"green-screen-basics-at-home", title:"Green Screen Basics at Home", excerpt:"Get a clean key without a professional lighting setup.", date:"June 2026", read:"6 min read"},
  {slug:"batch-editing-workflow-for-creators", title:"A Batch Editing Workflow for Creators", excerpt:"Edit a week of content in one sitting using templates and presets.", date:"May 2026", read:"5 min read"}
];

const websites = [
  {slug:"useful-websites-for-creators", title:"Useful Websites That Can Make Creator Work Easier", excerpt:"A curated starting point for online tools that help with everyday creator tasks.", date:"September 2026", read:"7 min read"},
  {slug:"free-stock-photo-and-video-sites", title:"Free Stock Photo and Video Sites Worth Bookmarking", excerpt:"Where to find quality footage and images without breaking a budget.", date:"August 2026", read:"5 min read"},
  {slug:"best-font-pairing-tools-online", title:"The Best Font Pairing Tools Online", excerpt:"Quickly find fonts that actually work well together.", date:"August 2026", read:"4 min read"},
  {slug:"color-palette-generators-worth-bookmarking", title:"Color Palette Generators Worth Bookmarking", excerpt:"Build consistent color schemes for thumbnails, decks and websites.", date:"August 2026", read:"4 min read"},
  {slug:"free-file-conversion-websites", title:"Free File Conversion Websites That Just Work", excerpt:"Convert documents, images and video formats without installing software.", date:"July 2026", read:"5 min read"},
  {slug:"background-remover-websites", title:"Background Remover Websites Compared", excerpt:"Fast, browser-based options for cutting out subjects from photos.", date:"July 2026", read:"4 min read"},
  {slug:"websites-for-royalty-free-music", title:"Websites for Royalty-Free Music", excerpt:"Find safe-to-use background music for videos and streams.", date:"July 2026", read:"5 min read"},
  {slug:"link-in-bio-page-builders", title:"Link-in-Bio Page Builders Worth Trying", excerpt:"Turn one profile link into a simple hub for everything you share.", date:"June 2026", read:"4 min read"},
  {slug:"resume-and-portfolio-site-builders", title:"Resume and Portfolio Site Builders", excerpt:"Put together a clean personal site without touching any code.", date:"June 2026", read:"5 min read"},
  {slug:"website-speed-testing-tools", title:"Website Speed Testing Tools Explained", excerpt:"Understand what these tools measure and which numbers actually matter.", date:"June 2026", read:"5 min read"},
  {slug:"free-icon-and-illustration-libraries", title:"Free Icon and Illustration Libraries", excerpt:"Sources for consistent icon sets and illustrations for your projects.", date:"May 2026", read:"4 min read"},
  {slug:"website-uptime-monitoring-tools", title:"Website Uptime Monitoring Tools", excerpt:"Get notified the moment your site goes down, not hours later.", date:"May 2026", read:"5 min read"}
];

const techTips = [
  {slug:"speed-up-a-slow-laptop", title:"How to Speed Up a Slow Laptop", excerpt:"A few practical checks before you consider buying new hardware.", date:"September 2026", read:"5 min read"},
  {slug:"organize-your-cloud-storage", title:"How to Organize Your Cloud Storage", excerpt:"A simple folder structure that scales as your files grow.", date:"August 2026", read:"4 min read"},
  {slug:"two-factor-authentication-basics", title:"Two-Factor Authentication Basics", excerpt:"Why it matters and how to set it up on your important accounts.", date:"August 2026", read:"5 min read"},
  {slug:"extend-your-phone-battery-life", title:"Simple Ways to Extend Your Phone's Battery Life", excerpt:"Small settings changes that add up over a full day of use.", date:"August 2026", read:"4 min read"},
  {slug:"backup-your-files-the-right-way", title:"How to Back Up Your Files the Right Way", excerpt:"A basic 3-2-1 approach so you never lose important work.", date:"July 2026", read:"5 min read"},
  {slug:"clean-up-browser-extensions-safely", title:"How to Clean Up Browser Extensions Safely", excerpt:"Spot the ones that are slowing you down or watching more than they should.", date:"July 2026", read:"4 min read"},
  {slug:"spot-a-phishing-email", title:"How to Spot a Phishing Email", excerpt:"The warning signs that show up before you ever click a link.", date:"July 2026", read:"5 min read"},
  {slug:"free-up-storage-on-your-phone", title:"How to Free Up Storage on Your Phone", excerpt:"Find what's actually taking up space before you delete anything important.", date:"June 2026", read:"4 min read"},
  {slug:"keyboard-shortcuts-that-save-time", title:"Keyboard Shortcuts That Actually Save Time", excerpt:"A short list worth memorizing if you work at a computer daily.", date:"June 2026", read:"4 min read"},
  {slug:"secure-your-home-wifi-network", title:"How to Secure Your Home Wi-Fi Network", excerpt:"A few settings that make a real difference in under ten minutes.", date:"June 2026", read:"5 min read"},
  {slug:"manage-notifications-without-losing-focus", title:"How to Manage Notifications Without Losing Focus", excerpt:"Keep the alerts that matter and silence the ones that don't.", date:"May 2026", read:"4 min read"},
  {slug:"choose-a-password-manager", title:"How to Choose a Password Manager", excerpt:"What to look for before you commit to one for the long term.", date:"May 2026", read:"5 min read"}
];

const tutorials = [
  {slug:"set-up-a-simple-content-calendar", title:"How to Set Up a Simple Content Calendar", excerpt:"Plan posts a week ahead without an overly complicated system.", date:"September 2026", read:"5 min read"},
  {slug:"record-clean-audio-with-a-phone", title:"How to Record Clean Audio With Just a Phone", excerpt:"Get usable sound without buying a dedicated microphone yet.", date:"August 2026", read:"5 min read"},
  {slug:"build-a-basic-linktree-page", title:"How to Build a Basic Link-in-Bio Page", excerpt:"Set up a simple landing page for your social profiles in minutes.", date:"August 2026", read:"4 min read"},
  {slug:"schedule-social-posts-in-advance", title:"How to Schedule Social Posts in Advance", excerpt:"Batch your posting so you're not writing captions every single day.", date:"August 2026", read:"5 min read"},
  {slug:"create-a-simple-brand-kit", title:"How to Create a Simple Brand Kit", excerpt:"Lock in your colors, fonts and logo so everything looks consistent.", date:"July 2026", read:"5 min read"},
  {slug:"set-up-a-home-recording-corner", title:"How to Set Up a Home Recording Corner", excerpt:"Improve your lighting and sound with a small, affordable setup.", date:"July 2026", read:"6 min read"},
  {slug:"repurpose-one-video-into-five-posts", title:"How to Repurpose One Video Into Five Posts", excerpt:"Get more mileage out of every piece of content you film.", date:"July 2026", read:"5 min read"},
  {slug:"write-a-hook-for-short-form-video", title:"How to Write a Hook for Short-Form Video", excerpt:"The first three seconds decide whether someone keeps watching.", date:"June 2026", read:"4 min read"},
  {slug:"set-up-analytics-for-a-new-website", title:"How to Set Up Analytics for a New Website", excerpt:"Track what matters from day one without overcomplicating it.", date:"June 2026", read:"5 min read"},
  {slug:"plan-a-week-of-content-in-one-sitting", title:"How to Plan a Week of Content in One Sitting", excerpt:"A short weekly planning session that saves hours during the week.", date:"June 2026", read:"5 min read"},
  {slug:"create-a-simple-media-kit", title:"How to Create a Simple Media Kit", excerpt:"Put your stats and rates in one place for brand collaborations.", date:"May 2026", read:"4 min read"},
  {slug:"set-up-email-newsletter-basics", title:"Email Newsletter Basics for Beginners", excerpt:"Get your first newsletter out without getting stuck on tools.", date:"May 2026", read:"5 min read"}
];

const withCategory = (items, category) => items.map(a => ({...a, category}));

const articles = [
  ...withCategory(videoEditing, "Video Editing"),
  ...withCategory(websites, "Websites"),
  ...withCategory(techTips, "Tech Tips"),
  ...withCategory(tutorials, "Tutorials")
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
      <div><h4>Social</h4><a href="YOUR_FACEBOOK_URL">Facebook</a><a href="YOUR_TIKTOK_URL">TikTok</a><a href="YOUR_YOUTUBE_URL">YouTube</a><a href="YOUR_INSTAGRAM_URL">Instagram</a></div>
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
      <div className="article-grid">{articles.slice(0,3).map(a=><ArticleCard a={a} key={a.slug}/>)}</div>
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
    <Route path="/video-editing" element={<Listing title="Video Editing" kicker="CREATOR LAB" items={withCategory(videoEditing,"Video Editing")}/>}/>
    <Route path="/websites" element={<Listing title="Useful Websites" kicker="WEB DISCOVERY" items={withCategory(websites,"Websites")}/>}/>
    <Route path="/tech-tips" element={<Listing title="Tech Tips" kicker="QUICK WINS" items={withCategory(techTips,"Tech Tips")}/>}/>
    <Route path="/tutorials" element={<Listing title="Tutorials" kicker="HOW TO" items={withCategory(tutorials,"Tutorials")}/>}/>
    <Route path="/blog" element={<Listing title="SK TECH7 Journal" kicker="THE JOURNAL" items={articles}/>}/>
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