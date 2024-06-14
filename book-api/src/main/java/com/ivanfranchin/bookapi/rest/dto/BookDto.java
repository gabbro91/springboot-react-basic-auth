package com.ivanfranchin.bookapi.rest.dto;

public record BookDto(long isbn, String input, String title, String usermail , Long conversation_uid) {
}