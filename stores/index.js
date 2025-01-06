import { defineStore } from "pinia";
// import { piniaPluginPersistedstate } from "pinia-plugin-persistedstate/nuxt";
import { ref } from "vue";

export const useLoginStore = defineStore(
  "loginUser",
  () => {
    const loginUser = ref({
      name: "",
      accountKey: "",
      avatar: 1,
    });

    function setLoginUser(userInfo = {}) {
      console.log("setLoginUser");
      loginUser.value = {
        ...loginUser.value,
        ...userInfo,
      };
      console.log("loginUser.value", loginUser.value);
    }

    function logout() {
      loginUser.value = {};
    }

    return {
      loginUser,
      setLoginUser,
      logout,
    };
  },
  {
    persist: true,
    storage: piniaPluginPersistedstate.localStorage(),
  }
);
