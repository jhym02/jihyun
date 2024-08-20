console.log("js 연결확인")

// 사용자가 데이터 불러오기 버튼을 클릭했을 때
$('#btn').on('click',request);

function request(){
	// 요청을 보내고 JSON 형식으로 데이터 응답 받기
	$.ajax({
		url : 'ajax02',
		type : 'get',
		data : {
			
		},
		success : function(res){
			console.log(res);
			
			for(let i = 0; i <res.length; i++){
				// <li>제목</li>
				let li = '<li>'+res[i].title+'</li>';
				// jQuery로 HTML요소를 수정하는 방법
				// 태그명.html('html요소') : 선택한 태그의 안쪽에 덮어씌워버린다.
				// 태그명.after('html요소') : 선택한 태그의 끝 태그 바로 뒤에 추가
				// 태그명.before('html요소') : 선택한 태그의 시작태그 바로 앞에 추가
				// 태그명.append('html요소') : 선택한 태그의 안에 누적
				
				$('ul').append(li);
				
				
			}
			
			
			
		},
		error : function(e){
			console.log('error');
		}
	})
}