/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import org.springframework.stereotype.Service;

/**
 *
 * @author hcadavid
 */
@Service
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final ConcurrentMap<Tuple<String,String>,Blueprint> blueprints=new ConcurrentHashMap<>();
    

    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts=new Point[]{new Point(140, 140),new Point(115, 115)};
        Blueprint bp=new Blueprint("_authorname_", "_bpname_ ",pts);
        blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        Blueprint bp1 = new Blueprint("Felipe", "primera prueba", pts);
        Blueprint bp2 = new Blueprint("Felipe", "segunda prueba", pts);
        Blueprint bp3 = new Blueprint("Losada", "Ultima prueba", pts);
        try{
            this.saveBlueprint(bp1);
            this.saveBlueprint(bp2);
            this.saveBlueprint(bp3);
        }catch(BlueprintPersistenceException e){}
    }    
    
    @Override
    public synchronized void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }        
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        return blueprints.get(new Tuple<>(author, bprintname));
    }

    @Override
    public Set<Blueprint> getBlueprintByAutor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> tmp = new HashSet<>();
        for(Tuple<String,String> xx: blueprints.keySet()){
            if(xx.getElem1().equals(author)){
                tmp.add(blueprints.get(xx));
            }
        }return tmp;
    }

    @Override
    public Set<Blueprint> getAllBlueprints() throws BlueprintNotFoundException {
        Set<Blueprint> res = new HashSet<>();
        for(Blueprint xx: blueprints.values()){
            res.add(xx);
        }return res;
    }

    @Override
    public synchronized void updateBlueprint(String author, String bprintname, Point point) throws BlueprintPersistenceException {
        if(blueprints.containsKey(new Tuple<>(author,bprintname))){
            blueprints.get(new Tuple<>(author,bprintname)).addPoint(point);
        }else{
            throw new BlueprintPersistenceException("I cant update a"+ author +"becase it didnt add");
        }
    }

    @Override
    public synchronized void updateBlueprint(String author, String bprintname, List<Point> point) throws BlueprintPersistenceException {
        if(blueprints.containsKey(new Tuple<>(author,bprintname))){
            Blueprint bp = blueprints.get(new Tuple<>(author,bprintname));
            for(Point x:point){
                bp.addPoint(x);
            }
        }else{
            throw new BlueprintPersistenceException("I cant update a"+ author +"becase it didnt add");
        }
    }
    
}
