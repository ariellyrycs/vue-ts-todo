import { mount, createLocalVue } from '@vue/test-utils';
import CompositionApi from '@vue/composition-api';

import PageNavigation from '../PageNavigation.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);

describe('PageNavigation', () => {
  test('should show disabled buttons', () => {
    const wrapper = mount(PageNavigation, {
      propsData: {
        hasPrevPage: false,
        hasNextPage: false
      },
      localVue
    });
    expect(wrapper.find('button:nth-of-type(1)').attributes('disabled')).toBe('disabled');
    expect(wrapper.find('button:nth-of-type(2)').attributes('disabled')).toBe('disabled');
  });
  test('should show disabled buttons', () => {
    const wrapper = mount(PageNavigation, {
      propsData: {
        hasPrevPage: true,
        hasNextPage: true
      },
      localVue
    });
    expect(wrapper.find('button:nth-of-type(1)').attributes('disabled')).toBe(undefined);
    expect(wrapper.find('button:nth-of-type(2)').attributes('disabled')).toBe(undefined);
  });
});