<script setup lang="ts">
import DetailRequest from '@/typescripts/request/detail-request'
import HttpService from '@/typescripts/service/http-service'
import Store from '@/typescripts/store/store'

async function main() {
    const detailRequest = DetailRequest.Create(
        Store.Instance.selectedSummary,
        Store.Instance.selectedRangeDate
    )
    const detailsResponse = await HttpService.Instance.GetDetails(detailRequest)
    console.log('neroal:', detailsResponse)
}

main()
</script>

<template>
    <body></body>
</template>

<style scoped>
body {
    min-width: 720px;
}
</style>
