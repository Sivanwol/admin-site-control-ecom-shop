const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
    siteUrl: process.env.SITE_URL || 'http://localhost',
    changefreq: 'daily',
    priority: 0.7,
    generateRobotsTxt: true,
    exclude: [
    ],
    sitemapSize: 7000,
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'de'],
        defaultLocale: 'en',
    },
    "plugins": [
        "postcss-flexbugs-fixes",
        [
            "postcss-preset-env",
            {
                "autoprefixer": {
                    "flexbox": "no-2009"
                },
                "stage": 3,
                "features": {
                    "custom-properties": false
                }
            }
        ]
    ],
    webpack: (config) => {
        config.module.rules.push({
            test: /\.js$/,
            use: ['@compiled/webpack-loader'],
        })

        return config
    },
}

module.exports = withBundleAnalyzer(nextConfig)
