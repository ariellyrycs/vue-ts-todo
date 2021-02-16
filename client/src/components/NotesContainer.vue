<template lang="pug">
  .container
    search-box(:searchCriteria.sync="searchCriteria")
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
import { defineComponent } from '@vue/composition-api';

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
  hasNextPage: boolean
}

interface RequestInterface {
  meta: PageInfo,
  items: Note[]
}

export default defineComponent({
  name: 'NotesContainer',
  async created(): Promise<void> {
    await this.getNotes();
  },
  beforeDestroy() {
    this.clearAutomaticRefresh();
  },
  components: {
    SearchBox,
    Notes,
    PageNavigation,
  },
  data() {
    return {
      hasPrevPage: false,
      hasNextPage: false,
      filteredNotes: [],
      searchCriteria: '',
      refresh: null,
      page: 0,
      numberOfNotes: 0,
    };
  },
  watch: {
    async searchCriteria() {
      this.$data.page = 0;// reset pagination
      await this.getNotes();
    },
  },
  methods: {
    clearAutomaticRefresh() {
      clearInterval(this.$data.refresh);
      this.$data.refresh = null;
    },
    setupAutomaticRefresh() {
      this.clearAutomaticRefresh();
      this.$data.refresh = setInterval(() => {
        this.$data.filteredNotes = [...this.$data.filteredNotes];
      }, 60000);// 60000ms = 1min
    },
    async getNotes(): Promise<void> {
      try {
        const response = await fetch(`${config.SERVICE_URL}/todo/?limit=${
          config.NUMBER_OF_ITEMS_PER_PAGE
        }&offset=${
          config.NUMBER_OF_ITEMS_PER_PAGE * this.$data.page
        }&description=${
          this.$data.searchCriteria.trim()
        }`);
        const res: RequestInterface = await response.json() as RequestInterface;

        this.$data.filteredNotes = res.items;
        this.$data.hasPrevPage = res.meta.hasPrevPage;
        this.$data.hasNextPage = res.meta.hasNextPage;
        this.$data.numberOfNotes = res.meta.itemCount;
        this.setupAutomaticRefresh();
      } catch (e) {
        console.error(e);
        alert('There was an error processing the request');
      }
    },
    async addNote(value: string): Promise<void> {
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
        await this.getNotes();
      } catch (e) {
        console.error(e);
        alert('There was an error processing the request');
      }
    },
    async deleteNote(id: string): Promise<void> {
      try {
        await fetch(`${config.SERVICE_URL}/todo/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // if in the page there is only one note and gets deleted, go back to the prev page.
        if (this.$data.filteredNotes.length === 1) {
          await this.goPrevious();
        } else {
          await this.getNotes();
        }
      } catch (e) {
        console.error(e);
        alert('There was an error processing the request');
      }
    },
    async toggleDone(note: Note, id: string): Promise<void> {
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
        await this.getNotes();
      } catch (e) {
        console.error(e);
        alert('There was an error processing the request');
      }
    },
    async goPrevious() {
      this.$data.page = Math.max(this.$data.page - 1, 0);
      await this.getNotes();
    },
    async goNext() {
      this.$data.page = Math.min(this.$data.page + 1, this.$data.numberOfNotes);
      await this.getNotes();
    },
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
.unstyled {
  list-style: none;
  padding: 0;
  margin: 0;
}

.container {
  width: 100%;
  max-width: 588px;
  height: 306px;
}
</style>
