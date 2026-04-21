package com.cravelt.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cravelt.model.Email;
import com.cravelt.service.EmailService;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }
@PostMapping("/send")
public Email sendEmail(@RequestBody Email email) {
    return emailService.sendEmail(
        email.getToAddress(),
        email.getSubject(),
        email.getBody()
    );
}

    }
