import { shallowMount, createLocalVue } from '@vue/test-utils';
import CompositionApi from '@vue/composition-api';
import App from '../App.vue';
import NotesContainer from '../components/NotesContainer.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);

describe('App', () => {
  test('load container', () => {
    const wrapper = shallowMount(App, { localVue });
    expect(wrapper.getComponent(NotesContainer).exists()).toBeTruthy();
  });
});