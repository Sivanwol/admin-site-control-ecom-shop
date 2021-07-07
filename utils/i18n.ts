const NextI18Next = require('next-i18next/dist/commonjs').default
const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'en',
    defaultNS: 'translations',
    localePath: 'public/locales',
    otherLanguages: ['en'],
})

export const { appWithTranslation, useTranslation } = NextI18NextInstance

export default NextI18NextInstance
