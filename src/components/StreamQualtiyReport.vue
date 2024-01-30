<script setup lang="ts">
import HttpService from '@/typescripts/service/http-service'
import TopiqResponse from '@/typescripts/response/topiq-response'
import { reactive, ref, onUnmounted, onMounted } from 'vue'
import { REGION_TYPE } from '@/typescripts/types/region-type'
import { STREAM_TYPE } from '@/typescripts/types/stream-type'
import { CONFIGURATION } from '@/typescripts/configuration'
import RTMP_CELL from './RTMP-CELL.vue'
import { BITRATE_TYPE } from '@/typescripts/types/bitrate-type'
import { TopiqRequest } from '@/typescripts/request/topiq-request'
import OverlayImage from './Overlay-Image.vue'
import SelectButton from './SelectButton.vue'
import type TopiqData from '@/typescripts/data/topiq-data'
import { ImageRequest } from '@/typescripts/request/image-request'

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
        options: [BITRATE_TYPE.ALL, BITRATE_TYPE.LOW, BITRATE_TYPE.HIGH],
        default: BITRATE_TYPE.ALL
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
    const bitrateTypeSelector = selectorRefs.value[2]

    const region = regionSelector.selected == REGION_TYPE.ALL ? '' : regionSelector.select
    const streamType =
        streamTypeSelector.selected == STREAM_TYPE.ALL ? '' : streamTypeSelector.selected
    const bitrateType =
        bitrateTypeSelector.selected == BITRATE_TYPE.ALL ? '' : bitrateTypeSelector.selected

    const response = await HttpService.Instance.GetTopiqData(
        new TopiqRequest(region, streamType, bitrateType)
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
    <main>
        <div class="select-container">
            <SelectButton
                v-for="data in SELECTOR_LIST"
                :key="data.key"
                :options="data.options"
                :default="data.default"
                ref="selectorRefs"
            />
        </div>

        <button id="search" @click="onclickSearch">搜尋</button>

        <div class="tint" v-if="topiqResponse.list.length > 0">
            更新日期: {{ topiqResponse.GetLastDateTime() }}
        </div>

        <div class="outer-container" v-if="topiqResponse.list.length > 0">
            <div class="inner-container">
                <RTMP_CELL
                    v-for="topiqData in topiqResponse.list"
                    :key="topiqData._id"
                    :topiqData="topiqData"
                    @onclickPoint="onclickPoint"
                ></RTMP_CELL>
            </div>
        </div>

        <OverlayImage v-show="imageState" @click.self="hideImage" :imageSrc="imageSrc" />
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
    left: 40%;
    top: 15px;
    color: #ababab;
}
</style>
