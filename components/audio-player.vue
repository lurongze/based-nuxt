<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import pauseSvg from "~/assets/pause.svg";
import playSvg from "~/assets/play.svg";
import loadingSvg from "~/assets/logo.svg";
import novoiceSvg from "~/assets/novoice.svg";
import voiceSvg from "~/assets/voice.svg";
import loadingIcon from "~/components/loading-icon.vue";
const audioLink = "/movin-bass.mp3";

const isCanplay = ref(false);
const audioRef = ref(null);
const isPlaying = ref(false);
const isMuted = ref(false);
const hasFirstPlay = ref(false);

function handleAutio() {
  if (!isCanplay.value) {
    return;
  }
  if (isPlaying.value) {
    isPlaying.value = false;
    audioRef.value.pause();
  } else {
    isPlaying.value = true;
    audioRef.value.play();
  }
}

function handleVoice() {
  if (isMuted.value) {
    audioRef.value.muted = false;
    isMuted.value = false;
  } else {
    audioRef.value.muted = true;
    isMuted.value = true;
  }
}

// 监听音频播放事件
const handlePlay = () => {
  hasFirstPlay.value = true;
  isPlaying.value = true;
};

const handlePause = () => {
  isPlaying.value = false;
};

onMounted(() => {
  const audioElement = audioRef.value;
  if (audioElement) {
    // 在audio元素上绑定事件监听器
    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("pause", handlePause);
    audioElement.addEventListener("canplay", () => {
      console.log("canplay");
      isCanplay.value = true;
      audioElement.play().catch((error) => {
        console.error("音频自动播放失败:", error);
      });
    });
  }
  document.addEventListener("click", () => {
    if (hasFirstPlay.value) {
      return;
    }
    audioRef.value?.play();
  });
});

// 在组件卸载时移除事件监听器
onUnmounted(() => {
  const audioElement = audioRef.value;
  if (audioElement) {
    audioElement.removeEventListener("play", handlePlay);
    audioElement.removeEventListener("pause", handlePause);
  }
});
</script>

<template>
  <div
    class="w-12 sm:w-52 h-12 rounded-3xl border-[1px] border-gray-400 bg-[#151517] flex items-center justify-between box-border px-2"
  >
    <div
      v-if="isCanplay"
      @click.stop="handleAutio"
      class="h-8 w-8 rounded-full bg-[#27e67b] flex items-center justify-center cursor-pointer"
    >
      <img :src="isPlaying ? pauseSvg : playSvg" class="w-4 h-4" />
    </div>
    <div v-else class="h-8 w-8 flex items-center justify-center cursor-pointer">
      <loading-icon color="#27e67b" show />
    </div>
    <div class="hidden sm:flex gap-2 items-center flex-1 px-1 overflow-hidden">
      <div
        class="text-[#27e67b] text-nowrap whitespace-nowrap self-animate-running"
      >
        MOVIN BASS - GTA REMIX
      </div>
    </div>
    <!-- <div v-if="isCanplay" class="flex gap-2 items-center mr-2">
      <span class="text-sm text-gray-500">Mc</span>
      <img
        @click="handleVoice"
        :src="!isMuted ? voiceSvg : novoiceSvg"
        class="w-6 h-6 cursor-pointer"
      />
    </div> -->
    <!-- <div
      v-if="!isCanplay"
      class="w-full h-full text-[#27e67b] flex items-center justify-center"
    >
      loading music
    </div> -->
    <audio class="hidden" ref="audioRef" :src="audioLink" autoplay />
  </div>
</template>

<style scoped></style>
