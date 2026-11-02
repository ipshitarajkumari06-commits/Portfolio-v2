"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";

// Explanatory diagrams for the MCAPS Start FY27 case. Labelled, and not renders or
// photographs. The sequence and the connection are shown directly.

const CARD = "rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm md:p-8";
const LABEL = "font-sans text-[12px] uppercase tracking-[0.14em] text-fg/60";
const AMBER = "#F59E0B";
const CORE = "#FDE68A";
const NAVY = "#0b1220";
const SLAB = "#1b2740";
const INK = "rgba(243,237,224,0.9)";
const RULE = "rgba(243,237,224,0.35)";
const CYCLE = 12;

// The run of seven daily challenges, then the two event days, as frosted glass tiles.
// Each day tile carries its challenge name below it. Hovering or focusing a tile lifts it and shows a summary.
const DAYS = ["D-7", "D-6", "D-5", "D-4", "D-3", "D-2", "D-1"];
const EVENT_DAYS = ["Event 1", "Event 2"];

// Challenges from the proposal deck (slides 13 to 15). The 3-minute reset runs every day.
// The wellbeing task and mind challenge per day are a random draw, not a confirmed order.
const RESET_LINE = "A three-minute guided breathing reset, every day.";
const WELLBEING_DETAIL: Record<string, string> = {
  "Hook step": "A hook-step dance challenge, easy enough for anyone to join.",
  "Desk yoga": "A 5-minute desk yoga session.",
  "Beginner workout": "A 10-minute beginner workout.",
};
const MIND_DETAIL: Record<string, string> = {
  Crossword: "Solve a crossword by filling in the right habits.",
  "Word sprint": "Make as many words as possible from a set of letters in 60 seconds.",
  "Guess the Hero": "Identify office heroes from short AI-generated descriptions.",
  "Creative challenge": "A creative challenge that stretches the mind sideways.",
  "Logic puzzle": "A logic puzzle that tests the mind.",
  "Brain teaser": "A brain teaser that sharpens the mind.",
};
// Index 0 is D-7, index 6 is D-1.
const DAY_PLAN: { wellbeing?: string; mind?: string }[] = [
  { wellbeing: "Hook step" },
  { mind: "Guess the Hero" },
  { wellbeing: "Desk yoga", mind: "Word sprint" },
  { mind: "Creative challenge" },
  { mind: "Crossword" },
  { wellbeing: "Beginner workout", mind: "Logic puzzle" },
  { wellbeing: "Desk yoga", mind: "Brain teaser" },
];

const TL_W = 640;
const TL_H = 282;
const TL_X = 12;
const TL_Y = 70;
const TILE_T = 16;

// Plane coordinates (x, y) lifted by z. Rows run flat across the screen; depth slants down and right.
function proj(x: number, y: number, z: number): [number, number] {
  return [TL_X + x + y * 0.5, TL_Y + y * 0.38 - z];
}

function tlPoints(list: [number, number, number][]) {
  return list.map(([x, y, z]) => proj(x, y, z).map((n) => n.toFixed(1)).join(",")).join(" ");
}

type TileDef = { label: string; x: number; y: number; w: number; d: number; event: boolean; name?: string; mind?: string };

// Summaries use the deck's challenge details and the case copy only.
function summaryFor(tile: TileDef): { title: string; body: string } {
  if (tile.event) {
    return tile.label === "Event 1"
      ? {
          title: "Event, 30 July 2026",
          body: "The conference opened with a Laughter Reset, and the three cities laughed together.",
        }
      : {
          title: "Event, 31 July 2026",
          body: "The conference closed with Keep It Going: a balloon kept in the air while new rules appeared every 30 to 45 seconds.",
        };
  }
  const n = Number(tile.label.slice(2));
  const plan = DAY_PLAN[7 - n];
  const parts = [
    plan.wellbeing && WELLBEING_DETAIL[plan.wellbeing],
    plan.mind && `Mind track: ${MIND_DETAIL[plan.mind]}`,
  ].filter(Boolean);
  return {
    title: `${n} ${n === 1 ? "day" : "days"} before`,
    body: `${RESET_LINE} ${parts.join(" ")}`,
  };
}

function Tile({
  tile,
  active,
  reduce,
  onEnter,
  onLeave,
}: {
  tile: TileDef;
  active: boolean;
  reduce: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const { label, x, y, w, d, event } = tile;
  const top = tlPoints([[x, y, TILE_T], [x + w, y, TILE_T], [x + w, y + d, TILE_T], [x, y + d, TILE_T]]);
  const inner = tlPoints([[x + 3, y + 3, TILE_T], [x + w - 3, y + 3, TILE_T], [x + w - 3, y + d - 3, TILE_T], [x + 3, y + d - 3, TILE_T]]);
  const footprint = tlPoints([[x, y, 0], [x + w, y, 0], [x + w, y + d, 0], [x, y + d, 0]]);
  const front = tlPoints([[x, y + d, TILE_T], [x + w, y + d, TILE_T], [x + w, y + d, 0], [x, y + d, 0]]);
  const side = tlPoints([[x + w, y, TILE_T], [x + w, y + d, TILE_T], [x + w, y + d, 0], [x + w, y, 0]]);
  const [cx, cy] = proj(x + w / 2, y + d / 2, TILE_T);
  const [hx1, hy1] = proj(x, y, TILE_T);
  const [hx2, hy2] = proj(x + w, y, TILE_T);
  const [, fy] = proj(x + w / 2, y + d, 0);
  const sideFill = event ? "url(#tl-event-side)" : "url(#tl-glass-side)";
  const summary = summaryFor(tile);

  // Transparent hit area: the tile plus its caption, padded, so small targets still catch hover.
  const corners = [
    proj(x, y, TILE_T), proj(x + w, y, TILE_T), proj(x + w, y + d, 0), proj(x, y + d, 0),
  ];
  const hitX = Math.min(...corners.map((c) => c[0])) - 8;
  const hitW = Math.max(...corners.map((c) => c[0])) - hitX + 8;
  const hitY = Math.min(...corners.map((c) => c[1])) - 8;
  const hitBottom = fy + 8;

  return (
    <g
      role="img"
      aria-label={`${summary.title}. ${summary.body}`}
      tabIndex={0}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      style={{ transform: `translateY(${active ? -8 : 0}px)`, transition: "transform 220ms ease-out" }}
      className="outline-none"
    >
      <rect x={hitX} y={hitY} width={hitW} height={hitBottom - hitY} fill="rgba(0,0,0,0)" />
      <polygon points={footprint} fill="#000" opacity={active ? 0.45 : 0.3} filter="url(#tl-shadow-wide)" transform="translate(14 22)" />
      <polygon points={footprint} fill="#000" opacity={active ? 0.7 : 0.5} filter="url(#tl-shadow)" transform="translate(4 7)" />
      <polygon points={front} fill={sideFill} />
      <polygon points={side} fill={sideFill} />
      <polygon points={top} fill={event ? "url(#tl-event-top)" : "url(#tl-glass-top)"} />
      <polygon points={top} fill="url(#tl-sheen)" />
      <polygon
        points={inner}
        fill="none"
        stroke={event ? "rgba(253,230,138,0.35)" : "rgba(220,235,255,0.22)"}
        strokeWidth="1"
      />
      <polygon
        points={top}
        fill="none"
        stroke={active ? "#FFFFFF" : event ? CORE : "rgba(190,215,255,0.45)"}
        strokeWidth={active ? 1.6 : 1}
      />
      <line x1={hx1} y1={hy1} x2={hx2} y2={hy2} stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="15" letterSpacing="0.06em" fill={event ? CORE : INK}>
        {label}
      </text>
    </g>
  );
}

export function TimelineDiagram() {
  const reduce = Boolean(useReducedMotion());
  const [active, setActive] = useState<number | null>(null);

  const DAY_W = 72;
  const DAY_GAP = 10;
  const DAY_D = 52;
  const EV_W = 236;
  const EV_GAP = 28;
  const EV_D = 60;
  const EV_X = -32;
  const EV_Y = 196;
  const RAIL_Y = 232;

  const tiles: TileDef[] = [
    ...DAYS.map((label, i) => ({
      label,
      x: i * (DAY_W + DAY_GAP),
      y: 0,
      w: DAY_W,
      d: DAY_D,
      event: false,
      name: DAY_PLAN[i].wellbeing,
      mind: DAY_PLAN[i].mind,
    })),
    ...EVENT_DAYS.map((label, i) => ({ label, x: EV_X + i * (EV_W + EV_GAP), y: EV_Y, w: EV_W, d: EV_D, event: true })),
  ];
  const activeTile = active === null ? null : tiles[active];
  const activeSummary = activeTile ? summaryFor(activeTile) : null;
  const [tipX, tipY] = activeTile ? proj(activeTile.x + activeTile.w / 2, activeTile.y, TILE_T) : [0, 0];
  const tipSide = active === 0 ? "left" : active === tiles.length - 1 ? "right" : "center";

  const evLeft = EV_X + EV_W / 2;
  const evRight = EV_X + EV_W + EV_GAP + EV_W / 2;
  const [nodeLX, nodeLY] = proj(evLeft, EV_Y + EV_D, 0);
  const [nodeRX, nodeRY] = proj(evRight, EV_Y + EV_D, 0);
  const nodeMX = (nodeLX + nodeRX) / 2;

  return (
    <figure className={CARD}>
      <figcaption className={LABEL}>Diagram, not a render</figcaption>

      <div className="mt-6 font-sans sm:hidden">
        <p className="text-sm text-fg/90">One challenge unlocks each day</p>
        <ol className="mt-3 grid grid-cols-4 gap-2">
          {DAYS.map((d, i) => (
            <li key={d} className="rounded-xl border border-sky-200/25 bg-gradient-to-b from-sky-300/25 to-sky-900/10 px-1.5 py-2.5 text-center text-fg/90 backdrop-blur-md">
              <span className="block text-[12px]">{d}</span>
              <span className="mt-1 block text-[10px] leading-tight text-fg/60">{DAY_PLAN[i].wellbeing}</span>
              {DAY_PLAN[i].mind && <span className="mt-0.5 block text-[10px] leading-tight text-amber-200/80">+ {DAY_PLAN[i].mind}</span>}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-fg/90">Event, two days</p>
        <ol className="mt-3 grid grid-cols-2 gap-2">
          {EVENT_DAYS.map((d) => (
            <li key={d} className="rounded-xl border border-amber-200/60 bg-gradient-to-b from-amber-300/35 to-amber-600/10 px-2 py-4 text-center text-[13px] text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.25)] backdrop-blur-md">
              {d}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-right text-sm text-fg/75">Synced across three cities</p>
      </div>

      <div className="relative mt-6 hidden sm:block">
        <svg
          viewBox={`0 0 ${TL_W} ${TL_H}`}
          className="h-auto w-full overflow-visible"
          role="group"
          aria-label="Seven daily challenges, then two event days, synced across three cities. Hover or focus a tile for its summary."
        >
          <defs>
            <linearGradient id="tl-glass-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(186,214,255,0.4)" />
              <stop offset="100%" stopColor="rgba(70,120,215,0.14)" />
            </linearGradient>
            <linearGradient id="tl-glass-side" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(80,120,200,0.36)" />
              <stop offset="100%" stopColor="rgba(14,28,66,0.55)" />
            </linearGradient>
            <linearGradient id="tl-event-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(253,230,138,0.6)" />
              <stop offset="100%" stopColor="rgba(245,158,11,0.16)" />
            </linearGradient>
            <linearGradient id="tl-event-side" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(245,158,11,0.45)" />
              <stop offset="100%" stopColor="rgba(90,45,0,0.5)" />
            </linearGradient>
            <linearGradient id="tl-sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="42%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="58%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <filter id="tl-shadow-wide" x="-40%" y="-60%" width="180%" height="260%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
            <filter id="tl-shadow" x="-20%" y="-20%" width="140%" height="150%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {tiles.map((tile, i) => (
            <Tile
              key={tile.label}
              tile={tile}
              active={active === i}
              reduce={reduce}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}

          <text x={TL_X} y="34" fill={INK} fontSize="15" letterSpacing="0.02em">
            One challenge unlocks each day
            <tspan fill="rgba(253,230,138,0.85)"> · 3-minute reset every day</tspan>
          </text>

          <g stroke="rgba(253,230,138,0.55)" strokeWidth="1.2" fill="none">
            <line x1={nodeLX} y1={nodeLY} x2={nodeLX} y2={RAIL_Y} />
            <line x1={nodeRX} y1={nodeRY} x2={nodeRX} y2={RAIL_Y} />
            <line x1={nodeLX} y1={RAIL_Y} x2={nodeRX} y2={RAIL_Y} />
          </g>
          {[nodeLX, nodeMX, nodeRX].map((x) => (
            <circle key={x} cx={x} cy={RAIL_Y} r="4.5" fill={CORE} stroke={NAVY} strokeWidth="2" />
          ))}
          <text x={nodeMX} y={RAIL_Y + 36} textAnchor="middle" fill={INK} fontSize="15" letterSpacing="0.02em">
            Event, two days · Synced across three cities
          </text>
        </svg>

        <p className="mt-4 font-sans text-[12px] uppercase tracking-[0.14em] text-fg/75">
          Hover a day or event for its detail
        </p>

        {activeTile && activeSummary && (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-10 w-60 rounded-xl border border-white/15 bg-[#0b1220]/90 px-3 py-2.5 font-sans text-left shadow-2xl backdrop-blur-md"
            style={{
              left: `${(tipX / TL_W) * 100}%`,
              top: `${(tipY / TL_H) * 100}%`,
              transform:
                tipSide === "left"
                  ? "translate(-12px, calc(-100% - 16px))"
                  : tipSide === "right"
                    ? "translate(calc(-100% + 12px), calc(-100% - 16px))"
                    : "translate(-50%, calc(-100% - 16px))",
            }}
          >
            <p className="text-[11px] uppercase tracking-[0.12em] text-amber-200">{activeSummary.title}</p>
            <p className="mt-1 text-[13px] leading-snug text-fg/90">{activeSummary.body}</p>
          </div>
        )}
      </div>
    </figure>
  );
}

// The live loop on a navy base: isometric buildings with lit windows and shadows,
// a rounded amber loop through the three cities, and numbered handoffs.
const S = 17;
const OX = 241;
const OY = 50;

function iso(x: number, y: number, z: number): [number, number] {
  return [OX + (x - y) * 0.866 * S, OY + (x + y) * 0.5 * S - z * S];
}

function pts(list: [number, number, number][]) {
  return list.map(([x, y, z]) => iso(x, y, z).map((v) => v.toFixed(1)).join(",")).join(" ");
}

type Box = { x0: number; y0: number; w: number; d: number; z0: number; z1: number };

function Block({ b, seed, shadow = true }: { b: Box; seed: number; shadow?: boolean }) {
  const { x0, y0, w, d, z0, z1 } = b;
  const x1 = x0 + w;
  const y1 = y0 + d;
  const windows: JSX.Element[] = [];
  if (z1 - z0 > 0.8) {
    for (let v = z0 + 0.3; v + 0.3 < z1; v += 0.5) {
      for (let u = x0 + 0.2; u + 0.22 < x1; u += 0.42) {
        const lit = ((seed * 7 + Math.floor(u * 9) + Math.floor(v * 5)) % 5) > 1;
        if (!lit) continue;
        windows.push(
          <polygon key={`f${u.toFixed(2)}-${v.toFixed(2)}`} points={pts([[u, y1 + 0.01, v], [u + 0.22, y1 + 0.01, v], [u + 0.22, y1 + 0.01, v + 0.26], [u, y1 + 0.01, v + 0.26]])} fill="#FBBF24" fillOpacity="0.85" />,
        );
      }
      for (let u = y0 + 0.2; u + 0.22 < y1; u += 0.42) {
        const lit = ((seed * 3 + Math.floor(u * 9) + Math.floor(v * 5)) % 4) === 0;
        if (!lit) continue;
        windows.push(
          <polygon key={`r${u.toFixed(2)}-${v.toFixed(2)}`} points={pts([[x1 + 0.01, u, v], [x1 + 0.01, u + 0.22, v], [x1 + 0.01, u + 0.22, v + 0.26], [x1 + 0.01, u, v + 0.26]])} fill="#FBBF24" fillOpacity="0.7" />,
        );
      }
    }
  }
  return (
    <g>
      {shadow && (
        <polygon
          points={pts([[x0 + 0.9, y0 + 0.5, 0], [x1 + 0.9, y0 + 0.5, 0], [x1 + 0.9, y1 + 0.5, 0], [x0 + 0.9, y1 + 0.5, 0]])}
          fill="#000"
          fillOpacity="0.45"
          filter="url(#mcaps-shadow)"
        />
      )}
      <polygon points={pts([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]])} fill="#2c3d5c" />
      <polygon points={pts([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]])} fill="#243452" />
      {windows}
      <polygon points={pts([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]])} fill="#3b4f73" />
      {/* A thin lit edge along the roof's front, so the blocks read as solid. */}
      <polyline points={pts([[x0, y1, z1], [x1, y1, z1]])} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
    </g>
  );
}

// Eases a building up and down, slowly. Each one takes a different delay so they don't move in step.
function Bob({ delay, children }: { delay: number; children: JSX.Element }) {
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0 0; 0 -12; 0 0"
        keyTimes="0; 0.5; 1"
        dur="8s"
        begin={`-${delay}s`}
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
      />
      {children}
    </g>
  );
}

// Ground layers under the buildings: a faint survey grid on the base, and a soft
// tinted zone under each city so each district reads as its own area.
const ZONES = [
  { x0: 0.2, x1: 3.6, y0: 6.4, y1: 10 },
  { x0: 6.8, x1: 11.2, y0: 0.4, y1: 6.0 },
  { x0: 15.8, x1: 20.2, y0: 6.2, y1: 10 },
];

function GroundLayers() {
  const grid: JSX.Element[] = [];
  for (let x = -1; x <= 21; x += 2) {
    const [ax, ay] = iso(x, -1, 0);
    const [bx, by] = iso(x, 13, 0);
    grid.push(<line key={`gx${x}`} x1={ax} y1={ay} x2={bx} y2={by} stroke="rgba(150,180,230,0.10)" strokeWidth="1" />);
  }
  for (let y = -1; y <= 13; y += 2) {
    const [ax, ay] = iso(-1, y, 0);
    const [bx, by] = iso(21, y, 0);
    grid.push(<line key={`gy${y}`} x1={ax} y1={ay} x2={bx} y2={by} stroke="rgba(150,180,230,0.10)" strokeWidth="1" />);
  }
  return (
    <g>
      {grid}
      {ZONES.map((z, i) => (
        <polygon
          key={`zone${i}`}
          points={pts([[z.x0, z.y0, 0], [z.x1, z.y0, 0], [z.x1, z.y1, 0], [z.x0, z.y1, 0]])}
          fill="rgba(148,180,230,0.12)"
          stroke="rgba(170,195,235,0.45)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
      ))}
    </g>
  );
}

// The three cities, as the hubs the loop passes through. Index 0 is Bengaluru,
// 1 is Mumbai, 2 is Gurugram.
const CITY_GROUND = [
  [-0.4, 9.8],
  [9.7, 5.4],
  [20.6, 8.8],
] as const;

// The loop's rectangle, in base coordinates.
const RECT = { x0: -0.4, y0: 5.4, x1: 20.6, y1: 12.6, r: 1.2 };

// The loop, as a rounded rectangle. It runs clockwise from the top-left corner.
function rectPath({ x0, y0, x1, y1, r }: typeof RECT) {
  const at = (x: number, y: number) => iso(x, y, 0.05).map((v) => v.toFixed(1)).join(" ");
  return [
    `M ${at(x0 + r, y0)}`,
    `L ${at(x1 - r, y0)} Q ${at(x1, y0)} ${at(x1, y0 + r)}`,
    `L ${at(x1, y1 - r)} Q ${at(x1, y1)} ${at(x1 - r, y1)}`,
    `L ${at(x0 + r, y1)} Q ${at(x0, y1)} ${at(x0, y1 - r)}`,
    `L ${at(x0, y0 + r)} Q ${at(x0, y0)} ${at(x0 + r, y0)} Z`,
  ].join(" ");
}

const LOOP = rectPath(RECT);

// How far a point on the loop sits along it, from 0 to 1, clockwise from the top-left.
function loopFraction(px: number, py: number) {
  const { x0, y0, x1, y1 } = RECT;
  const w = x1 - x0;
  const h = y1 - y0;
  const perimeter = 2 * (w + h);
  let d: number;
  if (Math.abs(py - y0) < 1e-6) d = px - x0;
  else if (Math.abs(px - x1) < 1e-6) d = w + (py - y0);
  else if (Math.abs(py - y1) < 1e-6) d = w + h + (x1 - px);
  else d = 2 * w + h + (y1 - py);
  return d / perimeter;
}

const [fBengaluru, fMumbai, fGurugram] = CITY_GROUND.map(([x, y]) => loopFraction(x, y));

// Each handoff, in the order it runs. Text is taken from the case copy.
const EVENTS = [
  { title: "Takeover", text: "One city took control every 90 minutes, with 60 seconds for the other two to respond." },
  { title: "Memory chain", text: "A memory chain was carried across all three cities." },
  { title: "Shared cheer", text: "A shared cheer gave each city its own word." },
];

// Where each event's number sits on the loop, in base coordinates.
const EVENT_AT = [
  [11.4, 5.4],
  [8, 12.6],
  [5.5, 5.4],
] as const;

// One handoff: a dot that travels along the loop between two fractions, then fades.
function Hop({ from, to, start, end }: { from: number; to: number; start: number; end: number }) {
  const s = start / CYCLE;
  const e = end / CYCLE;
  return (
    <circle r="3.5" fill={CORE}>
      <animateMotion
        dur={`${CYCLE}s`}
        repeatCount="indefinite"
        path={LOOP}
        keyPoints={`${from};${from};${to};${to}`}
        keyTimes={`0;${s};${e};1`}
        calcMode="linear"
      />
      <animate attributeName="opacity" values="0;1;1;0;0" keyTimes={`0;${s};${e - 0.001};${e};1`} dur={`${CYCLE}s`} repeatCount="indefinite" />
    </circle>
  );
}

// A city hub. When a handoff reaches it, the hub's ring flashes once per cycle.
function Hub({ x, y, flash, reduce }: { x: number; y: number; flash: number; reduce: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r="8" fill={NAVY} stroke={AMBER} strokeWidth="2" />
      <circle cx={x} cy={y} r="3" fill={CORE} />
      {!reduce && (
        <circle cx={x} cy={y} r="8" fill="none" stroke={AMBER} strokeWidth="1.5" opacity="0">
          <animate attributeName="r" values="8;20;20" keyTimes="0;0.1;1" dur={`${CYCLE}s`} begin={`${flash}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0" keyTimes="0;0.1;1" dur={`${CYCLE}s`} begin={`${flash}s`} repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

// A city name on a navy chip, so it stays readable over buildings.
function CityLabel({ hx, hy, text, side, at }: { hx: number; hy: number; text: string; side: "left" | "below-left" | "below" | "leader"; at?: [number, number] }) {
  const w = text.length * 9 + 20;
  const cx = at ? at[0] : side === "left" ? hx - 18 - w / 2 : side === "below-left" ? hx - 6 - w / 2 : side === "leader" ? hx - 10 : hx;
  const cy = at ? at[1] : side === "left" ? hy : side === "leader" ? hy + 44 : hy + 32;
  const leader = side === "leader" && at === undefined;
  return (
    <g>
      {leader && <line x1={hx} y1={hy + 8} x2={cx} y2={cy - 14} stroke="rgba(243,237,224,0.6)" strokeWidth="1" />}
      <rect x={cx - w / 2} y={cy - 14} width={w} height={28} rx={14} fill={NAVY} fillOpacity="0.8" />
      <text x={cx} y={cy + 5} textAnchor="middle" fill="#F3EDE0" fontSize="16">{text}</text>
    </g>
  );
}

// The handoff number, drawn on the loop.
function EventChip({ x, y, n, opacity }: { x: number; y: number; n: number; opacity: number }) {
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r="9" fill={NAVY} stroke={AMBER} strokeWidth="1.5" />
      <text x={x} y={y + 4} textAnchor="middle" fill={CORE} fontSize="12" fontWeight="600">{n}</text>
    </g>
  );
}

// Phones: the same three cities and handoffs as a simple, static diagram.
function SimpleSync() {
  return (
    <svg viewBox="0 0 320 280" className="h-auto w-full" role="img" aria-label="Three cities linked in a loop, with three numbered handoffs">
      <path d="M 160 52 Q 262 92 262 214 Q 160 272 58 214 Q 58 92 160 52 Z" fill="none" stroke={AMBER} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="236" cy="112" r="10" fill={NAVY} stroke={AMBER} strokeWidth="1.5" />
      <text x="236" y="116" textAnchor="middle" fill={CORE} fontSize="12" fontWeight="600">1</text>
      <circle cx="160" cy="243" r="10" fill={NAVY} stroke={AMBER} strokeWidth="1.5" />
      <text x="160" y="247" textAnchor="middle" fill={CORE} fontSize="12" fontWeight="600">2</text>
      <circle cx="84" cy="112" r="10" fill={NAVY} stroke={AMBER} strokeWidth="1.5" />
      <text x="84" y="116" textAnchor="middle" fill={CORE} fontSize="12" fontWeight="600">3</text>
      {[
        [160, 52],
        [262, 214],
        [58, 214],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill={NAVY} stroke={AMBER} strokeWidth="2" />
      ))}
      <text x="160" y="30" textAnchor="middle" fill="#F3EDE0" fontSize="16">Mumbai</text>
      <text x="262" y="252" textAnchor="middle" fill="#F3EDE0" fontSize="16">Gurugram</text>
      <text x="58" y="252" textAnchor="middle" fill="#F3EDE0" fontSize="16">Bengaluru</text>
    </svg>
  );
}

export function SyncDiagram() {
  const reduce = Boolean(useReducedMotion());
  const [active, setActive] = useState<number | null>(null);
  const hubs = CITY_GROUND.map(([x, y]) => iso(x, y, 0.05));
  const chips = EVENT_AT.map(([x, y]) => iso(x, y, 0.05));
  const wrap = (node: JSX.Element, delay: number) => (reduce ? node : <Bob delay={delay}>{node}</Bob>);
  const opacityFor = (i: number) => (active === null || active === i ? 1 : 0.35);

  return (
    <figure className={CARD}>
      <figcaption className={LABEL}>Diagram, not a render</figcaption>

      <div className="mt-6 sm:hidden">
        <SimpleSync />
      </div>

      <svg viewBox="0 0 600 360" className="mt-6 hidden h-auto w-full sm:block" role="img" aria-label="Three cities on a navy base, linked by a live amber loop, where one city's actions affect another">
        <defs>
          <radialGradient id="mcaps-glow">
            <stop offset="0%" stopColor={AMBER} stopOpacity="0.16" />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
          </radialGradient>
          <filter id="mcaps-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
          <filter id="mcaps-route-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="300" cy="190" rx="270" ry="160" fill="url(#mcaps-glow)" />
        <Block b={{ x0: -1, y0: -1, w: 22, d: 14, z0: -0.4, z1: 0 }} seed={0} shadow={false} />
        <polygon points={pts([[-1, -1, 0], [21, -1, 0], [21, 13, 0], [-1, 13, 0]])} fill={SLAB} />
        <GroundLayers />

        {/* The loop sits under the buildings, so a building hides the line where they overlap. */}
        <g>
          <path d={LOOP} fill="none" stroke={AMBER} strokeWidth="9" strokeOpacity="0.35" strokeLinejoin="round" filter="url(#mcaps-route-glow)" />
          <path d={LOOP} fill="none" stroke={AMBER} strokeWidth="4" strokeLinejoin="round" />
          <path d={LOOP} fill="none" stroke={CORE} strokeWidth="1.3" strokeLinejoin="round" />
          {!reduce && (
            <>
              <Hop from={fMumbai} to={fGurugram} start={0.5} end={4} />
              <Hop from={fGurugram} to={fBengaluru} start={4.5} end={8} />
              <Hop from={fBengaluru} to={1} start={8.5} end={10} />
              <Hop from={0} to={fMumbai} start={10} end={11.5} />
            </>
          )}
        </g>

        <Block b={{ x0: 0.2, y0: 6.6, w: 2.6, d: 2.6, z0: 0, z1: 1.8 }} seed={3} />
        {wrap(<Block b={{ x0: 2.6, y0: 7.4, w: 1.1, d: 1.1, z0: 0, z1: 0.9 }} seed={4} />, 0)}
        {wrap(<Block b={{ x0: 7.2, y0: 2.6, w: 1.6, d: 1.6, z0: 0, z1: 1.3 }} seed={5} />, 2.6)}
        <Block b={{ x0: 8.6, y0: 0.2, w: 2.2, d: 2.2, z0: 0, z1: 5.4 }} seed={11} />
        <Block b={{ x0: 9.2, y0: 0.8, w: 1.0, d: 1.0, z0: 5.4, z1: 6.2 }} seed={12} />
        {wrap(<Block b={{ x0: 11.0, y0: 0.6, w: 1.1, d: 1.1, z0: 0, z1: 1.2 }} seed={6} />, 5.2)}
        <Block b={{ x0: 16.4, y0: 6.6, w: 1.8, d: 1.8, z0: 0, z1: 3.9 }} seed={21} />
        {wrap(<Block b={{ x0: 18.4, y0: 7.6, w: 1.6, d: 1.6, z0: 0, z1: 1.2 }} seed={22} />, 1.3)}

        {EVENTS.map((_, i) => (
          <EventChip key={`chip${i}`} x={chips[i][0]} y={chips[i][1]} n={i + 1} opacity={opacityFor(i)} />
        ))}

        {hubs.map(([x, y], i) => (
          <Hub key={`hub${i}`} x={x} y={y} flash={[8.5, 0.5, 4.5][i]} reduce={reduce} />
        ))}

        <CityLabel hx={hubs[0][0]} hy={hubs[0][1]} text="Bengaluru" side="below" />
        <CityLabel hx={hubs[1][0]} hy={hubs[1][1]} text="Mumbai" side="leader" at={[451, 153]} />
        <CityLabel hx={hubs[2][0]} hy={hubs[2][1]} text="Gurugram" side="below" />
      </svg>

      <ol className="mt-8 space-y-2">
        {EVENTS.map((ev, i) => (
          <li key={ev.title}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
              className="flex w-full items-start gap-4 rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-400 font-sans text-sm text-amber-300">
                {i + 1}
              </span>
              <span className="font-sans text-base font-light leading-relaxed text-fg/90">
                <span className="text-fg">{ev.title}.</span> {ev.text}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-center font-sans text-sm font-light text-fg/75">
        Three cities linked live: one city&apos;s actions affect another. Handoff order is illustrative.
      </p>
    </figure>
  );
}
