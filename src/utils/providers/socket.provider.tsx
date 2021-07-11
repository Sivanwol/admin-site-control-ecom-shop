import { FC, useState, useEffect } from 'react'
import SocketIO, { Socket } from 'socket.io-client'
import { ISocketContext } from '../contexts/ISocketContext'
import SocketContext from '../contexts/socket.context'
import {
    useOnDataRecived,
    IDataRecived,
} from '../hooks/sockets/useOnDataReviced'
const SocketProvider: FC = ({ children }) => {
    const [socket, setSocket] = useState<typeof Socket>()
    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }
        console.log('[mounted]')

        // connect to Socket.io server
        const s = SocketIO()
        setSocket(s)

        // initialize state
        s.emit('test_event')
        return () => {
            console.log('[unmounted]')
            if (socket && socket.connected) {
                socket.disconnect()
            }
        }
    }, [socket])
    const socketData: IDataRecived = useOnDataRecived(socket, 'test_event')
    console.log('Socket Data', socketData)
    const data: ISocketContext = Object.freeze({
        socket,
    })
    return (
        <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
    )
}

export default SocketProvider
