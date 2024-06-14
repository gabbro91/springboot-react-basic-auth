package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.Book;
import com.ivanfranchin.bookapi.model.Conversation;
import com.ivanfranchin.bookapi.rest.dto.BookDto;
import com.ivanfranchin.bookapi.rest.dto.ConversationDto;
import com.ivanfranchin.bookapi.rest.dto.CreateConversationRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationMapperImpl implements ConversationMapper {


    @Override
    public Conversation toConversation(CreateConversationRequest createConversationRequest) {
        if (createConversationRequest == null) {
            return null;
        }
        Conversation conversation = new Conversation();
        conversation.setTopic(createConversationRequest.getTopic());
        conversation.setTimestamp(createConversationRequest.getTimestamp());
        conversation.setConversation_uid(createConversationRequest.getConversation_uid());
        return conversation;
    }

    @Override
    public ConversationDto toConversationDto(Conversation conversation) {
        if (conversation == null) {
            return null;
        }
        ConversationDto conversationDto = new ConversationDto();
        conversationDto.setId(conversation.getId());
        conversationDto.setTopic(conversation.getTopic());
        conversationDto.setTimestamp(conversation.getTimestamp());
        conversationDto.setConversation_uid(conversation.getConversation_uid());

        return conversationDto;
    }
}
