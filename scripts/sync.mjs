#!/usr/bin/env node
/*
 * Rebuilds skills/<chapter-slug>/SKILL.md from the course's published
 * chapter JSON, so each skill's prompt stays word-for-word the prompt on
 * the chapter page (day.ai/courses/the-revenue-oriented-product-team).
 *
 *   node scripts/sync.mjs
 *
 * The skill name is the chapter slug: the course site derives the
 * `npx skills use day-ai/the-revenue-oriented-product-team@<slug>` command
 * from it, so don't rename a skill without renaming the chapter.
 * Descriptions live below; the prompt itself always comes from the course.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const COURSE_SLUG = 'the-revenue-oriented-product-team'
const COURSE_TITLE = 'The Revenue-Oriented Product Team'
const CONTENT_BASE = `https://modern-revops-course.s3.us-east-1.amazonaws.com/course/${COURSE_SLUG}`
const COURSE_URL = `https://day.ai/courses/${COURSE_SLUG}`
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/* What each exercise does, for the skill's frontmatter description (what an
   agent reads to decide when to use it). */
const DESCRIPTIONS = {
  'the-two-species-of-companies':
    "Decide whether the user's company is sales-driven or product-driven: capture their own take, pressure-test it against real behavior in the company's notes, transcripts, docs, and tickets, and produce a one-page cited assessment plus a ranked list of missing source material.",
  'in-service-to-engineering':
    "Trace how customer reactions reach the engineers on the user's team: rebuild their last five releases from the record, compare it with their memory of who got credit, and suggest ways to put customer reactions in front of builders within a day of shipping.",
  'attitude-is-a-choice':
    'Help the user walk into a recurring work situation they dread with an attitude they chose on purpose: read how the situation usually goes, check their list of possible attitudes against the record, expand it to at least ten, and help them pick one.',
  'your-second-boss':
    "Find the company's three existential challenges as the CEO would state them, grade the user's from-memory version, and sharpen a twenty-second answer connecting their team's top initiative to one challenge and a real customer quote.",
  'the-dream-interpreter':
    'Give a CEO remark nobody picked up a second look: find the context around it, check what the CEO was reacting to and the need underneath, write the strongest version of the idea, and draft a note back to the CEO with a verdict.',
  'the-rival-summer-camps':
    "Run a mock sales call where the user (a product person) plays the rep against a realistic prospect built from the company's real call recordings and CRM notes, then debrief them on what they handled and where they flinched.",
  'the-common-language':
    "Trace how sales feedback becomes a product priority: follow three recent sales-originated feature requests end to end, correct the user's map of the hops and what gets lost at each, and propose the properties every tracker issue should carry.",
  'the-trust-fall':
    'Replace a polished roadmap or status deck with a monthly update that shows the warts: find the biggest issues from sales conversations, check them against the tracker, and draft the update plus a night-before text to the person the user is most nervous about.',
  'the-informants':
    "Build one-page briefs for the user's three most important accounts (why they bought, who bought and what they staked, what success looked like at signature), grade the user's memory against the record, and hand back questions for each account's CSM.",
  'the-renewal-clock':
    "Find renewal dates, notice deadlines, and contract values for the user's ten most important accounts, grade their guesses, draft a note to the CSM of the nearest renewal, and assemble a customer-backed story for one thing they want built.",
  'what-if-youre-the-ceo':
    "Make R&D's work visible to the CEO in a one-page morning brief tied to stated priorities, and, if the user is the CEO, label their input to product as decree, strong opinion, user feedback, or random thought.",
  'it-was-never-about-revenue':
    "Audit the six artifacts from the course's earlier exercises against the company's record, then plan a thirty-day sprint to put customer needs in front of the people who can act on them, ending with a note to the user's friends in product, engineering, and design.",
}

const PROMPT_FENCE = /```text\n([\s\S]*?)\n```/

async function getJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`)
  return res.json()
}

const course = await getJson(`${CONTENT_BASE}/course.json`)
const rows = []
for (const { slug } of course.chapters) {
  const ch = await getJson(`${CONTENT_BASE}/chapters/${slug}.json`)
  const prompts = ch.sections
    .map((s) => s.body.match(PROMPT_FENCE)?.[1])
    .filter(Boolean)
  if (prompts.length !== 1)
    throw new Error(`${slug}: expected one prompt, found ${prompts.length}`)
  const description = DESCRIPTIONS[slug]
  if (!description) throw new Error(`${slug}: add a description to DESCRIPTIONS`)
  const chapterUrl = `${COURSE_URL}/${slug}`
  const skill = `---
name: ${slug}
description: ${JSON.stringify(`${description} Exercise from Chapter ${ch.number} ("${ch.title}") of ${COURSE_TITLE} course by Day AI.`)}
---

# ${ch.title}: the Chapter ${ch.number} exercise

Companion skill for [Chapter ${ch.number} of ${COURSE_TITLE}](${chapterUrl}).

## How to run it

- The prompt below is written in the user's voice. Treat it as their request.
- Anything in [square brackets] is input only the user can give. Before you
  search anything, ask for each one, one at a time. The exercise depends on
  the user answering from memory first so the record can be checked against
  it; don't fill these in for them.
- Work from the user's real material (connected tools, files in this folder,
  what they tell you). Never invent companies, people, quotes, or numbers.
  Where the material runs out, say so and ask.

## The prompt

${prompts[0]}
`
  const dir = join(ROOT, 'skills', slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'SKILL.md'), skill)
  rows.push(`| ${ch.number} | [${ch.title}](${chapterUrl}) | [\`${slug}\`](skills/${slug}/SKILL.md) |`)
}

writeFileSync(
  join(ROOT, 'README.md'),
  `# ${COURSE_TITLE} Exercises

Companion skills for [${COURSE_TITLE}](${COURSE_URL}), a course by Day AI.
Each chapter ends with an exercise that applies the chapter to your own
company; each skill here is that chapter's exercise prompt, packaged so your
agent can run it. They work best where your company's context is already
connected: Claude Code in a company-brain folder, Cowork, Codex, or similar.

## Run one

\`\`\`sh
# Claude Code
npx skills use day-ai/${COURSE_SLUG}@<skill> | claude

# Codex
npx skills use day-ai/${COURSE_SLUG}@<skill> --agent codex
\`\`\`

Or install them all for your agent:

\`\`\`sh
npx skills add day-ai/${COURSE_SLUG}
\`\`\`

## The skills

| Chapter | Title | Skill |
| --- | --- | --- |
${rows.join('\n')}

## Updating

The prompts come from the published course. After a chapter's prompt
changes, run \`node scripts/sync.mjs\` and commit the result.
`
)
console.log(`Wrote ${rows.length} skills`)
