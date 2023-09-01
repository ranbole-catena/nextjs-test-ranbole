/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.playusa.com',
                //port: '',
                //pathname: '',
            },
        ],
    },
}

module.exports = nextConfig
