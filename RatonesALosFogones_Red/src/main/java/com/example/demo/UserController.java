package com.example.demo;

import java.util.HashMap;
import java.util.Map;
import java.io.*;
import java.util.Scanner;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {

	private Map<String, User> usersMap = new HashMap<String, User>();
	
	private Map<String, User> activeUsers = new HashMap<String, User>();
	
	String usersFileURL =  System.getProperty("user.dir") + "/src/main/resources/static/dataSaving/usersData.txt";
	String tempUsersFileURL =  "src/main/resources/static/dataSaving/tempUsersData.txt";

	public UserController() 
	{
		try 
		{
			File obj = new File(usersFileURL);
			Scanner reader = new Scanner(obj);
			
			while (reader.hasNextLine()) {
				String data[] = reader.nextLine().split(";");
				User auxUser = new User(data[0], data[1]);
				
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
	public User getUser(@PathVariable("user") String username) {
		if (usersMap.containsKey(username))
		{
			User user = usersMap.get(username);
			
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
		String username = newUser.getUser();
		
		activeUsers.put(username, newUser);
		
		return true;
	}
	
	@PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User newUser)
    {
    	String username = newUser.getUser();
    	String password = newUser.getPassword();

    	if(usersMap.containsKey(username) == false)
    	{
    		System.out.println("El usuario no está guardado");
    		usersMap.put(username, newUser); 
    		activeUsers.put(username, newUser);
    		
            try (Writer writer = new BufferedWriter(new FileWriter(usersFileURL, true)))
            {
                String contents = "";
                contents = newUser.getUser() + ";" + newUser.getPassword() + System.getProperty("line.separator");
                
                writer.write(contents);
                writer.close();
                System.out.println("User written succesfully");
                
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("Error writing user");
            }
    		return new ResponseEntity<>(newUser,HttpStatus.OK);
    	}
    	
    	System.out.println("User already exist");
    	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
	
	@PostMapping("/usersLogin")
    public ResponseEntity<User> loginUser(@RequestBody User newUser)
    {
    	String username = newUser.getUser();
    	String password = newUser.getPassword();
    	
    	if(usersMap.containsKey(username) == true)
    	{
    		System.out.println("Contains User");
    		if(usersMap.get(username).getPassword().equals(password))
    	    {
    			System.out.println("User and Password exist");
    			return new ResponseEntity<>(newUser,HttpStatus.OK);
    	    }
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	} 
	    System.out.println("User dont Exist");
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
	
	//MÉTODO PUT:
	@PutMapping("/users/{user}")
	public ResponseEntity<User> changePassword(@RequestBody User newUser) {
		if (usersMap.containsKey(newUser.getUser()) == true && !usersMap.get(newUser.getUser()).getPassword().equals(newUser.getPassword()))
		{
			try {
				deleteUser(newUser.getUser());
				createUser(newUser);
			} catch (IOException e) {
				e.printStackTrace();
			}
			return new ResponseEntity<>(newUser,HttpStatus.OK);
		}
// 		else if(usersMap.containsKey(newUser.getUser()) && usersMap.get(newUser.getUser()).getPassword().equals(newUser.getPassword()))
// 		{
// 			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
// 		}
// 		else {
// 			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
// 		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	//MÉTODOS DELETE:
	@DeleteMapping("/activeUsers")
    public void closeSession(@PathVariable("_user") String username)throws IOException{
 	   if(activeUsers.containsKey(username)) {
 		   activeUsers.remove(username);
 		   System.out.println("Un usuario se ha desconectado.");
 	   }
    }
	
	@DeleteMapping("/activeUsers/{username}")
   	public void deleteCurrentUser(@PathVariable String username)throws IOException{
		if(activeUsers.containsKey(username)) {
		   activeUsers.remove(username);
		   System.out.println("Un usuario se ha desconectado.");
		}
   }
	    
	@DeleteMapping("/users/{username}")
	public void deleteUser(@PathVariable String username) throws IOException {
	   if(usersMap.containsKey(username))
	   {
		   User deleteUser = usersMap.get(username);
		   
		   File inputFile = new File(usersFileURL);
		   File tempFile = new File(tempUsersFileURL);

		   BufferedReader reader = new BufferedReader(new FileReader(inputFile));
		   BufferedWriter writer = new BufferedWriter(new FileWriter(tempFile));

		   String lineToRemove = deleteUser.getUser() + ";" + deleteUser.getPassword();
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
		   
		   activeUsers.remove(username);
		   usersMap.remove(username);
	   }
	}	
}
