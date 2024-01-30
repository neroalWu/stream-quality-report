<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    default: String,
    options: Object
})

const selected = ref(props.default)

defineExpose({ selected })
</script>

<template>
    <select v-model="selected">
        <option v-for="option in options" :key="option" :value="option">
            {{ option }}
        </option>
    </select>
</template>

<style scoped></style>
