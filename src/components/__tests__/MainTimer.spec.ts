import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MainTimer from '../MainTimer.vue'
import { createTestingPinia } from '@pinia/testing'
import { useTimerStore } from '@/stores/timerStore'

describe('StudyTimer.vue', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(MainTimer, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    expect(wrapper.find('h1').text()).toBe('Study Timer')
  })

  it('starts the timer when the "Start" button is clicked', async () => {
    const wrapper = mount(MainTimer, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    const timerStore = useTimerStore()

    expect(timerStore.isRunning).toBe(false)
    await wrapper.find('#start-button').trigger('click')
    expect(timerStore.start).toHaveBeenCalled()
  })

  it('displays the break time and applies flash effect during the break', async () => {
    const wrapper = mount(MainTimer, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    const timerStore = useTimerStore()

    timerStore.onBreak = true
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.flash').exists()).toBe(true)
    expect(wrapper.find('.text-2xl').text()).toContain('Time on break')
  })

  it('displays "Finish break" when on a break', async () => {
    const wrapper = mount(MainTimer, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    const timerStore = useTimerStore()
    timerStore.onBreak = true

    await wrapper.vm.$nextTick()
    const startButton = wrapper.find('button')

    expect(startButton.text()).toBe('Finish break')
  })
})
