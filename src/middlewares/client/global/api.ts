import { get, castArray, compact } from 'lodash/fp'
import urljoin from 'url-join'
import { Dispatch, Store, ActionCreator } from 'redux'

import { State } from 'history'
import { BaseAction } from '../../../utils/types/base-redux'
import { startNetwork, endNetwork } from '../../../redux/actions/network'
import apiUtils from '../../../utils/api'
import { BASE_URL, IS_DEBUG_MODE } from '../../../config/api'

export function dispatchActions(
    dispatch: Dispatch<BaseAction>,
    actionCreators: ActionCreator<BaseAction> | ActionCreator<BaseAction>[],
    response: any
) {
    compact(castArray(actionCreators)).forEach(
        (actionCreator: ActionCreator<BaseAction>) => {
            const action = actionCreator(response)

            return action && dispatch(action)
        }
    )
}

export function apiMiddleware({ dispatch }: Store<State>) {
    return (next: Dispatch<BaseAction>) => async (action: BaseAction) => {
        if (!get('meta.api', action)) {
            return next(action)
        }

        const { payload } = action
        const {
            path,
            baseUrl,
            onSuccess,
            onError,
            networkLabel,
            data,
            method,
        } = payload
        const headers: Record<string, string> = {}
        const requestUrl = urljoin(baseUrl || BASE_URL, path)

        // TODO: if using token authentication
        //@ts-ignore
        if (getState().auth) {
            //@ts-ignore
            headers['Authorization'] = getState().auth.token
        }

        next(action)
        dispatch(startNetwork(networkLabel))

        try {
            const response = await apiUtils.request({
                method,
                url: requestUrl,
                data,
                headers,
            })

            if (onSuccess) {
                dispatchActions(
                    dispatch,
                    onSuccess,
                    response.body || response.text
                )
            }
        } catch (error) {
            if (IS_DEBUG_MODE) {
                console.error('API Error', error, action)
            }

            if (get('response.status', error) === 401) {
                // TODO: handle 401
            }

            if (onError) {
                dispatchActions(dispatch, onError, error)
            }
        } finally {
            dispatch(endNetwork(networkLabel))
        }
    }
}

export default apiMiddleware

function getState() {
    throw new Error('Function not implemented.')
}
