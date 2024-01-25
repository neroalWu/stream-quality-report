<script setup lang="ts">
import HttpService from '@/typescripts/http-service'
import StreamQualityReportResponse from '@/typescripts/stream-quality-report/struct/stream-quality-report-response'
import { reactive, ref, watch } from 'vue'
import { REGION_TYPE } from '@/typescripts/stream-quality-report/struct/region-type'
import { STREAM_PROTOCOL_TYPE } from '@/typescripts/stream-quality-report/struct/stream-protocol-type'
import RTMP_CELL from './RTMP-CELL.vue'

const REGION_OPTIONS = [REGION_TYPE.ALL, REGION_TYPE.CEBU]

const TYPE_OPTIONS = [STREAM_PROTOCOL_TYPE.ALL, STREAM_PROTOCOL_TYPE.RTMP, STREAM_PROTOCOL_TYPE.FLV]

let reactiveResponse: StreamQualityReportResponse = reactive(new StreamQualityReportResponse())

let selectedRegion = ref(REGION_TYPE.ALL)
let selectedStreamType = ref(STREAM_PROTOCOL_TYPE.ALL)

watch(selectedRegion, () => {
    onSelectedChange()
})

watch(selectedStreamType, () => {
    onSelectedChange()
})

async function onSelectedChange() {
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
}

async function Init() {
    const response: StreamQualityReportResponse = await HttpService.Instance.GetAll()
    reactiveResponse.list = response.list
}

Init()
</script>

<template>
    <main>
        <label for="region">選擇區域: </label>
        <select name="region" v-model="selectedRegion">
            <option v-for="opt in REGION_OPTIONS" :key="opt" :value="opt">{{ opt }}</option></select
        ><br />

        <label for="stream_type">選擇協定: </label>
        <select name="stream_type" v-model="selectedStreamType">
            <option v-for="opt in TYPE_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
        </select>

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

    <footer>
        <div id="tint">資料每 10 分鐘會刷新</div>
    </footer>

</template>

<style scoped>
.outer-container {
    height: 100%;
    overflow: hidden;
    border: 1px solid #ccc;
    margin-top: 10px;
}

.inner-container {
    height: 820px;
    overflow-y: scroll;
}

#tint {
    width: fit-content;
    padding-top: 5px;
    margin: 0 auto;
    color: #949494;
}
</style>
