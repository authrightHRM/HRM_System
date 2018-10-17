package com.authright.demo.service;


import com.authright.demo.entity.Client;
import java.util.List;

public interface ClientService {

    List<Client> getAllClients();
    Client addClient(Client client);
    Client updateClient(Client client);
}
