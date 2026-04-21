package com.cravelt.service;

import java.time.LocalDateTime;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cravelt.model.Email;
import com.cravelt.repository.EmailRepository;

@Service
public class EmailService {

    private final EmailRepository emailRepository;
    private final JavaMailSender mailSender;
    public EmailService(EmailRepository emailRepository, JavaMailSender mailSender) {
        this.emailRepository = emailRepository;
        this.mailSender = mailSender;
    }

    public Email sendEmail(String to, String subject, String body) {

    Email email = new Email();
    email.setToAddress(to);
    email.setSubject(subject);
    email.setBody(body);
    email.setSentAt(LocalDateTime.now());

    try {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);

        email.setSent(true);

        // ✅ SAVE ONLY IF MAIL SUCCESS
        return emailRepository.save(email);

    } catch (Exception e) {
        email.setSent(false);
        System.out.println("Email failed: " + e.getMessage());

        // ❌ DO NOT SAVE if failing (for now)
        return email; 
    }
}
}
