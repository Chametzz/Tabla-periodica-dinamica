var tablaPeriodica_Contenidos = document.getElementById('TablaPeriodica_Contenedor');

var espacioTablaPeriodica = document.getElementById('EspacioTablaPeriodica');
var tablaPeriodica = document.getElementById('TablaPeriodica');
var filasTablaPeriodica = document.getElementsByClassName('fila');
var celdasTablaPeriodica = document.getElementsByClassName('cuadrosCeldas');
var celdasElementos = document.getElementsByClassName('celdaElemento');

var contenedorContenidos = document.getElementById('ContenedorContenidos');

var divInformacion = document.getElementById('informacion');
var botonCambiaColorTP = document.getElementById('BotonCambiaColorTP');

var cambiadorColor = 4;
var guiaCategoria = document.getElementById('Guia').getElementsByTagName('li');
var Representacion = document.getElementById('Representacion');
/* diagrama */
var diagramaRepresentacion = new DiagramaHTMLElemQuimic(undefined , document.getElementById('ZonaDiagramaRepresentacion'), "ContenedorRepresentacion", 50, 20, 40)
var contenedorRepresentacion = document.getElementById('ContenedorRepresentacion');
var nucleo = contenedorRepresentacion.children[0];
var distanciaOrbitas = 40;
var contenedorOrbitas = contenedorRepresentacion.children[1];
var orbitasRepresentacion = contenedorRepresentacion.getElementsByClassName('orbita');
var contenedorElectron = contenedorRepresentacion.getElementsByClassName('contenedorElectron');
var representacionElectron = contenedorRepresentacion.getElementsByClassName('electron');

var moleculaPauling = new DiagramaMolecula("MoleculaPauling", document.getElementById('ContenedorMolecula'), 0, 0)
var zonaPauling = document.getElementById('ZonaExperimentoPauling')
var contenedorMolecula = document.getElementById('ContenedorMolecula')


var ordenHorizontalSiVerticalNo = false;

var celdaEscala = 60;
var celdaMargen = 4;
var escalaCeldaTP = celdaEscala;
var margenCeldaTP = celdaMargen;
var ajusteTabla = 0;
var numColumnasTP = 18;
var tablaEntraPantalla;
var inicioRotarIzquierdaDerecha = Math.random();
var FPS = 60;
var rotarSiNo = false;
var AjusteAutomaticoTP = false;
var visualizarOrbitas = true;

function cambiarEscalaTabla()
{
    let botonCambiarEscala = document.getElementsByClassName('botonNav')[1];
    let limite = 3;
    ajusteTabla = ajusteTabla + 1
    ajusteTabla = ajusteTabla > limite? ajusteTabla = 0: ajusteTabla;

    switch (ajusteTabla)
    {
        case 0:
            botonCambiarEscala.innerHTML = "Ajustar tabla: Automático"
            break;
        case 1:
            botonCambiarEscala.innerHTML = "Ajustar tabla: Original"
            break;
        case 2:
            botonCambiarEscala.innerHTML = "Ajustar tabla: 3/4"
            break;
        case 3:
            botonCambiarEscala.innerHTML = "Ajustar tabla: 1/2"
            break;
    }
}

function AjustandoTablaPeriodica()
{
    for (let index = 0; index < celdasTablaPeriodica.length; index++) 
    {
        celdasTablaPeriodica[index].style.width = escalaCeldaTP + 'px';
        celdasTablaPeriodica[index].style.height = escalaCeldaTP + 'px';
        celdasTablaPeriodica[index].style.margin = margenCeldaTP / 2 + 'px'
    }

    /* Ajustar el tamaño */
    for (let index = 0; index < filasTablaPeriodica.length; index++) 
    { 
        filasTablaPeriodica[index].style.width = ((escalaCeldaTP + margenCeldaTP) * numColumnasTP + 'px')
        filasTablaPeriodica[index].style.height = escalaCeldaTP + margenCeldaTP + 'px';
    }
        
    tablaPeriodica.style.width = filasTablaPeriodica[0].style.width;


    /* Ajustar a la pantalla */
    switch (ajusteTabla) {
        case 0: //ajuste automtico
            if(ordenHorizontalSiVerticalNo == true)
            {
                if(document.body.clientWidth >= (celdaEscala + celdaMargen) * numColumnasTP)
                {
                    escalaCeldaTP = celdaEscala;
                    margenCeldaTP = celdaMargen;
                }
                else if(document.body.clientWidth >= ((celdaEscala + celdaMargen) * 0.75 * numColumnasTP))
                {
                    escalaCeldaTP = celdaEscala * 0.75;
                    margenCeldaTP = celdaMargen * 0.75;
                }
                else if(document.body.clientWidth >= ((celdaEscala + celdaMargen) * 0.5 * numColumnasTP))
                {
                    escalaCeldaTP = celdaEscala * 0.5;
                    margenCeldaTP = celdaMargen * 0.5;
                }
                else
                {
                    escalaCeldaTP = celdaEscala * 0.5;
                    margenCeldaTP = celdaMargen * 0.5;
                }
            }
            else
            {
                if(document.body.clientWidth / 2 >= (celdaEscala + celdaMargen) * numColumnasTP)
                {
                    escalaCeldaTP = celdaEscala;
                    margenCeldaTP = celdaMargen;
                }
                else if(document.body.clientWidth / 2 >= ((celdaEscala + celdaMargen) * 0.75 * numColumnasTP))
                {
                    escalaCeldaTP = celdaEscala * 0.75;
                    margenCeldaTP = celdaMargen * 0.75;
                }
                else if(document.body.clientWidth / 2 >= ((celdaEscala + celdaMargen) * 0.5 * numColumnasTP))
                {
                    escalaCeldaTP = celdaEscala * 0.5;
                    margenCeldaTP = celdaMargen * 0.5;
                }
                else
                {
                    escalaCeldaTP = celdaEscala * 0.5;
                    margenCeldaTP = celdaMargen * 0.5;
                }
            }
            break;
        case 1:
            escalaCeldaTP = celdaEscala;
            margenCeldaTP = celdaMargen;
            break;
        case 2:
            escalaCeldaTP = celdaEscala * 0.75;
            margenCeldaTP = celdaMargen * 0.75;
            break;
        case 3:
            escalaCeldaTP = celdaEscala * 0.5;
            margenCeldaTP = celdaMargen * 0.5;
            break;
    }
}

function ordenarTablaP_Contenidos()//Tabla Periodica y el contenedor de contenidos
{
    let botonOrdenador = document.getElementsByClassName('botonNav')[0];

    if(ordenHorizontalSiVerticalNo == true)
    {
        ordenHorizontalSiVerticalNo = false
        tablaPeriodica_Contenidos.className = "distribucionVertical"
        tablaPeriodica_Contenidos.style.display = "grid"
        tablaPeriodica_Contenidos.style.gridTemplateColumns = "repeat(2, 1fr)"
        contenedorContenidos.style.display = "grid"
        contenedorContenidos.style.gridTemplateColumns = "repeat(1, 1fr)"
        contenedorContenidos.style.width = "100%"
        contenedorContenidos.style.overflow = "auto"
        botonOrdenador.innerHTML = "Orden: Vertical"
    }
    else
    {
        ordenHorizontalSiVerticalNo = true
        tablaPeriodica_Contenidos.className = "distribucionHorizontal"
        tablaPeriodica_Contenidos.style.gridTemplateColumns = "repeat(1, 1fr)"
        contenedorContenidos.style.display = "grid"
        contenedorContenidos.style.gridTemplateColumns = "repeat(3, 1fr)"
        contenedorContenidos.style.height = "400px"
        contenedorContenidos.style.width = "100%"
        contenedorContenidos.style.overflow = "auto"
        botonOrdenador.innerHTML = "Orden: Horizontal"
    }
}

function ordenarTablaP_ContenidosUpdate()
{
    if(ordenHorizontalSiVerticalNo == true)
    {
        espacioTablaPeriodica.style.height = tablaPeriodica.clientHeight + 'px'
    }
    else
    {
        contenedorContenidos.style.height = tablaPeriodica.clientHeight + 'px'
        espacioTablaPeriodica.style.height = tablaPeriodica.clientHeight + 'px'
    }
}

function ModificacionesCeldasElementos()//Añade informacion a las celdas
{
    for (let i = 0; i < celdasElementos.length; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            var nuevaP = document.createElement("p");
            celdasElementos[i].appendChild(nuevaP);
        }
    }
}

function clickElementoCeldaTP(a)
{
    /* Informacion */
    let metalSiNo;
    if(EQ[a].metal == true)
    {
        metalSiNo = "sí"
    }
    else
    {
        metalSiNo = "no"
    }
    let datoCategoria;
    /* Categoria */
    switch(EQ[a].categoria)
    {
        case 0:
            datoCategoria = "alcalinos";
                break;
        case 1:
            datoCategoria = "alcalinotérreos"
                break;
        case 2:
            datoCategoria = "latánidos"
                break;
        case 3:
            datoCategoria = "actínados";
                break;
        case 4:
            datoCategoria = "metales de transición";
                break;
        case 5:
            datoCategoria = "otros metales";
                break;
        case 6:
            datoCategoria = "metaloides";
                break;
        case 7:
            datoCategoria = "otros no metales";
                break;
        case 8:
            datoCategoria = "halógenos";
                break;
        case 9:
            datoCategoria = "gases nobles";
                break;
    }
    divInformacion.style.backgroundColor = EQ[a].colorElemento;
    divInformacion.children[0].innerHTML = EQ[a].simbolo + " - " + EQ[a].nombre + " - " + EQ[a].numeroAtomico;
    divInformacion.children[1].children[1].innerHTML = EQ[a].simbolo;
    divInformacion.children[1].children[1].innerHTML = EQ[a].protones;
    divInformacion.children[2].children[1].innerHTML = EQ[a].electrones;
    divInformacion.children[3].children[1].innerHTML = EQ[a].neutrones;
    divInformacion.children[4].children[1].innerHTML = EQ[a].masaAtomica;
    divInformacion.children[5].children[1].innerHTML = datoCategoria;
    divInformacion.children[6].children[1].innerHTML = metalSiNo;
    divInformacion.children[7].children[1].innerHTML = EQ[a].electronegatividad;
    divInformacion.children[8].children[1].innerHTML = EQ[a].descripcion;

    /* Representacion */
    inicioRotarIzquierdaDerecha = Math.random();

    diagramaRepresentacion.OtorgarDatos(a);
    diagramaRepresentacion.cambioElemento(a);
    diagramaRepresentacion.OrdenarElementos();
    diagramaRepresentacion.AjustarEscalaDiagrama();
    VisualizarOrbitas(); //estetica
}

function seccionGuia()
{
    for (let index = 0; index < guiaCategoria.length; index++)
    {
        guiaCategoria[index].style.color = colorCaregoria[index];
    }

    let opcionesFormulario = document.getElementsByName('infoPrincipal');
    
    opcionesFormulario[0].checked = true;
}

function cambiarColorTP()
{
    let limite = 4;
    cambiadorColor++;
    cambiadorColor = cambiadorColor > limite? cambiadorColor = 0: cambiadorColor;
    
    for (let i = 0; i < EQ.length; i++)
    {
        switch (cambiadorColor)
        {
            case 0:
                EQ[i].CambiarColorElemento()
                botonCambiaColorTP.innerHTML = "Color: Elemento"
                break;
            case 1:
                EQ[i].CambiarColorCategoria()
                botonCambiaColorTP.innerHTML = "Color: Categoría"
                break;
            case 2:
                EQ[i].CambiarColorMasaAtomica()
                botonCambiaColorTP.innerHTML = "Color: Masa atómica"
                break;
            case 3:
                EQ[i].CambiarColorElectronegatividad()
                botonCambiaColorTP.innerHTML = "Color: Electronegatividad"
                break;
            case 4:
                EQ[i].CambiarColorMetal()
                botonCambiaColorTP.innerHTML = "Color: Metal"
                break;
        }
    }
}

function cambiarInfoPrincipal()
{
    let opcionesFormulario = document.getElementsByName('infoPrincipal');
    let valor;

    for (let index = 0; index < opcionesFormulario.length; index++)
    {
        if(opcionesFormulario[index].checked == true)
        {
            valor = parseFloat(opcionesFormulario[index].value)
        }
    }

    switch (valor) {
        case 0:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].protones;
            }
            break;
        case 1:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].electrones;
            }
            break;
        case 2:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].neutrones;
            }
            break;
        case 3:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].masaAtomica;
            }
            break;
        case 4:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].electronegatividad;
            }
            break;
        case 5:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].metal;
            }
            break;
    }
}

function inputBuscadorElementos(params){
    let inputBuscador = document.getElementById("BuscadorElementos")
    let tecla = event.wich || event.keyCode
    let datoEncontrado = false

    if(tecla == 13){
        if(datoEncontrado == false)
        {
            for (let j = 0; j < EQ.length; j++)//nombre
            {
                if(EQ[j].nombre == inputBuscador.value || EQ[j].nombre == inputBuscador.value.toLowerCase())
                {
                    clickElementoCeldaTP(EQ[j].indexObject)
                    datoEncontrado = true
                }
            }
        }

        if(datoEncontrado == false)
        {
            for (let j = 0; j < EQ.length; j++)//simbolo
            {
                if(EQ[j].simbolo == inputBuscador.value || EQ[j].simbolo.toLowerCase() == inputBuscador.value.toLowerCase())
                {
                    clickElementoCeldaTP(EQ[j].indexObject)
                    datoEncontrado = true
                }
            }
        }

        if(datoEncontrado == false)
        {
            for (let j = 0; j < EQ.length; j++)//numero
            {
                if(EQ[j].protones == parseFloat(inputBuscador.value))
                {
                    clickElementoCeldaTP(EQ[j].indexObject)
                    datoEncontrado = true
                }
            }
        }

        if(datoEncontrado == false){
            alert("No se encontro el elemento")
        }
    }
}

function ContenedorRepresentacionAjustes()
{
    let escalaMinimaX;
    let escalaMinimaY;
    escalaMinimaX = 0;
    escalaMinimaY = 0;

    escalaMinimaX = diagramaRepresentacion.nucleo.offsetWidth;
    escalaMinimaY = diagramaRepresentacion.nucleo.offsetWidth;

    for (let index = 0; index <= orbitasRepresentacion.length; index++)
    {
        escalaMinimaX += diagramaRepresentacion.distanciaOrbitas * 2;
    }
    for (let index = 0; index <= orbitasRepresentacion.length; index++)
    {
        escalaMinimaY += diagramaRepresentacion.distanciaOrbitas * 2;
    }

    if(escalaMinimaX < Representacion.offsetWidth)
    {
        diagramaRepresentacion.diagrama.style.width = "100%";
    }
    else
    {
        diagramaRepresentacion.diagrama.style.width = escalaMinimaX + 'px';
    }

    if(escalaMinimaY < Representacion.offsetHeight)
    {
        diagramaRepresentacion.diagrama.style.height = "100%";
    }
    else
    {
        diagramaRepresentacion.diagrama.style.height = escalaMinimaY + 'px';
    }
}

function rotandoOrbitas(objetoDiagrama)
{
    let diagrama = document.getElementById(objetoDiagrama.Id);
    let orbitas = diagrama.getElementsByClassName('orbita');

    let segundosOrbitas = new Array(7);
    segundosOrbitas[0] = 8;
    segundosOrbitas[1] = 6;
    segundosOrbitas[2] = 5;
    segundosOrbitas[3] = 4;
    segundosOrbitas[4] = 3;
    segundosOrbitas[5] = 2;
    segundosOrbitas[6] = 1;

    for (let i = 0; i < orbitas.length; i++)
    {
        if(orbitas[i].style.transform == "rotate(360deg)" || orbitas[i].style.transform == "rotate(-360deg)")
        {
            orbitas[i].style.transform = "rotate(0deg)";
        }
    }

    if(objetoDiagrama.rotarSiNo == true)
    {
        if(inicioRotarIzquierdaDerecha <= 0.5) //izquierda
        {
            for (let i = 0; i < orbitas.length; i++)
            {
                if(i % 2 == 0)//izquierda pares
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual - avanceAngulo}deg)`;
                }
                else//derecha nones
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual + avanceAngulo}deg)`;
                }
            }
        }
        else //derecha
        {
            for (let i = 0; i < orbitas.length; i++)
            {
                if(i % 2 == 0)//derecha pares
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual + avanceAngulo}deg)`;
                }
                else//izquierda nones
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual - avanceAngulo}deg)`;
                }
            }
        }
    }
    else
    {
        if(inicioRotarIzquierdaDerecha <= 0.5) //izquierda
        {
            for (let i = 0; i < orbitas.length; i++)
            {
                if(i % 2 == 0 && orbitas[i].style.transform != "rotate(0deg)")//izquierda pares
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual - avanceAngulo}deg)`;
                }
                else if(orbitas[i].style.transform != "rotate(0deg)")//derecha nones
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual + avanceAngulo}deg)`;
                }
            }
        }
        else //derecha
        {
            for (let i = 0; i < orbitas.length; i++)
            {
                if(i % 2 == 0 && orbitas[i].style.transform != "rotate(0deg)")//derecha pares
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual + avanceAngulo}deg)`;
                }
                else if(orbitas[i].style.transform != "rotate(0deg)")//izquierda nones
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual - avanceAngulo}deg)`;
                }
            }
        }
    }
}

function botonRotarOrbitas(objetoDiagrama)
{
    let botonRotadorOrbitas = document.getElementById('botonRotarOrbitas')

    if(objetoDiagrama.rotarSiNo == true)
    {
        objetoDiagrama.rotarSiNo = false;
        botonRotadorOrbitas.innerHTML = "Girar"
    }
    else
    {
        objetoDiagrama.rotarSiNo = true;
        botonRotadorOrbitas.innerHTML = "Detener"
    }
    
}

function BotonVisualizadorOrbitas()
{
    let botonVisualizarOrb = document.getElementById('botonVisualizarOrbitas')

    if(visualizarOrbitas == true)
    {
        botonVisualizarOrb.innerHTML = "Orb: Invisibles";
        for (let index = 0; index < orbitasRepresentacion.length; index++)
        {
            orbitasRepresentacion[index].style.borderColor = "transparent";
        }
        visualizarOrbitas = false;
    }
    else
    {
        botonVisualizarOrb.innerHTML = "Orb: Visibles"
        for (let index = 0; index < orbitasRepresentacion.length; index++)
        {
            orbitasRepresentacion[index].style.borderColor = "white";
        }
        visualizarOrbitas = true;
    }
}

function VisualizarOrbitas()//Esto solo es de estetica no le des tanta importancia
{
    let botonVisualizarOrb = document.getElementById('botonVisualizarOrbitas')

    if(visualizarOrbitas == true)
    {
        for (let index = 0; index < orbitasRepresentacion.length; index++)
        {
            orbitasRepresentacion[index].style.borderColor = "white";
        }
    }
    else
    {
        for (let index = 0; index < orbitasRepresentacion.length; index++)
        {
            orbitasRepresentacion[index].style.borderColor = "transparent";
        }
    }
}

function SoloHayNumeros(stringDetectar)
{
    for (let i = 0; i < stringDetectar.length; i++)
    {
        if(stringDetectar[i] == "0" || stringDetectar[i] == "1" || stringDetectar[i] == "2" || stringDetectar[i] == "3" || stringDetectar[i] == "4" || stringDetectar[i] == "5"  || stringDetectar[i] == "6" || stringDetectar[i] == "7" || stringDetectar[i] == "8" || stringDetectar[i] == "9" || stringDetectar[i] == ".")
        {
            
        }
        else
        {
            alert('Solo debes agregar números, no debes agregar texto, caracteres o espacios')
            return false;
        }
    }

    return true;
}

function InputNuevaEscala(idHTMLInputCabiaEscalas, index)
{
    let inputCambiaEscalas = document.getElementById(idHTMLInputCabiaEscalas)
    let valor = inputCambiaEscalas.value
    let tecla = event.wich || event.keyCode
    let indexReceptorCambios = index;
    if(tecla == 13)
    {
        if(SoloHayNumeros(valor) == true)
        {
            let nuevaEscala = parseFloat(valor);

            if(nuevaEscala <= 1000)
            {
                switch (indexReceptorCambios)
                {
                    case 0:
                        diagramaRepresentacion.escalaNucleoPx = nuevaEscala;
                        break;

                    case 1:
                        diagramaRepresentacion.escalaElectronesPx = nuevaEscala;
                        break;

                    case 2:
                        diagramaRepresentacion.distanciaOrbitas = nuevaEscala;
                        break;
                }
            }
            else if(nuevaEscala > 1000)
            {
                alert("¡ALTO AHÍ!, no quieres que explote el navegador ¿Verdad?")
            }
            else if(valor == "")
            {
                
            }
        }
    }
}

function ApareceReferenciaInput(indexSpan)
{
    let spanLetrero = document.getElementsByClassName('cartelInputRepresentacion')[indexSpan];
    spanLetrero.className = "cartelInputRepresentacion letreroVisible"
}

function DesapareceReferenciaInput(indexSpan)
{
    let spanLetrero = document.getElementsByClassName('cartelInputRepresentacion')[indexSpan];
    spanLetrero.className = "cartelInputRepresentacion letreroInvisible"
}

function AjustarEscalaPauling()
{

    if(moleculaPauling.diagramaMolecula.clientWidth >= zonaPauling.clientWidth)
    {
        contenedorMolecula.style.width = moleculaPauling.diagramaMolecula.style.width
    }
    else
    {
        contenedorMolecula.style.width = '100%'
    }

    if(moleculaPauling.diagramaMolecula.clientHeight > zonaPauling.clientHeight)
    {
        contenedorMolecula.style.height = moleculaPauling.diagramaMolecula.style.height
    }
    else
    {
        contenedorMolecula.style.height = '100%'
    }

    PosicionarRespectoAlPadre(moleculaPauling.diagramaMolecula, 0.5, 0.5, contenedorMolecula)
}

function BotonAplicarCambiosPauling(activar)
{
    let inputAtomo = document.getElementsByClassName("inputAtomoPauling")
    let atomo = new Array(2)
    let recomendacionesAlerta = " Solo debes escribir un nombre, simbolo o número atómico, no pongas espacios, revisa que lo hayas escrito bien"
    let tecla = event.wich || event.keyCode

    //Nombre
    if(tecla == 13 || activar == true)
    {
        for (let i = 0; i < inputAtomo.length; i++)
        {
            let datoEncontrado = false;

            if(datoEncontrado == false)
            {
                for (let j = 0; j < EQ.length; j++)//nombre
                {
                    if(EQ[j].nombre == inputAtomo[i].value || EQ[j].nombre == inputAtomo[i].value.toLowerCase())
                    {
                        atomo[i] = EQ[j].indexObject
                        datoEncontrado = true
                    }
                }
            }

            if(datoEncontrado == false)
            {
                for (let j = 0; j < EQ.length; j++)//simbolo
                {
                    if(EQ[j].simbolo == inputAtomo[i].value || EQ[j].simbolo.toLowerCase() == inputAtomo[i].value.toLowerCase())
                    {
                        atomo[i] = EQ[j].indexObject
                        datoEncontrado = true
                    }
                }
            }

            if(datoEncontrado == false)
            {
                for (let j = 0; j < EQ.length; j++)//numero
                {
                    if(EQ[j].protones == parseFloat(inputAtomo[i].value))
                    {
                        atomo[i] = EQ[j].indexObject
                        datoEncontrado = true
                    }
                }
            }
        }

        if(atomo[0] != undefined && atomo[1] != undefined)
        {
            moleculaPauling.ReemplazarElementos(atomo[0], atomo[1])
        }
        else if(inputAtomo[0].value == "" || inputAtomo[1].value == "")
        {
            alert("Te falto rellenar algo")
        }
        else
        {
            if(atomo[0] == undefined && atomo[1] == undefined)
            {
                alert(`No se encontró a "${inputAtomo[0].value}" ni a "${inputAtomo[1].value}". ` + recomendacionesAlerta)
            }
            else if(atomo[0] == undefined)
            {
                alert(`No se encontró a "${inputAtomo[0].value}". ` + recomendacionesAlerta)
            }
            else
            {
                alert(`No se encontró a "${inputAtomo[1].value}". ` + recomendacionesAlerta)
            }
        }
    }
}

var verResultadosMolecula = false
function VisualizarResultadosMolecula()
{
    let resultados = document.getElementById("ResultadosPauling")
    let botonVerResultados = document.getElementById("BotonVerResultados")

    verResultadosMolecula = verResultadosMolecula == true? verResultadosMolecula = false: verResultadosMolecula = true

    if(verResultadosMolecula == true)
    {
        zonaPauling.style.width = "75%"
        resultados.style.visibility = "visible"
        botonVerResultados.innerHTML = "Resultados: O"
    }
    else
    {
        zonaPauling.style.width = "100%"
        resultados.style.visibility = "hidden"
        botonVerResultados.innerHTML = "Resultados: X"
    }
}

function InformacionResultadosPauling(molecula, activar)
{
    let tecla
    try{
        tecla = event.wich || event.keyCode
    } catch (error)
    {
        
    }

    let resultados = document.getElementById("ResultadosPauling")
    let datosRellenar = resultados.getElementsByClassName("datoMolecula")
    /* Asiganando datos */
    if(tecla == 13 || activar == true)
    {
        datosRellenar[0].innerHTML = molecula.formulacionGeneral

        switch (molecula.tipoEnlace)
        {
            case 0:
                datosRellenar[1].innerHTML = "iónico"
                break;
            case 1:
                datosRellenar[1].innerHTML = "covalente"
                break;
            case 2:
                datosRellenar[1].innerHTML = "metalico"
                break;
        }
    }
}

/* */
/* */
//No tengo ni idea de que poner aqui pero pues aqui hay un espacio
function Start()
{
    ordenarTablaP_Contenidos()

    ModificacionesCeldasElementos()

    for (let i = 0; i < EQ.length; i++) 
    {
        EQ[i].Inicio();
    }

    seccionGuia();

    cambiarColorTP();

    /* Simulaciones */
    InformacionResultadosPauling(moleculaPauling, true)
}

function StartUpdate()
{

    ordenarTablaP_ContenidosUpdate()

    AjustandoTablaPeriodica();

    /* Border Radius TP */
    tablaPeriodica.style.borderRadius = escalaCeldaTP * 0.20 + 'px'

    /* Contenido de la celda */0
    for (let i = 0; i < celdasElementos.length; i++)
    {
        celdasElementos[i].children[0].style.fontSize = escalaCeldaTP * 0.2 + 'px';
        celdasElementos[i].children[1].style.fontSize = escalaCeldaTP * 0.4 + 'px';
        celdasElementos[i].children[2].style.fontSize = escalaCeldaTP * 0.2 + 'px';
    }

    diagramaRepresentacion.EstiloDiagrama();

    cambiarInfoPrincipal()

    rotandoOrbitas(diagramaRepresentacion);

    ContenedorRepresentacionAjustes();

    /* Simulaciones */
    AjustarEscalaPauling()
}

function StartUpdateBajo()
{
    diagramaRepresentacion.OrdenarElementos();
}