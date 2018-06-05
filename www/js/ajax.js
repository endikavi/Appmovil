function ajaxcall(method){
    
    /*Data to be sent to the server. It is converted to a query string, if not already a string. It's appended to the url for GET-requests. See processData option to prevent this automatic processing. For POST requests could be FormData instance*/
    
    url = "https://gserver.herokuapp.com/user";
    
    if(method == "get"){
        
        url = url + "/" + UserConf[1].multiplayerid;
        data = "";
        
    }else if(method == "post"){
        
        data = { "UserConf" : JSON.stringify(UserConf),"Check":false,"uid":UserConf[1].multiplayerid}
        
    }else if(method == "put"){
        
        data = {"uid" : UserConf[1].multiplayerid,"oldUid":oldUid}
        
    }else if(method == "patch"){
        
        data = {"UserConf" : JSON.stringify(UserConf),"uid":UserConf[1].multiplayerid}
        
    }else if(method == "delete"){
        
        url = url + "/" + UserConf[1].multiplayerid;
        data = "";
        
    }
    
    seven.request({
        
        url: url,

        data: data,
        
        processData: true,
		
        dataType: "json",
		
        method: method,
        
        success: function(res){

            if(method == "get"){
                
				console.log(res);
                if(res){
                    console.log('partida recogida de la nube');
                    UserConf = JSON.parse(res);
                }else{
                    ajaxcall("post")
                }
        
            }else if(method == "post"){
        
                console.log(res);
				console.log('partida guardada en la nube');
        
            }else if(method == "put"){
				
        		console.log(res);
                console.log('Actualizado movil');
        
            }else if(method == "patch"){
				
        		console.log(res);
        		console.log('Actualizada partida');
        
    		}else if(method == "delete"){
				
        		console.log(res);
				console.log('partida eliminada');
        
    		}
            
        },
        error: function(res){
        
            console.log(res);
			console.log('Error en la llamada');
            
        },
        complete: function(res){
        
            console.log(res);
        
        },
        statusCode: {

            404: function (xhr) {

                alert('sin conexion');

            }

        }
        
    })
    
}