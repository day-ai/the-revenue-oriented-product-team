# The Revenue-Oriented Product Team Exercises

Companion skills for [The Revenue-Oriented Product Team](https://day.ai/courses/the-revenue-oriented-product-team), a course by Day AI.
Each chapter ends with an exercise that applies the chapter to your own
company; each skill here is that chapter's exercise prompt, packaged so your
agent can run it. They work best where your company's context is already
connected: Claude Code in a company-brain folder, Cowork, Codex, or similar.

## Run one

```sh
# Claude Code
npx skills use day-ai/the-revenue-oriented-product-team@<skill> | claude

# Codex
npx skills use day-ai/the-revenue-oriented-product-team@<skill> --agent codex
```

Or install them all for your agent:

```sh
npx skills add day-ai/the-revenue-oriented-product-team
```

## The skills

| Chapter | Title | Skill |
| --- | --- | --- |
| 1 | [The Two Species of Companies](https://day.ai/courses/the-revenue-oriented-product-team/the-two-species-of-companies) | [`the-two-species-of-companies`](skills/the-two-species-of-companies/SKILL.md) |
| 2 | [In Service to Engineering](https://day.ai/courses/the-revenue-oriented-product-team/in-service-to-engineering) | [`in-service-to-engineering`](skills/in-service-to-engineering/SKILL.md) |
| 3 | [Attitude Is a Choice](https://day.ai/courses/the-revenue-oriented-product-team/attitude-is-a-choice) | [`attitude-is-a-choice`](skills/attitude-is-a-choice/SKILL.md) |
| 4 | [Your Second Boss](https://day.ai/courses/the-revenue-oriented-product-team/your-second-boss) | [`your-second-boss`](skills/your-second-boss/SKILL.md) |
| 5 | [The Dream Interpreter](https://day.ai/courses/the-revenue-oriented-product-team/the-dream-interpreter) | [`the-dream-interpreter`](skills/the-dream-interpreter/SKILL.md) |
| 6 | [The Rival Summer Camps](https://day.ai/courses/the-revenue-oriented-product-team/the-rival-summer-camps) | [`the-rival-summer-camps`](skills/the-rival-summer-camps/SKILL.md) |
| 7 | [The Common Language](https://day.ai/courses/the-revenue-oriented-product-team/the-common-language) | [`the-common-language`](skills/the-common-language/SKILL.md) |
| 8 | [The Trust Fall](https://day.ai/courses/the-revenue-oriented-product-team/the-trust-fall) | [`the-trust-fall`](skills/the-trust-fall/SKILL.md) |
| 9 | [The Informants](https://day.ai/courses/the-revenue-oriented-product-team/the-informants) | [`the-informants`](skills/the-informants/SKILL.md) |
| 10 | [The Renewal Clock](https://day.ai/courses/the-revenue-oriented-product-team/the-renewal-clock) | [`the-renewal-clock`](skills/the-renewal-clock/SKILL.md) |
| 11 | [What If You're the CEO](https://day.ai/courses/the-revenue-oriented-product-team/what-if-youre-the-ceo) | [`what-if-youre-the-ceo`](skills/what-if-youre-the-ceo/SKILL.md) |
| 12 | [It Was Never About Revenue](https://day.ai/courses/the-revenue-oriented-product-team/it-was-never-about-revenue) | [`it-was-never-about-revenue`](skills/it-was-never-about-revenue/SKILL.md) |

## Updating

The prompts come from the published course. After a chapter's prompt
changes, run `node scripts/sync.mjs` and commit the result.
