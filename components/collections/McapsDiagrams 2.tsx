// Explanatory diagrams for the MCAPS Start FY27 case. Flat, labelled, and not
// renders or photographs. The sequence and the connection are shown directly.

const CARD = "rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm md:p-8";
const LABEL = "font-sans text-[12px] uppercase tracking-[0.14em] text-fg/60";
const BLUE = "#BFD9FF";
const LILAC = "#C9B8FF";
const GREEN = "#B5E8C8";
const INK = "rgba(243,237,224,0.85)";
const RULE = "rgba(243,237,224,0.35)";

// Seven days of daily challenges, then the two event days, in one sequence.
export function TimelineDiagram() {
  const days = Array.from({ length: 7 }, (_, i) => ({ x: 60 + i * 60, label: `D-${7 - i}` }));
  const event = [
    { x: 490, label: "Day 1" },
    { x: 550, label: "Day 2" },
  ];
  return (
    <figure className={CARD}>
      <figcaption className={LABEL}>Diagram, not a render</figcaption>
      <svg viewBox="0 0 600 190" className="mt-6 h-auto w-full" role="img" aria-label="Seven daily challenges before the event, then two event days">
        <line x1="30" y1="100" x2="575" y2="100" stroke={RULE} strokeWidth="2" />

        <text x="240" y="48" textAnchor="middle" fill={INK} fontSize="14">One challenge unlocks each day</text>
        {days.map((d) => (
          <g key={d.label}>
            <circle cx={d.x} cy="100" r="7" fill={BLUE} />
            <text x={d.x} y="128" textAnchor="middle" fill={INK} fontSize="13">{d.label}</text>
          </g>
        ))}

        <path d="M 465 84 L 465 70 L 575 70 L 575 84" fill="none" stroke={RULE} strokeWidth="1.5" />
        <text x="520" y="56" textAnchor="middle" fill={INK} fontSize="14">Event, two days</text>
        {event.map((e) => (
          <g key={e.label}>
            <circle cx={e.x} cy="100" r="10" fill={LILAC} />
            <text x={e.x} y="128" textAnchor="middle" fill={INK} fontSize="13">{e.label}</text>
          </g>
        ))}

        <text x="520" y="172" textAnchor="middle" fill={INK} fontSize="13">Synced across three cities</text>
      </svg>
    </figure>
  );
}

// Three cities after the reference: white volumes and glass towers, spread
// across one dark base. A live loop links the three city tops and passes
// above the skyline, so it never crosses a building.
const S = 20;
const OX = 300;
const OY = 150;
const GLOW = "#F59E0B";
const WIRE = "#FDE68A";

function iso(x: number, y: number, z: number): [number, number] {
  return [OX + (x - y) * 0.866 * S, OY + (x + y) * 0.5 * S - z * S];
}

function pts(list: [number, number, number][]) {
  return list.map(([x, y, z]) => iso(x, y, z).map((v) => v.toFixed(1)).join(",")).join(" ");
}

type Box = { x0: number; y0: number; w: number; d: number; z0: number; z1: number };

// A solid with top, right and front faces, dressed like a building: lit window
// grids on both visible walls, a stepped roofline, and rooftop plant.
const hash = (a: number, b: number, c: number) => Math.abs(Math.sin(a * 12.9898 + b * 78.233 + c * 37.719) * 43758.5453) % 1;

function Solid({
  b,
  top,
  right,
  front,
  glass = false,
  seed = 1,
  roof = false,
}: {
  b: Box;
  top: string;
  right: string;
  front: string;
  glass?: boolean;
  seed?: number;
  roof?: boolean;
}) {
  const { x0, y0, w, d, z0, z1 } = b;
  const x1 = x0 + w;
  const y1 = y0 + d;
  const topFace: [number, number, number][] = [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
  const rightFace: [number, number, number][] = [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]];
  const frontFace: [number, number, number][] = [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]];
  const windows: JSX.Element[] = [];
  if (z1 - z0 > 0.9) {
    const cell = (u0: number, u1: number, v0: number, v1: number, key: string, lit: number, onFront: boolean) => {
      const quad: [number, number, number][] = onFront
        ? [[u0, y1 + 0.01, v0], [u1, y1 + 0.01, v0], [u1, y1 + 0.01, v1], [u0, y1 + 0.01, v1]]
        : [[x1 + 0.01, u0, v0], [x1 + 0.01, u1, v0], [x1 + 0.01, u1, v1], [x1 + 0.01, u0, v1]];
      windows.push(
        <polygon key={key} points={pts(quad)} fill="#FBBF24" fillOpacity={lit > 0.35 ? 0.45 + lit * 0.5 : 0.12} />,
      );
    };
    for (let v = z0 + 0.25; v + 0.28 < z1; v += 0.46) {
      for (let u = x0 + 0.18; u + 0.26 < x1; u += 0.4) {
        cell(u, u + 0.26, v, v + 0.28, `f${u}-${v}`, hash(seed, u * 10, v * 10), true);
      }
      for (let u = y0 + 0.18; u + 0.26 < y1; u += 0.4) {
        cell(u, u + 0.26, v, v + 0.28, `r${u}-${v}`, hash(seed + 3, u * 10, v * 10), false);
      }
    }
  }
  const plant = roof
    ? {
        x0: x0 + w * 0.25,
        y0: y0 + d * 0.25,
        w: w * 0.3,
        d: d * 0.3,
        z0: z1,
        z1: z1 + 0.4,
      }
    : null;
  return (
    <g>
      <polygon points={pts(rightFace)} fill={right} />
      <polygon points={pts(frontFace)} fill={front} />
      {windows}
      <polygon points={pts(topFace)} fill={top} stroke="rgba(251,191,36,0.25)" strokeWidth="0.6" />
      {plant ? (
        <g>
          <polygon points={pts([[plant.x0, plant.y0 + plant.d, plant.z0], [plant.x0 + plant.w, plant.y0 + plant.d, plant.z0], [plant.x0 + plant.w, plant.y0 + plant.d, plant.z1], [plant.x0, plant.y0 + plant.d, plant.z1]])} fill={front} />
          <polygon points={pts([[plant.x0 + plant.w, plant.y0, plant.z0], [plant.x0 + plant.w, plant.y0 + plant.d, plant.z0], [plant.x0 + plant.w, plant.y0 + plant.d, plant.z1], [plant.x0 + plant.w, plant.y0, plant.z1]])} fill={right} />
          <polygon points={pts([[plant.x0, plant.y0, plant.z1], [plant.x0 + plant.w, plant.y0, plant.z1], [plant.x0 + plant.w, plant.y0 + plant.d, plant.z1], [plant.x0, plant.y0 + plant.d, plant.z1]])} fill={top} />
        </g>
      ) : null}
    </g>
  );
}

const WHITE = { top: "#3b4a61", right: "#273447", front: "#1e2a3c" };
const GLASS = { top: "#2c3b52", right: "#1b2739", front: "#15202f" };
const BASE = { top: "#162134", right: "#0f1828", front: "#0b121f" };

// A closed route through ground points, with rounded corners, as in the reference.
function roundedRoute(list: [number, number, number][], radii: number[]): string {
  const n = list.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const prev = list[(i - 1 + n) % n];
    const cur = list[i];
    const next = list[(i + 1) % n];
    const toPrev = [prev[0] - cur[0], prev[1] - cur[1]];
    const toNext = [next[0] - cur[0], next[1] - cur[1]];
    const lp = Math.hypot(toPrev[0], toPrev[1]);
    const ln = Math.hypot(toNext[0], toNext[1]);
    const r = radii[i];
    const a = [cur[0] + (toPrev[0] / lp) * r, cur[1] + (toPrev[1] / lp) * r, cur[2]];
    const b = [cur[0] + (toNext[0] / ln) * r, cur[1] + (toNext[1] / ln) * r, cur[2]];
    const [ax, ay] = iso(a[0], a[1], a[2]);
    const [cx, cy] = iso(cur[0], cur[1], cur[2]);
    const [bx, by] = iso(b[0], b[1], b[2]);
    d += i === 0 ? `M ${ax.toFixed(1)} ${ay.toFixed(1)} ` : `L ${ax.toFixed(1)} ${ay.toFixed(1)} `;
    d += `Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)} `;
  }
  return d + "Z";
}

export function SyncDiagram() {
  const cityA: [Box, boolean][] = [
    [{ x0: 0.2, y0: 6.2, w: 2.8, d: 3.0, z0: 0.4, z1: 1.8 }, false],
    [{ x0: 3.2, y0: 7.6, w: 1.4, d: 1.4, z0: 0.4, z1: 1.1 }, false],
  ];
  const cityB: [Box, boolean][] = [
    [{ x0: 8.6, y0: 0.2, w: 2.2, d: 2.2, z0: 0.8, z1: 5.4 }, true],
    [{ x0: 9.2, y0: 0.8, w: 1.0, d: 1.0, z0: 5.4, z1: 6.2 }, true],
    [{ x0: 7.4, y0: 2.6, w: 1.6, d: 1.4, z0: 0.8, z1: 2.2 }, false],
    [{ x0: 11.2, y0: -0.2, w: 1.2, d: 1.2, z0: 0.8, z1: 1.6 }, false],
  ];
  const cityC: [Box, boolean][] = [
    [{ x0: 16.6, y0: 6.2, w: 2.0, d: 2.0, z0: 0.4, z1: 3.6 }, true],
    [{ x0: 18.8, y0: 7.4, w: 1.8, d: 2.0, z0: 0.4, z1: 1.6 }, false],
  ];
  const groundA: [number, number, number] = [1.6, 9.8, 0.05];
  const groundB: [number, number, number] = [9.7, 3.0, 0.05];
  const groundC: [number, number, number] = [17.6, 8.8, 0.05];
  const ground: [number, number, number][] = [groundA, groundB, groundC, [9.7, 13.0, 0.05]];
  // City points stay sharp so the route lands on each city; the bottom corner is rounded.
  const route = roundedRoute(ground, [0, 0, 0, 2.2]);
  const junctions = ground.map((g, i) => {
    const nx = ground[(i + 1) % ground.length];
    return iso((g[0] + nx[0]) / 2, (g[1] + nx[1]) / 2, 0.05);
  });
  const hubA = iso(...groundA);
  const hubB = iso(...groundB);
  const hubC = iso(...groundC);
  return (
    <figure className={CARD}>
      <figcaption className={LABEL}>Diagram, not a render</figcaption>
      <svg viewBox="0 0 600 512" className="mt-6 h-auto w-full" role="img" aria-label="Three cities on one base, joined by a live amber loop, where one city's actions affect another">
        <defs>
          <radialGradient id="mcaps-halo">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </radialGradient>
          <filter id="mcaps-wire" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <Solid b={{ x0: -1, y0: -2, w: 22, d: 16, z0: -0.4, z1: 0 }} top={BASE.top} right={BASE.right} front={BASE.front} />
        {[iso(1.8, 7.7, 0), iso(9.7, 1.3, 0), iso(17.6, 7.2, 0)].map(([x, y], i) => (
          <ellipse key={`halo${i}`} cx={x} cy={y} rx="95" ry="48" fill="url(#mcaps-halo)" />
        ))}
        {Array.from({ length: 12 }, (_, i) => -1 + i * 2).map((x) => {
          const [ax, ay] = iso(x, -2, 0);
          const [bx, by] = iso(x, 14, 0);
          return <line key={`gx${x}`} x1={ax} y1={ay} x2={bx} y2={by} stroke="rgba(251,191,36,0.07)" strokeWidth="1" />;
        })}
        {Array.from({ length: 9 }, (_, i) => -2 + i * 2).map((y) => {
          const [ax, ay] = iso(-1, y, 0);
          const [bx, by] = iso(21, y, 0);
          return <line key={`gy${y}`} x1={ax} y1={ay} x2={bx} y2={by} stroke="rgba(251,191,36,0.07)" strokeWidth="1" />;
        })}
        {[...cityA, ...cityB, ...cityC].map(([b, g], i) => (
          <Solid key={i} b={b} top={g ? GLASS.top : WHITE.top} right={g ? GLASS.right : WHITE.right} front={g ? GLASS.front : WHITE.front} glass={g} seed={i * 5 + 1} roof={!g} />
        ))}
        <path d={route} fill="none" stroke={GLOW} strokeWidth="9" strokeOpacity="0.35" strokeLinejoin="round" filter="url(#mcaps-wire)" />
        <path d={route} fill="none" stroke={GLOW} strokeWidth="4" strokeLinejoin="round" />
        <path d={route} fill="none" stroke={WIRE} strokeWidth="1.2" strokeLinejoin="round" />
        <style>{`@media (prefers-reduced-motion: reduce) { .mcaps-pulse { display: none; } }`}</style>
        {[groundA, groundB, groundC].map((g, i) => {
          const [hx, hy] = iso(g[0], g[1], g[2]);
          return (
            <g key={`hub${i}`}>
              <circle cx={hx} cy={hy} r="8" fill="#0b1220" stroke={GLOW} strokeWidth="2" />
              <circle cx={hx} cy={hy} r="3" fill={WIRE} />
            </g>
          );
        })}
        {[0, 1.2, 2.4, 3.6, 4.8, 6.0].map((begin) => (
          <g key={`small${begin}`} className="mcaps-pulse">
            <animateMotion dur="7s" repeatCount="indefinite" begin={`-${begin}s`} path={route} />
            <circle r="3.5" fill={WIRE} />
          </g>
        ))}
        {[0, 2.3, 4.6].map((begin) => (
          <g key={`pulse${begin}`} className="mcaps-pulse">
            <animateMotion dur="7s" repeatCount="indefinite" begin={`-${begin}s`} path={route} />
            <circle r="12" fill={GLOW} fillOpacity="0.45" />
            <circle r="5" fill="#ffffff" />
          </g>
        ))}

        {[hubA, hubB, hubC].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill={WIRE} filter="url(#mcaps-wire)" />
        ))}
        {[
          ["Bengaluru", iso(1.8, 7.7, 2.6)],
          ["Mumbai", iso(9.7, 1.3, 6.2)],
          ["Gurugram", iso(17.6, 7.2, 4.4)],
        ].map(([name, [x, y]]) => (
          <text key={name as string} x={x as number} y={(y as number) + 6} textAnchor="middle" fill="#F3EDE0" fontSize="18">{name as string}</text>
        ))}
        <text x="300" y="506" textAnchor="middle" fill="#F3EDE0" fontSize="15">One live loop: one city&apos;s actions affect another</text>
      </svg>
    </figure>
  );
}
