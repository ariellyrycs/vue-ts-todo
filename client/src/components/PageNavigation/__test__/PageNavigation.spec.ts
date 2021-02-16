import { mount } from '@vue/test-utils';
import PageNavigation from '../PageNavigation.vue';

describe('PageNavigation', () => {
  test('should show disabled buttons', () => {
    const wrapper = mount(PageNavigation, {
      propsData: {
        hasPrevPage: false,
        hasNextPage: false
      }
    });
    expect(wrapper.find('button:nth-of-type(1)').attributes('disabled')).toBe('disabled');
    expect(wrapper.find('button:nth-of-type(2)').attributes('disabled')).toBe('disabled');
  });
  test('should show disabled buttons', () => {
    const wrapper = mount(PageNavigation, {
      propsData: {
        hasPrevPage: true,
        hasNextPage: true
      }
    });
    expect(wrapper.find('button:nth-of-type(1)').attributes('disabled')).toBe(undefined);
    expect(wrapper.find('button:nth-of-type(2)').attributes('disabled')).toBe(undefined);
  });
});