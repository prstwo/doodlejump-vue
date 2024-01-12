<!-- TODO: make Connection component a global component -->
<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  code: {
    type: Number,
    default: 0,
  },
});

const connections = [
  {
    color: "text-red-5",
    border: "border-red-5",
    status: "Not Connected",
    description: "Please Check Your Connection!",
  },
  {
    color: "text-green-5",
    border: "border-green-5",
    status: "Connected",
    description: "Everything is Working Perfectly!",
  },
  {
    color: "text-yellow-5",
    border: "border-yellow-5",
    status: "Connecting",
    description: 'Just a Moment, We"re Getting There!',
  },
  {
    color: "text-orange-5",
    border: "border-orange-5",
    status: "Disconnecting",
    description: "Preparing to Safely Disconnect!",
  },
];

const connection = computed(() => connections[props.code]);
</script>

<template>
  <div class="status-container">
    <div v-if="code === 1" class="mongodb" />
    ({{ code }}): {{ connection.status }},
    {{ connection.description }}
  </div>
</template>

<style>

.status-container{
  position: absolute;
    bottom: -2;
    background-color: azure;
    width: 100%;
    height: 24px;
    display: none;

}
</style>
