<template>
  <Register></Register>
</template>

<script lang="ts">
import Register from '@/components/register/Register.vue';
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {
    Register
  }
});
</script>
