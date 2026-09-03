/* ------------------------------------------------------------------ */
/*  Ashgrove Academy — central content & data layer                    */
/* ------------------------------------------------------------------ */

export const IMAGES = {
  hero: "https://image.qwenlm.ai/generated-images/0ea5c139-4cd8-43f9-9ba3-d3dc4988f912/_result.png",
  classroom: "https://image.qwenlm.ai/generated-images/a1db1a94-ea3f-471b-bd6f-f45000d792bd/_result.png",
  science: "https://image.qwenlm.ai/generated-images/107945c1-38fb-4da3-96dc-20553063d44f/_result.png",
  library: "https://image.qwenlm.ai/generated-images/1cedfad0-035a-4860-9187-a393a02caf24/_result.png",
  sports: "https://image.qwenlm.ai/generated-images/b10b72ce-5cb8-4f47-baa9-022d2fb4f5ce/_result.png",
  arts: "https://image.qwenlm.ai/generated-images/d0bd0988-7e2b-420d-9ff6-e80bab26c519/_result.png",
  music: "https://image.qwenlm.ai/generated-images/3d697bfb-ca85-4c43-8672-5b85d89cc016/_result.png",
};

/* ----------------------------- dates ------------------------------ */
export function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}
const NOW = new Date();

export function fmtDate(d: Date, opts?: Intl.DateTimeFormatOptions): string {
  return d.toLocaleDateString("en-GB", opts ?? { day: "numeric", month: "short", year: "numeric" });
}
export function fmtDayMonth(d: Date): { day: string; month: string } {
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }),
  };
}

/* -------------------------- announcements ------------------------- */
export interface Announcement {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  date: string;
  pinned?: boolean;
  body: string;
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1", tag: "Term dates", tagColor: "bg-navy-900 text-chalk-50",
    title: "Half-term begins Friday 24th", date: fmtDate(addDays(NOW, 6)), pinned: true,
    body: "School closes at 12:30 on the last day of term. Boarding houses empty by 15:00; the school office remains open 09:00–13:00 throughout the break.",
  },
  {
    id: "a2", tag: "Admissions", tagColor: "bg-gold-500 text-navy-900",
    title: "Open Morning — booking now open", date: fmtDate(addDays(NOW, 18)), pinned: true,
    body: "Join the Head, Dr Eleanor Ashworth, for tours, taster lessons and a Q&A in the Great Hall. Places are limited to 60 families per session.",
  },
  {
    id: "a3", tag: "Sport", tagColor: "bg-moss-600 text-chalk-50",
    title: "1st XV fixture moved to home ground", date: fmtDate(addDays(NOW, 4)),
    body: "Saturday's match against Oakfield will now be played on the Upper Pitch. Kick-off 14:00 — supporters welcome, tea tent open from 13:00.",
  },
  {
    id: "a4", tag: "Uniform", tagColor: "bg-crimson-600 text-chalk-50",
    title: "Winter uniform from Monday", date: fmtDate(addDays(NOW, 9)),
    body: "Blazers and ties return for all year groups. House scarves are optional; coats must be plain navy or black.",
  },
  {
    id: "a5", tag: "Music", tagColor: "bg-navy-700 text-chalk-50",
    title: "Winter Concert tickets released", date: fmtDate(addDays(NOW, 12)),
    body: "The Chapel Orchestra and Senior Chamber Choir perform Vaughan Williams and Rutter. Free tickets via the school office.",
  },
  {
    id: "a6", tag: "Exams", tagColor: "bg-navy-900 text-chalk-50",
    title: "Mock timetable published", date: fmtDate(addDays(NOW, 2)),
    body: "Year 11 and 13 mock examination timetables are now on the portal. Individual statements will be emailed to parents this week.",
  },
];

export const TICKER_ITEMS = ANNOUNCEMENTS.map((a) => `${a.tag.toUpperCase()} · ${a.title} — ${a.date}`);

/* ------------------------------ news ------------------------------ */
export interface NewsItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  body: string;
  date: Date;
  image: string;
  featured?: boolean;
  author: string;
}

export const NEWS: NewsItem[] = [
  {
    id: "n1", category: "Academics", featured: true, image: IMAGES.science, author: "Mr J. Okafor, Head of Science",
    title: "Sixth Form team wins national chemistry Olympiad heat",
    excerpt: "Three Ashgrove students qualified for the UK Chemistry Olympiad final after a flawless practical round in Bristol.",
    body: "The team of Priya Nair, Tom Whitfield and Aisha Karim scored the joint-highest practical mark in the South West regional heat, held at the University of Bristol. The trio now head to Cambridge for the national final in the summer term. Head of Science Mr Okafor said the result reflected 'years of curiosity, not cramming'.",
    date: addDays(NOW, -3),
  },
  {
    id: "n2", category: "Sport", image: IMAGES.sports, author: "Mrs H. Doyle, Director of Sport",
    title: "1st XV reach county final for first time in a decade",
    excerpt: "A late try from captain Freddie Marsh sealed a 17–12 semi-final win over Oakfield on the Upper Pitch.",
    body: "In front of a record home crowd, the 1st XV ground out a famous victory to book a place in the county final. The forwards' second-half effort turned the game, and full-back Joey Adisa's boot added eleven points. The final takes place at the county ground next month.",
    date: addDays(NOW, -6),
  },
  {
    id: "n3", category: "Arts", image: IMAGES.music, author: "Mr S. Lindqvist, Director of Music",
    title: "Chapel Orchestra shortlisted for national music award",
    excerpt: "The orchestra's recording of the Holst St Paul's Suite has been shortlisted in the Schools' Performance category.",
    body: "Recorded in the chapel over two evenings in October, the performance beat entries from 140 schools to reach the shortlist. Winners will be announced at a ceremony in London. A public performance of the full programme closes this term's Winter Concert.",
    date: addDays(NOW, -11),
  },
  {
    id: "n4", category: "Community", image: IMAGES.classroom, author: "Miss R. Fenwick, Head of Lower School",
    title: "Lower School raises £4,200 for the harvest food bank",
    excerpt: "Pupils ran a harvest market, bake sale and sponsored readathon across three weeks.",
    body: "Every class in the Lower School adopted a stall or challenge for the harvest appeal. Year 4's sponsored readathon alone logged 3,100 pages. The total buys roughly 420 meals for the district food bank, which collected donations at the school gate.",
    date: addDays(NOW, -15),
  },
  {
    id: "n5", category: "Academics", image: IMAGES.library, author: "School Office",
    title: "New archive room opens in the Old Library",
    excerpt: "A dedicated archive preserves 112 years of school records, photographs and the founders' correspondence.",
    body: "The project, led by the History department with support from the Friends of Ashgrove, catalogues over 9,000 items dating to 1912. Researchers and alumni may book visits through the school office; a rolling exhibition opens to pupils this term.",
    date: addDays(NOW, -21),
  },
  {
    id: "n6", category: "School life", image: IMAGES.arts, author: "Ms P. Adeyemi, Head of Art",
    title: "Year 10 mural unveiled on the Design corridor",
    excerpt: "A six-week project exploring the school's four houses now spans twelve metres of corridor wall.",
    body: "Twenty-two artists worked in rotating crews during lunchtimes and art periods, guided by Head of Art Ms Adeyemi. The design interweaves the house emblems — raven, hart, beacon and key — with motifs drawn from the school archive.",
    date: addDays(NOW, -27),
  },
];

export const NEWS_CATEGORIES = ["All", "Academics", "Sport", "Arts", "Community", "School life"];

/* ----------------------------- events ----------------------------- */
export interface SchoolEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: "Open Day" | "Sport" | "Arts" | "Academic" | "Community";
  description: string;
}

export const EVENTS: SchoolEvent[] = [
  { id: "e1", title: "Autumn Parents' Evening (Years 7–9)", date: addDays(NOW, 3), time: "16:00 – 19:30", location: "Main School", type: "Community", description: "Bookable 10-minute slots with form tutors and subject teachers. Booking opens on the portal one week prior." },
  { id: "e2", title: "1st XV v Oakfield — Home fixture", date: addDays(NOW, 4), time: "14:00", location: "Upper Pitch", type: "Sport", description: "County semi-final replay on home turf. Tea tent open from 13:00." },
  { id: "e3", title: "Year 6 → 7 Taster Day", date: addDays(NOW, 7), time: "09:00 – 15:00", location: "Middle School", type: "Open Day", description: "Offered pupils spend a full day with their new form, including science labs and a games rotation." },
  { id: "e4", title: "Mock exams begin — Years 11 & 13", date: addDays(NOW, 10), time: "08:45 daily", location: "Great Hall", type: "Academic", description: "Full conditions, full timetables. Candidates arrive 20 minutes early; equipment lists on the portal." },
  { id: "e5", title: "House Cross-Country Championships", date: addDays(NOW, 13), time: "13:30", location: "Ashgrove Park", type: "Sport", description: "All four houses race across six age groups. Points count toward the House Shield." },
  { id: "e6", title: "Open Morning — Michaelmas", date: addDays(NOW, 18), time: "09:15 – 12:30", location: "Great Hall", type: "Open Day", description: "Head's address, guided tours, taster lessons and an admissions Q&A. Book via the enquiry form." },
  { id: "e7", title: "Winter Concert — Chapel Orchestra", date: addDays(NOW, 21), time: "18:30", location: "The Chapel", type: "Arts", description: "Vaughan Williams, Rutter and Holst, performed by the Chapel Orchestra and Senior Chamber Choir." },
  { id: "e8", title: "Friends of Ashgrove Christmas Fair", date: addDays(NOW, 26), time: "11:00 – 15:00", location: "Founders' Quad", type: "Community", description: "Stalls, carols from the Lower School choir, and the famous mince-pie stand. All proceeds to the bursary fund." },
  { id: "e9", title: "Sixth Form UCAS Evening", date: addDays(NOW, 30), time: "18:00 – 20:00", location: "Whitaker Lecture Theatre", type: "Academic", description: "Personal statement workshops, Oxbridge and medicine briefings, and a university fair with 40 institutions." },
  { id: "e10", title: "Junior Nativity — Lower School", date: addDays(NOW, 34), time: "10:30 & 14:00", location: "Great Hall", type: "Arts", description: "Reception to Year 2 perform two shows. Grandparents especially welcome at the morning performance." },
  { id: "e11", title: "Last day of term — early close", date: addDays(NOW, 41), time: "12:30", location: "Whole school", type: "Community", description: "Chapel service at 09:00 followed by house gatherings. Buses run on the early timetable." },
  { id: "e12", title: "Spring Term begins", date: addDays(NOW, 55), time: "08:45", location: "Whole school", type: "Academic", description: "Boarders return the evening before. First assembly introduces the Lent term's charity partnership." },
];

export const EVENT_TYPE_COLORS: Record<SchoolEvent["type"], string> = {
  "Open Day": "#d9a13b",
  Sport: "#3f6b4f",
  Arts: "#a8402f",
  Academic: "#27517f",
  Community: "#0c2340",
};

/* ------------------------------ houses ---------------------------- */
export interface House {
  name: string;
  emblem: string;
  color: string;
  softColor: string;
  motto: string;
  points: number;
  head: string;
}

export const HOUSES: House[] = [
  { name: "Ravensworth", emblem: "The Raven", color: "#0c2340", softColor: "#d9e3ee", motto: "Wing and word", points: 1240, head: "Mrs H. Doyle" },
  { name: "Hartley", emblem: "The Hart", color: "#3f6b4f", softColor: "#dce8de", motto: "Steady of heart", points: 1185, head: "Mr J. Okafor" },
  { name: "Beaumont", emblem: "The Beacon", color: "#b98426", softColor: "#f3e6c8", motto: "Shine onward", points: 1102, head: "Ms P. Adeyemi" },
  { name: "Kingsley", emblem: "The Key", color: "#a8402f", softColor: "#efdcd6", motto: "Open every door", points: 1064, head: "Mr S. Lindqvist" },
];

/* ----------------------------- academics -------------------------- */
export interface Stage {
  id: string;
  name: string;
  ages: string;
  years: string;
  image: string;
  summary: string;
  highlights: string[];
  subjects: string[];
}

export const STAGES: Stage[] = [
  {
    id: "lower", name: "Lower School", ages: "Ages 4–11", years: "Reception – Year 6", image: IMAGES.classroom,
    summary: "A warm, structured start where reading, number and curiosity are taught with intent. Classes of 18, specialist teaching from Year 3, and afternoons given to art, music, forest school and sport.",
    highlights: ["Phonics-led reading with daily one-to-one listening", "Mathematics mastery with concrete–pictorial–abstract progression", "Forest school every Friday for Reception–Year 2", "Instrumental programme: every child learns an instrument by Year 3"],
    subjects: ["English", "Mathematics", "Science", "History", "Geography", "French", "Art", "Music", "Drama", "Computing", "PE & Games", "PSHE"],
  },
  {
    id: "middle", name: "Middle School", ages: "Ages 11–16", years: "Years 7 – 11", image: IMAGES.science,
    summary: "A broad curriculum narrows gracefully toward GCSE. Twelve laboratory sciences hours a fortnight, a two-week design & technology rotation, and the Ashgrove Diploma — our own programme of public speaking, service and fieldcraft.",
    highlights: ["Triple science option from Year 9", "Ashgrove Diploma: oracy, service, expedition", "Dedicated study skills programme in Years 7–8", "1:1 reading and maths tutoring for every pupil"],
    subjects: ["English", "Mathematics", "Biology", "Chemistry", "Physics", "History", "Geography", "French", "Spanish", "Latin", "Art", "Music", "Drama", "Design & Technology", "Computing", "PE", "PSHE"],
  },
  {
    id: "sixth", name: "Sixth Form", ages: "Ages 16–18", years: "Years 12 – 13", image: IMAGES.library,
    summary: "A-levels taught in classes of ten, an Extended Project for every student, and a partnership timetable with two neighbouring schools that extends choice to 28 subjects. Leavers go on to Russell Group universities, conservatoires and apprenticeships alike.",
    highlights: ["28 A-level subjects via the Ash Vale partnership", "EPQ supervision from university-linked mentors", "Weekly Oxbridge, medicine and law clinics", "Sixth Form centre with silent library until 18:00"],
    subjects: ["Mathematics", "Further Maths", "Physics", "Chemistry", "Biology", "Economics", "History", "Politics", "English Literature", "French", "Spanish", "Latin", "Classics", "Art", "Music", "Drama", "Computer Science", "Philosophy & Ethics", "Psychology", "Geography"],
  },
];

export const EXAM_STATS = [
  { value: 78, suffix: "%", label: "GCSE grades 9–7" },
  { value: 61, suffix: "%", label: "A-level grades A*–A" },
  { value: 42, suffix: "", label: "Oxbridge offers, last 5 years" },
  { value: 100, suffix: "%", label: "First-choice university places" },
];

/* ----------------------------- leadership ------------------------- */
export interface Leader {
  name: string;
  role: string;
  initials: string;
  color: string;
  note: string;
}

export const LEADERSHIP: Leader[] = [
  { name: "Dr Eleanor Ashworth", role: "Headmistress", initials: "EA", color: "#0c2340", note: "Head since 2018. Former Deputy Head at Cranleigh, historian by training, teaches one Sixth Form seminar a week." },
  { name: "Mr James Okafor", role: "Deputy Head, Academic", initials: "JO", color: "#3f6b4f", note: "Leads curriculum, assessment and the Ashgrove Diploma. Chemistry teacher of fifteen years." },
  { name: "Mrs Harriet Doyle", role: "Deputy Head, Pupils", initials: "HD", color: "#a8402f", note: "Oversees pastoral care, boarding and safeguarding. Runs the lunchtime chess club, badly." },
  { name: "Ms Priya Adeyemi", role: "Head of Art & Design", initials: "PA", color: "#b98426", note: "Curator of the school collection and lead of the corridor mural programme." },
  { name: "Mr Sven Lindqvist", role: "Director of Music", initials: "SL", color: "#27517f", note: "Conducts the Chapel Orchestra; founded the county-wide schools' singing partnership." },
  { name: "Miss Ruth Fenwick", role: "Head of Lower School", initials: "RF", color: "#3f6b4f", note: "Twenty-two years in prep schools. Believes every child should leave Year 6 loving a book." },
];

export const VALUES = [
  { icon: "book", title: "Curiosity first", text: "Lessons begin with questions, not answers. We teach children how to think, and then trust them to." },
  { icon: "shield", title: "Character in action", text: "Service, sport and expedition carry the same weight as examinations in the Ashgrove Diploma." },
  { icon: "leaf", title: "Rooted & open", text: "Proud of 112 years of tradition, and unafraid to change what no longer serves our pupils." },
  { icon: "star", title: "Every child known", text: "Tutor groups of twelve, an open-door pastoral team, and no child invisible in the corridor." },
];

export const TIMELINE = [
  { year: "1912", title: "Founded on the hill", text: "Canon Edmund Ashgrove opens the school with 31 boys and a bell cast in Bristol — still rung on the first day of term." },
  { year: "1938", title: "The Chapel is consecrated", text: "Built by pupils and parents over six summers; the oak roof timbers came from the original estate." },
  { year: "1962", title: "Girls admitted throughout", text: "Ashgrove becomes fully co-educational, among the first independent day schools in the county to do so." },
  { year: "1987", title: "The Whitaker Science Wing", text: "Eight laboratories and the county's first school planetarium, funded by the Old Ashgrovean fund." },
  { year: "2004", title: "Lower School opens", text: "Education begins at four with the opening of the nursery and prep building in Founders' Quad." },
  { year: "2019", title: "The Ashgrove Diploma", text: "Our co-curricular certificate — oracy, service and expedition — is launched for Years 7–13." },
  { year: "2024", title: "Bursary fund doubled", text: "The Friends of Ashgrove campaign reaches its £2m target, funding 40 means-tested places each year." },
];

/* ---------------------------- admissions -------------------------- */
export const ADMISSION_STEPS = [
  { step: 1, title: "Enquire", text: "Send an enquiry form or call the registrar. We reply within two working days with a prospectus and key dates for your child's entry year.", meta: "Any time" },
  { step: 2, title: "Visit", text: "Attend an Open Morning or book a private tour. Pupils lead the tours — ask them anything the adults won't answer.", meta: "Termly Open Mornings" },
  { step: 3, title: "Register", text: "Complete registration and pay the £100 registration fee (waived for bursary applicants). Closing dates are listed below.", meta: "By January for September entry" },
  { step: 4, title: "Assessment", text: "Age-appropriate assessments: readiness mornings for 4+, papers in English, maths and reasoning for 11+, subject tests and an interview for 16+.", meta: "November – January" },
  { step: 5, title: "Taster day", text: "Every offered pupil spends a full day in their new form before accepting. We want you to choose us with your eyes open.", meta: "Spring term" },
  { step: 6, title: "Join us", text: "Offers are made in February. Welcome evenings run in June and July, and the bell rings for your child on the first morning of September.", meta: "September" },
];

export const KEY_DATES = [
  { item: "Registration closes — 4+ & 11+ entry", date: fmtDate(addDays(NOW, 60)) },
  { item: "11+ assessment morning", date: fmtDate(addDays(NOW, 75)) },
  { item: "16+ subject tests & interviews", date: fmtDate(addDays(NOW, 82)) },
  { item: "Offers posted", date: fmtDate(addDays(NOW, 105)) },
  { item: "Taster days", date: fmtDate(addDays(NOW, 130)) },
  { item: "Welcome evenings", date: fmtDate(addDays(NOW, 210)) },
  { item: "First day of the new academic year", date: fmtDate(addDays(NOW, 248)) },
];

export const FEES = [
  { stage: "Lower School (Reception – Year 6)", perTerm: "£4,380", perYear: "£13,140", note: "Includes lunches, clubs and music group lessons" },
  { stage: "Middle School (Years 7 – 11)", perTerm: "£5,640", perYear: "£16,920", note: "Includes examination fees and the Ashgrove Diploma" },
  { stage: "Sixth Form (Years 12 – 13)", perTerm: "£5,980", perYear: "£17,940", note: "Includes UCAS support and partnership timetabling" },
];

export const FAQS = [
  { q: "At what ages can children join?", a: "Main entry points are 4+ (Reception), 11+ (Year 7) and 16+ (Sixth Form). We occasionally have places in other year groups — the registrar keeps a live vacancy list and is happy to advise." },
  { q: "Is Ashgrove selective?", a: "We assess for suitability, not perfection. We look for curiosity and kindness as much as academic readiness, and we teach to each child's ceiling once they arrive." },
  { q: "What financial support is available?", a: "Means-tested bursaries cover up to 100% of fees, and the doubled bursary fund supports around 40 pupils each year. Academic, music and sport scholarships of up to 20% are assessed at 11+ and 16+." },
  { q: "What are the school hours?", a: "The day runs 08:45–16:00, with supervised prep clubs until 18:00 for Middle School and Sixth Form. Breakfast club opens at 07:30 for all year groups." },
  { q: "Is there boarding?", a: "Ashgrove is a day school with optional weekly boarding for Years 7–13 in two houses on campus. Around a fifth of pupils board one or more nights a week." },
  { q: "How do pupils travel to school?", a: "Five supervised bus routes cover the city and the Vale, and there is a walking-bus from the station for Sixth Formers. Cycling is encouraged — the bike shed has 240 spaces." },
];

/* ----------------------------- resources -------------------------- */
export interface Resource {
  id: string;
  title: string;
  kind: string;
  size: string;
  audience: "Parents" | "Pupils" | "Applicants" | "All";
  filename: string;
  content: string;
}

export const RESOURCES: Resource[] = [
  { id: "r1", title: "School Prospectus 2026", kind: "Prospectus", size: "24 pp", audience: "Applicants", filename: "ashgrove-prospectus-2026.txt", content: "ASHGROVE ACADEMY — PROSPECTUS 2026\n=====================================\nEst. 1912 · Independent day school for ages 4–18\n\nHeadmistress: Dr Eleanor Ashworth\n1,140 pupils · 86 teaching staff · average class 18\n\nThree stages: Lower School (R–Y6), Middle School (Y7–Y11), Sixth Form (Y12–Y13).\nGCSE 9–7: 78% · A-level A*–A: 61% · 42 Oxbridge offers in five years.\n\nVisit us: book an Open Morning at ashgrove.example/contact." },
  { id: "r2", title: "Term Calendar 2025–26", kind: "Calendar", size: "1 pp", audience: "Parents", filename: "term-calendar-2025-26.txt", content: "ASHGROVE ACADEMY — TERM CALENDAR 2025–26\n\nMichaelmas: Sep – mid Dec\nLent: mid Jan – late Mar\nTrinity: mid Apr – early Jul\n\nHalf terms: Oct 24–31 · Feb 13–20 · May 29 – Jun 5\nINSET days: 5 across the year (listed on portal)." },
  { id: "r3", title: "Uniform & Kit List", kind: "Guide", size: "3 pp", audience: "Parents", filename: "uniform-kit-list.txt", content: "UNIFORM & KIT LIST\n\nSummer: grey trousers/skirt, white shirt, house tie, navy jumper, navy blazer (winter).\nGames kit: navy-gold house shirt, navy shorts, house socks.\nSixth Form: business dress, house pin badge.\n\nNamed items only. Uniform shop open Thu 15:30–17:30 term time." },
  { id: "r4", title: "Bus Routes & Timetable", kind: "Timetable", size: "2 pp", audience: "All", filename: "bus-routes.txt", content: "BUS ROUTES — 5 SUPERVISED SERVICES\n\nRoute 1 · City Loop 07:40 → school 08:30\nRoute 2 · The Vale 07:25 → school 08:28\nRoute 3 · Northgate 07:35 → school 08:25\nRoute 4 · Harbour Line 07:20 → school 08:32\nRoute 5 · Station Shuttle (Sixth Form) 08:05 → school 08:22\n\nReturn departures 16:15 and 18:05." },
  { id: "r5", title: "Bursary & Scholarship Guide", kind: "Guide", size: "6 pp", audience: "Applicants", filename: "bursary-guide.txt", content: "BURSARIES & SCHOLARSHIPS\n\nMeans-tested bursaries up to 100% of fees; around 40 awards each year.\nScholarships (academic, music, sport) up to 20% at 11+ and 16+.\n\nApplications assessed in confidence by the Bursary Committee. Registration fee waived for bursary applicants." },
  { id: "r6", title: "Mock Exam Timetable — Years 11 & 13", kind: "Timetable", size: "2 pp", audience: "Pupils", filename: "mock-timetable.txt", content: "MOCK EXAMINATIONS — YEARS 11 & 13\n\nPapers sit in the Great Hall, 08:45 start. Arrive 20 minutes early.\nBring: black pens, pencils, ruler, calculator (approved list only).\nFull subject timetable posted per candidate on the portal." },
  { id: "r7", title: "Safeguarding & Pastoral Handbook", kind: "Handbook", size: "12 pp", audience: "All", filename: "safeguarding-handbook.txt", content: "SAFEGUARDING & PASTORAL CARE\n\nDesignated Safeguarding Lead: Mrs H. Doyle (Deputy Head, Pupils)\nDeputy DSL: Mr J. Okafor\n\nEvery tutor group has 12 pupils and meets daily. Concerns: safeguarding@ashgrove.example or 01761 555 019." },
  { id: "r8", title: "Acceptable Use — Devices & IT", kind: "Policy", size: "4 pp", audience: "Pupils", filename: "it-acceptable-use.txt", content: "ACCEPTABLE USE POLICY\n\nSchool devices for learning; personal phones stored in lockers Y7–Y11, permitted in the Sixth Form centre.\nFiltering and monitoring in line with statutory guidance. Passwords reset via the portal." },
];

export function downloadResource(r: Resource) {
  const blob = new Blob([r.content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = r.filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* ------------------------------ gallery --------------------------- */
export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  category: string;
  tall?: boolean;
}

export const GALLERY: GalleryItem[] = [
  { id: "g1", src: IMAGES.hero, caption: "Main House at first bell, Michaelmas term", category: "Campus", tall: true },
  { id: "g2", src: IMAGES.classroom, caption: "Year 2 morning register, Lower School", category: "Classroom" },
  { id: "g3", src: IMAGES.science, caption: "Year 10 titration practical, Whitaker Wing", category: "Classroom" },
  { id: "g4", src: IMAGES.library, caption: "The Old Library reading room", category: "Campus", tall: true },
  { id: "g5", src: IMAGES.sports, caption: "1st XV v Oakfield, Upper Pitch", category: "Sport" },
  { id: "g6", src: IMAGES.arts, caption: "Year 10 life-painting, North Studio", category: "Arts" },
  { id: "g7", src: IMAGES.music, caption: "Chapel Orchestra, autumn rehearsal", category: "Arts", tall: true },
  { id: "g8", src: IMAGES.classroom, caption: "Story circle, Reception", category: "Classroom" },
  { id: "g9", src: IMAGES.sports, caption: "House cross-country, Ashgrove Park", category: "Sport" },
  { id: "g10", src: IMAGES.hero, caption: "Founders' Quad before the Fair", category: "Campus" },
  { id: "g11", src: IMAGES.arts, caption: "Corridor mural, final week", category: "Arts" },
  { id: "g12", src: IMAGES.music, caption: "Senior Chamber Choir, Winter Concert", category: "Arts" },
];

export const GALLERY_CATEGORIES = ["All", "Campus", "Classroom", "Sport", "Arts"];

/* ------------------------------ portal ---------------------------- */
export const TIMETABLE: Record<string, { time: string; lesson: string; room: string }[]> = {
  Monday: [
    { time: "08:45", lesson: "English Literature", room: "M4" },
    { time: "09:45", lesson: "Mathematics", room: "W2" },
    { time: "11:05", lesson: "Chemistry", room: "W-Lab3" },
    { time: "12:05", lesson: "Lunch · House time", room: "Kingsley" },
    { time: "13:15", lesson: "History", room: "M9" },
    { time: "14:15", lesson: "Games — Rugby", room: "Upper Pitch" },
  ],
  Tuesday: [
    { time: "08:45", lesson: "Physics", room: "W-Lab1" },
    { time: "09:45", lesson: "English Language", room: "M4" },
    { time: "11:05", lesson: "Mathematics", room: "W2" },
    { time: "12:05", lesson: "Lunch · Library prep", room: "Old Library" },
    { time: "13:15", lesson: "French", room: "L2" },
    { time: "14:15", lesson: "Art — Studio", room: "N-Studio" },
  ],
  Wednesday: [
    { time: "08:45", lesson: "Biology", room: "W-Lab2" },
    { time: "09:45", lesson: "History", room: "M9" },
    { time: "11:05", lesson: "English Literature", room: "M4" },
    { time: "12:05", lesson: "Lunch · Chapel choir", room: "The Chapel" },
    { time: "13:15", lesson: "Mathematics", room: "W2" },
    { time: "14:15", lesson: "Games — Hockey", room: "Astro" },
  ],
  Thursday: [
    { time: "08:45", lesson: "Mathematics", room: "W2" },
    { time: "09:45", lesson: "Chemistry", room: "W-Lab3" },
    { time: "11:05", lesson: "French", room: "L2" },
    { time: "12:05", lesson: "Lunch · Society talk", room: "Whitaker LT" },
    { time: "13:15", lesson: "English Language", room: "M4" },
    { time: "14:15", lesson: "Physics", room: "W-Lab1" },
  ],
  Friday: [
    { time: "08:45", lesson: "English Literature", room: "M4" },
    { time: "09:45", lesson: "Biology", room: "W-Lab2" },
    { time: "11:05", lesson: "History", room: "M9" },
    { time: "12:05", lesson: "Lunch · House gathering", room: "Kingsley" },
    { time: "13:15", lesson: "Art — Studio", room: "N-Studio" },
    { time: "14:15", lesson: "Games — Fixture PM", room: "Varies" },
  ],
};

export const ASSIGNMENTS = [
  { id: "as1", subject: "Chemistry", title: "Redox equations worksheet", due: addDays(NOW, 2), status: "pending" },
  { id: "as2", subject: "English Literature", title: "Essay: jealousy in Othello (1,200 words)", due: addDays(NOW, 5), status: "pending" },
  { id: "as3", subject: "Mathematics", title: "Differentiation problem set 4B", due: addDays(NOW, 1), status: "overdue" },
  { id: "as4", subject: "History", title: "Source analysis — Weimar economy", due: addDays(NOW, 8), status: "pending" },
  { id: "as5", subject: "French", title: "Oral prep: ma ville (3 min)", due: addDays(NOW, -2), status: "done" },
  { id: "as6", subject: "Physics", title: "Lab report — standing waves", due: addDays(NOW, -4), status: "done" },
];

export const GRADES = [
  { subject: "Mathematics", grade: "A", effort: 1, teacher: "Mrs Vale" },
  { subject: "English Literature", grade: "A", effort: 2, teacher: "Mr Hedges" },
  { subject: "Chemistry", grade: "A*", effort: 1, teacher: "Mr Okafor" },
  { subject: "Biology", grade: "B", effort: 2, teacher: "Dr Singh" },
  { subject: "Physics", grade: "A", effort: 1, teacher: "Mrs Kaur" },
  { subject: "History", grade: "B", effort: 3, teacher: "Mr Boateng" },
  { subject: "French", grade: "A", effort: 2, teacher: "Mme Rousseau" },
];

export const PORTAL_MESSAGES = [
  { from: "Mr Okafor", text: "Mock candidates: collect your statement of entry from my room by Friday.", when: "Today, 09:12" },
  { from: "Games Office", text: "Friday fixture list updated — 1st XV travel, 2nd XV at home vs St Brendan's.", when: "Yesterday" },
  { from: "Music Office", text: "Winter Concert call time is 17:45 for all orchestral players. Concert blacks.", when: "2 days ago" },
];

/* ------------------------------ stats ----------------------------- */
export const SCHOOL_STATS = [
  { value: 1140, suffix: "", label: "Pupils, ages 4–18" },
  { value: 18, suffix: ":1 avg", label: "Class size" },
  { value: 96, suffix: "%", label: "Pupils in music or drama" },
  { value: 112, suffix: "yrs", label: "On the hill since 1912" },
];

/* --------------------------- search index ------------------------- */
export interface SearchEntry {
  title: string;
  detail: string;
  type: "Page" | "News" | "Event" | "Programme" | "Resource";
  path: string;
}

export const SEARCH_INDEX: SearchEntry[] = [
  { title: "Home", detail: "Notices, houses, news and life at Ashgrove", type: "Page", path: "/" },
  { title: "About Us", detail: "History, values and leadership", type: "Page", path: "/about" },
  { title: "Academics", detail: "Lower School, Middle School, Sixth Form", type: "Page", path: "/academics" },
  { title: "Admissions", detail: "Steps, fees, bursaries and key dates", type: "Page", path: "/admissions" },
  { title: "News & Events", detail: "Stories, calendar and upcoming events", type: "Page", path: "/news" },
  { title: "Gallery", detail: "Photographs from around the school", type: "Page", path: "/gallery" },
  { title: "Contact Us", detail: "Enquiry form, map and visiting hours", type: "Page", path: "/contact" },
  { title: "Student Portal", detail: "Timetable, assignments, grades and resources", type: "Page", path: "/portal" },
  ...NEWS.map((n) => ({ title: n.title, detail: n.excerpt, type: "News" as const, path: "/news" })),
  ...EVENTS.map((e) => ({ title: e.title, detail: `${fmtDate(e.date)} · ${e.time} · ${e.location}`, type: "Event" as const, path: "/news" })),
  ...STAGES.map((s) => ({ title: s.name, detail: `${s.ages} · ${s.years}`, type: "Programme" as const, path: "/academics" })),
  ...RESOURCES.map((r) => ({ title: r.title, detail: `${r.kind} · ${r.audience}`, type: "Resource" as const, path: "/contact" })),
  { title: "Open Morning — Michaelmas", detail: "Book a tour and taster lessons", type: "Event", path: "/admissions" },
  { title: "Bursaries & Scholarships", detail: "Means-tested support up to 100% of fees", type: "Page", path: "/admissions" },
];

/* ------------------------------ misc ------------------------------ */
export const SCHOOL = {
  name: "Ashgrove Academy",
  short: "Ashgrove",
  motto: "Lumen et Veritas",
  founded: 1912,
  address: "The Hill, Ash Vale, Somerset BA5 2QR",
  phone: "01761 555 019",
  email: "office@ashgrove.example",
  registrarEmail: "admissions@ashgrove.example",
  termNow: "Michaelmas Term",
};
