package com.example.board.domain.comment.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentUpdateReq {

    @NotBlank(message = "댓글 내용은 비어 있을 수 없습니다.")
    private String content;
}