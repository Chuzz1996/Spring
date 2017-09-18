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
        Blueprint newPrint = new Blueprint(print.getAuthor(), print.getName());
        List<Point> points = print.getPoints();
        for (int i = 0; i < points.size(); i++) {
            if(i % 2 == 0) newPrint.addPoint(points.get(i));
        }
        return newPrint;
    }
    
}
