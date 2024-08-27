// 지도와 차트 초기화
var myChart = echarts.init(document.getElementById('map'));
var barChart = echarts.init(document.getElementById('chart'));

// 공공 데이터 API 요청 URL 구성
const serviceKey = '06cyzf6guv7ilUPsGDmEtXKdhoSZxQ0G1KTqwkJ%2B6vIs4gP18GLgpbIeXNVwsgTFKOMbbFdtyYWk1VYnoCtt7Q%3D%3D';
const pageNo = 700;
const perPage = 700; // 요청할 데이터 개수
const returnType = 'JSON';  // JSON 데이터 반환

// API 요청을 위한 엔드포인트 URL
const apiUrl = `https://api.odcloud.kr/api/15065269/v1/uddi:ce8e9486-0b70-46af-8319-9108bef9d8b1?page=${pageNo}&perPage=${perPage}&returnType=${returnType}&serviceKey=${serviceKey}`;

// 지역 이름 매핑
const regionMapping = {
    '강원도': '강원',
    '경기도': '경기',
    '경상남도': '경남',
    '경상북도': '경북',
    '광주시': '광주',
    '대구시': '대구',
    '대전시': '대전',
    '부산시': '부산',
    '서울시': '서울',
    '세종시': '세종',
    '울산시': '울산',
    '인천시': '인천',
    '전라남도': '전남',
    '전라북도': '전북',
    '제주도': '제주도',
    '충청남도': '충남',
    '충청북도': '충북'
};

// 한국 지도 데이터 불러오기
fetch('assets/json/koreaMap.json')
    .then(response => response.json())
    .then(geoJson => {
        echarts.registerMap('korea', geoJson);

        // 초기 지도 옵션 설정
        var mapOption = {
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    const avgPower = avgPowerData[regionMapping[params.name]] || 0;
                    return `${params.name}<br>평균 발전량: ${avgPower.toFixed(2)} MWh`; // 14시 발전량 표시
                }
            },
            series: [
                {
                    type: 'map',
                    map: 'korea',
                    label: {
                        show: true
                    },
                    itemStyle: {
                        areaColor: '#cccccc',
                        borderColor: '#333333'
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                }
            ]
        };

        myChart.setOption(mapOption);

        // 지역 클릭 이벤트 리스너 추가
        myChart.on('click', function(params) {
            var regionName = params.name;
            updateBarChart(regionName);
            scrollToChart();  // 차트로 스크롤
        });

        // 공공 데이터 API 요청
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                processApiData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    })
    .catch(error => {
        console.error('Error loading map data:', error);
    });

// 데이터 처리 함수
let regionData = {};
let avgPowerData = {};

// 데이터 처리 함수
function processApiData(data) {
    const items = data.data;  // JSON 구조에 맞게 'data' 필드 사용
    regionData = {}; // 데이터 초기화
    avgPowerData = {}; // 평균 발전량 데이터 초기화

    items.forEach(item => {
        console.log('Processing item:', item);  // 각 항목을 출력하여 디버그

        // 지역 이름을 매핑된 이름으로 변환
        const regionName = regionMapping[item.지역.trim()] || item.지역.trim(); // 매핑되지 않은 경우 원래 이름 사용

        if (!regionData[regionName]) {
            regionData[regionName] = Array(24).fill(0); // 24시간 데이터 초기화
        }
        // 시간에 맞게 인덱스를 찾고 태양광 발전량을 배열에 저장
        const hour = parseInt(item.거래시간, 10) - 1; // 거래시간을 인덱스로 변환 (1~24 시간)
        if (hour >= 0 && hour < 24) {
            // 문자열로 되어 있는 발전량을 숫자로 변환하고 kWh에서 MWh로 변환 (kWh / 1000 = MWh)
            const solarPower = (parseFloat(item.발전량) / 1000 || 0).toFixed(2); // kWh를 MWh로 변환 후 소수점 2자리까지 제한
            regionData[regionName][hour] = parseFloat(solarPower); // 다시 숫자로 변환
        }

        // 14시의 발전량을 평균 발전량 데이터에 저장
        if (hour === 13) { // 14시의 데이터는 인덱스 13에 저장됨
            avgPowerData[regionName] = (parseFloat(item.발전량) / 1000 || 0).toFixed(2);
        }
    });

    // 지역별 데이터를 출력 (디버깅용)
    console.log('Region Data:', regionData);
    console.log('Average Power Data:', avgPowerData);
}

// 차트 업데이트 함수
function updateBarChart(regionName) {
    console.log('Updating chart for region:', regionName);
    console.log('Data for region:', regionData[regionName]);

    const hours = ['1시', '2시', '3시', '4시', '5시', '6시', '7시', '8시', '9시', '10시', '11시', '12시', 
        '13시', '14시', '15시', '16시', '17시', '18시', '19시', '20시', '21시', '22시', '23시', '24시'];

    const barOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: hours,
                axisTick: {
                    alignWithLabel: true
                },
                name: '시간', // x축 이름을 '시간'으로 설정
                nameLocation: 'middle',
                nameGap: 25
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '태양광발전량(MWh)', // y축 이름을 '태양광발전량(MWh)'으로 설정
                nameLocation: 'middle',
                nameGap: 40
            }
        ],
        series: [
            {
                name: regionName,
                type: 'bar',
                barWidth: '60%',
                data: regionData[regionName] || Array(hours.length).fill(0) // 데이터가 없는 경우 빈 데이터 사용
            }
        ]
    };

    barChart.setOption(barOption);
}

// 페이지 아래로 스크롤하는 함수
function scrollToChart() {
    document.querySelector('#chart').scrollIntoView({ behavior: 'smooth' });
}
