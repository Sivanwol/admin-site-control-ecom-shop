import { set } from 'lodash/fp'
import { handleActions } from 'redux-actions'
import {
    endNetwork,
    NetworkActionConstants,
    startNetwork,
} from '../actions/network'

export type NetworkState = Record<string, number>

const initialState: NetworkState = {}

const network = handleActions<NetworkState>(
    {
        //@ts-ignore
        [NetworkActionConstants.Start](
            state,
            action: ReturnType<typeof startNetwork>
        ) {
            const { networkLabel } = action.payload

            return set(
                networkLabel,
                state[networkLabel] ? state[networkLabel] + 1 : 1,
                state
            )
        },
        //@ts-ignore
        [NetworkActionConstants.End](
            state,
            action: ReturnType<typeof endNetwork>
        ) {
            const { networkLabel } = action.payload

            return set(
                networkLabel,
                state[networkLabel] ? state[networkLabel] - 1 : 0,
                state
            )
        },
    },
    initialState
)

export default network
