package com.example.board.domain.comment.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.example.board.domain.comment.Comment;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentRes {

	private  Long commentId;
    private  String content;
    private  String writerNickname;
    private List<CommentRes> children; // 자식 댓글 목록


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
                // 자식 댓글들을 CommentRes로 변환하여 리스트에 담습니다.
                .children(comment.getChildren().stream().map(CommentRes::from).collect(Collectors.toList()))
                .build();
    }
}