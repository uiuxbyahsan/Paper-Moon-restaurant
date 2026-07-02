/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vector placeholders are served unoptimized via components/ui/SmartImage;
  // real raster photos use the default next/image optimizer. No extra config
  // needed here.
};

export default nextConfig;
