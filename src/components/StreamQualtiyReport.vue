<script setup lang="ts">
import HttpService from '@/typescripts/service/http-service'
import TopiqResponse from '@/typescripts/response/topiq-response'
import { reactive, ref, onUnmounted, type VNodeRef, onMounted } from 'vue'
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

const REGION_OPTIONS = [REGION_TYPE.ALL, REGION_TYPE.CEBU]

const STREAM_TYPE_OPTIONS = [STREAM_TYPE.ALL, STREAM_TYPE.RTMP, STREAM_TYPE.FLV]

const BITRATE_TYPE_OPTIONS = [BITRATE_TYPE.ALL, BITRATE_TYPE.LOW, BITRATE_TYPE.HIGH]

const regionSelector = ref<VNodeRef | null>(null)
const streamTypeSelector = ref<VNodeRef | null>(null)
const bitrateTypeSelector = ref<VNodeRef | null>(null)

let topiqResponse: TopiqResponse = reactive(new TopiqResponse([]))

let queryIntervalID: number

onUnmounted(() => {
    queryIntervalID && clearInterval(queryIntervalID)
})

async function onclickSearch() {
    const region =
        regionSelector.value.selected == REGION_TYPE.ALL ? '' : regionSelector.value.selected
    const streamType =
        streamTypeSelector.value.selected == STREAM_TYPE.ALL
            ? ''
            : streamTypeSelector.value.selected
    const bitrateType =
        bitrateTypeSelector.value.selected == BITRATE_TYPE.ALL
            ? ''
            : bitrateTypeSelector.value.selected

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

onMounted(() => {
    onclickSearch()
})

const imageSrc = ref('')
const imageState = ref(false)

async function onclickPoint(timestampIndex: number, topiqData: TopiqData) {
    imageSrc.value = ''
    imageState.value = true

    const region = topiqData.region
    const streamType = topiqData.streamType
    const channel = topiqData.channel
    const timestamp = topiqData.timestamp_list[timestampIndex]
    const data = await HttpService.Instance.GetImage(
        new ImageRequest(region, streamType, channel, timestamp)
    )

    imageSrc.value = data.src
}

function hideImage() {
    imageState.value = false
}
</script>

<template>
    <main>
        <div class="select-container">
            <SelectButton
                :options="REGION_OPTIONS"
                :default="REGION_TYPE.ALL"
                ref="regionSelector"
            />
            <SelectButton
                :options="STREAM_TYPE_OPTIONS"
                :default="STREAM_TYPE.ALL"
                ref="streamTypeSelector"
            />
            <SelectButton
                :options="BITRATE_TYPE_OPTIONS"
                :default="BITRATE_TYPE.ALL"
                ref="bitrateTypeSelector"
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

        <OverlayImage v-show=imageState @click.self=hideImage :imageSrc=imageSrc />
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
    border: 0px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
