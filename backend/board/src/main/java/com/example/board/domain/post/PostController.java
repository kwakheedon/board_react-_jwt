package com.example.board.domain.post;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.board.security.jwt.CustomUserDetails;
import com.example.board.domain.post.dto.PostAllRes;
import com.example.board.domain.post.dto.PostDetailRes;
import com.example.board.domain.post.dto.PostReq;
import com.example.board.domain.post.dto.PostUpdateReq;
import com.example.board.exception.ApiResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PostController {
	private final PostService postService;

	/// 게시글생성
	@PostMapping("/posts")
	public ResponseEntity<ApiResponse<Long>> createPost(@RequestBody PostReq req,
			@AuthenticationPrincipal CustomUserDetails userDetails) {

		// 받아온 userDetails 객체에서 이메일을 추출
		String email = userDetails.getMember().getEmail();
		
		// 서비스 호출
		Long postId = postService.create(req, email);

		// 생성된 게시글의 ID를 반환
		return ResponseEntity.ok(ApiResponse.success("게시글 생성 성공", postId));
	}
	
	///게시글 전체조회
	@GetMapping("/posts")
    public ResponseEntity<ApiResponse<List<PostAllRes>>> getPostList(
            @RequestParam(name = "email", required = false) String email) {

        if (email != null) {
            // email 파라미터가 있는 경우: 특정 사용자 게시글 조회
            List<PostAllRes> userPosts = postService.findPostsByEmail(email);
            return ResponseEntity.ok(ApiResponse.success("사용자 게시글 목록 조회 성공", userPosts));
        } else {
            // email 파라미터가 없는 경우: 전체 게시글 조회
            List<PostAllRes> allPosts = postService.findAllPosts();
            return ResponseEntity.ok(ApiResponse.success("전체 게시글 조회 성공", allPosts));
        }
    }

	/// 게시글 ID로 상세 조회
	@GetMapping("/posts/{postId}")
	public ResponseEntity<ApiResponse<PostDetailRes>> getPost(@PathVariable Long postId) {
		PostDetailRes postDetail = postService.findPostById(postId);
		return ResponseEntity.ok(ApiResponse.success("게시글 조회 성공", postDetail));
	}

	/// 게시글수정
	@PutMapping("/posts/{postId}")
	public ResponseEntity<ApiResponse<Void>> updatePost(
	        @PathVariable Long postId,
	        @RequestBody PostUpdateReq request,
	        @AuthenticationPrincipal CustomUserDetails userDetails) {
	    
	    postService.updatePost(postId, request, userDetails.getMember().getEmail());
	    return ResponseEntity.ok(ApiResponse.success("게시글 수정 성공", null));
	}
	
	///게시글 삭제 
	@DeleteMapping("/posts/{postId}")
	public ResponseEntity<ApiResponse<Void>> deletePost(
	        @PathVariable Long postId,
	        @AuthenticationPrincipal CustomUserDetails userDetails) {
	            
	    postService.deletePost(postId, userDetails.getMember().getEmail());

	    return ResponseEntity.ok(ApiResponse.success("게시글 삭제 성공", null));
	}
	
}