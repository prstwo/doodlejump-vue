<script setup>
const emit = defineEmits(["changeComponent", "sendData"]);
let usersscore = localStorage.getItem("score");
const js_your_points = ref();
const topFiveError = useState("topFiveError", () => false);
const currentUserScore = useState("currentUserScore", () => false);
const yourLevel = useState("yourLevel", () => null);
const { data: topThreeUsers } = await useAsyncData("topThreeUsers", () =>
  $fetch("/api/users/sort", {
    method: "get",
    onResponse({ response }) {
      // Process the response data
      if (response.status === 200) {
        topFiveError.value = false;
        findUserLevelApi();

      } else {
        topFiveError.value = true;
      }
    },
    onRequestError({ error }) {
      topFiveError.value = true;
    },
  })
);
async function findUserLevelApi() {
  await $fetch(`/api/users/sort/${useState("inputPhone").value}`, {
    method: "get",

    onResponse({ response }) {
      if (response && response.status === 200) {
        yourLevel.value = response._data && response._data + 1;
      }
    },
    onRequestError({ error }) {
      alert(error);
    },
  });
}

onMounted(() => {
  emit("sendScore", usersscore);
});
</script>
<template>
  <div>
    <div id="losted_game_modal" class="modal-container">
      <div class="losted-text">باختی!!!</div>
      <div class="your-points">
        <span class="your-point-title">امتیاز شما:</span>
        <span>
          {{ usersscore }}
        </span>
      </div>
      <div class="top-five-users" v-if="topThreeUsers">
        <div class="table-title">جدول امتیاز</div>

        <div
          v-for="(user, index) of topThreeUsers"
          :key="index"
          class="top-five-users-item"
        >
          <div>
            <span class="ml-1 w-4 inline-block"> {{ index + 1 }} - </span>
            <span>
              {{ user.name }}
            </span>
          </div>
          <div>
            <span>{{ user.score }}</span>
            <span class="mr-1-2"> امتیاز </span>
          </div>
        </div>
        <div>
          <div class="text-right mr-1">.</div>
          <div class="text-right mr-1">.</div>
        </div>
        <div v-if="yourLevel && yourLevel > 3" class="top-five-users-item">
          <div>
            <span class="ml-1 w-4 inline-block"> {{ yourLevel }} - </span>
            <span> شما </span>
          </div>
          <div>
            <span>{{ usersscore }}</span>
            <span class="mr-1-2"> امتیاز </span>
          </div>
        </div>
        <div v-show="topFiveError">خطایی در دریافت اطلاعات پیش آمده‌است</div>
      </div>
      <div>
        <div>
          <img
            src="~/assets/img/restart-again-red.png"
            alt="start"
            role="submit"
            class="start-game-btn remove-gray"
            @click="emit('changeComponent', 2)"
            id="js_restart_game"
          />
          <!-- <img src="~/assets/img/start-btn-gray.svg" alt="start" role="submit" class="start-game-btn" v-else> -->
          <!-- v-if="userNameEnter && userNameEnter.length > 2 && inputPhone && inputPhone.length === 11" -->
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<style scoped>
.your-point-title {
  margin-left: 4px;
  padding: 4px auto;
}
.your-points {
  color: #861f1d;
  font-size: 26px;
  margin-bottom: 10px;
}
.table-title {
  font-size: 28px;
  text-align: center;
}
.top-five-users {
  background-image: url(~/assets/img/table-bg.svg);
  background-origin: border-box;
  background-position: center;
  background-repeat: no-repeat;
  padding: 21px;
  margin-bottom: 16px;
  height: 217px;
  width: 251px;
  margin: 0 auto;
  background-origin: border-box;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
  /* background-color: aquamarine; */
  box-sizing: border-box;
}
.top-five-users-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
}
.top-five-users-item > div {
  white-space: nowrap;
}
.item-score-span {
  margin-left: 8px;
}
</style>