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
        #map {
            width: 800px;
            height: 600px;
            margin: 20px auto;
        }
        #chart {
            width: 800px;
            height: 400px;
            margin: 20px auto;
        }
        .container {
            width: 800px;
            margin: 10px auto;
            padding: 10px;
            background-color: #98c9f4; 
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
</head>
<body>
    <jsp:include page="header.jsp" />
    <hr class="divider">
    
    <div class="container">
        <div id="map"></div>
    </div>
    
    <div id="chart"></div> <!-- 바 차트를 위한 컨테이너 추가 -->
    
    <jsp:include page="footer.jsp" />
    <script src="assets/js/koreaMap.js"></script>
</body>
</html>
