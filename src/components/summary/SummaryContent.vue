<script setup lang="ts">
import type SummaryData from '@/typescripts/data/summary-data';
import SummaryCell from './SummaryCell.vue'

defineProps({
    summarys: Array<SummaryData>,
})

</script>

<template>
    <div class="record-content" v-if="summarys && summarys?.length > 0">
        <SummaryCell
            v-for="(summary, index) in summarys"
            :key="index"
            :index="index"
            :summary="summary"
        />
    </div>
</template>

<style scoped>
.record-content {
    display: block;
}
</style>
