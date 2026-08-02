// Locked copy — HUM.AI.N, Tata Motors.
// Do not edit prose here without going back through the same editorial pass this went through.

export const humAiN = {
  kicker: "Tata Motors",
  discipline: "Narrative Strategy",

  brief: {
    line: "The brief was one line.",
    statement: "Create a YouTube series.",
    continuation: "Nothing else followed.",
    enumeration:
      "Not a subject. Not a tone. Not a single idea about what Tata Motors should say, or to whom it should say it.",
    question: "What would you do when the brief told you what to make, but not what to say?",
  },

  // Past tense, deliberately: this spread narrates the strategist's own
  // completed reasoning, distinct from the campaign's still-in-production
  // status elsewhere in the Collection.
  firstInstinct: {
    lines: [
      "My first instinct was AI.",
      "AI was the defining conversation of the moment.",
      "But that would have been another AI campaign.",
    ],
    displayLead: "The real question was:",
    display: "What made this Tata Motors?",
  },

  research: {
    opening: "I mapped everything AI was already contributing across Tata Motors.",
    list: [
      "From manufacturing.",
      "To engineering.",
      "To quality.",
      "To logistics.",
      "To mobility.",
      "To customer experience.",
    ],
    reflection: ["The deeper I went,", "the clearer one thing became."],
    closing: "It was never a one-sided relationship.",
  },

  // The two notebook lists. Word order is fixed and meaningful: index 0
  // in the human list ("Intent") is the one word that survives into the
  // final state. Do not reorder without updating Notebook.tsx.
  test: {
    ai: ["Scale", "Precision", "Memory", "Pattern Recognition", "Prediction"],
    human: ["Intent", "Judgement", "Empathy", "Experience", "Purpose"],
  },

  // Restated after the notebook, in the strategist's own words rather than
  // the notebook's visual proof. Does not repeat "It was never a one-sided
  // relationship." from research.closing — the notebook already proved
  // that; this picks the thought up from there.
  realisation: {
    lines: [
      "AI was becoming more capable.",
      "Human intent decided what that capability was for.",
    ],
  },

  idea: "AI shaped by human intent.",

  // Quiet typographic transform, not a morph or particle effect. "Human"
  // gains one word mid-string to become "Humane", then the whole word
  // resolves into "HUM.AI.N". Three holds, not two.
  transformation: {
    human: "Human",
    humane: "Humane",
    final: "HUM.AI.N",
  },

  ending: {
    line: "Coming soon.",
    principle: "One principle.",
    stories: "Ten stories.",
  },

  // NOT USED in the current architecture (superseded by The First
  // Instinct / The Test / The Pivot). Preserved rather than deleted,
  // this project has no version control, so there is no other way to
  // recover this if the sequence reverts. Verified against the real
  // source material; do not repurpose without the same editorial pass.
  landscape:
    "A single number, C75, is built from four billion kilometres of real Indian driving, the first voluntarily published range standard of its kind.",
  field: [
    "A panel gap, measured in fractions of a millimetre, checked by a vision system built to catch what a human eye would miss.",
    "A dashboard glowing at midnight, tracking a fleet whose driver is already asleep.",
    "A truck moving through the night, its route logged for efficiency. At a rest stop, the same driver waters a sapling at the edge of a city.",
    "A factory worker describing a fault out loud, in his own language, to a system built to understand it.",
    "A car reaching the end of its life. Its steel sorted, melted, reshaped into a new one. Somewhere in the same company, a person is offered a second career.",
    "An ambulance moving through an empty street at three in the morning.",
  ],
};
