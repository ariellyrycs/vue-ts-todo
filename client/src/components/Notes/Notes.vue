<template lang="pug">
.notes
  form(name="record-form" "@submit.prevent"="onSubmit")
    input(type="text" ref="newNote" placeholder="Take a note").new-ask-field
    input(type="submit" value="").plus-sign
  ul(v-bind:style="[containerStyles]").unstyled
    li.record(
      "v-for"="note in filteredNotes"
      :key="note._id"
      :style="[noteStyles]" :class="{'checked': note.done}"
    )
      button('@click'="$emit('toggle-done', note, note._id)").circle
      .description
        span.summary-note {{note.description | fistUpperCase}}
        span.time {{note.createdAt | elapsedTimeFormat}}
      button('@click'="$emit('delete-note', note._id)").close
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const config = {
  NOTE_HEIGHT: 50,
  NUMBER_OF_ITEMS_PER_PAGE: 4,
};

export default defineComponent({
  name: 'Notes',
  props: {
    hasPrevPage: {
      type: Boolean,
      default: false,
    },
    hasNextPage: {
      type: Boolean,
      default: false,
    },
    filteredNotes: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Number,
      default: 0,
    },
    numberOfNotes: {
      type: Number,
      default: 0,
    },
    itemsPerPage: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      containerStyles: {
        height: `${config.NUMBER_OF_ITEMS_PER_PAGE * config.NOTE_HEIGHT}px`,
      },
      noteStyles: {
        height: `${config.NOTE_HEIGHT}px`,
      },
    };
  },
  methods: {
    onSubmit() {
      const $newNote: HTMLInputElement = this.$refs.newNote as HTMLInputElement;

      this.$emit('add-note', $newNote.value);
      $newNote.value = '';
    },
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
  .new-ask-field {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-left: 1.875rem;
    &::placeholder {
      font-size: 1rem;
      font-weight: 400;
    }
  }
  > form {
    height: 3.625rem;
    display: flex;
    > input[type="submit"] {
      width: 3.75rem;
      border: 0;
      background-color: $white;
      font-size: 1rem;
      color: $gray64;
    }
  }
  > ul {
    overflow-y: scroll;
  }
}
.record {
  border-top: 1px solid rgba(0, 0, 0, 0.17);
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  .close {
    display: none;
  }
  &:hover .close {
    display: block;
  }
  .description {
    box-sizing: border-box;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 3.625rem;
    overflow: hidden;
  }
  .close {
    width: 2.5rem;
    height: 100%;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
}
.summary-note {
  font-weight: 100; //Couldn't find roboto 200
  font-size: 1rem;
  text-overflow: ellipsis; //no ADA complience.
  max-width: calc(100% - 3.75rem);
  overflow: hidden;
  white-space: nowrap;
}
.time {
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

.circle {
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
.checked {
  color: $silverFoil;
  .circle {
    background: url(/icons/check-mark.svg) no-repeat;
  }
  .summary-note {
    text-decoration: line-through;
  }
}
.plus-sign {
  background: url(/icons/plus.svg) no-repeat;
  background-position: center;
}
.close {
  background: url(/icons/cross.svg) no-repeat;
  background-position: center;
}
</style>
