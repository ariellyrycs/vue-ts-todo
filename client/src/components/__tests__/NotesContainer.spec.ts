import { shallowMount, createLocalVue } from '@vue/test-utils';
import NotesContainer from '../NotesContainer.vue';
import PageNavigation from '../PageNavigation/PageNavigation.vue';
import Notes from '../Notes/Notes.vue';
import SearchBox from '../SearchBox/SearchBox.vue';
import 'isomorphic-fetch';

const localVue = createLocalVue();
type MyFn = (...args: any[]) => any;


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
    const wrapper = shallowMount(NotesContainer, { localVue});
    expect(wrapper.find('.container').exists()).toBeTruthy();
    expect(wrapper.getComponent(PageNavigation).exists()).toBeTruthy();
    expect(wrapper.getComponent(Notes).exists()).toBeTruthy();
    expect(wrapper.getComponent(SearchBox).exists()).toBeTruthy();
  });
});