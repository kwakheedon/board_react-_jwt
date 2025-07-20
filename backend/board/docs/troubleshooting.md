
#에러메세지: 
	Association 'com.example.board.domain.post.Post.comments' targets the 	type 'javax.xml.stream.events.Comment' which is not an '@Entity' type
	문제상황: 
		post 엔티티에 선언된 comments 가 잘못된 타입을 참조하고있었음
		import를 잘못해서 Spring/Hibernate가 XML용 Comment 클래스를 엔티티로 착각함
	해결방법: 
		import com.example.board.domain.comment.Comment; 

#에러메세지:
	Type mismatch: cannot convert from Member to RefreshToken
	문제상황: 
		RefreshTokenRepository에 Optional<member> findByTokenValue(String 	tokenValue);라는 잘못된 반환타입을 지정해놓았음
	해결방법:
	 	Optional<RefreshToken> findByTokenValue(String tokenValue); 올바른 타입으로 	수정

#에러 메시지:
	Hibernate: select m1_0.id, m1_0.email ... from members m1_0 where m1_0.email is null
	문제 상황: 
		로그인 후 발급받은 유효한 accessToken을 헤더에 포함하여 게시글 생성 API (/api/posts)를 호출했고 
		하지만 서버에서는 인증된 사용자의 정보를 제대로 찾지 못했고, 데이터베이스에 email이 null인 사용자를 조회하려는 쿼리가 실행
		MemberService에서 "사용자를 찾을 수 없습니다."라는 CustomException이 발생하며 404 Not Found 또는 500 Internal Server Error가 반환
	해결방법: 	
		@PostMapping("/posts")
			public ResponseEntity<ApiResponse<Void>> createPost(
		        @RequestBody PostReq postReq,
		        String email)  <-- String email이라는 파라미터만 선언해서는, Spring MVC가 이 변수에 어떤 값을 넣어주어야 할지 알 수 없어서 null처리됨 
		        @AuthenticationPrincipal UserDetails userDetails) <-- 해당방식으로 수정해서 오류해결 
