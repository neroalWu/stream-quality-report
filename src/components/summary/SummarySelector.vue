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

<style scoped>
select {
    display: block;
    width: 250px;
    height: 35px;
    border-radius: 20px;
    text-align: center;
    margin-top: 20px;
    border: 0px solid #ccc;
    cursor: default;
}

select:hover {
    cursor: pointer;
}
</style>
