<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { REGION_TYPE } from '@/typescripts/types/region-type'
import { STREAM_TYPE } from '@/typescripts/types/stream-type'
import { RESOLUTION } from '@/typescripts/types/resolution'
import SummaryRequest from '@/typescripts/request/summary-request'
import SummaryResponse from '@/typescripts/response/summary-response'
import Store from '@/typescripts/store/store'
import HttpService from '@/typescripts/service/http-service'

import SummarySelector from '@/components/summary/SummarySelector.vue'
import SummaryHeader from '@/components/summary/SummaryHeader.vue'
import SummaryContent from '@/components/summary/SummaryContent.vue'
import SummaryCalendar from '@/components/summary/SummaryCalendar.vue'
import HorizontalLayout from '@/components/layout/HorizontalLayout.vue'
import SideContainer from '@/components/container/SideContainer.vue'
import MainContainer from '@/components/container/MainContainer.vue'

const SELECTOR_LIST = [
    {
        options: [REGION_TYPE.ALL, REGION_TYPE.CEBU],
        default: Store.Instance.selectedRegion
    },
    {
        options: [STREAM_TYPE.ALL, STREAM_TYPE.RTMP, STREAM_TYPE.FLV],
        default: Store.Instance.selectedStreamType
    },
    {
        options: [RESOLUTION.ALL, RESOLUTION.HD, RESOLUTION.FULL_HD],
        default: Store.Instance.selectedResolution
    }
]

let summaryResponse = ref(SummaryResponse.Create())
let selectorRefs = ref<any>([])

async function onclickSearch() {
    Store.Instance.selectedRegion = selectorRefs.value[0].selected
    Store.Instance.selectedStreamType = selectorRefs.value[1].selected
    Store.Instance.selectedResolution = selectorRefs.value[2].selected

    const summaryRequest = SummaryRequest.Create(
        Store.Instance.selectedRegion,
        Store.Instance.selectedStreamType,
        Store.Instance.selectedResolution,
        Store.Instance.selectedRangeDate
    )

    const response = await HttpService.Instance.GetSummary(summaryRequest)
    summaryResponse.value = SummaryResponse.Parse(response)
}

onMounted(() => {
    onclickSearch()
})
</script>

<template>
    <HorizontalLayout>
        <SideContainer>
            <SummarySelector
                v-for="(data, index) in SELECTOR_LIST"
                :key="index"
                :options="data.options"
                :default="data.default"
                ref="selectorRefs"
            />

            <button class="search" @click="onclickSearch">搜尋</button>
            <SummaryCalendar />
        </SideContainer>

        <MainContainer>
            <SummaryHeader />
            <SummaryContent :summarys="summaryResponse.summarys" />
        </MainContainer>
    </HorizontalLayout>
</template>

<style scoped>
.search {
    position: relative;
    display: block;
    width: 250px;
    height: 35px;
    margin-top: 20px;
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
