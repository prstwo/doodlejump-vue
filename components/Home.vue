<script setup lang="ts">
const emit = defineEmits(["changeComponent", "toggleNewUser", "sendData"]);
function checkPersianKeyboard(newName: string) {
  userNameEnter.value = newName.toString().replace(/[a-zA-Z0-9]/g, "");
}
// // DOM
// let startFormCon;
// let startBtn;
// let startBtnAgain;
// let pointsCon;
const router = useRouter();
const userNameEnter = ref("");
const inputPhone = useState("inputPhone", () => null);
const showModal = ref(false);
function toggleModal() {
  showModal.value = !showModal.value;
}
function closeModal() {
  showModal.value = false;
}
watch(userNameEnter, (newName) => {
  checkPersianKeyboard(newName);
});
// send api requests
async function createUserApi() {
  await $fetch(`/api/users/create`, {
    method: "post",
    body: {
      name: userNameEnter.value,
      phone: inputPhone.value,
      score: 0,
      created_date: new Date(Date.now()).toISOString(),
      updated_date: new Date(Date.now()).toISOString(),
    },
    onResponse({ response }) {
      if (response && response.status === 200) {
        emit("changeComponent", 2);
      } else {
        alert("خطایی پیش آمده است. شماره موبایل تکراری است.");
      }
    },
    onRequestError({ error }) {
      alert(error);
    },
  });
}
async function checkUser() {
  await $fetch(`/api/users/${inputPhone.value}`, {
    method: "get",
    onResponse({ response }) {
      if (response.status === 200) {
        if (response._data) {
          let newUser = false;

          emit("sendData", userNameEnter.value, inputPhone.value, 0);

          // API endpoint URL

          emit("changeComponent", 2);
        }
      } else {
        let newUser = true;
        emit("sendData", userNameEnter.value, inputPhone.value, 0);

        createUserApi();

        // API endpoint URL
      }
    },
  });
}
function startGameApi(e: any) {
  // Customer data
  checkUser();
}
const start_game_container = ref();
function fireSubmit() {
  if (userNameEnter.value.length > 2 && inputPhone.value && inputPhone.value.length === 11) {
    let submit = new Event("submit");
    start_game_container.value.dispatchEvent(submit);
  }
}
</script>
<template>
  <div>
    <form
      id="start_game_container"
      ref="start_game_container"
      class="modal-container start_game_container"
      @submit.prevent="startGameApi"
    >
      <div class="input-container">
        <img
          src="~/assets/img/input-wrapper.png"
          alt="name"
          class="input-img"
        />
        <input
          type="text"
          placeholder="اسم (فارسی) "
          required
          v-model="userNameEnter"
          id="name_input"
        />
      </div>

      <div class="input-container">
        <img
          src="~/assets/img/input-wrapper.png"
          alt="name"
          class="input-img"
        />
        <input
          type="tel"
          placeholder="شماره همراه (مثل 09120000000)"
          pattern="09\d{9}"
          v-model="inputPhone"
          id="tel_input"
          required
          dir="rtl"
        />
      </div>

      <div>
        <img
          src="~/assets/img/start-btn-red.svg"
          alt="start"
          role="submit"
          class="start-game-btn"
          :class="{
            'remove-gray':
              userNameEnter &&
              userNameEnter.length > 2 &&
              inputPhone &&
              inputPhone.length === 11,
          }"
          @click="fireSubmit"
          :disabled="
            !(
              userNameEnter &&
              userNameEnter.length > 2 &&
              inputPhone &&
              inputPhone.length === 11
            )
          "
        />
      </div>

      <div>
        <img
          @click="toggleModal"
          src="~/assets/img/guide-icon.svg"
          alt=""
          class="top-main-banner-guide"
        />
      </div>
      <Modal
        :showModal="showModal"
        @toggleModal="toggleModal"
        @closeModal="closeModal"
      />
    </form>
  </div>
</template>
<style scoped>
.input-container {
  position: relative;
  width: 219px;
  margin: 0 auto;
}
.input-img {
  width: 100%;
}
.input-container input {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  background-color: transparent;
  height: 34.11px;
  appearance: none;
  border: 0;
  padding: 2px 16px;
  color: white;
  font-size: 16px;
  outline: 0;
}
.input-container input::placeholder {
  color: white;
  opacity: 0.8;
}
.top-main-banner-guide {
  width: 78px;
  height: auto;
  top: 18px;
  left: 18px;
  margin: 8px auto 0;
  cursor: pointer;
}
</style>
