<script setup lang="ts">
import HttpService from '@/typescripts/http-service'
import StreamQualityReportResponse from '@/typescripts/stream-quality-report/struct/response'
import { reactive } from 'vue'

let reactiveResponse: StreamQualityReportResponse = reactive(new StreamQualityReportResponse())

async function test() {
    const response: StreamQualityReportResponse = await HttpService.Instance.GetAll()
    reactiveResponse.list = response.list
}

test()
</script>

<template>
    <main>
        <ul>
            <li v-for="element in reactiveResponse.list" :key="element._id">
                {{ element }}
            </li>
        </ul>
    </main>
</template>
