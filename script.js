const DateTime = luxon.DateTime;

// 城市座標和時區資料，使用英文作為基準名稱
const cityData = [
    { name: 'taipei', coords: [25.0330, 121.5654], zone: 'Asia/Taipei' },
    { name: 'tokyo', coords: [35.6762, 139.6503], zone: 'Asia/Tokyo' },
    { name: 'seoul', coords: [37.5665, 126.9780], zone: 'Asia/Seoul' },
    { name: 'shanghai', coords: [31.2304, 121.4737], zone: 'Asia/Shanghai' },
    { name: 'hongkong', coords: [22.3193, 114.1694], zone: 'Asia/Hong_Kong' },
    { name: 'singapore', coords: [1.3521, 103.8198], zone: 'Asia/Singapore' },
    { name: 'bangkok', coords: [13.7563, 100.5018], zone: 'Asia/Bangkok' },
    { name: 'dubai', coords: [25.2048, 55.2708], zone: 'Asia/Dubai' },
    { name: 'london', coords: [51.5074, -0.1278], zone: 'Europe/London' },
    { name: 'paris', coords: [48.8566, 2.3522], zone: 'Europe/Paris' },
    { name: 'berlin', coords: [52.5200, 13.4050], zone: 'Europe/Berlin' },
    { name: 'rome', coords: [41.9028, 12.4964], zone: 'Europe/Rome' },
    { name: 'moscow', coords: [55.7558, 37.6173], zone: 'Europe/Moscow' },
    { name: 'newyork', coords: [40.7128, -74.0060], zone: 'America/New_York' },
    { name: 'losangeles', coords: [34.0522, -118.2437], zone: 'America/Los_Angeles' },
    { name: 'chicago', coords: [41.8781, -87.6298], zone: 'America/Chicago' },
    { name: 'vancouver', coords: [49.2827, -123.1207], zone: 'America/Vancouver' },
    { name: 'toronto', coords: [43.6532, -79.3832], zone: 'America/Toronto' },
    { name: 'sydney', coords: [-33.8688, 151.2093], zone: 'Australia/Sydney' },
    { name: 'melbourne', coords: [-37.8136, 144.9631], zone: 'Australia/Melbourne' },
    { name: 'auckland', coords: [-36.8509, 174.7645], zone: 'Pacific/Auckland' }
];

// 語言翻譯對照表
const translations = {
    'zh-TW': {
        title: '時區轉換器',
        inputTime: '輸入時間：',
        convert: '轉換',
        asia: '亞洲',
        europe: '歐洲',
        america: '美洲',
        oceania: '大洋洲',
        taipei: '臺北',
        tokyo: '東京',
        seoul: '首爾',
        shanghai: '上海',
        hongkong: '香港',
        singapore: '新加坡',
        bangkok: '曼谷',
        dubai: '杜拜',
        london: '倫敦',
        paris: '巴黎',
        berlin: '柏林',
        rome: '羅馬',
        moscow: '莫斯科',
        newyork: '紐約',
        losangeles: '洛杉磯',
        chicago: '芝加哥',
        vancouver: '溫哥華',
        toronto: '多倫多',
        sydney: '雪梨',
        melbourne: '墨爾本',
        auckland: '奧克蘭'
    },
    'en': {
        title: 'Time Zone Converter',
        inputTime: 'Input Time:',
        convert: 'Convert',
        asia: 'Asia',
        europe: 'Europe',
        america: 'America',
        oceania: 'Oceania',
        taipei: 'Taipei',
        tokyo: 'Tokyo',
        seoul: 'Seoul',
        shanghai: 'Shanghai',
        hongkong: 'Hong Kong',
        singapore: 'Singapore',
        bangkok: 'Bangkok',
        dubai: 'Dubai',
        london: 'London',
        paris: 'Paris',
        berlin: 'Berlin',
        rome: 'Rome',
        moscow: 'Moscow',
        newyork: 'New York',
        losangeles: 'Los Angeles',
        chicago: 'Chicago',
        vancouver: 'Vancouver',
        toronto: 'Toronto',
        sydney: 'Sydney',
        melbourne: 'Melbourne',
        auckland: 'Auckland'
    },
    'ja': {
        title: '時区コンバーター',
        inputTime: '時間入力：',
        convert: '変換',
        asia: 'アジア',
        europe: 'ヨーロッパ',
        america: 'アメリカ',
        oceania: 'オセアニア',
        taipei: '台北',
        tokyo: '東京',
        seoul: 'ソウル',
        shanghai: '上海',
        hongkong: '香港',
        singapore: 'シンガポール',
        bangkok: 'バンコク',
        dubai: 'ドバイ',
        london: 'ロンドン',
        paris: 'パリ',
        berlin: 'ベルリン',
        rome: 'ローマ',
        moscow: 'モスクワ',
        newyork: 'ニューヨーク',
        losangeles: 'ロサンゼルス',
        chicago: 'シカゴ',
        vancouver: 'バンクーバー',
        toronto: 'トロント',
        sydney: 'シドニー',
        melbourne: 'メルボルン',
        auckland: 'オークランド'
    },
    'ko': {
        title: '시간대 변환기',
        inputTime: '시간 입력:',
        convert: '변환',
        asia: '아시아',
        europe: '유럽',
        america: '아메리카',
        oceania: '오세아니아',
        taipei: '타이페이',
        tokyo: '도쿄',
        seoul: '서울',
        shanghai: '상하이',
        hongkong: '홍콩',
        singapore: '싱가포르',
        bangkok: '방콕',
        dubai: '두바이',
        london: '런던',
        paris: '파리',
        berlin: '베를린',
        rome: '로마',
        moscow: '모스크바',
        newyork: '뉴욕',
        losangeles: '로스앤젤레스',
        chicago: '시카고',
        vancouver: '밴쿠버',
        toronto: '토론토',
        sydney: '시드니',
        melbourne: '멜버른',
        auckland: '오클랜드'
    },
    'fr': {
        title: 'Convertisseur de Fuseaux Horaires',
        inputTime: 'Heure d\'entrée:',
        convert: 'Convertir',
        asia: 'Asie',
        europe: 'Europe',
        america: 'Amérique',
        oceania: 'Océanie',
        taipei: 'Taipei',
        tokyo: 'Tokyo',
        seoul: 'Séoul',
        shanghai: 'Shanghai',
        hongkong: 'Hong Kong',
        singapore: 'Singapour',
        bangkok: 'Bangkok',
        dubai: 'Dubaï',
        london: 'Londres',
        paris: 'Paris',
        berlin: 'Berlin',
        rome: 'Rome',
        moscow: 'Moscou',
        newyork: 'New York',
        losangeles: 'Los Angeles',
        chicago: 'Chicago',
        vancouver: 'Vancouver',
        toronto: 'Toronto',
        sydney: 'Sydney',
        melbourne: 'Melbourne',
        auckland: 'Auckland'
    },
    'es': {
        title: 'Conversor de Zonas Horarias',
        inputTime: 'Hora de entrada:',
        convert: 'Convertir',
        asia: 'Asia',
        europe: 'Europa',
        america: 'América',
        oceania: 'Oceanía',
        taipei: 'Taipéi',
        tokyo: 'Tokio',
        seoul: 'Seúl',
        shanghai: 'Shanghái',
        hongkong: 'Hong Kong',
        singapore: 'Singapur',
        bangkok: 'Bangkok',
        dubai: 'Dubái',
        london: 'Londres',
        paris: 'París',
        berlin: 'Berlín',
        rome: 'Roma',
        moscow: 'Moscú',
        newyork: 'Nueva York',
        losangeles: 'Los Ángeles',
        chicago: 'Chicago',
        vancouver: 'Vancouver',
        toronto: 'Toronto',
        sydney: 'Sídney',
        melbourne: 'Melbourne',
        auckland: 'Auckland'
    },
    'de': {
        title: 'Zeitzonen-Umrechner',
        inputTime: 'Eingabezeit:',
        convert: 'Umrechnen',
        asia: 'Asien',
        europe: 'Europa',
        america: 'Amerika',
        oceania: 'Ozeanien',
        taipei: 'Taipeh',
        tokyo: 'Tokio',
        seoul: 'Seoul',
        shanghai: 'Shanghai',
        hongkong: 'Hongkong',
        singapore: 'Singapur',
        bangkok: 'Bangkok',
        dubai: 'Dubai',
        london: 'London',
        paris: 'Paris',
        berlin: 'Berlin',
        rome: 'Rom',
        moscow: 'Moskau',
        newyork: 'New York',
        losangeles: 'Los Angeles',
        chicago: 'Chicago',
        vancouver: 'Vancouver',
        toronto: 'Toronto',
        sydney: 'Sydney',
        melbourne: 'Melbourne',
        auckland: 'Auckland'
    },
    'ru': {
        title: 'Конвертер часовых поясов',
        inputTime: 'Время ввода:',
        convert: 'Конвертировать',
        asia: 'Азия',
        europe: 'Европа',
        america: 'Америка',
        oceania: 'Океания',
        taipei: 'Тайбэй',
        tokyo: 'Токио',
        seoul: 'Сеул',
        shanghai: 'Шанхай',
        hongkong: 'Гонконг',
        singapore: 'Сингапур',
        bangkok: 'Бангкок',
        dubai: 'Дубай',
        london: 'Лондон',
        paris: 'Париж',
        berlin: 'Берлин',
        rome: 'Рим',
        moscow: 'Москва',
        newyork: 'Нью-Йорк',
        losangeles: 'Лос-Анджелес',
        chicago: 'Чикаго',
        vancouver: 'Ванкувер',
        toronto: 'Торонто',
        sydney: 'Сидней',
        melbourne: 'Мельбурн',
        auckland: 'Окленд'
    },
    'th': {
        title: 'เครื่องมือแปลงเขตเวลา',
        inputTime: 'เวลาที่ป้อน:',
        convert: 'แปลง',
        asia: 'เอเชีย',
        europe: 'ยุโรป',
        america: 'อเมริกา',
        oceania: 'โอเชียเนีย',
        taipei: 'ไทเป',
        tokyo: 'โตเกียว',
        seoul: 'โซล',
        shanghai: 'เซี่ยงไฮ้',
        hongkong: 'ฮ่องกง',
        singapore: 'สิงคโปร์',
        bangkok: 'กรุงเทพ',
        dubai: 'ดูไบ',
        london: 'ลอนดอน',
        paris: 'ปารีส',
        berlin: 'เบอร์ลิน',
        rome: 'โรม',
        moscow: 'มอสโก',
        newyork: 'นิวยอร์ก',
        losangeles: 'ลอสแอนเจลิส',
        chicago: 'ชิคาโก',
        vancouver: 'แวนคูเวอร์',
        toronto: 'โตรอนโต',
        sydney: 'ซิดนีย์',
        melbourne: 'เมลเบิร์น',
        auckland: 'โอ๊คแลนด์'
    }
};

// 當前語言
let currentLang = 'zh-TW';

// 變更語言函數
function changeLanguage(lang) {
    currentLang = lang;
    
    // 更新語言按鈕狀態
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // 更新所有帶有 data-i18n 屬性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'OPTGROUP') {
                element.label = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // 如果有選擇時間，就更新所有城市標記和結果
    const sourceTime = document.getElementById('sourceTime').value;
    if (sourceTime) {
        convertTime();
    } else {
        // 如果沒有選擇時間，就只更新標記的城市名稱
        updateMapMarkers();
    }
}

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
        html: `<div class="marker-container">
                <div class="marker-pin"></div>
              </div>`,
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -35]
    });

    // 為每個城市添加標記
    cityData.forEach(city => {
        const cityTime = sourceTime.setZone(city.zone);
        const marker = L.marker(city.coords, {
            icon: customIcon
        }).addTo(map);

        // 使用翻譯取得城市名稱
        const translatedCityName = translations[currentLang][city.name];
        
        const popupContent = `
            <div class="map-marker">
                <strong>${translatedCityName}</strong><br>
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
            behavior: 'smooth'
        });
        
        // 設定一個小延遲再移動地圖，確保滾動完成
        setTimeout(() => {
            map.setView(marker.getLatLng(), 6);
            
            // 找到對應的城市資料
            const city = cityData.find(c => c.name === cityName);
            if (city) {
                // 使用翻譯取得城市名稱
                const translatedCityName = translations[currentLang][city.name];
                const time = DateTime.now().setZone(city.zone);
                
                const popupContent = `
                    <div class="map-marker">
                        <strong>${translatedCityName}</strong><br>
                        ${time.toFormat('yyyy/MM/dd HH:mm:ss')}
                        <div class="timezone">${time.toFormat('ZZZZ')}</div>
                    </div>
                `;
                
                marker.setPopupContent(popupContent);
                marker.openPopup();
            }
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
        alert(currentLang === 'zh-TW' ? '請輸入時間！' : 
              currentLang === 'en' ? 'Please input time!' : '時間を入力してください！');
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
        'Asia': 'asia',
        'Europe': 'europe',
        'America': 'america',
        'Australia': 'oceania',
        'Pacific': 'oceania'
    };

    // 依照地區分組顯示結果
    Object.keys(regions).forEach(region => {
        const zonesInRegion = cityData.filter(city => city.zone.startsWith(region));
        if (zonesInRegion.length > 0) {
            resultsHTML += `<div class="region-group">
                <h3>${translations[currentLang][regions[region]]}</h3>
                ${zonesInRegion.map(city => {
                    const converted = dt.setZone(city.zone);
                    const translatedCityName = translations[currentLang][city.name];
                    return `<div class="result-item" onclick="jumpToCity('${city.name}')" style="cursor: pointer;">
                        ${translatedCityName}: ${converted.toFormat('yyyy/MM/dd HH:mm:ss')}
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
document.addEventListener('DOMContentLoaded', function() {
    setDefaultTime();
    initMap();
    
    // 監聽視窗大小改變事件
    window.addEventListener('resize', function() {
        if (map) {
            map.invalidateSize();
        }
    });
});