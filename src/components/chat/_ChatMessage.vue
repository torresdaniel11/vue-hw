<template>
  <div class="message-container">
    <div class="avatar">
      <img :src="users[groupedMessage.username].image">
    </div>
    <div class="message-data">
      <div class="header">
        <label class="username">
          {{groupedMessage.username}} <span v-if="usersStatus[groupedMessage.username]" class="is-online">O&nbsp;</span>
        </label>
        <label class="time">
          {{groupedMessage.time | time}}
        </label>
      </div>

      <div class="body" v-for="(message, key) in groupedMessage.messages" :key="'message'+key">
        <span class="text" :key="`fc-${message}`">
          <div v-if="message.type === 'text'">
            <span>{{message.text}}</span>
          </div>
          <div v-else>
            <img :src="message.url">
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  name: 'ChatMessage',
  props:[
    'groupedMessage'
  ],
  computed: {
    ...mapGetters(['users', 'usersStatus'])
  },
  filters: {
    time(value: Date | string){
      const date = new Date(value);
      const hours = date.getHours();

      return `${hours< 12 ? hours : hours - 12 }:${date.getMinutes()} ${date.getHours()< 12 ? 'am' : 'pm'}`;
    }
  }
}
</script>

<style scoped lang="scss">
.message-container {
  display: flex;
  flex-direction: row;
  margin-top: 24px;

  &:last-child{
    margin-bottom: 24px;
  }
}

.avatar{
  img{
    height: 40px;
    width: auto;
    border-radius: 7px;
  }
}

.message-data {
  margin-left: 12px;

  .username {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 14px;

    span.is-online {
      color: #25ca25;
      background: #25ca25;
      border-radius: 50%;
      font-size: 10px;
      margin-right: 5px;
    }
  }

  .time {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    font-size: 12px;
    color: #a3a3a3;
  }
}

.body {
  margin-top: 4px;

  .text {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    font-size: 14px;
  }
}
</style>
