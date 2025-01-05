<template>
  <div class="dynamic-scroller-demo">
    <div class="toolbar">
      <input v-model="search" placeholder="Filter..." />
      <span
        >({{ updateParts.viewStartIdx }} - [{{ updateParts.visibleStartIdx }} -
        {{ updateParts.visibleEndIdx }}] - {{ updateParts.viewEndIdx }})</span
      >
    </div>

    <DynamicScroller
      :items="filteredItems"
      :min-item-size="54"
      :emit-update="true"
      class="scroller"
      @resize="onResize"
      @update="onUpdate"
    >
      <template #before>
        <div class="notice">The message heights are unknown.</div>
      </template>
      <template #after>
        <div class="notice">You have reached the end.</div>
      </template>
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.message]"
          :data-index="index"
          :data-active="active"
          :title="`Click to change message ${index}`"
          class="message"
          @click="changeMessage(item)"
        >
          <div class="avatar">
            <img
              :key="item.avatar"
              :src="item.avatar"
              alt="avatar"
              class="image"
            />
          </div>
          <div class="text">
            {{ item.message }}
          </div>
          <div class="index">
            <span>{{ item.id }} (id)</span>
            <span>{{ index }} (index)</span>
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script>
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { generateText } from "~/utils/data";

const items = [];
for (let i = 0; i < 1000; i++) {
  items.push({
    id: i,
    ...generateText(),
  });
}

export default {
  components: { DynamicScroller, DynamicScrollerItem },
  data() {
    return {
      items,
      search: "",
      updateParts: {
        viewStartIdx: 0,
        viewEndIdx: 0,
        visibleStartIdx: 0,
        visibleEndIdx: 0,
      },
    };
  },

  computed: {
    filteredItems() {
      const { search, items } = this;
      if (!search) return items;
      const lowerCaseSearch = search.toLowerCase();
      return items.filter((i) =>
        i.message.toLowerCase().includes(lowerCaseSearch)
      );
    },
  },

  methods: {
    changeMessage(message) {
      Object.assign(message, generateText());
    },

    onResize() {
      console.log("resize");
    },

    onUpdate(viewStartIndex, viewEndIndex, visibleStartIndex, visibleEndIndex) {
      this.updateParts.viewStartIdx = viewStartIndex;
      this.updateParts.viewEndIdx = viewEndIndex;
      this.updateParts.visibleStartIdx = visibleStartIndex;
      this.updateParts.visibleEndIdx = visibleEndIndex;
    },
  },
};
</script>

<style scoped>
html,
body,
#app {
  box-sizing: border-box;
  height: 100%;
}

body {
  font-size: 16px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}

#app,
.page {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.menu {
  flex: auto 0 0;
  display: flex;
  align-items: center;
  gap: 2px;
}

.menu,
.page {
  padding: 12px;
  box-sizing: border-box;
}

.package {
  margin-right: 12px;
}

.package-name {
  font-family: monospace;
  color: #2c3e50;
  background: #eee;
  padding: 5px 12px 3px;
}

.package-name,
.menu a {
  display: inline-block;
  border-radius: 3px;
}

.menu a {
  padding: 4px 12px;
  text-decoration: none;
  color: white;
  background: #2c3e50;
}

.menu a.router-link-active {
  background: #42b983;
}

.menu a:not(:last-child) {
  margin-right: 4px;
}

.vue-recycle-scroller {
  -webkit-overflow-scrolling: touch;
}

.vue-recycle-scroller__item-container,
.vue-recycle-scroller__item-wrapper {
  box-sizing: border-box;
}

.vue-recycle-scroller__item-view {
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.tr,
.td {
  box-sizing: border-box;
}

.vue-recycle-scroller__item-view .tr {
  display: flex;
  align-items: center;
}

.vue-recycle-scroller__item-view .td {
  display: block;
}

.vue-recycle-scroller__item-view.hover {
  background: #4fc08d;
  color: white;
}

.toolbar {
  flex: auto 0 0;
  text-align: center;
  margin-bottom: 12px;
  line-height: 32px;
  position: sticky;
  top: 0;
  z-index: 9999;
  background: white;
}

.recycle-scroller-demo.page-mode .toolbar {
  border-bottom: solid 1px #e0edfa;
}

.toolbar > *:not(:last-child) {
  margin-right: 24px;
}

.avatar {
  background: grey;
}
.dynamic-scroller-demo {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.scroller {
  flex: auto 1 1;
}

.scroller {
  border: solid 1px #42b983;
}

.toolbar {
  flex: auto 0 0;
  text-align: center;
}

.toolbar > *:not(:last-child) {
  margin-right: 24px;
}

.notice {
  padding: 24px;
  font-size: 20px;
  color: #999;
}

.message {
  display: flex;
  min-height: 32px;
  padding: 12px;
  box-sizing: border-box;
}

.avatar {
  flex: auto 0 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
}

.avatar .image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}

.index,
.text {
  flex: 1;
}

.text {
  max-width: 400px;
}

.index {
  opacity: 0.5;
}

.index span {
  display: inline-block;
  width: 160px;
  text-align: right;
}
</style>
