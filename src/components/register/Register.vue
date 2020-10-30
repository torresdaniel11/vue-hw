<template>
 <div class="container">
   <div class="card">
     <div class="title">
       <h1>Join chat</h1>
     </div>
     <div class="content">
       <label>Please enter your username</label>
       <input type="text" v-model="username" required>
     </div>
     <div class="actions">
       <button @click="join" :disabled="username === ''">Next</button>
     </div>
   </div>
 </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    ...mapActions(['setUsername']),
    join() {
      this.setUsername(this.username);
      this.$router.push(`/chat/${this.username}`);
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

.card {
  width: 600px;
  padding: 0 40px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
}

.title {
  margin: 40px 0;

  h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    font-size: 32px;
  }
}

.content {
  display: flex;
  flex-direction: column;

  label{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 7px;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #e6e6e6;
  }
}

.actions {
  margin: 40px 0;
  display: flex;
  place-content: flex-end;
  align-items: flex-end;

  button {
    min-width: 100px;
    height: 40px;
    border-radius: 5px;
    font-size: 14px;
    background-color: #f78204;
    color: #ffffff;
    font-weight: bold;
    border: none;
  }
}

</style>
