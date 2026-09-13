/* ------------------------------------------------------------------ */
/*  Aldercrest Academy — central content store                         */
/* ------------------------------------------------------------------ */

export const IMG = {
  campus:
    "https://image.qwenlm.ai/generated-images/41b299bf-1d3f-4aef-b1cb-8dab867cfeed/_result.png",
  classroom:
    "https://image.qwenlm.ai/generated-images/0261368c-0ca6-43cc-8b62-a85679e2fe40/_result.png",
  lab: "https://image.qwenlm.ai/generated-images/be8e5f97-9093-45db-89e0-76c18a952a84/_result.png",
  library:
    "https://image.qwenlm.ai/generated-images/c13de0e9-9cab-4fab-a294-90dbe2e50084/_result.png",
  sports:
    "https://image.qwenlm.ai/generated-images/8875ff39-b63a-4794-8b99-ab94642f5eb9/_result.png",
  arts: "https://image.qwenlm.ai/generated-images/9a50d318-a581-4a9a-9a4c-85cfcc6c793d/_result.png",
  robotics:
    "https://image.qwenlm.ai/generated-images/5007e53d-11bd-4de9-8f9a-f40945b31729/_result.png",
  graduation:
    "https://image.qwenlm.ai/generated-images/3bd34039-a81a-4ce5-8edf-a9ceb23e6cdf/_result.png",
};

const DAY = 86_400_000;
export const today = new Date();
export const d = (offset: number) => new Date(today.getTime() + offset * DAY);

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Academics", path: "/academics" },
  { label: "Admissions", path: "/admissions" },
  { label: "News & Events", path: "/news" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact Us", path: "/contact" },
];

/* ---------------- announcements ---------------- */

export const TICKER: string[] = [
  "Applications for Fall 2026 close January 15 — apply online",
  "Open House & campus tours: Saturday morning, register via Admissions",
  "Winter Concert in the Ellison Hall — free entry, all families welcome",
  "Term 2 bus timetable revised from Monday — see Transport Guide",
  "Robotics Team 4412 qualifies for the National Finals in April",
  "Year 12 thesis proposals due to supervisors by Friday 17:00",
];

export const NOTICEBOARD = [
  { date: d(1), tag: "Arts", title: "Winter Concert — seating opens 30 min early", note: "Ellison Hall fills fast; doors at 18:30." },
  { date: d(3), tag: "Transport", title: "Bus route 4 detour via Harlow Street", note: "Works on Mill Bridge until further notice." },
  { date: d(5), tag: "Sport", title: "Fixture change: U15 football now Saturday 10:00", note: "Away at Ridgemont — bus departs 08:45." },
  { date: d(8), tag: "Community", title: "Parent Coffee & Curriculum Q&A", note: "Whitmore Library mezzanine, 09:00–10:30." },
];

export const STATS = [
  { value: 1140, suffix: "", label: "Students, K–12" },
  { value: 9, suffix: ":1", label: "Student–teacher ratio" },
  { value: 46, suffix: "", label: "Clubs, teams & ensembles" },
  { value: 100, suffix: "%", label: "College placement" },
];

/* ---------------- academics ---------------- */

export const STAGES = [
  {
    num: "01",
    name: "Lower School",
    grades: "Kindergarten – Grade 5",
    blurb:
      "Small classes, two homeroom teachers, and a curriculum built around play, phonics and number sense. Children learn to read widely, question kindly and tidy up brilliantly.",
    points: ["Phonics & early literacy labs", "Daily outdoor learning block", "Specialist music, art & PE from K2"],
    chips: ["Literacy", "Numeracy", "Nature Studies", "Music", "Art", "PE"],
    img: IMG.classroom,
  },
  {
    num: "02",
    name: "Middle School",
    grades: "Grades 6 – 8",
    blurb:
      "The curious years. Subject specialists replace the homeroom, advisory stays small, and every student runs a personal project each year — from apiaries to arcade games.",
    points: ["1:1 advisory & wellbeing checks", "Design-tech maker rotations", "Outdoor leadership expedition, Grade 8"],
    chips: ["Sciences", "Humanities", "Design Tech", "Languages", "Drama", "Coding"],
    img: IMG.lab,
  },
  {
    num: "03",
    name: "Upper School",
    grades: "Grades 9 – 12",
    blurb:
      "A rigorous college-preparatory program with 24 electives, AP and Honours pathways, and the Aldercrest Thesis — a year-long independent research project defended before a faculty panel.",
    points: ["24 electives + AP/Honours pathways", "Aldercrest Thesis in Grade 12", "University counselling from Grade 10"],
    chips: ["AP Calculus", "Literature", "Physics", "Economics", "Studio Art", "Robotics"],
    img: IMG.robotics,
  },
];

export const DEPARTMENTS = [
  { icon: "book", name: "English & Literature", head: "Dr. Naomi Ferris", courses: ["World Literature", "Creative Writing", "Rhetoric & Debate", "AP English Language", "Journalism & Media"] },
  { icon: "compass", name: "Mathematics", head: "Mr. Daniel Okafor", courses: ["Number & Algebra", "Geometry", "Honours Pre-Calculus", "AP Calculus AB/BC", "Statistics & Data"] },
  { icon: "flask", name: "Sciences", head: "Dr. Priya Raman", courses: ["General Science", "Biology", "Chemistry", "Physics", "AP Environmental Science", "Anatomy & Physiology"] },
  { icon: "globe", name: "Humanities & History", head: "Ms. Rosa Delgado", courses: ["Ancient Civilisations", "Modern World History", "Geography", "Economics", "AP World History", "Philosophy"] },
  { icon: "speech", name: "World Languages", head: "Mme. Claire Besson", courses: ["French I–IV", "Spanish I–IV", "Mandarin I–III", "AP French Language", "Exchange Programmes"] },
  { icon: "palette", name: "Visual & Performing Arts", head: "Mr. Theo Marchetti", courses: ["Studio Art", "Ceramics", "Orchestra & Band", "Choir", "Theatre Production", "AP Music Theory"] },
  { icon: "chip", name: "Computer Science & Design", head: "Ms. Ada Lindqvist", courses: ["Digital Literacy", "Python Foundations", "Web & App Design", "AP Computer Science A", "Robotics & AI Lab"] },
  { icon: "ball", name: "PE & Wellness", head: "Coach Marcus Hale", courses: ["Foundation PE", "Football / Hockey / Cricket", "Athletics & Swim", "Strength & Conditioning", "Mindfulness & Health"] },
];

export const PROGRAMS = [
  { title: "Aldercrest Thesis", body: "Every Grade 12 student researches, writes and defends an independent thesis with a faculty supervisor." },
  { title: "Global Exchange", body: "Term exchanges with partner schools in Lyon, Kyoto and Cape Town for Grades 10–11." },
  { title: "Outdoor Leadership", body: "From Grade 4 day-hikes to the Grade 8 five-day expedition in the Cairn Mountains." },
  { title: "Maker Commons", body: "A 400 m² workshop of laser cutters, 3D printers and woodworking bays, open every lunch hour." },
  { title: "Model United Nations", body: "A 60-delegate delegation hosting the region's largest MUN conference each spring." },
];

/* ---------------- news ---------------- */

export const NEWS = [
  { id: "n1", title: "Robotics Team 4412 heads to National Finals", category: "STEM", daysAgo: 1, img: IMG.robotics, excerpt: "After a flawless regional run, our senior team booked their fourth national berth in six years.", body: "The Aldercrest Circuit Breakers went 8–1 at regionals, taking the Innovation in Control award for their autonomous routine. Captain Amara Diallo credited 'hundreds of lunch-hour iterations'. The team travels to the National Finals in April, sponsored by the Parents' Association." },
  { id: "n2", title: "Winter Concert returns to Ellison Hall", category: "Arts", daysAgo: 3, img: IMG.arts, excerpt: "Three ensembles, one choir of 120, and a premiere by Grade 11 composer June Park.", body: "The concert features the Senior Orchestra, Jazz Combo and the combined Middle and Upper School choirs. June Park's 'First Snow', written for string quartet and clarinet, receives its world premiere. Entry is free; families should reserve seats through the Arts Office." },
  { id: "n3", title: "New athletics pavilion breaks ground", category: "Campus", daysAgo: 6, img: IMG.sports, excerpt: "The 2,400 m² pavilion adds an indoor sprint track, gymnasium and sports-science suite.", body: "Ground was broken on the Whitfield Pavilion behind the north fields. The building targets a Passivhaus standard with a rainwater-fed irrigation system for the pitches. Completion is scheduled for the start of the 2026–27 school year." },
  { id: "n4", title: "Grade 8 expedition returns from the Cairns", category: "Community", daysAgo: 10, img: IMG.campus, excerpt: "Five days, 62 students, zero lost boots — the annual leadership expedition wrapped Friday.", body: "Students navigated, cooked and led in rotating roles across a 40 km route. Expedition leader Ms. Ferreira noted that this year's cohort logged the fastest-ever team setup times. Photographs from the trip are in the gallery." },
  { id: "n5", title: "Library launches 24-hour digital archive", category: "Campus", daysAgo: 16, img: IMG.library, excerpt: "Over 40,000 e-books, journals and past papers are now accessible with a student login.", body: "The Whitmore Library's new portal unifies the catalogue, JSTOR access and a decade of digitised school publications. Students sign in through the portal; families can request guest reader accounts at the front desk." },
  { id: "n6", title: "Class of 2025 earns record university offers", category: "Academics", daysAgo: 23, img: IMG.graduation, excerpt: "142 graduates collected 610 offers across 11 countries, including 38 scholarship awards.", body: "The cohort earned places across the sciences, humanities and conservatoires, with particular strength in engineering and medicine. The University Counselling office publishes its full destinations list each November." },
  { id: "n7", title: "Science fair winners head to the state round", category: "STEM", daysAgo: 31, img: IMG.lab, excerpt: "Six Aldercrest projects took category golds, including a study of urban bee corridors.", body: "Judges singled out the Grade 9 pollinator-corridor study and a low-cost water filtration prototype. The state round takes place at the university campus; the school bus departs 07:30 sharp — coffees for parents provided." },
];

export const NEWS_CATEGORIES = ["All", "STEM", "Arts", "Campus", "Community", "Academics"];

/* ---------------- events ---------------- */

export type SchoolEvent = {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: "Academics" | "Arts" | "Sport" | "Community" | "Admissions";
  desc: string;
};

export const EVENTS: SchoolEvent[] = [
  { id: "e1", title: "Winter Concert — Senior Ensembles", date: d(3), time: "19:00", location: "Ellison Hall", type: "Arts", desc: "Orchestra, jazz combo and choirs perform, with a world premiere by June Park '27." },
  { id: "e2", title: "Open House & Campus Tours", date: d(5), time: "09:30", location: "Founders Hall", type: "Admissions", desc: "Meet teachers, tour classrooms and chat with current families. Registration required." },
  { id: "e3", title: "U15 Football vs Ridgemont", date: d(7), time: "10:00", location: "North Pitch", type: "Sport", desc: "League fixture. Team bus departs the main gate at 08:45." },
  { id: "e4", title: "Parent Coffee & Curriculum Q&A", date: d(8), time: "09:00", location: "Whitmore Library", type: "Community", desc: "Stage leaders answer questions over coffee. No booking needed." },
  { id: "e5", title: "Grade 12 Thesis Proposal Deadline", date: d(10), time: "17:00", location: "Online — Portal", type: "Academics", desc: "Proposals submitted to supervisors via the student portal." },
  { id: "e6", title: "Maker Commons Open Night", date: d(12), time: "17:30", location: "Design Wing", type: "Academics", desc: "Families invited to see projects in progress across the design departments." },
  { id: "e7", title: "Swim Gala — All Stages", date: d(15), time: "14:00", location: "Aquatics Centre", type: "Sport", desc: "Annual inter-house gala; heats from 14:00, finals from 16:30." },
  { id: "e8", title: "Admissions Assessment Morning", date: d(19), time: "08:30", location: "Berridge Building", type: "Admissions", desc: "For January applicants. Candidates should arrive 20 minutes early." },
  { id: "e9", title: "Model UN Regional Conference", date: d(22), time: "08:00", location: "Founders Hall", type: "Academics", desc: "Aldercrest hosts 240 delegates from 18 schools for the regional MUN." },
  { id: "e10", title: "Spring Musical — First Rehearsals", date: d(26), time: "16:00", location: "Ellison Hall", type: "Arts", desc: "Open call for cast and crew; bring a water bottle and ideas." },
  { id: "e11", title: "Community Service Day", date: d(29), time: "09:00", location: "Off-campus", type: "Community", desc: "Whole-school volunteering across 14 partner organisations in the city." },
  { id: "e12", title: "University Fair — Evening Session", date: d(34), time: "18:00", location: "Founders Hall", type: "Admissions", desc: "40 universities and conservatoires meet Grades 10–12 and families." },
  { id: "e13", title: "Science Fair — State Round Send-off", date: d(40), time: "07:30", location: "Main Gate", type: "Academics", desc: "Six category gold projects travel to the state round. Bus departs 07:30 sharp." },
];

/* ---------------- gallery ---------------- */

export const GALLERY_TAGS = ["All", "Campus", "STEM", "Arts", "Sport", "Community", "Learning"];

export const GALLERY = [
  { src: IMG.campus, caption: "Morning arrival on Founders Walk", tag: "Campus", tall: true },
  { src: IMG.lab, caption: "Grade 11 titration practical, Whitfield Labs", tag: "STEM", tall: false },
  { src: IMG.arts, caption: "Senior Orchestra, Winter Concert", tag: "Arts", tall: false },
  { src: IMG.sports, caption: "U17 football, golden hour at North Pitch", tag: "Sport", tall: true },
  { src: IMG.library, caption: "Quiet hour in the Whitmore Library", tag: "Campus", tall: false },
  { src: IMG.robotics, caption: "Team 4412 tuning the regional bot", tag: "STEM", tall: false },
  { src: IMG.classroom, caption: "Socratic seminar, English II", tag: "Learning", tall: false },
  { src: IMG.graduation, caption: "Class of 2025, caps at noon", tag: "Community", tall: true },
];

/* ---------------- about ---------------- */

export const VALUES = [
  { icon: "leaf", title: "Rooted", body: "Six decades of tradition anchor us: honour code, house system, and a campus we tend like a garden." },
  { icon: "spark", title: "Curious", body: "Questions outrank answers. Every stage runs an inquiry block where students chase what fascinates them." },
  { icon: "users", title: "Kind", body: "Advisory groups of eight, restorative practice, and a rule we actually enforce: look out for each other." },
  { icon: "mountain", title: "Brave", body: "From the Grade 8 expedition to the Grade 12 thesis defence, we rehearse courage at every age." },
];

export const MILESTONES = [
  { year: "1962", title: "Founded on Alder Hill", body: "Eleanor Whitfield opens the school with 34 pupils, two classrooms and a borrowed piano." },
  { year: "1971", title: "Whitmore Library", body: "The double-height reading room opens, gifted by the Whitmore family — still the heart of campus." },
  { year: "1988", title: "Ellison Arts Wing", body: "A 300-seat hall and dedicated studios make Aldercrest a regional centre for school arts." },
  { year: "1999", title: "Whitfield Science Centre", body: "Twelve laboratories and the first school observatory in the district." },
  { year: "2008", title: "First national robotics title", body: "Team 4412 — named for the school's founding year in reverse — wins its first national crown." },
  { year: "2015", title: "The Sustainability Pledge", body: "Campus commits to net-zero by 2030; solar array and rain gardens follow within two years." },
  { year: "2021", title: "Maker Commons", body: "The design wing doubles in size with a 400 m² workshop open to every student." },
  { year: "2025", title: "Whitfield Pavilion", body: "Ground breaks on the Passivhaus athletics pavilion, opening for the 2026–27 season." },
];

export const LEADERSHIP = [
  { name: "Dr. Eleanor Voss", role: "Head of School", bio: "Historian and educator; joined Aldercrest in 2016 from Kingsbridge Collegiate.", initials: "EV" },
  { name: "Mr. Samuel Adjei", role: "Deputy Head, Academics", bio: "Mathematician; leads curriculum design and the Aldercrest Thesis programme.", initials: "SA" },
  { name: "Ms. Hannah Lindgren", role: "Head of Lower School", bio: "Early-years specialist with 20 years in literacy and outdoor learning.", initials: "HL" },
  { name: "Mr. Rafael Ortega", role: "Head of Middle School", bio: "Former expedition leader; built the Grade 8 leadership programme.", initials: "RO" },
  { name: "Dr. Miriam Chen", role: "Head of Upper School", bio: "Physicist and university counsellor; oversees AP pathways and destinations.", initials: "MC" },
  { name: "Mrs. Amina Bello", role: "Director of Admissions", bio: "First port of call for families; leads tours and the bursary programme.", initials: "AB" },
];

export const CAMPUS_FACTS = [
  { value: 26, suffix: "", label: "Acres of campus" },
  { value: 14, suffix: "", label: "Buildings & halls" },
  { value: 61, suffix: "k", label: "Library volumes" },
  { value: 38, suffix: "", label: "Countries represented" },
];

export const ACCREDITATIONS = ["NAIS Member School", "Cognia Accredited", "Round Square Member", "Eco-Schools Green Flag"];

/* ---------------- admissions ---------------- */

export const ADMISSION_STEPS = [
  { step: "01", title: "Enquire", body: "Send the enquiry form or call the Admissions Office. We reply within two school days with a prospectus and tour dates.", when: "Anytime" },
  { step: "02", title: "Visit", body: "Join an Open House or private tour. Students spend a half-day shadowing a buddy in their entry grade.", when: "Sep – Jan" },
  { step: "03", title: "Apply", body: "Complete the online application with transcripts, two references and the student's own short letter.", when: "By Jan 15" },
  { step: "04", title: "Assessment", body: "A friendly assessment morning: writing, reasoning and a chat with a stage leader. No tricks, no coaching needed.", when: "February" },
  { step: "05", title: "Decision", body: "Offers post on March 10 with any bursary award. Enrolment deposits are due April 1.", when: "Mar 10" },
];

export const KEY_DATES = [
  { date: "Sep 1", label: "Applications open for Fall 2026 entry" },
  { date: "Oct – Jan", label: "Open Houses and family tours (monthly)" },
  { date: "Jan 15", label: "Application deadline — all entry grades" },
  { date: "Feb 6–20", label: "Assessment mornings, Berridge Building" },
  { date: "Mar 10", label: "Offers and bursary decisions posted" },
  { date: "Apr 1", label: "Enrolment deposits due" },
];

export const TUITION = [
  { stage: "Lower School (K–5)", annual: "$18,900", includes: "All materials, daily snack, Lower School camps" },
  { stage: "Middle School (6–8)", annual: "$22,400", includes: "Devices, maker fees, Grade 8 expedition" },
  { stage: "Upper School (9–12)", annual: "$25,800", includes: "AP exam fees, thesis supervision, university counselling" },
  { stage: "Boarding (9–12, limited)", annual: "$38,500", includes: "Weekend programme, meals, laundry, travel supervision" },
];

export const FAQS = [
  { q: "When should we apply?", a: "Applications open on September 1 for the following fall. The deadline is January 15 for all entry grades; we review on a rolling basis after that as space allows." },
  { q: "Is there financial aid?", a: "Yes. Around 38% of students receive means-tested bursaries, and every offer is made before need is assessed. The Bursary Committee reviews each family's circumstances confidentially." },
  { q: "Do you admit students mid-year?", a: "Where space allows, yes — particularly in Grades 6 and 9. Mid-year candidates follow the same process on an accelerated timeline." },
  { q: "What does the assessment morning involve?", a: "A short writing task, a reasoning puzzle, and a relaxed conversation with a stage leader. We are looking for curiosity and kindness, not perfection." },
  { q: "Is there school transport?", a: "Six bus routes cover the city and suburbs each morning and afternoon. The full route map is downloadable from the Resources section." },
  { q: "What support exists for learning differences?", a: "Our Learning Support team of six specialists works in-class and in small groups. An individual plan accompanies every student who needs one, reviewed each term." },
  { q: "Can families visit outside Open House dates?", a: "Absolutely. Private tours run most Tuesday and Thursday mornings during term — write to admissions@aldercrest.edu and we will find a time." },
];

/* ---------------- resources ---------------- */

export const RESOURCES = [
  { title: "2026–27 Course Catalog", type: "PDF", meta: "24 pages · all stages", file: "aldercrest-course-catalog", lines: ["The complete course offering for 2026-27 across Lower, Middle and Upper School,", "including AP and Honours pathways, elective descriptions and prerequisites.", "Questions? academics@aldercrest.edu · +1 (555) 014-2026"] },
  { title: "School Calendar 2026–27", type: "PDF", meta: "2 pages · term dates", file: "aldercrest-calendar", lines: ["Term 1: Sep 1 - Dec 18 · Term 2: Jan 6 - Mar 27 · Term 3: Apr 13 - Jun 26.", "Inset days, exam weeks and holiday blocks are listed in full.", "Calendar updates are posted first on the school portal."] },
  { title: "Bus Routes & Transport Guide", type: "PDF", meta: "6 pages · 6 routes", file: "aldercrest-bus-routes", lines: ["Routes 1-6 with morning pickup windows, afternoon drop-offs and driver contacts.", "Route 4 is currently diverted via Harlow Street due to Mill Bridge works.", "Transport office: transport@aldercrest.edu"] },
  { title: "Uniform & Dress Code", type: "PDF", meta: "4 pages · all stages", file: "aldercrest-uniform", lines: ["Day uniform, PE kit, formal dress and the house-colour system explained,", "including the second-hand uniform shop run by the Parents' Association.", "Uniform shop hours: Tue and Thu, 08:00-09:30, Berridge Building lobby."] },
  { title: "Upper School Thesis Handbook", type: "PDF", meta: "18 pages · Grade 12", file: "aldercrest-thesis-handbook", lines: ["Everything a Grade 12 thesis student needs: choosing a supervisor,", "proposal structure, ethics review, formatting and the defence schedule.", "Proposals are due to supervisors by Friday 17:00 in the week of the deadline."] },
  { title: "Lunch Menu — Term 2", type: "PDF", meta: "1 page · weekly rotation", file: "aldercrest-lunch-menu", lines: ["Weekly rotation across the two dining halls, with vegetarian and allergen-free", "options every day. Pre-order deadline is 09:00 on the day.", "Dietary questions: kitchens@aldercrest.edu"] },
  { title: "Technology Acceptable Use Policy", type: "PDF", meta: "5 pages · signed annually", file: "aldercrest-aup", lines: ["The expectations students and families sign each September, covering devices,", "network use, digital citizenship and the phone policy by stage.", "Reviewed annually by the Digital Life Committee."] },
  { title: "Bursary & Financial Aid Guide", type: "PDF", meta: "8 pages · confidential", file: "aldercrest-bursary-guide", lines: ["How means-tested bursaries work at Aldercrest, the timeline for awards,", "and the documents the Bursary Committee will ask to see.", "All enquiries are confidential: bursary@aldercrest.edu"] },
];

/* ---------------- contact ---------------- */

export const DEPT_DIRECTORY = [
  { dept: "Admissions Office", contact: "Mrs. Amina Bello", email: "admissions@aldercrest.edu", ext: "210" },
  { dept: "Registrar & Records", contact: "Mr. George Tan", email: "registrar@aldercrest.edu", ext: "214" },
  { dept: "University Counselling", contact: "Dr. Miriam Chen", email: "university@aldercrest.edu", ext: "305" },
  { dept: "Athletics Office", contact: "Coach Marcus Hale", email: "athletics@aldercrest.edu", ext: "402" },
  { dept: "Arts Box Office", contact: "Mr. Theo Marchetti", email: "arts@aldercrest.edu", ext: "318" },
  { dept: "IT Help Desk", contact: "Ms. Ada Lindqvist", email: "helpdesk@aldercrest.edu", ext: "111" },
];

/* ---------------- portal ---------------- */

export const TIMETABLE: Record<string, { time: string; subject: string; room: string; color: string }[]> = {
  Monday: [
    { time: "08:30 – 09:30", subject: "AP Calculus BC", room: "Berridge 204", color: "#2b5a41" },
    { time: "09:40 – 10:40", subject: "English Literature", room: "Founders 112", color: "#a96c14" },
    { time: "11:00 – 12:00", subject: "Physics — Waves", room: "Whitfield Lab 3", color: "#3d7355" },
    { time: "13:00 – 14:00", subject: "Spanish III", room: "Founders 208", color: "#d18a1f" },
    { time: "14:10 – 15:10", subject: "Advisory — Mr. Okafor", room: "Berridge 110", color: "#163a29" },
  ],
  Tuesday: [
    { time: "08:30 – 09:30", subject: "Chemistry — Kinetics", room: "Whitfield Lab 1", color: "#3d7355" },
    { time: "09:40 – 10:40", subject: "AP World History", room: "Founders 104", color: "#a96c14" },
    { time: "11:00 – 12:00", subject: "Robotics & AI Lab", room: "Maker Commons", color: "#2b5a41" },
    { time: "13:00 – 14:00", subject: "Studio Art", room: "Ellison S2", color: "#d18a1f" },
    { time: "14:10 – 15:10", subject: "PE — Conditioning", room: "Pavilion Gym", color: "#163a29" },
  ],
  Wednesday: [
    { time: "08:30 – 09:30", subject: "AP Calculus BC", room: "Berridge 204", color: "#2b5a41" },
    { time: "09:40 – 10:40", subject: "Physics — Waves", room: "Whitfield Lab 3", color: "#3d7355" },
    { time: "11:00 – 12:00", subject: "English Literature", room: "Founders 112", color: "#a96c14" },
    { time: "13:00 – 15:10", subject: "Thesis Supervision Block", room: "Whitmore Library", color: "#163a29" },
  ],
  Thursday: [
    { time: "08:30 – 09:30", subject: "Spanish III", room: "Founders 208", color: "#d18a1f" },
    { time: "09:40 – 10:40", subject: "Chemistry — Kinetics", room: "Whitfield Lab 1", color: "#3d7355" },
    { time: "11:00 – 12:00", subject: "AP World History", room: "Founders 104", color: "#a96c14" },
    { time: "13:00 – 14:00", subject: "Robotics & AI Lab", room: "Maker Commons", color: "#2b5a41" },
    { time: "14:10 – 15:10", subject: "Orchestra", room: "Ellison Hall", color: "#163a29" },
  ],
  Friday: [
    { time: "08:30 – 09:30", subject: "English Literature", room: "Founders 112", color: "#a96c14" },
    { time: "09:40 – 10:40", subject: "AP Calculus BC", room: "Berridge 204", color: "#2b5a41" },
    { time: "11:00 – 12:00", subject: "Studio Art", room: "Ellison S2", color: "#d18a1f" },
    { time: "13:00 – 14:00", subject: "PE — Swimming", room: "Aquatics Centre", color: "#163a29" },
    { time: "14:10 – 15:10", subject: "House Assembly", room: "Founders Hall", color: "#3d7355" },
  ],
};

export const ASSIGNMENTS = [
  { id: "a1", subject: "AP Calculus BC", title: "Series convergence problem set 7", due: d(2), status: "open" },
  { id: "a2", subject: "Physics", title: "Standing waves lab report", due: d(4), status: "open" },
  { id: "a3", subject: "English Literature", title: "Close-reading essay: 'The Great Gatsby' ch. 4", due: d(6), status: "open" },
  { id: "a4", subject: "Spanish III", title: "Podcast draft — interview script", due: d(1), status: "submitted" },
  { id: "a5", subject: "Chemistry", title: "Rate-law worksheet", due: d(-2), status: "graded", grade: "A−" },
  { id: "a6", subject: "AP World History", title: "Source analysis: Silk Road documents", due: d(-5), status: "graded", grade: "A" },
  { id: "a7", subject: "Robotics Lab", title: "Sensor fusion build log", due: d(9), status: "open" },
  { id: "a8", subject: "Thesis", title: "Annotated bibliography (25 sources)", due: d(12), status: "open" },
];

export const GRADES = [
  { subject: "AP Calculus BC", teacher: "Mr. Okafor", letter: "A", pct: 94 },
  { subject: "Physics — Waves", teacher: "Dr. Raman", letter: "A−", pct: 91 },
  { subject: "English Literature", teacher: "Dr. Ferris", letter: "B+", pct: 88 },
  { subject: "Chemistry", teacher: "Dr. Raman", letter: "A", pct: 93 },
  { subject: "AP World History", teacher: "Ms. Delgado", letter: "A", pct: 95 },
  { subject: "Spanish III", teacher: "Mme. Besson", letter: "B+", pct: 87 },
  { subject: "Robotics & AI Lab", teacher: "Ms. Lindqvist", letter: "A+", pct: 98 },
];

export const PORTAL_NOTICES = [
  "Library closes 17:30 this Friday for the archive migration.",
  "Thesis proposal deadline: Friday 17:00 — submit via the portal.",
  "Robotics Lab open session moved to Wednesday lunch, Maker Commons.",
  "Swim gala sign-ups close tomorrow — see Coach Hale.",
];

/* ---------------- search ---------------- */

export type SearchItem = { title: string; type: string; path: string; note?: string };

export const SEARCH_INDEX: SearchItem[] = [
  ...NAV_LINKS.map((l) => ({ title: l.label, type: "Page", path: l.path })),
  { title: "Student Portal", type: "Page", path: "/portal" },
  ...NEWS.map((n) => ({ title: n.title, type: "News", path: "/news", note: `${n.category} · ${n.excerpt}` })),
  ...EVENTS.map((e) => ({ title: e.title, type: "Event", path: "/news", note: `${e.location} · ${e.time}` })),
  ...STAGES.map((s) => ({ title: s.name, type: "Program", path: "/academics", note: s.grades })),
  ...DEPARTMENTS.map((dep) => ({ title: dep.name, type: "Department", path: "/academics", note: `Head: ${dep.head}` })),
  ...PROGRAMS.map((p) => ({ title: p.title, type: "Program", path: "/academics", note: p.body })),
  ...RESOURCES.map((r) => ({ title: r.title, type: "Resource", path: "/academics", note: r.meta })),
  ...LEADERSHIP.map((p) => ({ title: p.name, type: "People", path: "/about", note: p.role })),
  ...FAQS.map((f) => ({ title: f.q, type: "FAQ", path: "/admissions", note: f.a.slice(0, 90) + "…" })),
  { title: "Tuition & Fees", type: "Info", path: "/admissions" },
  { title: "Bursaries & Financial Aid", type: "Info", path: "/admissions" },
  { title: "Bus Routes", type: "Info", path: "/contact" },
  { title: "Uniform Shop", type: "Info", path: "/contact" },
];
