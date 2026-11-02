---
name: portfolio-copy
description: Write and edit case-study copy for Ipshita's portfolio in her house style: concrete and visual, precise verbs, no repeated words, past tense for case events, facts only. Use when writing, rewriting, stress-testing or polishing any copy in lib/collections/*.ts.
---

# Portfolio copy

Governing rules are in the Portfolio Editorial Director memory (voice, change control, copy test). This skill covers the day-to-day writing style.

## Voice

- Calm, precise, C-suite. Confident without being clever. Never marketing or award-entry language.
- Every sentence earns its place. If two words do the job, use two.
- Impersonal by default. Tata One World has no sentences starting with "I" or "The team". Other case studies keep first person only where it already exists and the author wrote it.

## No obligation

The copy describes and invites. It never lectures or commands the reader.

- Avoid "you have to", "you must", "you need to", "you should" and "we need to".
- Put the idea as a description or a consequence: "believe, and you become excellence" beats "you have to believe to become."
- Use "should" only in questions about what something should do, such as "what should come next?". Never as a rule for the reader.
- Avoid moral framing and slogans that tell the reader what to feel or do.

## Make it visual

The reader should see the thing. Prefer the concrete image to the abstract summary.

- "Teams of 20 to 25 designed, named and flew their own kites" beats "Teams took part in a kite activity."
- "Royal guards escorting guests to Tata cars" beats "Guests were welcomed."
- "Dhol beats filled the entrance" beats "Dhol musicians greeted them."
- Use plain, physical verbs: swirled, rippled, climbed, unfolded, stood, lit up.
- Avoid filler verbs: brought, delivered, gave, carried, held, ran (when a stronger verb fits).

## Rhythm and repetition

- Vary sentence length. Pair a short line with a longer one.
- Never repeat a word inside a paragraph. Use a synonym: gateway / threshold / opening; belief / conviction; blossomed / bloomed.
- Check each paragraph for doubled words such as "gave" twice or "two hundred" twice.
- Avoid "and the answer was", "one name, two readings" style constructions unless the paragraph needs the beat.
- Do not repeat a line the page already says in a trade-off or closing.

## Tense

- Past tense for what happened in the case: the events, the brief, the decisions.
- Present tense for general truths and what a design or motif means: "The lotus stands for...". Present is acceptable for the meaning of a motif.

## Facts

- Use only facts from the project deck or the author's own confirmation. Do not invent attendance, outcomes, quotes or dates.
- No dates or months, per the portfolio rule.
- Keep documented figures exactly: 350 guests, 45 countries, five challenge zones, four drone formations. The deck's 400 participants is noted in the file header, not on the page.
- Do not add engagement or outcome data where none exists (MCAPS Start has none).
- Keep required qualifications, such as the Pritam & Pedro execution note.

## Alignment

- Body paragraphs, emphasis lines and trade-off statements are justified (`text-justify`).
- Labels, captions, CTAs and centred hero elements keep their own alignment.

## Change control

- Check whether the case study is locked before editing. Locked case studies change only when the author explicitly asks.
- Change only what was asked. Report anything else separately.
- Do not commit or push unless the author asks.

## Workflow for a rewrite

1. Read the whole collection file and list the facts.
2. Stress-test: strategy, voice, rhythm, repetition, facts, visual clarity.
3. Edit with exact-string replacements. Keep the structure and keys.
4. Run `npx tsc --noEmit`.
5. If the page changed, check it in the browser: no banned sentence starts, no broken images, no horizontal overflow.
6. Show before and after for each line changed.
