function colorAmarillo(elemento){
  $(elemento).animate(
    {
      color: "yellow"
    }, 500, function(){
      colorBlanco(elemento)

    }
  )
}

function colorBlanco(elemento){
  $(elemento).animate(
    {
      color: "white"
    },500, function(){
      colorAmarillo(elemento)

    }
  )
}



// Inicializando aplicacion ----------
$(function(){
  colorAmarillo($(".main-titulo"));


});
