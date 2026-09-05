package com.abhiroopa.portfolio.controller;

import com.abhiroopa.portfolio.dto.ContactRequest;
import com.abhiroopa.portfolio.dto.ContactResponse;
import com.abhiroopa.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactResponse> submitContactForm(@Valid @RequestBody ContactRequest request) {
        ContactResponse response = contactService.processContactForm(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
