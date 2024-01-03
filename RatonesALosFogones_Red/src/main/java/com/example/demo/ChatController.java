package com.example.demo;

import java.io.*;
import java.util.Scanner;
import java.util.Stack;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ChatController {
	Stack<String> messages = new Stack<String>();
	String charFileURL = "src/main/resources/static/dataSaving/chatData.txt";

	public ChatController()
    	{
    		try
    		{
    			File obj = new File(charFileURL);
    			Scanner reader = new Scanner(obj);

    			while (reader.hasNextLine()) {
    				String data[] = reader.nextLine().split(";");
    				ChatMessage auxMessage = new ChatMessage(data[0], data[1]);
    				
    				String contents = auxMessage.getUser() + ": " + auxMessage.getMessage();
    				
    				messages.add(contents);
    			}

    			reader.close();

    		}catch(FileNotFoundException e)
    		{
    			System.out.println("Error reading the chat");
    			e.printStackTrace();
    		}
    	}

	@GetMapping("/allMessages")
	public Stack<String> getAllMessages(){
		return messages;
	}
	
	@GetMapping("/chat/{i}")
	public ResponseEntity<String> getMessageAPI(@PathVariable("i") String i) {
		int size = messages.size();
		String message = "";
		
		if(i.equals("0") && size>=1) {
			message = messages.get(size-1);
		}
		if(i.equals("1") && size>=2) {
			message = messages.get(size-2);
		}
		if(i.equals("2") && size>=3) {
			message = messages.get(size-3);
		}
		if(i.equals("3") && size>=4) {
			message = messages.get(size-4);
		}
		if(i.equals("4") && size>=5) {
			message = messages.get(size-5);
		}
		if(i.equals("5") && size>=6) {
			message = messages.get(size-6);
		}
		if(i.equals("6") && size>=7) {
			message = messages.get(size-7);
		}
			
		return new ResponseEntity<>(message,HttpStatus.OK);
	}
	
	@PostMapping("/chat")
	public void postMessage(@RequestBody ChatMessage message) throws FileNotFoundException{
		System.out.println("entraste a post mensaje");
		String contents = "";
		contents = message.getUser() + ": " + message.getMessage()+System.getProperty("line.separator");
		try(Writer writer = new BufferedWriter(new FileWriter (charFileURL, true))){
			writer.write(contents);
			writer.close();
			System.out.println("Message: user: " + message.getUser() + "\tmessage: "+message.getMessage());
			System.out.println("Message written succesfully");
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Error writing message");
		}
		messages.add(contents);
	}

}
