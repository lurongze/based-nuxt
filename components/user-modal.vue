<script setup>
import { ref, computed, watch } from "vue";
import walletSvg from "~/assets/wallet.svg";
import closeSvg from "~/assets/close.svg";
import copySvg from "~/assets/copy.svg";
import shareSvg from "~/assets/share.svg";
import defaultAvatar from "~/components/default-avatar.vue";
import loadingIcon from "~/components/loading-icon.vue";
import { mockUpdateUserInfo } from "~/utils/data";
import { copyTextToClipboard } from "~/utils";
import { MetaMaskSDK } from "@metamask/sdk";
import { useLoginStore } from "~/stores";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const loginStore = useLoginStore();

const loading = ref(false);
const inputUsername = ref("");
const selectedAvatar = ref(1);
const emit = defineEmits(["close", "create", "connect", "disconnect"]);

function handleClose() {
  emit("close");
}
function handleSelectAvatar(index) {
  selectedAvatar.value = index;
}
function handleUpdateProfile() {
  if (!isAllFilled.value) {
    return;
  }
  loading.value = true;
  const params = {
    ...loginStore.loginUser,
    ...handleGetValue(),
  };
  mockUpdateUserInfo(loginStore.loginUser.accountKey, params).then(() => {
    loginStore.setLoginUser(params);
    emit("success");
    handleReset();
    loading.value = false;
  });
}

function handleGetValue() {
  return {
    name: inputUsername.value,
    avatar: "",
  };
}

function handleReset() {
  inputUsername.value = "";
  selectedAvatar.value = 1;
}

const isAllFilled = computed(() => {
  return inputUsername.value;
});

const isCopy = ref("");

function handleCopy() {
  copyTextToClipboard(loginStore.loginUser, function () {
    isCopy.value = "copied success!";
    setTimeout(() => {
      isCopy.value = "";
    }, 1500);
  });
}

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "MINDPALACE NEW CELLMATE",
    url: window.location.href,
  },
  // infuraAPIKey: process.env.INFURA_API_KEY,
  // Other options
});

async function handleDisConnect() {
  await MMSDK.disconnect();
  emit("disconnect");
}

function handleShare() {
  window.open(
    `https://etherscan.io/address/${loginStore.loginUser.accountKey}`
  );
}

watch(
  () => props.show,
  (e) => {
    if (e) {
      inputUsername.value =
        loginStore.loginUser.name ||
        (loginStore.loginUser.accountKey || "").slice(0, 5);
    }
  }
);
</script>

<template>
  <Transition name="modal">
    <div
      v-if="props.show"
      class="text-xl w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.3)] backdrop-blur-sm fixed top-0 left-0 flex items-center justify-center"
    >
      <div
        class="w-[560px] flex flex-col bg-[#202020] border-[#eee] border-[1px]"
      >
        <div
          class="header flex items-center justify-between px-4 py-4 border-b-[#ccc] border-b-[1px]"
        >
          <div class="text-white">
            {{ loginStore.loginUser.name ? "Update" : "Create" }} Profile
          </div>

          <div
            class="w-8 h-8 flex items-center justify-center border-[1px] border-[#ccc]"
            @click="handleClose"
          >
            <img
              :src="closeSvg"
              alt="close"
              class="w-5 h-5 cursor-pointer text-white"
            />
          </div>
        </div>
        <div class="w-full box-border px-8 py-5">
          <div class="w-full bg-[#292929] gap-1 box-border px-4 py-2">
            <div class="w-full flex items-center gap-2">
              <img :src="walletSvg" alt="wallet" class="w-[24px] h-[24px]" />
              <span class="text-[#ccc]">Wallet</span>
              <div class="flex-1 text-right text-white">0.0000ETH</div>
            </div>
            <div
              class="h-[56px] bg-[#292929] flex items-center px-2 mt-2 gap-2 border-[1px] border-[#ccc]"
            >
              <input
                class="h-full flex-1 bg-[#292929] border-none outline-none text-lg text-white placeholder:text-[#838383] overflow-hidden text-ellipsis"
                v-model="loginStore.loginUser.accountKey"
                disabled
              />
              <div
                class="hover:bg-slate-600 box-border p-1 rounded"
                @click="handleCopy"
              >
                <img
                  :src="copySvg"
                  alt="copy"
                  class="w-[24px] h-[24px] cursor-pointer"
                />
              </div>
              <div
                class="hover:bg-slate-600 box-border p-1 rounded"
                @click="handleShare"
              >
                <img
                  :src="shareSvg"
                  alt="share"
                  class="w-[24px] h-[24px] cursor-pointer hover:bg-slate-600"
                />
              </div>
            </div>
          </div>
          <Transition name="fade">
            <div v-if="isCopy" class="w-full mt-1 text-sm text-green-600">
              {{ isCopy }}
            </div>
          </Transition>
        </div>

        <div class="w-full box-border px-8 py-5">
          <div class="w-full gap-1 box-border px-4 py-2">
            <div class="w-full">
              <span class="text-[#ccc]">Proffile Picture</span>
            </div>
            <div class="flex items-center px-2 mt-2 justify-between">
              <default-avatar
                v-for="item in [1, 2, 3, 4]"
                :key="item"
                :index="item"
                :isSelect="selectedAvatar === item"
                @click="handleSelectAvatar"
              />
            </div>
          </div>
        </div>

        <div class="w-full box-border px-8 py-5 mb-8">
          <div class="w-full bg-[#292929] gap-1 box-border px-4 py-2">
            <div class="w-full">
              <span class="text-[#ccc]">Username</span>
            </div>
            <div
              class="h-[56px] bg-[#292929] flex items-center px-2 mt-2 gap-2 border-[1px] border-[#ccc]"
            >
              <input
                class="h-full flex-1 bg-[#292929] border-none outline-none text-lg text-white placeholder:text-[#838383]"
                v-model="inputUsername"
                placeholder="@Username"
              />
            </div>
          </div>
        </div>

        <div
          class="flex items-center px-4 py-4 text-center text-white text-2xl border-t-[1px] border-t-[#ccc]"
          :class="isAllFilled ? 'cursor-pointer' : 'cursor-not-allowed'"
          @click="handleUpdateProfile"
        >
          <div class="flex-1 text-center">
            {{ loginStore.loginUser.name ? "Update" : "Create" }} Profile
          </div>
          <loading-icon :show="loading" />
        </div>

        <div
          class="bg-[#eee] px-4 py-4 text-center text-black text-2xl"
          :class="isAllFilled ? 'cursor-pointer' : 'cursor-not-allowed'"
          @click="handleDisConnect"
        >
          DisConnect Wallet
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
