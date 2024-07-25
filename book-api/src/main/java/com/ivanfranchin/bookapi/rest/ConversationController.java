package com.ivanfranchin.bookapi.rest;

import com.ivanfranchin.bookapi.mapper.ConversationMapper;
import com.ivanfranchin.bookapi.model.Book;
import com.ivanfranchin.bookapi.model.Conversation;
import com.ivanfranchin.bookapi.rest.dto.ConversationDto;
import com.ivanfranchin.bookapi.rest.dto.CreateConversationRequest;
import com.ivanfranchin.bookapi.service.ConversationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;
    private final ConversationMapper conversationMapper;

    @Autowired
    public ConversationController(ConversationService conversationService, ConversationMapper conversationMapper) {
        this.conversationService = conversationService;
        this.conversationMapper = conversationMapper;
    }

    @Operation(security = {@SecurityRequirement(name = "BASIC_AUTH_SECURITY_SCHEME")})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ConversationDto createConversation(@Valid @RequestBody CreateConversationRequest createConversationRequest) {
        Conversation conversation = conversationMapper.toConversation(createConversationRequest);
        return conversationMapper.toConversationDto(conversationService.saveConversation(conversation));
    }

    @Operation(security = {@SecurityRequirement(name = "BASIC_AUTH_SECURITY_SCHEME")})
    @GetMapping("/{id}")
    public ConversationDto getConversationById(@PathVariable Long id) {
        Conversation conversation = conversationService.getConversationById(id)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        return conversationMapper.toConversationDto(conversation);
    }

    @Operation(security = {@SecurityRequirement(name = "BASIC_AUTH_SECURITY_SCHEME")})
    @GetMapping
    public List<ConversationDto> getConversations(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "topic", required = false) String topic ){
        List<Conversation> conversations = (category == null) ? conversationService.getAllConversations() : conversationService.getConversationsByTopicAndCategory(topic,category);

        return conversations.stream()
                .map(conversationMapper::toConversationDto)
                .collect(Collectors.toList());
    }

//    @Operation(security = {@SecurityRequirement(name = "BASIC_AUTH_SECURITY_SCHEME")})
//    @GetMapping
//    public List<ConversationDto> getConversationsByTopic(@RequestParam(value = "category", required = false) String category){
//        List<Conversation> conversations = (category == null) ? conversationService.getAllConversations() : conversationService.getConversationsByCategory(category);
//
//        return conversations.stream()
//                .map(conversationMapper::toConversationDto)
//                .collect(Collectors.toList());
//    }

    @Operation(security = {@SecurityRequirement(name = "BASIC_AUTH_SECURITY_SCHEME")})
    @PutMapping("/{id}")
    public ConversationDto updateConversation(@PathVariable Long id, @Valid @RequestBody CreateConversationRequest createConversationRequest) {
        Conversation conversation = conversationService.getConversationById(id)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        conversation.setTopic(createConversationRequest.getTopic());
        return conversationMapper.toConversationDto(conversationService.saveConversation(conversation));
    }

    @Operation(security = {@SecurityRequirement(name = "BASIC_AUTH_SECURITY_SCHEME")})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteConversation(@PathVariable Long id) {
        conversationService.deleteConversation(id);
    }
}
