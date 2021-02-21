import { mount, createLocalVue } from '@vue/test-utils';
import CompositionApi from '@vue/composition-api';
import Notes from '../Notes.vue';

const localVue = createLocalVue();
localVue.use(CompositionApi);

describe('Notes', () => {
  test('show load components', () => {
    const wrapper = mount(Notes, {
      propsData: {
        filteredNotes: [{
          _id: '602881b69b35680012b39995',
          description: 'Today i have to go to the theater',
          createdAt: '2021-02-14T01:49:42.299Z'
        }]
      },
      localVue
    });
    const firstLI = wrapper.find('li:nth-of-type(1)');
    expect(firstLI.find('.summary-note').text()).toBe('Today i have to go to the theater');
    expect(firstLI.find('.time').text()).toContain('minute');
  });
  test('should get the search text value', () => {
    const wrapper = mount(Notes, {
      propsData: {
        filteredNotes: [{
          _id: '602881b69b35680012b39995',
          description: 'Today i have to go to the theater',
          createdAt: '2021-02-14T01:49:42.299Z'
        }]
      },
      localVue
    });

    wrapper.find('input[type="text"]').setValue('search-1');
    wrapper.find('form').trigger('submit');
    expect((wrapper.emitted()['add-note'] as any)[0]).toEqual(['search-1']);
  });
  test('should be able to toggle done', () => {
    const note = {
      _id: '602881b69b35680012b39995',
      description: 'Today i have to go to the theater',
      createdAt: '2021-02-14T01:49:42.299Z'
    };
    const wrapper = mount(Notes, {
      propsData: {
        filteredNotes: [note]
      },
      localVue
    });
    const firstLI = wrapper.find('li:nth-of-type(1)');
    firstLI.find('button:nth-of-type(1)').trigger('click');
    expect((wrapper.emitted()['toggle-done'] as any)[0]).toEqual([{
      '_id': '602881b69b35680012b39995',
      'createdAt': '2021-02-14T01:49:42.299Z',
      'description': 'Today i have to go to the theater'
    }, '602881b69b35680012b39995']);
  });

  test('should be able to delete note', () => {
    const note = {
      _id: '602881b69b35680012b39995',
      description: 'Today i have to go to the theater',
      createdAt: '2021-02-14T01:49:42.299Z'
    };
    const wrapper = mount(Notes, {
      propsData: {
        filteredNotes: [note]
      },
      localVue
    });
    const firstLI = wrapper.find('li:nth-of-type(1)');
    firstLI.find('button:nth-of-type(2)').trigger('click');
    expect((wrapper.emitted()['delete-note'] as any)[0]).toEqual(['602881b69b35680012b39995']);
  });
});