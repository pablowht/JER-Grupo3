package com.example.demo;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.web.socket.WebSocketSession;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;

public class WebSocketEchoHandler extends TextWebSocketHandler {
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();


	//Notificar cuando un usuario se ha conectado
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception
    {
        System.out.println("New Session with ID: " + session.getId());
    	sessions.put(session.getId(), session);
    }

	//Notificar cuando un usuario se ha desconectado
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception
    {
    	System.out.println("Closed Session with ID: " + session.getId());
    	sessions.remove(session.getId());
    }

    //Para los Mensajes del Chat
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception
    {
    	JsonNode node = mapper.readTree(message.getPayload());
    	sendOtherParticipants(session, node);
    }
    
    //Métodos para enviar información a otros participantes
    private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException
    {
    	ObjectNode newNode = mapper.createObjectNode();

    	if(node.get("id")!= null) // ID DE CADA JUGADOR
    	{
    		newNode.put("id", node.get("id").asInt());
    	}
    	
   		if(node.get("positionX")!= null) //POSICIONES
   		{
   			newNode.put("positionX",node.get("positionX").asInt());
   		}
   		
   		if(node.get("positionY")!= null) //POSICIONES
   		{
   			newNode.put("positionY",node.get("positionY").asInt());
   		}

   		if(node.get("animationFrame")!= null) //EL FRAME DE LA ANIMACIÓN
        {
            newNode.put("animationFrame", node.get("animationFrame").asInt());
        }
   		
    	if(node.get("ratonReady")!= null) //SABER SI EL OTRO PLAYER ESTÁ READY PARA JUGAR
    	{
   			newNode.put("ratonReady", node.get("ratonReady").asBoolean());
    	}
   		
    	if(node.get("ratonSeleccionado")!= null) //Para el ratón fijado por el jugador
    	{
    		newNode.put("ratonSeleccionado", node.get("ratonSeleccionado").asBoolean());
    	}
    	
    	////////////
    	if(node.get("skin")!= null) //Lo mismo del tipo xd
    	{
    		newNode.put("skin", node.get("skin").asInt());
        }
    	
        if(node.get("ready")!= null) //?
        {
            newNode.put("ready", node.get("ready").asInt());
        }

        if(node.get("text")!= null) //?
        {
            newNode.put("text", node.get("text").asInt());
        }

    	if(node.get("type")!= null) //NO SE
    	{
    		newNode.put("type", node.get("type").asText());
    	}

    	////////////
   		for(WebSocketSession participant: sessions.values())
   		{
   			if(!participant.getId().equals(session.getId()))
   			{
   				participant.sendMessage(new TextMessage(newNode.toString()));
   			}
   		}
   	}
}