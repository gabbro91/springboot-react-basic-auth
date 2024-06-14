package com.ivanfranchin.bookapi.rest.dto;

import lombok.Data;

import java.util.List;

@Data
public class ConversationDto {

    private Long id;
    private String topic;
    private String timestamp;
    private int conversation_uid;

}
