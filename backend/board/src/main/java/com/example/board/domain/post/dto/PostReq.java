package com.example.board.domain.post.dto;

import com.example.board.domain.member.Member;
import com.example.board.domain.post.Post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostReq {

	
    @NotBlank(message = "제목을 입력해주세요.")
    @Size(max = 200, message = "제목은 200자를 초과할 수 없습니다.")
    private String title;

    @NotBlank(message = "내용을 입력해주세요.")
    private String content;
    
    public Post toEntity(Member member) {
        return Post.builder()
                .title(this.title)
                .content(this.content)
                .member(member) // 파라미터로 받은 Member 객체 사용
                .build();
    }
    
    
}