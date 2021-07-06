const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'de'],
        defaultLocale: 'en',
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.js$/,
            use: ['@compiled/webpack-loader'],
        })

        return config
    },
}

module.exports = withBundleAnalyzer(nextConfig)
