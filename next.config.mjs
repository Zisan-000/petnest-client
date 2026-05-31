/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // https://i.ibb.co/example/milo-golden-retriever.jpg
  // https://lh3.googleusercontent.com/
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
