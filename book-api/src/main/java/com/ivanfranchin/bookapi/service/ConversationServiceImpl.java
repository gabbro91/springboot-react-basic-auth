package com.ivanfranchin.bookapi.service;

import com.ivanfranchin.bookapi.model.Conversation;
import com.ivanfranchin.bookapi.repository.ConversationRepository;
import jakarta.transaction.Transactional;
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
    public List<Conversation> getConversationsByTopic(String topic) {
        return conversationRepository.findByTopic(topic);
    }

    @Override
    public List<Conversation> getConversationsByTopicAndCategory(String topic, String category) {
        return conversationRepository.findByTopicAndCategory(topic, category);
    }

    @Override
    public List<Conversation> getConversationsByConversationUid(int id) {
        return conversationRepository.findByConversationUid(id);
    }

    @Override
    public Conversation saveConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    @Override
    public void disableConversation(int conversationUid) {
        List<Conversation> conversations = conversationRepository.findByConversationUid(conversationUid);
        for (Conversation conversation : conversations) {
            conversation.setEnabled(false);
            conversationRepository.save(conversation);
        }
    }

    @Override
    public List<Conversation> editTitleConversation(String title, int conversationUid) {
        List<Conversation> conversations = conversationRepository.findByConversationUid(conversationUid);
        for (Conversation conversation : conversations) {
            conversation.setTitle(title);
            conversationRepository.save(conversation);
        }
        return conversations;
    }


    @Override
    @Transactional // Aggiungi questa annotazione
    public void deleteConversationsByConversationUid(int conversationUid) {
        conversationRepository.deleteByConversationUid(conversationUid); // Usa il nuovo metodo
    }
}
