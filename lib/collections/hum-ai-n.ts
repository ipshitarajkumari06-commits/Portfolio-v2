// Copy — HUM.AI.N, Tata Motors.

export const humAiN = {
  kicker: "Tata Motors",
  discipline: "Narrative Strategy",

  brief: {
    line: "The brief was one line.",
    statement: "Create a YouTube series.",
    continuation: "Nothing else followed.",
    enumeration:
      "Not a subject, a tone or an idea.",
    question: "What do you do when the brief tells you what to make, but not what to say?",
  },

  // Past tense, deliberately: this spread narrates the strategist's own
  // completed reasoning, distinct from the campaign's still-in-production
  // status elsewhere in the Collection.
  firstInstinct: {
    lines: [
      "My first instinct was AI.",
      "Every panel and pitch deck was talking about it.",
      "But that would have been another AI campaign.",
      "AI is contested, and a campaign that only displayed it would join the argument. Any answer had to account for the people making it, because who builds it decides what the effort is worth.",
    ],
    displayLead: "The real issue was:",
    display: "What makes this Tata Motors?",
  },

  research: {
    opening: "AI was at work across Tata Motors, on several fronts.",
    summary: "From manufacturing to engineering, quality, logistics, mobility and customer experience.",
    reflection: ["The deeper I went,", "the thread kept leading back to people."],
    closing: "Each of these results had a hand behind it.",
  },

  // Confirmed, attributed claims. No dates, per the portfolio rule.
  insights: {
    label: "Insights",
    items: [
      {
        text: "Tata Group had more than 100 GenAI projects under way.",
        source: "N Chandrasekaran, Tata Group chairman, at the TCS annual general meeting",
      },
      {
        text: "A technician asks ServiceSage a vehicle diagnostics question in plain language, and generative AI answers it.",
        source: "Tata Motors, as described in a MathWorks customer story",
      },
      {
        text: "A public charging network of more than 25,000 chargers, spread across more than 150 cities, serves Tata Motors' electric small commercial vehicles.",
        source: "Tata Motors",
      },
    ],
  },

  // The two notebook lists. Word order is fixed and meaningful: index 0
  // in the human list ("Intent") is the one word that survives into the
  // final state. Do not reorder without updating Notebook.tsx.
  test: {
    ai: ["Scale", "Precision", "Memory", "Pattern Recognition", "Prediction"],
    human: ["Intent", "Judgement", "Empathy", "Experience", "Creativity"],
    rule: "Strike every capability from both lists. One word stays.",
  },

  // Restated after the notebook, in the strategist's own words rather than
  // the notebook's visual proof. Picks the thought up from there.
  realisation: {
    lines: [
      "AI was becoming more capable.",
      "Ability was never the open question. Intent was.",
    ],
  },

  answer: "The brief said what to make. The strategy said what to say.",

  idea: "Tata Motors leads generative AI in India's automobile industry, with the principle that guided its work long before the current wave.",

  connector: "That intent lent the approach its name.",

  // Quiet typographic transform, not a morph or particle effect. "Human"
  // gains one word mid-string to become "Humane", then the whole word
  // resolves into "HUM.AI.N". Three holds, not two.
  transformation: {
    human: "Human",
    humane: "Humane",
    final: "HUM.AI.N",
  },

};
