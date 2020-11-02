<template>
  <div class="input">
    <input
      v-model="message"
      @keyup="didChange"
      @keydown.enter="send"
      placeholder="Message"
    />
    <button @click="send">Send</button>
  </div>
</template>
<script lang="js">
import { mapActions } from "vuex";
import axios from 'axios';
import EVENTS from '../../shared/enums/events';

const API_KEY = 'qNURMSF5tkvQUNWmfDBpRURYOfAGZlom';

export default {
  name: "ChatInput",
  props: [],
  data () {
    return {
      message: '',
      typing: false,
    }
  },
  methods: {
    ...mapActions(["someoneTyping", "setUsername"]),
    didChange() {
      const isTyping = this.message !== '';

      if (this.typing !== isTyping) {
        this.emit(EVENTS.TYPING, isTyping);
        this.typing = isTyping
      }
    },
    async send() {
      if(/^\/gif\s */.test(this.message)) {
        const criteria = this.message.replace('/gif ', '')
        const result = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${criteria}&limit=1&offset=0&rating=g&lang=en`)

        this.emit(EVENTS.IMAGE_MESSAGE, {url: result.data.data[0].images.original.url})
      } else {
        this.emit(EVENTS.TEXT_MESSAGE, this.message);
      }
      this.message = '';
      this.emit(EVENTS.TYPING, false);
    },
    emit(eventType, payload) {
      this.$emit('emitEvent', {eventType, payload});
    }
  },
};
</script>
<style lang="scss">
.input {
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 8px 24px 0 24px;

  input {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #e6e6e6;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    &::placeholder {
      font-family: Arial, Helvetica, sans-serif;
      font-weight: normal;
      font-size: 14px;
      color: #a3a3a3;
    }
  }

  button {
    height: 42px;
    background: none;
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    font-size: 14px;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: 1px solid #e6e6e6;
    border-left: none;
    color: #a3a3a3;
  }
}
</style>
