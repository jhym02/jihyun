<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="assets/css/myPage.css">
<title>MyPage</title>
</head>
<body>
	<jsp:include page="header.jsp" />

	<!-- 이미지 컨테이너 -->
	<div class="image-container">
	    <img src="assets/img/mypage.png" alt="My Page Banner">
	    <!-- 이미지 위에 표시될 텍스트 -->
	    <div class="image-text">마이페이지</div>
	</div>

	<!-- 폼 컨테이너 -->
	<div class="form-container">
		<h1>회원정보 수정</h1>
		<hr>
		<form action="Real_Join" method="post">
			<label for="memId">아이디</label>
			<input type="text" name="memId" id="memId" value="${user.memId}" readonly>			
			<label for="memPw">비밀번호</label>
			<input type="password" name="memPw" id="memPw">

			<label for="memName">이름</label>
			<input type="text" name="memName" id="memName">

			<label for="memEmail">이메일</label>
			<input type="email" name="memEmail" id="memEmail">

			<!-- 버튼 컨테이너 -->
			<div class="button-container">
				<input type="submit" value="수정완료" class="btn1">
				<input type="submit" value="회원탈퇴" class="btn2">
			</div>
		</form>
	</div>

	<jsp:include page="footer.jsp" />
</body>
</html>
