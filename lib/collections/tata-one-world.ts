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
  answer: "The programme held, and the arch and the lotus came through the change. A new name, however, meant a rebuilt identity.",

  brief: {
    label: "The brief",
    paragraphs: [
      "One World was the annual distributor meet of Tata Motors Commercial Vehicles International Business. Its seventh edition drew 350 guests from 45 countries to Fairmont Udaipur, and the theme had to bind them together.",
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
      "The first direction was “Believe to become.” It drew on Udaipur itself: a peacock for pride and growth, a lotus for inner belief and purity of intent, architectural motifs for the city’s craft, and a shikara for forward movement.",
      "The belief line became the mark, and the BELIEVE identity won the project. The client liked the work but wanted a name flexible enough to reach every generation, which meant rebuilding the identity.",
    ],
  },

  decisionOne: {
    label: "The logo as an argument",
    paragraphs: [
      "The wordmark set BE in red and LIEVE in navy. BE stood for BECOME EXCELLENCE, and the tagline’s B and E were red too. Read together, the line says: you have to believe to become.",
    ],
    rationale: {
      src: "/images/tata-one-world/logo-rationale.webp",
      alt: "The logo rationale slide: the BELIEVE key visual with each element labelled and explained",
      caption: "The thinking behind the logo, element by element.",
      width: 2000,
      height: 1179,
    },
  },

  decisionTwo: {
    label: "Why F.I.R.E. worked for both ends",
    paragraphs: [
      "The network stretched across every generation, from new joiners in the market to its most senior members. One name had to reach all of them, and F.I.R.E. did.",
      "Guests first met the name on the microsite, where they shook, tilted and dragged their phones to uncover the theme.",
      { text: "One name, two readings.", emphasis: true },
      "As an abbreviation, the name reached both ends of that range: FIRE meant LIT to younger audiences and on fire to older ones. Spelled out as F.I.R.E., for Fearless Innovation and Resilient Execution, it carried both meanings.",
      "The arch and the lotus carried over from BELIEVE. The arch stood as a gateway to greater things, honouring Udaipur at the same time. The lotus, India’s national flower, blossomed as an emblem of inner conviction and of excellence that grows from within. The elephants symbolised the shikara’s movement into a journey, while the waves showed everyone advancing as one world. Together, these distinctly Indian motifs opened the way to greatness for everyone.",
    ],
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
    label: "The programme, on the ground",
    paragraphs: [
      "The welcome began at the airport, with royal guards escorting guests to Tata cars. At the palace, Ghoomar dancers swirled and dhol beats filled the entrance.",
      "The programme kept its three pillars, Collaborate, Connect and Celebrate, and each one took on the F.I.R.E. theme.",
      "Collaborate opened with team building. Teams of 20 to 25 designed, named and flew their own kites, each carrying a belief statement of what ignited them to be excellent. In the Royal Runway, teams turned into stylists, models and designers for a day, haggling at a bazaar on a fictitious budget. The Last Sword of Maharana Pratap then sent all 350 guests through five challenge zones to restore a lost sword.",
      "Connect rolled Tata vehicles onto the ground. Fleet Verse, Fleet Edge and FleetCare ran as touch-screen kiosks beside e-Dukaan, and a display of Tata vehicles stood in the parking area.",
      "Celebrate closed the week with a gala night. A decorated commercial vehicle led a baraat up to the forecourt, and the awards followed.",
      { text: "Every pillar had a moment on the ground.", emphasis: true },
      "The belief reached the sky, too. Over the palace, drones lit up in turn, spelling out ONE WORLD, TATA MOTORS, Better Always and F.I.R.E.",
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
      caption: "Close-up: ONE WORLD, then F.I.R.E. under an arch of lights.",
      width: 1110,
      height: 2000,
    },
  },

  // Each frame holds two scenes side by side.
  scenes: [
    [
      { src: "/images/tata-one-world/scene-city-of-lakes.jpg", alt: "Guests in a group at the City of Lakes, holding One World banners", caption: "Guests gather at the City of Lakes, holding One World banners." },
      { src: "/images/tata-one-world/scene-team-building-cropped.jpg", alt: "Team-building moment with guests gathered outside the palace", caption: "Teams gather outside the palace." },
    ],
    [
      { src: "/images/tata-one-world/scene-chand-baori-night.jpg", alt: "The Chand Baori night setting, lit for the evening", caption: "The Chand Baori, lit for the night." },
      { src: "/images/tata-one-world/scene-truck-stage.jpg", alt: "A Tata Motors truck on the stage in front of the audience", caption: "A Tata truck takes the stage." },
    ],
    [
      { src: "/images/tata-one-world/scene-driven-by-innovation-cropped.jpg", alt: "Tata Motors trucks with guests gathered for the ribbon cutting", caption: "Trucks and guests at the ribbon cutting." },
      { src: "/images/tata-one-world/scene-rewarding-champions.jpg", alt: "The awards stage, with winners on stage and guests in the audience", caption: "Winners take the awards stage." },
    ],
    [
      { src: "/images/tata-one-world/scene-truck-one-world.jpg", alt: "ONE WORLD lettering in front of a Tata Motors truck", caption: "ONE WORLD, in front of a truck." },
      { src: "/images/tata-one-world/scene-truck-cab.jpg", alt: "The cab and dashboard of a Tata Motors truck", caption: "The cab and dashboard, up close." },
    ],
  ],

  videos: [
    { label: "Watch: When Leadership Inspires", url: "https://www.youtube.com/shorts/EyMIW558Blg" },
    { label: "Watch: Ideas, Conversations & Connection", url: "https://www.youtube.com/shorts/XZbexiLyHS0" },
    { label: "Listen: Every Beat. One Vision.", url: "https://www.youtube.com/watch?v=-Z5DtzTkW8o" },
    { label: "Watch: Shaping the Future of Mobility", url: "https://www.youtube.com/watch?v=9CN9HLZRMx8" },
    { label: "Watch: The countdown begins", url: "https://www.youtube.com/shorts/lC2jfSss-rA" },
  ],

  tradeOff: "Rebuilding a finished identity cost time, but the reworked programme still held 350 guests together.",

  thesis: "A new look needed a programme strong enough to carry it.",

  closing: {
    lead: "The name was new. The job was not.",
    accent: "The same 350 guests from 45 countries still had to be held together.",
  },
};
