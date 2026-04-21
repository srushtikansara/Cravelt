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
import com.cravelt.service.ReservationService;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // ✅ GET
    @GetMapping
    public List<Map<String, Object>> getAllReservations() {
        return reservationService.getAllReservations();
    }

    // ✅ POST (THIS FIXES YOUR ERROR)
    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
    Reservation savedReservation = reservationService.saveReservation(reservation);
    
     Reservation confirmed = reservationService.confirmReservation(savedReservation.getId());

        return confirmed; // returns reservation with CONFIRMED status
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