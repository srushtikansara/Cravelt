package com.cravelt.dto;

import java.util.List;

public class DietaryUpdateRequest {

    private String restaurantId;
    private List<String> dietary;

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public List<String> getDietary() {
        return dietary;
    }

    public void setDietary(List<String> dietary) {
        this.dietary = dietary;
    }
}