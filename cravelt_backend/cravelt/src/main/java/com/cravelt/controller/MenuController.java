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

import com.cravelt.model.Menu;
import com.cravelt.model.MenuItem;
import com.cravelt.repository.MenuItemRepository;
import com.cravelt.service.MenuService;


@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class MenuController {

    @Autowired
    private MenuService menuService;
    @Autowired
    private MenuItemRepository menuItemRepository;

    @GetMapping("/{restaurantId}")
    public ResponseEntity<?> getMenu(@PathVariable String restaurantId) {
        Menu menu = menuService.getMenuByRestaurantId(restaurantId);
        return ResponseEntity.ok(menu);
    }

    @PostMapping("/item")
    public MenuItem addMenuItem(@RequestBody MenuItem item) {
        return menuService.saveMenuItem(item);
    }
    @PostMapping("/bulk")
    public ResponseEntity<?> addBulkMenuItems(@RequestBody List<MenuItem> items) {
        List<MenuItem> savedItems = menuItemRepository.saveAll(items);
        return ResponseEntity.ok(savedItems);
    }
   @PutMapping("/item/{id}")
public ResponseEntity<?> updateMenuItem(
        @PathVariable String id,
        @RequestBody MenuItem updatedItem
) {

    MenuItem existing = menuItemRepository.findById(id)
            .orElse(null);

    if (existing == null) {
        return ResponseEntity.status(404)
                .body("Item not found");
    }

    existing.setName(updatedItem.getName());
    existing.setCategory(updatedItem.getCategory());
    existing.setPrice(updatedItem.getPrice());
    existing.setVeg(updatedItem.isVeg());
    existing.setRestaurantId(updatedItem.getRestaurantId());

    MenuItem saved = menuItemRepository.save(existing);

    return ResponseEntity.ok(saved);
}
     @DeleteMapping("/item/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable String id) {

        if (!menuItemRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Item not found");
        }

        menuItemRepository.deleteById(id);

        return ResponseEntity.ok("Item deleted successfully");
    }
  
}