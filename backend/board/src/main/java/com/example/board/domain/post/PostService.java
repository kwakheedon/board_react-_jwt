package com.example.board.domain.post;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.board.domain.member.Member;
import com.example.board.domain.member.MemberRepository;
import com.example.board.domain.post.dto.PostAllRes;
import com.example.board.domain.post.dto.PostDetailRes;
import com.example.board.domain.post.dto.PostReq;
import com.example.board.domain.post.dto.PostUpdateReq;
import com.example.board.exception.CustomException;
import com.example.board.exception.ErrorCode;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
	private final PostRepository postRepository;
	private final MemberRepository memberRepository;
	
	///게시글생성
	@Transactional
	public Long create(PostReq req, String email) {
	    //작성자 정보 조회 
	    Member member = memberRepository.findByEmail(email)
	            .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND, "사용자를 찾을 수 없습니다."));
	   
	    Post post = req.toEntity(member);
	    Post savedPost = postRepository.save(post);
	    return savedPost.getId();
	}
	
	///전체 게시글 목록 조회
	@Transactional(readOnly = true)
	public List<PostAllRes> findAllPosts() {
		 List<Post> posts = postRepository.findAll();
		 return posts.stream()
		            .map(PostAllRes::from) 
		            .collect(Collectors.toList());
	}
	
	///게시글 ID로 상세 조회
	@Transactional(readOnly = true)
	public PostDetailRes findPostById(Long postId) { 
	    // postId로 게시글을 찾기.
	    Post post = postRepository.findById(postId)
	        .orElseThrow(() -> new CustomException(ErrorCode.RESOURCE_NOT_FOUND, "해당 게시글을 찾을 수 없습니다."));
	    // 권한 검사 없이 바로 DTO로 변환하여 반환.
	    return PostDetailRes.from(post);
	}
	
	///특정 사용자가 쓴 게시글 목록 조회 (GET /api/posts?userId={id})
	@Transactional(readOnly = true)
	public List<PostAllRes> findPostsByEmail(String email) {

	    // 이메일로 작성자(Member) 정보를 찾기
	    Member member = memberRepository.findByEmail(email)
	            .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND, "해당 사용자를 찾을 수 없습니다."));
	    
	    // Member 객체로 해당 유저가 쓴 모든 게시글을 조회.
	    List<Post> posts = postRepository.findByMember(member);

	    // 조회된 게시글 목록(List<Post>)을 DTO 목록(List<PostAllRes>)으로 변환
	    return posts.stream()
	            .map(PostAllRes::from) 
	            .collect(Collectors.toList());
	}
	
	/// 게시글 수정
	@Transactional
	public void updatePost(Long postId, PostUpdateReq req, String email) {
	    Post post = postRepository.findById(postId)
	        .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND, "해당 게시글을 찾을 수 없습니다."));
	      
	    if (!post.getMember().getEmail().equals(email)) {
	        throw new CustomException(ErrorCode.ACCESS_DENIED, "수정 권한이 없습니다.");
	    }
	    if (req.getTitle() != null) {
	        post.updateTitle(req.getTitle());
	    }
	    if (req.getContent() != null) {
	        post.updateContent(req.getContent());
	    }
	    //@Transactional에 의해 메소드가 끝나면 자동으로 DB에 저장되므로, return이 필요 없다.
	}

	///게시글 삭제
	@Transactional
	public void deletePost(Long postId, String email) {
	    Post post = postRepository.findById(postId)
	            .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND, "해당 게시글을 찾을 수 없습니다."));
	    
	    
	    
	    if (!post.getMember().getEmail().equals(email)) {
	        throw new CustomException(ErrorCode.DELETE_NOT_UPDATE, "게시글 삭제 권한이 없습니다.");
	    }
	    postRepository.delete(post);
	}
	

	
	
	
	
}	
	
	