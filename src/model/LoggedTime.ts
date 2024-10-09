import type { ComputedRef } from 'vue'

export interface LoggedTime {
  date: String
  totalTime: ComputedRef<String>
  breakTime?: String
}
