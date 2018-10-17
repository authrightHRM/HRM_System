package com.authright.demo.controller;

import com.authright.demo.entity.Client;
import com.authright.demo.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @RequestMapping("/create")
    @PreAuthorize("hasRole('ROLE_MANAGER') OR hasRole('ROLE_ADMIN')")
    public Client createClient(@RequestBody Client client) {

        return clientService.addClient(client);
    }

    @RequestMapping("/update")
    @PreAuthorize("hasRole('ROLE_MANAGER') OR hasRole('ROLE_ADMIN')")
    public Client updateClient(@RequestBody Client client) {

        if (client.getClientId() <= 0) {
            return clientService.addClient(client);
        }
        return clientService.updateClient(client);
    }

    @RequestMapping("/getAllClients")
    @PreAuthorize("hasRole('ROLE_MANAGER') OR hasRole('ROLE_ADMIN')")
    public List<Client> getAllClient() {

        return clientService.getAllClients();
    }
}
