const dotenv = require('dotenv')
const withPlugins = require('next-compose-plugins')
const withSourceMaps = require('@zeit/next-source-maps')()
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
dotenv.config()
const nextConfig = {
    poweredByHeader: false,
    trailingSlash: false,
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

        if (!isServer) {
            config.resolve.alias['@sentry/node'] = '@sentry/browser'
        }

        return config
    },
}
export default withPlugins([[withSourceMaps], [withBundleAnalyzer]], nextConfig)
