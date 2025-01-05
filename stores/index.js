import { defineStore } from "pinia";
// import { piniaPluginPersistedstate } from "pinia-plugin-persistedstate/nuxt";
import { ref } from "vue";

export const useLoginStore = defineStore(
  "loginUser",
  () => {
    const loginUser = ref({
      name: "",
      accountKey: "",
    });

    function setLoginUser(userInfo = {}) {
      loginUser.value = {
        ...loginUser.value,
        ...userInfo,
      };
    }

    return {
      loginUser,
      setLoginUser,
    };
  }
  // {
  //   persist: true,
  //   storage: piniaPluginPersistedstate.localStorage(),
  // }
);
