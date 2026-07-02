import Image, { type ImageProps } from "next/image";

/**
 * Thin wrapper around next/image that serves vector placeholders (.svg) without
 * running them through the raster optimizer — vectors don't need it and the
 * optimizer rejects them. Real photos (.jpg/.png) optimize normally, so swapping
 * a placeholder for a real photo (brief §4) needs no other change.
 */
export function SmartImage(props: ImageProps) {
  const isSvg = typeof props.src === "string" && props.src.endsWith(".svg");
  return (
    /* eslint-disable-next-line jsx-a11y/alt-text */
    <Image {...props} unoptimized={props.unoptimized ?? isSvg} />
  );
}
