<script setup lang="ts">
import { ref, computed } from 'vue'

import SideContainer from '@/components/container/SideContainer.vue'
import HorizontalLayout from '@/components/layout/HorizontalLayout.vue'
import MainContainer from '@/components/container/MainContainer.vue'
import DetailCard from '@/components/detail/DetailCard.vue'
import DetailChart from '@/components/detail/DetailChart.vue'

import DetailRequest from '@/typescripts/request/detail-request'
import DetailResponse from '@/typescripts/response/detail-response'
import HttpService from '@/typescripts/service/http-service'
import Store from '@/typescripts/store/store'
import type Pair from '@/typescripts/types/pair'
import router from '@/router'

const detailResponse = ref<DetailResponse>()
const infoTitle = ref('串流資訊')
const scoreTitle = ref('數據統計')
const chartTitle = ref('數據圖表')

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
            value: ToString(detailResponse.value?.detail.region)
        },
        {
            key: '協定類型:',
            value: ToString(detailResponse.value?.detail.streamType)
        },
        {
            key: '桌號:',
            value: ToString(detailResponse.value?.detail.channel)
        },
        {
            key: '解析度:',
            value: ToString(detailResponse.value?.detail.resolution)
        }
    ]
})

const scorePairs = computed((): Array<Pair<string, string>> => {
    return [
        {
            key: 'NR 平均:',
            value: ToString(detailResponse.value?.detail.nr_m)
        },
        {
            key: 'NR 標準差:',
            value: ToString(detailResponse.value?.detail.nr_sd)
        },
        {
            key: 'FLIVE 平均:',
            value: ToString(detailResponse.value?.detail.flive_m)
        },
        {
            key: 'FLIVE 標準差:',
            value: ToString(detailResponse.value?.detail.flive_sd)
        },
        {
            key: 'SPAQ 平均:',
            value: ToString(detailResponse.value?.detail.spaq_m)
        },
        {
            key: 'SPAQ 標準差:',
            value: ToString(detailResponse.value?.detail.spaq_sd)
        }
    ]
})

function ToString(value: string | undefined | number): string {
    return value ? value.toString() : '-'
}

function onclickHome() {
    router.back()
}

main()
</script>

<template>
    <HorizontalLayout>
        <SideContainer>
            <button class="home" @click="onclickHome">返回首頁</button>
        </SideContainer>
        <MainContainer>
            <DetailCard :title="infoTitle" :paris="infoPairs" />
            <DetailCard :title="scoreTitle" :paris="scorePairs" />

            <DetailChart :title="chartTitle" />
        </MainContainer>
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
</style>
