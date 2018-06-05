var incombat = false;

var combo = [];


var danofisico = 0;

var danomagico = 0;
var escudofisico = 0; 
var escudomagico = 0;
var curacion = 0;
var paralizacion = 0;
var gastomana = 0;
var gastoaguante = 0;

var resultado = {};

var partyAliada = {vida: 100,aguante: 200,mana: 200,resistencia: 50,suerte: 50};

var partyEnemiga = {vida: 100,aguante: 200,mana: 200,resistencia: 50,suerte: 25};

function startCombat (){
	
	inCombat = true;
	
	$$('#controlls-box').html('<div class="row no-gap" id="Board"><div class="col key" id="R" ></div><div class="col key" id="T"></div><div class="col key"  id="M" ></div><div class="col key" id="Y" ></div><div class="col key" id="U" ></div></div>');
	
	$$('.key').on('touchstart', function () {
		
		combo.push($$(this).attr("id"));
		
		if(combo.length == 3){
			
			console.log(combo)
			
			danofisico= 0;
			danomagico= 0;
			escudofisico= 0;
			escudomagico= 0;
			curacion= 0;
			paralizacion= 0;
			gastomana= 0;
			gastoaguante= 0;
			
			for( var c = 0;c < 3;c++){
				
				if(c == 0){
					
					if(combo[c] == "R"){
						
						danofisico = danofisico + 10;
						danomagico = danomagico + 10;
						gastomana = gastomana - 15;
						gastoaguante = gastoaguante - 15;
						paralizacion = paralizacion +10;
						
					}
					if(combo[c] == "T"){
						
						danomagico = danomagico + 30;
						gastomana = gastomana - 30;
						
					}
					if(combo[c] == "M"){
						
						gastomana = gastomana + 20;
						gastoaguante = gastoaguante + 20;
						curacion = curacion + 20;
						
					}
					if(combo[c] == "Y"){
						
						danofisico = danofisico + 30;
						gastoaguante = gastoaguante - 30;
						
					}
					if(combo[c] == "U"){
						
						danofisico = danofisico + 15;
						gastoaguante = gastoaguante - 30;
						paralizacion = paralizacion + 15;
						
					}
					
				}
				
				if(c == 1){
					
					if(combo[c] == "R"){
						
						gastomana = gastomana - 20;
						danomagico = danomagico + 20;
						gastoaguante = gastoaguante - 20;
						paralizacion = paralizacion + 20;
						
						
					}
					if(combo[c] == "T"){
						
						gastomana = gastomana - 40;
						curacion = curacion + 20;
						escudomagico = escudomagico + 20;
						
					}
					if(combo[c] == "M"){
						
						danofisico = danofisico * 1.5;
						danomagico = danomagico * 1.5;
						escudofisico = escudofisico * 1.5;
						escudomagico = escudomagico * 1.5;
						curacion = curacion * 1.5;
						paralizacion = paralizacion * 1.5;
						gastomana = gastomana * 1.5;
						gastoaguante = gastoaguante * 1.5;
						
					}
					if(combo[c] == "Y"){
						
						danofisico = danofisico + 40;
						gastoaguante = gastoaguante -40;
						
					}
					if(combo[c] == "U"){
						
						escudofisico = escudofisico + 20
						paralizacion = paralizacion + 20
						gastoaguante = gastoaguante -40;
						
					}
					
				}
				
				if(c == 2){
					
					if(combo[c] == "R"){
						
						gastomana = gastomana * 1.5 + 20;
						gastoaguante = gastoaguante * 1.5 + 20;
						curacion = curacion * 1.5 +20;
						
					}
					if(combo[c] == "T"){
						
						gastomana = gastomana - 30;
						danomagico = danomagico * 2;
						
					}
					if(combo[c] == "M"){
						
						danofisico = danofisico * 2;
						danomagico = danomagico * 2;
						escudofisico = escudofisico * 2;
						escudomagico = escudomagico * 2;
						curacion = curacion * 2;
						paralizacion = paralizacion * 2;
						gastomana = gastomana * 2;
						gastoaguante = gastoaguante * 2;					
						
					}
					if(combo[c] == "Y"){
						
						gastoaguante = gastoaguante - 30;
						danofisico = danofisico * 2;
						
						
					}
					if(combo[c] == "U"){
						
						gastoaguante = gastoaguante - 30;
						danofisico = danofisico * 1.5;
						paralizacion = paralizacion * 1.5;
						
					}
					
				}
				
			}
			
			resultado = {danofisico: danofisico,danomagico: danomagico,escudofisico: escudofisico, escudomagico: escudomagico,curacion: curacion,paralizacion: paralizacion,gastomana: gastomana,gastoaguante: gastoaguante};
			combo = [];
			console.log(resultado);
			
			// critico:
			// porcentaje de suerte tirar dado
			// curacion y descanso por habilidades
			// daño:
			// vida - (dañofisico * multiplicador base + daño añadido * multiplicador total * critico)/escudo fisico
			// stun:
			// paralizacion - resistencia (critico dos turnos)
			// si stun,siguiente dos turnos resistencia mejorada
			// regeneracion base cada turno despues de procesar
			
		}
		
		$$(this).addClass('pressed');
		
	});
	
	$$('.key').on('touchend', function () {

		$$(this).removeClass('pressed');
		
	});
	
}

if (pc){pcInit();}
