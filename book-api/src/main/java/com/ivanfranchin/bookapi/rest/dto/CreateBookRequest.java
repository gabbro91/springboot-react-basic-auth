package com.ivanfranchin.bookapi.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateBookRequest {

    @Schema(example = "9781849518260")
    private long isbn;

    @Schema(example = "Spring Security 3.1")
    @NotBlank
    private String title;

    @Schema(example = "Some input")
    private String input;

    @Schema(example = "user@example.com")
    private String usermail;

    @Schema(example = "1")
    private Long conversationUid;
}
