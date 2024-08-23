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
    width: 1000px;
    height: 1000px;
    margin: 20px auto;
}
</style>
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
</head>
<body>
	<jsp:include page="header.jsp" />
	<hr class="divider">
		<div id="map"></div>
	<jsp:include page="footer.jsp" />
	<script src="assets/js/koreaMap.js"></script>
</body>
</html>
