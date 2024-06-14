package com.ivanfranchin.bookapi.service;

import com.ivanfranchin.bookapi.model.Conversation;

import java.util.List;
import java.util.Optional;

public interface ConversationService {

    Optional<Conversation> getConversationById(Long id);

    List<Conversation> getAllConversations();

    Conversation saveConversation(Conversation conversation);

    void deleteConversation(Long id);
}
