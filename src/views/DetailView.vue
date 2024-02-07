<script setup lang="ts">
import { ref, computed } from 'vue'

import SideContainer from '@/components/container/SideContainer.vue'
import HorizontalLayout from '@/components/layout/HorizontalLayout.vue'
import MainContainer from '@/components/container/MainContainer.vue'
import DetailCard from '@/components/detail/DetailCard.vue'

import DetailRequest from '@/typescripts/request/detail-request'
import DetailResponse from '@/typescripts/response/detail-response'
import HttpService from '@/typescripts/service/http-service'
import Store from '@/typescripts/store/store'
import type Pair from '@/typescripts/types/pair'
import router from '@/router'

const detailResponse = ref<DetailResponse>()
const infoTitle = ref('串流資訊')
const scoreTitle = ref('串流評分')

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

main()
</script>

<template>
    <HorizontalLayout>
        <SideContainer> </SideContainer>
        <MainContainer>
            <HorizontalLayout>
                <DetailCard :title="infoTitle" :paris="infoPairs" />
                <DetailCard :title="scoreTitle" :paris="scorePairs" />
            </HorizontalLayout>
        </MainContainer>
    </HorizontalLayout>
</template>

<style scoped></style>
