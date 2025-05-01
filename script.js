const DateTime = luxon.DateTime;

// 城市座標和時區資料
const cityData = [
    { name: '臺北', coords: [25.0330, 121.5654], zone: 'Asia/Taipei' },
    { name: '東京', coords: [35.6762, 139.6503], zone: 'Asia/Tokyo' },
    { name: '首爾', coords: [37.5665, 126.9780], zone: 'Asia/Seoul' },
    { name: '上海', coords: [31.2304, 121.4737], zone: 'Asia/Shanghai' },
    { name: '香港', coords: [22.3193, 114.1694], zone: 'Asia/Hong_Kong' },
    { name: '新加坡', coords: [1.3521, 103.8198], zone: 'Asia/Singapore' },
    { name: '曼谷', coords: [13.7563, 100.5018], zone: 'Asia/Bangkok' },
    { name: '杜拜', coords: [25.2048, 55.2708], zone: 'Asia/Dubai' },
    { name: '倫敦', coords: [51.5074, -0.1278], zone: 'Europe/London' },
    { name: '巴黎', coords: [48.8566, 2.3522], zone: 'Europe/Paris' },
    { name: '柏林', coords: [52.5200, 13.4050], zone: 'Europe/Berlin' },
    { name: '羅馬', coords: [41.9028, 12.4964], zone: 'Europe/Rome' },
    { name: '莫斯科', coords: [55.7558, 37.6173], zone: 'Europe/Moscow' },
    { name: '紐約', coords: [40.7128, -74.0060], zone: 'America/New_York' },
    { name: '洛杉磯', coords: [34.0522, -118.2437], zone: 'America/Los_Angeles' },
    { name: '芝加哥', coords: [41.8781, -87.6298], zone: 'America/Chicago' },
    { name: '溫哥華', coords: [49.2827, -123.1207], zone: 'America/Vancouver' },
    { name: '多倫多', coords: [43.6532, -79.3832], zone: 'America/Toronto' },
    { name: '雪梨', coords: [-33.8688, 151.2093], zone: 'Australia/Sydney' },
    { name: '墨爾本', coords: [-37.8136, 144.9631], zone: 'Australia/Melbourne' },
    { name: '奧克蘭', coords: [-36.8509, 174.7645], zone: 'Pacific/Auckland' }
];

// 初始化地圖
let map;
let markers = [];

function initMap() {
    // 建立地圖，中心設在亞洲
    map = L.map('map', {
        worldCopyJump: true,
        zoomControl: false
    }).setView([30, 100], 2);
    
    // 使用 CartoDB 的明亮主題地圖
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // 將縮放控制器加到右上角
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // 初始化所有城市標記
    updateMapMarkers();
}

function updateMapMarkers(selectedTime = null) {
    // 清除現有標記
    markers.forEach(marker => marker.remove());
    markers = [];

    // 取得當前選擇的時間或使用現在時間
    const sourceTime = selectedTime || DateTime.now();

    // 建立標記查找表
    window.markersByCity = {};

    // 自定義標記圖示
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pulse"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    // 為每個城市添加標記
    cityData.forEach(city => {
        const cityTime = sourceTime.setZone(city.zone);
        const marker = L.marker(city.coords, {
            icon: customIcon
        }).addTo(map);
        
        const popupContent = `
            <div class="map-marker">
                <strong>${city.name}</strong><br>
                ${cityTime.toFormat('yyyy/MM/dd HH:mm:ss')}
                <div class="timezone">${cityTime.toFormat('ZZZZ')}</div>
            </div>
        `;
        
        const popup = L.popup({
            className: 'custom-popup',
            offset: [0, -10]
        }).setContent(popupContent);
        
        marker.bindPopup(popup);
        markers.push(marker);
        window.markersByCity[city.name] = marker;
    });
}

// 跳轉到指定城市的函數
function jumpToCity(cityName) {
    const marker = window.markersByCity[cityName];
    if (marker) {
        // 先滾動到頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // 使用平滑滾動效果
        });
        
        // 設定一個小延遲再移動地圖，確保滾動完成
        setTimeout(() => {
            map.setView(marker.getLatLng(), 6);
            marker.openPopup();
        }, 500);
    }
}

// 設定預設時間為當前時間
function setDefaultTime() {
    const now = DateTime.now();
    const formatted = now.toFormat("yyyy-MM-dd'T'HH:mm");
    document.getElementById('sourceTime').value = formatted;
}

// 時區轉換函數
function convertTime() {
    const sourceTime = document.getElementById('sourceTime').value;
    const sourceZone = document.getElementById('sourceZone').value;
    
    if (!sourceTime) {
        alert('請輸入時間！');
        return;
    }

    // 建立指定時區的日期時間物件
    const dt = DateTime.fromISO(sourceTime, { zone: sourceZone });
    
    // 更新地圖上的標記
    updateMapMarkers(dt);
    
    // 產生轉換結果的 HTML，並依照地區分組
    let resultsHTML = '';
    
    // 建立地區分組
    const regions = {
        'Asia': '亞洲',
        'Europe': '歐洲',
        'America': '美洲',
        'Australia': '大洋洲',
        'Pacific': '大洋洲'
    };

    // 依照地區分組顯示結果
    Object.keys(regions).forEach(region => {
        const zonesInRegion = cityData.filter(city => city.zone.startsWith(region));
        if (zonesInRegion.length > 0) {
            resultsHTML += `<div class="region-group">
                <h3>${regions[region]}</h3>
                ${zonesInRegion.map(city => {
                    const converted = dt.setZone(city.zone);
                    return `<div class="result-item" onclick="jumpToCity('${city.name}')" style="cursor: pointer;">
                        ${city.name}: ${converted.toFormat('yyyy/MM/dd HH:mm:ss')}
                        (${converted.toFormat('ZZZZ')})
                    </div>`;
                }).join('')}
            </div>`;
        }
    });

    // 顯示結果
    document.getElementById('results').innerHTML = resultsHTML;
}

// 頁面載入時初始化
window.onload = function() {
    setDefaultTime();
    initMap();
};