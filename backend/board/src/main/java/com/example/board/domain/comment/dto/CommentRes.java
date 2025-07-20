package com.example.board.domain.comment.dto;

import com.example.board.domain.comment.Comment;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentRes {

	private  Long commentId;
    private  String content;
    private  String writerNickname;



    @Builder
    private CommentRes(Long commentId, String content, String writerNickname) {
        this.commentId = commentId;
        this.content = content;
        this.writerNickname = writerNickname;
    }

    public static CommentRes from(Comment comment) {
        return CommentRes.builder()
                .commentId(comment.getId())
                .content(comment.getContent())
                .writerNickname(comment.getMember().getNickname())
                .build();
    }
}