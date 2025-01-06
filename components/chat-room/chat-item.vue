<script setup lang="js">
import {  computed  } from "vue";
import avatar1Png from "~/assets/avatar/avatar1.png";
import avatar2Png from "~/assets/avatar/avatar2.png";
import avatar3Png from "~/assets/avatar/avatar3.png";
import avatar4Png from "~/assets/avatar/avatar4.png";
import cornerButton from "~/components/corner-button.vue";
import { isImageUrl } from "~/utils";

const props = defineProps({
  item:{
    type:Object,
    default:()=>({})
  },
  accountKey:{
    type:String,
    default :""
  }
})

const mapAvatar = ['',avatar1Png,avatar2Png,avatar3Png,avatar4Png]

const isSelf = computed(()=>{
  if(!props.accountKey){
    return false;
  }else{
    return props.item.user_id === props.accountKey
  }
})

const nameAvatar = computed(()=>{
  try {
    const obj = JSON.parse(props.item.name);
    return obj;
  } catch (error) {
    return {
      n: props.item.name||'foo',
      a:1
    }
  }
})

const isImgMsg = computed(()=>{
  return isImageUrl(props.item.message)
})
</script>

<template>
  <div
    class="flex items-top gap-4 box-border px-5 py-2"
    :class="isSelf ? 'flex-row-reverse' : ''"
  >
    <div class="avatar w-10 h-10 rounded-full overflow-hidden">
      <img
        :key="item.id"
        :src="mapAvatar[nameAvatar.a] || avatar1Png"
        alt="avatar"
        class="image w-full h-full object-cover"
      />
    </div>
    <div
      class="text flex-1 flex flex-col gap-1"
      :class="isSelf ? 'items-end' : ''"
    >
      <div class="text-lg text-[#ccc]" :class="isSelf ? 'text-right' : ''">
        {{ nameAvatar.n }}
      </div>
      <corner-button>
        <div v-if="isImgMsg" class="w-full h-auto box-border px-5 py-2">
          <img :src="item.message" class="w-full h-auto" />
        </div>
        <div
          v-else
          class="w-fit max-w-[385px] box-border px-5 py-2 text-lg text-white text-wrap break-words word-break-all"
          :class="item.error ? 'text-red-700' : ''"
        >
          {{ item.message }}
        </div>
      </corner-button>
    </div>
  </div>
</template>
