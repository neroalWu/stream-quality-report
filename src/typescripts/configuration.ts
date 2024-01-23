const STREAM_QUALITY_REPORT = {
    API_URI: 'https://www.google.com',

    CEBU: {
        RTMP: {
            SERVER_URL: 'http://10.20.30.130:8000/rtmp/calculate_topiq',
            STREAM_URL: 'rtmp://10.22.1.201/cb/',
            CHANNELS: ['BTCB02', 'BTCB02m', 'BTCB03', 'BTCB03m']
        },
        FLV: {
            SERVER_URL: 'http://10.20.30.130:8000/flv/calculate_topiq',
            STREAM_URL: '',
            CHANNELS: []
        }
    }
}

export const CONFIGURATION = {
    STREAM_QUALITY_REPORT: STREAM_QUALITY_REPORT
}
