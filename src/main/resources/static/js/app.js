/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
privateName = (function(){
    
    var autor = "";
    var api = apiclient;
    
    var puntos;
    
    
    var cleanTable = function(){
        $("#TablePoints").find("tr:gt(0)").remove();
    };
    
    function getSum(total, num) {
        return total + num.size;
    }
    
    var nameAndSizeBlueprint = function(blueprints){
        document.getElementById("xx").innerHTML = autor;
        cleanTable();
        var newBLueprints = blueprints.map(function(bp){
            return {name:bp.name,size:bp.points.length};
        });
        newBLueprints.map(function(bp){
            var scrit = "<tr class='lead'><td>"+bp.name+"</td><td>"+bp.size+"</td>\n\
            <td><input type='button' class='btn btn-primary' id='bp.name' value='open' onclick=privateName.drawPlane('" 
                    + document.getElementById("author").value +"','" + bp.name + "')></td></tr>";
            $("#TablePoints").append(scrit);
        });
        document.getElementById("totalPoints").innerHTML = newBLueprints.reduce(getSum,0);
    };
    
    var drawBlueprint = function(blueprint){
        document.getElementById("blueprintSelect").innerHTML = blueprint.name;    
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.beginPath();
        puntos = blueprint.points;
        ctx.moveTo(blueprint.points[0].x,blueprint.points[0].y);
        for(var i = 1; i < blueprint.points.length; i++){
            ctx.lineTo(blueprint.points[i].x,blueprint.points[i].y);
        }
        ctx.stroke();
    };  
    
    var drawNewBluePrint = function(){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var start = $("#myCanvas").position();
        if(window.PointerEvent){
            canvas.addEventListener("pointerdown",function(event){
                if(document.getElementById("author").value.length > 0 &&
                        document.getElementById("blueprintSelect").innerHTML.valueOf().length > 0){
                    /*puntos.push({"x":event.pageX-start.left,"y":event.pageY-start.top});
                    ctx.lineTo(event.pageX-start.left,event.pageY-start.top);*/
                    puntos.push({"x":event.clientX-start,"y":event.clientY-start.top});
                    ctx.lineTo(event.clientX-start.left,event.clientY-start.top);
                    console.info(event.clientX+","+event.clientY);
                    console.info(start.left+","+start.top);
                    console.info(puntos);
                    ctx.stroke();
                }
            });
        }else{
            canvas.addEventListener("mousedown",function(event){
                if(document.getElementById("author").value.length > 0 &&
                        document.getElementById("blueprintSelect").innerHTML.valueOf().length > 0){
                    puntos.push({"x":event.clientX-start,"y":event.clientY-start.top});
                    ctx.lineTo(event.clientX-start.left,event.clientY-start.top);
                    ctx.stroke();
                }
            });
        }
    };
    
    var promesaSave = function(){
        let promesa = api.setBlueprintByNameAndAuthor(
                    document.getElementById("author").value,document.getElementById("blueprintSelect").innerHTML.valueOf(),puntos);
            promesa.then(
                function(){
                    console.info("Ok");
                },
                function(){
                    console.info("PAILA");
                }
            );
    }
    
    var promesaAdd = function(){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width, canvas.height);
        document.getElementById("blueprintSelect").innerHTML = "";
        document.getElementById("newPlane").innerHTML = document.getElementById("inputNewPlane").value;
    }
    
    var promesaEliminar = function(){
        let promesa = api.deleteBluePrint(document.getElementById("author").value,document.getElementById("blueprintSelect").innerHTML.valueOf());
        promesa.then(
          function(){
              console.info("OK");
          },
          function(){
              console.info("PAILA");
          }
        );
    }

    return{
        getBlueprints:function(authname){
            autor = authname;
            api.getBlueprintsByAuthor(authname,nameAndSizeBlueprint);
        },
        updateName:function(authname){
            autor = authname;
        },
        drawPlane:function(authname,name){
            autor = authname;
            api.getBlueprintsByNameAndAuthor(authname,name,drawBlueprint);
        },
        drawCanvas:function(){
            drawNewBluePrint();
        },
        saveUpdate:function(){
            promesaSave();
        },
        
        addNewBluePrint:function(){
            promesaAdd();
        },
        
        deleteBluePrint:function(){
            promesaEliminar();
        }
    }
    
})();

//privateName.getBlueprints("Pipe");

/*
var updateBlueprint = function(author){
    
    apimock.getBlueprintsByAuthor(author,function(){
        var result = apimock.mockdata.map(privateName.getNameAndSize(author));
        
    })
    
}*/
