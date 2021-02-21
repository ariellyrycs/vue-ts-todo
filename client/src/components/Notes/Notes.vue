<template lang="pug">
.notes
  form(name="record-form" "@submit.prevent"="onSubmit").add-note--full
    input(type="text" ref="newNote" placeholder="Take a note").add-note__field
    input(type="submit" value="").add-note__button
  ul(v-bind:style="[containerStyles]").notes__list
    li(
      "v-for"="note in filteredNotes"
      :key="note._id"
      :style="[noteStyles]" :class="{'notes__list-item--checked': note.done}"
    ).notes__list-item
      button('@click'="$emit('toggle-done', note, note._id)").notes__circle-button--done
      .description--full
        span.description__message-label {{note.description | firstUpperCase}}
        span.description__time-label {{note.createdAt | elapsedTimeFormat}}
      button('@click'="$emit('delete-note', note._id)").notes__button--close
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

const config = {
  NOTE_HEIGHT: 50,
  NUMBER_OF_ITEMS_PER_PAGE: 4,
};

export default defineComponent({
  name: 'Notes',
  props: {
    filteredNotes: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const newNote = ref(null);

    const onSubmit = (): void => {
      const $newNote: HTMLInputElement = newNote.value as HTMLInputElement;

      emit('add-note', $newNote.value);
      $newNote.value = '';
    };

    return {
      onSubmit,
      newNote,
      containerStyles: {
        height: `${config.NUMBER_OF_ITEMS_PER_PAGE * config.NOTE_HEIGHT}px`,
      },
      noteStyles: {
        height: `${config.NOTE_HEIGHT}px`,
      },
    };
  },
});
</script>
<style lang="scss">
@import "../../variables.scss";
.notes {
  box-sizing: border-box;
  margin-top: 1rem;
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.17);
  background-color: $white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.add-note--full {
  height: 3.625rem;
  display: flex;
}

.add-note__field {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-left: 1.875rem;
  &::placeholder {
    font-size: 1rem;
    font-weight: 400;
  }
}

.add-note__button {
  width: 3.75rem;
  border: 0;
  background-color: $white;
  font-size: 1rem;
  color: $gray64;
  background: url(/icons/plus.svg) no-repeat;
  background-position: center;
}

.notes__list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.notes__button--close {
  display: none;
  background: url(/icons/cross.svg) no-repeat;
  background-position: center;
}

.notes__list-item {
  border-top: 1px solid rgba(0, 0, 0, 0.17);
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;

  &:hover .notes__button--close {
    display: block;
  }
  .description--full {
    box-sizing: border-box;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 3.625rem;
    overflow: hidden;
  }
  .notes__button--close {
    width: 2.5rem;
    height: 100%;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
}

.description__message-label {
  font-weight: 100; //Couldn't find roboto 200
  font-size: 1rem;
  text-overflow: ellipsis; //no ADA complience.
  max-width: calc(100% - 3.75rem);
  overflow: hidden;
  white-space: nowrap;
}

.description__time-label {
  width: 3.75rem;
  font-weight: 100; //Couldn't find roboto 200
  font-size: 0.625rem;
  color: $gray37;
  margin-left: 0.375rem;
  margin-right: 0.375rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.notes__circle-button--done {
  margin-right: 0.4375rem;
  height: 2rem;
  width: 2rem;
  background: url(/icons/circle.svg) no-repeat;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 1.125rem;
}

.notes__list-item--checked {
  color: $silverFoil;
  .notes__circle-button--done {
    background: url(/icons/check-mark.svg) no-repeat;
  }
  .description__message-label {
    text-decoration: line-through;
  }
}
</style>
