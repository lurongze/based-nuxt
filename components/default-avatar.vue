<script setup>
import avatar1 from "~/assets/avatar/avatar1.png";
import avatar2 from "~/assets/avatar/avatar2.png";
import avatar3 from "~/assets/avatar/avatar3.png";
import avatar4 from "~/assets/avatar/avatar4.png";
const props = defineProps({
  index: {
    type: Number,
    default: 1,
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
});

const avatars = [avatar1, avatar2, avatar3, avatar4];

const emit = defineEmits(["click"]);

function handleClick(index = 1) {
  emit("click", index);
}
</script>

<template>
  <img
    :src="avatars[props.index - 1]"
    alt="avatar"
    class="w-[100px] h-[100px] rounded-full cursor-pointer box-border"
    :class="props.isSelect ? 'border-[#C623FF] border-4' : ''"
    @click="handleClick(props.index)"
  />
</template>

<style scoped></style>
