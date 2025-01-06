<script setup>
import { computed, onMounted } from "vue";
import walletSvg from "~/assets/wallet.svg";
import shareSvg from "~/assets/share.svg";
import upCaseSvg from "~/assets/up-case.svg";
import downCaseSvg from "~/assets/down-case.svg";
import logoSvg from "~/assets/logo.svg";
import audioPlayer from "~/components/audio-player.vue";
import titlePng from "~/assets/title.png";
import cornerButton from "~/components/corner-button.vue";
import { useLoginStore } from "~/stores";
import { fetchEth, fetchPools } from "~/api";

const loginStore = useLoginStore();

const emit = defineEmits(["open-user-modal", "clickAction"]);

function handleOpenUserModal() {
  emit("open-user-modal");
}
const isLogin = computed(() => {
  return Boolean(loginStore.loginUser.accountKey);
});

const ethPrice = ref(0);
const poolsNum = ref(0);

function getEthPrice() {
  fetchEth().then((res) => {
    console.log("res price", res);
    ethPrice.value = res?.data?.ethereum?.usd || 0;
  });
}
function getPoolsData() {
  fetchPools("0x66781cb9086f63513933cf09d98d22ddf8285e83").then((res) => {
    poolsNum.value = 100;
  });
}

function handleShare() {
  window.open(
    `https://etherscan.io/address/${loginStore.loginUser.accountKey}`
  );
}

function handleAction(action = "shop-keeper") {
  emit("clickAction", action);
}
onMounted(() => {
  getEthPrice();
  getPoolsData();
});
</script>

<template>
  <div
    class="main-head-nav absolute left-0 top-0 w-[100vw] h-[100px] flex flex-wrap overflow-hidden justify-between"
  >
    <div class="hidden sm:flex h-full items-center">
      <div
        class="w-[100px] h-full flex justify-center items-center border-r-[1px] border-r-[#ccc]"
      >
        <img :src="logoSvg" alt="logo" class="w-[40px] h-[40px]" />
      </div>
      <div class="h-full flex-1 w-[300px] relative">
        <img
          :src="titlePng"
          alt="mindpalace new cellmate"
          class="h-[160px] w-fit object-contain -mt-[5px] -ml-[50px]"
        />
        <div class="absolute top-[28px] -right-24">
          <audio-player />
        </div>
      </div>
    </div>
    <div class="text-lg flex h-full items-center gap-4 box-border">
      <corner-button>
        <div
          @click="handleAction('info-page')"
          class="text-white mx-5 h-[44px] leading-[44px] block"
        >
          INFO
        </div>
      </corner-button>
      <corner-button>
        <div
          @click="handleAction('shop-keeper')"
          class="text-white mx-5 h-[44px] leading-[44px] block"
        >
          The Shopkeeper
        </div>
      </corner-button>
      <corner-button v-if="loginStore.loginUser.accountKey">
        <NuxtLink
          :href="`https://dexscreener.com/blast/${loginStore.loginUser.accountKey}`"
          target="_blank"
          class="text-white mx-5 h-[44px] leading-[44px] block"
        >
          CHART
        </NuxtLink>
      </corner-button>

      <corner-button>
        <div
          class="flex gap-5 items-center h-[44px] text-white whitespace-nowrap"
        >
          <!-- <div
            class="h-full border-r-[1px] border-r-[#ccc] leading-[44px] px-2"
          >
            $AI
          </div> -->
          <div class="flex items-center whitespace-nowrap h-full mx-5 gap-1">
            <div class="text-lg text-[#ccc]">${{ ethPrice }}</div>
            <img
              :src="poolsNum >= 0 ? upCaseSvg : downCaseSvg"
              alt="up-corner"
              class="w-[24px] h-[24px]"
            />
            <div class="text-[#01E527]">{{ poolsNum }}%</div>
          </div>
        </div>
      </corner-button>
      <div
        class="h-full flex items-center border-l-[1px] border-l-[#ccc] px-4 box-border"
      >
        <corner-button>
          <div
            class="flex gap-2 items-center whitespace-nowrap h-[44px] text-[#ccc] px-5"
          >
            <img
              @click="handleOpenUserModal"
              :src="walletSvg"
              alt="Wallet"
              class="w-[16px] h-[16px]"
            />
            <div
              @click="handleOpenUserModal"
              class="max-w-32 overflow-hidden text-ellipsis"
            >
              {{ isLogin ? loginStore.loginUser.accountKey : "Connect Wallet" }}
            </div>
            <div
              v-if="isLogin"
              class="hover:bg-slate-600 box-border p-1 rounded"
              @click="handleShare"
            >
              <img
                :src="shareSvg"
                alt="share"
                class="w-[16px] h-[16px] cursor-pointer hover:bg-slate-600"
              />
            </div>
          </div>
        </corner-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
