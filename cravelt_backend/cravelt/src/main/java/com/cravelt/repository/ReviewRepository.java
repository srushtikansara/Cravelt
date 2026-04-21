package com.cravelt.repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cravelt.model.Review;
public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByRestaurantId(String restaurantId);
    List<Review> findByUserId(String userId);
}
