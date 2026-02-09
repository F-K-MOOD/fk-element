import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import Input from './Input.vue'

describe('Input', () => {
  test('render prefix and suffix', () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        size: 'large',
      },
      slots: {
        prefix: '<span>前缀</span>',
        suffix: '<span>后缀</span>',
      },
    })
    console.log(wrapper.html())
    expect(wrapper.classes()).toContain('fk-input--large')
    expect(wrapper.classes()).toContain('fk-input--text')
  })
})