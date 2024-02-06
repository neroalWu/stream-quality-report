<script setup lang="ts">
import DetailRequest from '@/typescripts/request/detail-request'
import type DetailResponse from '@/typescripts/response/detail-response';
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
    <body>{{ detail }}</body>
</template>

<style scoped>
body {
    min-width: 720px;
}
</style>
