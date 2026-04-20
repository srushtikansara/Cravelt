package com.cravelt.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.cravelt.model.Reservation;

public interface ReservationRepository extends MongoRepository<Reservation, String> {
}