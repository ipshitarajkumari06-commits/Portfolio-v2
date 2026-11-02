// Case copy — Tata Motors One World (Commercial Vehicles International Business, distributor meet).
// Approved narrative. Documented facts only, from the project deck and the author's confirmations.
// No dates or months, per the portfolio rule. Renders are from the proposal deck unless captioned as the final direction.
// Deck note: the proposal deck gives 350 PAX for the guest count (p2), but 400 participants in the Last Sword challenge (p49).
// The page keeps 350 and says all guests took part, per the author's confirmation. Public searches did not confirm either figure.

export const tataOneWorld = {
  kicker: "Commercial Vehicles International Business",
  discipline: "Brand Concept & Identity",
  title: "Tata Motors One World",

  question: "The name changed. What stays?",
  answer: "The programme stayed, and so did the arch and the lotus. The client liked the work but wanted a new theme name, so the team rebuilt the identity.",

  brief: {
    label: "The brief",
    paragraphs: [
      "One World is the annual distributor meet of Tata Motors Commercial Vehicles International Business. This seventh edition brought 350 guests from 45 countries to Fairmont Udaipur, and the theme had to hold them together.",
    ],
    scale: [
      { value: "350", label: "guests" },
      { value: "45", label: "countries" },
      { value: "5", label: "challenge zones" },
      { value: "4", label: "drone formations" },
    ],
  },

  choice: {
    label: "The first direction",
    paragraphs: [
      "The first direction was “Believe to become.” The direction drew on Udaipur itself: a peacock for pride and growth, a lotus for inner belief and purity of intent, architectural motifs for the city's craft, and a shikara for forward movement.",
      "The belief line became the mark. The team developed and proposed the BELIEVE identity, and it won the project.",
    ],
  },

  decisionOne: {
    label: "The logo as an argument",
    paragraphs: [
      "The wordmark set BE in red and LIEVE in navy. BE stood for BECOME, to be exceptional, so the red BE carried the whole line: you have to believe to become.",
      "The key visual placed those motifs around the wordmark, giving it a direct link to the city.",
    ],
    image: {
      src: "/images/tata-one-world/believe-key-visual.jpg",
      alt: "The BELIEVE key visual: a peacock, a chhatri, a shikara and lotus flowers around the BELIEVE wordmark",
      caption: "The BELIEVE key visual, as shown in the proposal.",
      width: 994,
      height: 1053,
    },
    rationale: {
      src: "/images/tata-one-world/logo-rationale.webp",
      alt: "The logo rationale slide: the BELIEVE key visual with each element labelled and explained",
      caption: "The thinking behind the logo.",
      width: 2000,
      height: 1179,
    },
  },

  decisionTwo: {
    label: "A quirkier name for every generation",
    paragraphs: [
      "The client had already chosen the first direction when it asked for a quirkier name. The network spans every generation, from new joiners in the market to its most senior members, so the name had to reach all of them. F.I.R.E. (Fearless Innovation, Resilient Execution) was my answer to that request.",
      "As an abbreviation, the name reaches both ends of that range. To younger audiences, FIRE means LIT, slang for something outstanding. To older audiences, it means on fire. As F.I.R.E., both meanings fit in one name.",
      "I chose to keep the arch and lotus from BELIEVE. For me, the arch is a doorway to greater things, and the lotus is inner belief, the blooming of excellence from within. Both let the reader see BELIEVE inside F.I.R.E.",
    ],
    image: {
      src: "/images/tata-one-world/fire-key-visual.webp",
      alt: "The F.I.R.E. key visual: a metallic F.I.R.E. wordmark under an arch, with lotus flowers, elephants and palms at dusk",
      caption: "The F.I.R.E. key visual, the final direction.",
      width: 2000,
      height: 1124,
    },
    continuity: [
      {
        label: "The arch",
        height: "h-[260px]",
        before: {
          src: "/images/tata-one-world/believe-arch.jpg",
          alt: "The BELIEVE jharokha arch, in green, set against the teal panel",
          caption: "BELIEVE: the arch, as shown in the proposal.",
          width: 280,
          height: 340,
        },
        after: {
          src: "/images/tata-one-world/fire-arch.jpg",
          alt: "The F.I.R.E. arch outline, glowing around the One World lockup",
          caption: "F.I.R.E.: the arch, in the final direction.",
          width: 800,
          height: 580,
        },
      },
      {
        label: "The lotus",
        height: "h-[90px]",
        before: {
          src: "/images/tata-one-world/believe-lotus.png",
          alt: "A pink lotus flower with its stem, from the BELIEVE key visual",
          caption: "BELIEVE: the lotus, as shown in the proposal.",
          width: 80,
          height: 80,
        },
        after: {
          src: "/images/tata-one-world/fire-lotus.jpg",
          alt: "A pink lotus flower on the F.I.R.E. backdrop, beside the arch",
          caption: "F.I.R.E.: the lotus, in the final direction.",
          width: 160,
          height: 210,
        },
      },
    ],
  },

  decisionThree: {
    label: "Keeping the programme's structure",
    paragraphs: [
      "The programme kept its three pillars, Collaborate, Connect and Celebrate, and the team adapted its activities to F.I.R.E. The Last Sword of Maharana Pratap, for example, sent all 350 guests through five challenge zones to restore a lost sword. Over the palace, drones spelled out ONE WORLD, TATA MOTORS, Better Always and F.I.R.E. in turn.",
    ],
    formations: {
      src: "/images/tata-one-world/fire-drone-formations.webp",
      alt: "A Tata Motors drone-show poster with four formations over the palace: ONE WORLD, TATA MOTORS, Better Always and F.I.R.E.",
      caption: "The four drone formations, as shared by Tata Motors.",
      width: 1226,
      height: 1568,
    },
    closeUp: {
      src: "/images/tata-one-world/fire-drone-close.jpg",
      alt: "Close-up of drone formations: ONE WORLD in lights, then F.I.R.E. under an arch of lights",
      caption: "Close-up of the drone formations: ONE WORLD, then F.I.R.E. under an arch of lights.",
      width: 1110,
      height: 2000,
    },
  },

  // Each frame holds two scenes side by side.
  scenes: [
    [
      { src: "/images/tata-one-world/scene-city-of-lakes.jpg", alt: "Guests in a group at the City of Lakes, holding One World banners", caption: "City of Lakes." },
      { src: "/images/tata-one-world/scene-team-building-cropped.jpg", alt: "Team-building moment with guests gathered outside the palace", caption: "Team building." },
    ],
    [
      { src: "/images/tata-one-world/scene-chand-baori-night.jpg", alt: "The Chand Baori night setting, lit for the evening", caption: "Chand Baori at night." },
      { src: "/images/tata-one-world/scene-truck-stage.jpg", alt: "A Tata Motors truck on the stage in front of the audience", caption: "A Tata truck on stage." },
    ],
    [
      { src: "/images/tata-one-world/scene-driven-by-innovation-cropped.jpg", alt: "Tata Motors trucks with guests gathered for the ribbon cutting", caption: "Driven by innovation." },
      { src: "/images/tata-one-world/scene-rewarding-champions.jpg", alt: "The awards stage, with winners on stage and guests in the audience", caption: "Rewarding the champions." },
    ],
    [
      { src: "/images/tata-one-world/scene-truck-one-world.jpg", alt: "ONE WORLD lettering in front of a Tata Motors truck", caption: "ONE WORLD, in front of a truck." },
      { src: "/images/tata-one-world/scene-truck-cab.jpg", alt: "The cab and dashboard of a Tata Motors truck", caption: "Inside the truck cab." },
    ],
  ],

  videos: [
    { label: "Watch: When Leadership Inspires", url: "https://www.youtube.com/shorts/EyMIW558Blg" },
    { label: "Watch: Ideas, Conversations & Connection", url: "https://www.youtube.com/shorts/XZbexiLyHS0" },
    { label: "Listen: Every Beat. One Vision.", url: "https://www.youtube.com/watch?v=-Z5DtzTkW8o" },
    { label: "Watch: Shaping the Future of Mobility", url: "https://www.youtube.com/watch?v=9CN9HLZRMx8" },
    { label: "Watch: The countdown begins", url: "https://www.youtube.com/shorts/lC2jfSss-rA" },
  ],

  tradeOff: "The cost was rebuilding a finished identity. The team spent that time brainstorming and adjusting the programme to it. The payoff was a new creative direction, and the team delivered the project successfully.",

  thesis: "The look was rebuilt around a programme that could carry it.",

  closing: {
    lead: "The name was new. The job was not.",
    accent: "The same 350 guests from 45 countries still had to be held together.",
  },
};
