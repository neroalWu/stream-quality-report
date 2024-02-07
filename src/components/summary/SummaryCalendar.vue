<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { DatePicker } from 'v-calendar'
import Store from '@/typescripts/store/store'
import 'v-calendar/style.css'
import RangeDate from '@/typescripts/types/range-date'

const range = ref<RangeDate>(Store.Instance.selectedRangeDate)

const minDate = computed(() => {
    let today = new Date()
    today.setMonth(today.getMonth() - 1)
    return today
})

watch(range, (newRange) => {
    if (!newRange) return

    Store.Instance.selectedRangeDate = RangeDate.Create(newRange.start, newRange.end)
})

</script>

<template>
    <div class="calendar">
        <DatePicker v-model.range="range" :max-date="new Date()" :min-date="minDate" />
    </div>
</template>

<style scoped>
.calendar {
    margin-top: 20px;
    width: fit-content;
}
</style>
@/typescripts/types/range-date