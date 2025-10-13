/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  images: {
    unoptimized: true,
    loader: "custom",
    formats: ["image/avif", "image/webp"],
  },
};
