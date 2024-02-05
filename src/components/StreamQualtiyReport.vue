<script setup lang="ts">
import HttpService from '@/typescripts/service/http-service'
import TopiqResponse from '@/typescripts/response/topiq-response'
import { reactive, ref, onUnmounted, onMounted } from 'vue'
import { REGION_TYPE } from '@/typescripts/types/region-type'
import { STREAM_TYPE } from '@/typescripts/types/stream-type'
import { CONFIGURATION } from '@/typescripts/configuration'
import RTMP_CELL from './RTMP-CELL.vue'
import { RESOLUTION } from '@/typescripts/types/resolution'
import { TopiqRequest } from '@/typescripts/request/topiq-request'
import OverlayImage from './Overlay-Image.vue'
import SelectButton from './SelectButton.vue'
import type TopiqData from '@/typescripts/data/topiq-data'
import { ImageRequest } from '@/typescripts/request/image-request'
import ContainerHeaderText from './ContainerHeaderText.vue'

const SELECTOR_LIST = [
    {
        key: 0,
        options: [REGION_TYPE.ALL, REGION_TYPE.CEBU],
        default: REGION_TYPE.ALL
    },
    {
        key: 1,
        options: [STREAM_TYPE.ALL, STREAM_TYPE.RTMP, STREAM_TYPE.FLV],
        default: STREAM_TYPE.ALL
    },
    {
        key: 2,
        options: [RESOLUTION.ALL, RESOLUTION.HD, RESOLUTION.FULL_HD],
        default: RESOLUTION.ALL
    }
]

const selectorRefs = ref<any>([])

const imageSrc = ref('')
const imageState = ref(false)

let topiqResponse: TopiqResponse = reactive(new TopiqResponse([]))

let queryIntervalID: number

async function onclickSearch() {
    const regionSelector = selectorRefs.value[0]
    const streamTypeSelector = selectorRefs.value[1]
    const resolutionSelector = selectorRefs.value[2]

    const region = regionSelector.selected == REGION_TYPE.ALL ? '' : regionSelector.select
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

async function onclickPoint(timestampIndex: number, topiqData: TopiqData) {
    imageSrc.value = ''
    imageState.value = true

    const timestamp = topiqData.timestamp_list[timestampIndex]
    const data = await HttpService.Instance.GetImage(
        new ImageRequest(topiqData.region, topiqData.streamType, topiqData.channel, timestamp)
    )

    imageSrc.value = data.src
}

function hideImage() {
    imageState.value = false
}

onMounted(() => {
    onclickSearch()
})

onUnmounted(() => {
    queryIntervalID && clearInterval(queryIntervalID)
})
</script>

<template>
    <div class="select-container">
        <SelectButton
            v-for="data in SELECTOR_LIST"
            :key="data.key"
            :options="data.options"
            :default="data.default"
            ref="selectorRefs"
        />

        <button id="search" @click="onclickSearch">搜尋</button>
    </div>

    <div class="container-header">
        <ContainerHeaderText title="協定" :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.STREAM_TYPE" />
        <ContainerHeaderText title="桌號" :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.CHANNEL" />
        <ContainerHeaderText title="NR M" :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.NR_M" />
        <ContainerHeaderText title="NR SD" :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.NR_SD" />
        <ContainerHeaderText title="FLIVE M" :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.FLIVE_M" />
        <ContainerHeaderText title="FLIVE SD" :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.FLIVE_SD" />
        <ContainerHeaderText title="SPAQ M" :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.SPAQ_M" />
        <ContainerHeaderText title="SPAQ SD" :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.SPAQ_SD" />
    </div>

    <div class="container-content" v-if="topiqResponse.list.length > 0">
        <RTMP_CELL
            v-for="topiqData in topiqResponse.list"
            :key="topiqData._id"
            :topiqData="topiqData"
            @onclickPoint="onclickPoint"
        ></RTMP_CELL>
    </div>

    <OverlayImage v-show="imageState" @click.self="hideImage" :imageSrc="imageSrc" />
</template>

<style scoped>
.select-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 65px;
}

.container-header {
    height: 60px;
    background-color: var(--secondary-color);
    margin-left: 10px;
    margin-right: 10px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border: 1px solid var(--primary-color);
    top: 120px;
    margin-top: 65px;

    position: sticky;
}

.container-content {
    display: block;
    margin-left: 10px;
    margin-right: 10px;
}

#search {
    position: relative;
    display: inline-block;
    width: 200px;
    height: 35px;
    margin: 10px;
    border-radius: 20px;
    background-color: coral;
    color: var(--secondary-color);
    border: 0px solid #ccc;
    cursor: default;
}

#search:hover {
    background-color: rgb(230, 105, 60);
    cursor: pointer;
}
</style>
