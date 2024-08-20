console.log('연결 확인')

// JSON 데이터 이용해서 태그 바꿔주기

$('searchBtn').on('click', request);

function request() {
	// 검색창(input 태그)의 데이터 가져오기

	let text = $('#text').val();

	// 비동기 요청
	$.ajax({

		url: 'search',
		type: 'get',
		data: {
			"text": text
		},
		success: function(res) {
			console.log(res)
			makeTable(res)
		},
		error: function(e) {
			console.log('error')
		}




	})
}


// 새롭게 데이터 채워주는 함수(tbody)
function makeTable(res) {
	// 1. tbody 안쪽을 초기화
	$('tbody').html('');

	// 2. 가져온 json 데이터를 이용해서 tr, td 태그 생성
	for (let i = 0; res.length; i++) {
		let board = res[i];
		/*let tr = "<tr>"
		tr += "<td>"+ board.idx +"</td>";	
		tr += "</tr>"*/
		
		// `` : 백틱
		// 엔터 사용 가능, html 요소를 그대로 복붙하기 가능하다
		// ${변수명}
		let tr = `<tr>
			    		<td>${board.idx}</td>
			    		<td><a href="view?idx=${board.idx}">${board.title}</a></td>
			    		<td>${board.writer}</td>
			    		<td>${board.indate}</td>
			    		<td>${board.count}</td>
			    		<!-- 쿼리스트링 : url + ? name=value -->
			    		<!-- delete 요청을 받았을 때 해당 게시글을 삭제하고 다시 목록으로 돌아오는 기능! -->
			    		<td><a href="delete?idx=${board.idx}">삭제</a></td>
		    		</tr>`

		//  tbody에 tr 누적
		$('tbody').append(tr);
	}
}

















