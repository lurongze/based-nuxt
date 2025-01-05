<script setup>
import { ref } from "vue";

import chatRoom from "~/components/chat-room.vue";
import headNav from "~/components/head-nav.vue";
import loginModal from "~/components/login-modal.vue";
import welcomModal from "~/components/welcom-modal.vue";
import userModal from "~/components/user-modal.vue";
import mainBgVideo from "~/components/main-bg-video.vue";

import { useLoginStore } from "~/stores";

const loginStore = useLoginStore();

const showLoginModal = ref(false);
const showUserInfoModal = ref(false);

const isShopClose = ref(false);

function handleLogin() {
  showLoginModal.value = false;
  if (!loginStore.loginUser.name) {
    showUserInfoModal.value = true;
  }
}
function handleUpdateUserInfo() {
  showUserInfoModal.value = false;
}

function handleOpenUserModal() {
  if (loginStore.loginUser.accountKey) {
    showUserInfoModal.value = true;
  } else {
    showLoginModal.value = true;
  }
}
function handleDisconnect() {
  showUserInfoModal.value = false;
  // setLoginUser({});
}
</script>

<template>
  <div
    class="main-body relative w-[100vw] h-[100vh] overflow-hidden"
    :class="isShopClose ? 'shop-close' : ''"
  >
    <main-bg-video />

    <head-nav @open-user-modal="handleOpenUserModal" />
    <chat-room @connect="showLoginModal = true" />
    <login-modal
      :show="showLoginModal"
      @close="showLoginModal = false"
      @after-login="handleLogin"
    />
    <user-modal
      :show="showUserInfoModal"
      @close="showUserInfoModal = false"
      @success="handleUpdateUserInfo"
      @disconnect="handleDisconnect"
    />
    <welcom-modal />
  </div>
</template>

<style scoped></style>
