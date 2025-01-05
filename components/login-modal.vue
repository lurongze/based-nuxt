<script setup>
import { ref } from "vue";

import metamaskSvg from "~/assets/metamask.svg";
import closeSvg from "~/assets/close.svg";
import loadingIcon from "~/components/loading-icon.vue";
import { MetaMaskSDK } from "@metamask/sdk";
import { mockGetUserInfo } from "~/utils/data";
import { useLoginStore } from "~/stores";

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "BASED",
    url: window.location.href,
  },
  // infuraAPIKey: process.env.INFURA_API_KEY,
  // Other options
});

const loginStore = useLoginStore();

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "connect", "after-login"]);

function handleClose() {
  emit("close");
}

const connectLoading = ref(false);
const loading = ref(false);

async function handleConnent() {
  connectLoading.value = true;

  // You can also connect MMSDK.init() first to get access to the provider.
  await MMSDK.connect();
  const ethereum = MMSDK.getProvider();
  await ethereum.request({ method: "eth_accounts", params: [] });

  const accounts = await ethereum // Or window.ethereum if you don't support EIP-6963.
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error.
        // If this happens, the user rejected the connection request.
        console.log("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
      connectLoading.value = false;
    });
  const account = accounts[0];

  connectLoading.value = false;
  handleGetUserInfo(account);
}

function handleGetUserInfo(accountKey = "") {
  loading.value = true;
  mockGetUserInfo(accountKey).then((res) => {
    loading.value = false;

    loginStore.setLoginUser(res.data);
    emit("after-login");
  });
}
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
          <div class="text-white">Log in or sign up</div>
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

        <div
          class="rounded-md w-auto py-5 m-10 flex items-center border-[1px] border-[#ccc] gap-5 box-border px-5 cursor-pointer hover:bg-slate-600"
          @click="handleConnent"
        >
          <img :src="metamaskSvg" alt="metamask" class="w-10 h-10" />
          <div class="text-lg text-white flex-1">MetaMask</div>
          <loading-icon :show="connectLoading || loading" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
