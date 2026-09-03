/* ------------------------------------------------------------------ */
/*  Ashgrove Academy — central data layer                              */
/* ------------------------------------------------------------------ */

export const IMG = {
  quad: "https://image.qwenlm.ai/generated-images/d2608f65-1de9-4cff-959d-ce47c7d8ba17/_result.png",
  library: "https://image.qwenlm.ai/generated-images/555e1b25-0ef0-469d-b4d1-4029e72cc686/_result.png",
  lab: "https://image.qwenlm.ai/generated-images/292a8cd5-c18d-449c-987e-37de39ae9824/_result.png",
  art: "https://image.qwenlm.ai/generated-images/ffa4c681-7a5f-4294-b155-ac2b08fd4174/_result.png",
  sports: "https://image.qwenlm.ai/generated-images/11faeeb7-f30f-4d22-b8a8-44a5a37a89a5/_result.png",
  hall: "https://image.qwenlm.ai/generated-images/c9082cdf-6847-42b1-9c91-9c9dcacd0d64/_result.png",
  classroom: "https://image.qwenlm.ai/generated-images/d173cc4c-ddb9-49c2-9116-d701cccc6fb3/_result.png",
  aerial: "https://image.qwenlm.ai/generated-images/1791ecf4-1e6f-4362-8525-5fc91464549c/_result.png",
};

/* ---------- date helpers ---------- */

export function dayOffset(days: number, hour = 9, minute = 0): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d;
}

export const fmt = (d: Date, opts?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", opts ?? { day: "numeric", month: "short", year: "numeric" }).format(d);

export const fmtShort = (d: Date) => fmt(d, { day: "numeric", month: "short" });
export const fmtWeekday = (d: Date) => fmt(d, { weekday: "short", day: "numeric", month: "short" });
export const fmtTime = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" }).format(d);

/* ---------- school facts ---------- */

export const SCHOOL = {
  name: "Ashgrove Academy",
  motto: "Radices et Alae",
  mottoEn: "Roots and Wings",
  founded: 1912,
  address: "14 Ashgrove Lane, Hartfield, Kent TN8 7QR",
  phone: "+44 (0)1892 654 210",
  email: "hello@ashgrove-academy.sch.uk",
  admissionsEmail: "admissions@ashgrove-academy.sch.uk",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Admissions", to: "/admissions" },
  { label: "News & Events", to: "/news" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact Us", to: "/contact" },
];

/* ---------- bell schedule ---------- */

export interface BellPeriod {
  name: string;
  start: string;
  end: string;
}

export const bellSchedule: BellPeriod[] = [
  { name: "Registration", start: "08:30", end: "08:45" },
  { name: "Period 1", start: "08:50", end: "09:50" },
  { name: "Morning Break", start: "09:50", end: "10:10" },
  { name: "Period 2", start: "10:10", end: "11:10" },
  { name: "Period 3", start: "11:15", end: "12:15" },
  { name: "Lunch", start: "12:15", end: "13:15" },
  { name: "Period 4", start: "13:15", end: "14:15" },
  { name: "Period 5", start: "14:20", end: "15:20" },
  { name: "Clubs & Prep", start: "15:30", end: "16:30" },
];

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export type BellState =
  | { status: "weekend"; label: string; current: null }
  | { status: "before"; label: string; current: null }
  | { status: "during"; label: string; current: BellPeriod }
  | { status: "after"; label: string; current: null };

export function currentPeriod(now: Date): BellState {
  const day = now.getDay();
  if (day === 0 || day === 6) return { status: "weekend", label: "Weekend — no classes today", current: null };
  const mins = now.getHours() * 60 + now.getMinutes();
  if (mins < toMin(bellSchedule[0].start))
    return { status: "before", label: "Gates open 08:00 · Registration 08:30", current: null };
  for (const p of bellSchedule) {
    if (mins >= toMin(p.start) && mins < toMin(p.end))
      return { status: "during", label: `${p.name} · until ${p.end}`, current: p };
  }
  return { status: "after", label: "School day complete — see you tomorrow", current: null };
}

/* ---------- announcements & quick actions ---------- */

export const announcements = [
  `Spring Open Morning — ${fmtShort(dayOffset(17, 10))}, booking now open`,
  "Term 2 half-term holiday begins " + fmtShort(dayOffset(24)),
  "U14 footballers through to the county final — well done, Grove!",
  "New Design Technology wing opens this September",
  "Bus route 7 timetable updated from Monday",
  "Year 6 production tickets on sale via the parent portal",
];

export const quickActions = [
  { label: "Admissions enquiries", meta: "2026 entry now open", to: "/admissions" },
  { label: "Term dates & calendar", meta: "Academic year 2025–26", download: "term-calendar" },
  { label: "Bus routes & times", meta: "7 routes across Kent", download: "bus-routes" },
  { label: "This week's lunch menu", meta: "Kitchen of Mrs. Hale", download: "lunch-menu" },
];

/* ---------- academics ---------- */

export interface Division {
  num: string;
  id: string;
  name: string;
  ages: string;
  years: string;
  blurb: string;
  highlights: string[];
  subjects: string[];
}

export const divisions: Division[] = [
  {
    num: "01",
    id: "early-years",
    name: "Early Years",
    ages: "Ages 4–5",
    years: "Reception",
    blurb:
      "A woodland-edge setting where play is the serious work of childhood. Forest mornings, phonics through song, and mud under the fingernails — every day.",
    highlights: ["Forest school every Friday", "1:8 adult ratio", "Daily music & movement"],
    subjects: ["Phonics & early reading", "Number play", "Forest school", "Creative studio", "Music & movement"],
  },
  {
    num: "02",
    id: "lower-school",
    name: "Lower School",
    ages: "Ages 5–11",
    years: "Years 1–6",
    blurb:
      "The habits of a lifetime formed early: curiosity, kindness and craft. Topic-led learning, specialist French and music from Year 1, and sport every single day.",
    highlights: ["Specialist teaching from Year 3", "Weekly library period", "Instrumental programme"],
    subjects: ["English", "Mathematics", "Science", "French", "History & Geography", "Music", "Art", "PE & Swimming"],
  },
  {
    num: "03",
    id: "middle-school",
    name: "Middle School",
    ages: "Ages 11–16",
    years: "Years 7–11",
    blurb:
      "A broad academic core meets genuine choice. Twenty-eight GCSE options, a personal tutor who knows your name, and the Duke of Edinburgh's Award from Year 9.",
    highlights: ["28 GCSE options", "Duke of Edinburgh's Award", "1:1 laptop from Year 7"],
    subjects: ["English Lang & Lit", "Mathematics", "Triple Science", "Latin or Spanish", "Computer Science", "Design & Tech", "Drama", "Food & Nutrition"],
  },
  {
    num: "04",
    id: "senior-school",
    name: "Sixth Form",
    ages: "Ages 16–18",
    years: "Years 12–13",
    blurb:
      "A collegiate atmosphere with 26 A-levels, the Extended Project, and a university office that has guided offers from Oxford to the conservatoires.",
    highlights: ["26 A-level choices", "EPQ for every student", "Dedicated university office"],
    subjects: ["Sciences", "Humanities", "Modern Languages", "Economics", "Art & Design", "Music Technology", "Psychology", "Further Maths"],
  },
];

export const curriculumAreas = [
  { icon: "book", name: "English & Literature", desc: "From Beowulf to Bernardine Evaristo — reading widely, arguing well." },
  { icon: "ruler", name: "Mathematics", desc: "Two sets from Year 7, UKMT challenges, and Further Maths in Sixth Form." },
  { icon: "flask", name: "Sciences", desc: "Triple science as standard; a new £2.4m laboratory wing opens in September." },
  { icon: "globe", name: "Humanities", desc: "History, Geography, RE and Philosophy — contested ideas, civilly debated." },
  { icon: "compass", name: "Modern Languages", desc: "French and Spanish to A-level; Latin from Year 5; Mandarin club." },
  { icon: "brush", name: "Art & Design", desc: "Four studios, a kiln room, and an annual exhibition in the Great Hall." },
  { icon: "music", name: "Music & Drama", desc: "320 instrumental lessons a week, three choirs, two full productions a year." },
  { icon: "ball", name: "Sport & PE", desc: "Twelve competitive sports, a 25m pool, and fixtures against 40 schools." },
];

/* ---------- about ---------- */

export const values = [
  { num: "I", name: "Curiosity first", text: "We protect the question as carefully as we mark the answer. Every timetable begins with something worth wondering about." },
  { num: "II", name: "Kindness as discipline", text: "Manners are not decoration. Our pastoral system — tutors, houses, listening lunches — is the spine of the school." },
  { num: "III", name: "Craft over cramming", text: "We would rather a pupil make one beautiful thing than memorise ten forgettable ones. Depth beats coverage." },
  { num: "IV", name: "Roots and wings", text: "Our motto is a promise: deep belonging to this grove, and the confidence to leave it for good." },
];

export const milestones = [
  { year: "1912", title: "A school in a walled garden", text: "Edith Ashworth founds Ashgrove with 14 pupils, two mistresses and one donkey for the garden cart." },
  { year: "1931", title: "The Great Hall", text: "Alumni fund the oak-panelled hall, stage and its famous Willis organ in a single remarkable summer." },
  { year: "1954", title: "Co-education", text: "Ashgrove admits its first boys — and wins the Kent Schools' cricket trophy the same season." },
  { year: "1978", title: "The music school", text: "A converted barn becomes eight practice rooms; the Chapel Choir is founded the following year." },
  { year: "1999", title: "Sixth Form centre", text: "The Grove — a collegiate common room, study carrels and university office — opens for Years 12–13." },
  { year: "2016", title: "All-through campus", text: "Early Years joins the family, completing our 4–18 journey on one 32-acre campus." },
  { year: "2025", title: "Design & Technology wing", text: "Ground broken on robotics, CAD and food-science studios; doors open this September." },
];

export const staff = [
  { name: "Dr. Margaret Ellison", role: "Headmistress", cred: "PhD History, Cambridge", initials: "ME", tint: "bg-navy-800" },
  { name: "Mr. Samuel Okafor", role: "Deputy Head, Academic", cred: "MSc Mathematics, Imperial", initials: "SO", tint: "bg-moss-700" },
  { name: "Mrs. Priya Nair", role: "Head of Lower School", cred: "MA Education, UCL", initials: "PN", tint: "bg-crimson-700" },
  { name: "Mr. James Whitfield", role: "Head of Sixth Form", cred: "MPhil English, Oxford", initials: "JW", tint: "bg-navy-700" },
  { name: "Miss Charlotte Reed", role: "Director of Pastoral Care", cred: "BSc Psychology, Bristol", initials: "CR", tint: "bg-moss-600" },
  { name: "Mr. Tomás Ferreira", role: "Director of Sport", cred: "BSc Sport Science, Loughborough", initials: "TF", tint: "bg-navy-600" },
];

/* ---------- news & events ---------- */

export type NewsCategory = "School Life" | "Academics" | "Sport" | "Arts" | "Community";

export interface NewsItem {
  id: string;
  title: string;
  category: NewsCategory;
  date: Date;
  image: string;
  excerpt: string;
  body: string[];
}

export const newsItems: NewsItem[] = [
  {
    id: "n1",
    title: "Three Ashgrove pupils shortlisted for the Young Scientists Prize",
    category: "Academics",
    date: dayOffset(-2),
    image: IMG.lab,
    excerpt: "Year 10's study of mycelium insulation panels has reached the national final in London this June.",
    body: [
      "The project began as a lunchtime question — could the fungus growing on the compost heap keep a house warm? Eighteen months later, Amara Osei, Theo Brandt and June Park have grown, dried and tested 240 insulation panels in the science block's new climate chamber.",
      "Their data shows mycelium boards retaining 31% more heat than standard foam at half the weight. The panel of judges at the regional heat called it 'genuinely publishable work from a school laboratory'.",
      "The trio present at the national final in London in June, with Dr. Ellison promising 'the whole school will be there in spirit — and the Science department in person'.",
    ],
  },
  {
    id: "n2",
    title: "U14 footballers storm into the county final",
    category: "Sport",
    date: dayOffset(-5),
    image: IMG.sports,
    excerpt: "A last-minute winner against Tonbridge sends the Grove to Maidstone for the title decider.",
    body: [
      "With the clock deep into added time and the rain doing its Kentish worst, substitute winger Freddie Anselme cut inside from the left and curled home what his captain called 'the best goal I've ever seen at this school'.",
      "The 2–1 victory over Tonbridge completes an unbeaten run of eleven matches. Director of Sport Tomás Ferreira credits 'a squad that defends for each other first and celebrates second'.",
      "The final takes place at the County Ground, Maidstone. A supporters' coach leaves the school gates at 13:00 — parents should book through the portal.",
    ],
  },
  {
    id: "n3",
    title: "Spring Concert: 200 voices fill the Great Hall",
    category: "Arts",
    date: dayOffset(-9),
    image: IMG.hall,
    excerpt: "From the Early Years' seed-song to the Sixth Form jazz octet, a night that ended in a standing ovation.",
    body: [
      "The Willis organ opened the evening with Holst, and for two hours the hall moved through folk song, Vivaldi, a premiere by Year 12 composer Lena Fischer, and a massed-choir arrangement that drew every singer on stage to 203.",
      "Director of Music, Mrs. Adeyemi, has conducted the Spring Concert for nineteen years. 'This one had the loudest silence I can remember,' she said. 'That's the compliment I keep.'",
      "Proceeds of £2,400 go to the music bursary fund, which has supported 34 instrumental lessons this year.",
    ],
  },
  {
    id: "n4",
    title: "New Design & Technology wing takes shape",
    category: "School Life",
    date: dayOffset(-13),
    image: IMG.aerial,
    excerpt: "Steel is up on the £2.4m build — robotics bay, kiln room and food-science kitchen open in September.",
    body: [
      "Visitors arriving through the north gate can now see the full frame of the new wing rising beside the sports hall. The building will house a robotics and CAD suite, a product-design studio with laser cutters, a kiln room, and a food-science kitchen with test benches rather than domestic cookers.",
      "Head of Design Mr. Okonkwo has already begun consulting pupils: Year 9's brief was to design the courtyard seating, and three of their benches will be fabricated in the new workshops this summer.",
      "An open afternoon for prospective families will be held on the first Friday of September term.",
    ],
  },
  {
    id: "n5",
    title: "Year 6 harvests 40kg from the walled garden",
    category: "Community",
    date: dayOffset(-18),
    image: IMG.quad,
    excerpt: "The produce went straight to the Hartfield food bank — and into last week's school soup day.",
    body: [
      "The walled garden, laid out in the school's founding year, produced its best autumn haul on record: 40kg of squash, chard, leeks and the famous Ashgrove eating apples.",
      "Half the crop was delivered by the Year 6 'garden gang' to the Hartfield food bank; the other half became the centrepiece of the whole-school soup day, cooked with parents in the food rooms.",
      "Garden mistress Mrs. Bloom says the donkey-cart tradition will return in spring — 'the children have already named the rota'.",
    ],
  },
  {
    id: "n6",
    title: "Sixth Form debate team wins the Kent Shield",
    category: "Academics",
    date: dayOffset(-24),
    image: IMG.classroom,
    excerpt: "An undefeated season ends with a final-round motion on artificial intelligence and memory.",
    body: [
      "The team — Zara Mahmoud, Oliver Chen and Ines Duarte — went undefeated across six rounds, closing the season with a government-bench victory on the motion 'This house believes machines should be allowed to forget'.",
      "Captain Zara Mahmoud, who opens for Oxford interviews next month, said the season's real prize was 'learning to lose gracefully in round two and win anyway'.",
      "Debating is open to all pupils from Year 8; trials for next season run in the first week back.",
    ],
  },
  {
    id: "n7",
    title: "Old Grovian returns to open the new library archive",
    category: "Community",
    date: dayOffset(-31),
    image: IMG.library,
    excerpt: "Novelist and 1974 leaver Rosa Fairweather catalogued the school's founding letters herself.",
    body: [
      "The archive holds Edith Ashworth's founding correspondence, wartime logbooks, and every prize-giving programme since 1913. Fairweather spent four summers with the school archivist making it searchable.",
      "'I hid in this library for five years,' she told the assembled pupils. 'It is the single most important room in the school. Protect it.'",
      "The archive is open to pupils on Tuesday and Thursday lunchtimes, and to researchers by appointment.",
    ],
  },
  {
    id: "n8",
    title: "Swim squad clocks three county records in one weekend",
    category: "Sport",
    date: dayOffset(-40),
    image: IMG.quad,
    excerpt: "The 25m pool has never been busier — new records in the 50m free, 100m breaststroke and 4×50 relay.",
    body: [
      "At the Kent County Championships, Ashgrove's swimmers broke three long-standing county records, led by Year 11's Dara Kimathi in the 50m freestyle.",
      "Head of Swimming Coach Mills attributes the season to 'boring fundamentals done beautifully' — and to the 06:30 Tuesday sessions nobody has skipped since October.",
      "Trials for the development squad run at the start of next half-term; details are on the fixtures page of the portal.",
    ],
  },
];

export type EventTag = "Open Day" | "Sport" | "Arts" | "Academic" | "Community";

export interface EventItem {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  tag: EventTag;
  description: string;
}

export const tagColor: Record<EventTag, string> = {
  "Open Day": "bg-gold-400 text-navy-950",
  Sport: "bg-moss-600 text-chalk-50",
  Arts: "bg-crimson-600 text-chalk-50",
  Academic: "bg-navy-700 text-chalk-50",
  Community: "bg-navy-300 text-navy-950",
};

export const events: EventItem[] = [
  { id: "e1", title: "Science Fair & Family Evening", date: dayOffset(-4, 17), time: "17:00 – 19:00", location: "Science Block", tag: "Academic", description: "Two hundred projects across all year groups, from volcano clichés (banned) to the national-final mycelium panels." },
  { id: "e2", title: "U14 Football: County Semi-final", date: dayOffset(2, 15), time: "15:00 kick-off", location: "Top Pitch", tag: "Sport", description: "Home tie against Maidstone Grammar. Tea urn on the touchline; bring a flag." },
  { id: "e3", title: "Careers Evening: Engineering & Design", date: dayOffset(6, 18), time: "18:00 – 20:00", location: "Great Hall", tag: "Academic", description: "Twelve alumni engineers, from bridge design to prosthetics. Years 10–13 and parents welcome." },
  { id: "e4", title: "Chamber Concert: Strings & Winds", date: dayOffset(9, 19), time: "19:30", location: "Music School Barn", tag: "Arts", description: "An intimate evening of chamber music by Years 9–13, ending with the wind octet's Dvořák." },
  { id: "e5", title: "Parents' Evening — Middle School", date: dayOffset(12, 16), time: "16:00 – 19:30", location: "Classrooms, main building", tag: "Community", description: "Fifteen-minute tutor appointments, bookable through the parent portal from Monday." },
  { id: "e6", title: "Winter Art Exhibition opening", date: dayOffset(14, 18), time: "18:00 – 21:00", location: "Great Hall & Studios", tag: "Arts", description: "The whole school exhibits: Early Years clay beasts to Sixth Form installation work. Wine and squash provided." },
  { id: "e7", title: "Spring Open Morning", date: dayOffset(17, 10), time: "10:00 – 12:30", location: "Main gate reception", tag: "Open Day", description: "Tours led by Sixth Formers, taster lessons for the children, coffee and honest questions answered by Dr. Ellison." },
  { id: "e8", title: "Year 6 Production: The Borrowers", date: dayOffset(20, 18), time: "18:30", location: "Great Hall stage", tag: "Arts", description: "Three performances, one enormous teapot. Tickets £3 via the parent portal, free for Early Years siblings." },
  { id: "e9", title: "Old Grovians' Reunion Dinner", date: dayOffset(27, 19), time: "19:00 for 19:30", location: "Great Hall", tag: "Community", description: "Class of 1976–2016 reunite under the Willis organ. Black tie optional, stories mandatory." },
  { id: "e10", title: "Mock Exams begin — Years 11 & 13", date: dayOffset(33, 9), time: "08:50 sharp", location: "Examination Hall", tag: "Academic", description: "Full examination conditions. Timetables posted on the student portal two weeks prior." },
  { id: "e11", title: "Community Planting Day", date: dayOffset(3, 10), time: "10:00 – 13:00", location: "Walled Garden & Copse", tag: "Community", description: "Two hundred native saplings, gloves provided, soup at one. Families and neighbours welcome." },
];

/* ---------- gallery ---------- */

export type GalleryCat = "Campus" | "Learning" | "Arts" | "Sport" | "Community";

export interface GalleryImage {
  src: string;
  alt: string;
  cat: GalleryCat;
  aspect: string;
}

export const galleryImages: GalleryImage[] = [
  { src: IMG.quad, alt: "The main quad at golden hour", cat: "Campus", aspect: "aspect-[4/3]" },
  { src: IMG.classroom, alt: "Seminar discussion in Room 12", cat: "Learning", aspect: "aspect-[4/5]" },
  { src: IMG.sports, alt: "U14 footballers at dusk", cat: "Sport", aspect: "aspect-[4/3]" },
  { src: IMG.library, alt: "The Ellison Library reading room", cat: "Learning", aspect: "aspect-[4/3]" },
  { src: IMG.art, alt: "Year 10 in the north studios", cat: "Arts", aspect: "aspect-[4/5]" },
  { src: IMG.hall, alt: "Spring Concert in the Great Hall", cat: "Community", aspect: "aspect-[4/3]" },
  { src: IMG.lab, alt: "Mycelium trials in the climate chamber", cat: "Learning", aspect: "aspect-[4/3]" },
  { src: IMG.aerial, alt: "The campus from above in autumn", cat: "Campus", aspect: "aspect-[16/10]" },
];

/* ---------- admissions ---------- */

export const admissionsSteps = [
  { step: "01", title: "Enquire & visit", text: "Send an enquiry or book an Open Morning. Seeing the Grove on a normal Tuesday tells you more than any brochure." },
  { step: "02", title: "Register", text: "Complete the online registration form (£75, refunded for bursary applicants) at least one term before the entrance assessment." },
  { step: "03", title: "Taster & assessment", text: "Your child joins a taster morning with their year group. Assessments are age-appropriate: for Reception, play-based observation." },
  { step: "04", title: "Family meeting", text: "We meet the whole family. We ask about hopes and habits; you ask us anything — including the awkward things." },
  { step: "05", title: "Offer", text: "Offers are posted within ten working days. Means-tested bursaries of up to 100% are assessed in parallel." },
  { step: "06", title: "Join the Grove", text: "Induction week in July: uniforms, locker, buddy, and a tutor who already knows your child's name." },
];

export const keyDates = [
  { when: "Rolling", what: "Open Mornings & private tours", detail: "Most Tuesday and Thursday mornings, term time" },
  { when: fmtShort(dayOffset(17, 10)), what: "Spring Open Morning", detail: "Booking now open — places limited to 40 families" },
  { when: "January", what: "11+ and 13+ entrance assessments", detail: "English, maths, reasoning; taster morning same week" },
  { when: "March", what: "Scholarship exhibitions", detail: "Music, art, sport, academic — audition by portfolio" },
  { when: "May", what: "Sixth Form applications close", detail: "GCSE results and interview required by July" },
];

export const feeRows = [
  { division: "Early Years (Reception)", perTerm: "£4,980", perYear: "£14,940", notes: "Includes forest school & lunch club" },
  { division: "Lower School (Years 1–6)", perTerm: "£5,860", perYear: "£17,580", notes: "Includes swimming & instrumental taster" },
  { division: "Middle School (Years 7–11)", perTerm: "£6,740", perYear: "£20,220", notes: "Includes laptop scheme & Duke of Edinburgh" },
  { division: "Sixth Form (Years 12–13)", perTerm: "£7,150", perYear: "£21,450", notes: "Includes university guidance & EPQ" },
];

export const faqs = [
  { q: "At what ages can pupils join?", a: "Main entry points are 4+ (Reception), 7+, 11+ and 13+ (Year 7 or 9), and 16+ (Sixth Form). We consider in-year applications where places exist — around a third of our pupils join at non-standard points." },
  { q: "Do you offer bursaries and scholarships?", a: "Yes. Means-tested bursaries cover up to 100% of fees and are assessed in parallel with the offer, so cost never needs to decide a child's future. Scholarships (10–25%) are awarded in music, art, sport and academics each March." },
  { q: "Is there boarding?", a: "No — Ashgrove is a deliberately day school. We run seven supervised bus routes across Kent, a breakfast club from 07:30, and prep-and-clubs until 16:30 (17:30 for Sixth Form)." },
  { q: "What is the class size?", a: "A maximum of 22, with an average of 17. Early Years run at 1:8 with a teacher and two assistants in every room." },
  { q: "How do you support SEND pupils?", a: "Our Learning Support team of six specialists runs in-class support, 1:1 programmes and exam-access arrangements. Around 9% of pupils have an education, health and care plan or equivalent." },
  { q: "What are the school hours?", a: "Gates open 08:00, registration 08:30, last lesson ends 15:20. Clubs and supervised prep run to 16:30, and the Sixth Form common room stays open to 17:30." },
];

/* ---------- downloadable resources ---------- */

export interface Resource {
  id: string;
  name: string;
  file: string;
  size: string;
  desc: string;
  lines: string[];
}

const header = (title: string) => [
  "ASHGROVE ACADEMY — EST. 1912",
  "14 Ashgrove Lane, Hartfield, Kent TN8 7QR",
  `${SCHOOL.phone} · ${SCHOOL.email}`,
  "".padEnd(56, "="),
  title.toUpperCase(),
  "".padEnd(56, "-"),
  "",
];

export const resources: Resource[] = [
  {
    id: "prospectus",
    name: "School Prospectus 2026",
    file: "ashgrove-prospectus-2026.txt",
    size: "2 pages",
    desc: "Everything on one honest page: ethos, academics, fees, day structure and how to visit.",
    lines: [
      ...header("School Prospectus 2026"),
      "OUR MOTTO — Radices et Alae, 'Roots and Wings'.",
      "",
      "Ashgrove Academy is an independent day school for ages 4–18 on a",
      "32-acre campus in Hartfield, Kent. Founded in 1912 by Edith Ashworth",
      "with fourteen pupils and one donkey, the school now educates 1,180",
      "pupils across Early Years, Lower School, Middle School and Sixth Form.",
      "",
      "THE DAY — Gates 08:00 · Registration 08:30 · Lessons to 15:20 ·",
      "Clubs & supervised prep to 16:30. Seven bus routes across Kent.",
      "",
      "ACADEMICS — Average class of 17 · 28 GCSE options · 26 A-levels ·",
      "96% of leavers take up first-choice university places.",
      "",
      "FEES 2025–26 — Early Years £4,980/term · Lower £5,860/term ·",
      "Middle £6,740/term · Sixth Form £7,150/term. Bursaries to 100%.",
      "",
      "VISIT — Open Mornings most Tuesdays and Thursdays, term time.",
      "Book via admissions@ashgrove-academy.sch.uk or +44 (0)1892 654 210.",
    ],
  },
  {
    id: "application-form",
    name: "Registration Form 2026",
    file: "ashgrove-registration-2026.txt",
    size: "3 pages",
    desc: "The printable registration form for all entry points, with notes on required documents.",
    lines: [
      ...header("Registration Form — 2026 Entry"),
      "SECTION 1 — PUPIL DETAILS",
      "Full name: ____________________________________________",
      "Date of birth: ____________  Current school: ____________",
      "Entry point applied for:  [ ] 4+  [ ] 7+  [ ] 11+  [ ] 13+  [ ] 16+",
      "Term of entry: ____________",
      "",
      "SECTION 2 — FAMILY DETAILS",
      "Parent/guardian 1: __________________  Phone: ____________",
      "Parent/guardian 2: __________________  Phone: ____________",
      "Email for correspondence: ________________________________",
      "",
      "SECTION 3 — DECLARATION",
      "I confirm the information given is accurate and consent to Ashgrove",
      "Academy processing it for admissions purposes.",
      "Signed: ______________________  Date: ____________",
      "",
      "Enclose: birth certificate copy, latest school report, £75 fee",
      "(refunded for bursary applicants). Return to the Registrar.",
    ],
  },
  {
    id: "term-calendar",
    name: "Term Dates 2025–26",
    file: "ashgrove-term-dates.txt",
    size: "1 page",
    desc: "Full calendar of terms, half-terms, inset days and holiday clubs.",
    lines: [
      ...header("Term Dates — Academic Year 2025–26"),
      "AUTUMN TERM   — Wed 3 Sep → Fri 12 Dec",
      "  Half-term: Mon 20 Oct → Fri 24 Oct",
      "  Holiday club runs both half-term weeks (08:00–17:00).",
      "",
      "SPRING TERM   — Mon 5 Jan → Fri 27 Mar",
      "  Half-term: Mon 16 Feb → Fri 20 Feb",
      "  INSET days: Mon 5 Jan, Fri 27 Mar",
      "",
      "SUMMER TERM   — Mon 13 Apr → Tue 7 Jul",
      "  Half-term: Mon 25 May → Fri 29 May",
      "  Sports Day: Fri 19 Jun · Prize Giving: Sat 4 Jul",
      "",
      "Examinations: mock window begins " + fmtShort(dayOffset(33, 9)) + ".",
    ],
  },
  {
    id: "bus-routes",
    name: "Bus Routes & Times",
    file: "ashgrove-bus-routes.txt",
    size: "2 pages",
    desc: "All seven supervised routes with pickup points, times and chaperone names.",
    lines: [
      ...header("Bus Routes & Times — from Monday"),
      "ROUTE 1 · Tunbridge Wells   07:35 → school 08:15   Mrs. Doyle",
      "ROUTE 2 · Tonbridge          07:40 → school 08:18   Mr. Pratt",
      "ROUTE 3 · Sevenoaks          07:30 → school 08:12   Mrs. Doyle",
      "ROUTE 4 · Edenbridge         07:45 → school 08:20   Ms. Kaur",
      "ROUTE 5 · Oxted              07:50 → school 08:22   Mr. Pratt",
      "ROUTE 6 · Crowborough        07:38 → school 08:16   Ms. Kaur",
      "ROUTE 7 · Hartfield loop     08:00 → school 08:24   Mr. Ives",
      "",
      "Return journeys depart 16:35 (17:40 Sixth Form express).",
      "All routes are supervised by staff; seatbelts checked daily.",
      "Queries: transport@ashgrove-academy.sch.uk",
    ],
  },
  {
    id: "uniform-list",
    name: "Uniform List",
    file: "ashgrove-uniform-list.txt",
    size: "1 page",
    desc: "Complete uniform and kit list by division, with suppliers and second-hand swap details.",
    lines: [
      ...header("Uniform List — All Divisions"),
      "EVERYONE — Navy blazer with gold ash-leaf crest · white shirt ·",
      "school tie (stripe by house) · grey trousers/skirt · navy V-neck ·",
      "black shoes (no trainers) · named PE kit in Ashgrove navy & gold.",
      "",
      "EARLY YEARS — Elastic-waist trousers, wellies for forest school,",
      "spare clothes in named bag. No ties until Year 1.",
      "",
      "SIXTH FORM — Business dress in navy, grey and white; blazer optional.",
      "",
      "Suppliers: Trunk & Twine, Hartfield High St · The Kit Room, Tonbridge.",
      "Second-hand swap rail open every Friday 15:30, Parents' Hut.",
    ],
  },
  {
    id: "lunch-menu",
    name: "Lunch Menu — This Week",
    file: "ashgrove-lunch-menu.txt",
    size: "1 page",
    desc: "Mrs. Hale's kitchen: two hot options, salad bar and a vegetarian line daily.",
    lines: [
      ...header("Lunch Menu — This Week · Kitchen of Mrs. Hale"),
      "MONDAY    — Roast chicken, rosemary potatoes; veg: bean chilli",
      "TUESDAY   — Fish pie, buttered peas; veg: mushroom stroganoff",
      "WEDNESDAY — Sausage & mash, onion gravy; veg: halloumi traybake",
      "THURSDAY  — Thai green curry; veg: the same, minus the chicken",
      "FRIDAY    — Homemade fish fingers & chips; veg: sweetcorn fritters",
      "",
      "Every day: salad bar, fruit, yogurt, and whatever the walled garden",
      "sent up this morning. Allergies flagged on pupil lanyards.",
      "Pudding is non-negotiable and usually custard-adjacent.",
    ],
  },
];

export function downloadResource(id: string) {
  const r = resources.find((x) => x.id === id);
  if (!r) return;
  const blob = new Blob([r.lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = r.file;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* ---------- student portal ---------- */

export const portalTimetable = [
  { day: "Monday", lessons: [
    { time: "08:50", subject: "English Literature", room: "R12", teacher: "Mr. Whitfield" },
    { time: "10:10", subject: "Mathematics", room: "M4", teacher: "Mrs. Sato" },
    { time: "11:15", subject: "Biology", room: "S2", teacher: "Dr. Fenwick" },
    { time: "13:15", subject: "French", room: "L1", teacher: "Mme. Aubert" },
    { time: "14:20", subject: "Design & Tech", room: "DT Wing", teacher: "Mr. Okonkwo" },
  ]},
  { day: "Tuesday", lessons: [
    { time: "08:50", subject: "Mathematics", room: "M4", teacher: "Mrs. Sato" },
    { time: "10:10", subject: "Chemistry", room: "S5", teacher: "Mr. Hale" },
    { time: "11:15", subject: "English Language", room: "R12", teacher: "Mr. Whitfield" },
    { time: "13:15", subject: "History", room: "H2", teacher: "Dr. Ellison" },
    { time: "14:20", subject: "PE — Swimming", room: "Pool", teacher: "Coach Mills" },
  ]},
  { day: "Wednesday", lessons: [
    { time: "08:50", subject: "Physics", room: "S1", teacher: "Mr. Brandt" },
    { time: "10:10", subject: "English Literature", room: "R12", teacher: "Mr. Whitfield" },
    { time: "11:15", subject: "French", room: "L1", teacher: "Mme. Aubert" },
    { time: "13:15", subject: "Mathematics", room: "M4", teacher: "Mrs. Sato" },
    { time: "14:20", subject: "Music", room: "Barn 3", teacher: "Mrs. Adeyemi" },
  ]},
  { day: "Thursday", lessons: [
    { time: "08:50", subject: "Biology", room: "S2", teacher: "Dr. Fenwick" },
    { time: "10:10", subject: "Geography", room: "H3", teacher: "Ms. Kaur" },
    { time: "11:15", subject: "Mathematics", room: "M4", teacher: "Mrs. Sato" },
    { time: "13:15", subject: "Drama", room: "Hall stage", teacher: "Mr. Reyes" },
    { time: "14:20", subject: "Chemistry", room: "S5", teacher: "Mr. Hale" },
  ]},
  { day: "Friday", lessons: [
    { time: "08:50", subject: "English Language", room: "R12", teacher: "Mr. Whitfield" },
    { time: "10:10", subject: "Physics", room: "S1", teacher: "Mr. Brandt" },
    { time: "11:15", subject: "Art", room: "Studio 2", teacher: "Ms. Bloom" },
    { time: "13:15", subject: "RE & Philosophy", room: "H1", teacher: "Mr. Ives" },
    { time: "14:20", subject: "Games — Football", room: "Top Pitch", teacher: "Mr. Ferreira" },
  ]},
];

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  due: Date;
}

export const assignments: Assignment[] = [
  { id: "a1", subject: "Biology", title: "Enzyme rate write-up (lab pages 14–16)", due: dayOffset(1, 9) },
  { id: "a2", subject: "English Literature", title: "Essay: memory in 'The Go-Between', 800 words", due: dayOffset(2, 9) },
  { id: "a3", subject: "Mathematics", title: "Quadratics worksheet Q1–Q18, show workings", due: dayOffset(3, 9) },
  { id: "a4", subject: "French", title: "Learn irregular futur stems — quiz Friday P1", due: dayOffset(4, 9) },
  { id: "a5", subject: "History", title: "Source analysis: the 1911 census extract", due: dayOffset(6, 9) },
  { id: "a6", subject: "Chemistry", title: "Bonding revision cards, complete set 4", due: dayOffset(8, 9) },
  { id: "a7", subject: "Design & Tech", title: "CAD model of garden bench — file to portal", due: dayOffset(10, 9) },
];

export const grades = [
  { subject: "English Literature", teacher: "Mr. Whitfield", t1: 78, t2: 82 },
  { subject: "English Language", teacher: "Mr. Whitfield", t1: 74, t2: 79 },
  { subject: "Mathematics", teacher: "Mrs. Sato", t1: 88, t2: 91 },
  { subject: "Biology", teacher: "Dr. Fenwick", t1: 81, t2: 84 },
  { subject: "Chemistry", teacher: "Mr. Hale", t1: 76, t2: 75 },
  { subject: "Physics", teacher: "Mr. Brandt", t1: 72, t2: 77 },
  { subject: "French", teacher: "Mme. Aubert", t1: 69, t2: 73 },
  { subject: "History", teacher: "Dr. Ellison", t1: 85, t2: 83 },
  { subject: "Geography", teacher: "Ms. Kaur", t1: 79, t2: 81 },
  { subject: "Art", teacher: "Ms. Bloom", t1: 90, t2: 92 },
];

export const gradeBand = (pct: number) =>
  pct >= 85 ? { g: "9–8", tone: "text-moss-700 bg-[#e3edE4]" } :
  pct >= 75 ? { g: "7–6", tone: "text-navy-700 bg-navy-100" } :
  pct >= 65 ? { g: "5–4", tone: "text-gold-600 bg-gold-100" } :
  { g: "3–1", tone: "text-crimson-700 bg-[#f3e2dd]" };

export const portalNotices = [
  { title: "Mock exam timetable posted", body: "Years 11 & 13: check the examinations page — mocks begin " + fmtShort(dayOffset(33, 8)) + ".", tag: "Exams" },
  { title: "Library open until 17:00", body: "The Ellison Library stays open late every Tuesday and Thursday until mocks end.", tag: "Library" },
  { title: "Ski trip deposits due Friday", body: "The Val d'Isère trip (Years 9–11) deposit of £180 is due via the portal by Friday.", tag: "Trips" },
  { title: "Lost property amnesty", body: "Everything unclaimed goes to the charity shop after half-term. The blazer mountain awaits.", tag: "General" },
];

/* ---------- site search ---------- */

export interface SearchDoc {
  type: "Page" | "Programme" | "News" | "Event" | "Resource";
  title: string;
  text: string;
  path: string;
  meta: string;
}

export const searchDocs: SearchDoc[] = [
  { type: "Page", title: "Home", text: "Welcome to Ashgrove Academy. Independent day school for ages 4 to 18 in Hartfield, Kent. Open mornings, term dates, campus life.", path: "/", meta: "Page" },
  { type: "Page", title: "About Us", text: "Our history since 1912, values, leadership team, campus and houses. Edith Ashworth, motto roots and wings.", path: "/about", meta: "Page" },
  { type: "Page", title: "Academics", text: "Early Years, Lower School, Middle School, Sixth Form. Curriculum areas, GCSE options, A-levels, timetable, assessment and reporting.", path: "/academics", meta: "Page" },
  { type: "Page", title: "Admissions", text: "How to apply, entry points 4+ 7+ 11+ 13+ 16+, fees, bursaries, scholarships, open mornings, registration form, FAQs.", path: "/admissions", meta: "Page" },
  { type: "Page", title: "News & Events", text: "Latest school news, fixtures, concerts, exhibitions, open days and the full event calendar.", path: "/news", meta: "Page" },
  { type: "Page", title: "Gallery", text: "Photographs of the campus, classrooms, sport, arts and community life at Ashgrove.", path: "/gallery", meta: "Page" },
  { type: "Page", title: "Contact Us", text: "Address, phone, email, office hours, directions, bus routes and the enquiry form.", path: "/contact", meta: "Page" },
  { type: "Page", title: "Student Portal", text: "Timetable, assignments, grades, exam dates and pupil resources. Login for current pupils.", path: "/portal", meta: "Page" },
  ...divisions.map((d) => ({ type: "Programme" as const, title: `${d.name} (${d.ages})`, text: `${d.blurb} Subjects: ${d.subjects.join(", ")}.`, path: "/academics", meta: d.years })),
  ...curriculumAreas.map((c) => ({ type: "Programme" as const, title: c.name, text: c.desc, path: "/academics", meta: "Curriculum" })),
  ...newsItems.map((n) => ({ type: "News" as const, title: n.title, text: n.excerpt, path: "/news", meta: `${n.category} · ${fmtShort(n.date)}` })),
  ...events.map((e) => ({ type: "Event" as const, title: e.title, text: `${e.description} ${e.location}`, path: "/news", meta: `${e.tag} · ${fmtWeekday(e.date)}` })),
  ...resources.map((r) => ({ type: "Resource" as const, title: r.name, text: r.desc, path: "/admissions", meta: "Download" })),
];

export interface SearchHit {
  doc: SearchDoc;
  pre: string;
  hit: string;
  post: string;
}

export function searchSite(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const hits: (SearchHit & { score: number })[] = [];
  for (const doc of searchDocs) {
    const hay = `${doc.title} ${doc.text}`;
    const i = hay.toLowerCase().indexOf(q);
    if (i === -1) continue;
    const titleHit = doc.title.toLowerCase().includes(q);
    const start = Math.max(0, i - 42);
    const end = Math.min(hay.length, i + q.length + 70);
    hits.push({
      doc,
      pre: (start > 0 ? "…" : "") + hay.slice(start, i),
      hit: hay.slice(i, i + q.length),
      post: hay.slice(i + q.length, end) + (end < hay.length ? "…" : ""),
      score: (titleHit ? 100 : 0) + (doc.type === "Page" ? 20 : 0),
    });
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, 14);
}
