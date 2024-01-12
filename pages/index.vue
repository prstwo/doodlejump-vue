<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
const componentNumber = ref(1);
function changeComponent(num: number) {
  componentNumber.value = num;
}

const { data, refresh } = await useFetch("/api/status");
const readyState = ref(data.value ?? 0);
const customerName = useState("customerName", () => "");
const customerPhone = useState("customerPhone", () => "");
const customerScore = useState("customerScore", () => 0);

const { pause, resume } = useIntervalFn(async () => {
  refresh();
  readyState.value = data.value ?? 0;
}, 5000);

watch(
  readyState,
  () => {
    if (readyState.value === 1) pause();
    else resume();
  },
  { immediate: true }
);
const newUser = useState("newUser", () => false);

function getData(name: string, phone: string, score: number) {
  customerName.value = name;
  customerPhone.value = phone;
  customerScore.value = score;
}

async function setScore(score: number) {
  customerScore.value = score;
}
</script>
<template>
  <div class="page-wrapper">
    <img
      src="~/assets/img/watermelon-bg-with-yalda.png"
      alt=""
      v-show="componentNumber !== 2 && componentNumber === 1"
      class="top-main-banner"
    />
    <img
      src="~/assets/img/watermelon-bg.png"
      alt=""
      v-show="componentNumber !== 2 && componentNumber === 3"
      class="top-main-banner-losted"
    />

    <Connection :code="readyState ?? 0" />
    <Home
      v-if="componentNumber === 1"
      @changeComponent="changeComponent"
      @sendData="getData"
    />
    <Game v-if="componentNumber === 2" @changeComponent="changeComponent" />
    <Results
      v-if="componentNumber === 3"
      @changeComponent="changeComponent"
      @sendScore="setScore"
    />

    <img
      src="~/assets/img/main-bg-footer.png"
      alt=""
      v-show="componentNumber !== 2 && componentNumber === 1"
      class="bottom-main-banner"
    />
    <img
      src="~/assets/img/faress-mono-logo.png"
      alt=""
      v-show="componentNumber !== 2 && componentNumber === 3"
      class="bottom-main-banner-lost"
    />
  </div>
</template>
<style scoped>
.page-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-content: center;
  justify-content: center;
}

.top-main-banner,
.bottom-main-banner {
  position: absolute;
  width: 100%;
}

.top-main-banner-losted {
  position: absolute;
  width: 100%;
  height: 146px;
  object-fit: cover;
  object-position: bottom;
}
.top-main-banner,
.top-main-banner-losted {
  top: -22px;
  right: 0;
}
.bottom-main-banner {
  bottom: 0;
  right: 0;
  height: 107px;
}
.bottom-main-banner-lost {
  position: absolute;

  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  height: 42px;
}
</style>