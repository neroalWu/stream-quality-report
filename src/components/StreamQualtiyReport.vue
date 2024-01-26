<script setup lang="ts">
import HttpService from '@/typescripts/http-service'
import StreamQualityReportResponse from '@/typescripts/stream-quality-report/struct/stream-quality-report-response'
import { reactive, ref } from 'vue'
import { REGION_TYPE } from '@/typescripts/stream-quality-report/struct/region-type'
import { STREAM_PROTOCOL_TYPE } from '@/typescripts/stream-quality-report/struct/stream-protocol-type'
import RTMP_CELL from './RTMP-CELL.vue'

const REGION_OPTIONS = [REGION_TYPE.ALL, REGION_TYPE.CEBU]

const TYPE_OPTIONS = [STREAM_PROTOCOL_TYPE.ALL, STREAM_PROTOCOL_TYPE.RTMP, STREAM_PROTOCOL_TYPE.FLV]

let reactiveResponse: StreamQualityReportResponse = reactive(new StreamQualityReportResponse())

let selectedRegion = ref(REGION_TYPE.ALL)
let selectedStreamType = ref(STREAM_PROTOCOL_TYPE.ALL)
let lastDateTime = ref('')

function formatDate(timestamp: number): string {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

async function onclickSearch() {
    let newResponse: StreamQualityReportResponse

    if (
        selectedRegion.value == REGION_TYPE.ALL &&
        selectedStreamType.value == STREAM_PROTOCOL_TYPE.ALL
    ) {
        newResponse = await HttpService.Instance.GetAll()
    } else if (
        selectedRegion.value != REGION_TYPE.ALL &&
        selectedStreamType.value == STREAM_PROTOCOL_TYPE.ALL
    ) {
        newResponse = await HttpService.Instance.GetByRegion(selectedRegion.value)
    } else if (
        selectedRegion.value == REGION_TYPE.ALL &&
        selectedStreamType.value != STREAM_PROTOCOL_TYPE.ALL
    ) {
        newResponse = await HttpService.Instance.GetByStreamType(selectedStreamType.value)
    } else {
        newResponse = await HttpService.Instance.GetByRegionAndStreamType(
            selectedRegion.value,
            selectedStreamType.value
        )
    }

    reactiveResponse.list = newResponse.list
    const lastTimestamp = newResponse.list[0].timestamp_list[0]
    lastDateTime.value = formatDate(lastTimestamp)
}

onclickSearch()
</script>

<template>
    <main>
        <div class="select-container">
            <select name="region" v-model="selectedRegion">
                <option v-for="opt in REGION_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
            </select>

            <select name="stream_type" v-model="selectedStreamType">
                <option v-for="opt in TYPE_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
            </select>
        </div>

        <button id="search" @click="onclickSearch">搜尋</button>

        <div class="tint">最近更新時間: {{ lastDateTime }}</div>

        <div class="outer-container">
            <div class="inner-container">
                <RTMP_CELL
                    v-for="topiq in reactiveResponse.list"
                    :key="topiq._id"
                    :topiq="topiq"
                ></RTMP_CELL>
            </div>
        </div>
    </main>
</template>

<style scoped>
.outer-container {
    margin-left: 10%;
    margin-right: 10%;
    width: fit-content;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid #ccc;
}

.inner-container {
    height: 850px;
    width: 1400px;
    overflow-y: scroll;
}

.select-container {
    display: inline-block;
    position: relative;
    width: fit-content;
    left: 9.5%;
}

select {
    display: inline-block;
    width: 200px;
    height: 35px;
    border-radius: 20px;
    margin: 10px;
    text-align: center;
}

#search {
    position: relative;
    display: inline-block;
    left: 10%;
    width: 100px;
    height: 35px;
    border-radius: 20px;
    background-color: coral;
    color: var(--secondary-color);
    border: 1px solid #ccc;
}

#search:hover {
    background-color: rgb(230, 105, 60);
}

.tint {
    display: inline-block;
    position: relative;
    left: 44.5%;
    top: 15px;
    color: #ababab;
}
</style>
