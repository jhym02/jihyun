<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SolaPower</title>
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">
</head>
<body>

    <!-- header.jsp 파일 포함 -->
    <jsp:include page="header.jsp" />
    <main>
        <div class="main-content">
            <h1>인공지능(AI)을 활용하여 최적의 태양광 발전소 운영을 위한 발전량 예측 서비스를 제공받을 수 있습니다.</h1>
            <div class="buttons">
                <div class="button-container">
                    <div class="button-text">내 발전소 현황</div>
                    <a href="loginon">
                        <button type="button" class="btn_direct">바로가기</button>
                    </a>
                </div>
                <div class="button-container">
                    <div class="button-text">전국발전지도</div>
                    <div class="d-flex flex-column">
                        <a href="#">
                            <button type="button" class="btn_direct">바로가기</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="market-trend">
            <h2>시장동향</h2>
            <h2>SMP + (REC × 1.0)</h2>
            <div class="main-value">226.72</div>
            <div class="separator"></div>
            <div class="sub-title">SMP</div>
            <div class="sub-text">오늘 시장가격</div>
            <div class="value">148.62</div>
            <div class="sub-title">REC 현물</div>
            <div class="value">78,100</div>
        </div>
    </main>
   	<!-- footer.jsp 파일 포함 -->
    <jsp:include page="footer.jsp" /> 
    	 <!-- 로그인 결과에 따라 alert 표시 -->
	<script>
	
		// 세션에서 메시지를 받아와서 출력하고, 세션에서 삭제
		
    	var msg = "${sessionScope.msg}";
    	if (msg) {
       		alert(msg);
       	 <% session.removeAttribute("msg"); %> <!-- 메시지 출력 후 세션에서 제거 -->
    	}
    </script>
</body>
</html>