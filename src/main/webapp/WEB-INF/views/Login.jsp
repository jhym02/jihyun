<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="assets/css/login.css">
<title>회원가입</title>
</head>
<body>
	<jsp:include page="header.jsp" />

	<!-- 배너 이미지 추가 -->
	<img src="assets/img/login.png">
	<div class="container">
		<div class="login-form">
			<h2>로그인</h2>
			<p>태양광 발전량 예측에 오신 것을 환영합니다.<br>로그인을 하시면 모든 서비스를 더욱 편리하게 이용하실 수 있습니다.</p>
			<input type="text" placeholder="아이디를 입력해주세요.">
			<input type="password" placeholder="비밀번호를 입력해주세요.">
			<button>로그인</button>
		</div>
		<div class="social-login">
			<h2>SNS 소셜로그인</h2>
			<p>SNS 계정으로 간편하게 로그인 하실 수 있습니다.</p>
			<button class="kakao"><img src="assets/img/kakao.png" class="icon"> 카카오 로그인</button>
			<button class="naver"><img src="assets/img/naver.png" class="icon"> 네이버 로그인</button>
			<button class="google"><img src="assets/img/google.png" class="icon"> Google 로그인</button>
		</div>
	</div>
	
	<jsp:include page="footer.jsp" />
</body>
</html>
