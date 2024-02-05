<script setup lang="ts">
import HttpService from '@/typescripts/service/http-service'
import TopiqResponse from '@/typescripts/response/topiq-response'
import { ref, reactive, onUnmounted, onMounted } from 'vue'

import { REGION_TYPE } from '@/typescripts/types/region-type'
import { STREAM_TYPE } from '@/typescripts/types/stream-type'
import { RESOLUTION } from '@/typescripts/types/resolution'

import RecordSelectButton from './record/RecordSelectButton.vue'
import RecordHeader from './record/RecordHeader.vue'
import RecordContent from './record/RecordContent.vue'
import { TopiqRequest } from '@/typescripts/request/topiq-request'
import { CONFIGURATION } from '@/typescripts/configuration'
import RecordCalendar from './record/RecordCalendar.vue'

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

let topiqResponse: TopiqResponse = reactive(new TopiqResponse([]))
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

    const response = await HttpService.Instance.GetTopiqData(
        new TopiqRequest(region, streamType, resolution)
    )

    topiqResponse.list = response.list

    if (queryIntervalID) {
        clearInterval(queryIntervalID)
    }

    queryIntervalID = setInterval(() => {
        onclickSearch()
    }, CONFIGURATION.QUERY_INTERVAL)
}
</script>

<template>
    <div class="select-container">
        <RecordSelectButton
            v-for="(data, index) in SELECTOR_LIST"
            :key="index"
            :options="data.options"
            :default="data.default"
            ref="selectorRefs"
        />

        <button class="search" @click="onclickSearch">搜尋</button>
    </div>

    <RecordCalendar/>

    <RecordHeader />

    <RecordContent :topiqResponse="topiqResponse" />
</template>

<style scoped>
.select-container {
    display: block;
}

.search {
    position: relative;
    display: inline-block;
    width: 200px;
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
</style>
