import express, { Request, Response, Express } from 'express'
import ioserver, { Socket } from 'socket.io'
import * as http from 'http'
import next from 'next'
import cors from 'cors'
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
app.prepare().then(async () => {
    try {
        const app: Express = express()
        const server: http.Server = http.createServer(app)
        const socketio = ioserver(server)
        socketio.attach(server)

        app.all('*', (req: Request, res: Response) => {
            return handle(req, res)
        })
        app.use(cors())

        socketio.on('connection', (socket: Socket) => {
            console.log('connection')
            socket.emit('status', 'Hello from Socket.io')
            socket.on('test_event', (data: any) => {
                console.log('websocket recived test_event')
                socket.emit('test_event', 'Hello from Socket.io')
            })
            socket.on('disconnect', () => {
                console.log('client disconnected')
            })
        })
        server.listen(port, (err?: any) => {
            if (err) throw err
            console.log(
                `> Ready on http://localhost:${port} - env ${process.env.NODE_ENV}`
            )
        })
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})
