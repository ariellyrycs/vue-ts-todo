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

.notes {
  box-sizing: border-box;
  margin-top: 16px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.17);
  background-color: #FFF;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .new-ask-field {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    &::placeholder {
      font-size: 16px;
      font-weight: 400;
    }
  }
  > form {
    height: 58px;
    display: flex;
    > input[type="submit"] {
      width: 60px;
      border: 0;
      background-color: #fff;
      font-size: 16px;
      color: #A3A3A3;
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
    padding-left: 58px;
    overflow: hidden;
  }
  .close {
    width: 40px;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
}
.summary-note {
  font-weight: 100; //Couldn't find roboto 200
  font-size: 16px;
  text-overflow: ellipsis; //no ADA complience.
  max-width: calc(100% - 60px);
  overflow: hidden;
  white-space: nowrap;
}
.time {
  width: 60px;
  font-weight: 100; //Couldn't find roboto 200
  font-size: 10px;
  color: #5E5E5E;
  margin-left: 6px;
  margin-right: 6px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.circle {
  margin-right: 8px;
  height: 32px;
  width: 32px;
  background: url(/icons/circle.svg) no-repeat;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 18px;
}
.checked {
  color: #AEAEAE;
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
