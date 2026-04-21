package com.cravelt.model;
import java.util.List;

public class Menu {

    private String id;
    private String restaurantId;
    private List<MenuItem> items;

    public Menu() {}

    public Menu(String id, String restaurantId, List<MenuItem> items) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.items = items;
    }

    // getters and setters

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRestaurantId() { return restaurantId; }
    public void setRestaurantId(String restaurantId) { this.restaurantId = restaurantId; }

    public List<MenuItem> getItems() { return items; }
    public void setItems(List<MenuItem> items) { this.items = items; }
}