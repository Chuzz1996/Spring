/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hcadavid
 */
@RestController
@RequestMapping(value = "/blueprints")
@Service
public class BlueprintAPIController {
        
    @Autowired
    BlueprintsServices bp = null;
    
    public BlueprintsServices getBlueprintsServices(){
        return bp;
    }
    
    public void setBlueprintsServices(BlueprintsServices bp){
        this.bp = bp;
    }
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> manejadorGetRecursoXX(){
        try{
            Set<Blueprint> data = bp.getAllBlueprints();
            return new ResponseEntity<>(data,HttpStatus.ACCEPTED);
        }catch(BlueprintNotFoundException ex){
            return new ResponseEntity<>("Error bla bla bla",HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(path = "/{author}", method = RequestMethod.GET)
    public Set<Blueprint> findOwner(@PathVariable String author){
        try{
            return bp.getBlueprintsByAuthor(author);
        }catch(BlueprintNotFoundException ex){
            return null;
        }
    }
    
    @RequestMapping(path = "/{author}/{name}", method = RequestMethod.GET)
    public Blueprint findMultiple(@PathVariable String author, @PathVariable String name){
        try{
            return bp.getBlueprint(author, name);
        }catch(BlueprintNotFoundException e){
            return null;
        }
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> manejadorPostRecursosXX(@RequestBody Blueprint blup){
        try{
            bp.addNewBlueprint(blup);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(BlueprintPersistenceException ex){
            return new ResponseEntity<>("Error bla bla bla",HttpStatus.FORBIDDEN); 
        }
        
    }
    
    @RequestMapping(path = "/{author}/{bpname}", method = RequestMethod.GET)
    public Blueprint myself(@PathVariable String author, @PathVariable String bpname){
        try{
            return bp.getBlueprint(author, bpname);
        }catch(BlueprintNotFoundException ex){
            return null;
        }
    }
    
    @RequestMapping(path = "/{author}/{bpname}", method = RequestMethod.PUT)
    public ResponseEntity<?> putNewThings(@PathVariable String author, @PathVariable String bpname){
        return null;
    }
}

