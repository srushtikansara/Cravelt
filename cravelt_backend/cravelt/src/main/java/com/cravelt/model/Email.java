package com.cravelt.model;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "emails")
public class Email {
   @Id
   private String id;
   private String toAddress;
   private String subject;
   private String body;
   private boolean sent;
   private LocalDateTime sentAt;

   public Email()
    {}

    public Email (String toAddress, String subject, String body, boolean sent, LocalDateTime sentAt){
        this.toAddress = toAddress;
        this.subject = subject;
        this.body = body;
        this.sent = sent;
        this.sentAt = sentAt;
    }
    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id=id;
    }
    public String getToAddress(){
        return toAddress;
    }
    public void setToAddress(String toAddress){
        this.toAddress = toAddress;
    }
    public String getSubject(){
        return subject;
    }
    public void setSubject(String subject){
        this.subject = subject;
    }
    public String getBody(){
        return body;
    }
    public void setBody(String body){
        this.body = body;
    }
    public boolean isSent(){
        return sent;
    }
    public void setSent(boolean sent){
        this.sent = sent;
    }
    public LocalDateTime getSentAt(){
        return sentAt;
    }
    public void setSentAt(LocalDateTime sentAt){
        this.sentAt = sentAt;
    }
}
