package com.ivanfranchin.bookapi.rest.dto;

public class UserConversationCountDto {
    private String user;
    private long conversationCount;

    // Costruttore
    public UserConversationCountDto(String user, long conversationCount) {
        this.user = user;
        this.conversationCount = conversationCount;
    }

    // Getter e Setter
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public long getConversationCount() {
        return conversationCount;
    }

    public void setConversationCount(long conversationCount) {
        this.conversationCount = conversationCount;
    }
}

