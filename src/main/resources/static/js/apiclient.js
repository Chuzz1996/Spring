/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


apiclient = (function(){

	return {
		getBlueprintsByAuthor:function(authname,callback){
                    $.get("blueprints/"+authname,callback);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
                    $.get("blueprints/"+authname+"/"+bpname,callback);
		},
                
                UpdateBlueprint:function(authname,bpname,points){
                    console.info(
                            '{"author":"'+authname+'","name":"'+bpname+'", "points":'+JSON.stringify(points)+'}'
                            );
                    return $.ajax({
                        url:"/blueprints/"+authname+"/"+bpname,
                        type: 'PUT',
                        data: '{"author":"'+authname+'","name":"'+bpname+'","points":'+JSON.stringify(points)+'}',
                        contentType: "application/json"
                    });
                },
                
                addNewBluePrint:function(authname,bpname,points){
                    return $.ajax({
                       url:"/blueprints",
                       type: 'POST',
                       data: '{"author":"'+authname+'","name":"'+bpname+'", "points":'+JSON.stringify(points)+'}',
                       contentType: "application/json"
                    });
                },
                
                deleteBluePrint:function(authname,bpname){
                    return $.ajax({
                       url:"/bluprints/bpname",
                       type:"DELETE",
                       data: '{"author":"'+authname+'","name":"'+bpname+'"}',
                       contentType: "application/json"
                    });
                }
                
	}	

})();