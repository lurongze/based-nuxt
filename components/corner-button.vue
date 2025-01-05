<script setup>
const emit = defineEmits(["click"]);

function handleClick() {
  emit("click");
}
</script>

<template>
  <div
    @click="handleClick"
    class="w-fit shrink-0 border-[1px] border-[#ccc] cursor-pointer relative before:content-[' '] before:border-[1px] before:absolute before:border-[#ccc] before:w-2 before:h-2 before:top-1 before:right-1 before:border-b-0 before:border-l-0"
  >
    <slot />
  </div>
</template>

<style scoped></style>
