import { shallowMount } from '@vue/test-utils';
import App from '../App.vue';
import NotesContainer from '../components/NotesContainer.vue';

describe('App', () => {
  test('load container', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.getComponent(NotesContainer).exists()).toBeTruthy();
  });
});