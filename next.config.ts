import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	allowedDevOrigins: ['10.145.203.105'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pfffavfiwukzhpfsfklo.supabase.co',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
