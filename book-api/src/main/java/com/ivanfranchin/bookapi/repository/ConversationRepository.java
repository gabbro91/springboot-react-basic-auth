package com.ivanfranchin.bookapi.repository;

import com.ivanfranchin.bookapi.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
}
