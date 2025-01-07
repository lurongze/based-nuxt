<script setup>
import { ref } from "vue";

import chatRoom from "~/components/chat-room/chat-room.vue";
import headNav from "~/components/head-nav.vue";
import loginModal from "~/components/login-modal.vue";
import welcomModal from "~/components/welcom-modal.vue";
import userModal from "~/components/user-modal.vue";
import mainBgVideo from "~/components/main-bg-video.vue";
import shopKeeper from "~/components/shop-keeper.vue";
import infoPage from "~/components/info-page.vue";
import mainBgImg from "~/components/main-bg-img.vue";

import { useLoginStore } from "~/stores";

const loginStore = useLoginStore();

const showLoginModal = ref(false);
const showUserInfoModal = ref(false);
const showShopKeeper = ref(false);
const showInfoPage = ref(false);

function handleLogin() {
  showShopKeeper.value = false;
  showInfoPage.value = false;
  showLoginModal.value = false;
  if (!loginStore.loginUser.name) {
    showUserInfoModal.value = true;
  }
}
function handleUpdateUserInfo() {
  showShopKeeper.value = false;
  showInfoPage.value = false;
  showUserInfoModal.value = false;
}

function handleOpenUserModal() {
  showShopKeeper.value = false;
  showInfoPage.value = false;
  if (loginStore.loginUser.accountKey) {
    showUserInfoModal.value = true;
  } else {
    showLoginModal.value = true;
  }
}
function handleDisconnect() {
  showShopKeeper.value = false;
  showInfoPage.value = false;
  showUserInfoModal.value = false;

  loginStore.logout();
}

function handleClickAction(action) {
  showLoginModal.value = false;
  showUserInfoModal.value = false;
  showShopKeeper.value = false;
  showInfoPage.value = false;
  if (action === "shop-keeper") {
    showShopKeeper.value = true;
  }
  if (action == "info-page") {
    showInfoPage.value = true;
  }
}

function handleClose(action) {
  showShopKeeper.value = false;
  showInfoPage.value = false;
  // 未登录的
  if (action === "connect" && !loginStore.loginUser.accountKey) {
    showLoginModal.value = true;
  }
}
</script>

<template>
  <div class="main-body relative w-[100vw] h-[100vh] overflow-hidden">
    <!-- <main-bg-video /> -->
    <main-bg-img />
    <head-nav
      @open-user-modal="handleOpenUserModal"
      @click-action="handleClickAction"
    />
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
    <shop-keeper :show="showShopKeeper" @close="handleClose" />
    <info-page :show="showInfoPage" @close="handleClose" />
  </div>
</template>

<style scoped></style>
