/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "5000",
            },
            {
                protocol: "https",
                hostname: "ph-study-routine-server.onrender.com",
                port: "",
            },
        ],
    },
    env: {
        NEXT_PUBLIC_SERVER_URL:
            "https://ph-study-routine-server.onrender.com/api/v1",
        // NEXT_PUBLIC_SERVER_URL: "http://localhost:5000/api/v1",
    },
};

export default nextConfig;
