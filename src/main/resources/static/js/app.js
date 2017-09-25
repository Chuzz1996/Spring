/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
privateName = (function(){
    
    var autor = "";
    
    var filtro = function(){
        
    }

    return{
        getBlueprints:function(authname){
            autor = authname;
            apimock.getBlueprintsByAuthor(authname,function(list){
               console.log(list.map$("#points"));
            });
        },
        changeName:function(authname){
            autor = authname;
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
