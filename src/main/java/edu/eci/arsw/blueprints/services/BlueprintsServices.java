/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.services;

import edu.eci.arsw.blueprints.filtro.filtro;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hcadavid
 */
@Service
public class BlueprintsServices {
   
    @Autowired
    BlueprintsPersistence bpp=null;
    
    @Autowired
    filtro filter = null;
    
    public void addNewBlueprint(Blueprint bp)throws BlueprintPersistenceException{
        bpp.saveBlueprint(bp);
    }
    
    public filtro getFiltro(){
        return filter;
    }
    
    public void setFiltro(filtro filter){
        this.filter = filter;
    }
    
    public Set<Blueprint> getAllBlueprints()throws BlueprintNotFoundException{
        Set<Blueprint> res = new HashSet<>();
        Set<Blueprint> tmp = bpp.getAllBlueprints();
        for(Blueprint xx : tmp){
            res.add(filter.filtro(xx));
        }
        return res;
    }
    
    public void setBlueprintsPersistence(BlueprintsPersistence bpp){
        this.bpp = bpp;
    }
    
    public BlueprintsPersistence getBlueprintsPersistence(){
        return bpp;
    }
    
    /**
     * 
     * @param author blueprint's author
     * @param name blueprint's name
     * @return the blueprint of the given name created by the given author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author,String name) throws BlueprintNotFoundException{
        return filter.filtro(bpp.getBlueprint(author, name));
    }
    
    /**
     * 
     * @param author blueprint's author
     * @return all the blueprints of the given author
     * @throws BlueprintNotFoundException if the given author doesn't exist
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException{
        Set<Blueprint> tmp = bpp.getBlueprintByAutor(author);
        Set<Blueprint> printers = new HashSet<>();
        for(Blueprint xx:tmp){
            printers.add(filter.filtro(xx));
        }
        return printers;
    }
    
    /**
     * 
     * @param author
     * @param bprintname
     * @param point
     * @throws BlueprintPersistenceException 
     */
    public void updateBlueprints(String author, String bprintname, Point point)throws BlueprintPersistenceException{
        bpp.updateBlueprint(author, bprintname, point);
    }
    
    public void updateBlueprints(String author, String bprintname, List<Point> point)throws BlueprintPersistenceException{
        bpp.updateBlueprint(author, bprintname, point);
    }
    
    public void deleteBlueprint(String author, String bprintname)throws BlueprintPersistenceException{
        bpp.deleteBlueprint(author,bprintname);
    }
}
