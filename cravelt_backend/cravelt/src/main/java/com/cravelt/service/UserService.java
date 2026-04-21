package com.cravelt.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cravelt.model.User;
import com.cravelt.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
public List<String> toggleFavourite(String email, String restaurantId) {

    if (restaurantId == null || restaurantId.equals("null")) {
        throw new RuntimeException("Invalid restaurant ID");
    }

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

    List<String> favourites = user.getFavourites();

    if (favourites == null) {
        favourites = new ArrayList<>();
    }

    // remove garbage values
    favourites.removeIf(item -> item == null);

    if (favourites.contains(restaurantId)) {
        favourites.remove(restaurantId);
        System.out.println("REMOVED: " + restaurantId);
    } else {
        favourites.add(restaurantId);
        System.out.println("ADDED: " + restaurantId);
    }

    user.setFavourites(favourites);
    userRepository.save(user);

    System.out.println("UPDATED FAVOURITES: " + favourites);

    return favourites;
}
}