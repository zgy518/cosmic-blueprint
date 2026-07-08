/**
 * Cultural Translation Dictionary — 中英命理术语词典
 *
 * Every Chinese metaphysical term mapped to its authoritative English
 * translation + a plain-English explanation with Western analogies.
 *
 * Translation sources (authoritative references):
 * - Joey Yap, "The Ten Gods" (2010), "BaZi Structures & Useful Gods"
 * - Baidu Encyclopedia (English), Wikipedia "Four Pillars of Destiny"
 * - Imperial Harvest (Grand Master David Goh, Singapore)
 * - Dong Xianghui, 《中国人的命理信仰》 (Shanghai People's Press)
 * - 《三命通会》San Ming Tong Hui / 《渊海子平》Yuan Hai Zi Ping
 *
 * Used by <TermText> to auto-detect terms and show hover tooltips.
 */

export type TermEntry = {
  /** Short English label (industry-standard, e.g. "Hurting Officer") */
  label: string;
  /** Plain-English explanation with cultural context and Western analogy */
  explanation: string;
};

const terms: Record<string, TermEntry> = {};

function t(term: string, label: string, explanation: string) {
  terms[term] = { label, explanation };
}

/* ═══════════════════════════════════════════════════════════════
   FOUR PILLARS (四柱)
   ═══════════════════════════════════════════════════════════════ */

t("四柱", "Four Pillars",
  "The four stem-branch pairs representing Year, Month, Day, and Hour of birth. Together they form your Eight Characters (八字).");
t("年柱", "Year Pillar",
  "The stem-branch pair for your birth year. Represents ancestry, grandparents, and the social backdrop of your early life.");
t("月柱", "Month Pillar",
  "The stem-branch pair for your birth month. Represents parents, upbringing, and your career foundation. The month boundary is determined by solar terms (节气), not the lunar calendar.");
t("日柱", "Day Pillar",
  "The stem-branch pair for your birth day. The most important pillar — its Heavenly Stem is your Day Master (日主), representing your core self.");
t("时柱", "Hour Pillar",
  "The stem-branch pair for your birth hour (时辰, one of twelve two-hour periods). Represents children, later life, and your hidden inner world.");
t("日主", "Day Master",
  "The Heavenly Stem of your Day Pillar — your core identity, personality, and essence. Every other stem in the chart is analyzed relative to the Day Master.");
t("日干", "Day Stem",
  "Synonym for Day Master — the Heavenly Stem of the Day Pillar. The anchor point for all Ten Gods analysis.");

/* ═══════════════════════════════════════════════════════════════
   HEAVENLY STEMS (十天干)
   ═══════════════════════════════════════════════════════════════ */

t("天干", "Heavenly Stems",
  "The ten celestial energies (甲 to 癸) — the visible, active half of each pillar pair. Each stem carries a Yin/Yang polarity and a Five Element nature.");
t("甲", "Jia · Yang Wood",
  "Yang Wood — like a mighty oak tree. Direct, principled, upward-growing. Natural leader who stands firm and grows with purpose.");
t("乙", "Yi · Yin Wood",
  "Yin Wood — like grass, ivy, or flowering vines. Flexible, charming, adaptable. Thrives through connection and graceful persistence.");
t("丙", "Bing · Yang Fire",
  "Yang Fire — like the sun at high noon. Radiant, warm, impossible to ignore. Natural charisma that lights up every room.");
t("丁", "Ding · Yin Fire",
  "Yin Fire — like a candle flame or starlight. Focused, intense, penetrating. An inner fire that burns steady and illuminates from within.");
t("戊", "Wu · Yang Earth",
  "Yang Earth — like a great mountain. Solid, dependable, immovable. The rock others lean on; slow to act but unstoppable once moving.");
t("己", "Ji · Yin Earth",
  "Yin Earth — like garden soil or fertile farmland. Nurturing, receptive, humble. The fertile ground where ideas and relationships grow.");
t("庚", "Geng · Yang Metal",
  "Yang Metal — like a sword, axe, or forged steel. Decisive, sharp, transformative. Cuts through confusion with clarity and force.");
t("辛", "Xin · Yin Metal",
  "Yin Metal — like jewelry, a precision instrument, or a mirror. Refined, elegant, exacting. Beauty that serves a function; self-aware and discerning.");
t("壬", "Ren · Yang Water",
  "Yang Water — like the ocean or a great river. Expansive, powerful, visionary. Big-picture thinker who flows toward vast horizons.");
t("癸", "Gui · Yin Water",
  "Yin Water — like morning dew, mist, or gentle rain. Subtle, penetrating, intuitive. Quiet wisdom that seeps into everything without force.");

/* ═══════════════════════════════════════════════════════════════
   EARTHLY BRANCHES (十二地支)
   ═══════════════════════════════════════════════════════════════ */

t("地支", "Earthly Branches",
  "The twelve terrestrial energies (子 to 亥) — each rules a two-hour period, a lunar month, and carries hidden Heavenly Stems (藏干) within. Paired with a Heavenly Stem to form each pillar.");

t("子", "Zi · Rat (Yang Water)",
  "The Rat — peak winter, deepest water. Clever, resourceful, quick-witted. The seed underground in frozen soil, gathering potential for spring.");
t("丑", "Chou · Ox (Yin Earth)",
  "The Ox — deep winter turning toward spring. Steadfast, methodical, patient. The frozen earth holding firm, waiting for the thaw.");
t("寅", "Yin · Tiger (Yang Wood)",
  "The Tiger — early spring's first surge. Bold, competitive, pioneering. New life breaking through frozen ground with explosive energy.");
t("卯", "Mao · Rabbit (Yin Wood)",
  "The Rabbit — peak spring in full bloom. Gentle, diplomatic, graceful. Harmony and growth in all directions; the garden at its most beautiful.");
t("辰", "Chen · Dragon (Yang Earth)",
  "The Dragon — late spring, transitional earth. Charismatic, ambitious, dramatic. The spring storm that clears the air; wet earth holding moisture.");
t("巳", "Si · Snake (Yin Fire)",
  "The Snake — early summer, heat building. Wise, strategic, magnetic. The strategist waiting motionless for the perfect moment to strike.");
t("午", "Wu · Horse (Yang Fire)",
  "The Horse — peak summer at full gallop. Energetic, free-spirited, passionate. The noonday sun; life at maximum intensity and movement.");
t("未", "Wei · Goat (Yin Earth)",
  "The Goat — late summer, the harvest ripening. Creative, gentle, peace-loving. Quiet abundance; the earth dried by summer, ready for gathering.");
t("申", "Shen · Monkey (Yang Metal)",
  "The Monkey — early autumn's first crispness. Clever, inventive, witty. The trickster who solves problems with creativity rather than force.");
t("酉", "You · Rooster (Yin Metal)",
  "The Rooster — peak autumn, harvest complete. Precise, organized, confident. The craftsman perfecting their art; metal refined to its purest form.");
t("戌", "Xu · Dog (Yang Earth)",
  "The Dog — late autumn preparing for winter. Loyal, protective, just. The guardian standing watch as the year winds down toward darkness.");
t("亥", "Hai · Pig (Yin Water)",
  "The Pig — early winter, the feast before the freeze. Generous, warm, sensual. Deep water holding the promise of the cycle's renewal.");

/* ═══════════════════════════════════════════════════════════════
   FIVE ELEMENTS (五行)
   ═══════════════════════════════════════════════════════════════ */

t("五行", "Five Elements / Five Phases",
  "Wood, Fire, Earth, Metal, Water — not literal substances but five modes of energy (气) that generate and control each other in cycles. The fundamental framework of all Chinese metaphysics.");

t("木", "Wood",
  "The energy of spring — upward growth, expansion, creativity, new beginnings. Western analogy: the entrepreneur's drive, a seedling pushing through soil.");
t("火", "Fire",
  "The energy of summer — passion, transformation, illumination, peak expression. Western analogy: the performer, the catalyst, the life of the gathering.");
t("土", "Earth",
  "The energy of late summer / seasonal transitions — stability, grounding, nurturing, center. Western analogy: the mediator, the gardener, the reliable anchor.");
t("金", "Metal",
  "The energy of autumn — precision, structure, clarity, letting go. Western analogy: the judge, the surgeon, the minimalist who keeps only what matters.");
t("水", "Water",
  "The energy of winter — wisdom, adaptability, introspection, deep flow. Western analogy: the philosopher, the strategist, the deep listener.");

// Generating (生) and Overcoming (克) cycles
t("生", "Generating Cycle (Sheng)",
  "The nourishing sequence: Wood feeds Fire → Fire creates Earth (ash) → Earth bears Metal → Metal collects Water (condensation) → Water nourishes Wood. Like a mother nurturing a child.");
t("克", "Overcoming Cycle (Ke)",
  "The controlling sequence: Metal cuts Wood → Wood penetrates Earth → Earth dams Water → Water extinguishes Fire → Fire melts Metal. Not destruction — restraint that maintains balance. Like a referee enforcing fair play.");

/* ═══════════════════════════════════════════════════════════════
   TEN GODS (十神) — Joey Yap standard terminology
   ═══════════════════════════════════════════════════════════════ */

t("十神", "Ten Gods / Ten Spirits",
  "Ten relationship types between the Day Stem and every other stem in the chart. Five pairs, each split into Direct (same polarity) and Indirect (opposite polarity). The core analytical framework of Ba Zi. Source: Joey Yap, \"The Ten Gods\" (2010).");

t("比肩", "Friend",
  "Same element, same polarity as your Day Master. Siblings, colleagues, peers, competitors. Represents your equals — those who share your journey. Category: Friend Stars (比劫).");
t("劫财", "Rob Wealth",
  "Same element, opposite polarity. Competition, ambition, the drive to outdo others. Can represent financial loss through peers, but also the fire of healthy rivalry. Category: Friend Stars (比劫).");
t("食神", "Eating God",
  "Output element, same polarity. Gentle creativity, artistic talent, enjoyment of life's pleasures. The easy-going producer who creates for the joy of it. One of the four auspicious gods. Category: Output Stars (食伤).");
t("伤官", "Hurting Officer",
  "Output element, opposite polarity. Unconventional genius, rebellion against authority, sharp insight that challenges norms. Named because it directly 'hurts' the Direct Officer (正官). Can be brilliant or destructive — needs proper channeling. Category: Output Stars (食伤).");
t("正财", "Direct Wealth",
  "Wealth element, same polarity. Earned income, steady salary, assets built through sustained effort. The craftsman's steady hand earning a living through diligence. Category: Wealth Stars (财星).");
t("偏财", "Indirect Wealth",
  "Wealth element, opposite polarity. Windfall, speculation, business profit, surprise income. The entrepreneur's instinct for opportunity. Can bring sudden gain or loss. Category: Wealth Stars (财星).");
t("正官", "Direct Officer",
  "Authority element, same polarity. Law, order, discipline, reputation, your boss or supervisor. The fair judge who sets structure and maintains standards. One of the four auspicious gods. Category: Authority Stars (官杀).");
t("七杀", "Seven Killings",
  "Authority element, opposite polarity. Intense pressure, crisis, competitive drive, the drill sergeant who forges you through adversity. Powerful but potentially destructive — the fire that tempers steel. Category: Authority Stars (官杀).");
t("正印", "Direct Resource",
  "Resource element, same polarity. Nurturing knowledge, mentors, teachers, mother figures, books and learning. The wise teacher who supports your growth unconditionally. One of the four auspicious gods. Category: Resource Stars (印星).");
t("偏印", "Indirect Resource",
  "Resource element, opposite polarity. Unconventional wisdom, intuition, spirituality, the outsider's perspective. Can indicate stepmother or unusual mentor. Called 'Owl' (枭神) when it devours the Eating God. Category: Resource Stars (印星).");

/* ═══════════════════════════════════════════════════════════════
   NA YIN (纳音) — The 30 Melodic Elements
   Based on the ancient Chinese pentatonic scale (五音) mapped
   to the 60 Sexagenary Cycle pairs. Each pair shares one Na Yin.
   ═══════════════════════════════════════════════════════════════ */

t("纳音", "Na Yin · Melodic Elements",
  "The 'absorbed sound' of each pillar — a poetic elemental quality derived from combining the Heavenly Stem, Earthly Branch, and ancient Chinese musical tones (宫商角徵羽). 30 unique descriptions across the 60 stem-branch pairs. Adds nuance to the main element reading.");

t("海中金", "Gold in the Sea",
  "Treasure hidden beneath the waves — value not yet discovered. Like sunken gold: immense potential waiting to be found and brought to the surface.");
t("炉中火", "Fire in the Furnace",
  "Contained, purposeful fire — like a forge burning with intention. Intense heat channeled toward transformation. Disciplined passion with a goal.");
t("大林木", "Large Forest Wood",
  "Vast woodland — collective strength, deep interconnected roots. Not a lone tree but an ecosystem. Community, tradition, slow and steady collective growth.");
t("路旁土", "Roadside Earth",
  "Humble earth supporting travel and connection. Like the soil beneath roads — unseen but essential. Service, quiet reliability, the infrastructure of life.");
t("剑锋金", "Sword Edge Gold",
  "Sharp, decisive metal — like a blade's cutting edge. Precision that parts confusion. Incisive judgment, courage to make the clean cut when needed.");
t("山头火", "Mountain Top Fire",
  "Fire visible from afar — like a beacon on a peak. Radiant, attention-grabbing. The signal fire that draws people toward you. Charisma that can't be hidden.");
t("涧下水", "Stream Water",
  "Clear water flowing through a mountain ravine — pure, purposeful, cutting its own path through rock. Quiet determination and clarity of direction.");
t("城头土", "City Wall Earth",
  "Solid, protective earth — like ancient city fortifications. Built to last, guarding what matters. Defensive strength, reliability, the wall that shelters a community.");
t("白蜡金", "White Wax Metal",
  "Refined metal shaped through careful process — like lost-wax casting. Malleable potential that hardens into enduring form. Craftsmanship, patience in becoming.");
t("杨柳木", "Willow Wood",
  "Flexible, graceful wood — like a willow bending in wind. Resilient through adaptation, not resistance. Charm, grace, survival through flexibility.");
t("泉中水", "Spring Water",
  "Fresh water welling up from an underground source — pure, renewing, self-replenishing. Inner resources that never run dry. Quiet vitality.");
t("屋上土", "Roof Earth",
  "Earth that shelters from above — like roof tiles protecting a home. Quiet guardianship, the protector who works behind the scenes.");
t("霹雳火", "Thunderbolt Fire",
  "Sudden, explosive fire — like lightning splitting the sky. Dramatic breakthroughs, flash-of-genius moments, the catalytic event that changes everything in an instant.");
t("松柏木", "Pine and Cypress Wood",
  "Evergreen wood — enduring through all seasons. Resilience and constancy. Like pines standing green through winter snow: quiet dignity that outlasts circumstance.");
t("长流水", "Long Flowing Water",
  "Water that never stops flowing — steady persistence across great distances. Like a river crossing continents. Endurance, long-term dedication, inexhaustible momentum.");
t("沙中金", "Gold in the Sand",
  "Metal particles mixed with sand — value requiring patient extraction. Like gold panning: the reward comes to those who sift carefully. Discerning eye finds treasure.");
t("山下火", "Fire at the Mountain Foot",
  "Hidden fire — like geothermal heat beneath rock. Quiet power building below the surface. Intensity that isn't immediately visible but transforms from within.");
t("平地木", "Flatland Wood",
  "Wood growing on open level ground — unobstructed, visible, straightforward. Accessible growth without hidden agendas. The tree standing alone in the meadow.");
t("壁上土", "Wall Earth",
  "Earth forming vertical surfaces — boundaries and definition. Like painted walls that delineate space. Structure, limits, the container that gives shape to life.");
t("金箔金", "Gold Foil",
  "Gold beaten into gossamer sheets — exquisite, precious, decorative. Thin but brilliant. Refinement, surface beauty, the art of presentation and adornment.");
t("覆灯火", "Lamp Fire",
  "Gentle, guiding fire — like a lantern in darkness. A light for others rather than oneself. Wisdom shared humbly; illumination that serves without seeking attention.");
t("天河水", "Heavenly River Water",
  "Water of the Milky Way — celestial, vast, luminous. Cosmic perspective, connection to something beyond the earthly. The poet's inspiration, the mystic's vision.");
t("大驿土", "Great Post Earth",
  "Earth of the great relay stations — ancient highways connecting empires. Mediation, communication, the bridge-builder who links distant people and ideas.");
t("钗钏金", "Hairpin Gold",
  "Gold of hairpins and bracelets — personal adornment, intimate value. Beauty worn close to the body. Self-awareness, refinement, the elegance of self-presentation.");
t("桑柘木", "Mulberry Wood",
  "Cultivated wood — like mulberry trees grown for silkworms. Nurturing that enables others' creativity. The quiet enabler behind beautiful things.");
t("大溪水", "Great Stream Water",
  "Broad, flowing water — like a major waterway shaping landscapes. Expansive scope and ambition. The current that carries things forward, broadening as it goes.");
t("沙中土", "Sand Earth",
  "Earth mixed with sand — shifting, adaptable, less solid than pure earth. Terrain that changes with wind and water. Flexibility in foundation; the dune, not the mountain.");
t("天上火", "Fire in the Sky",
  "Celestial fire — like sunlight piercing clouds, or a meteor streaking across heaven. Radiant, far-reaching, transcendent. Vision that extends beyond the immediate world.");
t("石榴木", "Pomegranate Wood",
  "Wood that bears intense fruit — like pomegranates bursting with seeds. Fertility, creative abundance, legacy. The tree that gives richly, each fruit containing multitudes.");
t("大海水", "Great Sea Water",
  "Vast, deep water — like the open ocean. Unfathomable depth, immense capacity. Emotional and intuitive range that can't be measured. The abyss that holds all possibilities.");

/* ═══════════════════════════════════════════════════════════════
   KEY CONCEPTS: Structures, Luck, Patterns
   ═══════════════════════════════════════════════════════════════ */

t("六十甲子", "Sexagenary Cycle / Sixty Jiazi",
  "The complete cycle of 60 unique stem-branch pairs (10 Stems × 12 Branches, LCM = 60). Used for years, months, days, and hours. Each pair has a Na Yin classification.");
t("用神", "Useful God",
  "The most favorable element(s) for a given chart — the key to balance. Identified through chart structure analysis (格局). The element that harmonizes the chart and unlocks its potential. Central concept in Joey Yap's BaZi system.");
t("格局", "Chart Structure",
  "The configuration or pattern of a Ba Zi chart — how the elements and Ten Gods are arranged. Common structures include 'Direct Officer Structure' (正官格), 'Seven Killings Structure' (七杀格), 'Eating God Generating Wealth' (食神生财), etc. Determines the Useful God.");
t("大运", "Luck Pillars / Da Yun",
  "Ten-year luck cycles calculated from the Month Pillar. Each Luck Pillar brings a different elemental emphasis, activating different aspects of your natal chart over time.");
t("流年", "Annual Luck / Liu Nian",
  "The yearly influence — the stem-branch pair of the current year interacting with your natal chart and current Luck Pillar. Defines the themes and timing of each year.");

/* ═══════════════════════════════════════════════════════════════
   RELATED CONCEPTS: Stems, Branches, Qi
   ═══════════════════════════════════════════════════════════════ */

t("干支", "Stems and Branches",
  "The combined system of 10 Heavenly Stems (天干) and 12 Earthly Branches (地支) — the foundation of the Chinese calendar and all destiny analysis.");
t("藏干", "Hidden Stems",
  "Heavenly Stems hidden within each Earthly Branch — typically 1 to 3 per branch. Represent deeper, often unconscious influences. Organized as Main Qi (本气), Middle Qi (中气), and Residual Qi (余气).");
t("本气", "Main Qi",
  "The primary hidden stem within an Earthly Branch — its dominant elemental nature. The overt, conscious expression of that branch's energy.");
t("节气", "Solar Terms (Jie Qi)",
  "The 24 solar terms that divide the Chinese solar year. Critical for Ba Zi: the Month Pillar changes at the solar term boundary (节), not the lunar month. For example, the year changes at 立春 (Beginning of Spring), not Chinese New Year.");
t("立春", "Beginning of Spring (Li Chun)",
  "The first solar term — around February 4. This is the true start of the Chinese solar year for Ba Zi purposes. The Year Pillar changes at this moment, not at Lunar New Year.");
t("时辰", "Two-Hour Period (Shi Chen)",
  "The Chinese hour — each of the 12 Earthly Branches rules a two-hour block. 子时 (Zi hour) = 23:00–01:00, 丑时 (Chou hour) = 01:00–03:00, and so on. Your birth hour determines your Hour Pillar.");
t("空亡", "Emptiness / Void (Kong Wang)",
  "A special condition where a stem-branch pair in the chart is considered 'empty' — its influence is muted or manifests differently. Calculated from the branch of the Day Pillar.");
t("阴阳", "Yin and Yang",
  "The fundamental duality — Yin (阴, receptive, dark, feminine, still) and Yang (阳, active, bright, masculine, moving). Every Heavenly Stem and Earthly Branch carries one polarity. Balance between them is the root of harmony.");

/* ═══════════════════════════════════════════════════════════════
   TOOL & SYSTEM NAMES
   ═══════════════════════════════════════════════════════════════ */

t("八字", "Ba Zi · Eight Characters",
  "The Four Pillars of Destiny — your birth moment encoded as eight Chinese characters (4 Stems + 4 Branches). The foundational system of Chinese destiny analysis, refined by Xu Ziping in the Song Dynasty.");
t("紫微斗数", "Zi Wei Dou Shu · Purple Star Astrology",
  "A detailed astrological system mapping your life across 12 palaces using the North Star (紫微, Polaris) and 100+ auxiliary stars. The most comprehensive Chinese system for life-path analysis.");
t("梅花易数", "Mei Hua Yi Shu · Plum Blossom Divination",
  "An elegant I Ching–based divination method using numbers, dates, and synchronicity to form hexagrams. Attributed to Shao Yong (邵雍) of the Song Dynasty. Quick, intuitive, and deeply philosophical.");
t("奇门遁甲", "Qi Men Dun Jia · Mysterious Door",
  "Ancient Chinese strategic divination using a 3×3 palace grid, 8 Doors, 9 Stars, and 8 Spirits. Used by generals for battlefield tactics and now by executives for timing and competitive strategy.");
t("六爻", "Liu Yao · Six Lines",
  "Coin-based I Ching divination — six lines form a hexagram with changing lines (动爻). Practical decision-making rooted in the Zhou Yi (周易), one of the oldest Chinese classics.");
t("本地计算", "Local Computation",
  "This result was calculated entirely on your device. Your birth data never leaves your computer. No tracking, no server, no data collection.");
t("综合指数", "Composite Score",
  "A rough numerical summary (0–100) combining element balance, chart harmony, and pillar relationships. High scores suggest natural balance. NOT a 'good person / bad person' judgment.");

/* ═══════════════════════════════════════════════════════════════
   COMMON TOOL-AGNOSTIC TERMS
   ═══════════════════════════════════════════════════════════════ */

t("上卦", "Upper Trigram",
  "The top trigram in a hexagram — represents the external situation, the other party, or the future.");
t("下卦", "Lower Trigram",
  "The bottom trigram in a hexagram — represents your internal state, yourself, or the present.");
t("动爻", "Changing Line",
  "The line in a hexagram that is transforming (old yin → young yang or old yang → young yin). The pivot point of change — the specific dynamic that will shift.");
t("断语", "Hexagram Judgment",
  "A concise interpretation of your hexagram — the distilled insight relevant to your specific question.");
t("起卦", "Casting the Hexagram",
  "The act of generating a hexagram — using numbers, coins, or time to receive a divination response from the I Ching.");
t("运势", "Fortune / Luck Cycle",
  "The flow of timing and circumstances — how the annual energies interact with your personal chart. More about rhythm and timing than fixed 'fate.'");

/* ═══════════════════════════════════════════════════════════════
   TOKENIZATION ENGINE
   ═══════════════════════════════════════════════════════════════ */

/** All known Chinese terms sorted by length (longest first) for greedy tokenization. */
const sortedTerms = Object.keys(terms).sort((a, b) => b.length - a.length);

/** Look up a term's dictionary entry. Returns null for unknown terms. */
export function lookupTerm(term: string): TermEntry | null {
  return terms[term] ?? null;
}

/** Get all known terms sorted longest-first (for tokenization). */
export function getKnownTerms(): string[] {
  return sortedTerms;
}

/** Auto-detect all known terms in a text string, longest match first. */
export function tokenizeTerms(text: string): Array<{ text: string; entry: TermEntry | null }> {
  const result: Array<{ text: string; entry: TermEntry | null }> = [];
  let pos = 0;

  while (pos < text.length) {
    let matched = false;
    for (const term of sortedTerms) {
      if (text.startsWith(term, pos)) {
        result.push({ text: term, entry: terms[term] });
        pos += term.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result.push({ text: text[pos], entry: null });
      pos += 1;
    }
  }

  return result;
}
