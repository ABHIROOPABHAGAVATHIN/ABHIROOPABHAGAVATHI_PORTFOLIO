package com.abhiroopa.portfolio.service;

import com.abhiroopa.portfolio.dto.ContactRequest;
import com.abhiroopa.portfolio.dto.ContactResponse;

public interface ContactService {
    ContactResponse processContactForm(ContactRequest request);
}
