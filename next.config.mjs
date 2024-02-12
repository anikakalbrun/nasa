/** @type {import('next').NextConfig} */
//img.youtube.com/vi/PpyPgJHKxSw/0.jpg) 
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
        port: "",
        pathname: "/apod/image/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**/**",
      }
    ],
  },
};

export default nextConfig;
