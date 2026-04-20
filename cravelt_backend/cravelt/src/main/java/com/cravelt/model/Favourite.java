package com.cravelt.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "favourites")
public class Favourite {
    
    @Id 
    private String id;
    private String userId;
    private String userName;
    private String restaurantId;
    private Instant createdAt;
    private String restaurantName;

    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id = id;
    }
    public String getUserId(){
        return userId;
    }
    public String getUserName(){
        return userName;
    }
    public void setUserName(String userName){
        this.userName = userName;
    }
    public String getRestaurantId(){
        return restaurantId;
    }
    public void setRestaurantId(String restaurantId){
        this.restaurantId = restaurantId;
    }
    public void setUserId(String userId){
        this.userId = userId;
    }
    public Instant getCreatedAt(){
        return createdAt;
    }
    public void setCreatedAt(Instant createdAt){
        this.createdAt = createdAt;
    }
    public String getRestaurantName(){
        return restaurantName;
    }
    public void setRestaurantName(String restaurantName){
        this.restaurantName = restaurantName;
    }

}
