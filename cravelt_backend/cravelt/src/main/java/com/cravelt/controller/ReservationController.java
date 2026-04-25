package com.cravelt.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cravelt.model.Reservation;
import com.cravelt.service.EmailService;
import com.cravelt.service.ReservationService;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "${frontend.url}")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private EmailService emailService;

    // ✅ GET ALL
    @GetMapping
    public List<Map<String, Object>> getAllReservations() {
        return reservationService.getAllReservations();
    }

    // ✅ POST - Create reservation
    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        Reservation savedReservation = reservationService.saveReservation(reservation);
        Reservation confirmed = reservationService.confirmReservation(savedReservation.getId());

        // ✅ Use restaurantName instead of restaurantId in email
        String restaurantName = confirmed.getRestaurantName() != null
                ? confirmed.getRestaurantName()
                : "the restaurant";

        emailService.sendEmail(
            confirmed.getEmail(),
            "Reservation Confirmed at " + restaurantName,
            "Hi " + confirmed.getName() + ",\n\n" +
            "Your table at " + restaurantName + " has been booked! 🎉\n\n" +
            "📅 Date: " + confirmed.getDate() + "\n" +
            "⏰ Time: " + confirmed.getTime() + "\n" +
            "👥 Guests: " + confirmed.getGuests() + "\n\n" +
            "Thank you for choosing Cravelt!"
        );

        return confirmed;
    }

    // ✅ CONFIRM
    @PutMapping("/{id}/confirm")
    public Reservation confirm(@PathVariable String id) {
        return reservationService.confirmReservation(id);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        reservationService.deleteReservation(id);
    }
}