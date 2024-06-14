package com.ivanfranchin.bookapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String token) {
        String subject = "Email Verification";
        String verificationUrl = "https://assistant.labellapartners.com/auth/verify?token=" + token;
        String body = "Please verify your email by clicking the following link: " + verificationUrl;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("assistant@labellapartners.com");
        message.setTo(to);
        System.out.println(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
