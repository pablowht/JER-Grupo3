package com.example.demo;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.io.*;
import java.util.Scanner;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {

	private Map<String, User> usersMap = new HashMap<String, User>();
	
	private Map<String, User> activeUsers = new HashMap<String, User>();
	
	String usersFileURL = "src/main/resources/static/dataSaving/usersData.txt";
	String tempUsersFileURL = "src/main/resources/static/dataSaving/tempUsersData.txt"; 
	
	public UserController() 
	{
		try 
		{
			File obj = new File(usersFileURL);
			Scanner reader = new Scanner(obj);
			
			while (reader.hasNextLine()) {
				String data[] = reader.nextLine().split(";");
				User auxUser = new User(data[0], data[1]);
				
				auxUser.setRecordObstacles(Integer.parseInt(data[2]));
				usersMap.put(auxUser.getUser(), auxUser);
	
			}
			
			reader.close();
			
		}catch(FileNotFoundException e) 
		{
			System.out.println("Error reading the users");
			e.printStackTrace();
		}
	}
	
	//MÉTODOS GET:
	@GetMapping("/users")
	public Map<String, User> getUsers(){
		return usersMap;
	}
	
	@GetMapping("/activeUsers")
	public Map<String, User> getActiveUsers(){
		return activeUsers;
	}
	
	@GetMapping("/activeUsersNum")
	public int getActiveUsersNum() {
    	return activeUsers.size();
    }
	
	@GetMapping("/users/{user}")
	public User getUser(@PathVariable("user") String nickname) {
		if (usersMap.containsKey(nickname)) 
		{
			User user = usersMap.get(nickname);
			
			return user;
		}
		else 
		{
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found");
		}
	}
	
	//MÉTODOS POST:
	@PostMapping("/activeUsers")
	public boolean addCurrentUser(@RequestBody User newUser) 
	{
		String nickname = newUser.getUser(); 
		
		activeUsers.put(nickname, newUser);
		
		return true;
	}
	
	@PostMapping("/users")
    public boolean addUser(@RequestBody User newUser) 
    {
    	String username = newUser.getUser();
    	String password = newUser.getPassword();
    	System.out.println(username);
    	if(!usersMap.containsKey(username)) 
    	{
    		usersMap.put(username, newUser); 
    		activeUsers.put(username, newUser);
    		
            try (Writer writer = new BufferedWriter(new FileWriter(usersFileURL, true)))
            {
                String contents = "";
                contents = newUser.getUser() + ";" + newUser.getPassword() + ";" + newUser.getRecordObstacles() + System.getProperty("line.separator");
                
                writer.write(contents);
                writer.close();
                System.out.println("User written succesfully");
                
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("Error writing user");
            }
    		return true; 
    	} else { 
    		if(usersMap.get(username).getPassword().equals(password)) { 
    	    	activeUsers.put(username, newUser);

    			return true; 
    		} else 
    			return false; 
    	}	
    }
	
	//MÉTODOS DELETE:
	@DeleteMapping("/activeUsers")
    public void closeSession(@PathVariable("_user") String nick)throws IOException{
 	   if(activeUsers.containsKey(nick)) {
 		   activeUsers.remove(nick);
 		   System.out.println("Un usuario se ha desconectado.");
 	   }
    }
	
	@DeleteMapping("/activeUsers/{nick}")
   	public void deleteCurrentUser(@PathVariable("_user") String nick)throws IOException{
	   if(activeUsers.containsKey(nick)) {
		   activeUsers.remove(nick);
		   System.out.println("Un usuario se ha desconectado.");
	   }
   }
	    
	@DeleteMapping("/users/{nick}")
	public void deleteUser(@PathVariable("_user") String nick) throws IOException {
  
	   if(usersMap.containsKey(nick))
	   {
		   User deleteUser = usersMap.get(nick); 
		   
		   File inputFile = new File(usersFileURL);
		   File tempFile = new File(tempUsersFileURL);
	
		   BufferedReader reader = new BufferedReader(new FileReader(inputFile));
		   BufferedWriter writer = new BufferedWriter(new FileWriter(tempFile));
	
		   String lineToRemove = deleteUser.getUser() + ";" + deleteUser.getPassword() + ";" + deleteUser.getRecordObstacles();
		   String currentLine;
	
		   while((currentLine = reader.readLine()) != null) {
		       String trimmedLine = currentLine.trim();
		       
		       if(trimmedLine.equals(lineToRemove)) 
		    	   continue;
		       
		       writer.write(currentLine + System.getProperty("line.separator"));
		   }
		   writer.close(); 
		   reader.close();
		   
		   inputFile.delete();
		   boolean successful = tempFile.renameTo(inputFile);
		   
		   activeUsers.remove(nick);
		   
		   usersMap.remove(nick);
	   }
	}	
	
}
