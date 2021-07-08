import { useState, useEffect } from 'react'
import SocketIO, { Socket } from 'socket.io-client'

export interface IDataRecived {
    error: boolean
    data: any
}

export function useOnDataRecived(
    socket: typeof Socket | undefined,
    event_name: string
) {
    const [isDataRecivedError, setIsDataRecivedError] = useState(Boolean)
    const [socketRecivedData, setSocketRecivedData] = useState(null)

    const getMessageFromSocket = (cb: any) => {
        if (!socket) return cb(true)
        socket.on(event_name, (msg: any) => cb(null, msg))
    }

    useEffect(() => {
        getMessageFromSocket((err: boolean, data: any) => {
            setIsDataRecivedError(err)
            setSocketRecivedData(data)
        })
    })
    return {
        error: isDataRecivedError,
        data: socketRecivedData,
    }
}
