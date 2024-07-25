package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.Book;
import com.ivanfranchin.bookapi.model.Conversation;
import com.ivanfranchin.bookapi.rest.dto.BookDto;
import com.ivanfranchin.bookapi.rest.dto.CreateBookRequest;
import com.ivanfranchin.bookapi.rest.dto.CreateConversationRequest;
import org.springframework.stereotype.Service;

@Service
public class BookMapperImpl implements BookMapper {

    @Override
    public Book toBook(CreateBookRequest createBookRequest) {
        if (createBookRequest == null) {
            return null;
        }
        return new Book(
                createBookRequest.getIsbn(),
                createBookRequest.getTitle(),
                createBookRequest.getInput(),
                createBookRequest.getUsermail(),
                createBookRequest.getConversationUid()

        );
    }

    @Override
    public BookDto toBookDto(Book book) {
        if (book == null) {
            return null;
        }
        return new BookDto(
                book.getIsbn(),
                book.getTitle(),
                book.getInput(),
                book.getUsermail(),
                book.getConversationUid()
        );
    }
}
