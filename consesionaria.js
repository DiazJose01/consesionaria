const autos = require ('./data/autos.json');
const personas = require ('./data/personas.json');


const concesionaria = {
    autos,
    buscarAuto : function(patente){
        let auto = this.autos.find(auto => auto.patente === patente);
        return auto ? auto : null; },
    
   venderAuto : function(patente){

      let auto = this.buscarAuto(patente);
      auto && (auto.vendido = true)     
      return auto
   },

   autosParaLaVenta : function(){
    let auto = this.autos.filter(auto => !auto.vendido);
    return auto
   },

   autosNuevos: function(){
    let autosParaLaVenta = this.autosParaLaVenta();
    return autosParaLaVenta.filter(auto => auto.km < 100)
   },

   listaDeVentas : function(params){
  
    let autosVendidos = this.autos.filter(auto =>auto.vendido);
    let ventas = autosVendidos.map(auto =>auto.precio);
    return ventas 

  },
  
  totalDeVentas : function (){
        
      let autosVendidos = this.listaDeVentas();
      return autosVendidos.length !== 0 ? autosVendidos.reduce((acum, num) => acum + num) : 0;

  },

  puedeComprar : function(auto, persona) {

    //let auto = this.autos.find(auto => auto.patente === patente && !auto.vendido)

    return auto.precio <= persona.capacidadDePagoTotal && (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas
},

  autosQuePuedeComprar : function(persona){

    let autosDisponibles = this.autosParaLaVenta();
    return autosDisponibles.filter( auto => this.puedeComprar(auto,persona))
 
  }

};

module.exports = concesionaria;