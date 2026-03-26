import { useState, useCallback, useRef } from "react";

// ─── Persona Data ────────────────────────────────────────────────────────────
const PERSONAS = [
  { id: "omar", name: "Omar Khan", education: "High school diploma, trade school", occupation: "Apprentice electrician", stance: "Trade skills are undervalued; college is good for some but not all", view: "Creates a knowledge class that looks down on blue-collar work", style: "Practical, skeptical of book-learning, proud, friendly but direct", voice: "Straight-talking, uses trade jargon casually, no fancy words" },
  { id: "chloe", name: "Chloe Delaney", education: "Bachelor's Sociology, working on Master's", occupation: "Graduate teaching assistant", stance: "Believes in college's potential but acutely aware of structural flaws", view: "Necessary but deeply unequal institution that reproduces social hierarchies", style: "Thoughtful, sometimes pessimistic, data-oriented but emotionally engaged", voice: "Precise language, references studies, formal but not stiff" },
  { id: "finch", name: 'Marcus "Finch" Finchley', education: "Some college, dropped out", occupation: "Freelance web designer & digital marketer", stance: "College is an outdated model for creative/tech fields", view: "Slow-moving gatekeeper that holds people back in fast-moving industries", style: "Optimistic, entrepreneurial, skeptical of traditional paths", voice: "Fast-paced, internet slang and business jargon, very conversational" },
  { id: "anya", name: "Dr. Anya Petrova", education: "PhD in Molecular Biology", occupation: "Tenure-track professor", stance: "Primary engine for research, frustrated by administrative bloat", view: "Essential for training scientists, but public support is waning", style: "Passionate, weary of academic politics, cares about students", voice: "Clear, explanatory, can get technical, occasional dry sarcasm" },
  { id: "javier", name: "Javier Ruiz", education: "Associate's Degree in Nursing (ADN)", occupation: "Registered Nurse, urban ER", stance: "Applied training was valuable; 4-year degrees unnecessary for many healthcare jobs", view: "Creates credential bottleneck keeping good people out of high-demand fields", style: "Compassionate but no-nonsense, grounded, team-oriented", voice: "Direct, uses medical shorthand, empathetic, doesn't mince words" },
  { id: "priya", name: "Priya Sharma", education: "Bachelor's in CS, top-tier university", occupation: "Software engineer, major tech company", stance: "Fantastic launching pad, but recognizes privilege; knows great coders who never went", view: "Powerful but expensive signaling tool that opens corporate doors", style: "Analytical, success-oriented, aware of good fortune, enjoys mentoring", voice: "Clear, structured, mixes technical terms with casual reflection" },
  { id: "leo", name: "Leo Chen", education: "High school senior", occupation: "Student, part-time retail", stance: "Necessary step for climate work, but anxious about debt", view: "Hopeful it can be part of the solution to big global problems", style: "Idealistic, stressed, online-native", voice: "Earnest concern mixed with Gen-Z casualness, uses 'like,' questions things" },
  { id: "dana", name: "Dana Wozniak", education: "GED, online certifications", occupation: "IT support specialist", stance: "Completely unnecessary for her field if you're willing to self-learn", view: "A class marker that keeps smart low-income people out of good jobs", style: "Self-made, proud, a bit defensive, helpful and thorough", voice: "Practical, plain-spoken, slight tech-support energy" },
  { id: "malcolm", name: "Professor Malcolm Thorne", education: "PhD in History (retired professor)", occupation: "Retired college professor", stance: "Liberal arts model is foundational for critical citizenship", view: "Cornerstone of informed democracy, under threat from commercial/political pressures", style: "Erudite, wistful, patronizing at times, deeply passionate about ideas", voice: "Formal, complex sentences, quotes literature and history freely, lecture-like" },
  { id: "rohan", name: "Rohan Mehta", education: "Bachelor's in Business Administration", occupation: "Small business owner (coffee shop, rental properties)", stance: "Useful for networking/basics, but real-world experience built his business", view: "Good for professional middle class, but overpriced for what you get", style: "Pragmatic, hustler-mentality, people-person, bottom-line focused", voice: "Confident, sales/business metaphors, talks ROI, friendly but goal-oriented" },
  { id: "bethany", name: "Bethany Greene", education: "Master's in Social Work (MSW)", occupation: "Clinical social worker", stance: "Necessary for licensure but debt-to-income ratio is brutal", view: "Trains helping professions but is itself part of the system it critiques", style: "Empathic, weary but dedicated, advocate-oriented", voice: "Caring tone, uses social-work terms, frames things in terms of impact" },
  { id: "dez", name: 'Derek "Dez" Wallace', education: "GED in military, now using GI Bill", occupation: "Veteran, mechanic, part-time community college", stance: "A second chance and way to translate skills; respects it without romanticizing", view: "Good for vets/non-traditional students, but culture can be alienating", style: "Disciplined, humble, observant, dry humor", voice: "Concise, military-influenced ('copy that'), doesn't waste words" },
  { id: "isabella", name: "Isabella Rossi", education: "BFA in Studio Art", occupation: "Freelance illustrator and art teacher", stance: "Mixed bag—developed technique/connections, but financial burden is crushing", view: "Preserves cultural techniques, but often a luxury good for the wealthy", style: "Creative, financially stressed, cynical about art market, passionate", voice: "Expressive, art metaphors, switches between excited and frustrated" },
  { id: "kenji", name: "Kenji Tanaka", education: "Bachelor's Mechanical Engineering, MBA", occupation: "Mid-level manager, automotive manufacturing", stance: "Necessary credentials; MBA was more about networking than learning", view: "Pipeline for corporate talent, increasingly pay-to-play", style: "Corporate, efficient, focused on processes and outcomes", voice: "Jargon-heavy ('synergies', 'deliverables'), measured, prefers data" },
  { id: "morgan", name: "Morgan Lee", education: "College freshman", occupation: "Student", stance: "It's what you make of it; worried about picking wrong major", view: "Mostly sees it as a personal journey, hasn't thought broadly yet", style: "Eager, anxious, open-minded, easily influenced by new ideas", voice: "Youthful, lots of questions and uncertainty, current slang" },
  { id: "walter", name: "Walter Brennan", education: "High school, union apprenticeship", occupation: "Journeyman pipefitter, union steward", stance: "A different path; union training was free and he earns more than many grads", view: "Pushed as only respectable path, which devalues skilled trades", style: "Proud union man, skeptical of elites, loyal, strong sense of fairness", voice: "Blunt, sometimes gruff, union and trade terminology" },
  { id: "sanjay", name: "Dr. Sanjay Rao", education: "MD, residency Internal Medicine", occupation: "Attending physician, public hospital", stance: "Absolute requirement for his field, but the system is brutal and expensive", view: "Produces needed doctors but pipeline is broken, contributes to healthcare inequities", style: "Professionally calm, inwardly stressed, exhausted by bureaucracy", voice: "Clinical when discussing medicine, exasperated about the system" },
  { id: "tasha", name: "Tasha Williams", education: "Some community college, no degree", occupation: "Single mother, two service jobs", stance: "A dream that feels out of reach; can't make time or money work", view: "A ladder that was pulled up after the previous generation", style: "Resilient, tired, pragmatic to the point of pessimism, fierce love for kids", voice: "Worn-out, plain-spoken, short sentences, immediate obstacles" },
  { id: "elijah", name: "Elijah Jones", education: "Coding bootcamp", occupation: "Career-changer, previously retail management", stance: "Bootcamp was only realistic ticket into tech; traditional college was closed door", view: "A gatekeeper being bypassed by new models—good for diversity in tech", style: "Driven, impatient with old systems, rooting for underdog, learning fast", voice: "Energetic, tech and startup lingo, focused on outcomes and 'breaking in'" },
  { id: "grace", name: "Grace Park", education: "Bachelor's Education, Master's Educational Leadership", occupation: "High school principal", stance: "Expected next step for high achievers, but worries about pressure and cost", view: "Mixed blessing—uplifts individuals but creates unhealthy 'college-at-all-costs' mentality", style: "Nurturing but authoritative, sees big picture, balancing idealism with budgets", voice: "Warm but professional, 'we' statements, educator buzzwords naturally" },
];

// ─── AFINN Lexicon ────────────────────────────────────────────────────────────
const AFINN = {
  abuse:-3, abusive:-3, aggressive:-2, anger:-3, angry:-3, annoy:-2, annoyed:-2, annoying:-2,
  appalling:-4, attack:-2, awful:-3, bad:-2, biased:-2, bitter:-2, blame:-2, boring:-1,
  broken:-2, burden:-2, catastrophe:-4, cheat:-2, concern:-1, corrupt:-2, crisis:-3, cruel:-3,
  dangerous:-2, deplorable:-4, despair:-3, despicable:-4, disaster:-3, disgust:-3, disgusting:-4,
  dismiss:-1, distrust:-2, doubt:-1, dreadful:-3, emergency:-2, evil:-3, exhausted:-2, fail:-2,
  failure:-3, fake:-2, false:-2, fear:-2, fraud:-3, frustrated:-2, frustrating:-2, frustration:-2,
  harmful:-2, hate:-3, hopeless:-2, horrible:-3, hurt:-2, injustice:-3, issue:-1, lie:-2,
  lies:-2, liar:-3, loss:-2, manipulate:-2, miserable:-3, mislead:-2, mistake:-1, never:-1,
  no:-1, not:-1, oppression:-3, outrageous:-4, overwhelmed:-2, pain:-2, pathetic:-3, poor:-2,
  problem:-2, racism:-3, racist:-3, regret:-2, reject:-2, sad:-2, scam:-3, scared:-2,
  shameful:-3, stupid:-2, suffering:-2, terrible:-3, threat:-2, toxic:-2, tragedy:-3, unfair:-2,
  unhappy:-2, unnecessary:-2, upset:-2, useless:-3, violence:-3, violent:-3, waste:-2,
  wrong:-2, worried:-2, worry:-2, worse:-2, worst:-3, weak:-1,
  agree:1, amazing:4, appreciate:2, awesome:4, beautiful:3, benefit:2, beneficial:2, best:3,
  better:2, brilliant:3, calm:1, celebrate:2, clear:1, confident:2, decent:1, dedicated:2,
  effective:2, efficient:2, enjoy:2, enthusiastic:3, equality:2, excellent:3, excited:3,
  fair:1, fantastic:4, fine:1, free:1, freedom:2, friendly:2, fun:2, glad:2, good:2,
  grateful:2, great:3, growth:2, happy:3, helpful:2, honest:2, hope:1, hopeful:2,
  improved:2, impressive:3, incredible:3, inspired:2, joy:3, justice:2, kind:2, love:3,
  loyal:2, motivated:2, nice:2, ok:1, okay:1, opportunity:2, outstanding:3, peace:2,
  perfect:3, pleased:2, positive:2, progress:2, proud:2, remarkable:3, right:1, safe:2,
  smart:2, solution:2, success:2, support:1, superb:3, trust:1, useful:2, valuable:2,
  win:2, wise:2, wonderful:3, worthy:2,
};

function afinnScore(text) {
  const words = text.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter(Boolean);
  let sum = 0, hits = 0;
  words.forEach(w => { const s = AFINN[w]; if (s !== undefined) { sum += s; hits++; } });
  if (!hits) return 0;
  return Math.max(-1, Math.min(1, (sum / hits) / 3));
}

// ─── Prompt Builders ──────────────────────────────────────────────────────────
function buildVariantsPrompt(topic) {
  return `Generate 4 different social media posts all about the same topic, each with a different framing or angle. Make them feel like real posts someone might write online.

Topic: ${topic.title}
Context: ${topic.body}

Requirements:
- Each post should be 1-3 sentences
- Use different tones: one neutral/observational, one opinionated, one personal/anecdotal, one provocative
- All should feel authentic and conversational, not academic
- No emojis or hashtags

Return ONLY the 4 posts, numbered 1-4, one per line. Nothing else.`;
}

function buildPrompt(persona, variantPost) {
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

--------------------------------------------------
WHAT BAD LOOKS LIKE (never write like this)
--------------------------------------------------

BAD: "Local police should cooperate with ICE. Public safety matters and federal law must be respected."
WHY: Reads like a position paper. Too clean, too complete, no personality.

BAD: "If ICE is acting lawfully local police have an obligation to work with them. We follow the law and victims deserve protection. Also proper training has to happen."
WHY: Three sentences, three points, tidy. That's an essay, not a comment.

--------------------------------------------------
WHAT GOOD LOOKS LIKE (aim for this energy)
--------------------------------------------------

GOOD: "Yes. End of discussion."
GOOD: "nobody's even thought about what this costs locally lol"
GOOD: "I grew up watching cops use any excuse to mess with people in my neighborhood so I don't know, this doesn't feel simple to me"
GOOD: "Cooperate fine but who's tracking any of this, genuinely asking"
GOOD: "my coworker has been here 15 years and her kids are citizens and this stuff keeps her up at night, it's not abstract"

THREAD CONTEXT
Post:
"${variantPost}"

TASK
Write 1 original social media comment responding to this post.

WRITING GOAL
Write the way this person would naturally comment on a social platform, not the way an assistant would answer a question.

GUIDELINES
Write an independent comment responding to the post above.
Use the persona only when relevant. Do not force biography into the comment.
Make the comment sound casual, reactive, and situated in a feed.
Do not mention the persona, prompt, or instructions.
Do not copy the style examples.
Do not use hashtags, emojis, or overly abbreviated language.

LENGTH
Write naturally. Aim for the word count of a typical social media comment.

OUTPUT
Return only the single comment, nothing else.`;
}

// ─── TF-IDF Cosine Similarity ────────────────────────────────────────────────
function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
}

function buildTFIDF(docs) {
  const N = docs.length;
  const df = {};
  const tfs = docs.map(doc => {
    const tokens = tokenize(doc);
    const freq = {};
    tokens.forEach(t => (freq[t] = (freq[t] || 0) + 1));
    Object.keys(freq).forEach(t => { freq[t] /= tokens.length; df[t] = (df[t] || 0) + 1; });
    return freq;
  });
  const idf = {};
  Object.keys(df).forEach(t => (idf[t] = Math.log(N / df[t]) + 1));
  return { tfs, idf };
}

function tfidfVector(tf, idf) {
  const vec = {};
  Object.keys(tf).forEach(t => (vec[t] = tf[t] * (idf[t] || 1)));
  return vec;
}

function cosineSim(a, b) {
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
  let dot = 0, ma = 0, mb = 0;
  allKeys.forEach(k => {
    const av = a[k] || 0, bv = b[k] || 0;
    dot += av * bv; ma += av * av; mb += bv * bv;
  });
  if (!ma || !mb) return 0;
  return dot / (Math.sqrt(ma) * Math.sqrt(mb));
}

function findTopMatches(syntheticComment, realComments, topN = 5) {
  const allDocs = [syntheticComment, ...realComments];
  const { tfs, idf } = buildTFIDF(allDocs);
  const synVec = tfidfVector(tfs[0], idf);
  const scored = realComments.map((text, j) => ({
    text,
    score: cosineSim(synVec, tfidfVector(tfs[j + 1], idf)),
  }));
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, topN);
  const avg = scored.reduce((s, x) => s + x.score, 0) / scored.length;
  return { top, avgScore: avg };
}

// ─── CSV Parser ───────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return { texts: [], polarities: [] };
  const delimiter = lines[0].includes("\t") ? "\t" : ",";
  const firstCols = lines[0].split(delimiter);
  const rawPol0 = firstCols[0]?.trim().replace(/^"|"$/g, "");
  const isSentiment140 = firstCols.length >= 6 && (rawPol0 === "0" || rawPol0 === "4");
  if (isSentiment140) {
    const texts = [], polarities = [];
    lines.slice(0, 5000).forEach(l => {
      const p = l.split(delimiter);
      const pol = p[0]?.trim().replace(/^"|"$/g, "");
      const txt = p[5]?.trim().replace(/^"|"$/g, "");
      if (txt) { texts.push(txt); polarities.push(pol === "4" ? 1 : pol === "0" ? -1 : 0); }
    });
    return { texts, polarities };
  }
  const headers = firstCols.map(h => h.trim().replace(/^"|"$/g, "").toLowerCase());
  const ci = headers.findIndex(h => h.includes("comment") || h.includes("text") || h.includes("tweet"));
  if (ci === -1) return { texts: [], polarities: [] };
  const texts = lines.slice(1, 5001).map(l => l.split(delimiter)[ci]?.trim().replace(/^"|"$/g, "")).filter(Boolean);
  return { texts, polarities: new Array(texts.length).fill(0) };
}

// ─── API ──────────────────────────────────────────────────────────────────────
async function callLLM(prompt, apiKey, model) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "Duke Polarization Lab",
    },
    body: JSON.stringify({ model: model || "openai/gpt-4o-mini", messages: [{ role: "user", content: prompt }] }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "API error");
  return data.choices[0].message.content.trim();
}

async function generateVariants(topic, apiKey, model) {
  const raw = await callLLM(buildVariantsPrompt(topic), apiKey, model);
  const variants = raw.split(/\n/).map(l => l.replace(/^\d+[\.\)]\s*/, "").trim()).filter(l => l.length > 10);
  const fallback = `${topic.title}\n\n${topic.body}`;
  while (variants.length < 4) variants.push(fallback);
  return variants.slice(0, 4);
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", borderTop: accent ? `3px solid ${accent}` : undefined }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#111827", fontFamily: "monospace", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ─── Similarity Bar Chart (horizontal, sorted) ───────────────────────────────
function SimilarityBarsChart({ results }) {
  const withScores = results.filter(r => r.matchData && !r.error).sort((a, b) => b.matchData.avgScore - a.matchData.avgScore);
  if (!withScores.length) return <div style={{ color: "#9ca3af", fontSize: 13 }}>Load a dataset to enable similarity scoring.</div>;
  const rowH = 32, padL = 130, padR = 55, padT = 4, padB = 4;
  const W = 580, H = withScores.length * rowH + padT + padB;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W, display: "block" }}>
      {withScores.map((r, idx) => {
        const score = r.matchData.avgScore;
        const barW = Math.max(2, Math.round(score * (W - padL - padR)));
        const y = padT + idx * rowH;
        const color = score >= 0.6 ? "#16a34a" : score >= 0.35 ? "#d97706" : "#2563eb";
        return (
          <g key={r.persona.id}>
            <text x={padL - 8} y={y + rowH / 2 + 4} textAnchor="end" style={{ fill: "#374151", fontSize: 12, fontFamily: "system-ui, sans-serif" }}>
              {r.persona.name.split(" ")[0]}
            </text>
            <rect x={padL} y={y + 8} width={W - padL - padR} height={rowH - 16} rx={4} fill="#f3f4f6" />
            <rect x={padL} y={y + 8} width={barW} height={rowH - 16} rx={4} fill={color + "33"} />
            <rect x={padL} y={y + 8} width={Math.min(barW, 4)} height={rowH - 16} rx={2} fill={color} />
            <text x={padL + barW + 7} y={y + rowH / 2 + 4} style={{ fill: color, fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>
              {Math.round(score * 100)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Sentiment Distribution Chart ────────────────────────────────────────────
function SentimentChart({ results, realPolarities }) {
  const synScores = results.filter(r => !r.error).map(r => r.sentiment);
  if (!synScores.length) return <div style={{ color: "#9ca3af", fontSize: 13 }}>No results yet.</div>;
  const bins = [-1, -0.6, -0.2, 0.2, 0.6, 1];
  const labels = ["Very Neg", "Neg", "Neutral", "Pos", "Very Pos"];
  const colors = ["#ef4444", "#f97316", "#d97706", "#84cc16", "#16a34a"];
  const synCounts = new Array(5).fill(0);
  synScores.forEach(s => { for (let k = 0; k < 5; k++) { if (s >= bins[k] && (k === 4 ? s <= bins[k + 1] : s < bins[k + 1])) { synCounts[k]++; break; } } });
  const realCounts = new Array(5).fill(0);
  const realTotal = realPolarities.length;
  if (realTotal > 0) { realPolarities.forEach(p => { if (p === -1) realCounts[1]++; else if (p === 1) realCounts[3]++; else realCounts[2]++; }); }
  const padL = 8, padR = 8, padT = 24, padB = 32;
  const gW = 90, gap = 12, bW = 30;
  const W = padL + 5 * (gW + gap) + padR;
  const chartH = 130, H = padT + chartH + padB;
  const maxSyn = Math.max(...synCounts, 1);
  const maxReal = realTotal > 0 ? Math.max(...realCounts.map(c => c / realTotal), 0.01) : 1;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W, display: "block" }}>
      <text x={W / 2} y={14} textAnchor="middle" style={{ fill: "#9ca3af", fontSize: 10, fontFamily: "monospace" }}>
        Synthetic comments (solid) vs Real dataset (outlined)
      </text>
      {labels.map((label, k) => {
        const gx = padL + k * (gW + gap);
        const sH = Math.round((synCounts[k] / maxSyn) * chartH);
        const rH = realTotal > 0 ? Math.round(((realCounts[k] / realTotal) / maxReal) * chartH) : 0;
        return (
          <g key={k}>
            <rect x={gx + 2} y={padT + chartH - sH} width={bW} height={sH} rx={3} fill={colors[k] + "bb"} />
            {synCounts[k] > 0 && <text x={gx + 2 + bW / 2} y={padT + chartH - sH - 4} textAnchor="middle" style={{ fill: colors[k], fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>{synCounts[k]}</text>}
            {realTotal > 0 && <>
              <rect x={gx + bW + 8} y={padT + chartH - rH} width={bW} height={rH} rx={3} fill="none" stroke={colors[k]} strokeWidth={1.5} strokeDasharray="4,3" />
              {rH > 6 && <text x={gx + bW + 8 + bW / 2} y={padT + chartH - rH - 4} textAnchor="middle" style={{ fill: colors[k], fontSize: 10, fontFamily: "monospace" }}>{Math.round((realCounts[k] / realTotal) * 100)}%</text>}
            </>}
            <text x={gx + gW / 2} y={H - 8} textAnchor="middle" style={{ fill: "#6b7280", fontSize: 9, fontFamily: "system-ui" }}>{label}</text>
          </g>
        );
      })}
      <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="#e5e7eb" strokeWidth={1} />
    </svg>
  );
}

// ─── Scatter Chart ────────────────────────────────────────────────────────────
function ScatterChart({ results }) {
  const pts = results.filter(r => !r.error && r.matchData);
  if (pts.length < 2) return <div style={{ color: "#9ca3af", fontSize: 13 }}>Need at least 2 results with a dataset loaded.</div>;
  const padL = 44, padR = 16, padT = 16, padB = 32;
  const W = 560, H = 240;
  const pW = W - padL - padR, pH = H - padT - padB;
  const toX = s => padL + ((s + 1) / 2) * pW;
  const toY = s => padT + (1 - s) * pH;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W, display: "block" }}>
      <line x1={padL} y1={padT} x2={padL} y2={padT + pH} stroke="#e5e7eb" />
      <line x1={padL} y1={padT + pH} x2={padL + pW} y2={padT + pH} stroke="#e5e7eb" />
      <line x1={toX(0)} y1={padT} x2={toX(0)} y2={padT + pH} stroke="#e5e7eb" strokeDasharray="4,3" />
      {[-1, -0.5, 0, 0.5, 1].map(v => <text key={v} x={toX(v)} y={H - 8} textAnchor="middle" style={{ fill: "#9ca3af", fontSize: 9, fontFamily: "monospace" }}>{v}</text>)}
      {[0, 0.25, 0.5, 0.75, 1].map(v => <text key={v} x={padL - 4} y={toY(v) + 3} textAnchor="end" style={{ fill: "#9ca3af", fontSize: 9, fontFamily: "monospace" }}>{v.toFixed(2)}</text>)}
      <text x={padL + pW / 2} y={H - 2} textAnchor="middle" style={{ fill: "#9ca3af", fontSize: 10, fontFamily: "monospace" }}>sentiment →</text>
      {pts.map(r => {
        const cx = toX(r.sentiment), cy = toY(r.matchData.avgScore);
        return (
          <g key={r.persona.id}>
            <circle cx={cx} cy={cy} r={5} fill="#2563eb" fillOpacity={0.6} />
            <text x={cx} y={cy - 8} textAnchor="middle" style={{ fill: "#2563eb", fontSize: 9, fontFamily: "system-ui" }}>{r.persona.name.split(" ")[0]}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [topic, setTopic] = useState({
    title: "Unfortunately, ICE is necessary.",
    body: "I've noticed that colleges seem to attract people with strong beliefs. It could be political, social, or cultural, but either way it seems like campuses are mini versions of big societal debates. It seems like people just find their group and they feed off each other, but other times it feels like you could really learn from such polarizing people.",
  });
  const [selectedPersonas, setSelectedPersonas] = useState(["omar", "chloe", "finch"]);
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || "";
  const [model, setModel] = useState("openai/gpt-4o-mini");
  const [realComments, setRealComments] = useState([]);
  const [realPolarities, setRealPolarities] = useState([]);
  const [datasetName, setDatasetName] = useState("");
  const [results, setResults] = useState([]);
  const [variants, setVariants] = useState([]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0, phase: "" });
  const [rounds, setRounds] = useState(5);
  const [tab, setTab] = useState("setup");
  const [exampleIdx, setExampleIdx] = useState(0);
  const fileRef = useRef();

  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const { texts, polarities } = parseCSV(ev.target.result);
      setRealComments(texts); setRealPolarities(polarities);
      setDatasetName(`${file.name} (${texts.length.toLocaleString()} rows)`);
    };
    reader.readAsText(file);
  };

  const loadSampleDataset = async () => {
    try {
      const res = await fetch("/sentiment140_sample.csv");
      const text = await res.text();
      const { texts, polarities } = parseCSV(text);
      setRealComments(texts); setRealPolarities(polarities);
      setDatasetName(`Sentiment140 sample (${texts.length.toLocaleString()} rows)`);
    } catch { alert("Could not load sample dataset."); }
  };

  const togglePersona = id => setSelectedPersonas(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const runPipeline = useCallback(async () => {
    if (!topic.title.trim() || !apiKey) return;
    const personas = PERSONAS.filter(p => selectedPersonas.includes(p.id));
    if (!personas.length) return;
    setResults([]); setVariants([]); setRunning(true); setTab("analysis");
    const total = personas.length * rounds;
    setProgress({ done: 0, total: total + 1, phase: "Generating post variants…" });

    let postVariants;
    try { postVariants = await generateVariants(topic, apiKey, model); }
    catch { postVariants = [`${topic.title}\n\n${topic.body}`]; }
    setVariants(postVariants);
    setProgress({ done: 1, total: total + 1, phase: "Generating comments…" });

    const newResults = [];
    let done = 1;
    for (let round = 0; round < rounds; round++) {
      for (let idx = 0; idx < personas.length; idx++) {
        const persona = personas[idx];
        const variantPost = postVariants[(round * personas.length + idx) % postVariants.length];
        try {
          const prompt = buildPrompt(persona, variantPost);
          const comment = await callLLM(prompt, apiKey, model);
          const sentiment = afinnScore(comment);
          const matchData = realComments.length > 0 ? findTopMatches(comment, realComments, 5) : null;
          newResults.push({ persona, prompt, comment, variantPost, round, sentiment, matchData, error: null });
        } catch (err) {
          newResults.push({ persona, prompt: "", comment: "", variantPost, round, sentiment: 0, matchData: null, error: err.message });
        }
        done++;
        setProgress({ done, total: total + 1, phase: `Round ${round + 1}/${rounds} — generating comments…` });
        setResults([...newResults]);
      }
    }
    setExampleIdx(0);
    setRunning(false);
  }, [topic, selectedPersonas, apiKey, model, realComments, rounds]);

  // Derived: dataset-level similarity score
  const scored = results.filter(r => r.matchData && !r.error);
  const datasetSimilarity = scored.length > 0
    ? scored.reduce((s, r) => s + r.matchData.avgScore, 0) / scored.length
    : null;
  const avgSentiment = results.filter(r => !r.error).length > 0
    ? results.filter(r => !r.error).reduce((s, r) => s + r.sentiment, 0) / results.filter(r => !r.error).length
    : null;

  // Styles
  const C = {
    blue: "#2563eb", blueBg: "#eff6ff", blueBorder: "#bfdbfe",
    border: "#e5e7eb", surface: "#f9fafb", text: "#111827", muted: "#6b7280",
  };
  const S = {
    root: { minHeight: "100vh", background: "#f9fafb", color: C.text, fontFamily: "system-ui, 'Segoe UI', sans-serif", fontSize: 14 },
    header: { background: "#fff", borderBottom: `1px solid ${C.border}`, padding: "14px 28px", display: "flex", alignItems: "center", gap: 12 },
    logo: { width: 32, height: 32, background: C.blue, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 },
    title: { fontWeight: 700, fontSize: 16, color: C.text },
    subtitle: { color: C.muted, fontSize: 12, marginTop: 1 },
    tabs: { background: "#fff", display: "flex", gap: 0, padding: "0 28px", borderBottom: `1px solid ${C.border}` },
    tabBtn: active => ({ padding: "12px 18px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: active ? 600 : 400, background: "transparent", color: active ? C.blue : C.muted, borderBottom: active ? `2px solid ${C.blue}` : "2px solid transparent", transition: "all 0.15s", marginBottom: -1 }),
    body: { padding: "24px 28px", maxWidth: 1080, margin: "0 auto" },
    card: { background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 22px", marginBottom: 16 },
    sectionTitle: { fontSize: 11, fontWeight: 700, letterSpacing: 1, color: C.blue, textTransform: "uppercase", marginBottom: 12 },
    input: { width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "9px 13px", fontSize: 14, outline: "none", boxSizing: "border-box" },
    pill: active => ({ padding: "4px 12px", borderRadius: 20, border: `1px solid ${active ? C.blue : C.border}`, background: active ? C.blueBg : "#fff", color: active ? C.blue : C.muted, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.12s" }),
    runBtn: { background: running ? C.surface : C.blue, color: running ? C.muted : "#fff", border: `1px solid ${running ? C.border : C.blue}`, borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: running ? "not-allowed" : "pointer", transition: "all 0.2s" },
    uploadBtn: { background: "#fff", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 7, padding: "7px 14px", cursor: "pointer", fontSize: 13 },
    label: { color: C.muted, fontSize: 11, fontWeight: 600, marginBottom: 4, display: "block" },
    progressBar: pct => ({ height: 3, background: `linear-gradient(90deg, ${C.blue} ${pct}%, ${C.border} ${pct}%)`, borderRadius: 4, transition: "background 0.3s" }),
    tag: (color, bg) => ({ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: bg, color, border: `1px solid ${color}33` }),
    variantTag: { fontSize: 11, color: C.blue, background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 4, padding: "1px 7px", fontFamily: "monospace", fontWeight: 700 },
  };

  const pct = progress.total > 0 ? (progress.done / progress.total) * 100 : 0;

  const sentimentLabel = s => s > 0.15 ? "positive" : s < -0.15 ? "negative" : "neutral";
  const sentimentColor = s => s > 0.15 ? "#16a34a" : s < -0.15 ? "#dc2626" : "#d97706";

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
          <div style={{ marginLeft: "auto", color: C.muted, fontSize: 12 }}>
            {progress.phase} &nbsp; {progress.done}/{progress.total}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={S.tabs}>
        {[["setup", "⚙️ Setup"], ["analysis", "📊 Analysis"], ["examples", "💬 Examples"]].map(([key, label]) => (
          <button key={key} style={S.tabBtn(tab === key)} onClick={() => setTab(key)}>
            {label}
            {key === "examples" && results.length > 0 && (
              <span style={{ marginLeft: 6, background: C.blueBg, color: C.blue, borderRadius: 10, padding: "1px 6px", fontSize: 11 }}>
                {results.length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={S.body}>

        {/* ─── SETUP TAB ─── */}
        {tab === "setup" && (
          <div>
            <div style={S.card}>
              <div style={S.sectionTitle}>Thread Post</div>
              <label style={S.label}>Title</label>
              <input style={{ ...S.input, marginBottom: 10 }} value={topic.title}
                onChange={e => setTopic(t => ({ ...t, title: e.target.value }))} placeholder="Post title…" />
              <label style={S.label}>Body</label>
              <textarea style={{ ...S.input, minHeight: 90, resize: "vertical", lineHeight: 1.6 }} value={topic.body}
                onChange={e => setTopic(t => ({ ...t, body: e.target.value }))} placeholder="Post body text…" />
              <div style={{ color: C.muted, fontSize: 12, marginTop: 8 }}>
                The pipeline generates 4 post variants, then runs each persona through {rounds} round{rounds !== 1 ? "s" : ""} for a total of {selectedPersonas.length * rounds} comments.
              </div>
            </div>

            <div style={S.card}>
              <div style={S.sectionTitle}>Real Comment Dataset (Optional)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <input ref={fileRef} type="file" accept=".csv,.tsv,.txt" style={{ display: "none" }} onChange={handleFileUpload} />
                <button style={S.uploadBtn} onClick={() => fileRef.current?.click()}>📂 Upload CSV / TSV</button>
                <button style={S.uploadBtn} onClick={loadSampleDataset}>⚡ Load Sentiment140 Sample</button>
                {datasetName && <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 600 }}>✓ {datasetName}</span>}
              </div>
              <div style={{ color: C.muted, fontSize: 12, marginTop: 8, lineHeight: 1.6 }}>
                Supports Sentiment140 CSV (col 0 = polarity, col 5 = text) or any CSV with a <code>text</code> column.
                Enables dataset-level similarity scoring and comparison charts.
              </div>
            </div>

            <div style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={S.sectionTitle}>Personas ({selectedPersonas.length} selected)</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ ...S.uploadBtn, fontSize: 11, padding: "3px 10px" }} onClick={() => setSelectedPersonas(PERSONAS.map(p => p.id))}>All</button>
                  <button style={{ ...S.uploadBtn, fontSize: 11, padding: "3px 10px" }} onClick={() => setSelectedPersonas([])}>None</button>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {PERSONAS.map(p => (
                  <button key={p.id} style={S.pill(selectedPersonas.includes(p.id))}
                    onClick={() => togglePersona(p.id)} title={`${p.occupation} · ${p.stance}`}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={S.card}>
              <div style={S.sectionTitle}>Model</div>
              <select style={{ ...S.input, cursor: "pointer" }} value={model} onChange={e => setModel(e.target.value)}>
                <optgroup label="OpenAI">
                  <option value="openai/gpt-4o-mini">gpt-4o-mini (fast, cheap)</option>
                  <option value="openai/gpt-4o">gpt-4o</option>
                </optgroup>
                <optgroup label="Anthropic">
                  <option value="anthropic/claude-3-haiku">claude-3-haiku</option>
                  <option value="anthropic/claude-3.5-sonnet">claude-3.5-sonnet</option>
                  <option value="anthropic/claude-sonnet-4.5">claude-sonnet-4.5</option>
                  <option value="anthropic/claude-sonnet-4.6">claude-sonnet-4.6</option>
                </optgroup>
                <optgroup label="WizardLM">
                  <option value="microsoft/wizardlm-2-8x22b">wizardlm-2-8x22b</option>
                </optgroup>
                <optgroup label="Meta">
                  <option value="meta-llama/llama-3.1-8b-instruct">llama-3.1-8b</option>
                  <option value="meta-llama/llama-3.3-70b-instruct:free">llama-3.3-70b (free)</option>
                  <option value="meta-llama/llama-3.3-70b-instruct">llama-3.3-70b</option>
                </optgroup>
                <optgroup label="Mistral">
                  <option value="mistralai/mistral-7b-instruct-v0.1">mistral-7b</option>
                  <option value="mistralai/mixtral-8x7b-instruct">mixtral-8x7b</option>
                </optgroup>
              </select>
            </div>

            <div style={S.card}>
              <div style={S.sectionTitle}>Rounds</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input
                  type="number" min={1} max={50}
                  style={{ ...S.input, width: 80 }}
                  value={rounds}
                  onChange={e => setRounds(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                />
                <div style={{ color: C.muted, fontSize: 13 }}>
                  {selectedPersonas.length} persona{selectedPersonas.length !== 1 ? "s" : ""} × {rounds} round{rounds !== 1 ? "s" : ""} = <strong style={{ color: C.text }}>{selectedPersonas.length * rounds} comments</strong>
                </div>
              </div>
              <div style={{ color: C.muted, fontSize: 12, marginTop: 8 }}>
                Each round assigns personas to different post variants. More rounds = larger, more varied dataset.
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8 }}>
              <button style={S.runBtn} onClick={runPipeline}
                disabled={running || !selectedPersonas.length || !topic.title.trim()}>
                {running ? "⏳ Running…" : `▶ Generate ${selectedPersonas.length * rounds} Comments`}
              </button>
              <div style={{ color: C.muted, fontSize: 12 }}>
                {model.split("/").pop()}
              </div>
            </div>
            {running && <div style={{ marginTop: 10 }}><div style={S.progressBar(pct)} /></div>}
          </div>
        )}

        {/* ─── ANALYSIS TAB ─── */}
        {tab === "analysis" && (
          <div>
            {results.length === 0 && !running ? (
              <div style={{ textAlign: "center", color: C.muted, padding: "60px 0" }}>
                No results yet. Configure and run from the Setup tab.
              </div>
            ) : (
              <>
                {running && (
                  <div style={{ ...S.card, marginBottom: 16 }}>
                    <div style={{ color: C.muted, fontSize: 13, marginBottom: 6 }}>{progress.phase} — {progress.done} of {progress.total}</div>
                    <div style={S.progressBar(pct)} />
                  </div>
                )}

                {/* Dataset-level scores */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 16 }}>
                  <StatCard
                    label="Dataset Similarity"
                    value={datasetSimilarity !== null ? `${Math.round(datasetSimilarity * 100)}%` : "—"}
                    sub={realComments.length > 0 ? `avg TF-IDF cosine vs ${realComments.length.toLocaleString()} real comments` : "load a dataset to score"}
                    accent={C.blue}
                  />
                  <StatCard
                    label="Avg Sentiment"
                    value={avgSentiment !== null ? (avgSentiment > 0 ? "+" : "") + avgSentiment.toFixed(3) : "—"}
                    sub={avgSentiment !== null ? `overall ${sentimentLabel(avgSentiment)} (AFINN)` : ""}
                    accent={avgSentiment !== null ? sentimentColor(avgSentiment) : undefined}
                  />
                  <StatCard label="Comments" value={results.filter(r => !r.error).length} sub={`${variants.length} post variants · ${model.split("/").pop()}`} />
                  <StatCard label="Dataset" value={realComments.length > 0 ? realComments.length.toLocaleString() : "none"} sub={datasetName || "no dataset loaded"} />
                </div>

                {/* Post Variants */}
                {variants.length > 0 && (
                  <div style={S.card}>
                    <div style={S.sectionTitle}>Post Variants Generated</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {variants.map((v, k) => (
                        <div key={k} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={S.variantTag}>V{k + 1}</span>
                          <span style={{ color: C.text, fontSize: 13, lineHeight: 1.5 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Similarity Bars */}
                <div style={S.card}>
                  <div style={S.sectionTitle}>Per-Comment Similarity to Real Dataset</div>
                  <SimilarityBarsChart results={results} />
                </div>

                {/* Sentiment Distribution */}
                <div style={S.card}>
                  <div style={S.sectionTitle}>Sentiment Distribution</div>
                  <SentimentChart results={results} realPolarities={realPolarities} />
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 10 }}>
                    AFINN lexicon scores for generated comments (solid). {realPolarities.length > 0 ? "Outlined bars = real dataset polarity distribution (normalized to same scale)." : "Load a dataset to compare with real polarity distribution."}
                  </div>
                </div>

                {/* Scatter */}
                {realComments.length > 0 && (
                  <div style={S.card}>
                    <div style={S.sectionTitle}>Sentiment vs. Similarity</div>
                    <ScatterChart results={results} />
                    <div style={{ color: C.muted, fontSize: 12, marginTop: 8 }}>
                      Each point = one persona. x = AFINN sentiment of their comment. y = avg TF-IDF similarity to the real dataset.
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ─── EXAMPLES TAB ─── */}
        {tab === "examples" && (
          <div>
            {results.length === 0 ? (
              <div style={{ textAlign: "center", color: C.muted, padding: "60px 0" }}>
                No results yet. Run the pipeline from the Setup tab.
              </div>
            ) : (
              <>
                {/* Navigation */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <button style={{ ...S.uploadBtn, padding: "6px 14px" }} onClick={() => setExampleIdx(i => Math.max(0, i - 1))} disabled={exampleIdx === 0}>← Prev</button>
                  <span style={{ fontSize: 13, color: C.muted }}>
                    {exampleIdx + 1} of {results.length}
                  </span>
                  <button style={{ ...S.uploadBtn, padding: "6px 14px" }} onClick={() => setExampleIdx(i => Math.min(results.length - 1, i + 1))} disabled={exampleIdx === results.length - 1}>Next →</button>
                  <div style={{ marginLeft: "auto", display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {results.map((r, k) => (
                      <button key={k} onClick={() => setExampleIdx(k)}
                        style={{ ...S.pill(k === exampleIdx), padding: "3px 10px", fontSize: 11 }}>
                        {r.persona.name.split(" ")[0]}
                        {r.error && " ⚠"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment card */}
                {(() => {
                  const r = results[exampleIdx];
                  if (!r) return null;
                  const sc = r.sentiment;
                  return (
                    <div style={S.card}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                        <span style={S.tag(C.blue, C.blueBg)}>{r.persona.name}</span>
                        <span style={{ color: C.muted, fontSize: 12 }}>{r.persona.occupation}</span>
                        <span style={S.variantTag}>round {(r.round ?? 0) + 1}</span>
                        {!r.error && (
                          <span style={S.tag(sentimentColor(sc), sentimentColor(sc) + "15")}>
                            {sentimentLabel(sc)} ({sc > 0 ? "+" : ""}{sc.toFixed(3)})
                          </span>
                        )}
                        {r.matchData && (
                          <span style={S.tag("#374151", C.surface)}>
                            sim {Math.round(r.matchData.avgScore * 100)}%
                          </span>
                        )}
                        {r.error && <span style={S.tag("#dc2626", "#fef2f2")}>Error</span>}
                      </div>

                      {/* Variant post context */}
                      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.blueBorder}`, borderRadius: 6, padding: "8px 12px", marginBottom: 12, fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
                        <span style={{ color: C.blue, fontFamily: "monospace", fontSize: 10, marginRight: 6, fontWeight: 700 }}>POST →</span>
                        {r.variantPost}
                      </div>

                      {r.error ? (
                        <div style={{ color: "#dc2626", fontSize: 13 }}>{r.error}</div>
                      ) : (
                        <>
                          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px", fontSize: 14, lineHeight: 1.7, color: C.text }}>
                            {r.comment}
                          </div>

                          {/* Persona detail */}
                          <details style={{ marginTop: 12 }}>
                            <summary style={{ color: C.muted, fontSize: 12, cursor: "pointer" }}>Persona profile</summary>
                            <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                              {[["Education", r.persona.education], ["Stance", r.persona.stance], ["Style", r.persona.style], ["Voice", r.persona.voice]].map(([k, v]) => (
                                <div key={k} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 10px" }}>
                                  <div style={{ fontSize: 10, fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 2 }}>{k}</div>
                                  <div style={{ fontSize: 12, color: C.text, lineHeight: 1.5 }}>{v}</div>
                                </div>
                              ))}
                            </div>
                          </details>

                          {/* Top matches */}
                          {r.matchData && r.matchData.top.length > 0 && (
                            <details style={{ marginTop: 10 }}>
                              <summary style={{ color: C.muted, fontSize: 12, cursor: "pointer" }}>
                                Top matching real comments (best: {Math.round(r.matchData.top[0].score * 100)}%)
                              </summary>
                              <div style={{ marginTop: 8 }}>
                                {r.matchData.top.map((m, j) => (
                                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                                    <span style={{ ...S.tag("#374151", C.surface), whiteSpace: "nowrap", fontFamily: "monospace" }}>{Math.round(m.score * 100)}%</span>
                                    <span style={{ color: C.muted, fontSize: 12, flex: 1, lineHeight: 1.5 }}>{m.text.slice(0, 200)}{m.text.length > 200 ? "…" : ""}</span>
                                  </div>
                                ))}
                              </div>
                            </details>
                          )}

                          <details style={{ marginTop: 8 }}>
                            <summary style={{ color: C.muted, fontSize: 12, cursor: "pointer" }}>View prompt</summary>
                            <pre style={{ marginTop: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 10, fontSize: 11, color: C.muted, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                              {r.prompt}
                            </pre>
                          </details>
                        </>
                      )}
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
