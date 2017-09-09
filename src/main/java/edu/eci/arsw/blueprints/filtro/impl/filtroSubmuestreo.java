/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.filtro.impl;

import edu.eci.arsw.blueprints.filtro.filtro;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author 2105409
 */
public class filtroSubmuestreo implements filtro{

    @Override
    public Blueprint filtro(Blueprint print) {
        List<Point> tmp = print.getPoints();
        ArrayList<Point> puntosTmp = new ArrayList<>();
        for(int i = 0; i < tmp.size(); i++){
            if(i%2==0){
                puntosTmp.add(tmp.get(i));
            }
        }Point[] puntos = new Point[puntosTmp.size()];
        for(int i = 0; i < puntosTmp.size(); i++){
            puntos[i] = puntosTmp.get(i);
        }return new Blueprint(print.getAuthor(),print.getName(), puntos);
    }
    
}
