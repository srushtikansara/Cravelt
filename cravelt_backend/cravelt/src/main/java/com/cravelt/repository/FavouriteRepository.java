package com.cravelt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cravelt.model.Favourite;


public interface FavouriteRepository extends MongoRepository<Favourite, String> {
    List<Favourite> findByUserId(String userId);
    Optional<Favourite> findByUserIdAndRestaurantId(String userId, String restaurantId);
}
