package com.ivanfranchin.bookapi.service;

import com.ivanfranchin.bookapi.model.Book;

import java.util.List;

public interface BookService {

    List<Book> getBooks();

    //List<Book> getBooksContainingText(String text);

    List<Book> getBooksByConvUID(int conversationUID);

    Book validateAndGetBook(String isbn);

    Book saveBook(Book book);

    void deleteBook(Book book);

}
