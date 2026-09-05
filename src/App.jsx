import React, { useMemo, useState } from "react";
import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";

const tools = [
  {slug:"ai-writing-assistants", name:"AI Writing Assistants", cat:"Writing", desc:"Draft blog posts, captions and outlines faster, then edit for your own voice.",
    sections:[
      {h:"What these tools help with", p:"AI writing assistants help draft outlines, rewrite awkward sentences and brainstorm ideas faster than starting from a blank page."},
      {h:"What to check before relying on one", p:"Always review facts, tone and originality yourself — treat the output as a first draft, not a finished piece."}
    ]},
  {slug:"ai-seo-assistants", name:"AI SEO Assistants", cat:"Writing", desc:"Get keyword suggestions and readability feedback while you write.",
    sections:[
      {h:"What these tools help with", p:"They suggest relevant keywords, flag readability issues and highlight missing structure like headings or meta descriptions."},
      {h:"What to check before relying on one", p:"Keyword suggestions should still match what your actual audience searches for, not just what the tool ranks highest."}
    ]},
  {slug:"ai-repurposing-tools", name:"AI Repurposing Tools", cat:"Writing", desc:"Turn one long article into social captions, threads and summaries.",
    sections:[
      {h:"What these tools help with", p:"They turn one long piece of content into shorter formats like captions, summaries or social posts automatically."},
      {h:"What to check before relying on one", p:"Re-read repurposed snippets for context — a line pulled out of order can misrepresent the original point."}
    ]},
  {slug:"ai-image-generators", name:"AI Image Generators", cat:"Image", desc:"Turn text prompts into concept art, thumbnails and social graphics.",
    sections:[
      {h:"What these tools help with", p:"They turn text prompts into original images useful for concept art, thumbnails and social graphics."},
      {h:"What to check before relying on one", p:"Check each tool's commercial-use and ownership terms before using generated images in paid work."}
    ]},
  {slug:"ai-image-upscalers", name:"AI Image Upscalers", cat:"Image", desc:"Sharpen low-resolution photos and old images without losing detail.",
    sections:[
      {h:"What these tools help with", p:"They add detail back into low-resolution images, useful for old photos or small source files."},
      {h:"What to check before relying on one", p:"Results vary a lot by source quality — a heavily compressed image won't upscale as cleanly as a clean but small one."}
    ]},
  {slug:"ai-background-removers", name:"AI Background Removers", cat:"Image", desc:"Cut out subjects instantly for product shots and thumbnails.",
    sections:[
      {h:"What these tools help with", p:"They isolate a subject from its background in seconds, useful for product shots and thumbnails."},
      {h:"What to check before relying on one", p:"Zoom in on edges like hair or fur, since automatic cutouts can leave rough spots that need a manual touch-up."}
    ]},
  {slug:"ai-video-enhancers", name:"AI Video Enhancers", cat:"Video", desc:"Automatically stabilize, upscale and clean up shaky footage.",
    sections:[
      {h:"What these tools help with", p:"They stabilize shaky footage, upscale resolution and reduce visual noise automatically."},
      {h:"What to check before relying on one", p:"Heavy enhancement can introduce artifacts, so preview a short clip before processing an entire project."}
    ]},
  {slug:"ai-caption-subtitle-tools", name:"AI Caption & Subtitle Tools", cat:"Video", desc:"Generate accurate subtitles and auto-sync captions for reels.",
    sections:[
      {h:"What these tools help with", p:"They auto-generate synced captions and subtitles, saving significant manual transcription time."},
      {h:"What to check before relying on one", p:"Always proofread auto-captions — names, technical terms and accents are common sources of errors."}
    ]},
  {slug:"ai-video-summarizers", name:"AI Video Summarizers", cat:"Video", desc:"Turn long recordings into short highlight clips automatically.",
    sections:[
      {h:"What these tools help with", p:"They condense long recordings into short highlight clips or written summaries automatically."},
      {h:"What to check before relying on one", p:"Watch the highlighted moments yourself — automated summaries can miss context that changes the meaning."}
    ]},
  {slug:"ai-voice-cleanup-tools", name:"AI Voice Cleanup Tools", cat:"Audio", desc:"Remove background noise and level out voice recordings automatically.",
    sections:[
      {h:"What these tools help with", p:"They remove background noise and even out volume levels in recorded audio."},
      {h:"What to check before relying on one", p:"Over-processing can make voices sound unnatural, so compare the cleaned version against the original before finalizing."}
    ]},
  {slug:"ai-text-to-speech", name:"AI Text-to-Speech", cat:"Audio", desc:"Convert scripts into natural-sounding voiceovers in multiple languages.",
    sections:[
      {h:"What these tools help with", p:"They convert written scripts into natural-sounding voiceovers in multiple languages and accents."},
      {h:"What to check before relying on one", p:"Listen for mispronounced words or odd pacing on names and technical terms before publishing."}
    ]},
  {slug:"productivity-ai-assistants", name:"Productivity AI Assistants", cat:"Productivity", desc:"Summarize documents and organize research notes automatically.",
    sections:[
      {h:"What these tools help with", p:"They summarize long documents, organize notes and help structure research automatically."},
      {h:"What to check before relying on one", p:"Verify any summarized facts against the source before using them in something important."}
    ]},
  {slug:"ai-meeting-transcription", name:"AI Meeting Transcription", cat:"Productivity", desc:"Automatically transcribe and summarize calls and meetings.",
    sections:[
      {h:"What these tools help with", p:"They transcribe calls and meetings automatically and often generate a short summary of key points."},
      {h:"What to check before relying on one", p:"Check your organization's policy on recording and transcribing calls before turning this on."}
    ]},
  {slug:"ai-coding-assistants", name:"AI Coding Assistants", cat:"Coding", desc:"Get inline code suggestions, explanations and quick debugging help.",
    sections:[
      {h:"What these tools help with", p:"They suggest code as you type and can explain unfamiliar functions or errors."},
      {h:"What to check before relying on one", p:"Review suggested code before running it — assistants can produce code that looks correct but has subtle bugs."}
    ]},
  {slug:"ai-code-review-tools", name:"AI Code Review Tools", cat:"Coding", desc:"Catch bugs and style issues automatically before you ship.",
    sections:[
      {h:"What these tools help with", p:"They scan code for common bugs, style issues and potential security problems automatically."},
      {h:"What to check before relying on one", p:"Treat flagged issues as a starting point for review, not a final verdict — false positives happen."}
    ]}
];

const videoEditing = [
  {slug:"better-mobile-video-editing", title:"A Smarter Workflow for Mobile Video Editing", excerpt:"Build a repeatable editing workflow that saves time without sacrificing quality.", date:"September 2026", read:"5 min read",
    sections:[{h:"Plan before you shoot", p:"Decide the sequence of shots you'll need before you start filming, so editing becomes assembly instead of guesswork."},{h:"Keep a repeatable structure", p:"Use the same project template, folder layout and export preset every time so each edit takes less mental effort than the last."}]},
  {slug:"color-grading-basics-for-beginners", title:"Color Grading Basics for Beginners", excerpt:"A simple approach to giving your footage a consistent, polished look.", date:"September 2026", read:"6 min read",
    sections:[{h:"Fix exposure and white balance first", p:"Correct brightness and color temperature before applying any creative look, since a stylized grade only makes existing problems more visible."},{h:"Apply one consistent look", p:"Pick a single style for a project and apply it across every clip so the finished video feels like one piece rather than several mismatched shots."}]},
  {slug:"how-to-cut-jump-cuts-cleanly", title:"How to Cut Jump Cuts Cleanly", excerpt:"Keep talking-head videos tight and watchable without jarring transitions.", date:"August 2026", read:"4 min read",
    sections:[{h:"Trim on natural pauses", p:"Cut where a sentence or breath naturally ends so the jump feels intentional instead of jarring."},{h:"Add small transition helpers", p:"A brief zoom, whip pan or sound effect between cuts can smooth over a jump cut without adding a full effect."}]},
  {slug:"best-export-settings-for-social-media", title:"Best Export Settings for Social Media", excerpt:"Avoid blurry uploads by matching your export settings to each platform.", date:"August 2026", read:"5 min read",
    sections:[{h:"Match resolution to the platform", p:"Vertical 1080x1920 works for most reels and stories, while horizontal 1920x1080 suits longer platform-native uploads."},{h:"Keep bitrate high enough", p:"Export at a high enough bitrate that compression on upload doesn't turn fine detail into blur."}]},
  {slug:"building-a-b-roll-library", title:"Building a B-Roll Library You'll Actually Use", excerpt:"Organize supporting footage so it's easy to find when you're editing.", date:"August 2026", read:"6 min read",
    sections:[{h:"Shoot in batches", p:"Film several minutes of general supporting footage each time you're already set up, instead of scrambling for it during editing."},{h:"Tag and organize as you go", p:"Name and sort clips by subject right after importing them, so future you can find the right shot in seconds."}]},
  {slug:"audio-ducking-explained", title:"Audio Ducking Explained", excerpt:"Automatically lower music when someone's talking for a cleaner mix.", date:"July 2026", read:"4 min read",
    sections:[{h:"What ducking actually does", p:"Ducking automatically lowers background music whenever there's spoken dialogue, then brings it back up once the talking stops."},{h:"Set it up without overdoing it", p:"A gentle 6-10 decibel dip usually keeps voices clear without making the music disappear completely."}]},
  {slug:"transitions-that-dont-look-cheesy", title:"Transitions That Don't Look Cheesy", excerpt:"A few tasteful transition styles that hold up over time.", date:"July 2026", read:"5 min read",
    sections:[{h:"Less is usually more", p:"A simple cut or short cross-dissolve reads as more professional than a flashy spin or page-curl effect."},{h:"Match the transition to the content", p:"Use motion-based transitions like whip pans only when the footage itself has motion to match, so the cut feels earned."}]},
  {slug:"speed-ramping-for-dynamic-clips", title:"Speed Ramping for More Dynamic Clips", excerpt:"Add energy to footage by easing between fast and slow motion.", date:"July 2026", read:"5 min read",
    sections:[{h:"Ease in and out of speed changes", p:"A sudden jump from slow motion to normal speed feels jarring; a short ramp between the two feels intentional."},{h:"Use it to emphasize a moment", p:"Save speed ramps for genuinely important beats in a video instead of applying them to every clip."}]},
  {slug:"organizing-your-editing-timeline", title:"Organizing Your Editing Timeline", excerpt:"A folder and track naming system that keeps big projects manageable.", date:"June 2026", read:"4 min read",
    sections:[{h:"Separate tracks by purpose", p:"Keep dialogue, music, sound effects and B-roll on their own dedicated tracks so nothing gets buried or accidentally moved."},{h:"Name everything clearly", p:"Rename clips and markers as you import them rather than relying on default file names later in the edit."}]},
  {slug:"shooting-footage-that-edits-itself", title:"Shooting Footage That Edits Itself", excerpt:"Plan your shots so the edit comes together with far less effort.", date:"June 2026", read:"6 min read",
    sections:[{h:"Shoot with the edit in mind", p:"Film establishing shots, close-ups and reaction shots for every scene so you have options instead of gaps later."},{h:"Leave a few extra seconds", p:"Roll a couple of extra seconds before and after the action you want, giving yourself room to trim cleanly."}]},
  {slug:"green-screen-basics-at-home", title:"Green Screen Basics at Home", excerpt:"Get a clean key without a professional lighting setup.", date:"June 2026", read:"6 min read",
    sections:[{h:"Light the background evenly", p:"Uneven lighting on the green screen is the most common cause of a rough, patchy key."},{h:"Keep distance from the backdrop", p:"Standing a few feet away from the green screen reduces spill and makes edges easier to clean up."}]},
  {slug:"batch-editing-workflow-for-creators", title:"A Batch Editing Workflow for Creators", excerpt:"Edit a week of content in one sitting using templates and presets.", date:"May 2026", read:"5 min read",
    sections:[{h:"Group similar tasks together", p:"Do all your rough cuts first, then all your color work, then all your captions, instead of finishing one video at a time."},{h:"Reuse a template project", p:"Start every new edit from a template with your usual settings already in place, so setup takes seconds instead of minutes."}]}
];

const websites = [
  {slug:"useful-websites-for-creators", title:"Useful Websites That Can Make Creator Work Easier", excerpt:"A curated starting point for online tools that help with everyday creator tasks.", date:"September 2026", read:"7 min read",
    sections:[{h:"Bookmark by task, not by name", p:"Organize saved tools into folders like 'editing', 'design' and 'writing' so you reach for the right one without hunting."},{h:"Test before you commit", p:"Try the free tier of a new site on a real task before replacing a tool you already rely on."}]},
  {slug:"free-stock-photo-and-video-sites", title:"Free Stock Photo and Video Sites Worth Bookmarking", excerpt:"Where to find quality footage and images without breaking a budget.", date:"August 2026", read:"5 min read",
    sections:[{h:"Check the license before using anything", p:"Free doesn't always mean unrestricted — confirm whether attribution or commercial-use limits apply."},{h:"Search with specific keywords", p:"Broad searches return generic results; adding details like mood, angle or setting narrows things down faster."}]},
  {slug:"best-font-pairing-tools-online", title:"The Best Font Pairing Tools Online", excerpt:"Quickly find fonts that actually work well together.", date:"August 2026", read:"4 min read",
    sections:[{h:"Pair contrast, not similarity", p:"A bold display font usually works better with a plain, simple body font than with another decorative one."},{h:"Limit yourself to two fonts", p:"Two well-paired fonts look more polished than three or four competing for attention."}]},
  {slug:"color-palette-generators-worth-bookmarking", title:"Color Palette Generators Worth Bookmarking", excerpt:"Build consistent color schemes for thumbnails, decks and websites.", date:"August 2026", read:"4 min read",
    sections:[{h:"Start from one anchor color", p:"Pick the one color your brand must include, then build a palette generator's suggestions around it."},{h:"Check contrast for readability", p:"Make sure text colors stay readable against your chosen backgrounds, especially on mobile screens."}]},
  {slug:"free-file-conversion-websites", title:"Free File Conversion Websites That Just Work", excerpt:"Convert documents, images and video formats without installing software.", date:"July 2026", read:"5 min read",
    sections:[{h:"Watch for file size limits", p:"Free converters often cap file size, so check the limit before uploading something large."},{h:"Be careful with sensitive files", p:"Avoid uploading anything private or confidential to a converter you don't fully trust."}]},
  {slug:"background-remover-websites", title:"Background Remover Websites Compared", excerpt:"Fast, browser-based options for cutting out subjects from photos.", date:"July 2026", read:"4 min read",
    sections:[{h:"Works best with clear edges", p:"Photos with a sharp subject and simple background give the cleanest automatic results."},{h:"Zoom in to check edges", p:"Automatic tools can leave stray pixels around hair or fine detail, so a quick manual touch-up often helps."}]},
  {slug:"websites-for-royalty-free-music", title:"Websites for Royalty-Free Music", excerpt:"Find safe-to-use background music for videos and streams.", date:"July 2026", read:"5 min read",
    sections:[{h:"Read the usage terms", p:"Some tracks are free for personal use only, while others require a credit or a paid license for monetized content."},{h:"Match the mood to the content", p:"Pick music by energy and pacing first, since a mismatched tempo can undercut an otherwise good edit."}]},
  {slug:"link-in-bio-page-builders", title:"Link-in-Bio Page Builders Worth Trying", excerpt:"Turn one profile link into a simple hub for everything you share.", date:"June 2026", read:"4 min read",
    sections:[{h:"Keep it to a few key links", p:"A page with ten links loses people; three to five clear options convert better."},{h:"Update it when your focus changes", p:"Treat the page as a living thing tied to your current project, not a one-time setup."}]},
  {slug:"resume-and-portfolio-site-builders", title:"Resume and Portfolio Site Builders", excerpt:"Put together a clean personal site without touching any code.", date:"June 2026", read:"5 min read",
    sections:[{h:"Lead with your best work", p:"Put your strongest project first, since most visitors won't scroll through everything."},{h:"Keep contact info obvious", p:"Make it easy to reach you within one click from the homepage."}]},
  {slug:"website-speed-testing-tools", title:"Website Speed Testing Tools Explained", excerpt:"Understand what these tools measure and which numbers actually matter.", date:"June 2026", read:"5 min read",
    sections:[{h:"Understand what's being measured", p:"Look at load time and how quickly the main content appears, not just an overall score."},{h:"Test on mobile settings too", p:"A site that loads fast on desktop Wi-Fi can still be slow on a typical mobile connection."}]},
  {slug:"free-icon-and-illustration-libraries", title:"Free Icon and Illustration Libraries", excerpt:"Sources for consistent icon sets and illustrations for your projects.", date:"May 2026", read:"4 min read",
    sections:[{h:"Stick to one visual style", p:"Mixing flat icons with detailed illustrations in one project usually looks inconsistent."},{h:"Check the license type", p:"Some libraries require attribution, so keep a note of where each asset came from."}]},
  {slug:"website-uptime-monitoring-tools", title:"Website Uptime Monitoring Tools", excerpt:"Get notified the moment your site goes down, not hours later.", date:"May 2026", read:"5 min read",
    sections:[{h:"Set alerts you'll actually see", p:"Connect uptime checks to email or a messaging app you check often, not one you rarely open."},{h:"Check from more than one location", p:"A single check point can miss regional outages, so pick a tool that tests from multiple regions."}]}
];

const techTips = [
  {slug:"speed-up-a-slow-laptop", title:"How to Speed Up a Slow Laptop", excerpt:"A few practical checks before you consider buying new hardware.", date:"September 2026", read:"5 min read",
    sections:[{h:"Check startup programs first", p:"Too many apps launching at boot is one of the most common causes of a slow start."},{h:"Clear temporary files", p:"Built-up cache and temp files can quietly eat storage and slow things down over time."}]},
  {slug:"organize-your-cloud-storage", title:"How to Organize Your Cloud Storage", excerpt:"A simple folder structure that scales as your files grow.", date:"August 2026", read:"4 min read",
    sections:[{h:"Use a consistent top-level structure", p:"A small number of clearly named main folders beats dozens of loosely organized ones."},{h:"Archive, don't delete", p:"Move old files to an archive folder instead of scattering them, keeping your active folders lean."}]},
  {slug:"two-factor-authentication-basics", title:"Two-Factor Authentication Basics", excerpt:"Why it matters and how to set it up on your important accounts.", date:"August 2026", read:"5 min read",
    sections:[{h:"Why it helps", p:"A password alone can be stolen or guessed; a second step makes that stolen password far less useful on its own."},{h:"Choose an app over SMS when possible", p:"Authenticator apps are generally more secure than text-message codes, which can be intercepted."}]},
  {slug:"extend-your-phone-battery-life", title:"Simple Ways to Extend Your Phone's Battery Life", excerpt:"Small settings changes that add up over a full day of use.", date:"August 2026", read:"4 min read",
    sections:[{h:"Lower screen brightness and timeout", p:"The display is usually the single biggest drain on battery life."},{h:"Limit background app refresh", p:"Apps refreshing in the background use power even when you're not actively using them."}]},
  {slug:"backup-your-files-the-right-way", title:"How to Back Up Your Files the Right Way", excerpt:"A basic 3-2-1 approach so you never lose important work.", date:"July 2026", read:"5 min read",
    sections:[{h:"Follow the 3-2-1 rule", p:"Keep three copies of important files, on two different types of storage, with one copy off-site or in the cloud."},{h:"Test your backups occasionally", p:"A backup you've never opened might not actually work when you need it."}]},
  {slug:"clean-up-browser-extensions-safely", title:"How to Clean Up Browser Extensions Safely", excerpt:"Spot the ones that are slowing you down or watching more than they should.", date:"July 2026", read:"4 min read",
    sections:[{h:"Review what you no longer use", p:"Extensions you installed once and forgot about can still be running and collecting data."},{h:"Check permissions before keeping one", p:"An extension that asks to read and change everything you see on every website deserves a second look."}]},
  {slug:"spot-a-phishing-email", title:"How to Spot a Phishing Email", excerpt:"The warning signs that show up before you ever click a link.", date:"July 2026", read:"5 min read",
    sections:[{h:"Check the sender address closely", p:"A display name can be faked; the actual email address behind it usually gives it away."},{h:"Be wary of urgency", p:"Messages pushing you to act immediately or lose access are a common pressure tactic."}]},
  {slug:"free-up-storage-on-your-phone", title:"How to Free Up Storage on Your Phone", excerpt:"Find what's actually taking up space before you delete anything important.", date:"June 2026", read:"4 min read",
    sections:[{h:"Find the largest files first", p:"Videos and app caches usually take up far more space than photos or documents."},{h:"Offload instead of delete", p:"Move older photos and videos to cloud storage before removing them from your device."}]},
  {slug:"keyboard-shortcuts-that-save-time", title:"Keyboard Shortcuts That Actually Save Time", excerpt:"A short list worth memorizing if you work at a computer daily.", date:"June 2026", read:"4 min read",
    sections:[{h:"Learn a few, not all of them", p:"A handful of shortcuts used daily save more time than memorizing a full list you'll rarely use."},{h:"Build the habit gradually", p:"Add one new shortcut to your routine at a time until it becomes automatic."}]},
  {slug:"secure-your-home-wifi-network", title:"How to Secure Your Home Wi-Fi Network", excerpt:"A few settings that make a real difference in under ten minutes.", date:"June 2026", read:"5 min read",
    sections:[{h:"Change the default admin password", p:"Routers often ship with a well-known default password that's easy to look up online."},{h:"Keep firmware updated", p:"Router updates often patch real security issues, so don't ignore them."}]},
  {slug:"manage-notifications-without-losing-focus", title:"How to Manage Notifications Without Losing Focus", excerpt:"Keep the alerts that matter and silence the ones that don't.", date:"May 2026", read:"4 min read",
    sections:[{h:"Turn off what doesn't need attention now", p:"Most apps default to sending far more notifications than you actually need."},{h:"Use scheduled quiet hours", p:"Silencing notifications during focus blocks reduces the temptation to check your phone."}]},
  {slug:"choose-a-password-manager", title:"How to Choose a Password Manager", excerpt:"What to look for before you commit to one for the long term.", date:"May 2026", read:"5 min read",
    sections:[{h:"Look for cross-device sync", p:"A manager that works across your phone and computer is far more useful day to day."},{h:"Check how recovery works", p:"Understand what happens if you lose your master password before you rely on the tool completely."}]}
];

const tutorials = [
  {slug:"set-up-a-simple-content-calendar", title:"How to Set Up a Simple Content Calendar", excerpt:"Plan posts a week ahead without an overly complicated system.", date:"September 2026", read:"5 min read",
    sections:[{h:"Start with just one week", p:"Planning one week ahead is more sustainable than trying to plan a full month right away."},{h:"Use whatever tool you'll actually open", p:"A simple spreadsheet you check daily beats an elaborate system you abandon after a week."}]},
  {slug:"record-clean-audio-with-a-phone", title:"How to Record Clean Audio With Just a Phone", excerpt:"Get usable sound without buying a dedicated microphone yet.", date:"August 2026", read:"5 min read",
    sections:[{h:"Get the phone close to the source", p:"Distance is the biggest factor in audio quality — closer almost always sounds better than a fancier microphone far away."},{h:"Record in a quiet, soft room", p:"A small room with soft furnishings absorbs echo better than a large, empty space."}]},
  {slug:"build-a-basic-linktree-page", title:"How to Build a Basic Link-in-Bio Page", excerpt:"Set up a simple landing page for your social profiles in minutes.", date:"August 2026", read:"4 min read",
    sections:[{h:"Pick your most important links only", p:"Start with the two or three destinations you actually want people to visit."},{h:"Update it before big posts", p:"Refresh the top link whenever you're promoting something specific."}]},
  {slug:"schedule-social-posts-in-advance", title:"How to Schedule Social Posts in Advance", excerpt:"Batch your posting so you're not writing captions every single day.", date:"August 2026", read:"5 min read",
    sections:[{h:"Batch your captions", p:"Write several captions in one sitting instead of composing each post the day it goes out."},{h:"Leave room for real-time posts", p:"Keep some space in your schedule for timely or reactive content."}]},
  {slug:"create-a-simple-brand-kit", title:"How to Create a Simple Brand Kit", excerpt:"Lock in your colors, fonts and logo so everything looks consistent.", date:"July 2026", read:"5 min read",
    sections:[{h:"Lock in three colors and two fonts", p:"A small, consistent set is easier to apply everywhere than an open-ended list of options."},{h:"Save it somewhere accessible", p:"Keep your brand kit in one shared document so you're not guessing the exact color code each time."}]},
  {slug:"set-up-a-home-recording-corner", title:"How to Set Up a Home Recording Corner", excerpt:"Improve your lighting and sound with a small, affordable setup.", date:"July 2026", read:"6 min read",
    sections:[{h:"Prioritize light before gear", p:"Even a basic camera looks good with soft, even lighting; expensive gear can't fully fix bad light."},{h:"Treat the room for sound", p:"Soft furnishings, rugs and curtains reduce echo more than most people expect."}]},
  {slug:"repurpose-one-video-into-five-posts", title:"How to Repurpose One Video Into Five Posts", excerpt:"Get more mileage out of every piece of content you film.", date:"July 2026", read:"5 min read",
    sections:[{h:"Pull out the strongest moments", p:"Identify two or three standout clips from a longer video that work on their own."},{h:"Reframe for each platform", p:"Recut aspect ratio and pacing to fit where each clip will actually be posted."}]},
  {slug:"write-a-hook-for-short-form-video", title:"How to Write a Hook for Short-Form Video", excerpt:"The first three seconds decide whether someone keeps watching.", date:"June 2026", read:"4 min read",
    sections:[{h:"Lead with the payoff, not the setup", p:"Tell people what they'll get in the first line instead of building up to it."},{h:"Keep the first few words simple", p:"Short, punchy language reads faster than a long explanatory sentence."}]},
  {slug:"set-up-analytics-for-a-new-website", title:"How to Set Up Analytics for a New Website", excerpt:"Track what matters from day one without overcomplicating it.", date:"June 2026", read:"5 min read",
    sections:[{h:"Track a few key numbers first", p:"Visitors, top pages and traffic sources are enough to start — you can add more later."},{h:"Check it weekly, not hourly", p:"A regular weekly review gives clearer trends than obsessively refreshing daily numbers."}]},
  {slug:"plan-a-week-of-content-in-one-sitting", title:"How to Plan a Week of Content in One Sitting", excerpt:"A short weekly planning session that saves hours during the week.", date:"June 2026", read:"5 min read",
    sections:[{h:"Set a fixed planning time", p:"A recurring weekly slot keeps planning from constantly getting pushed aside."},{h:"Write topics before full posts", p:"List out ideas for the whole week before writing any single post in full."}]},
  {slug:"create-a-simple-media-kit", title:"How to Create a Simple Media Kit", excerpt:"Put your stats and rates in one place for brand collaborations.", date:"May 2026", read:"4 min read",
    sections:[{h:"Keep it to one page", p:"A short, clear overview is easier for brands to review than a lengthy document."},{h:"Update your stats regularly", p:"Outdated numbers can undersell your current reach, so refresh them periodically."}]},
  {slug:"set-up-email-newsletter-basics", title:"Email Newsletter Basics for Beginners", excerpt:"Get your first newsletter out without getting stuck on tools.", date:"May 2026", read:"5 min read",
    sections:[{h:"Start with a simple template", p:"A clean, consistent layout matters more early on than a complex design."},{h:"Set a realistic sending schedule", p:"A newsletter you send reliably every two weeks beats one you promise weekly and skip."}]}
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

function ToolCard({t}){return <Link className="tool-card" to={"/ai-tools/"+t.slug}><div className="tool-icon">✦</div><span className="pill">{t.cat}</span><h3>{t.name}</h3><p>{t.desc}</p><span className="small-btn">Read review ↗</span></Link>}
function ArticleCard({a}){return <Link className="article-card" to={"/blog/"+a.slug}><div className="article-visual"><span>{a.category}</span><strong>SK<span>7</span></strong></div><div className="article-body"><div className="meta">{a.date} · {a.read}</div><h3>{a.title}</h3><p>{a.excerpt}</p><span className="text-link">Read article ↗</span></div></Link>}

function Listing({title,kicker,items=articles}){return <Layout><section className="page-head"><span className="kicker">{kicker}</span><h1>{title}</h1><p>Explore SK TECH7's practical guides and resources.</p></section><AdSlot/><section className="section"><div className="article-grid">{items.map(a=><ArticleCard a={a} key={a.slug}/>)}</div></section></Layout>}

function ToolsPage(){return <Layout><section className="page-head"><span className="kicker">DIRECTORY</span><h1>AI Tools</h1><p>Explore categories of AI tools and learn how to use them effectively.</p></section><section className="section"><div className="tool-grid">{tools.map(t=><ToolCard t={t} key={t.name}/>)}</div></section></Layout>}

function ArticlePage(){const {slug}=useParams(); const a=articles.find(x=>x.slug===slug)||articles[0]; return <Layout><article className="article-page"><span className="kicker">{a.category}</span><h1>{a.title}</h1><div className="meta">{a.date} · {a.read}</div><div className="article-hero"><strong>SK TECH7</strong></div><AdSlot/><div className="prose"><p>{a.excerpt}</p>{a.sections.map((s,i)=><React.Fragment key={i}><h2>{s.h}</h2><p>{s.p}</p></React.Fragment>)}</div></article></Layout>}

function ToolReviewPage(){const {slug}=useParams(); const t=tools.find(x=>x.slug===slug)||tools[0]; return <Layout><article className="article-page"><span className="kicker">{t.cat}</span><h1>{t.name}</h1><div className="meta">AI Tools · Directory</div><div className="article-hero"><strong>SK TECH7</strong></div><AdSlot/><div className="prose"><p>{t.desc}</p>{t.sections.map((s,i)=><React.Fragment key={i}><h2>{s.h}</h2><p>{s.p}</p></React.Fragment>)}<h2>Before you use it</h2><p>Add the official tool's website link here once you've picked a specific provider, and update this review with your own hands-on notes.</p></div></article></Layout>}

function Legal({type}){const copy={privacy:["Privacy Policy","SK TECH7 respects your privacy. This page is a starter template and should be reviewed and customized to match the analytics, advertising, forms and third-party services actually used on your website."],terms:["Terms & Conditions","By using SK TECH7, you agree to use the website lawfully and responsibly. Content is provided for general informational purposes and may change without notice."],disclaimer:["Disclaimer","SK TECH7 provides technology information, tutorials and recommendations for educational and informational purposes. Verify important product, pricing, security and availability information with official sources."],cookie:["Cookie Policy","SK TECH7 may use cookies and similar technologies for essential functionality, analytics and advertising. Update this page to reflect the services actually enabled on the site."]}; const [h,p]=copy[type]; return <Layout><section className="legal"><span className="kicker">LEGAL</span><h1>{h}</h1><p>{p}</p><h2>Important</h2><p>Replace this starter text with a policy reviewed for your actual business, audience, jurisdiction, advertising providers and data practices. Do not publish placeholder legal text unchanged.</p></section></Layout>}

function About(){return <Layout><section className="legal"><span className="kicker">THE BRAND</span><h1>About SK TECH7</h1><p>SK TECH7 is a technology-focused platform covering AI tools, useful websites, video editing, creator tools and practical tutorials.</p><p>The goal is simple: turn interesting technology discoveries into clear, useful guides that creators can apply.</p></section></Layout>}
function Contact(){return <Layout><section className="legal"><span className="kicker">GET IN TOUCH</span><h1>Contact SK TECH7</h1><p>Use the form below for general questions, corrections or collaboration enquiries.</p><form className="contact-form" onSubmit={e=>{e.preventDefault();alert("Connect this form to your backend/email provider before launch.")}}><input required placeholder="Name"/><input required type="email" placeholder="Email"/><input required placeholder="Subject"/><textarea required rows="7" placeholder="Message"/><button className="btn primary">Send message</button></form></section></Layout>}

function Search(){const [q,setQ]=useState(""); const results=useMemo(()=>articles.filter(a=>(a.title+a.excerpt+a.category).toLowerCase().includes(q.toLowerCase())),[q]); return <Layout><section className="page-head"><span className="kicker">SEARCH</span><h1>Find something useful.</h1><input className="search-input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search articles..."/><p>{q?`${results.length} result(s) found.`:"Start typing to search."}</p></section><section className="section"><div className="article-grid">{results.map(a=><ArticleCard a={a} key={a.slug}/>)}</div></section></Layout>}

export default function App(){
  return <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/ai-tools" element={<ToolsPage/>}/>
    <Route path="/ai-tools/:slug" element={<ToolReviewPage/>}/>
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
