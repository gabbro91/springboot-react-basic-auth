package com.ivanfranchin.bookapi.repository;

import com.ivanfranchin.bookapi.model.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueryRepository extends JpaRepository<Query, String> {

    List<Query> findAllByOrderByTitle();

    //List<Query> findByIsbnContainingOrTitleContainingIgnoreCaseOrderByTitle(String isbn, String title);
}
