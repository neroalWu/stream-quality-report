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
    display: inline;
    width: 200px;
    height: 35px;
    border-radius: 20px;
    margin: 10px;
    text-align: center;
    border: 0px solid #ccc;
    cursor: default;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

select:hover {
    cursor: pointer;
}
</style>
