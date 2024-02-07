<script setup lang="ts">
import { computed } from 'vue'

import SummaryCellText from './SummaryCellText.vue'
import router from '@/router'
import Store from '@/typescripts/store/store'
import SummaryData from '@/typescripts/data/summary-data'

const props = defineProps({
    index: Number,
    summary: SummaryData
})

const displays = computed(() => {
    if (!props.summary) return []

    return [
        GetSummaryString(props.summary.region),
        GetSummaryString(props.summary.channel),
        GetSummaryString(props.summary.nr_m),
        GetSummaryString(props.summary.nr_sd),
        GetSummaryString(props.summary.flive_m),
        GetSummaryString(props.summary.flive_sd),
        GetSummaryString(props.summary.spaq_m),
        GetSummaryString(props.summary.spaq_sd)
    ]
})

function GetSummaryString(source: string | number | null) {
    if (!source) {
        return '-'
    }
    return source
}

function onclickPoint() {
    Store.Instance.selectedSummary = props.summary as SummaryData
    router.push('/detail')
}
</script>

<template>
    <div class="record-cell" @click="onclickPoint" title="點擊查看詳細資訊">
        <SummaryCellText
            v-for="(value, key) in displays"
            :key="key"
            :content="value ? value.toString() : ''"
        />
    </div>
</template>

<style scoped>
.record-cell {
    display: flex;
    background-color: var(--secondary-color);
    padding: 15px 0px 15px 0px;
    border: 1px solid var(--primary-color);
}

.record-cell:hover {
    cursor: pointer;
}
</style>
