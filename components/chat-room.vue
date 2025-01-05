<script setup lang="js">
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { generateMessage, getUuid } from "~/utils/data";
import closeSvg from "~/assets/close.svg";
import sendSvg from "~/assets/send.svg";
import avatar1Png from "~/assets/avatar/avatar1.png";
import avatar2Png from "~/assets/avatar/avatar2.png";
import cornerButton from "~/components/corner-button.vue";
import { postChatMessage,getHistory, getRandMessage } from "~/api";
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
onMounted(() => {
  // fakerAddMessage();
  hellMessage();
});

onUnmounted(() => {
  clearInterval(interval.value);
});

function hellMessage() {
  // if (filteredItems.value.length < 1) {
  //   filteredItems.value.push({
  //     id: getUuid(),
  //     self: false,
  //     message:
  //       "Ay yo,fresh meat!Welcome to the block.\nStick with me and you might just make it in herer.What's on your mind?",
  //   });
  // }
  getHistory().then((res)=>{
    console.log("res",res)
    const list = (res?.data?.messages||[]).map(s=>{
      const item = {
        id: s.id ? s.id : getUuid(),
        message: s.content,
        name: s.id ? s.id.slice(0,6) : s.role
      }
      return item;
      // filteredItems.value.push(item)
    })
    // console.log("list", list)
    filteredItems.value = list;
    scrollToBottom();
  })
}

function scrollToBottom(){
  nextTick(()=>{
    scroller.value&&scroller.value.scrollToBottom();
  })
}




const sending = ref(false);
function handleSend() {
  if (!inputVal.value) return;
  sending.value = true;
  filteredItems.value.push({
    ...loginStore.loginUser,
    id: getUuid(),
    self: true,
    message: inputVal.value,
  });
  scrollToBottom()
  const message = inputVal.value;
  inputVal.value = "";
  // getRandMessage
  // postChatMessage
  postChatMessage({
    user_id: loginStore.loginUser.accountKey,
    query: message,
  })
    .catch((res) => {
      console.error("error", res);
      filteredItems.value.push({
        id: getUuid(),
        self: false,
        message: "Jeet jail is closed to you. Please try later.",
        error: true,
      });
      scrollToBottom()
    })
    .then((res) => {
      console.log("then", res);
      if (res?.data?.message) {
        const isImg = isImageUrl(res.data.message);
        let messageStr = res.data.message;
        // if (isImg) {
        //   messageStr = messageStr.replace(
        //     "http://34.126.65.173:54268",
        //     "https://nodeproxy-peach.vercel.app"
        //   );
        // }
        filteredItems.value.push({
          id: getUuid(),
          self: false,
          isImg: isImg,
          message: messageStr,
        });
        scrollToBottom()
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
      class="w-[500px] h-[70vh] bg-[#202020] border-[#eee] border-2 self-end shadow-2xl flex flex-col overflow-hidden fixed bottom-5 right-5"
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
            <div
              class="flex items-top gap-4 box-border px-5 py-2"
              :class="item.self ? 'flex-row-reverse' : ''"
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
                  class="text-lg text-[#ccc]"
                  :class="item.self ? 'text-right' : ''"
                >
                  {{ item.name }}
                </div>
                <corner-button>
                  <div
                    v-if="item.isImg"
                    class="w-full h-auto box-border px-5 py-2"
                  >
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
      class="flex gap-2 justify-center items-center w-[500px] border-[#eee] border-2 h-[80px] leading-[80px] text-white text-2xl box-border text-center fixed bottom-5 right-5 bg-[#6be68a] cursor-pointer"
    >
      {{ isLogin ? "Open Chat" : "Connect Wallet To Chat" }}
      <!-- <div
        class="rounded-full w-8 h-8 text-white bg-pink-600 text-lg text-center leading-8"
      >
        3
      </div> -->
    </div>
  </Transition>
</template>
