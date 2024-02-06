<script setup lang="ts">
import SideContainer from '@/components/container/SideContainer.vue'
import HorizontalLayout from '@/components/layout/HorizontalLayout.vue'
import MainContainer from '@/components/container/MainContainer.vue'

import DetailRequest from '@/typescripts/request/detail-request'
import type DetailResponse from '@/typescripts/response/detail-response'
import HttpService from '@/typescripts/service/http-service'
import Store from '@/typescripts/store/store'
import { ref } from 'vue'

const detail = ref<DetailResponse>()

async function main() {
    const detailRequest = DetailRequest.Create(
        Store.Instance.selectedSummary,
        Store.Instance.selectedRangeDate
    )
    const detailResponse = await HttpService.Instance.GetDetails(detailRequest)
    detail.value = detailResponse
}

main()
</script>

<template>
    <HorizontalLayout>
        <SideContainer> </SideContainer>
        <MainContainer>{{ detail }}</MainContainer>
    </HorizontalLayout>

</template>

<style scoped></style>
