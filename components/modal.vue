<script setup>
const emit = defineEmits(["toggleModal", "closeModal"]);
const props = defineProps(["showModal"])

</script>
<template>
  <div>
    <div
      v-if="showModal === true"
      class="overlay-container"
      @click="emit('closeModal')"
    >
      <div class="modal-container">
        <div class="guide-note">
          <span>
            playing with computer:
          </span> 
          <span>
            to be able to play with your computer, just use the left and right keys on the keyboard.
          </span>
        </div>
        <div  class="guide-note">
          <span>
            playing with phone:
          </span> 
        
        <span>
          to be able to play with your computer, just turn your phone left or right or use the left and right keys on the keyboard.
       
        </span>
        </div>
        <img
          src="~/assets/img/close-filled.svg"
          class="modal-main-close"
          alt="close"
          @click="emit('closeModal')"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.overlay-container {
  background-color: rgba(0, 0, 0, 0.414);
  width: 381px;
  height: 100vh;
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0

}
.modal-container {
  position: absolute;
  background-color: rgb(241, 241, 224);
  border-radius: 16px;
  width:300px;
  height: 40vh;
  top: 30vh;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
}
.modal-container img.modal-main-pic {
  width: 100%;
  height: auto;
}
.modal-container img.modal-main-close{
    position: absolute;
    top: 8px;
    left: 8px;
    cursor: pointer;
}
.guide-note{
  margin-bottom: 1rem;
}
.guide-note span:first-child{
  margin-right: 0.5rem;
  font-weight: 600;
}
</style>