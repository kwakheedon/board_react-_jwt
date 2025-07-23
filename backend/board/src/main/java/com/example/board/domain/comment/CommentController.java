package com.example.board.domain.comment;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.domain.comment.dto.CommentReq;
import com.example.board.domain.comment.dto.CommentRes;
import com.example.board.domain.comment.dto.CommentRespons;
import com.example.board.domain.comment.dto.CommentUpdateReq;
import com.example.board.exception.ApiResponse;
import com.example.board.security.jwt.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {
	private final CommentService commentService;
	
	///댓글생성
    @PostMapping("/comments")
    public ResponseEntity<ApiResponse<CommentRespons>> createComment(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody CommentReq req) {

    	CommentRespons newComment = commentService.createComment(req, userDetails.getMember().getEmail());

        return ResponseEntity.ok(ApiResponse.success("댓글 작성 성공", newComment));
    }

	
	///댓글조회 
	@GetMapping("/posts/{postId}/comments")
	public ResponseEntity<ApiResponse<List<CommentRes>>> readComments(@PathVariable Long postId) {
	    List<CommentRes> commentList = commentService.readComments(postId);
	    return ResponseEntity.ok(ApiResponse.success("댓글 조회 성공", commentList));
	}
	
	///댓글수정
	@PatchMapping("/posts/{postId}/comments/{commentId}")
	public ResponseEntity<ApiResponse<CommentRespons>> updateComment(
	        @PathVariable Long postId,
	        @PathVariable Long commentId,
	        @RequestBody CommentUpdateReq request,
	        @AuthenticationPrincipal CustomUserDetails userDetails) {

	    CommentRespons updatedComment = commentService.updateComment(commentId, postId, userDetails.getMember().getEmail(), request);

	    return ResponseEntity.ok(ApiResponse.success("댓글 수정 성공", updatedComment));
	}
	
	///댓글삭제
	@DeleteMapping("/posts/{postId}/comments/{commentId}")
	public ResponseEntity<ApiResponse<Void>> deleteComment(
	        @PathVariable Long postId,
	        @PathVariable Long commentId,
	        @AuthenticationPrincipal CustomUserDetails userDetails) {
	    
	    commentService.deleteComment(commentId, postId, userDetails.getMember().getEmail());
	    return ResponseEntity.ok(ApiResponse.success("댓글 삭제 성공", null));
	}
}