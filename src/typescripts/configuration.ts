const DEBUG: boolean = true

const STREAM_QUALITY_REPORT = {
    QUERY_INTERVAL: 600000, // 10mins
    SERVER_URL: DEBUG ? 'http://localhost:3000/stream-quality-report/' : 'http://10.20.30.228:3000/stream-quality-report/'
}

export const CONFIGURATION = {
    STREAM_QUALITY_REPORT: STREAM_QUALITY_REPORT
}
