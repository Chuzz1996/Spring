/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
privateName = (function(){
    
    var autor = "";
    
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
            <td><input type='button' value='open' onclick='privateName.drawPlane(" 
                    + autor +"," + bp.name + ")'></td></tr>";
            $("#TablePoints").append(scrit);
        });
        document.getElementById("totalPoints").innerHTML = newBLueprints.reduce(getSum,0);
    }
    
    var drawBlueprint = function(blueprint){
        console.log("algo");
        document.getElementById("blueprintSelect").innerHTML = blueprint.name;
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        for(let i = 0; i < blueprint.points.length; i++){
            for(let j = 0; j < blueprint.point.length; j++){
                ctx.lineTo(blueprint.point[j].x,blueprint.point[j].y);
            }
        }
        ctx.closePath();
        ctx.fill();
    }   

    return{
        getBlueprints:function(authname){
            autor = authname;
            apimock.getBlueprintsByAuthor(authname,nameAndSizeBlueprint);
        },
        updateName:function(authname){
            autor = authname;
        },
        drawPlane:function(authname,name){
            autor = authname;
            apimock.getBlueprintsByNameAndAuthor(authname,name,drawBlueprint);
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
