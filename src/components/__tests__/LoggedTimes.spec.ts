import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useTimerStore } from '@/stores/timerStore'
import LoggedTimes from '../LoggedTimes.vue'

describe('LoggedTimes.vue', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(LoggedTimes, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    expect(wrapper.find('h3').text()).toBe('Logged Times')
  })

  it('renders the times table', async () => {
    const wrapper = mount(LoggedTimes, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    const timerStore = useTimerStore()

    timerStore.loggedTimes = [
      {
        totalTime: '00:00:10',
        date: '10/09/2024',
        breakTime: '00:00:01'
      }
    ]

    await wrapper.vm.$nextTick()
    expect(wrapper.find('#table-header-date').text()).toContain('Date')
    expect(wrapper.find('#table-header-time').text()).toContain('Logged Time')
    expect(wrapper.find('#table-header-break').text()).toContain('Break Time')

    expect(wrapper.find('#table-date-0').text()).toContain('10/09/2024')
    expect(wrapper.find('#table-total-time-0').text()).toContain('00:00:10')
    expect(wrapper.find('#table-break-time-0').text()).toContain('00:00:01')
  })
})
