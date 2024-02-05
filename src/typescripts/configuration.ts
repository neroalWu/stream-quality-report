const DEBUG: boolean = true

const SERVER_URL = DEBUG
    ? 'http://localhost:3000/stream-quality-report/'
    : 'http://10.20.30.228:3000/stream-quality-report/'

const API = {
    GET_TOPIQ_DATA: `${SERVER_URL}get-topiq-data`,
    GET_IMAGE: `${SERVER_URL}get-image`
}

const CHART_CELL = {
    POINT_RADIUS_NORMAL: 4,
    POINT_RADIUS_HOVER: 6,

    NR_COLOR_NORMAL: 'rgba(255, 131, 122, 1)',
    FLIVE_COLOR_NORMAL: 'rgba(255, 192, 106, 1)',
    SPAQ_COLOR_NORMAL: 'rgba(181, 138, 255, 1)'
}

const RECORD_HEADER_LIST = [
    '協定',
    '桌號',
    'NR M',
    'NR SD',
    'FLIVE M',
    'FLIVE SD',
    'SPAQ M',
    'SPAQ SD'
]

export const CONFIGURATION = {
    QUERY_INTERVAL: 600000, // 10mins
    API: API,
    CHART_CELL: CHART_CELL,

    RECORD_HEADER_LIST: RECORD_HEADER_LIST
}
