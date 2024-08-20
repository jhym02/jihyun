// 페이지 로드가 끝나면
// 비동기 통신으로 요청을 보냄
console.log("함수실행")
// 페이지 로드가 끝나면
 $(document).ready(request);



function request(){
	console.log("함수실행")
	// idx 값이 필요한데
	// idx 값을 어떻게 가져오지?
	
	// 속성 값을 사용해서 태그를 선택하는 방법
	// 태그명[속성명=속성값]
	let idx = $('input[name=idx]').val();
	
	$.ajax({
		url : 'count',
		type : 'get',
		data : {
			"idx" : idx
		},
		success : function(res){
			console.log(res)
		},
		error : function (e){
			console.log("error")
		}
	})
}