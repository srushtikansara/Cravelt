package com.cravelt.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cravelt.model.User;
import com.cravelt.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "${frontend.url}",
            allowedHeaders = "*",
            methods={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}
            )
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ TOGGLE FAVOURITE USING EMAIL
     @PostMapping
    public ResponseEntity<?> signup(@RequestBody Map<String, String> payload) {
        try {
            String fullName = payload.get("fullName");
            String email = payload.get("email");
            String password = payload.get("password");

            if (fullName == null || email == null || password == null) {
                return ResponseEntity.badRequest().body("Missing fields");
            }

            // check if user exists
            if (userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.status(409).body("Email already exists");
            }

            User newUser = new User();
            newUser.setFullName(fullName);
            newUser.setEmail(email);
            newUser.setPassword(password);
            newUser.setFavourites(new ArrayList<>());

            userRepository.save(newUser);

           return ResponseEntity.ok(Map.of(
    "id", newUser.getId(),
    "name", newUser.getFullName(),
    "email", newUser.getEmail(),
    "foodPreferences", newUser.getFoodPreferences()

));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Signup error");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
    try {
        String email = payload.get("email");
        String password = payload.get("password");

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(404).body("User not found");
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(password)) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // ✅ Success: return user details
       return ResponseEntity.ok(Map.of(
    "id", user.getId(),
    "name", user.getFullName(),
    "email", user.getEmail(),
     "foodPreferences", user.getFoodPreferences() 
));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Login error");
    }
}
@PostMapping("/favourite")
public ResponseEntity<?> toggleFavourite(@RequestBody Map<String, String> payload) {
    String email = payload.get("email");
    String restaurantId = payload.get("restaurantId");

    Optional<User> optionalUser = userRepository.findByEmail(email);
    if (!optionalUser.isPresent()) {
        return ResponseEntity.status(404).body("User not found");
    }

    User user = optionalUser.get();

    if (user.getFavourites() == null) {
        user.setFavourites(new ArrayList<>());
    }

    List<String> favs = user.getFavourites();

    if (favs.contains(restaurantId)) {
        favs.remove(restaurantId);
    } else {
        favs.add(restaurantId);
    }

    user.setFavourites(favs);  // make sure the updated list is set
    userRepository.save(user);  // this should now persist in MongoDB

    return ResponseEntity.ok(Map.of("favourites", user.getFavourites()));
}

    // ✅ GET PROFILE BY ID
    @GetMapping("/{id}/profile")
    public ResponseEntity<?> getUserProfile(@PathVariable String id) {
        try {
            Optional<User> optionalUser = userRepository.findById(id);

            if (!optionalUser.isPresent()) {
                return ResponseEntity.status(404).body("User not found");
            }

            return ResponseEntity.ok(optionalUser.get());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error fetching profile");
        }
    }

    @GetMapping("/test")
    public String test() {
        return "API working on 9999 ✅";
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()) {
            return ResponseEntity.ok(optionalUser.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

 @PutMapping("/preferences/{userId}")
public ResponseEntity<?> updatePreferences(
        @PathVariable String userId,    // ✅ match MongoDB _id
        @RequestBody List<String> Foodpreferences) {

    Optional<User> userOpt = userRepository.findById(userId);
    if (userOpt.isEmpty()) {
        return ResponseEntity.badRequest().body("User not found");
    }

    User user = userOpt.get();
    user.setFoodPreferences(Foodpreferences);  // ✅ see next step

    userRepository.save(user);

    return ResponseEntity.ok("Preferences updated ✅");
}
    @GetMapping("/preferences/{userId}")
public ResponseEntity<?> getPreferences(@PathVariable String userId) {

    Optional<User> userOpt = userRepository.findById(userId);

    if (userOpt.isEmpty()) {
        return ResponseEntity.badRequest().body("User not found");
    }

    return ResponseEntity.ok(userOpt.get().getFoodPreferences());
}

}
