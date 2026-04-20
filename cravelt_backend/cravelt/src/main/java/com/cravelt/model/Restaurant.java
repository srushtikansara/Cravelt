package com.cravelt.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "restaurants")
public class Restaurant {

    @Id
    private String _id;   // ✅ MUST match MongoDB

    private int id;       // your custom id (1,2,3...)
    private String name;
    private String location;
    private double rating;
    private List<String> cuisines;
    private double lat;
    private double lng;
    private List<String> dietary;
    // getters & settes

    public String get_id() { return _id; }
    public void set_id(String _id) { this._id = _id; }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public List<String> getCuisines() { return cuisines; }
    public void setCuisines(List<String> cuisines) { this.cuisines = cuisines; }

    public double getLat(){
        return lat;
    }
public void setLat(double lat){
        this.lat = lat;
    }

    public double getLng(){
        return lng;
    }

    public void setLng(double lng){
        this.lng = lng;
    }
    public List<String> getDietary() {
        return dietary;
    }
    public void setDietary(List<String> dietary) {
        this.dietary = dietary;
    }
}