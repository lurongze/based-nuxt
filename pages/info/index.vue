<script setup lang="js">
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { generateMessage, getUuid } from "~/utils/data";
import avatar1Png from "~/assets/avatar/avatar1.png";
import avatar2Png from "~/assets/avatar/avatar2.png";
import cornerButton from "~/components/corner-button.vue";
import {  getHistory  } from "~/api";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";


const scroller = ref(null);
const filteredItems = ref([]);


function hellMessage() {

  getHistory().then((res)=>{
    console.log("res",res)
    const list = (res?.data?.messages||[]).map(s=>{
      const item = {
        id:  getUuid(),
        message: s.content,
        name: s.id ? s.id.slice(0,6) : s.role
      }
      return item;

    })

    filteredItems.value = list;
    scrollToBottom();
  })
}

onMounted(()=>{
  hellMessage();
})

function scrollToBottom(){
  console.log("sss",scroller.value)
  nextTick(()=>{
    nextTick(()=>{
      setTimeout(()=>{
        scroller.value&&scroller.value.scrollToBottom();
      },1000)
    })
  })
}
</script>

<template>
  <DynamicScroller
    ref="scroller"
    :items="filteredItems"
    :min-item-size="54"
    class="scroller relative w-full scroll-root flex-1"
  >
    <template #before>
      <div class="w-full h-full text-center text-slate-700">
        wait for chat ...
      </div>
    </template>

    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[item.message]"
        :data-index="index"
        :data-active="active"
        class="message"
      >
        <div
          class="flex items-top gap-4 box-border px-5 py-2"
          :class="item.self ? 'flex-row-reverse' : ''"
          @click="scrollToBottom()"
        >
          <div class="avatar w-10 h-10 rounded-full overflow-hidden">
            <img
              :key="item.id"
              :src="item.self ? avatar1Png : avatar2Png"
              alt="avatar"
              class="image w-full h-full object-cover"
            />
          </div>
          <div
            class="text flex-1 flex flex-col gap-1"
            :class="item.self ? 'items-end' : ''"
          >
            <div
              class="text-lg text-slate-900"
              :class="item.self ? 'text-right' : ''"
            >
              {{ item.name }}
            </div>
            <corner-button>
              <div v-if="item.isImg" class="w-full h-auto box-border px-5 py-2">
                <img :src="item.message" class="w-full h-auto" />
              </div>
              <div
                v-else
                class="w-fit max-w-[385px] box-border px-5 py-2 text-lg text-slate-900 text-wrap break-words word-break-all"
                :class="item.error ? 'text-red-700' : ''"
              >
                {{ item.message }}
              </div>
            </corner-button>
          </div>
        </div>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
