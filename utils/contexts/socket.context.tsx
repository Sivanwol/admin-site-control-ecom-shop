import { createContext } from 'react'
import { ISocketContext } from './ISocketContext'

//@ts-ignore
const SocketContext = createContext<ISocketContext>(null)

export default SocketContext
