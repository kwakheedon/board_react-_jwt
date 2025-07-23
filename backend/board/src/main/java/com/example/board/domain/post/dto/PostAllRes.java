package com.example.board.domain.post.dto;

import com.example.board.domain.post.Post;

import lombok.Builder;
import lombok.Getter;


@Getter
public class PostAllRes {
	  private  Long postId;
	  private  String title;
	  private  String writerNickname;
	  private Long writerId;
	  
	  
	  @Builder
	    private PostAllRes(Long postId, String title, String writerNickname, Long writerId) { 
	        this.postId = postId;
	        this.title = title;
	        this.writerNickname = writerNickname;
	        this.writerId = writerId;
	    }
	  
	    public static PostAllRes from(Post post) {
	        return PostAllRes.builder()
	                .postId(post.getId()) 
	                .title(post.getTitle()) 
	                .writerNickname(post.getMember().getNickname()) 
	                .writerId(post.getMember().getId()) 
	                .build();
	    }
	}
	