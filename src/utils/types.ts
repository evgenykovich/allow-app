import { monthleyText, weeklyText } from './consts'

export type History = {
  id: string
  type: string
  date: string
  amount: string
  currency: string
  description: string
}

export type HistoryDetails = {
  id: string
  type: string
  date: string
  amount: string
  currency: string
  description: string
}

export enum MonthleyWeekly {
  monthly = monthleyText,
  weekly = weeklyText,
}
