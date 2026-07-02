import Image, { type ImageProps } from "next/image";

/**
 * Food photo with a consistent warm, candlelit grade so stock photography from
 * varied sources reads as one cohesive set against the dark site. Renders the
 * image plus a tint/vignette overlay — the parent must be `relative` and
 * `overflow-hidden`. Pass `fill` + `sizes` like a normal next/image.
 */
export function FoodImage({ className = "", ...props }: ImageProps) {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is required via ImageProps */}
      <Image
        {...props}
        className={`object-cover [filter:brightness(0.84)_contrast(1.07)_saturate(1.12)_sepia(0.16)] ${className}`}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#71360f] opacity-20 mix-blend-soft-light"
      />
    </>
  );
}
