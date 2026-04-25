package com.cravelt.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "restaurants")
public class Restaurant {

    @Id
    @JsonProperty("_id")  // ✅ this exposes _id in JSON response
    private String _id;

    private int id;
    private String name;
    private String location;
    private String city;
    private double rating;
    private int priceForTwo;
    private String image;
    private boolean veg;
    private String description;
    private String openTime;
    private String closeTime;
    private List<String> cuisine;
    private List<String> ambience;
    private List<String> dietary;
    private double lat;
    private double lng;

    // Getters & Setters
    @JsonProperty("_id")  // ✅ also on getter
    public String get_id() { return _id; }
    public void set_id(String _id) { this._id = _id; }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getPriceForTwo() { return priceForTwo; }
    public void setPriceForTwo(int priceForTwo) { this.priceForTwo = priceForTwo; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public boolean isVeg() { return veg; }
    public void setVeg(boolean veg) { this.veg = veg; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getOpenTime() { return openTime; }
    public void setOpenTime(String openTime) { this.openTime = openTime; }

    public String getCloseTime() { return closeTime; }
    public void setCloseTime(String closeTime) { this.closeTime = closeTime; }

    public List<String> getCuisine() { return cuisine; }
    public void setCuisine(List<String> cuisine) { this.cuisine = cuisine; }

    public List<String> getAmbience() { return ambience; }
    public void setAmbience(List<String> ambience) { this.ambience = ambience; }

    public List<String> getDietary() { return dietary; }
    public void setDietary(List<String> dietary) { this.dietary = dietary; }

    public double getLat() { return lat; }
    public void setLat(double lat) { this.lat = lat; }

    public double getLng() { return lng; }
    public void setLng(double lng) { this.lng = lng; }
}