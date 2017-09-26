/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
privateName = (function(){
    
    var autor = "";
    var api = apiclient;
    
    var cleanTable = function(){
        $("#TablePoints").find("tr:gt(0)").remove();
    };
    
    function getSum(total, num) {
        return total + num.size;
    }
    
    var nameAndSizeBlueprint = function(blueprints){
        cleanTable();
        var newBLueprints = blueprints.map(function(bp){
            return {name:bp.name,size:bp.points.length};
        });
        newBLueprints.map(function(bp){
            var scrit = "<tr><td>"+bp.name+"</td><td>"+bp.size+"</td>\n\
            <td><input type='button' id='bp.name' value='open' onclick=privateName.drawPlane('" 
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
