package com.example.board.domain.comment.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentReq {

    @NotBlank(message = "게시글 ID는 필수입니다.")
    private Long postId;

    @NotBlank(message = "내용을 입력해주세요.")
    private String content;

    
    // 대댓글 기능을 위한 부모 댓글 ID
     private Long parentId;
    
}