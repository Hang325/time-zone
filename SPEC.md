# 時區轉換器專案規格文件

## 專案概述
這是一個基於網頁的時區轉換器應用程式，提供全球主要城市的時區轉換功能，並具有互動式地圖顯示。

## 技術架構

### 使用的技術和函式庫
- HTML5
- CSS3
- JavaScript (ES6+)
- Leaflet.js (地圖顯示)
- Luxon.js (時間處理)
- CartoDB (地圖主題)

### 檔案結構
```
time zone/
├── index.html      # 主要 HTML 結構
├── style.css       # 樣式表
├── script.js       # JavaScript 邏輯
└── SPEC.md         # 專案規格文件
```

## 核心功能

### 1. 多語言支援
- 支援的語言：繁體中文、英文、日文、韓文、法文、西班牙文、德文、俄文、泰文
- 語言切換使用 translations 對象進行管理
- 使用 data-i18n 屬性標記需要翻譯的元素

### 2. 地圖功能
- 使用 Leaflet.js 實現互動式世界地圖
- 地圖初始化位置：亞洲視角 [30, 100]
- 支援世界地圖循環顯示 (worldCopyJump)
- 自定義地圖標記和彈出視窗樣式
- 響應式設計：
  - 橫向：地圖固定在左側 (50% 寬度)
  - 直向：地圖位於頂部 (50vh 高度)

### 3. 時區轉換
- 使用 Luxon.js 處理時區轉換
- 支援 21 個主要城市的時區
- 時區分組：亞洲、歐洲、美洲、大洋洲
- 顯示格式：yyyy/MM/dd HH:mm:ss

### 4. 城市資料結構
```javascript
cityData = [
  {
    name: 'cityName',
    coords: [latitude, longitude],
    zone: 'Time/Zone'
  }
]
```

## 狀態管理

### 全域變數
- currentLang: 當前語言
- map: Leaflet 地圖實例
- markers: 地圖標記陣列
- markersByCity: 城市標記查找表

### 主要函數
1. changeLanguage(lang)
   - 更新介面語言
   - 更新地圖標記
   - 重新轉換時間（如果有）

2. initMap()
   - 初始化地圖
   - 設定地圖選項
   - 添加縮放控制
   - 初始化城市標記

3. updateMapMarkers(selectedTime)
   - 更新所有城市標記
   - 更新時間顯示
   - 處理標記彈出視窗

4. jumpToCity(cityName)
   - 地圖視角跳轉
   - 更新標記彈出視窗
   - 平滑滾動效果

5. convertTime()
   - 執行時區轉換
   - 更新地圖標記
   - 生成結果清單

## 響應式設計規則
```css
/* 直式/手機模式 */
@media (orientation: portrait), (max-width: 768px) {
  .map-section: 50vh
  .content-section: 下方延伸
}

/* 橫式/桌面模式 */
@media (orientation: landscape) and (min-width: 769px) {
  .map-section: 固定左側 50%
  .content-section: 右側 50%
}
```

## 初始化流程
1. 監聽 DOMContentLoaded 事件
2. 設定當前時間
3. 初始化地圖
4. 設定視窗大小改變監聽器
5. 更新地圖大小

## 已知問題和解決方案
1. 地圖顯示問題
   - 解決方案：確保 DOM 完全載入後初始化
   - 添加視窗大小改變事件監聽
   - 使用 map.invalidateSize() 處理地圖重繪

## 待優化項目
1. 效能優化
   - 考慮使用 Web Workers 處理時區計算
   - 實作地圖標記叢集
2. 功能擴展
   - 添加更多城市支援
   - 實作自定義時區
3. 使用者體驗
   - 添加動畫過渡效果
   - 優化移動端觸控支援