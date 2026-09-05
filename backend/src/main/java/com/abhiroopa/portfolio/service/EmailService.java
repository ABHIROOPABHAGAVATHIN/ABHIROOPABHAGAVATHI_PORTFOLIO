package com.abhiroopa.portfolio.service;

import com.abhiroopa.portfolio.entity.ContactMessage;

public interface EmailService {
    void sendOwnerNotification(ContactMessage message);
    void sendVisitorAcknowledgement(ContactMessage message);
}
