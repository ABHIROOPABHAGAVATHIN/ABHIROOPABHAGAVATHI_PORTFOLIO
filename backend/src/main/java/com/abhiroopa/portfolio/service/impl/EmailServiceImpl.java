package com.abhiroopa.portfolio.service.impl;

import com.abhiroopa.portfolio.entity.ContactMessage;
import com.abhiroopa.portfolio.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;

@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;

    @Value("${portfolio.owner-email:forvsbclguse@gmail.com}")
    private String ownerEmail;

    @Value("${spring.mail.username:forvsbclguse@gmail.com}")
    private String fromEmail;

    @Autowired
    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendOwnerNotification(ContactMessage message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, StandardCharsets.UTF_8.name());

            helper.setFrom(fromEmail);
            helper.setTo(ownerEmail);

            String mailSubject = (message.getSubject() != null && !message.getSubject().isBlank())
                    ? "[Portfolio Contact] " + message.getSubject()
                    : "[Portfolio Contact] New message from " + message.getName();

            helper.setSubject(mailSubject);
            helper.setReplyTo(message.getEmail());

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDate = message.getCreatedAt() != null ? message.getCreatedAt().format(formatter) : "N/A";

            String bodyText = String.format(
                    "New message received from your portfolio.\n\n" +
                    "Name: %s\n" +
                    "Email: %s\n" +
                    "Company: %s\n" +
                    "Purpose: %s\n" +
                    "Subject: %s\n\n" +
                    "Message:\n%s\n\n" +
                    "Received at: %s\n",
                    message.getName(),
                    message.getEmail(),
                    message.getCompany() != null ? message.getCompany() : "N/A",
                    message.getPurpose() != null ? message.getPurpose() : "N/A",
                    message.getSubject() != null ? message.getSubject() : "N/A",
                    message.getMessage(),
                    formattedDate
            );

            helper.setText(bodyText);
            mailSender.send(mimeMessage);
            logger.info("Owner notification email sent successfully to {} for message ID: {}", ownerEmail, message.getId());
        } catch (Exception e) {
            logger.error("Failed to send owner notification email for message ID: {}. Reason: {}", message.getId(), e.getMessage());
        }
    }

    @Override
    public void sendVisitorAcknowledgement(ContactMessage message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, StandardCharsets.UTF_8.name());

            helper.setFrom(fromEmail);
            helper.setTo(message.getEmail());
            helper.setSubject("Thanks for contacting Abhiroopa");

            String bodyText = String.format(
                    "Hi %s,\n\n" +
                    "Thank you for reaching out through my portfolio.\n" +
                    "I've received your message and will get back to you shortly.\n\n" +
                    "Best regards,\n" +
                    "Abhiroopa Bhagavathi N\n" +
                    "BE Computer Science & Engineering\n" +
                    "Java | Spring Boot | SaaS | AI\n",
                    message.getName()
            );

            helper.setText(bodyText);
            mailSender.send(mimeMessage);
            logger.info("Visitor acknowledgement email sent successfully to: {}", message.getEmail());
        } catch (Exception e) {
            logger.error("Failed to send visitor acknowledgement email to: {}. Reason: {}", message.getEmail(), e.getMessage());
        }
    }
}
