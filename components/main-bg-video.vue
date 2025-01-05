<script setup>
import { ref } from "vue";

const videoRef = ref(null);

function handleMouseOver() {
  videoRef.value.play();
}
function handleMouseOut() {
  videoRef.value.pause();
}
</script>
<template>
  <div
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
    class="w-[100vw] h-[100vh] absolute left-0 top-0 z-0"
  >
    <video
      ref="videoRef"
      class="w-full h-full object-cover"
      poster="/public/main-bg.png"
      muted
      loop
      src="/public/main-bg.mp4"
    />
  </div>
</template>
