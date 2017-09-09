/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.test.filtro.impl;

import edu.eci.arsw.blueprints.filtro.filtro;
import edu.eci.arsw.blueprints.filtro.impl.filtroRedundancias;
import edu.eci.arsw.blueprints.filtro.impl.filtroSubmuestreo;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.impl.InMemoryBlueprintPersistence;
import java.util.List;
import org.junit.Assert;
import static org.junit.Assert.assertTrue;
import org.junit.Test;

/**
 *
 * @author 2105409
 */
public class filtroTest {
    
    @Test
    public void buenFiltroSubmuestreo(){
        filtro filter = new filtroSubmuestreo();
        
        Point[] pts=new Point[]{new Point(10, 10),new Point(20, 20), new Point(30,30)};
        Point[] ptsPru = new Point[]{new Point(10, 10), new Point(30, 30)};
        Blueprint bp = new Blueprint("Pipe", "pruebas",pts);
        
        Blueprint print = filter.filtro(bp);
        List<Point> puntos = print.getPoints();
        assertTrue(puntos.size()==ptsPru.length);
        for(int i = 0; i < puntos.size(); i++){
            assertTrue(puntos.get(i).getX()==ptsPru[i].getX());
            assertTrue(puntos.get(i).getY()==ptsPru[i].getY());
        }
    }
    
    @Test
    public void buenFiltroRedundancias(){
        filtro filter = new filtroRedundancias();
        Point[] pts=new Point[]{new Point(10, 10),new Point(10, 10), new Point(30,30)};
        Point[] ptsPru = new Point[]{new Point(10, 10), new Point(30, 30)};
        Blueprint bp = new Blueprint("Pipe", "pruebas",pts);
        
        Blueprint print = filter.filtro(bp);
        List<Point> puntos = print.getPoints();
        assertTrue(puntos.size()==ptsPru.length);
        for(int i = 0; i < puntos.size(); i++){
            assertTrue(puntos.get(i).getX()==ptsPru[i].getX());
            assertTrue(puntos.get(i).getY()==ptsPru[i].getY());
        }
    }
}
