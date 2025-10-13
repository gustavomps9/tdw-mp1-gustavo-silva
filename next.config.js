/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    unoptimized: true,
    loader: "custom",
    formats: ["image/avif", "image/webp"],
  },
};
