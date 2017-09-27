/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
privateName = (function(){
    
    var autor = "";
    var api = apimock;
    
    
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
            var scrit = "<tr class ='endTable'><td>"+bp.name+"</td><td>"+bp.size+"</td>\n\
            <td><input class='buttonTable' type='button' id='bp.name' value='open' onclick=privateName.drawPlane('" 
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
        ctx.moveTo(blueprint.points[0].x,blueprint.points[0].y);
        for(var i = 1; i < blueprint.points.length; i++){
            ctx.lineTo(blueprint.points[i].x,blueprint.points[i].y);
        }
        ctx.stroke();
        ctx.closePath();
    };  
    
    var drawNewBluePrint = function(){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var start = $("#myCanvas").position();
        ctx.beginPath();
        ctx.moveTo(0,0);
        if(window.PointerEvent){
            canvas.addEventListener("pointerdown",function(event){
                if(document.getElementById("author").value.length > 0 &&
                        document.getElementById("blueprintSelect").innerHTML.valueOf().length > 0){
                    ctx.lineTo(event.clientX-start.left,event.clientY-start.top);
                    ctx.stroke();
                }
            });
        }else{
            canvas.addEventListener("mousedown",function(event){
                if(document.getElementById("author").value.length > 0 &&
                        document.getElementById("blueprintSelect").innerHTML.valueOf().length > 0){
                    ctx.lineTo(event.clientX-start.left,event.clientY-start.top);
                    ctx.stroke();
                }
            });
        }
    };

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
