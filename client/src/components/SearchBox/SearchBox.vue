<template lang="pug">
input(
  placeholder="Search"
  ref="searchNoteText"
  @keyup="keyup"
).search-box
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'SearchBox',
  props: {
    searchCriteria: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const searchNoteText = ref(null);
    const keyup = () => {
      const $searchNoteText: HTMLInputElement = searchNoteText.value as HTMLInputElement;

      emit('update-search-criteria', $searchNoteText.value);
    };

    return {
      keyup,
      searchNoteText,
    };
  },
});
</script>
<style lang="scss">
@import "../../variables.scss";
.search-box {
  box-sizing: border-box;
  width: 100%;
  height: 2rem;
  border-radius: 0.75rem;
  padding-left: 1.875rem;
  background: url(/icons/search.svg) no-repeat scroll 7px 7px, $gray86;
  &::placeholder {
    font-size: 1rem;
    font-weight: 300;
  }
}
</style>
