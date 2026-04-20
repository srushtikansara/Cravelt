package com.cravelt.model;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String fullName;
    private List<String> favourites = new ArrayList<>();
    private List<String> foodPreferences = new ArrayList<>();
    public User() {}
    public User(String name,String email,String password){
        this.name = name;
        this.email = email;
        this.password = password;
        this.favourites = new ArrayList<>();
        this.foodPreferences = new ArrayList<>();       
    }
    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id = id;
       
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }   
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }   
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public String getFullName(){
        return fullName;
    }
    public void setFullName(String fullName){
        this.fullName = fullName;
    }
    public List<String> getFavourites(){
        return favourites;
    }
    public void setFavourites(List<String> favourites){
        this.favourites = favourites;
    }
    public List<String> getFoodPreferences() {
        return foodPreferences;
    }
    public void setFoodPreferences(List<String> foodPreferences) {
        this.foodPreferences = foodPreferences;
    }
}
