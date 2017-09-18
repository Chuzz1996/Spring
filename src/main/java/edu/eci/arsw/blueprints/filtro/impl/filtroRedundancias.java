/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.filtro.impl;

import edu.eci.arsw.blueprints.filtro.filtro;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author 2105409
 */
@Service
public class filtroRedundancias implements filtro{

    @Override
    public Blueprint filtro(Blueprint print) {
        List<Point> points = print.getPoints();
        Blueprint bp = new Blueprint(print.getAuthor(), print.getName());
        List<Point> puntos = new ArrayList<>();
        for(int i = 0; i < points.size(); i++){
            boolean pasa = false;
            for(int j = 0; j < puntos.size(); j++){
                if(puntos.get(j).getX()==points.get(i).getX() &&
                        puntos.get(j).getY()==points.get(i).getY()){
                    pasa = true;
                }
            }if(!pasa)puntos.add(points.get(i));
        }
        for(int i = 0; i < puntos.size(); i++){
            bp.addPoint(puntos.get(i));
        }
        return bp;
    }
     
    

}
