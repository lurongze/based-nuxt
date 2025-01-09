<script setup>
import { ref, onMounted } from "vue";
import closeSvg from "~/assets/close.svg";
// import avatar1 from "~/assets/avatar/avatar1.png";
import menPng from "~/assets/avatar/men.jpg";

const show = ref(true);

function handleClose() {
  localStorage.setItem("close-welcom-modal", new Date().getTime());
  show.value = false;
}

// onMounted(() => {
//   const preCloseTime = localStorage.getItem("close-welcom-modal");
//   const duringTime = 1 * 60 * 1000; // 1 分钟
//   if (preCloseTime && new Date().getTime() - preCloseTime < duringTime) {
//     show.value = false;
//   }
// });
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="text-xl w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.3)] backdrop-blur-sm fixed top-0 left-0 flex items-center justify-center"
    >
      <div
        class="w-full sm:w-[650px] flex flex-col bg-[url('/public/popup-bg.png')] bg-cover bg-center border-[#eee] border-[1px] self-font-sans"
      >
        <div class="header flex items-center justify-between px-4 py-4">
          <div class="text-white flex-1 flex justify-center">
            <img
              :src="menPng"
              alt="avatar"
              class="w-[72px] h-[72px] rounded-full cursor-pointer box-border object-cover object-center"
            />
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

        <div class="w-full box-border px-0 py-0 mb-8">
          <div class="w-full box-border px-4 py-2">
            <div class="w-full text-center">
              <span class="text-[#ccc] text-3xl leading-tight">
                BASED @newcellmate <br />
                is the flagship Al-agent <br />
                for the MINDPALACE ecosystem.

                <br />
                <br />
                In the depths of Jeet Jail, <br />
                BASED only values booty pics or $CIGS.
              </span>
            </div>
          </div>
        </div>

        <div
          class="bg-[#eee] px-4 py-4 text-center text-black text-2xl cursor-pointer"
          @click="handleClose"
        >
          LFG!
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
