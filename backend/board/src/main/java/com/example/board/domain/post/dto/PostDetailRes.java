package com.example.board.domain.post.dto;


import com.example.board.domain.comment.dto.CommentRes;
import com.example.board.domain.post.Post;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class PostDetailRes {

    private Long postId;
    private String title;
    private String content;
    private String writerNickname;
    private Long writerId; 
    private List<CommentRes> comments;

    @Builder
    private PostDetailRes(Long postId, String title, String content, String writerNickname, Long writerId, List<CommentRes> comments) { // ⬇️ 2. 빌더 생성자에 writerId 추가
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.writerNickname = writerNickname;
        this.writerId = writerId; 
        this.comments = comments;
    }

    public static PostDetailRes from(Post post) {
        return PostDetailRes.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .writerNickname(post.getMember().getNickname())
                .writerId(post.getMember().getId()) 
                .comments(post.getComments().stream()
                        .map(CommentRes::from)
                        .collect(Collectors.toList()))
                .build();
    }
}