package com.example.board.domain.comment;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.board.domain.comment.dto.CommentReq;
import com.example.board.domain.comment.dto.CommentRes;
import com.example.board.domain.comment.dto.CommentRespons;
import com.example.board.domain.comment.dto.CommentUpdateReq;
import com.example.board.domain.member.Member;
import com.example.board.domain.member.MemberRepository;
import com.example.board.domain.post.Post;
import com.example.board.domain.post.PostRepository;
import com.example.board.exception.CustomException;
import com.example.board.exception.ErrorCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	private final CommentRepository commentRepository;
	private final MemberRepository memberRepository;
	private final PostRepository postRepository;
	
	///댓글생성
	   @Transactional
	    public CommentRespons createComment(CommentReq req, String email) {
	        // 정보를 이메일로 조회
	        Member member = memberRepository.findByEmail(email)
	                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND, "사용자를 찾을 수 없습니다."));
	        // 댓글을 달 게시글(Post)을 postId로 조회
	        Post post = postRepository.findById(req.getPostId())
	                .orElseThrow(() -> new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "댓글을 작성할 게시글이 없습니다."));
	        Comment parent = null;
	        // parentId가 있는 경우(대댓글인 경우)
	        if (req.getParentId() != null) {
	            parent = commentRepository.findById(req.getParentId())
	                    .orElseThrow(() -> new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "원본 댓글이 존재하지 않습니다."));
	        }

	        Comment comment = Comment.builder()
	                .content(req.getContent())
	                .member(member)
	                .post(post)
	                .parent(parent) // 부모 댓글 설정
	                .build();
	        
	        Comment savedComment = commentRepository.save(comment);

	        return new CommentRespons(savedComment);
	    }
	
	
	   
	   
	///댓글조회
	@Transactional(readOnly = true)
	public List<CommentRes> readComments(Long postId) {
		// 게시글 확인
	    if (!postRepository.existsById(postId)) {
	        throw new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "댓글을 조회할 게시글이 없습니다.");
	    }
	    // 특정 게시글의 모든 댓글을 가져옴
	    List<Comment> comments = commentRepository.findAllByPostId(postId);

	    // 부모 댓글이 없는 (최상위) 댓글만 필터링하여 DTO로 변환
	    return comments.stream()
	            .filter(comment -> comment.getParent() == null) // parent가 null인 댓글이 최상위 댓글
	            .map(CommentRes::from)
	            .collect(Collectors.toList());
	}
	
	
	///댓글수정
	   @Transactional
	    public CommentRespons updateComment(Long commentId, Long postId, String email, CommentUpdateReq request) {
	        // 댓글 조회
	        Comment comment = commentRepository.findById(commentId)
	                .orElseThrow(() -> new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "댓글이 존재하지 않습니다."));

	        // 게시글 존재 여부 확인
	        if (!postRepository.existsById(postId)) {
	            throw new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "게시글이 존재하지 않습니다.");
	        }

	        // 작성자 확인 (로그인한 사용자 email과 댓글 작성자 email 비교)
	        if (!comment.getMember().getEmail().equals(email)) {
	            throw new CustomException(ErrorCode.ACCESS_DENIED, "접근 권한이 없습니다.");
	        }
	        // 댓글 내용 수정
	        comment.updateContent(request.getContent());
	        return new CommentRespons(comment);
	    }
	
	
	///댓글삭제
	@Transactional
	public void deleteComment(Long commentId, Long postId, String email) {
	    // 댓글 조회
	    Comment comment = commentRepository.findById(commentId)
	        .orElseThrow(() -> new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "댓글이 존재하지 않습니다."));
	    
	    // 게시글 조회
	    if (!postRepository.existsById(postId)) {
	        throw new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "게시글이 존재하지 않습니다.");
	    }

	    // 작성자 확인 (로그인한 사용자 email과 댓글 작성자 email 비교)
	    if (!comment.getMember().getEmail().equals(email)) {
	        throw new CustomException(ErrorCode.ACCESS_DENIED, "접근 권한이 없습니다.");
	    }

	    // 댓글 삭제
	    commentRepository.delete(comment);
	}

	
	
	
	
	
	

}