package com.example.demo;

public class User {
	private String user;
	private String password;
	private int recordObstacles; 
	
	public User() {}
	
	public User(String _user, String _password) {
		this.user = _user;
		this.password = _password;
		this.recordObstacles = 50;
	}
	
	
	public String getUser() {
		return user;
	}
	public void setUser(String _user) {
		this.user = _user;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String _password) {
		this.password = _password;
	}
	
	public int getRecordObstacles() {
		return recordObstacles;
	}
	public void setRecordObstacles(int _recordObstacles) {
		if(_recordObstacles < this.recordObstacles) {
			this.recordObstacles = _recordObstacles;
		}
	}
}
