$(document).ready(function() {

	// 첫 번째 데이터 요청 및 테이블 업데이트 (발전량 차트 및 데이터)
	$.ajax({
		url: 'dataTable', // 데이터를 가져올 API 엔드포인트
		type: 'get', // GET 요청 방식 사용
		success: function(res) {
			let data = res;

			// 모든 데이터를 그대로 사용
			let hours = data.map(item => item.hour);
			let todayPowerGeneration = data.map(item => item.powerGeneration.toFixed(2));
			let tomorrowPowerGeneration = data.map(item => item.tm_pg.toFixed(2));
			let cumulativePower = data.map(item => item.cumulativePower.toFixed(2));
			let tomorrowCumulativePower = data.map(item => item.tm_cp.toFixed(2));

			// ECharts 초기화 및 옵션 설정
			var chartToday = echarts.init(document.getElementById('chart-container-today'));
			var chartTomorrow = echarts.init(document.getElementById('chart-container-tomorrow'));

			var optionToday = {
				legend: {
					data: ['발전량', '누적 발전량']
				},
				xAxis: {
					type: 'category',
					data: hours,
					axisLabel: {
						formatter: function(value) {
							// 짝수 시간만 출력, 나머지는 공백으로 처리
							return value % 2 === 0 ? value : '';
						}
					}
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '발전량',
						data: todayPowerGeneration,
						type: 'line',
						smooth: true
					},
					{
						name: '누적 발전량',
						data: cumulativePower,
						type: 'bar' // 막대그래프로 시각화
					}
				]
			};

			var optionTomorrow = {
				legend: {
					data: ['발전량', '누적 발전량']
				},
				xAxis: {
					type: 'category',
					data: hours,
					axisLabel: {
						formatter: function(value) {
							// 짝수 시간만 출력, 나머지는 공백으로 처리
							return value % 2 === 0 ? value : '';
						}
					}
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '발전량',
						data: tomorrowPowerGeneration,
						type: 'line',
						smooth: true
					},
					{
						name: '누적 발전량',
						data: tomorrowCumulativePower,
						type: 'bar' // 막대그래프로 시각화
					}
				]
			};

			// 차트에 옵션 적용
			chartToday.setOption(optionToday);
			chartTomorrow.setOption(optionTomorrow);

			// 발전량 테이블 생성
			let tableBody = $('#data-table tbody');

			data.forEach(item => {
				let tr = '<tr class="hover-effect">'; // 클래스 추가
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

	$('.tab-button').on('click', function() {
		var target = $(this).attr('onclick').split("'")[1];
		$('.tab-content').removeClass('active');
		$('#' + target).addClass('active');
		$('.tab-button').removeClass('active');
		$(this).addClass('active');

		// 각 탭에 따른 차트 렌더링
		if (target === 'generation') {
			// 차트 렌더링 부분이 삭제되었습니다.
		} else if (target === 'weather') {
			renderWeatherChart();
		}
	});

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
