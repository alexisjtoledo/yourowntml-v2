import { ref, computed } from "vue";

const width = ref(window.innerWidth);

const isMobile = computed(() => width.value <= 1024);

const clientWidth = computed(() => {
  const scrollDiv = document.createElement("div");
  scrollDiv.style.cssText = `
    width: 100px;
    height: 100px;
    overflow: scroll;
    position: absolute;
    top: -9999px;`;
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return width.value - scrollbarWidth;
});

const onResize = () => {
  width.value = window.innerWidth;
  document.documentElement.style.setProperty("--client-width", `${clientWidth.value}px`);
};

document.documentElement.style.setProperty("--client-width", `${clientWidth.value}px`);
window.addEventListener("resize", onResize);

export { isMobile };
