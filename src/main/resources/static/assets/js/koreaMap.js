var myChart = echarts.init(document.getElementById('map'));

fetch('assets/json/koreaMap.json')
    .then(response => response.json())
    .then(geoJson => {
        echarts.registerMap('myMap', geoJson);

        var option = {
            series: [{
                type: 'map',
                map: 'myMap',
                label: {
                    show: true
                },
                itemStyle: {
                    areaColor: '#cccccc',
                    borderColor: '#333333'
                }
            }]
        };

        myChart.setOption(option);

        // 마우스 클릭 이벤트 처리
        myChart.on('click', function (params) {
            if (params.componentType === 'series') {
                console.log(params);  // 클릭된 정보가 콘솔에 출력되는지 확인
                // 모달창 내용을 동적으로 생성
                var content = `<div>
                    <h3>${params.name}</h3>
                    <p>이곳에 ${params.name}에 대한 정보를 입력하세요.</p>
                </div>`;
                
                // 모달창 생성
                showModal(content, params.event.event.clientX, params.event.event.clientY);
            }
        });
    });

function showModal(content, x, y) {
    // 기존 모달이 있을 경우 제거
    var existingModal = document.getElementById('chart-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // 모달 요소 생성
    var modal = document.createElement('div');
    modal.id = 'chart-modal';
    modal.style.position = 'absolute';
    modal.style.left = x + 'px';
    modal.style.top = y + 'px';
    modal.style.backgroundColor = 'white';
    modal.style.border = '1px solid #333';
    modal.style.padding = '10px';
    modal.style.zIndex = '1000';  // 모달이 다른 요소 위에 나타나도록 설정
    modal.innerHTML = content;

    document.body.appendChild(modal);
}

// 모달 창 외부 클릭 시 모달을 제거하는 이벤트
document.addEventListener('click', function (event) {
    var modal = document.getElementById('chart-modal');
    if (modal && !modal.contains(event.target) && event.target !== myChart.getDom()) {
        modal.remove();
    }
});
