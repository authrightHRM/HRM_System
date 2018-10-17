package com.authright.demo.repository;

import com.authright.demo.entity.Client;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface ClientRepository extends CrudRepository<Client, Integer> {
    List<Client> findAll();
}
