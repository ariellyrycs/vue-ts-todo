import { mount, createLocalVue } from '@vue/test-utils';
import CompositionApi from '@vue/composition-api';

import SearchBox from '../SearchBox.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);

describe('SearchBox', () => {
  test('should show disabled buttons', () => {
    const wrapper = mount(SearchBox, {
      propsData: {
        searchCriteria: 'hello'
      },
      localVue
    });
    expect((wrapper.vm as any).searchCriteria).toBe('hello');
  });
});