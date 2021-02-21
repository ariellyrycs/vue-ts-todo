import { shallowMount, createLocalVue } from '@vue/test-utils';
import CompositionApi from '@vue/composition-api';

import NotesContainer from '../NotesContainer.vue';
import PageNavigation from '../PageNavigation/PageNavigation.vue';
import Notes from '../Notes/Notes.vue';
import SearchBox from '../SearchBox/SearchBox.vue';
import 'isomorphic-fetch';

const localVue = createLocalVue();
localVue.use(CompositionApi);
type MyFn = (...args: any[]) => any;

jest.mock('ts-debounce', () => ({
  debounce: jest.fn(() => {
    console.log('test');
  }),
}));

describe('NotesContainer', () => {
  let jsdomAlert: MyFn;
  beforeAll(() => {
    jsdomAlert = window.alert;
    window.alert = () => {};
  });

  afterAll(() => {
    window.alert = jsdomAlert;
  });

  test('show load components', () => {
    const wrapper = shallowMount(NotesContainer, { localVue });
    expect(wrapper.find('.container').exists()).toBeTruthy();
    expect(wrapper.getComponent(PageNavigation).exists()).toBeTruthy();
    expect(wrapper.getComponent(Notes).exists()).toBeTruthy();
    expect(wrapper.getComponent(SearchBox).exists()).toBeTruthy();
  });
});