// 지도 초기화
var myChart = echarts.init(document.getElementById('map'));

// 한국 지도 데이터 불러오기
fetch('assets/json/koreaMap.json')
    .then(response => response.json())  // JSON 데이터를 파싱
    .then(geoJson => {
        // ECharts에 지도 데이터 등록
        echarts.registerMap('korea', geoJson);

        // 차트 옵션 설정
        var option = {
            tooltip: {
                trigger: 'item',  // 툴팁을 아이템(지역) 위에서 활성화
                formatter: function (params) {  // 툴팁에 표시할 내용 설정
                    return `${params.name}<br>평균 발전량: `; 
                    // 예시로 지역 이름, 값, 추가 설명을 표시
                }
            },
            series: [
                {
                    type: 'map',  // 차트 타입을 지도(map)으로 설정
                    map: 'korea',  // 등록된 한국 지도 데이터 사용
                    label: {
                        show: true,  // 지역 이름 라벨 표시 여부
                        fontSize: 16,  // 라벨의 폰트 크기
                        color: '#333'  // 라벨의 글자 색상
                    },
                    itemStyle: {
                        areaColor: '#cccccc',  // 기본 지역의 배경 색상
                        borderColor: '#333333'  // 지역 경계선 색상
                    },
                    emphasis: {  // 지역이 강조될 때의 스타일 설정
                        label: {
                            show: true,  // 강조된 지역의 라벨 표시 여부
                            fontSize: 19,  // 강조된 라벨의 폰트 크기
                            color: '#000'  // 강조된 라벨의 글자 색상
                        },
                    }
                }
            ]
        };

        // 설정한 옵션을 ECharts 인스턴스에 적용
        myChart.setOption(option);
    })



