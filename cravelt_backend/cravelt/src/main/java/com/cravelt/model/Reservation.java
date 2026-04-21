package com.cravelt.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reservations")
public class Reservation {

    @Id
    private String id;
    private String name;
    private String email;
    private String date;
    private String time;
    
    private String status = "PENDING";
    private int guests;
    private String restaurantId; // ✅ NEW FIELD TO STORE RESTAURANT ID

    // ✅ GETTERS
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getDate() { return date; }
    public String getTime() { return time; }

    public String getStatus() { return status; }
    public int getGuests() { return guests; }
    public String getRestaurantId() { return restaurantId; } // ✅ GETTER FOR RESTAURANT ID
    // ✅ SETTERS
    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setDate(String date) { this.date = date; }
    public void setTime(String time) { this.time = time; }

    public void setStatus(String status) { this.status = status; }
    public void setGuests(int guests) { this.guests = guests; }
    public void setRestaurantId(String restaurantId) { this.restaurantId = restaurantId; } // ✅ SETTER FOR RESTAURANT ID
}