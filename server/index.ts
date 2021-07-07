import express, { Request, Response } from 'express'
import next from 'next'
import nextI18next from '../utils/i18n'
const nextI18NextMiddleware = require('next-i18next/middleware')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

;(async () => {
    try {
        await app.prepare()
        const server = express()
        server.all('*', (req: Request, res: Response) => {
            return handle(req, res)
        })
        try {
            server.use(nextI18NextMiddleware(nextI18next))
        } catch (e) {
            throw e
        }
        server.listen(port, (err?: any) => {
            if (err) throw err
            console.log(
                `> Ready on localhost:${port} - env ${process.env.NODE_ENV}`
            )
        })
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})()
