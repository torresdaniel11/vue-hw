import Vue from "vue";
import Vuex from "vuex";
import GroupedMessage from "@/shared/models/groupesMessage";
import Message from "@/shared/models/message";
import User from "@/shared/models/user";
import Users from "@/shared/models/users";
import UsersConnected from "@/shared/models/usersConnected";
import UsersTyping from "@/shared/models/usersTyping";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: "",
    groupedMessages: [] as GroupedMessage[],
    lastWhoWrite: "",
    users: {} as Users,
    whoIsTyping: "",
    usersStatus: {} as UsersConnected
  },
  getters: {
    username(state) {
      return state.username;
    },
    users(state) {
      return state.users;
    },
    groupedMessages(state) {
      return state.groupedMessages;
    },
    whoIsTyping(state) {
      return state.whoIsTyping;
    },
    usersStatus(state) {
      return state.usersStatus;
    }
  },
  mutations: {
    addToLastWhoWrite(state, payload) {
      const last = state.groupedMessages[state.groupedMessages.length - 1];

      last.time = payload.time;
      last.messages.push(payload);
    },
    addNewLastWhoWrite(state, payload) {
      state.lastWhoWrite = payload.username;
      state.groupedMessages.push({
        username: payload.username,
        time: payload.time,
        messages: [payload]
      });
    },
    addUser(state, payload: User) {
      state.users[payload.username] = payload;
    },
    setUsername(state, payload) {
      state.username = payload;
    },
    setWhoIsTyping(state, payload) {
      state.whoIsTyping = payload;
    },
    userConnected(state, payload) {
      state.usersStatus = {
        ...state.usersStatus,
        [payload]: true
      };
    },
    userDisconnected(state, payload) {
      state.usersStatus = {
        ...state.usersStatus,
        [payload]: false
      };
    }
  },
  actions: {
    newMessage(context, payload: Message) {
      if (!context.state.users[payload.username]) {
        context.dispatch("addUser", payload.username);
      }

      if (context.state.lastWhoWrite === payload.username) {
        context.commit("addToLastWhoWrite", payload);
      } else {
        context.commit("addNewLastWhoWrite", payload);
      }
    },
    addUser(context, username: string) {
      context.commit("addUser", {
        username: username,
        image: `https://ui-avatars.com/api/?font-size=0.33&name=${username}&background=eee&color=000&size=80`
      });
    },
    someoneTyping(context, payload: UsersTyping) {
      let typing = "";
      let areTyping = 0;

      Object.keys(payload).forEach(key => {
        if (areTyping < 2 && payload[key] && key !== context.state.username) {
          typing = areTyping++ ? "People are typing..." : `${key} is typing...`;
        }
      });

      context.commit("setWhoIsTyping", typing);
    },
    setUsername(context, username: string) {
      context.commit("setUsername", username);
    },
    userConnected(context, username: string) {
      context.commit("userConnected", username);
    },
    userDisconnected(context, username: string) {
      context.commit("userDisconnected", username);
    }
  }
});

export default store;
