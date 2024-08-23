<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>PowerMap</title>
<style>
#map {
    width: 800px;
    height: 800px;
    margin: 20px auto;
}

.divider {
    border: 0;
    height: 1px;
    background-color: #ccc;
    margin: 0;
}
</style>
 <script src="https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js"></script>
</head>
<body>
   <jsp:include page="header.jsp" />
   <div id="map" style="width: 600px;height:400px;"></div>
   <jsp:include page="footer.jsp" />
   <script src="assets/js/koreaMap.js"></script>
</body>
</html>