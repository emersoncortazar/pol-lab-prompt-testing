import { useState, useCallback, useRef } from "react";

// ─── Persona Data ────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    id: "omar",
    name: "Omar Khan",
    education: "High school diploma, trade school",
    occupation: "Apprentice electrician",
    stance: "Trade skills are undervalued; college is good for some but not all",
    view: "Creates a knowledge class that looks down on blue-collar work",
    style: "Practical, skeptical of book-learning, proud, friendly but direct",
    voice: "Straight-talking, uses trade jargon casually, no fancy words",
  },
  {
    id: "chloe",
    name: "Chloe Delaney",
    education: "Bachelor's Sociology, working on Master's",
    occupation: "Graduate teaching assistant",
    stance: "Believes in college's potential but acutely aware of structural flaws",
    view: "Necessary but deeply unequal institution that reproduces social hierarchies",
    style: "Thoughtful, sometimes pessimistic, data-oriented but emotionally engaged",
    voice: "Precise language, references studies, formal but not stiff",
  },
  {
    id: "finch",
    name: 'Marcus "Finch" Finchley',
    education: "Some college, dropped out",
    occupation: "Freelance web designer & digital marketer",
    stance: "College is an outdated model for creative/tech fields",
    view: "Slow-moving gatekeeper that holds people back in fast-moving industries",
    style: "Optimistic, entrepreneurial, skeptical of traditional paths",
    voice: "Fast-paced, internet slang and business jargon, very conversational",
  },
  {
    id: "anya",
    name: "Dr. Anya Petrova",
    education: "PhD in Molecular Biology",
    occupation: "Tenure-track professor",
    stance: "Primary engine for research, frustrated by administrative bloat",
    view: "Essential for training scientists, but public support is waning",
    style: "Passionate, weary of academic politics, cares about students",
    voice: "Clear, explanatory, can get technical, occasional dry sarcasm",
  },
  {
    id: "javier",
    name: "Javier Ruiz",
    education: "Associate's Degree in Nursing (ADN)",
    occupation: "Registered Nurse, urban ER",
    stance: "Applied training was valuable; 4-year degrees unnecessary for many healthcare jobs",
    view: "Creates credential bottleneck keeping good people out of high-demand fields",
    style: "Compassionate but no-nonsense, grounded, team-oriented",
    voice: "Direct, uses medical shorthand, empathetic, doesn't mince words",
  },
  {
    id: "priya",
    name: "Priya Sharma",
    education: "Bachelor's in CS, top-tier university",
    occupation: "Software engineer, major tech company",
    stance: "Fantastic launching pad, but recognizes privilege; knows great coders who never went",
    view: "Powerful but expensive signaling tool that opens corporate doors",
    style: "Analytical, success-oriented, aware of good fortune, enjoys mentoring",
    voice: "Clear, structured, mixes technical terms with casual reflection",
  },
  {
    id: "leo",
    name: "Leo Chen",
    education: "High school senior",
    occupation: "Student, part-time retail",
    stance: "Necessary step for climate work, but anxious about debt",
    view: "Hopeful it can be part of the solution to big global problems",
    style: "Idealistic, stressed, online-native",
    voice: "Earnest concern mixed with Gen-Z casualness, uses 'like,' questions things",
  },
  {
    id: "dana",
    name: "Dana Wozniak",
    education: "GED, online certifications",
    occupation: "IT support specialist",
    stance: "Completely unnecessary for her field if you're willing to self-learn",
    view: "A class marker that keeps smart low-income people out of good jobs",
    style: "Self-made, proud, a bit defensive, helpful and thorough",
    voice: "Practical, plain-spoken, slight tech-support energy",
  },
  {
    id: "malcolm",
    name: "Professor Malcolm Thorne",
    education: "PhD in History (retired professor)",
    occupation: "Retired college professor",
    stance: "Liberal arts model is foundational for critical citizenship",
    view: "Cornerstone of informed democracy, under threat from commercial/political pressures",
    style: "Erudite, wistful, patronizing at times, deeply passionate about ideas",
    voice: "Formal, complex sentences, quotes literature and history freely, lecture-like",
  },
  {
    id: "rohan",
    name: "Rohan Mehta",
    education: "Bachelor's in Business Administration",
    occupation: "Small business owner (coffee shop, rental properties)",
    stance: "Useful for networking/basics, but real-world experience built his business",
    view: "Good for professional middle class, but overpriced for what you get",
    style: "Pragmatic, hustler-mentality, people-person, bottom-line focused",
    voice: "Confident, sales/business metaphors, talks ROI, friendly but goal-oriented",
  },
  {
    id: "bethany",
    name: "Bethany Greene",
    education: "Master's in Social Work (MSW)",
    occupation: "Clinical social worker",
    stance: "Necessary for licensure but debt-to-income ratio is brutal",
    view: "Trains helping professions but is itself part of the system it critiques",
    style: "Empathic, weary but dedicated, advocate-oriented",
    voice: "Caring tone, uses social-work terms, frames things in terms of impact",
  },
  {
    id: "dez",
    name: 'Derek "Dez" Wallace',
    education: "GED in military, now using GI Bill",
    occupation: "Veteran, mechanic, part-time community college",
    stance: "A second chance and way to translate skills; respects it without romanticizing",
    view: "Good for vets/non-traditional students, but culture can be alienating",
    style: "Disciplined, humble, observant, dry humor",
    voice: "Concise, military-influenced ('copy that'), doesn't waste words",
  },
  {
    id: "isabella",
    name: "Isabella Rossi",
    education: "BFA in Studio Art",
    occupation: "Freelance illustrator and art teacher",
    stance: "Mixed bag—developed technique/connections, but financial burden is crushing",
    view: "Preserves cultural techniques, but often a luxury good for the wealthy",
    style: "Creative, financially stressed, cynical about art market, passionate",
    voice: "Expressive, art metaphors, switches between excited and frustrated",
  },
  {
    id: "kenji",
    name: "Kenji Tanaka",
    education: "Bachelor's Mechanical Engineering, MBA",
    occupation: "Mid-level manager, automotive manufacturing",
    stance: "Necessary credentials; MBA was more about networking than learning",
    view: "Pipeline for corporate talent, increasingly pay-to-play",
    style: "Corporate, efficient, focused on processes and outcomes",
    voice: "Jargon-heavy ('synergies', 'deliverables'), measured, prefers data",
  },
  {
    id: "morgan",
    name: "Morgan Lee",
    education: "College freshman",
    occupation: "Student",
    stance: "It's what you make of it; worried about picking wrong major",
    view: "Mostly sees it as a personal journey, hasn't thought broadly yet",
    style: "Eager, anxious, open-minded, easily influenced by new ideas",
    voice: "Youthful, lots of questions and uncertainty, current slang",
  },
  {
    id: "walter",
    name: "Walter Brennan",
    education: "High school, union apprenticeship",
    occupation: "Journeyman pipefitter, union steward",
    stance: "A different path; union training was free and he earns more than many grads",
    view: "Pushed as only respectable path, which devalues skilled trades",
    style: "Proud union man, skeptical of elites, loyal, strong sense of fairness",
    voice: "Blunt, sometimes gruff, union and trade terminology",
  },
  {
    id: "sanjay",
    name: "Dr. Sanjay Rao",
    education: "MD, residency Internal Medicine",
    occupation: "Attending physician, public hospital",
    stance: "Absolute requirement for his field, but the system is brutal and expensive",
    view: "Produces needed doctors but pipeline is broken, contributes to healthcare inequities",
    style: "Professionally calm, inwardly stressed, exhausted by bureaucracy",
    voice: "Clinical when discussing medicine, exasperated about the system",
  },
  {
    id: "tasha",
    name: "Tasha Williams",
    education: "Some community college, no degree",
    occupation: "Single mother, two service jobs",
    stance: "A dream that feels out of reach; can't make time or money work",
    view: "A ladder that was pulled up after the previous generation",
    style: "Resilient, tired, pragmatic to the point of pessimism, fierce love for kids",
    voice: "Worn-out, plain-spoken, short sentences, immediate obstacles",
  },
  {
    id: "elijah",
    name: "Elijah Jones",
    education: "Coding bootcamp",
    occupation: "Career-changer, previously retail management",
    stance: "Bootcamp was only realistic ticket into tech; traditional college was closed door",
    view: "A gatekeeper being bypassed by new models—good for diversity in tech",
    style: "Driven, impatient with old systems, rooting for underdog, learning fast",
    voice: "Energetic, tech and startup lingo, focused on outcomes and 'breaking in'",
  },
  {
    id: "grace",
    name: "Grace Park",
    education: "Bachelor's Education, Master's Educational Leadership",
    occupation: "High school principal",
    stance: "Expected next step for high achievers, but worries about pressure and cost",
    view: "Mixed blessing—uplifts individuals but creates unhealthy 'college-at-all-costs' mentality",
    style: "Nurturing but authoritative, sees big picture, balancing idealism with budgets",
    voice: "Warm but professional, 'we' statements, educator buzzwords naturally",
  },
];

function buildPrompt(persona, topic) {
  return `You are writing as one user in a discussion thread on an experimental social media platform.

PERSONA
Name: {${persona.name}}
Education: {${persona.education}}
Occupation: {${persona.occupation}}
Core stance on higher education: {${persona.stance}}
View of higher education's social impact: {${persona.view}}
Personality/style: {${persona.style}}
Typical way of speaking: {${persona.voice}}

--------------------------------------------------
HARD FORMAT RULES (non-negotiable)
--------------------------------------------------

- No emojis. No hashtags. No bullet points.
- No dashes or em dashes.
- Use language natural to your age and background.
- Do NOT start with "I think" or "I believe."
- Do NOT end with a tidy conclusion or summary sentence.
- NEVER use: "accountability," "measurable," "ensure," "furthermore," "additionally," "it's important that," "period," "real human consequences," "consider," "obligation."
- No parallel structure. Real people don't write in threes.
- No dashes or em dashes anywhere.

--------------------------------------------------
WHAT BAD LOOKS LIKE (never write like this)
--------------------------------------------------

BAD: "Local police should cooperate with ICE. Public safety matters and federal law must be respected."
WHY: Reads like a position paper. Too clean, too complete, no personality.

BAD: "Require cooperation but make it measurable. Have reporting, audits, and clear protocols so resources aren't wasted."
WHY: Nobody talks like this online. Parallel structure, corporate vocabulary.

BAD: "If ICE is acting lawfully local police have an obligation to work with them. We follow the law and victims deserve protection. Also proper training has to happen."
WHY: Three sentences, three points, tidy. That's an essay, not a comment.

BAD: "When police hand over info to ICE families get split up and kids suffer, real human consequences."
WHY: "Real human consequences" is AI filler. Sounds like a talking point, not a person.

--------------------------------------------------
WHAT GOOD LOOKS LIKE (aim for this energy)
--------------------------------------------------

GOOD: "Yes. End of discussion."
GOOD: "nobody's even thought about what this costs locally lol"
GOOD: "I mean if someone's here illegally that's kind of already the problem right"
GOOD: "sure make local cops into deportation agents and then wonder why nobody calls 911 anymore"
GOOD: "I grew up watching cops use any excuse to mess with people in my neighborhood so I don't know, this doesn't feel simple to me"
GOOD: "Cooperate fine but who's tracking any of this, genuinely asking"
GOOD: "my coworker has been here 15 years and her kids are citizens and this stuff keeps her up at night, it's not abstract"

THREAD CONTEXT
Post:
Title: ${topic.title || topic}
"${topic.body || topic}"

TASK
Write 5 original social media comments for this thread.

WRITING GOAL
Write the way this person would naturally comment on a social platform, not the way an assistant would answer a question.

GUIDELINES
If the most recent message is clearly directed at this user, reply to it.
Otherwise, write an independent comment responding to the broader discussion.
Use the persona only when relevant.
Do not force biography into the comment.
Make the comment sound casual, reactive, and situated in a feed.
Do not mention the persona, prompt, or instructions.
Do not copy the style examples.
Do not repeat a prior memory item.
Do not use hashtags, emojis, or overly abbreviated language.

LENGTH
Write naturally. Aim to be in the word count of a traditional social media comment.

OUTPUT
Return only the 5 comments, numbered 1-5, nothing else.`
}

// ─── Cosine Similarity (TF-IDF style) ────────────────────────────────────────
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function buildTFIDF(docs) {
  const N = docs.length;
  const df = {};
  const tfs = docs.map((doc) => {
    const tokens = tokenize(doc);
    const freq = {};
    tokens.forEach((t) => (freq[t] = (freq[t] || 0) + 1));
    Object.keys(freq).forEach((t) => {
      freq[t] /= tokens.length;
      df[t] = (df[t] || 0) + 1;
    });
    return freq;
  });
  const idf = {};
  Object.keys(df).forEach((t) => (idf[t] = Math.log(N / df[t]) + 1));
  return { tfs, idf };
}

function tfidfVector(tf, idf) {
  const vec = {};
  Object.keys(tf).forEach((t) => (vec[t] = tf[t] * (idf[t] || 1)));
  return vec;
}

function cosineSim(a, b) {
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
  let dot = 0, ma = 0, mb = 0;
  allKeys.forEach((k) => {
    const av = a[k] || 0, bv = b[k] || 0;
    dot += av * bv;
    ma += av * av;
    mb += bv * bv;
  });
  if (!ma || !mb) return 0;
  return dot / (Math.sqrt(ma) * Math.sqrt(mb));
}

function findTopMatches(syntheticComment, realComments, topN = 5) {
  const allDocs = [syntheticComment, ...realComments];
  const { tfs, idf } = buildTFIDF(allDocs);
  const synVec = tfidfVector(tfs[0], idf);
  const scored = realComments.map((text, i) => ({
    text,
    score: cosineSim(synVec, tfidfVector(tfs[i + 1], idf)),
  }));
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, topN);
  const avg = scored.reduce((s, x) => s + x.score, 0) / scored.length;
  return { top, avgScore: avg };
}

// ─── CSV Parser ───────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  // Try tab-separated first (Sentiment140 format), else comma
  const delimiter = lines[0].includes("\t") ? "\t" : ",";
  const headers = lines[0].split(delimiter).map((h) => h.trim().replace(/^"|"$/g, "").toLowerCase());
  const commentIdx = headers.findIndex((h) => h.includes("comment") || h.includes("text") || h.includes("tweet"));
  if (commentIdx === -1) {
    // No header row — assume Sentiment140: col 5 is text (0-indexed)
    return lines
      .map((l) => l.split(delimiter)[5]?.trim().replace(/^"|"$/g, ""))
      .filter(Boolean)
      .slice(0, 5000);
  }
  return lines
    .slice(1)
    .map((l) => l.split(delimiter)[commentIdx]?.trim().replace(/^"|"$/g, ""))
    .filter(Boolean)
    .slice(0, 5000);
}

// ─── API Call (OpenRouter) ────────────────────────────────────────────────────
async function generateComment(prompt, apiKey, model) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://polarization-lab.duke.edu",
      "X-Title": "Duke Polarization Lab",
    },
    body: JSON.stringify({
      model: model || "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "API error");
  return data.choices[0].message.content.trim();
}

// ─── Score Badge ──────────────────────────────────────────────────────────────
function ScoreBadge({ score }) {
  const pct = Math.round(score * 100);
  const color =
    pct >= 60 ? "#22c55e" : pct >= 35 ? "#f59e0b" : "#ef4444";
  return (
    <span
      style={{
        background: color + "22",
        color: color,
        border: `1px solid ${color}55`,
        borderRadius: 6,
        padding: "2px 8px",
        fontSize: 12,
        fontFamily: "monospace",
        fontWeight: 700,
      }}
    >
      {pct}%
    </span>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [topic, setTopic] = useState({
    title: "Unfortunately, ICE is necessary.",
    body: "I've noticed that colleges seem to attract people with strong beliefs. It could be political, social, or cultural, but either way it seems like campuses are mini versions of big societal debates. It seems like people just find their group and they feed off each other, but other times it feels like you could really learn from such polarizing people.",
  });
  const [selectedPersonas, setSelectedPersonas] = useState(["omar", "chloe", "finch"]);
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("openai/gpt-4o-mini");
  const [realComments, setRealComments] = useState([]);
  const [datasetName, setDatasetName] = useState("");
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [tab, setTab] = useState("setup"); // setup | results | compare
  const fileRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const parsed = parseCSV(ev.target.result);
      setRealComments(parsed);
      setDatasetName(`${file.name} (${parsed.length.toLocaleString()} comments)`);
    };
    reader.readAsText(file);
  };

  const togglePersona = (id) =>
    setSelectedPersonas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleStrategy = (id) =>
    setSelectedStrategies((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const runPipeline = useCallback(async () => {
    if (!topic.trim() || !apiKey.trim()) return;
    const personas = PERSONAS.filter((p) => selectedPersonas.includes(p.id));
    setProgress({ done: 0, total: personas.length });
    setResults([]);
    setRunning(true);
    setTab("results");

    const newResults = [];
    for (let i = 0; i < personas.length; i++) {
      const persona = personas[i];
      try {
        const prompt = buildPrompt(persona, topic);
        const comment = await generateComment(prompt, apiKey, model);
        let matchData = null;
        if (realComments.length > 0) {
          matchData = findTopMatches(comment, realComments, 5);
        }
        newResults.push({ persona, prompt, comment, matchData, error: null });
      } catch (err) {
        newResults.push({ persona, prompt: "", comment: "", matchData: null, error: err.message });
      }
      setProgress({ done: i + 1, total: personas.length });
      setResults([...newResults]);
    }
    setRunning(false);
  }, [topic, selectedPersonas, apiKey, model, realComments]);

  // (no strategy comparison needed — single template)

  // ─── Styles ────────────────────────────────────────────────────────────────
  const S = {
    root: {
      minHeight: "100vh",
      background: "#0d0f14",
      color: "#e8eaf0",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      fontSize: 14,
    },
    header: {
      borderBottom: "1px solid #1e2230",
      padding: "18px 28px",
      display: "flex",
      alignItems: "center",
      gap: 14,
    },
    logo: {
      width: 36,
      height: 36,
      background: "linear-gradient(135deg, #6366f1, #06b6d4)",
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      flexShrink: 0,
    },
    title: { fontWeight: 700, fontSize: 17, letterSpacing: -0.3 },
    subtitle: { color: "#6b7280", fontSize: 12, marginTop: 2 },
    tabs: {
      display: "flex",
      gap: 4,
      padding: "10px 28px 0",
      borderBottom: "1px solid #1e2230",
    },
    tabBtn: (active) => ({
      padding: "8px 16px",
      borderRadius: "8px 8px 0 0",
      border: "none",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      background: active ? "#1a1e2e" : "transparent",
      color: active ? "#a5b4fc" : "#6b7280",
      borderBottom: active ? "2px solid #6366f1" : "2px solid transparent",
      transition: "all 0.15s",
    }),
    body: { padding: "24px 28px", maxWidth: 1100, margin: "0 auto" },
    card: {
      background: "#131620",
      border: "1px solid #1e2230",
      borderRadius: 12,
      padding: "20px 22px",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1.2,
      color: "#6366f1",
      textTransform: "uppercase",
      marginBottom: 12,
    },
    input: {
      width: "100%",
      background: "#0d0f14",
      border: "1px solid #2a2f45",
      borderRadius: 8,
      color: "#e8eaf0",
      padding: "10px 14px",
      fontSize: 14,
      outline: "none",
      boxSizing: "border-box",
    },
    pill: (active) => ({
      padding: "5px 12px",
      borderRadius: 20,
      border: `1px solid ${active ? "#6366f1" : "#2a2f45"}`,
      background: active ? "#6366f115" : "transparent",
      color: active ? "#a5b4fc" : "#9ca3af",
      fontSize: 12,
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "all 0.15s",
    }),
    runBtn: {
      background: running
        ? "#1e2230"
        : "linear-gradient(135deg, #6366f1, #06b6d4)",
      color: running ? "#6b7280" : "white",
      border: "none",
      borderRadius: 10,
      padding: "12px 28px",
      fontSize: 14,
      fontWeight: 700,
      cursor: running ? "not-allowed" : "pointer",
      letterSpacing: 0.3,
      transition: "all 0.2s",
    },
    resultCard: {
      background: "#131620",
      border: "1px solid #1e2230",
      borderRadius: 10,
      padding: "16px 18px",
      marginBottom: 12,
    },
    commentBubble: {
      background: "#0d0f14",
      border: "1px solid #2a2f45",
      borderRadius: 8,
      padding: "10px 14px",
      fontStyle: "italic",
      color: "#c4cad8",
      lineHeight: 1.6,
      marginTop: 8,
    },
    matchRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      padding: "6px 0",
      borderBottom: "1px solid #1a1d28",
    },
    uploadBtn: {
      background: "#1a1e2e",
      border: "1px solid #2a2f45",
      color: "#9ca3af",
      borderRadius: 8,
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: 13,
    },
    progressBar: (pct) => ({
      height: 4,
      background: `linear-gradient(90deg, #6366f1 ${pct}%, #1e2230 ${pct}%)`,
      borderRadius: 4,
      marginTop: 8,
      transition: "background 0.3s",
    }),
    grid2: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
    },
    label: { color: "#6b7280", fontSize: 11, fontWeight: 600, marginBottom: 4 },
    chip: (color) => ({
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 600,
      background: color + "18",
      color: color,
      border: `1px solid ${color}33`,
    }),
  };

  const pct = progress.total > 0 ? (progress.done / progress.total) * 100 : 0;

  return (
    <div style={S.root}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.logo}>🧪</div>
        <div>
          <div style={S.title}>Synthetic Comment Lab</div>
          <div style={S.subtitle}>Duke Polarization Lab · Prompt Strategy Evaluator</div>
        </div>
        {running && (
          <div style={{ marginLeft: "auto", color: "#6b7280", fontSize: 12 }}>
            Generating {progress.done}/{progress.total} comments…
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={S.tabs}>
        {[["setup", "⚙️ Setup"], ["results", "💬 Results"]].map(
          ([key, label]) => (
            <button key={key} style={S.tabBtn(tab === key)} onClick={() => setTab(key)}>
              {label}
              {key === "results" && results.length > 0 && (
                <span
                  style={{
                    marginLeft: 6,
                    background: "#6366f120",
                    color: "#6366f1",
                    borderRadius: 10,
                    padding: "1px 7px",
                    fontSize: 11,
                  }}
                >
                  {results.length}
                </span>
              )}
            </button>
          )
        )}
      </div>

      <div style={S.body}>
        {/* ─── SETUP TAB ─── */}
        {tab === "setup" && (
          <div>
            {/* Topic */}
            <div style={S.card}>
              <div style={S.sectionTitle}>Thread Post</div>
              <div style={S.label}>Title</div>
              <input
                style={{ ...S.input, marginBottom: 10 }}
                value={topic.title}
                onChange={(e) => setTopic((t) => ({ ...t, title: e.target.value }))}
                placeholder="Post title…"
              />
              <div style={S.label}>Body</div>
              <textarea
                style={{ ...S.input, minHeight: 90, resize: "vertical", lineHeight: 1.6 }}
                value={topic.body}
                onChange={(e) => setTopic((t) => ({ ...t, body: e.target.value }))}
                placeholder="Post body text…"
              />
              <div style={{ color: "#6b7280", fontSize: 11, marginTop: 6 }}>
                Each persona will generate 5 comments responding to this thread.
              </div>
            </div>

            {/* Dataset Upload */}
            <div style={S.card}>
              <div style={S.sectionTitle}>Real Comment Dataset (Optional)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv,.tsv,.txt"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <button style={S.uploadBtn} onClick={() => fileRef.current?.click()}>
                  📂 Upload CSV / TSV
                </button>
                {datasetName && (
                  <span style={{ color: "#22c55e", fontSize: 12 }}>✓ {datasetName}</span>
                )}
              </div>
              <div style={{ color: "#6b7280", fontSize: 11, marginTop: 8, lineHeight: 1.6 }}>
                Upload the Sentiment140 dataset or any CSV with a <code style={{ color: "#a5b4fc" }}>comment_text</code> / <code style={{ color: "#a5b4fc" }}>text</code> column.
                Semantic similarity scores will be shown alongside each generated comment.
                Without a dataset, comments are still generated for qualitative review.
              </div>
            </div>

            {/* Persona Selection */}
            <div style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={S.sectionTitle}>Personas ({selectedPersonas.length} selected)</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ ...S.uploadBtn, fontSize: 11, padding: "4px 10px" }} onClick={() => setSelectedPersonas(PERSONAS.map((p) => p.id))}>All</button>
                  <button style={{ ...S.uploadBtn, fontSize: 11, padding: "4px 10px" }} onClick={() => setSelectedPersonas([])}>None</button>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {PERSONAS.map((p) => (
                  <button
                    key={p.id}
                    style={S.pill(selectedPersonas.includes(p.id))}
                    onClick={() => togglePersona(p.id)}
                    title={`${p.occupation} · ${p.stance}`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* API Key */}
            <div style={S.card}>
              <div style={S.sectionTitle}>OpenRouter API Key</div>
              <input
                style={{ ...S.input, fontFamily: "monospace", letterSpacing: 1 }}
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-v1-…"
              />
              <div style={{ color: "#6b7280", fontSize: 11, marginTop: 6 }}>
                Stored in memory only — never saved or sent anywhere except OpenRouter.
              </div>
            </div>

            {/* Model */}
            <div style={S.card}>
              <div style={S.sectionTitle}>Model</div>
              <select
                style={{ ...S.input, cursor: "pointer" }}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="openai/gpt-4o-mini">openai/gpt-4o-mini (fast, cheap)</option>
                <option value="openai/gpt-4o">openai/gpt-4o</option>
                <option value="anthropic/claude-3-haiku">anthropic/claude-3-haiku</option>
                <option value="anthropic/claude-3.5-sonnet">anthropic/claude-3.5-sonnet</option>
                <option value="meta-llama/llama-3.1-8b-instruct">meta-llama/llama-3.1-8b-instruct (free tier)</option>
                <option value="mistralai/mistral-7b-instruct">mistralai/mistral-7b-instruct</option>
              </select>
            </div>

            {/* Run */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
              <button
                style={S.runBtn}
                onClick={runPipeline}
                disabled={running || selectedPersonas.length === 0 || !apiKey.trim() || !topic.title.trim()}
              >
                {running ? "⏳ Running…" : `▶ Generate ${selectedPersonas.length} Comments`}
              </button>
              <div style={{ color: "#6b7280", fontSize: 12 }}>
                {selectedPersonas.length} persona{selectedPersonas.length !== 1 ? "s" : ""} · {model}
              </div>
            </div>

            {running && (
              <div style={{ marginTop: 12 }}>
                <div style={S.progressBar(pct)} />
              </div>
            )}
          </div>
        )}

        {/* ─── RESULTS TAB ─── */}
        {tab === "results" && (
          <div>
            {results.length === 0 && !running ? (
              <div style={{ textAlign: "center", color: "#6b7280", padding: "60px 0" }}>
                No results yet. Configure and run from the Setup tab.
              </div>
            ) : (
              <>
                {running && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: "#6b7280", fontSize: 12 }}>
                      {progress.done} / {progress.total} complete
                    </div>
                    <div style={S.progressBar(pct)} />
                  </div>
                )}
                {results.map((r, i) => (
                  <div key={i} style={S.resultCard}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={S.chip("#6366f1")}>{r.persona.name}</span>
                      <span style={{ color: "#6b7280", fontSize: 11 }}>{r.persona.occupation}</span>
                      {r.matchData && <ScoreBadge score={r.matchData.avgScore} />}
                      {r.error && <span style={S.chip("#ef4444")}>Error</span>}
                    </div>
                    {r.error ? (
                      <div style={{ color: "#ef4444", fontSize: 12 }}>{r.error}</div>
                    ) : (
                      <>
                        <div style={{ marginTop: 8 }}>
                          {r.comment.split(/\n+/).filter(l => l.trim()).map((line, j) => (
                            <div key={j} style={{
                              ...S.commentBubble,
                              marginBottom: 8,
                              display: "flex",
                              gap: 10,
                              alignItems: "flex-start",
                            }}>
                              <span style={{ color: "#6366f1", fontStyle: "normal", fontWeight: 700, flexShrink: 0, fontFamily: "monospace", fontSize: 12 }}>
                                {j + 1}
                              </span>
                              <span>{line.replace(/^\d+[\.\)]\s*/, "")}</span>
                            </div>
                          ))}
                        </div>
                        {r.matchData && r.matchData.top.length > 0 && (
                          <div style={{ marginTop: 12 }}>
                            <div style={{ ...S.label, marginBottom: 6 }}>TOP MATCHING REAL COMMENTS</div>
                            {r.matchData.top.map((m, j) => (
                              <div key={j} style={S.matchRow}>
                                <ScoreBadge score={m.score} />
                                <span style={{ color: "#9ca3af", fontSize: 12, flex: 1, lineHeight: 1.5 }}>
                                  {m.text.slice(0, 180)}{m.text.length > 180 ? "…" : ""}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        <details style={{ marginTop: 10 }}>
                          <summary style={{ color: "#6b7280", fontSize: 11, cursor: "pointer" }}>View prompt</summary>
                          <pre
                            style={{
                              marginTop: 8,
                              background: "#0d0f14",
                              border: "1px solid #1e2230",
                              borderRadius: 6,
                              padding: 10,
                              fontSize: 11,
                              color: "#6b7280",
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                            }}
                          >
                            {r.prompt}
                          </pre>
                        </details>
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
