<script setup>
import { ref, computed } from "vue";
import shopCloseSvg from "~/assets/shop-close.svg";
import closeSvg from "~/assets/close.svg";

const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);

function handleClose(action = "close") {
  emit("close", action);
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="props.show"
      class="fixed w-[100vw] h-[calc(100vh-100px)] bg-black top-[100px] left-0 z-50"
    >
      <img src="/public/shop-keeper.png" class="w-full h-full object-contain" />
      <div
        class="w-full sm:w-[560px] right-0 flex flex-col bg-[#202020] border-[#eee] border-[1px] fixed sm:right-5 top-1/2 -translate-y-1/2 z-50"
      >
        <!-- <div class="header flex items-center justify-between px-4 py-4">
          <div class="text-white"></div>
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
        </div> -->
        <div class="w-full box-border px-0 py-2 mb-2 self-font-sans text-base">
          <div class="w-full box-border px-4 py-2">
            <div
              v-for="item in [
                'You will be able to list real physical cigarettes on our app on 20 JAN.',
                'THE SHOPKEEPER will evaluate your pack, and you can sell it to people near you or to our AI shop, earning points.',
                'Your physical cigarettes will be collected at a later time and will be owned and traded by AI agents that will be able to trade physical goods and services among themselves.',
                'You will be able to list real physical cigarettes on our app on 20 JAN. ',
                'The SHOPKEEPER will soon accept other goods, before moving to provide real life property and commodities trading to AI agents.',
              ]"
              class="w-full mb-5"
              :key="item"
            >
              <span class="text-[#ccc]">{{ item }}</span>
            </div>
            <div class="w-full mb-5">
              <span class="text-[#ccc]"> </span>
            </div>
            <div class="w-full mb-5">
              <span class="text-[#ccc]"> </span>
            </div>
            <div class="w-full mb-5">
              <span class="text-[#ccc]"> </span>
            </div>
            <div class="w-full">
              <span class="text-[#ccc]"> </span>
            </div>
          </div>
        </div>

        <!-- <div
          class="bg-[#eee] px-4 py-4 text-center text-black text-2xl cursor-pointer"
          @click="handleClose('connect')"
        >
          Connect Wallet To Chat
        </div> -->
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
