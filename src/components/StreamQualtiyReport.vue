<script setup lang="ts">
import HttpService from '@/typescripts/service/http-service'
import { ref, reactive, onUnmounted, onMounted } from 'vue'

import { REGION_TYPE } from '@/typescripts/types/region-type'
import { STREAM_TYPE } from '@/typescripts/types/stream-type'
import { RESOLUTION } from '@/typescripts/types/resolution'

import RecordSelectButton from './record/RecordSelectButton.vue'
import RecordHeader from './record/RecordHeader.vue'
import RecordContent from './record/RecordContent.vue'
import { CONFIGURATION } from '@/typescripts/configuration'
import RecordCalendar from './record/RecordCalendar.vue'
import SummaryRequest from '@/typescripts/request/summary-request'
import SummaryResponse from '@/typescripts/response/summary-response'
import Store from '@/typescripts/store/store'

const SELECTOR_LIST = [
    {
        options: [REGION_TYPE.ALL, REGION_TYPE.CEBU],
        default: REGION_TYPE.ALL
    },
    {
        options: [STREAM_TYPE.ALL, STREAM_TYPE.RTMP, STREAM_TYPE.FLV],
        default: STREAM_TYPE.ALL
    },
    {
        options: [RESOLUTION.ALL, RESOLUTION.HD, RESOLUTION.FULL_HD],
        default: RESOLUTION.ALL
    }
]

let summaryResponse: SummaryResponse = reactive(new SummaryResponse([]))
let selectorRefs = ref<any>([])
let queryIntervalID: number

onMounted(() => {
    onclickSearch()
})

onUnmounted(() => {
    queryIntervalID && clearInterval(queryIntervalID)
})

async function onclickSearch() {
    const regionSelector = selectorRefs.value[0]
    const streamTypeSelector = selectorRefs.value[1]
    const resolutionSelector = selectorRefs.value[2]

    const region = regionSelector.selected == REGION_TYPE.ALL ? '' : regionSelector.selected
    const streamType =
        streamTypeSelector.selected == STREAM_TYPE.ALL ? '' : streamTypeSelector.selected
    const resolution =
        resolutionSelector.selected == RESOLUTION.ALL ? '' : resolutionSelector.selected

    const startTime = Store.Instance.selectedRangeDate.start.getTime()
    const endTime = Store.Instance.selectedRangeDate.end.getTime()

    const response = await HttpService.Instance.GetSummary(
        new SummaryRequest(region, streamType, resolution, startTime, endTime)
    )

    console.log('response:', response)

    summaryResponse.summarys = response.summarys

    if (queryIntervalID) {
        clearInterval(queryIntervalID)
    }

    queryIntervalID = setInterval(() => {
        onclickSearch()
    }, CONFIGURATION.QUERY_INTERVAL)
}
</script>

<template>
    <div class="horizontal-layout">
        <div class="side-container">
            <RecordSelectButton
                v-for="(data, index) in SELECTOR_LIST"
                :key="index"
                :options="data.options"
                :default="data.default"
                ref="selectorRefs"
            />

            <button class="search" @click="onclickSearch">搜尋</button>
            <RecordCalendar />
        </div>

        <div class="record-container">
            <RecordHeader />
            <RecordContent :summarys="summaryResponse.summarys" />
        </div>
    </div>
</template>

<style scoped>
.horizontal-layout {
    display: flex;
}
.side-container {
    display: block;
    background-color: var(--accent-color);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 100vh;
}

.search {
    position: relative;
    display: block;
    width: 250px;
    height: 35px;
    margin-left: 20px;
    border-radius: 20px;
    background-color: coral;
    color: var(--secondary-color);
    border: 0px solid #ccc;
    cursor: default;
}

.search:hover {
    background-color: rgb(230, 105, 60);
    cursor: pointer;
}

.record-container {
    display: inline-block;
    margin-top: 10px;
    min-width: 720px;
    width: 100%;
}
</style>
