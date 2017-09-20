/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
privateName = (function(){
    
    var author;
    var puntos=[];
    
    puntos["johnconnor"] = [{"name":"house",numPoints:4},{"name":"gear",numPoints:4}];
    
    return{
        getName:function(authname,callback){
            puntos[authname].find(function(e){return e.name===author})
        },
        getNameAndSize:function(authname,callback){
            return puntos[authname]
        }
    }
    
})();

var updateBlueprint = function(author){
    
    apimock.getBlueprintsByAuthor(author,function(){
        var result = apimock.mockdata.map(privateName.getNameAndSize(author));
        
    })
    
}