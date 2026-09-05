package com.abhiroopa.portfolio.service.impl;

import com.abhiroopa.portfolio.dto.ContactRequest;
import com.abhiroopa.portfolio.dto.ContactResponse;
import com.abhiroopa.portfolio.entity.ContactMessage;
import com.abhiroopa.portfolio.repository.ContactRepository;
import com.abhiroopa.portfolio.service.ContactService;
import com.abhiroopa.portfolio.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final EmailService emailService;

    @Autowired
    public ContactServiceImpl(ContactRepository contactRepository, EmailService emailService) {
        this.contactRepository = contactRepository;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public ContactResponse processContactForm(ContactRequest request) {
        ContactMessage contactMessage = new ContactMessage();
        contactMessage.setName(request.getName().trim());
        contactMessage.setEmail(request.getEmail().trim().toLowerCase());
        contactMessage.setCompany(request.getCompany() != null ? request.getCompany().trim() : null);
        contactMessage.setPurpose(request.getPurpose() != null ? request.getPurpose().trim() : null);
        contactMessage.setSubject(request.getSubject() != null ? request.getSubject().trim() : null);
        contactMessage.setMessage(request.getMessage().trim());
        contactMessage.setStatus("NEW");
        contactMessage.setCreatedAt(LocalDateTime.now());

        // 1. Save message entity to MySQL database
        ContactMessage savedMessage = contactRepository.save(contactMessage);

        // 2. Dispatch real owner notification email (Reply-To visitor email)
        emailService.sendOwnerNotification(savedMessage);

        // 3. Dispatch real visitor acknowledgement email
        emailService.sendVisitorAcknowledgement(savedMessage);

        return new ContactResponse(
                true,
                "Your message has been received successfully.",
                LocalDateTime.now()
        );
    }
}
