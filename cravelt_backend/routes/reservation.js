const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
router.post("/",async(req,res) =>{
    try {
        console.log("Received reservation request:", req.body);
        const { restaurantId, name, email, guests, date, time, request } = req.body;
        if (!restaurantId || !name || !email || !guests || !date || !time ){
            return res.status(400).json({ error: "Missing required fields" });
        }
        const existing = await Reservation.findOne({restaurantId , date , time ,name});
        if(existing){
            return res.status(400).json({error:"Slot is already booked for this restaurant at the given date and time"});
        }
     const reservation = new Reservation({
        restaurantId,
        name,
        email,
        guests,
        date,
        time,
        request,
    });
    await reservation.save();
    res.status(201).json({ message: "Reservation created", reservation });
    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).json({ error: "Server error" });
    }
})
router.get("/",async (req,res) =>{
 try{
    const reservation = await Reservation.find();
    res.json(reservation);

 }
 catch(err){
    console.error("Error fetching reservations:", err);
    res.status(500).json({ error: "Server error" });
 }
})
module.exports = router;