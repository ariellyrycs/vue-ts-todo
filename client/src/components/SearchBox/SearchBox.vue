<template lang="pug">
input(
  placeholder="Search"
  v-model="searchCriteria"
  @keyup="$emit('update:searchCriteria', searchCriteria);"
).search-box
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SearchBox',
  props: {
    searchCriteria: {
      type: String,
    },
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
