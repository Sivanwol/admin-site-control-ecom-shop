import { Socket } from 'socket.io-client'

export interface ISocketContext {
    socket: typeof Socket | undefined
}
