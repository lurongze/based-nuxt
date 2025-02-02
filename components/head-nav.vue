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
import { getDexscreenerData } from "~/api";

const loginStore = useLoginStore();

const emit = defineEmits(["open-user-modal", "clickAction"]);

function handleOpenUserModal() {
  emit("open-user-modal");
}
const isLogin = computed(() => {
  return Boolean(loginStore.loginUser.accountKey);
});

const princeUsd = ref(0);
const priceChange = ref(0);

function getDexscreenerDataFunc() {
  getDexscreenerData().then((res) => {
    console.log("res", res);
    princeUsd.value = Number(res?.data?.pair?.priceUsd || 0);
    priceChange.value = Number(res?.data?.pair?.priceChange?.h24 || 0);
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
  getDexscreenerDataFunc();
});
</script>

<template>
  <div
    class="main-head-nav absolute left-0 top-0 w-[100vw] h-[100px] flex flex-wrap overflow-hidden justify-between"
  >
    <div class="hidden sm:flex h-full items-center">
      <div
        class="w-[100px] h-full flex justify-center items-center border-r-[1px] border-r-[#ccc] cursor-pointer"
        @click="handleAction('home-page')"
      >
        <img :src="logoSvg" alt="logo" class="w-[40px] h-[40px]" />
      </div>
      <div class="h-full flex-1 w-[300px] relative">
        <img
          :src="titlePng"
          alt="mindpalace new cellmate"
          class="h-[160px] w-fit object-contain -mt-[5px] -ml-[50px] cursor-pointer"
          @click="handleAction('home-page')"
        />
        <div class="absolute top-[28px] -right-24">
          <audio-player />
        </div>
      </div>
    </div>
    <div class="text-lg flex h-full items-center gap-4 box-border">
      <corner-button>
        <NuxtLink
          href="https://x.com/newcellmate"
          target="_blank"
          class="text-white mx-5 h-[44px] leading-[44px] block"
        >
          INFO
        </NuxtLink>
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
          __href="`https://dexscreener.com/blast/${loginStore.loginUser.accountKey}`"
          href="https://dexscreener.com/blast/0xD4196Fe40eB76bE197E1F3cCc8a118f32C56f66c"
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
          <div class="flex items-center whitespace-nowrap h-full mx-5 gap-1">
            <NuxtLink
              href="https://dexscreener.com/blast/0xD4196Fe40eB76bE197E1F3cCc8a118f32C56f66c"
              target="_blank"
              class="text-lg text-[#ccc] cursor-pointer"
            >
              CHART ${{ princeUsd }}
            </NuxtLink>
          </div>
        </div>
      </corner-button>

      <corner-button>
        <div
          class="flex gap-5 items-center h-[44px] text-white whitespace-nowrap"
        >
          <div class="flex items-center whitespace-nowrap h-full mx-5 gap-1">
            <NuxtLink
              href="https://app.baseline.markets/trade/Blast/0x367473E150487e5cDC14D331550ed909b7B2192D"
              target="_blank"
              class="flex items-center gap-1"
            >
              <img
                :src="priceChange >= 0 ? upCaseSvg : downCaseSvg"
                alt="up-corner"
                class="w-[24px] h-[24px]"
              />
              <div
                class="cursor-pointer"
                :class="priceChange >= 0 ? 'text-[#01E527]' : 'text-[red]'"
              >
                {{ priceChange }}% BUY
              </div>
            </NuxtLink>
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
