<template lang="pug">
  .notes-container
    search-box(@update-search-criteria="updateSearchCriteria")
    notes(
      :hasPrevPage="hasPrevPage"
      :hasNextPage="hasNextPage"
      :filteredNotes="filteredNotes"
      :page="page"
      :numberOfNotes="numberOfNotes"
      @add-note="addNote"
      @toggle-done="toggleDone"
      @delete-note="deleteNote"
    )
    page-navigation(
      @go-previous="goPrevious"
      @go-next="goNext"
      :hasPrevPage="hasPrevPage"
      :hasNextPage="hasNextPage"
    )
</template>

<script lang="ts">
import {
  defineComponent,
  Ref,
  ref,
  onMounted,
  watch,
  onBeforeUnmount,
} from '@vue/composition-api';

import Notes from './Notes/Notes.vue';
import PageNavigation from './PageNavigation/PageNavigation.vue';
import SearchBox from './SearchBox/SearchBox.vue';

const config = {
  SERVICE_URL: 'http://localhost:3000/api/v1',
  NUMBER_OF_ITEMS_PER_PAGE: 4,
};

interface Note {
  _id: string,
  description: string,
  done: boolean,
  createdAt: Date,
  updatedAt: Date,
}

interface PageInfo {
  itemCount: number,
  offset: number,
  limit: number,
  pageCount: number,
  page: number,
  hasPrevPage: boolean,
  hasNextPage: boolean,
}

interface RequestInterface {
  meta: PageInfo,
  items: Note[],
}

const debounce = (n: number, fn: (...params: any[]) => any, immed = false) => {
  let timer: number;

  return function (this: any, ...args: any[]): number {
    if (timer === undefined && immed) {
      fn.apply(this, args);
    }

    window.clearTimeout(timer);
    timer = window.setTimeout((): void => {
      fn.apply(this, args);
    }, n);
    return timer;
  };
};

export default defineComponent({
  name: 'NotesContainer',
  components: {
    SearchBox,
    Notes,
    PageNavigation,
  },
  setup() {
    const hasPrevPage: Ref<boolean> = ref<boolean>(false);
    const hasNextPage: Ref<boolean> = ref<boolean>(false);
    const filteredNotes: Ref<Note[]> = ref<Note[]>([]);
    const searchCriteria: Ref<string> = ref<string>('');
    const refresh: Ref<number> = ref<number>(-1);
    const page: Ref<number> = ref<number>(0);
    const numberOfNotes: Ref<number> = ref<number>(0);

    const clearAutomaticRefresh = (value: number): void => {
      window.clearInterval(value);
    };

    const getNotes = async (): Promise<void> => {
      try {
        const response = await fetch(`${config.SERVICE_URL}/todo/?limit=${
          config.NUMBER_OF_ITEMS_PER_PAGE
        }&offset=${
          config.NUMBER_OF_ITEMS_PER_PAGE * page.value
        }&description=${
          searchCriteria.value.trim()
        }`);
        const res: RequestInterface = await response.json() as RequestInterface;

        filteredNotes.value = res.items;
        hasPrevPage.value = res.meta.hasPrevPage;
        hasNextPage.value = res.meta.hasNextPage;
        numberOfNotes.value = res.meta.itemCount;
      } catch (e) {
        window.console.error(e);
        window.alert('There was an error processing the request');
      }
    };

    const goPrevious = (): void => {
      page.value = Math.max(page.value - 1, 0);
    };

    const goNext = (): void => {
      page.value = Math.min(page.value + 1, numberOfNotes.value);
    };

    const addNote = async (value: string): Promise<void> => {
      const description = value.trim();

      if (description === '') return;

      try {
        await fetch(`${config.SERVICE_URL}/todo/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description,
          }),
        });
        await getNotes();
      } catch (e) {
        window.console.error(e);
        window.alert('There was an error processing the request');
      }
    };

    const deleteNote = async (id: string): Promise<void> => {
      try {
        await fetch(`${config.SERVICE_URL}/todo/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // if in the page there is only one note and gets deleted, go back to the prev page.
        if (filteredNotes.value.length === 1) {
          goPrevious();
        } else {
          await getNotes();
        }
      } catch (e) {
        console.error(e);
        window.alert('There was an error processing the request');
      }
    };

    const toggleDone = async (note: Note, id: string): Promise<void> => {
      try {
        await fetch(`${config.SERVICE_URL}/todo/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...note,
            done: !note.done,
          }),
        });
        await getNotes();
      } catch (e) {
        console.error(e);
        window.alert('There was an error processing the request');
      }
    };

    const updateSearchCriteria = (value: string) => {
      searchCriteria.value = value;
    };

    onMounted(getNotes);

    // unbind autorefresh
    onBeforeUnmount(clearAutomaticRefresh);

    watch(refresh, (newValue: number, oldValue: number): void => {
      clearAutomaticRefresh(oldValue);
    });

    // every time the page changes will setTimeout
    watch([page], (): void => {
      refresh.value = window.setInterval(() => {
        filteredNotes.value = [...filteredNotes.value];// re-render list
      }, 60000);// 60000ms = 1min
    }, {
      immediate: true,
    });

    watch(page, async (): Promise<void> => {
      await getNotes();
    });

    const searchCriteriaDebounce = debounce(500, async (): Promise<void> => {
      if (page.value === 0) {
        await getNotes();
      }

      page.value = 0;// reset pagination
    }, true);

    watch(searchCriteria, searchCriteriaDebounce);

    return {
      hasPrevPage,
      hasNextPage,
      filteredNotes,
      searchCriteria,
      refresh,
      page,
      numberOfNotes,
      deleteNote,
      addNote,
      goPrevious,
      goNext,
      toggleDone,
      updateSearchCriteria,
    };
  },
});
</script>

<style lang="scss">
input, button {
  border: 0;
  &:focus {
    outline: none;
  }
}
button, input[type="submit"] {
  &:not(:disabled) {
    cursor: pointer;
  }
}

.notes-container {
  width: 100%;
  max-width: 36.75rem;
  height: 19.125rem;
}
</style>
