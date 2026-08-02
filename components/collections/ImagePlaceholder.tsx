import Image from "next/image";
import KenBurns, { type KenBurnsMove } from "./KenBurns";

type ImagePlaceholderProps = {
  label: string;
  aspect?: "video" | "square" | "portrait" | "wide";
  className?: string;
  src?: string;
  imageClassName?: string;
  priority?: boolean;
  move?: KenBurnsMove;
  duration?: number;
  objectFit?: "contain" | "cover";
  objectPosition?: string;
};

const ASPECT = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

// No border, no card, no visible caption: this is an editorial essay, not
// a photography archive. `label` exists purely as alt text — the copy
// around the image already provides the context a caption would.
export default function ImagePlaceholder({
  label,
  aspect = "video",
  className = "",
  src,
  imageClassName = "",
  priority = false,
  move,
  duration,
  objectFit = "cover",
  objectPosition,
}: ImagePlaceholderProps) {
  const photo = src && (
    <Image
      src={src}
      alt={label}
      fill
      priority={priority}
      sizes="(min-width: 1320px) 1320px, 100vw"
      style={objectPosition ? { objectPosition } : undefined}
      className={`${objectFit === "cover" ? "object-cover" : "object-contain"} ${imageClassName}`}
    />
  );

  return (
    <div className={`relative overflow-hidden ${ASPECT[aspect]} ${src ? "" : "border border-line"} ${className}`}>
      {photo && move ? (
        <KenBurns move={move} duration={duration}>
          {photo}
        </KenBurns>
      ) : (
        photo
      )}
    </div>
  );
}
