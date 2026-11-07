// Case copy — Collins Aerospace, Bengaluru (inauguration of the B2 Building and Supplier Conference).
// Documented facts only, from the project deck and the author's confirmations.
// No dates or months, per the portfolio rule. Renders are from the proposal deck.
// Attendance confirmed by the author: 2,500 across the event; 1,500–2,000 at the inauguration.

export const collinsAerospace = {
  discipline: "Event Design",
  kicker: "Collins Aerospace",
  title: "Opening the B2 Building",

  question: "How do you open a building and host a supplier base in one event?",
  answer: "Four audiences. Four doors. One building in the middle.",

  brief: {
    label: "The brief",
    paragraphs: [
      "Collins Aerospace had two jobs in one event: open its B2 Building in Bengaluru and host its suppliers. It started with employees at an all-hands and ended with a supplier conference, with an inauguration and an industry conclave in between.",
    ],
    scale: [
      { value: "2,500", label: "attendees" },
      { value: "1,500–2,000", label: "at the inauguration" },
      { value: "4", label: "entry routes" },
    ],
  },

  choice: {
    label: "Why this theme",
    blocks: [
      {
        label: "The inauguration",
        value: "Igniting Limitless Possibilities",
        paragraphs: [
          "The leadership's vision for the company became the theme. The backdrop, drawn from the same mark, rendered that vision in Collins's brand palette.",
          "Its rings layered across most of the design, with red flights tracing their curves. Beneath them, lines swept from left to right, and a scarlet block curved along the bottom as the horizon. Together, the rings and lines turned that vision into a picture.",
          "The cityscape, with its landmarks, lined the side panels. The arcs ran off the edge of the frame, and the message went with them: Collins was igniting limitless possibilities in India.",
        ],
        image: {
          src: "/images/collins-aerospace/stage-backdrop.webp",
          alt: "The stage under the Igniting Limitless Possibilities backdrop, with circular paths and red flights, and the speaker at the lectern",
          caption: "The backdrop on stage.",
          width: 1440,
          height: 960,
        },
      },
    ],
  },

  decisionOne: {
    label: "Arrival, door by door",
    paragraphs: [
      "Each route had its own entrance. Employees began in the Site 4 cafeteria. The Chief Minister and Deputy Chief Minister had a gate and lounge of their own. VIPs had a drop-off point and a holding area. General guests and media shared a branded arch, then separated at the desk.",
      "Guests confirmed on an RSVP microsite and received a QR code by email or WhatsApp. At the registration desk, the code was exchanged for a name badge, and its access details set the areas each guest could enter.",
    ],
    routes: [
      { label: "Employees", door: "Site 4 cafeteria" },
      { label: "Chief Minister and Deputy CM", door: "Gate and lounge" },
      { label: "VIPs", door: "Drop-off and holding area" },
      { label: "General guests and media", door: "Branded arch" },
    ],
  },

  decisionTwo: {
    label: "One curtain, one building",
    paragraphs: [
      "The inauguration opened with rituals. A traditional felicitation welcomed the two leaders, and a lamp lit the celebration. A brand film traced the company's journey across the main screen, before both unveiled a plaque. The Chief Minister then rode a golf cart to the viewing gallery.",
      "From the gallery, a ribbon and curtain veiled the building. The pair pressed the button, and the curtain dropped away. Confetti burst, balloons rose, and the LED screen flared to life as the building stood revealed.",
    ],
    image: {
      src: "/images/collins-aerospace/building-unveil.jpg",
      alt: "Render of the building unveil with the LED screen lit",
      caption: "The building, as rendered, lit after the curtain drop.",
      width: 1467,
      height: 765,
    },
    // Event photos, credited to the accounts that posted them.
    photos: [
      {
        src: "/images/collins-aerospace/group.jpg",
        alt: "Collins Aerospace and state leaders on stage under the Igniting Limitless Possibilities backdrop",
        caption: "Leaders on stage.",
        width: 1094,
        height: 730,
      },
      {
        src: "/images/collins-aerospace/kiosk-tour.jpg",
        alt: "Guests gathered around a Collins Aerospace display as a leader looks at the screen",
        caption: "Guests at a product display, mid-tour.",
        width: 1280,
        height: 853,
      },
      {
        src: "/images/collins-aerospace/lectern-speaker.jpg",
        alt: "A speaker at the lectern under the Igniting Limitless Possibilities backdrop",
        caption: "Speaking at the lectern.",
        width: 1198,
        height: 798,
      },
      {
        src: "/images/collins-aerospace/audience-view.jpg",
        alt: "The view from the stage over the seated audience, with the screen showing the speaker",
        caption: "The view from the stage.",
        width: 1440,
        height: 960,
      },
      {
        src: "/images/collins-aerospace/aircraft-timeline.jpg",
        alt: "Red aircraft models on a curved wall beside a sculpture of a boy launching a paper plane",
        caption: "The aircraft timeline at the entrance.",
        width: 1440,
        height: 1920,
      },
      {
        src: "/images/collins-aerospace/arch.jpg",
        alt: "The branded arch at the event entrance, with guests walking the red carpet",
        caption: "Under the branded arch.",
        width: 1478,
        height: 830,
      },
    ],
  },

  decisionThree: {
    label: "The supplier conference, on the same path",
    paragraphs: [
      "The supplier conference was framed by Collaborative Growth, a theme about growing as partners.",
      "The conclave and the suppliers shared one path. Branded cubes and LED standees lined it on the way to the product area, where a digital wall showed what Collins makes.",
      "A glass of neer mor, a spiced buttermilk, met each guest while Karnataka music played in the pre-function area.",
    ],
  },

  videos: [
    { label: "Watch: Glimpses from the inauguration", url: "https://www.facebook.com/DrSudhakarK.Official/videos/glimpses-from-the-inauguration-of-collins-aerospaces-new-manufacturing-facility/1277145977517123/" },
    { label: "Read: RTX press release on the Bengaluru site", url: "https://www.rtx.com/news/news-center/2025/11/11/rtxs-collins-aerospace-unveils-new-manufacturing-site-in-bengaluru" },
  ],

  tradeOff:
    "Keeping four routes apart meant more planning up front.",

  thesis: "The building was the moment every route led to.",
};
