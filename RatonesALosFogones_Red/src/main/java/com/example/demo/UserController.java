package com.example.demo;

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
		System.out.println("userMap" + usersMap);
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
	
	@PostMapping("/users")
    public boolean addUser(@RequestBody User newUser) 
    {
    	String username = newUser.getUser();
    	String password = newUser.getPassword();

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
	
	//MÉTODO PUT:
	@PutMapping("/users/{user}")
	public boolean changePassword(@RequestBody User newUser) {
		//User userAux = new User( usersMap.get(newUser).getUser(), usersMap.get(newUser).getPassword());
		System.out.println("comprobación atributos del método put:\n contraseña argumento: "+ newUser.getPassword() + "\tUsuario recibido: "+ newUser.getUser());
		if (usersMap.containsKey(newUser.getUser()) && !usersMap.get(newUser.getUser()).getPassword().equals(newUser.getPassword()))
		{
			System.out.println("entraste a cambiar la contraseña");
			//usersMap.get(newUser.getUser()).setPassword(newUser.getPassword());
			
			System.out.println("usuario a cambiar: " + newUser.getUser() + "\t\tcontraseña nueva: " + newUser.getPassword());
			System.out.println("comprobación de cambio de contraseña: " + usersMap.get(newUser.getUser()).getUser() + "\t\tcomprobación contraseña nueva: " + usersMap.get(newUser.getUser()).getPassword());			try {
				System.out.println("entraste a borrar usuario y añadirlo");
				deleteUser(newUser.getUser());
				addUser(newUser);
			} catch (IOException e) {
				e.printStackTrace();
			}
				
			throw new ResponseStatusException(HttpStatus.OK, "user password is changed succesfully");
		}
		else if(usersMap.containsKey(newUser.getUser()) && usersMap.get(newUser.getUser()).getPassword().equals(newUser.getPassword()))
		{
			System.out.println("no se ha poducido cambiar la contraseña, contraseñas iguales");
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "the new password is the same with the last");
		}
		else {
			System.out.println("no se ha encontrado ningun usuario con ese nombre");
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found");
		}
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
   	public void deleteCurrentUser(@PathVariable("_user") String username)throws IOException{
	   if(activeUsers.containsKey(username)) {
		   activeUsers.remove(username);
		   System.out.println("Un usuario se ha desconectado.");
	   }
   }
	    
	@DeleteMapping("/users/{username}")
	public void deleteUser(@PathVariable("_user") String username) throws IOException {
  
	   if(usersMap.containsKey(username))
	   {
		   User deleteUser = usersMap.get(username);
		   
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
		   
		   activeUsers.remove(username);
		   usersMap.remove(username);
	   }
	}	
}
