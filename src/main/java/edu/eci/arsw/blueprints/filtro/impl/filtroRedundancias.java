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
        List<Point> puntosTmp = print.getPoints();
        ArrayList<Point> puntosSiguientes = new ArrayList<>();
        if(puntosTmp.size()>0)puntosSiguientes.add(puntosTmp.get(0));
        for(int i = 1; i < puntosTmp.size(); i++){
            boolean agregar = true;
            for(int j = 0; j < puntosSiguientes.size(); j++){
                if((puntosSiguientes.get(j).getX()==puntosTmp.get(i).getX()) && (puntosSiguientes.get(j).getY()==puntosTmp.get(i).getY())){
                    agregar = false;
                }
            }if(agregar) puntosSiguientes.add(puntosTmp.get(i));
        }
        Point[] puntos = new Point[puntosTmp.size()];
        for(int i = 0; i < puntosTmp.size(); i++) puntos[i] = puntosSiguientes.get(i);
        return new Blueprint(print.getAuthor(), print.getName(), puntos);
    }
     
    

}
