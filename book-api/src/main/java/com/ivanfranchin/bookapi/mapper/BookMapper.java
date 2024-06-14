package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.Book;
import com.ivanfranchin.bookapi.model.Conversation;
import com.ivanfranchin.bookapi.rest.dto.BookDto;
import com.ivanfranchin.bookapi.rest.dto.CreateBookRequest;

public interface BookMapper {

    Book toBook(CreateBookRequest createBookRequest);

    BookDto toBookDto(Book book);
}
