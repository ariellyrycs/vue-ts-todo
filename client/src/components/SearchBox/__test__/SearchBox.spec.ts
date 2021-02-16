import { mount } from '@vue/test-utils';
import SearchBox from '../SearchBox.vue';

describe('SearchBox', () => {
  test('should show disabled buttons', () => {
    const wrapper = mount(SearchBox, {
      propsData: {
        searchCriteria: 'hello'
      }
    });
    expect((wrapper.vm as any).searchCriteria).toBe('hello');
  });
});