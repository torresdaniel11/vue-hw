<template>
  <div class="container">
    <div class="chat">
      <div class="messages">
        <div class="message" v-for="(m, key) in groupedMessages" :key="key">
          <ChatMessage :groupedMessage="m"></ChatMessage>
        </div>
      </div>
      <ChatInput @emitEvent="emitEvent"></ChatInput>
      <ChatFooter></ChatFooter>
    </div>
  </div>
</template>

<script lang="js">
import { mapGetters, mapActions } from 'vuex';
import io from 'socket.io-client';

import ChatFooter from '../components/chat/_ChatFooter.vue';
import ChatInput from '../components/chat/_ChatInput.vue';
import ChatMessage from '../components/chat/_ChatMessage.vue';
import EVENTS from '../shared/enums/events.ts';

let socket
export default {
  name: 'Chat',
  components: {
    ChatFooter,
    ChatInput,
    ChatMessage
  },
  data () {
    return {
      socket,
      grouped: []
    }
  },
  beforeCreate() {
    socket = io(`https://pager-hiring.herokuapp.com/?username=${this.$route.params.username}`);
  },
  created() {
    this.setUsername(this.$route.params.username);
    this.init();
    socket.emit(EVENTS.TYPING, false);
  },
  destroyed() {
    socket.emit(EVENTS.TYPING, false);
    this.socket.disconnect();
  },
  computed: {
    ...mapGetters(['groupedMessages'])
  },
  methods: {
    ...mapActions(['newMessage', 'someoneTyping', 'setUsername', 'userConnected', 'userDisconnected']),
    init() {
      this.socket.on(EVENTS.MESSAGE, (payload) => {
        this.newMessage(payload);
        this.$nextTick(() => this.scrollToBottom());
      });
      this.socket.on(EVENTS.USER_CONNECTED, (username) => {
        this.userConnected(username);
      });
      this.socket.on(EVENTS.USER_DISCONNECTED, (username) => {
        this.userDisconnected(username);
      });
      this.socket.on(EVENTS.IS_TYPING, (usersTyping) => {
        this.someoneTyping(usersTyping);
      });
    },
    emitEvent(eventData){
      this.socket.emit(eventData.eventType, eventData.payload);
    },
    scrollToBottom() {
      const container = this.$el.querySelector(".messages");

      container.scrollTop = container.scrollHeight;
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat {
  width: 600px;
  max-width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
}

.messages {
  max-height: 650px;
  overflow-y: auto;
}

.message {
  padding: 0 24px;
}
</style>
