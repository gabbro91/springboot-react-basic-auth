package com.ivanfranchin.bookapi.service;

import com.ivanfranchin.bookapi.model.Conversation;
import com.ivanfranchin.bookapi.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationServiceImpl implements ConversationService {

    private final ConversationRepository conversationRepository;

    @Autowired
    public ConversationServiceImpl(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    @Override
    public Optional<Conversation> getConversationById(Long id) {
        return conversationRepository.findById(id);
    }

    @Override
    public List<Conversation> getAllConversations() {
        return conversationRepository.findAll();
    }

    @Override
    public List<Conversation> getConversationsByCategory(String category) {
        return conversationRepository.findByCategory(category);
    }

    @Override
    public List<Conversation> getConversationsByTopicAndCategory(String topic, String category) {
        return conversationRepository.findByTopicAndCategory(topic, category);
    }

    @Override
    public Conversation saveConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    @Override
    public void deleteConversation(Long id) {
        conversationRepository.deleteById(id);
    }
}
