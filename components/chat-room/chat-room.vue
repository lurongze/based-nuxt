<script setup lang="js">
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { generateMessage, getUuid } from "~/utils/data";
import closeSvg from "~/assets/close.svg";
import sendSvg from "~/assets/send.svg";
import avatar1Png from "~/assets/avatar/avatar1.png";
import avatar2Png from "~/assets/avatar/avatar2.png";
import cornerButton from "~/components/corner-button.vue";
import chatItem from "./chat-item.vue";
import { postChatMessage,getHistory } from "~/api";
import { isImageUrl } from "~/utils";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";



const loginStore = useLoginStore();

const inputMax = 200;
const scroller = ref(null);
const filteredItems = ref([]);

const interval = ref(null);
const inputVal = ref("");
const isClose = ref(false);
const isComposition = ref(false);
onMounted(() => {
  getHistoryInterval();
});

onUnmounted(() => {
  clearInterval(interval.value);
});

const interTime = 1000 * 50;
function getHistoryInterval(){
  clearInterval(interval.value);
  getHistory().catch(()=>{
    interval.value = setInterval(()=>{
      getHistoryInterval()
    },interTime)
  }).then((res)=>{
    const list = (res?.data?.messages||[]).sort((a,b)=>{
      const timeSort = new Date(a.timestamp).getTime() -new Date(b.timestamp).getTime();
      console.log("timeSort",timeSort)
      return timeSort >=0 ? 0: -1;
    }).map(s=>{
      const item = {
        ...s,
        id: `${s.message_id}-${s.role}`,
        message: s.content,
      }
      return item;
    })
    filteredItems.value = list;
    scrollToBottom();
    interval.value = setInterval(()=>{
      getHistoryInterval()
    },interTime)
  })
}

function scrollToBottom(){
  setTimeout(()=>{
    scroller.value&&scroller.value.scrollToBottom();
  },16)
}

const sending = ref(false);
function handleSend() {
  if (!inputVal.value || isComposition.value) return;
  sending.value = true;
  const user_id_str = JSON.stringify(
    {
      n:loginStore.loginUser.name, // 姓名
      a:loginStore.loginUser.avatar, // 头像
      k: loginStore.loginUser.accountKey // user_id ，metamask的accountkey
    }
  );
  const sendObj = {
    ...loginStore.loginUser,
    id: getUuid(),
    user_id: user_id_str,
    message: inputVal.value,
  }
  filteredItems.value.push(sendObj);
  scrollToBottom()
  const message = inputVal.value;
  inputVal.value = "";
  postChatMessage({
    user_id: user_id_str,
    query: message,

  })
    .catch(() => {
    })
    .then((res) => {
      if (res?.data?.message) {
        // 聊天机器人回复了
        getHistoryInterval();
      }
    })
    .finally(() => {
      sending.value = false;
    });
}

const emit = defineEmits(["connect"]);
function handleConnect() {
  emit("connect");
}

// 这里有名字才可以聊天
const isLogin = computed(() => {
  return Boolean(loginStore.loginUser.name);
});

function handleOpenChat() {
  if (isLogin.value) {
    isClose.value = false;
    nextTick(() => {
      scrollToBottom()
    });
  } else {
    handleConnect();
  }
}

function handleClose() {
  isClose.value = true;
  clearInterval(interval.value);
}
</script>

<template>
  <Transition name="slid">
    <div
      v-if="!isClose"
      class="w-full sm:w-[500px] sm:right-5 h-[70vh] bg-[#202020] border-[#eee] border-2 self-end shadow-2xl flex flex-col overflow-hidden fixed bottom-5"
    >
      <div
        class="header flex items-center justify-between px-4 py-4 border-b-[#ccc] border-b-[1px]"
      >
        <div class="text-xl text-white">
          Live Chat
          <!-- (<span class="text-[#8B93FF]">1WATCHING</span>) -->
        </div>
        <div
          class="w-8 h-8 flex items-center justify-center border-2 border-[#ccc]"
          @click="handleClose"
        >
          <img
            :src="closeSvg"
            alt="close"
            class="w-5 h-5 cursor-pointer text-white"
            @click="closeChatRoom"
          />
        </div>
      </div>
      <DynamicScroller
        ref="scroller"
        :items="filteredItems"
        :min-item-size="54"
        class="scroller relative w-full scroll-root flex-1"
      >
        <template #before v-if="filteredItems.length === 0">
          <div class="w-full h-full text-center pt-40 text-white">
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
            @click="changeMessage(item)"
          >
            <chat-item
              :item="item"
              :account-key="loginStore.loginUser.accountKey"
            />
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
      <Transition name="fade">
        <div
          v-if="sending"
          class="w-full text-sm text-green-500 box-border text-center animate-pulse"
        >
          waiting...
        </div>
      </Transition>
      <div
        v-if="isLogin"
        class="bg-[#202020] px-8 pt-10 pb-5 text-center text-black text-2xl cursor-pointer"
      >
        <div>
          <div class="h-[56px] bg-[#292929] flex items-center px-2 gap-2">
            <input
              class="h-full flex-1 bg-[#292929] border-none outline-none text-lg text-white placeholder:text-[#838383]"
              placeholder="Type a message..."
              v-model="inputVal"
              @input="inputVal = $event.target.value.slice(0, inputMax)"
              @keydown.enter="handleSend"
              @compositionstart="isComposition = true"
              @compositionend="isComposition = false"
            />
            <img
              @click="handleSend"
              :src="sendSvg"
              alt="send"
              class="w-[36px] h-[36px]"
            />
          </div>
          <div class="w-full text-[#838383] text-left text-lg mt-2">
            {{ inputVal.length }}/{{ inputMax }}
          </div>
        </div>
      </div>
      <div
        v-else
        class="bg-[#eee] px-4 py-4 text-center text-black text-2xl cursor-pointer"
        @click="handleConnect"
        @click_="connentMetamask"
      >
        Connect Wallet To Chat
      </div>
    </div>
  </Transition>
  <Transition name="fade">
    <div
      v-if="isClose"
      @click="handleOpenChat"
      class="w-full sm:w-[500px] sm:right-5 flex gap-2 justify-center items-center border-[#eee] border-2 h-[80px] leading-[80px] text-white text-2xl box-border text-center fixed bottom-5 bg-[#6be68a] cursor-pointer"
    >
      {{ isLogin ? "Open Chat" : "Connect Wallet To Chat" }}
    </div>
  </Transition>
</template>
