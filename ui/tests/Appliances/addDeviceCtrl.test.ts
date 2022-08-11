import AddDeviceCtrl from '@/components/Appliances/AddDeviceCtrl.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createClient, VILLUS_CLIENT } from 'villus'
import { useDeviceMutations } from '@/store/Mutations/deviceMutations'

const wrapper = mount(AddDeviceCtrl, { 
  global: {
    stubs: {
      teleport: true
    },
    plugins: [createTestingPinia()],
    provide: {
      [VILLUS_CLIENT as unknown as string]: createClient({
        url: 'http://test/graphql'
      })
    }
  }
})

test('The component mounts', () => {
  expect(wrapper).toBeTruthy()
})

test('The modal should open when the add device btn is clicked', async () => {
  const btn = wrapper.get('[data-test="add-device-btn"]')
  const modalInput1 = wrapper.find('[data-test="name-input"]')

  // modal should be closed
  expect(modalInput1.exists()).toBeFalsy()

  await btn.trigger('click')

  // modal should be open
  const modalInput2 = wrapper.find('[data-test="name-input"]')
  expect(modalInput2.exists()).toBeTruthy()
})

test('The cancel btn should close the modal', async () => {
  await wrapper.get('[data-test="add-device-btn"]').trigger('click')
  await wrapper.get('[data-test="cancel-btn"]').trigger('click')

  const modalInput = wrapper.find('[data-test="name-input"]')
  expect(modalInput.exists()).toBeFalsy()
})

test('The save btn should enable if name, location, monitoring, ip are added', async () => {
  await wrapper.get('[data-test="add-device-btn"]').trigger('click')
  
  const nameInput = wrapper.get('[data-test="name-input"] .feather-input')
  const locationInput = wrapper.get('[data-test="location-name-input"] .feather-input')
  const monitoringAreaInput = wrapper.get('[data-test="monitoring-area-input"] .feather-input')
  const ipInput = wrapper.get('[data-test="ip-input"] .feather-input')
  const saveBtn = wrapper.get('[data-test="save-btn"]')

  // should be disabled
  expect(saveBtn.attributes('aria-disabled')).toBe('true')
  
  await nameInput.setValue('some name')
  await locationInput.setValue('some location name')
  await monitoringAreaInput.setValue('some monitoring area')
  await ipInput.setValue('127.0.0.1')
  
  // should be enabled
  expect(saveBtn.attributes('aria-disabled')).toBeUndefined()
})

test('The add device mutation is called', async () => {
  const deviceMutations = useDeviceMutations()
  const addDevice = vi.spyOn(deviceMutations, 'addDevice')

  await wrapper.get('[data-test="add-device-btn"]').trigger('click')

  const nameInput = wrapper.get('[data-test="name-input"] .feather-input')
  const locationNameInput = wrapper.get('[data-test="location-name-input"] .feather-input')
  const monitoringAreaInput = wrapper.get('[data-test="monitoring-area-input"] .feather-input')
  
  const saveBtn = wrapper.get('[data-test="save-btn"]')

  await nameInput.setValue('some name')
  await locationNameInput.setValue('some location name')
  await monitoringAreaInput.setValue('some monitoring area')
  await saveBtn.trigger('click')

  // expect save device query to be called
  expect(addDevice).toHaveBeenCalledTimes(1)
})
