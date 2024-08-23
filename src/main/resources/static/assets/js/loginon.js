$(document).ready(function() {
    // 탭 버튼 클릭 시 해당 탭 내용만 표시
    $('.tab-button').on('click', function() {
        var target = $(this).attr('onclick').split("'")[1];
        $('.tab-content').removeClass('active');
        $('#' + target).addClass('active');
        $('.tab-button').removeClass('active');
        $(this).addClass('active');
    });

    // 차트 초기화
    function initCharts() {
        var chartToday = echarts.init(document.getElementById('chart-container-today'));
        var chartTomorrow = echarts.init(document.getElementById('chart-container-tomorrow'));

        var optionToday = {
            // 차트 옵션 설정
        };
        var optionTomorrow = {
            // 차트 옵션 설정
        };

        chartToday.setOption(optionToday);
        chartTomorrow.setOption(optionTomorrow);
    }

    initCharts();
    
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

        // 한글 처리를 해주기 위해 BOM 추가하기
        const BOM = "\uFEFF";
        csv = BOM + csv;                  

        csvFile = new Blob([ csv ], { type : "text/csv" });
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
});

$(document).ready(function() {
    // 탭 클릭 시 이벤트 처리
    $('.tab-button').on('click', function() {
        var tabId = $(this).attr('onclick').split("'")[1];
        showTab(tabId);

        if (tabId === 'generation') {
            // 발전량 데이터 로드
            $.ajax({
                url: 'generationDataServlet', // 발전량 데이터 서블릿 URL
                method: 'POST',
                dataType: 'json',
                success: function(data) {
                    // 차트 업데이트
                    updateGenerationCharts(data);
                },
                error: function() {
                    alert('발전량 데이터를 로드할 수 없습니다.');
                }
            });
        } else if (tabId === 'weather') {
            // 기상 데이터 로드
            $.ajax({
                url: 'weatherDataServlet', // 기상 데이터 서블릿 URL
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    // 기상 테이블 업데이트
                    updateWeatherTable(data);
                },
                error: function() {
                    alert('기상 데이터를 로드할 수 없습니다.');
                }
            });
        }
    });

    // 발전량 차트 업데이트 함수
    function updateGenerationCharts(data) {
        var chartContainerToday = echarts.init(document.getElementById('chart-container-today'));
        var chartContainerTomorrow = echarts.init(document.getElementById('chart-container-tomorrow'));

        var optionToday = {
            title: { text: '오늘의 발전량' },
            xAxis: { type: 'category', data: data.today.hours },
            yAxis: { type: 'value' },
            series: [{
                data: data.today.values,
                type: 'line'
            }]
        };

        var optionTomorrow = {
            title: { text: '내일의 발전량' },
            xAxis: { type: 'category', data: data.tomorrow.hours },
            yAxis: { type: 'value' },
            series: [{
                data: data.tomorrow.values,
                type: 'line'
            }]
        };

        chartContainerToday.setOption(optionToday);
        chartContainerTomorrow.setOption(optionTomorrow);
    }

    // 기상 데이터 테이블 업데이트 함수
    function updateWeatherTable(data) {
        var tbody = $('#weather-data-body');
        tbody.empty();

        $.each(data, function(index, item) {
            var row = '<tr>' +
                '<td>' + item.hour + '</td>' +
                '<td>' + item.powerGeneration + '</td>' +
                '<td>' + item.cumulativePower + '</td>' +
                '<td>' + item.solarRadiation + '</td>' +
                '<td>' + item.temperature + '</td>' +
                '<td>' + item.windSpeed + '</td>' +
                '<td>' + item.hour + '</td>' +
                '<td>' + item.powerGeneration + '</td>' +
                '<td>' + item.cumulativePower + '</td>' +
                '<td>' + item.solarRadiation + '</td>' +
                '<td>' + item.temperature + '</td>' +
                '<td>' + item.windSpeed + '</td>' +
                '</tr>';

            tbody.append(row);
        });
    }

    // 탭을 표시하는 함수
    function showTab(tabId) {
        $('.tab-content').removeClass('active');
        $('#' + tabId).addClass('active');
        $('.tab-button').removeClass('active');
        $('button[onclick="showTab(\'' + tabId + '\')"]').addClass('active');
    }
});

