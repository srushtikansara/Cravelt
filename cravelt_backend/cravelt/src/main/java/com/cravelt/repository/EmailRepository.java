package com.cravelt.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cravelt.model.Email;
@Repository
public interface EmailRepository extends MongoRepository<Email, Long> 
    {}

