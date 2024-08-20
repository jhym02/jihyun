<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
    img{
        width: 400px;
        height: 430px;
    }
    h1{
        font-size: x-large;
        text-align: center;
        color: #424242;
        font-family: Arial, sans-serif;
    }
    input{
        width: 250px;
        height: 30px;
        border-radius: 5px;
    }
    .btn{
        width: 258px;
        height: 30px;
        border-radius: 5px;
        
        background-color: #2E9AFE;
        color: white;
        border: none; /* 테두리 없애기 */
    }
    div{
        margin-left: 30px;
        vertical-align: top;
        display: inline-block;
    }
</style>
</head>
<body>
    <img src="https://static.wixstatic.com/media/11062b_24095eb285b9463d89099b1c33fe57ea~mv2.jpg/v1/fill/w_551,h_710,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_24095eb285b9463d89099b1c33fe57ea~mv2.jpg" alt="">
   <div>
        <h1>회원가입</h1>
       <form action="Real_Join">
          아이디 <br>
            <input type="text" name="memId"><br><br>
          비밀번호 <br>
            <input type="text" name="memPw"><br><br>
           이름 <br>
            <input type="text" name="memName"><br><br>
          이메일 <br>
            <input type="text" name="memEmail"><br><br>
          성별 <br>
            <input type="radio" name="memGender" value="M">남자
            <input type="radio" name="memGender" value="W">여성
          생년월일 <br>
          	<input type="date" name="memBirth">
          <input type="submit" value="가입완료" class="btn">
       </form>
    </div>
</body>
</html>