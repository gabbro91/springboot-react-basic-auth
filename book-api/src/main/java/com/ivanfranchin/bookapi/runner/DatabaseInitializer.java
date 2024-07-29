package com.ivanfranchin.bookapi.runner;

import com.ivanfranchin.bookapi.model.Book;
import com.ivanfranchin.bookapi.model.User;
import com.ivanfranchin.bookapi.security.WebSecurityConfig;
import com.ivanfranchin.bookapi.service.BookService;
import com.ivanfranchin.bookapi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;
    private final BookService bookService;

    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        USERS.forEach(userService::saveUser);
        //getBooks().forEach(bookService::saveBook);
        log.info("Database initialized");
    }

//    private List<Book> getBooks() {
//        return Arrays.stream(BOOKS_STR.split("\n"))
//                .map(bookInfoStr -> bookInfoStr.split(";"))
//                .map(bookInfoArr -> new Book(bookInfoArr[0],bookInfoArr[1], bookInfoArr[2], Long.valueOf(bookInfoArr[3])))
//                .collect(Collectors.toList());
//    }

    private static final List<User> USERS = Arrays.asList(
            new User("delgrosso", "$Labellapartners$", "Marco Del Grosso", "marco.delgrosso@labellapartners.com", WebSecurityConfig.ADMIN),
            new User("apponi", "$Labellapartners$", "Francesca Apponi", "francesca.apponi@labellapartners.com", WebSecurityConfig.ADMIN),
             new User("laico", "$Labellapartners$", "Martina Laico", "martina.laico@labellapartners.com", WebSecurityConfig.ADMIN),
            new User("labella", "$Labellapartners$", "Agostino La Bella", "ago.labella@labellapartners.com", WebSecurityConfig.ADMIN),
         new User("brunozzi", "$Labellapartners$", "Gabriele Tini Brunozzi", "gabriele.brunozzi@labellapartners.com", WebSecurityConfig.ADMIN)
    );

    private static final String BOOKS_STR =
            """
                   Assistant Response;conversation lenovo 2023;admin;1
                    """;
}
