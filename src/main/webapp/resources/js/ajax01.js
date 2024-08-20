// 비동기 통신

// button에 클릭 이벤트 걸어주기
$('#btn').on('click', request);

function request(){
	// ajax를 이용한 비동기 요청
	// js에서 중괄호 -> 객체, 대괄호 -> 배열
	$.ajax({
		url : 'ajax01',   // 요청할 주소 
		type : 'get',  // get or post를 쓸건지 정하는 통신방식
		data : {
			// 요청에 담아보낼 데이터
			// name : value
			"num1" : 15
		},
		success : function(res){
			// 요청이 성공했을 때 실행되는 콜백 함수
			console.log(res)
			
		},
		error : function(e){
			// 요청이 실패했을 때 실행되는 콜백 함수
			console.log("error")
		}    
	})
}