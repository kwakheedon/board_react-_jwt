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

	/// 댓글생성
	@Transactional
	public CommentRespons createComment(CommentReq req, String email) {
		Member member = memberRepository.findByEmail(email)
				.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND, "사용자를 찾을 수 없습니다."));
		Post post = postRepository.findById(req.getPostId())
				.orElseThrow(() -> new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "댓글을 작성할 게시글이 없습니다."));
		Comment parent = null;
		if (req.getParentId() != null) {
			parent = commentRepository.findById(req.getParentId())
					.orElseThrow(() -> new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "원본 댓글이 존재하지 않습니다."));
		}

		Comment comment = Comment.builder().content(req.getContent()).member(member).post(post).parent(parent).build();

		Comment savedComment = commentRepository.save(comment);

		return new CommentRespons(savedComment);
	}

	/// 댓글조회
	@Transactional(readOnly = true)
	public List<CommentRes> readComments(Long postId) {
		if (!postRepository.existsById(postId)) {
			throw new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "댓글을 조회할 게시글이 없습니다.");
		}
		List<Comment> comments = commentRepository.findAllByPostId(postId);

		return comments.stream().filter(comment -> comment.getParent() == null).map(CommentRes::from)
				.collect(Collectors.toList());
	}

	/// 댓글수정
	@Transactional
	public CommentRespons updateComment(Long commentId, Long postId, String email, CommentUpdateReq request) {
		Comment comment = commentRepository.findById(commentId)
				.orElseThrow(() -> new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "댓글이 존재하지 않습니다."));

		if (!postRepository.existsById(postId)) {
			throw new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "게시글이 존재하지 않습니다.");
		}

		// 작성자 확인 (로그인한 사용자 email과 댓글 작성자 email 비교)
		if (!comment.getMember().getEmail().equals(email)) {
			throw new CustomException(ErrorCode.ACCESS_DENIED, "접근 권한이 없습니다.");
		}

		comment.updateContent(request.getContent());
		return new CommentRespons(comment);
	}

	/// 댓글삭제
	@Transactional
	public void deleteComment(Long commentId, Long postId, String email) {
		Comment comment = commentRepository.findById(commentId)
				.orElseThrow(() -> new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "댓글이 존재하지 않습니다."));

		if (!postRepository.existsById(postId)) {
			throw new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "게시글이 존재하지 않습니다.");
		}

		if (!comment.getMember().getEmail().equals(email)) {
			throw new CustomException(ErrorCode.ACCESS_DENIED, "접근 권한이 없습니다.");
		}

		commentRepository.delete(comment);
	}

}