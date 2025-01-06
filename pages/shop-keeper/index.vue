<script setup>
import { ref } from "vue";

import chatRoom from "~/components/chat-room.vue";
import headNav from "~/components/head-nav.vue";
import loginModal from "~/components/login-modal.vue";
import welcomModal from "~/components/welcom-modal.vue";
import userModal from "~/components/user-modal.vue";

function handleOpenUserModal() {
  if (loginStore.loginUser.accountKey) {
    showUserInfoModal.value = true;
  } else {
    showLoginModal.value = true;
  }
}
</script>

<template>
  <div class="main-body relative w-[100vw] h-[100vh] overflow-hidden">
    jslksj
  </div>
</template>

<style scoped></style>
