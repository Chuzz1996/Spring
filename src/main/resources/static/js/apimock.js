//@author hcadavid

apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	 {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"}];
	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"}];
        mockdata["pipe"]=[{author:"pipe","points":[{"x":170,"y":80},{"x":100,"y":87}],"name":"line"},
	 {author:"pipe","points":[{"x":80,"y":50},{"x":90,"y":181}],"name":"line2"}];
	mockdata["hernan"]=[{author:"hernan","points":[{"x":17,"y":100},{"x":17,"y":70}],"name":"tree"},
	 {author:"hernan","points":[{"x":10,"y":60},{"x":10,"y":11}],"name":"tree2"}];

	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(
				mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
	}	

})();

/*
//Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("pipe",fun);
console.info("------");
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/

