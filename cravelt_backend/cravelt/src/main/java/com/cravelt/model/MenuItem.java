package com.cravelt.model;

public class MenuItem {

    private String id;
    private String restaurantId;
    private String name;
    private String category; // starter, main, dessert, drink
    private double price;
    private boolean veg;

    public MenuItem() {}

    public MenuItem(String id, String restaurantId, String name, String category, double price, boolean veg) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.name = name;
        this.category = category;
        this.price = price;
        this.veg = veg;
    }

    // getters and setters

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public boolean isVeg() { return veg; }
    public void setVeg(boolean veg) { this.veg = veg; }

    public String getRestaurantId() { return restaurantId; }
    public void setRestaurantId(String restaurantId) { this.restaurantId = restaurantId; }
}