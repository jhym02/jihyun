<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="resources/css/Real_Join.css">
</head>
<body>

<div class="header">
    <a href="main"><img alt="logo" src="resources/img/sp.png" style="height: 90px;"/></a> 
    <div class="sv">
        <a href="chart">내 발전소</a>
    </div>
    <div class="sv">
        <a href="map">발전지도</a>
    </div>
    <div class="sv">
        <a href="#">관련소식</a> 
    </div>
</div>

<div class="container">
    <img src="https://static.wixstatic.com/media/11062b_24095eb285b9463d89099b1c33fe57ea~mv2.jpg/v1/fill/w_551,h_710,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_24095eb285b9463d89099b1c33fe57ea~mv2.jpg" alt="이미지">
    <div class="form-container">
        <h1>회원가입</h1>
        <form action="Real_Join">
            <label for="memId">아이디</label><br>
            <input type="text" id="memId" name="memId" placeholder="아이디를 입력하세요"><br>

            <label for="memPw">비밀번호</label><br>
            <input type="password" id="memPw" name="memPw" placeholder="비밀번호를 입력하세요"><br>

            <label for="memName">이름</label><br>
            <input type="text" id="memName" name="memName" placeholder="이름을 입력하세요"><br>

            <label for="memEmail">이메일</label><br>
            <input type="email" id="memEmail" name="memEmail" placeholder="이메일을 입력하세요"><br>

            <label for="memGender">성별</label><br>
            <div class="gender-options">
                <input type="radio" id="male" name="memGender" value="M">
                <label for="male">남성</label>
                <input type="radio" id="female" name="memGender" value="W">
                <label for="female">여성</label>
            </div>

            <label for="memBirth">생년월일</label><br>
            <input type="date" id="memBirth" name="memBirth"><br>

            <input type="submit" value="가입완료" class="btn">
        </form>
    </div>
</div>

</body>
</html>
