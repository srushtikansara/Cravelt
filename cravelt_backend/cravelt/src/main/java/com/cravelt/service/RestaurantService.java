package com.cravelt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.cravelt.model.Restaurant;
import com.cravelt.repository.RestaurantRepository;

import jakarta.annotation.PostConstruct;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepo;

    // ✅ ADD THIS
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepo.findAll();
    }

    public long getCount() {
        return restaurantRepo.count();
    }

    // ✅ DEBUG METHOD (INSIDE CLASS)
    @PostConstruct
    public void checkDB() {
        System.out.println("🔥 DB NAME: " + mongoTemplate.getDb().getName());
        System.out.println("🔥 COLLECTIONS: " + mongoTemplate.getCollectionNames());
        System.out.println("🔥 COUNT DIRECT: " + mongoTemplate.getCollection("restaurants").countDocuments());
    }
}