$(document).ready(function() {
    // 탭 버튼 클릭 시 해당 탭 내용만 표시
    $('.tab-button').on('click', function() {
        var target = $(this).attr('onclick').split("'")[1];
        $('.tab-content').removeClass('active');
        $('#' + target).addClass('active');
        $('.tab-button').removeClass('active');
        $(this).addClass('active');

        // 각 탭에 따른 차트 렌더링
        if (target === 'generation') {
            fetchGenerationData();
        } else if (target === 'weather') {
            fetchWeatherData();
        }
    });

    // 발전소 카드 클릭 시 색상 변경
    $('.plant-card').on('click', function() {
        $('.plant-card').removeClass('active');
        $(this).addClass('active');
    });

    // CSV 다운로드 버튼 클릭 시 CSV 생성 및 다운로드
    $("#excelDownload").click(function() {
        let filename = "generation_data.csv";
        getCSV(filename);
    });

    function getCSV(filename) {
        var csv = [];
        var row = [];

        // 테이블 헤더
        row.push("시간", "오늘 발전량 (kW)", "오늘 누적 발전량 (kW)", "오늘 일사량 (W/m²)",
                 "오늘 기온 (°C)", "오늘 풍속 (m/s)", "시간", "내일 발전량 (kW)",
                 "내일 누적 발전량 (kW)", "내일 일사량 (W/m²)", "내일 기온 (°C)",
                 "내일 풍속 (m/s)");
        csv.push(row.join(","));

        // 테이블 데이터
        $('#data-table tbody tr').each(function() {
            row = [];
            $(this).find('td').each(function() {
                row.push($(this).text().trim());
            });
            csv.push(row.join(","));
        });

        downloadCSV(csv.join("\n"), filename);
    }

    function downloadCSV(csv, filename) {
        var csvFile;
        var downloadLink;

        // 한글 처리를 위해 BOM 추가
        const BOM = "\uFEFF";
        csv = BOM + csv;

        csvFile = new Blob([csv], { type: "text/csv" });
        downloadLink = document.createElement("a");
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    // 모달 관련 코드
    var modal = document.getElementById("plant-modal");
    var btn = document.querySelector(".add-plant");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // 발전량 및 기상 데이터를 가져와서 테이블 및 차트 업데이트
    $('#wd').on('click', function() {
        fetchWeatherData();
    });

    $('#pd').on('click', function() {
        fetchGenerationData();
    });

    // 발전량 데이터 가져오기 및 렌더링 함수
    function fetchGenerationData() {
        $.ajax({
            url: 'dataTable', // 데이터를 가져올 API 엔드포인트
            type: 'get', // GET 요청 방식 사용
            success: function(res) {
                let data = res;

                // 모든 데이터를 그대로 사용
                let hours = data.map(item => item.hour);
                let todayPowerGeneration = data.map(item => item.powerGeneration.toFixed(2));
                let cumulativePower = data.map(item => item.cumulativePower.toFixed(2));
                let solarRadiation = data.map(item => item.solarRadiation.toFixed(2));
                let temperatures = data.map(item => item.temperature.toFixed(2));
                let windSpeeds = data.map(item => item.windSpeed.toFixed(2));

                // ECharts 초기화 및 옵션 설정
                var chartToday = echarts.init(document.getElementById('chart-container-today'));

                var optionToday = {
                    legend: {
                        data: ['발전량', '누적 발전량', '일사량', '기온', '풍속']
                    },
                    xAxis: {
                        type: 'category',
                        data: hours,
                        axisLabel: {
                            formatter: function(value) {
                                // 짝수 시간만 출력
                                return value % 2 === 0 ? value : '';
                            }
                        }
                    },
                    yAxis: [{
                        type: 'value',
                        name: '발전량 (kW)',
                        position: 'left',
                    }, {
                        type: 'value',
                        name: '기상 데이터',
                        position: 'right',
                    }],
                    series: [
                        {
                            name: '발전량',
                            data: todayPowerGeneration,
                            type: 'line',
                            smooth: true,
                            yAxisIndex: 0
                        },
                        {
                            name: '누적 발전량',
                            data: cumulativePower,
                            type: 'line',
                            smooth: true,
                            yAxisIndex: 0
                        },
                        {
                            name: '일사량',
                            data: solarRadiation,
                            type: 'line',
                            smooth: true,
                            yAxisIndex: 1
                        },
                        {
                            name: '기온',
                            data: temperatures,
                            type: 'line',
                            smooth: true,
                            yAxisIndex: 1
                        },
                        {
                            name: '풍속',
                            data: windSpeeds,
                            type: 'line',
                            smooth: true,
                            yAxisIndex: 1
                        }
                    ]
                };

                // 차트에 옵션 적용
                chartToday.setOption(optionToday);

                // 발전량 테이블 생성
                let tableBody = $('#data-table tbody');
                tableBody.empty(); // 이전 내용 제거

                data.forEach(item => {
                    let tr = '<tr class="hover-effect">';
                    tr += '<td class="custom-background">' + item.hour + '</td>';
                    tr += '<td>' + item.powerGeneration.toFixed(2) + '</td>';
                    tr += '<td>' + item.cumulativePower.toFixed(2) + '</td>';
                    tr += '<td>' + item.solarRadiation.toFixed(2) + '</td>';
                    tr += '<td>' + item.temperature.toFixed(2) + '</td>';
                    tr += '<td>' + item.windSpeed.toFixed(2) + '</td>';
                    tr += '<td class="custom-background">' + item.hour + '</td>';
                    tr += '<td>' + item.tm_pg.toFixed(2) + '</td>';
                    tr += '<td>' + item.tm_cp.toFixed(2) + '</td>';
                    tr += '<td>' + item.tm_s.toFixed(2) + '</td>';
                    tr += '<td>' + item.tm_tme.toFixed(2) + '</td>';
                    tr += '<td>' + item.tm_w.toFixed(2) + '</td>';
                    tr += '</tr>';
                    tableBody.append(tr);
                });
            },
            error: function(e) {
                console.log("Error: ", e);
            }
        });
    }

    // 기상 데이터 가져오기 및 렌더링 함수
    function fetchWeatherData() {
        $.ajax({
            url: 'dataTable', // 데이터를 가져올 API 엔드포인트
            type: 'get', // GET 요청 방식 사용
            success: function(res) {
                renderWeatherData(res, 'today');
                renderWeatherData(res, 'tomorrow');
            },
            error: function(e) {
                console.error("Error: ", e);
            }
        });
    }

    // 기상 데이터 렌더링 함수
    function renderWeatherData(data, type) {
        // 데이터 준비
        let hours = data.map(item => item.hour);
        let solarRadiation, temperatures, windSpeeds;

        if (type === 'today') {
            solarRadiation = data.map(item => item.solarRadiation.toFixed(2));
            temperatures = data.map(item => item.temperature.toFixed(2));
            windSpeeds = data.map(item => item.windSpeed.toFixed(2));
        } else if (type === 'tomorrow') {
            solarRadiation = data.map(item => item.tm_s.toFixed(2));
            temperatures = data.map(item => item.tm_tme.toFixed(2));
            windSpeeds = data.map(item => item.tm_w.toFixed(2));
        }

        // 차트 ID 설정
        let chartId = type === 'today' ? 'chart-container-weather-today' : 'chart-container-weather-tomorrow';
        var chartWeather = echarts.init(document.getElementById(chartId));
        
        var optionWeather = {
            legend: {
                data: ['일사량', '기온', '풍속']
            },
            xAxis: {
                type: 'category',
                data: hours,
                axisLabel: {
                    formatter: function(value) {
                        return value % 2 === 0 ? value : '';
                    }
                }
            },
            yAxis: [{
                type: 'value',
                name: '일사량 (W/m²)',
                position: 'left',
            }, {
                type: 'value',
                name: '기온 (°C) / 풍속 (m/s)',
                position: 'right',
            }],
            series: [
                {
                    name: '일사량',
                    data: solarRadiation,
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 0,
                    itemStyle: {
                        color: '#FFC107'
                    }
                },
                {
                    name: '기온',
                    data: temperatures,
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                    itemStyle: {
                        color: '#FF5722'
                    }
                },
                {
                    name: '풍속',
                    data: windSpeeds,
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                    itemStyle: {
                        color: '#03A9F4'
                    }
                }
            ]
        };

        // 차트에 옵션 적용
        chartWeather.setOption(optionWeather);

        // 테이블 ID 설정
        let tableId = type === 'today' ? '#weather-data-table tbody' : '#weather-data-table-tomorrow tbody';
        renderWeatherTable(tableId, data, type);
    }

    // 테이블 렌더링 함수
    function renderWeatherTable(tableSelector, data, type) {
        let tableBody = $(tableSelector);
        tableBody.empty(); // 이전 내용 제거

        data.forEach(item => {
            let tr = '<tr>';
            tr += '<td>' + item.hour + '</td>';
            if (type === 'today') {
                tr += '<td>' + item.solarRadiation.toFixed(2) + '</td>';
                tr += '<td>' + item.temperature.toFixed(2) + '</td>';
                tr += '<td>' + item.windSpeed.toFixed(2) + '</td>';
                tr += '<td>' + item.humid.toFixed(0) + '</td>';
                tr += '<td>' + item.pres.toFixed(1) + '</td>';
            } else if (type === 'tomorrow') {
                tr += '<td>' + item.tm_s.toFixed(2) + '</td>';
                tr += '<td>' + item.tm_tme.toFixed(2) + '</td>';
                tr += '<td>' + item.tm_w.toFixed(2) + '</td>';
                tr += '<td>' + item.tm_humid.toFixed(0) + '</td>';
                tr += '<td>' + item.tm_pres.toFixed(1) + '</td>';
            }
            tr += '</tr>';
            tableBody.append(tr);
        });
    }

    // 두 번째 데이터 요청 및 테이블 업데이트 (기상 데이터)
	$('#wd').on('click', function() {
		req();
	});

	function req() {
		$.ajax({
			url: 'dataTable', // 기상 데이터를 가져올 API 엔드포인트
			type: 'get',
			data: {},
			success: function(res) {
				let data = res;

				// 기존 테이블 내용 비우기
				$('#weather-data-table tbody').empty();

				// 기상 데이터 테이블 생성
				for (let i = 0; i < data.length; i++) {
					let tr = '<tr>';
					tr += '<td>' + data[i].hour + '</td>';
					tr += '<td>' + data[i].solarRadiation.toFixed(2) + '</td>';
					tr += '<td>' + data[i].temperature.toFixed(2) + '</td>';
					tr += '<td>' + data[i].windSpeed.toFixed(2) + '</td>';
					tr += '<td>' + data[i].humid.toFixed(0) + '</td>';
					tr += '<td>' + data[i].pres.toFixed(1) + '</td>';
					tr += '<td>' + data[i].hour + '</td>';
					tr += '<td>' + data[i].tm_s.toFixed(2) + '</td>';
					tr += '<td>' + data[i].tm_tme.toFixed(2) + '</td>';
					tr += '<td>' + data[i].tm_w.toFixed(2) + '</td>';
					tr += '<td>' + data[i].tm_humid.toFixed(0) + '</td>';
					tr += '<td>' + data[i].tm_pres.toFixed(1) + '</td>';
					tr += '</tr>';

					$('#weather-data-table tbody').append(tr);
				}
			},
			error: function(e) {
				console.log("error");
			}
		});
	}
});
