<script setup lang="ts">
import { ref, watch } from 'vue'
import { DatePicker } from 'v-calendar'
import Store from '@/typescripts/store/store'
import 'v-calendar/style.css'

const range = ref({
    start: new Date(),
    end: new Date()
})

watch(range, (newRange) => {
    Store.Instance.selectedRangeDate = newRange
    console.log(Store.Instance.selectedRangeDate)
})

</script>

<template>
    <div>
        <DatePicker v-model.range="range" />
    </div>
</template>

<style scoped></style>
