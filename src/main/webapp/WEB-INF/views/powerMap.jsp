<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>PowerMap</title>
    <style>
        .divider {
            border: 0;
            height: 1px;
            background-color: #ccc;
            margin: 0;
        }
        .wrapper {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            margin: 20px auto;
            width: 1600px; /* 전체 너비를 1600px로 설정 */
        }
        .container {
            width: 800px;
            padding: 10px;
            background-color: #98c9f4;
            display: flex;
            justify-content: center;
        }
        #map {
            width: 100%;
            height: 600px;
        }
        #chart {
            width: 800px;
            height: 600px;
            margin-left: 20px;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
</head>
<body>
    <jsp:include page="header.jsp" />
    <hr class="divider">
    
    <div class="wrapper">
        <div class="container">
            <div id="map"></div>
        </div>
        <div id="chart"></div>
    </div>
    
    <jsp:include page="footer.jsp" />
    <script src="assets/js/koreaMap.js"></script>
</body>
</html>
