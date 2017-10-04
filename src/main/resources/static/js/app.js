/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
privateName = (function(){
    
    var autor = "";
    var api = apiclient;
    
    var puntos;
    
    var namePlane;
    
    var howTake;
    
    
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
    
    function getOffset(obj) {
          var offsetLeft = 0;
          var offsetTop = 0;
          do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }   
          } while(obj = obj.offsetParent );
          return {left: offsetLeft, top: offsetTop};
      } 
    
    var drawNewBluePrint = function(){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var start = $("#myCanvas").position();
        if(window.PointerEvent){
            canvas.addEventListener("pointerdown",function(event){
                if((document.getElementById("author").value.length > 0 &&
                        document.getElementById("blueprintSelect").innerHTML.valueOf().length > 0)){
                    var xxx = getOffset(canvas);
                    puntos.push({"x":event.pageX-xxx.left,"y":event.pageY-xxx.top});
                    ctx.lineTo(event.pageX-xxx.left,event.pageY-xxx.top);
                    ctx.stroke();
                }
            });
        }else{
            canvas.addEventListener("mousedown",function(event){
                if(document.getElementById("author").value.length > 0 &&
                        document.getElementById("blueprintSelect").innerHTML.valueOf().length > 0){
                    var xxx = getOffset(canvas);
                    puntos.push({"x":event.clientX-xxx.left,"y":event.clientY-xxx.top});
                    ctx.lineTo(event.clientX-xxx.left,event.clientY-xxx.top);
                    ctx.stroke();
                }
            });
        }
    };
    
    var promesaSave = function(){
        var promesa = api.UpdateBlueprint(
                    document.getElementById("author").value,namePlane,puntos);
            promesa.then(
                function(){
                    api.getBlueprintsByAuthor(autor,nameAndSizeBlueprint);
                },
                function(){
                    alert("El plano no se actualizo");
                }
            );
    }
    
    var promesaAdd = function(){
        if(namePlane.length > 0){
            var promesa = api.addNewBluePrint(
                    document.getElementById("author").value,namePlane,puntos);
            promesa.then(
                    function(){
                        api.getBlueprintsByAuthor(autor,nameAndSizeBlueprint);
                    },
                    function(){
                        alert("El plano no se agrego");
                    }
                );
        }
    }
    
    var promesaEliminar = function(){
        var promesa = api.deleteBluePrint(document.getElementById("author").value,document.getElementById("blueprintSelect").innerHTML.valueOf());
        promesa.then(
          function(){
                api.getBlueprintsByAuthor(autor,nameAndSizeBlueprint);
                document.getElementById("blueprintSelect").innerHTML = "";   
                namePlane = document.getElementById("newPlane").value; 
                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0,0,canvas.width, canvas.height);
                ctx.beginPath();
          },
          function(){
                alert("El plano no se elimino");
          }
        );
    }

    return{
        getBlueprints:function(authname){
            if(authname.length>0){
                autor = authname;
                api.getBlueprintsByAuthor(authname,nameAndSizeBlueprint);
            }
        },
        updateName:function(authname){
            autor = authname;
        },
        drawPlane:function(authname,name){
            autor = authname;
            namePlane = name;
            howTake = 1;
            api.getBlueprintsByNameAndAuthor(authname,name,drawBlueprint);
        },
        drawCanvas:function(){
            drawNewBluePrint();
        },
        saveUpdate:function(){
            if(howTake==1){
                promesaSave();
            }else{
                promesaAdd();
            }
        },
        
        addNewBluePrint:function(){
            document.getElementById("blueprintSelect").innerHTML = document.getElementById("newPlane").value;   
            namePlane = document.getElementById("newPlane").value; 
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.beginPath();
            puntos = [];
            howTake = 2;
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
