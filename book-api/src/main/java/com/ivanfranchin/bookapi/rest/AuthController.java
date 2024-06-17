package com.ivanfranchin.bookapi.rest;

import com.ivanfranchin.bookapi.exception.DuplicatedUserInfoException;
import com.ivanfranchin.bookapi.mapper.UserMapperImpl;
import com.ivanfranchin.bookapi.model.Conversation;
import com.ivanfranchin.bookapi.model.User;
import com.ivanfranchin.bookapi.rest.dto.*;
import com.ivanfranchin.bookapi.security.WebSecurityConfig;
import com.ivanfranchin.bookapi.service.EmailService;
import com.ivanfranchin.bookapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final EmailService emailService;
    private final UserMapperImpl userMapperImpl;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userService.validUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(new AuthResponse(user.getId(), user.getName(), user.getRole()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public AuthResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.hasUserWithUsername(signUpRequest.getUsername())) {
            throw new DuplicatedUserInfoException(String.format("Username %s is already been used", signUpRequest.getUsername()));
        }
        if (userService.hasUserWithEmail(signUpRequest.getEmail())) {
            throw new DuplicatedUserInfoException(String.format("Email %s is already been used", signUpRequest.getEmail()));
        }

        User user = userService.saveUser(createUser(signUpRequest));
        emailService.sendVerificationEmail(user.getEmail(), user.getVerificationToken());

        return new AuthResponse(user.getId(), user.getName(), user.getRole());
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam String token) {
        userService.verifyUser(token);
        return ResponseEntity.ok("User verified successfully");
    }

    @Operation(security = {@SecurityRequirement(name = "BASIC_AUTH_SECURITY_SCHEME")})
    @PutMapping("/{username}")
    public UserDto updateUser(@PathVariable String username, String role, @Valid @RequestBody SignUpRequest signUpRequest) {
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        user.setRole(role);
        return userMapperImpl.toUserDto(userService.saveUser(user));
    }

    private User createUser(SignUpRequest signUpRequest) {
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(signUpRequest.getPassword());
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
//        if ("admin@example.com".equals(signUpRequest.getEmail())) { // Modifica con la tua logica di email admin
//            user.setRole(WebSecurityConfig.ADMIN);
//        } else {
//            user.setRole(WebSecurityConfig.USER);
//        }
        user.setRole(WebSecurityConfig.USER);
        return user;
    }
}
