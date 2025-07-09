package com.example.board.domain.post;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.domain.post.dto.PostReq;
import com.example.board.exception.ApiResponse;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api") 
@RequiredArgsConstructor
public class PostController {
	private final PostService postService;
	
	//게시글생성
	@PostMapping("/posts")
	public ResponseEntity<ApiResponse<Long>> createPost(
	        @RequestBody PostReq postReq,
	        @AuthenticationPrincipal UserDetails userDetails) {

	    //받아온 userDetails 객체에서 이메일을 추출
	    String email = userDetails.getUsername();

	    //서비스 호출 
	    Long postId = postService.create(postReq, email);

	    //생성된 게시글의 ID를 반환
	    return ResponseEntity.ok(ApiResponse.success("게시글 생성 성공", postId));
	}
	
	
	//개시글 상세조회
	//{postId}는 프론트에서 보내주는 post클래스에 ID라는 PK임, 또한 경로변수라 Req는x
//	@GetMapping("/posts/{postId}")
//	public ResponseEntity<ApiResponse<>>
	
	//게시글 목록조회 
	 

}
