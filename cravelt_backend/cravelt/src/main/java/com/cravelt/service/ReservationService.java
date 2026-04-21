package com.cravelt.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cravelt.model.Reservation;
import com.cravelt.model.Restaurant;
import com.cravelt.repository.ReservationRepository;
import com.cravelt.repository.RestaurantRepository;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private EmailService emailService; // ✅ for sending email
     public Reservation saveReservation(Reservation reservation) {
    reservation.setStatus("PENDING"); // default
    return reservationRepository.save(reservation);
}
    // ✅ GET ALL RESERVATIONS
   public List<Map<String, Object>> getAllReservations() {
    List<Reservation> reservations = reservationRepository.findAll();

    return reservations.stream().map(r -> {
        Map<String, Object> map = new HashMap<>();

        map.put("id", r.getId());
        map.put("name", r.getName());
        map.put("email", r.getEmail());
        map.put("date", r.getDate());
        map.put("status", r.getStatus());
        map.put("guests", r.getGuests());

        String restaurantName = "Unknown Restaurant"; // default value

        // ✅ SAFE CHECK (prevents 500 error)
        if (r.getRestaurantId() != null && !r.getRestaurantId().isEmpty()) {
            Restaurant restaurant = restaurantRepository
                    .findById(r.getRestaurantId())
                    .orElse(null);

            if (restaurant != null) {
                restaurantName = restaurant.getName();
            }
        }

        map.put("restaurantName", restaurantName);

        return map;
    }).toList();
}
        

    // ✅ DELETE RESERVATION
    public void deleteReservation(String id) {
        reservationRepository.deleteById(id);
    }

    // ✅ CONFIRM RESERVATION + SEND EMAIL
    public Reservation confirmReservation(String id) {
    Reservation r = reservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reservation not found"));

    // ✅ update status
    r.setStatus("CONFIRMED");
    Reservation saved = reservationRepository.save(r);

    // 🔥 Get restaurant name
    Restaurant restaurant = restaurantRepository.findById(saved.getRestaurantId()).orElse(null);
    String restaurantName = (restaurant != null) ? restaurant.getName() : "Restaurant";

    // ✅ Prepare email body
    String body = "Hi " + saved.getName() + ",\n\n" +
            "Your table at " + restaurantName + " is confirmed.\n" +
            "📅 Date: " + saved.getDate() + "\n" +
            "👥 Guests: " + saved.getGuests() + "\n\n" +
            "See you soon! 😊";

    // ✅ Send email if email is valid
    if (saved.getEmail() != null && !saved.getEmail().isEmpty()) {
        emailService.sendEmail(saved.getEmail(), "Booking Confirmed 🍽️", body);
    }

    return saved;
}
}