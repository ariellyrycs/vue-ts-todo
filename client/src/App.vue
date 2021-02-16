<template lang="pug">
  #app.todo-app
    notes-container
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import NotesContainer from './components/NotesContainer.vue';

export default defineComponent({
  name: 'App',
  components: {
    NotesContainer,
  },
});
</script>

<style lang="scss">
//roboto 200 not found.
@import url(https://fonts.googleapis.com/css?family=Roboto:100,200,300,400);
@import "./variables.scss";
body {
  font-size: 16px;
}

.todo-app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: roboto;
}
</style>
