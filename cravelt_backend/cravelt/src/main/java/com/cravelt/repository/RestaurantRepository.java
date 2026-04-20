package com.cravelt.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cravelt.model.Restaurant;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {}