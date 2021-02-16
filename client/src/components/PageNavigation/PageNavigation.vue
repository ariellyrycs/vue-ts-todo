<template lang="pug">
.record-nav
  button(@click="$emit('go-previous')" :disabled="!hasPrevPage" )
    img(src="/icons/arrow-left.svg")
  span
  button(@click="$emit('go-next')" :disabled="!hasNextPage" )
    img(src="/icons/arrow-right.svg")
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageNavigation',
  props: {
    hasPrevPage: {
      type: Boolean,
      default: false,
    },
    hasNextPage: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style lang="scss">
.record-nav {
  margin-left: auto;
  margin-top: 16px;
  width: 69px;
  height: 34px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  background-color: #fff;
  align-items: center;
  > span {
    display: block;
    height: 19px;
    width: 1px;
    background-color: #A8A8A8;
  }
  > button {
    background-color: #fff;
    height: 100%;
    flex: 1;
    &:hover {
      background-color: #ddd;
    }
    &:disabled {
      background-color: #eee;
    }
  }
}
</style>
