package com.ivanfranchin.bookapi.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateConversationRequest {

    @Schema(example = "Book Discussion on Spring Security")
    @NotBlank
    private String topic;

    @Schema(example = "Book Discussion on Spring Security")
    @NotBlank
    private String title;

    @Schema(example = "Book")
    @NotBlank
    private String category;

    @Schema(example = "1")
    private int id_assistant;

    @Schema(example = "13/6/2024, 17:21:59")
    @NotBlank
    private String timestamp;

    @Schema(example = "1")
    private int conversationUid;

}
