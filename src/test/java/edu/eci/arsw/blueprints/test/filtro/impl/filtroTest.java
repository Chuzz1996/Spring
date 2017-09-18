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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author 2105409
 */
public class filtroTest {
    
    @Test
    public void buenFiltroSubmuestreo(){
        filtro filtro = new filtroSubmuestreo();
        Point[] pts = new Point[]{new Point(0, 0), new Point(1, 10), new Point(1, 1), new Point(1, 1), new Point(1, 1)};
        List<Point> Points = new ArrayList<>();
        Points.add(new Point(0, 0));
        Points.add(new Point(1, 1));
        Points.add(new Point(1, 1));
        Blueprint bp = filtro.filtro(new Blueprint("Pipe", "pruebas", pts));
        List<Point> pointsFilters = bp.getPoints();
        assertTrue(Points.size()==pointsFilters.size());
        for (int i = 0; i < bp.getPoints().size(); i++){
            assertTrue(Points.get(i).getX()==pointsFilters.get(i).getX());
            assertTrue(Points.get(i).getY()==pointsFilters.get(i).getY());
        }
    }
    
    @Test
    public void buenFiltroRedundancias(){
        filtroRedundancias rbf = new filtroRedundancias();
        Point[] pts = new Point[]{new Point(0, 0), new Point(1, 10), new Point(1, 1), new Point(1, 1), new Point(1, 1)};
        ArrayList<Point> Points = new ArrayList<>();
        Points.add(new Point(0, 0));
        Points.add(new Point(1, 10));
        Points.add(new Point(1, 1));
        Blueprint bp = rbf.filtro(new Blueprint("pipe", "prueba", pts));
        List<Point> pointsFilters = bp.getPoints();
        assertTrue(Points.size()==pointsFilters.size());
        for (int i = 0; i < bp.getPoints().size(); i++){
            assertTrue(Points.get(i).getX()==pointsFilters.get(i).getX());
            assertTrue(Points.get(i).getY()==pointsFilters.get(i).getY());
        }
    }
}
