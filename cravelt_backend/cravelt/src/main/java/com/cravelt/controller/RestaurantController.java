package com.cravelt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cravelt.dto.DietaryUpdateRequest;
import com.cravelt.model.Restaurant;
import com.cravelt.repository.RestaurantRepository;
import com.cravelt.service.RestaurantService;

@CrossOrigin(origins = "${frontend.url}")
@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private RestaurantRepository restaurantRepository;

    // ✅ GET ALL
    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    // ✅ ADD RESTAURANT
    @PostMapping
    public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant) {
        Restaurant saved = restaurantRepository.save(restaurant);
        return ResponseEntity.ok(saved);
    }

    // ✅ UPDATE RESTAURANT
    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @PathVariable String id,
            @RequestBody Restaurant updated) {
        Restaurant existing = restaurantRepository.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        updated.set_id(id);
        Restaurant saved = restaurantRepository.save(updated);
        return ResponseEntity.ok(saved);
    }

    // ✅ DELETE RESTAURANT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable String id) {
        restaurantRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ✅ BULK DIETARY UPDATE
    @PostMapping("/dietary/bulk")
    public ResponseEntity<?> updateDietaryBulk(
            @RequestBody List<DietaryUpdateRequest> requests) {
        for (DietaryUpdateRequest req : requests) {
            Restaurant r = restaurantRepository.findById(req.getRestaurantId())
                    .orElse(null);
            if (r != null) {
                r.setDietary(req.getDietary());
                restaurantRepository.save(r);
            }
        }
        return ResponseEntity.ok("Dietary updated successfully");
    }

    // ✅ DEBUG
    @GetMapping("/debug")
    public String debug() {
        return "Count: " + restaurantService.getCount();
    }
}