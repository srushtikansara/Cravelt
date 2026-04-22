package com.cravelt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cravelt.model.Favourite;
import com.cravelt.model.User;
import com.cravelt.repository.FavouriteRepository;
import com.cravelt.repository.UserRepository;

@RestController
@RequestMapping("/api/favourites")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class FavouriteController {

    @Autowired
    private FavouriteRepository favouriteRepository;

    @Autowired
    private UserRepository userRepository;

@PostMapping("/toggle")
public ResponseEntity<?> toggleFavourite(@RequestBody Map<String, String> payload) {

    String userId = payload.get("userId");
    String userName = payload.get("userName");
    String restaurantId = payload.get("restaurantId");
    String restaurantName = payload.get("restaurantName");

    if (userId == null || restaurantId == null) {
        return ResponseEntity.badRequest().body("Missing data");
    }

    Optional<Favourite> existing =
        favouriteRepository.findByUserIdAndRestaurantId(userId, restaurantId);

    if (existing.isPresent()) {
        favouriteRepository.delete(existing.get());
        return ResponseEntity.ok("REMOVED");
    }

    Favourite fav = new Favourite();
    fav.setUserId(userId);
    fav.setRestaurantId(restaurantId);
    fav.setRestaurantName(restaurantName);
    fav.setCreatedAt(java.time.Instant.now());

    favouriteRepository.save(fav);

    return ResponseEntity.ok("ADDED");
}
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserFavourites(@PathVariable String userId) {
        List<Favourite> favs = favouriteRepository.findByUserId(userId);
        return ResponseEntity.ok(favs);
    }
    
    @GetMapping("/{userId}/profile")
public ResponseEntity<?> getProfile(@PathVariable String userId) {

    Optional<User> userOpt = userRepository.findById(userId);

    if (userOpt.isEmpty()) {
        return ResponseEntity.badRequest().body("User not found");
    }

    User user = userOpt.get();

    // ✅ GET FAVOURITES FROM COLLECTION
    List<Favourite> favourites = favouriteRepository.findByUserId(userId);

    Map<String, Object> response = new HashMap<>();
    response.put("user", user);
    response.put("favourites", favourites);

    return ResponseEntity.ok(response);
}
}