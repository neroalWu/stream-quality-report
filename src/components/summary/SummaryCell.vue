<script setup lang="ts">
import { computed } from 'vue'

import SummaryCellText from './SummaryCellText.vue'
import router from '@/router'
import Store from '@/typescripts/store/store'
import SummaryData from '@/typescripts/data/summary-data'
import Util from '@/typescripts/util'

const props = defineProps({
    index: Number,
    summary: SummaryData
})

const displays = computed(() => {
    if (!props.summary) return []

    return [
        Util.Instance.SafeToString(props.summary.streamType),
        Util.Instance.SafeToString(props.summary.channel),
        Util.Instance.SafeToString(props.summary.nr_m),
        Util.Instance.SafeToString(props.summary.nr_sd),
        Util.Instance.SafeToString(props.summary.flive_m),
        Util.Instance.SafeToString(props.summary.flive_sd),
        Util.Instance.SafeToString(props.summary.spaq_m),
        Util.Instance.SafeToString(props.summary.spaq_sd)
    ]
})

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
