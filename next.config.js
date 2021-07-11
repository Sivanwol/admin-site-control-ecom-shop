const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
    poweredByHeader: false,
    trailingSlash: true,
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
    plugins: [
        'postcss-flexbugs-fixes',
        [
            'postcss-preset-env',
            {
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
                features: {
                    'custom-properties': false,
                },
            },
        ],
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
