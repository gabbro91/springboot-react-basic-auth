package com.ivanfranchin.bookapi.repository;

import com.ivanfranchin.bookapi.model.Book;
import com.ivanfranchin.bookapi.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    List<Conversation> findByCategory(String category);
    List<Conversation> findByTopicAndCategory(String topic,String category);
    List<Conversation> findByConversationUid(int id);
    void deleteByConversationUid(int conversationUid);
    List<Conversation> findByTopic(String topic);
}
