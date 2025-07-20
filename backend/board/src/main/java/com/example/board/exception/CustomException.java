package com.example.board.exception;

import lombok.Getter;

@Getter  //예외처리(에러코드)
public class CustomException extends RuntimeException {
	private static final long serialVersionUID = 1L;
    private final ErrorCode errorCode;
    private final String detail;

    public CustomException(ErrorCode errorCode, String detail) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.detail = detail;
    }
}