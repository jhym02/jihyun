<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
    height: 800px;
    margin: 10px auto;
}

.image-container {
    position: relative;
    margin: 0 auto;
}

.image-container img {
    width: 100%;
    height: auto;
    display: block;
}

.image-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 40px;
    text-align: center;
}
</style>
 <script src="https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js"></script>
</head>
<body>
	<jsp:include page="header.jsp" />
	<!-- 이미지 컨테이너 -->
	<div class="image-container">
		<img src="assets/img/sub_top.png">
		<!-- 이미지 위에 표시될 텍스트 -->
		<div class="image-text">발전지도</div>
	</div>
	<hr class="divider">
	
		<div id="map"></div>
	
	<jsp:include page="footer.jsp" />
	<script src="assets/js/koreaMap.js"></script>
</body>
</html>
