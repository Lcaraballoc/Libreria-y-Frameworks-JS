var alternarColor = true;
var continuar;
var puntaje;
var idRealizarMovimientosInterval;
var movimientos;

//Funcion para que titulo cambie de color intermitentemente //
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

//Funcion para realizar movimientos en el juego//

function realizarMovimientos() {

    var contador;
    var nombreImagen;
    var nombreImagenSgte;
    var figurasMarcadas = inicializarFigurasMarcadas();
    var huboCambios = false;

    for (var row = 0; row < 7; ++row) {
        for (var col = 0; col < 7; ++col) {
            if ((7 - col) > 2) {
                nombreImagen = $('.col-' + (col + 1)).children()[row];
                nombreImagen = $(nombreImagen).prop('src').substring($(nombreImagen).prop('src').length - 5);

                contador = 1;

                while ((7 - col) >= 3 && contador < (7 - col)) {
                    nombreImagenSgte = $('.col-' + (col + contador + 1)).children()[row];
                    nombreImagenSgte = $(nombreImagenSgte).prop('src').substring($(nombreImagenSgte).prop('src').length - 5);

                    if (nombreImagen !== nombreImagenSgte) {
                        break;
                    }

                    ++contador;
                }

                if (contador >= 3) {
                    huboCambios = true;
                    for (var i = 0; i < contador; ++i) {
                        figurasMarcadas[row][col + i] = true;
                    }
                }
            }

            if ((7 - row) > 2) {
                nombreImagen = $('.col-' + (col + 1)).children()[row];
                nombreImagen = $(nombreImagen).prop('src').substring($(nombreImagen).prop('src').length - 5);

                contador = 1;

                while ((7 - row) >= 3 && contador < (7 - row)) {
                    nombreImagenSgte = $('.col-' + (col + 1)).children()[row + contador];
                    nombreImagenSgte = $(nombreImagenSgte).prop('src').substring($(nombreImagenSgte).prop('src').length - 5);

                    if (nombreImagen !== nombreImagenSgte) {
                        break;
                    }

                    ++contador;
                }

                if (contador >= 3) {
                    huboCambios = true;
                    for (var i = 0; i < contador; ++i) {
                        figurasMarcadas[row + i][col] = true;
                    }
                }
            }
        }
    }

    if (huboCambios) {
        actualizarTablero(figurasMarcadas);
    } else {
        clearInterval(idRealizarMovimientosInterval);
    }
}


// Inicializando aplicacion ----------//
  $(function(){
      colorAmarillo($(".main-titulo"));

      $(".col-1").droppable({accept: ".col-2"});
      $(".col-2").droppable({accept: ".col-1, .col-3"});
      $(".col-3").droppable({accept: ".col-2, .col-4"});
      $(".col-4").droppable({accept: ".col-3, .col-5"});
      $(".col-5").droppable({accept: ".col-4, .col-6"});
      $(".col-6").droppable({accept: ".col-5, .col-7"});
      $(".col-7").droppable({accept: ".col-6"});


      function iniciarJuego() {
        continuar = true;

        droppableDraggable();

        $('#timer').countdowntimer({
            minutes: 2,
            seconds: 0,
            timeUp: function () {
                continuar = false;
                clearInterval(realizarMovimientos());

                var anchoPanelTablero = $('.panel-tablero').css('width');

                $(".panel-tablero").animate({
                    height: "0",
                    width: "0"
                }, 4100, function () {
                    $(".panel-tablero").css('display', 'none');
                });

                $('.panel-score').animate({
                    width: anchoPanelTablero
                }, 3000);

                $('.time').animate({
                    opacity: 0.0
                }, 2000);

                $('.btn-reinicio').text('Iniciar');

                $('.main-titulo-juego-terminado').css("display", "block")
            }
        });

        idRealizarMovimientosInterval = setInterval(realizarMovimientos, 1500);
      }

});
