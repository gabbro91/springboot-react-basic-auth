package com.ivanfranchin.bookapi.service;

import com.ivanfranchin.bookapi.model.Conversation;

import java.util.List;
import java.util.Optional;

public interface ConversationService {

    Optional<Conversation> getConversationById(Long id);

    List<Conversation> getAllConversations();

    List<Conversation> getConversationsByCategory(String category);

    List<Conversation> getConversationsByTopic(String topic);

    List<Conversation> getConversationsByTopicAndCategory(String topic, String category);

    List<Conversation> getConversationsByConversationUid(int id);

    Conversation saveConversation(Conversation conversation);

    void disableConversation(int id);

    List<Conversation> editTitleConversation(String title, int conversationId);

    void deleteConversationsByConversationUid(int conversationUid);
}
