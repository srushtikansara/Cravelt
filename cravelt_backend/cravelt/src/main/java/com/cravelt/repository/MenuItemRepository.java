package com.cravelt.repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cravelt.model.MenuItem;

public interface MenuItemRepository extends MongoRepository<MenuItem, String> {
    List<MenuItem> findByRestaurantId(String restaurantId);
}