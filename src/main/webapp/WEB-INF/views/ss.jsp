<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"	rel="stylesheet">
<script	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
<script	src="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.5/dist/sweetalert2.min.js"></script>
<link rel="stylesheet"	href="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.5/dist/sweetalert2.min.css">
<style type="text/css">
.content {
	text-align: center;
	padding: 20px;
}
</style>
</head>

<body>
	<script>
    Swal.fire({
        title: "로그인 실패",
        text: "아이디, 비밀번호를 확인해주세요",
        icon: "info",
        confirmButtonColor: "#6DD66D", // 확인 버튼 색상 설정
        confirmButtonText: "확인"
    });
</script>
	
</body>

</html>
