<template>
  <div class="footer">
    <span>
      {{whoIsTyping || ''}}
    </span>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  name: 'ChatFooter',
  computed: {
    ...mapGetters(['whoIsTyping'])
  }
}
</script>

<style scoped lang="scss">
.footer {
  min-height: 14px;
  margin: 8px 24px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-size: 12px;
  color: #a3a3a3;
}
</style>