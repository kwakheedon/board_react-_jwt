package com.example.board.domain.post.dto;

import com.example.board.domain.post.Post;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PostUserRes  {
    private  Long postId;
    private  String title;
    private  String writerNickname;
    
    
    @Builder
    private PostUserRes(Long postId, String title, String writerNickname) {
        this.postId = postId;
        this.title = title;
        this.writerNickname = writerNickname;
    }
    
    public static PostUserRes from(Post post) {
        return PostUserRes.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .writerNickname(post.getMember().getNickname())
                .build();
    }
    
    
    
}