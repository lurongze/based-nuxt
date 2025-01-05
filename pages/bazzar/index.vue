<script setup>
import { ref } from "vue";

const show = ref(true);
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="text-xl w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.3)] backdrop-blur-sm fixed top-0 left-0 flex items-center justify-center"
    >
      <div class="w-[560px] flex flex-col bg-blue-900/50">
        <img
          class="w-full h-full object-contain object-top"
          src="https://www.lofidaze.com/images/dazeselfietransparent.png"
        />
        <h1 class="text-blue-200/80 text-center text-2xl mt-20 mb-8 px-8">
          this is bazzar page
        </h1>
        <button
          @click="show = false"
          class="w-auto max-w-xs sm:max-w-xl px-6 py-4 bg-blue-300 text-blue-800 hover:bg-[#9A8E75] hover:text-black transition-all duration-300 rounded-lg text-xl mx-10 mb-10"
        >
          <span class="hidden sm:inline">SPACE</span
          ><span class="sm:hidden">TAP</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
