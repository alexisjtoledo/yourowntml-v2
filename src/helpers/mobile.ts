import { ref, computed } from "vue";

const width = ref(window.innerWidth);

const isMobile = computed(() => width.value <= 1024);

const onResize = () => {
  width.value = window.innerWidth;
};

window.addEventListener("resize", onResize);

export { isMobile };
