package com.example.board.domain.comment.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.example.board.domain.comment.Comment;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentRes {

	private  Long commentId;
    private  String content;
    private  String writerNickname;
    private List<CommentRes> children; // 자식 댓글 목록
    private Long writerId;

    @Builder
    public CommentRes(Long commentId, String content, String writerNickname, Long writerId, List<CommentRes> children) {
        this.commentId = commentId;
        this.content = content;
        this.writerNickname = writerNickname;
        this.children = children;
        this.writerId = writerId;
    }

    public static CommentRes from(Comment comment) {
        return CommentRes.builder()
                .commentId(comment.getId())
                .content(comment.getContent())
                .writerNickname(comment.getMember().getNickname())
                .children(comment.getChildren().stream()
                        .map(CommentRes::from) 
                        .collect(Collectors.toList()))
                .writerId(comment.getMember().getId())
                .build();
    }
    
}