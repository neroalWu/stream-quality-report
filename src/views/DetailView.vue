<script setup lang="ts">
import { ref, computed } from 'vue'

import SideContainer from '@/components/container/SideContainer.vue'
import HorizontalLayout from '@/components/layout/HorizontalLayout.vue'
import MainContainer from '@/components/container/MainContainer.vue'
import DetailCard from '@/components/detail/DetailCard.vue'
import DetailChart from '@/components/detail/DetailChart.vue'
import VerticalLayout from '@/components/layout/VerticalLayout.vue'

import DetailRequest from '@/typescripts/request/detail-request'
import HttpService from '@/typescripts/service/http-service'
import Store from '@/typescripts/store/store'
import type Pair from '@/typescripts/types/pair'
import router from '@/router'
import type DetailResponse from '@/typescripts/response/detail-response'
import VideoRequest from '@/typescripts/request/video-request'
import type DetailData from '@/typescripts/data/detail-data'

const detailResponse = ref<DetailResponse>()
const infoTitle = ref('串流資訊')
const scoreTitle = ref('數據統計')
const chartTitle = ref('數據圖表')

const isOpen = ref(false)
const videoURL = ref('')
const videoPlayer = ref<HTMLVideoElement>()

async function main() {
    const detailRequest = DetailRequest.Create(
        Store.Instance.selectedSummary,
        Store.Instance.selectedRangeDate
    )

    try {
        const response = await HttpService.Instance.GetDetails(detailRequest)
        detailResponse.value = response
    } catch (error) {
        router.push('/')
        console.log(error)
    }
}

const infoPairs = computed((): Array<Pair<string, string>> => {
    return [
        {
            key: '區域:',
            value: toString(detailResponse.value?.detail.region)
        },
        {
            key: '協定:',
            value: toString(detailResponse.value?.detail.streamType)
        },
        {
            key: '桌號:',
            value: toString(detailResponse.value?.detail.channel)
        },
        {
            key: '解析度:',
            value: toString(detailResponse.value?.detail.resolution)
        }
    ]
})

const scorePairs = computed((): Array<Pair<string, string>> => {
    return [
        {
            key: 'NR 平均:',
            value: toString(detailResponse.value?.detail.nr_m)
        },
        {
            key: 'NR 標準差:',
            value: toString(detailResponse.value?.detail.nr_sd)
        },
        {
            key: 'FLIVE 平均:',
            value: toString(detailResponse.value?.detail.flive_m)
        },
        {
            key: 'FLIVE 標準差:',
            value: toString(detailResponse.value?.detail.flive_sd)
        },
        {
            key: 'SPAQ 平均:',
            value: toString(detailResponse.value?.detail.spaq_m)
        },
        {
            key: 'SPAQ 標準差:',
            value: toString(detailResponse.value?.detail.spaq_sd)
        }
    ]
})

function toString(value: string | undefined | number): string {
    return value ? value.toString() : '-'
}

function onclickHome() {
    router.back()
}

async function onclickPoint(timestampIndex: number) {
    const videoRequest = VideoRequest.Create(
        detailResponse.value?.detail as DetailData,
        timestampIndex
    )

    const response = await HttpService.Instance.GetVideo(videoRequest)
    videoURL.value = response.videoURL

    isOpen.value = true
}

function closePopup() {
    isOpen.value = false
    videoPlayer.value?.pause()
}

main()
</script>

<template>
    <HorizontalLayout>
        <SideContainer>
            <button class="home" @click="onclickHome">返回首頁</button>
        </SideContainer>
        <MainContainer>
            <VerticalLayout>
                <DetailCard :title="infoTitle" :paris="infoPairs" />
                <DetailCard :title="scoreTitle" :paris="scorePairs" />

                <DetailChart
                    :title="chartTitle"
                    :detail="detailResponse?.detail"
                    @onclickPoint="onclickPoint"
                />
            </VerticalLayout>
        </MainContainer>

        <div v-if="isOpen" class="popup" @click.self="closePopup">
            <video ref="videoPlayer" controls autoplay loop>
                <source :src="videoURL" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    </HorizontalLayout>
</template>

<style scoped>
.home {
    position: relative;
    display: block;
    width: 250px;
    height: 35px;
    margin-top: 20px;
    border-radius: 20px;
    background-color: var(--secondary-color);
    color: var(--fronted-color);
    border: 0px solid #ccc;
    cursor: default;
}

.home:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}

.popup {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.popup video {
    width: 60%;
}
</style>
