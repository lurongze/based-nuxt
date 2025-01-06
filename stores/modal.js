import { defineStore } from "pinia";
import { ref } from "vue";

const defaultInfo = {
  title: "",
  content: "",
  confirmText: "confirm",
  cancelText: "cancel",
};
export const useModalStore = defineStore("modal", () => {
  const modalInfo = ref({ ...defaultInfo });

  function show(params = {}) {
    modalInfo.value = {
      ...defaultInfo,
      ...params,
    };
  }

  return {
    modalInfo,
    show,
  };
});
