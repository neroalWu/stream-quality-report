<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { DatePicker } from 'v-calendar'
import Store from '@/typescripts/store/store'
import 'v-calendar/style.css'
import type RangeDate from '@/typescripts/data/range-date'

const range = ref<RangeDate | null>(null)

const minDate = computed(() => {
    let today = new Date()
    today.setMonth(today.getMonth() - 1)
    return today
})

watch(range, (newRange) => {
    if (!newRange) return

    newRange.start.setHours(0, 0, 0, 0)
    newRange.end.setHours(23, 59, 59, 999)

    Store.Instance.selectedRangeDate = newRange
    console.log(Store.Instance.selectedRangeDate)
})

onMounted(() => {
    range.value = {
        start: new Date(),
        end: new Date()
    }
})
</script>

<template>
    <div class="calendar">
        <DatePicker v-model.range="range" :max-date="new Date()" :min-date="minDate" />
    </div>
</template>

<style scoped>
.calendar {
    margin-left: 20px;
    margin-top: 20px;
    width: fit-content;
}
</style>
