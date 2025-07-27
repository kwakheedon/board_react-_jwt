package com.example.board.domain.comment.dto;

import com.example.board.domain.comment.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class CommentRespons {

    private Long commentId;
    private String content;
    private String writerNickname;
    private Long parentId;
    private List<CommentRespons> children; // 대댓글 목록
    private Long writerId;

 
    public CommentRespons(Comment comment) {
        this.commentId = comment.getId();
        this.content = comment.getContent();
        this.writerNickname = comment.getMember().getNickname();
        this.writerId = comment.getMember().getId();


        // 부모 댓글이 있는 경우, 부모 댓글의 ID를 설정
        if (comment.getParent() != null) {
            this.parentId = comment.getParent().getId();
        }

        this.children = comment.getChildren().stream()
                .map(CommentRespons::new) // 재귀적으로 이 생성자를 호출
                .collect(Collectors.toList());
    }
}

