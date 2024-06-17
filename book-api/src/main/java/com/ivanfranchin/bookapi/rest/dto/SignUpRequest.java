package com.ivanfranchin.bookapi.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpRequest {

    @Schema(example = "user3")
    private String username;

    @Schema(example = "user3")
    private String password;

    @Schema(example = "User3")
    private String name;

    @Schema(example = "user3@mycompany.com")
    @Email
    private String email;

    @Schema(example = "user")
    private String role;
}
