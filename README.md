# 架構
```
           +---------+
           |   Vue   |
           +----+----+
                |
                |API Requests
                |
         +------+------+
         | API Gateway |
         +------+------+
                |
                |Route Requests
                |
        +-------+-------+
        |  IndexRouter  |
        +---------------+
        |/              |
        |/detail        |
        +-------+-------+
                |
       +--------+--------+Lazy Initialization
       |                 |
+------+-------+ +-------+------+
| SummaryView  | |  DetailView  |
+------+-------+ +-------+------+
       |                 |
       +--------+--------+
                |
        +-------+-------+
        |  HttpService  |
        +---------------+
        |getSummary     |
        |getDetail      |
        |getVideo       |
        +---------------+
```
- SummaryView: 簡略資料介面。
- DetailView: 詳細資料介面。
- HttpService: 處理所有http相關請求。

# 組件說明
- container/
  - MainContainer.vue: 畫面右側容器。
  - SideContainer.vue: 畫面左側容器。
- layout/
  - HorizontalLayout.vue: 水平排列容器。
  - VerticalLayout.vue: 垂直排列容器。
- summary/
  - SummaryCalendar.vue: 日期選擇。
  - SummarySelector.vue: 下拉式選擇。
  - SummaryHeader.vue: 標題容器。
  - SummaryHeaderText.vue: 標題元素。
  - SummaryContent.vue: 內容容器。
  - SummaryCell.vue: 內容元素。
  - SummaryCellText.vue: 內容元素文字。
- detail/
  - DetailCard.vue: 資訊卡。
  - DetailChart.vue: 資訊圖表。
# 建置設定

```sh
npm install
```

## Compile and Hot-Reload for Development

```sh
npm run dev
```

## Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
