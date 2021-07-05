import { BaseAction } from '../../utils/types/base-redux'

export enum NetworkActionConstants {
  Start = '[network] Start',
  End = '[network] End',
}

export interface NetworkAction extends BaseAction {
  payload: {
    networkLabel: string
  }
}

export const startNetwork = (networkLabel: string) => ({
  type: NetworkActionConstants.Start,
  payload: {
    networkLabel,
  },
})

export const endNetwork = (networkLabel: string): NetworkAction => ({
  type: NetworkActionConstants.End,
  payload: {
    networkLabel,
  },
})
