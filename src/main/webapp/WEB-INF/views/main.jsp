<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>메인 페이지</title>
<style>
/* 메인페이지 */
body {
	font-family: Arial, sans-serif;
	margin: 0;
	padding: 0;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30px 30px;
	background-color: #fff;
	border-bottom: 1px solid #eaeaea;
}

.sv {
	display: flex;
	justify-content: flex-end;
	gap: 30px;
	margin-right: 50px;
	text-decoration: none;
	color: #000;
	font-size: 22px;
	font-weight: bold;
	background-color: white; /* 기본 배경색을 흰색으로 설정 */
	color: #3498db; /* 텍스트 색상은 파란색 */
}

.sv:hover {
	background-color: #3498db; /* 마우스를 올렸을 때 파란색으로 변경 */
	color: white; /* 텍스트 색상은 흰색으로 변경 */
}

#auth {
	display: flex;
	justify-content: flex-end;
	gap: 30px;
	margin-right: 50px;
	text-decoration: none;
	color: #000;
}

#auth a {
	font-size: 22px;
	font-weight: bold;
}

a {
	text-decoration-line: none;
	color: black;
}

p {
	color: rgb(64, 74, 92);
}

/* 로그인 모달 스타일 */
.modal {
	display: none; /* 초기에는 숨겨진 상태 */
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.4);
	padding-top: 60px;
}

.modal-content {
	background-color: #fefefe;
	margin: 5% auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
	max-width: 900px;
	border-radius: 8px;
}

.close {
	color: #aaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.close:hover, .close:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
}

.container {
	display: flex;
	justify-content: space-between;
	gap: 20px;
}

.login-container, .social-login-container {
	background-color: #fff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	width: 45%; /* 각각의 너비를 설정하여 두 영역이 나란히 표시되도록 */
}

table {
	width: 100%;
	border-collapse: collapse;
}

td {
	padding: 10px;
}

input[type="text"], input[type="password"] {
	width: calc(100% - 22px);
	padding: 10px;
	margin: 5px 0;
	border: 1px solid #ccc;
	border-radius: 4px;
}

input[type="submit"] {
	width: 100%;
	padding: 10px;
	background-color: #000;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

input[type="submit"]:hover {
	background-color: #fff;
	color: #000;
	border: 1px solid #000;
}

.signup-button {
	width: 100%;
	padding: 10px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	background-color: #dcdcdc;
	color: #000;
	margin-top: 10px;
}

.signup-button:hover {
	background-color: #dcdcdc;
	color: white;
}

.social-login-container ul {
	list-style-type: none;
	padding: 0;
}

.social-login-container li {
	margin-bottom: 10px;
}

.social-login-button {
	width: 100%;
	padding: 10px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	color: white;
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}

.naver-button {
	background-color: #1DB954;
}

.kakao-button {
	background-color: #F7E03C;
}

.google-button {
	background-color: white;
	color: black;
	border: 1px solid #ccc;
}

.login-text {
	text-align: center;
}

.login-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 10px;
}

.login-message {
	font-size: 16px;
	color: #555;
	margin-bottom: 10px;
}

.social-login-container p {
	font-size: 24px;
	font-weight: bold;
	text-align: center;
	margin-bottom: 20px;
}

table, td {
	border: none;
}
</style>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>

	<!-- 메인 페이지 콘텐츠 -->
	<div class="header">
		<div class="logo">러닝메이트</div>

		<div class="sv">
			<a href="#">발전지도</a>
		</div>
		<div class="sv">
			<a href="#">관련소식</a>
		</div>
		<div class="sv">


			<a href="#">내정보</a>
			


			<c:choose>
				
				<c:when test="${!empty user_nick}">
					<!-- 카카로 로그인했을 경우 -->		
					${user_nick}
					<a href="Logout">로그아웃</a>
				</c:when>
				<c:when test="${!empty user.memId}">
					<!-- 일반 로그인했을 경우 -->					
					${user.memName}님 
					<a href="Logout">로그아웃</a>
				</c:when>
				<c:otherwise>
					<!-- 로그인하지 않았을 경우 -->
					<div>
						<button id="openLoginModal">로그인</button>
					</div>
					<a href="Go_Real_Join">회원가입</a>
				</c:otherwise>
			</c:choose>

			<!-- 로그인 모달 -->
			<div id="loginModal" class="modal">
				<div class="modal-content">
					<span class="close">&times;</span>
					<div class="container">
						<div class="login-container">
							<!-- 로그인 폼 코드 삽입 -->
							<table>
								<tr>
									<td>
										<div class="login-text">
											<div class="login-title">로그인</div>
											<div class="login-message">SolarPower에 오신 것을 환영합니다</div>
											<div class="login-message">로그인을 하시면</div>
											<div class="login-message">모든 서비스를 더욱 편리하게 이용하실 수 있습니다</div>
											<form action="Real_Login" method="post">
												<label for="username"></label> <input type="text"
													id="username" name="memId" required`
													placeholder="아이디를 입력해주세요"> <label for="password"></label>
												<input type="password" id="password" name="memPw" required
													required placeholder="비밀번호를 입력해주세요"> <input
													type="submit" value="로그인">
												<button type="button" class="signup-button"
													onclick="location.href='Go_Real_Join'">회원가입</button>
											</form>
										</div>
									</td>
								</tr>
							</table>
						</div>
						<div class="social-login-container">
							<table>
								<tr>
									<td>
										<p>SNS 소셜 로그인</p>
										<div class="login-message">SNS 계정으로 간편하게 로그인 하실 수 있습니다</div>
										<ul>
											<li><button class="social-login-button naver-button">Naver
													로그인</button></li>
											<li onclick="kakaoLogin();"><a href="javascript:void(0)">
													<span>카카오 로그인</span>
											</a></li> 
											<li onclick="kakaoLogout();"><a
												href="javascript:void(0)"> <span>카카오 로그아웃</span>
											</a></li>
											<li><button class="social-login-button google-button">Google
													로그인</button></li>
											</ul>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>

			<script>
				// JavaScript 코드로 모달 제어
				var modal = document.getElementById("loginModal");
				var btn = document.getElementById("openLoginModal");
				var span = document.getElementsByClassName("close")[0];

				// 로그인 버튼을 클릭하면 모달이 열림
				btn.onclick = function() {
					modal.style.display = "block";
				}

				// 닫기 버튼을 클릭하면 모달이 닫힘
				span.onclick = function() {
					modal.style.display = "none";
				}

				// 모달 외부를 클릭하면 모달이 닫힘
				window.onclick = function(event) {
					if (event.target == modal) {
						modal.style.display = "none";
					}
				}
			</script>
					
			<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
			<script src="assets/js/kakaoLogin.js"></script>
</body>
</html>