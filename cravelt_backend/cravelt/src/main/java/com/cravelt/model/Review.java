package com.cravelt.model;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "reviews")
public class Review {
    @Id
    private String Id;
    private String restaurantId;
    private String userId;
    private String userName;
    private String comment;
    private int rating;
    private Date createdAt = new Date();

    public String getId(){
        return Id;
    }
    public String getRestaurantId(){
        return restaurantId;
    }
    public String getUserId(){
        return userId;
    }
    public String getUserName() {
        return userName;
    }
    public String getComment(){
        return comment;
    }
    public int getRating(){
        return rating;
    }
    public void setId(String Id){
        this.Id = Id;
    }
    public void setRestaurantId(String restaurantId){
        this.restaurantId = restaurantId;
    }
    public void setUserId(String userId){
        this.userId = userId;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public void setComment(String comment){
        this.comment = comment;
    }
    public void setRating(int rating){
        this.rating = rating;
    }
     public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

}
