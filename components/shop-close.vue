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

function handleClose() {
  emit("close");
}
</script>

<template>
  <Transition name="bounce">
    <div
      v-if="props.show"
      class="w-[560px] flex flex-col bg-[#202020] border-[#eee] border-[1px] fixed right-5 bottom-24"
    >
      <div class="header flex items-center justify-between px-4 py-4">
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
      </div>
      <div
        class="w-full box-border pt-5 pb-14 flex justify-center items-center"
      >
        <img
          @click="handleShare"
          :src="shopCloseSvg"
          alt="shop-close"
          class="w-[136px] h-[136px]"
        />
      </div>

      <div
        class="bg-[#eee] px-4 py-4 text-center text-black text-2xl cursor-pointer"
      >
        SHOP CLOSE
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
