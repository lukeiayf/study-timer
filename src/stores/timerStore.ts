import type { LoggedTime } from '@/model/LoggedTime'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useTimerStore = defineStore('timer', () => {
  const time = ref(0)
  const breakTime = ref(0)
  const loggedTimes: Ref<LoggedTime[]> = ref([])
  const isRunning = ref(false)
  const onBreak = ref(false)
  const interval: Ref<NodeJS.Timer | null> = ref(null)
  const breakInterval: Ref<NodeJS.Timer | null> = ref(null)
  const breakLimit = ref(99999)

  // Start the main timer
  const start = () => {
    if (onBreak.value) {
      // Stop the break timer and resume the main timer
      stopBreak()
    }

    if (!isRunning.value && !onBreak.value) {
      isRunning.value = true
      interval.value = setInterval(() => {
        time.value++
      }, 1000)
    }
  }

  // Pause both work and break timers
  const pause = () => {
    isRunning.value = false
    if (interval.value) {
      clearInterval(Number(interval.value))
      interval.value = null
    }
    if (breakInterval.value) {
      clearInterval(Number(breakInterval.value))
      breakInterval.value = null
    }
  }

  // Reset the work timer and log the total session (work + break)
  const reset = () => {
    if (onBreak.value) {
      stopBreak()
    }
    logCompleteTime() // Log the full session
    time.value = 0
    breakTime.value = 0 // Reset break time as well
    pause()
  }

  // Start the break timer and pause main timer
  const takeBreak = () => {
    if (!onBreak.value && isRunning.value) {
      pause() // Pause the main timer
      onBreak.value = true
      breakInterval.value = setInterval(() => {
        breakTime.value++
      }, 1000)
    }
  }

  // Stop the break timer without logging, as the full session is logged only on reset
  const stopBreak = () => {
    if (onBreak.value) {
      onBreak.value = false
      if (breakInterval.value) {
        clearInterval(Number(breakInterval.value))
        breakInterval.value = null
      }
    }
  }

  //Get existing logs from local store
  const getLogs = () => {
    if (localStorage.getItem('loggedTimes') != null) {
      loggedTimes.value = JSON.parse(localStorage.getItem('loggedTimes') as string)
    }
  }

  const clearLogs = () => {
    loggedTimes.value = []
    localStorage.removeItem('loggedTimes')
  }

  // Log the entire session (work + break) when reset is called
  const logCompleteTime = () => {
    loggedTimes.value.push({
      date: new Date().toLocaleDateString(),
      totalTime: formattedTime.value,
      breakTime: formattedBreakTime.value
    })

    //Save logs to localStorage so it can be retrieved
    localStorage.setItem('loggedTimes', JSON.stringify(loggedTimes.value))
  }

  //updates custom break limit
  const setCustomBreakTime = (customLimit: number) => {
    if (customLimit > 60) {
      breakLimit.value = 99999
    } else {
      breakLimit.value = customLimit
    }
  }

  // Format the work time
  const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60)
    const seconds = time.value % 60
    const hours = Math.floor(minutes / 60)
    return `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  })

  // Format the break time
  const formattedBreakTime = computed(() => {
    const minutes = Math.floor(breakTime.value / 60)
    const seconds = breakTime.value % 60
    const hours = Math.floor(minutes / 60)
    return `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  })

  return {
    time,
    breakTime,
    loggedTimes,
    isRunning,
    onBreak,
    formattedTime,
    formattedBreakTime,
    breakLimit,
    start,
    pause,
    reset,
    takeBreak,
    clearLogs,
    getLogs,
    setCustomBreakTime
  }
})
