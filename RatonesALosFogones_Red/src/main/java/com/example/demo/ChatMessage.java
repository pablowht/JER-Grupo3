package com.example.demo;

public class ChatMessage {
	private String user;
	private String message;
	
	public ChatMessage(String _user, String _message) {
		this.setUser(_user);
		this.setMessage(_message);
	}

	public String getUser() {
		return user;
	}

	public void setUser(String _user) {
		this.user = _user;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String _message) {
		this.message = _message;
	}
}
