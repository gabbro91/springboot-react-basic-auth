package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.Conversation;
import com.ivanfranchin.bookapi.rest.dto.ConversationDto;
import com.ivanfranchin.bookapi.rest.dto.CreateConversationRequest;

public interface ConversationMapper {

    Conversation toConversation(CreateConversationRequest createConversationRequest);

    ConversationDto toConversationDto(Conversation conversation);
}
