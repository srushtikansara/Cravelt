package com.cravelt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cravelt.model.Review;
import com.cravelt.model.User;
import com.cravelt.repository.ReviewRepository;
import com.cravelt.repository.UserRepository;
@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class ReviewController {
    
    @Autowired 
    private ReviewRepository reviewRepository;
   @Autowired
    private UserRepository userRepository;

    @PostMapping
    public Review addReview(@RequestBody Review review){

    // 🔍 Find user by ID
    User user = userRepository.findById(review.getUserId()).orElse(null);

    if(user != null){
        review.setUserName(user.getName()); // ✅ dynamic name
    } else {
        review.setUserName("Unknown"); // fallback
    }

    return reviewRepository.save(review);
}

    @GetMapping
    public List<Review> getAllReviews(){
        return reviewRepository.findAll();
    }

    // ✅ MAIN FIX
    @GetMapping("/{id}")
    public List<Review> getReviewsByRestaurantId(@PathVariable String id) {
        return reviewRepository.findByRestaurantId(id);
    }

    @GetMapping("/user/{id}")
    public List<Review> getReviewsByUserId(@PathVariable String id) {
        return reviewRepository.findByUserId(id);
    }
}