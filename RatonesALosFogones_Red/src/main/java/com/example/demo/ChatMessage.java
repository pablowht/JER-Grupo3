package com.example.demo;

public class ChatMessage {
	private String user;
	private String message;
	
	public ChatMessage(String _user, String _message) {
		this.user = _user;
		this.message = _message;
	}

	public String getUser() {
		return this.user;
	}

	public void setUser(String _user) {
		this.user = _user;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String _message) {
		this.message = _message;
	}
}
