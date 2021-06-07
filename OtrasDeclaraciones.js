function PosicionarRespectoAlPadre(elemento, posX, posY, padre)
{
    if(posX != undefined)
    {
        elemento.style.left = (padre.clientWidth * posX) - (elemento.offsetWidth / 2) + 'px';
    }
    if(posY != undefined)
    {
        elemento.style.top = (padre.clientHeight * posY) - (elemento.offsetHeight / 2) + 'px';
    }
}

class DiagramaHTMLElemQuimic
{
    constructor(indexElemQuimic, padreDiagrama ,idHTML, escalaNucleoPx, escalaElectronesPx, margenOrbitasPx, colorElectron)
    {
        /* Datos heredados */
        this.protones
        this.nombre;
        this.simbolo;
        this.protones;
        this.electrones;
        this.neutrones;
        this.numeroAtomico;
        this.masaAtomica;
        this.celdaTablaPeriodica;
        this.categoria;
        /*0 = Alcalinos
        1 = Alcalinotérreos
        2 = Latánidos
        3 = Actínidos
        4 = Metales de transición
        5 = Otros metales
        6 = Metaloides
        7 = Otros no metales
        8 = Halógenos
        9 = Gases nobles*/
        this.metal;
        this.colorElemento;
        this.electronegatividad;
        this.descripcion;

        /*----------------Datos propios-------------*/
        this.distanciaOrbitas = margenOrbitasPx;
        this.Id = idHTML;

        /* datos Estilo */
        this.escalaNucleoPx = escalaNucleoPx
        this.escalaElectronesPx = escalaElectronesPx

        /* Datos extras */
        this.inicioRotarIzquierdaDerecha = Math.random();
        this.rotarSiNo = true;
        this.FPS = 60;
        this.animacion;

        if(indexElemQuimic == undefined)
        {
            this.crear(padreDiagrama, idHTML);
            this.diagrama = document.getElementById(idHTML);
            this.nucleo = this.diagrama.children[0];
            this.contenedorOrbitas = this.diagrama.children[1];
            this.orbitas = this.contenedorOrbitas.children;
            this.contenedorElectron = this.diagrama.getElementsByClassName('contenedorElectron');
            this.electron = this.diagrama.getElementsByClassName('electron');
        }
        else
        {
            this.crear(padreDiagrama, idHTML);
            this.diagrama = document.getElementById(idHTML);
            this.nucleo = this.diagrama.children[0];
            this.contenedorOrbitas = this.diagrama.children[1];
            this.orbitas = this.contenedorOrbitas.children;
            this.contenedorElectron = this.diagrama.getElementsByClassName('contenedorElectron');
            this.electron = this.diagrama.getElementsByClassName('electron');
            this.OtorgarDatos(indexElemQuimic);
            this.cambioElemento(indexElemQuimic);
            this.EstiloDiagrama(colorElectron);
            this.AjustarEscalaDiagrama();
            this.OrdenarElementos();
        }
    }

    OtorgarDatos(indexEQ)
    {
        this.nombre = EQ[indexEQ].nombre;
        this.simbolo = EQ[indexEQ].simbolo;
        this.protones = EQ[indexEQ].protones;
        this.electrones = EQ[indexEQ].electrones;
        this.neutrones = EQ[indexEQ].neutrones;
        this.numeroAtomico = EQ[indexEQ].numeroAtomico;
        this.masaAtomica = EQ[indexEQ].masaAtomica;
        this.celdaTablaPeriodica = EQ[indexEQ].celdaTablaPeriodica;
        this.categoria = EQ[indexEQ].categoria;
        this.metal = EQ[indexEQ].metal;
        this.colorElemento = EQ[indexEQ].colorElemento;
        this.electronegatividad = EQ[indexEQ].electronegatividad;
        this.descripcion = EQ[indexEQ].descripcion;
    }

    crear(padreDiagrama ,idHTML)
    {
        let representacionDiagrama = document.createElement('div')
        representacionDiagrama.id = idHTML
        padreDiagrama.appendChild(representacionDiagrama)

        let diagramaNucleo = document.createElement('div')
        diagramaNucleo.className = "nucleo"

        let diagramaContenedorOrbitas = document.createElement('div')
        diagramaContenedorOrbitas.className = "contenedorOrbitas"

        representacionDiagrama.appendChild(diagramaNucleo);
        representacionDiagrama.appendChild(diagramaContenedorOrbitas)
    }

    cambioElemento(a)
    {
        this.inicioRotarIzquierdaDerecha = Math.random();

        this.nucleo.style.backgroundColor = this.colorElemento;

        for (let index = this.contenedorOrbitas.childElementCount - 1; index >= 0; index--)
        {
            this.contenedorOrbitas.removeChild(this.orbitas[index]);
        }

        for (let i = 0; i < this.electrones.length; i++)
        {
            let orbita = document.createElement('div');
            orbita.className = "orbita";
            this.contenedorOrbitas.appendChild(orbita);
            for (let j = 0; j < this.electrones[i]; j++)
            {
                let electron = document.createElement('div');
                electron.className = "electron";
                let contenedorElectron = document.createElement('div')
                contenedorElectron.className = 'contenedorElectron'
                orbita.appendChild(contenedorElectron);
                contenedorElectron.appendChild(electron);
            }
        }

        for (let i = 0; i < this.orbitas.length; i++)
        {
            this.orbitas[i].style.transform = "rotate(0deg)";
        }

        this.nucleo.innerHTML = EQ[a].simbolo;
    }

    EstiloDiagrama(colorElectron)
    {
        this.nucleo = this.diagrama.children[0];

        this.nucleo.style.width = this.escalaNucleoPx + 'px'
        this.nucleo.style.height = this.escalaNucleoPx + 'px'

        for (let index = 0; index < this.electron.length; index++)
        {
            this.electron[index].style.width = this.escalaElectronesPx + 'px'
            this.electron[index].style.height = this.escalaElectronesPx + 'px'
        }

        this.nucleo.style.fontSize = this.nucleo.clientHeight * 0.5 + 'px';
        this.nucleo.style.paddingTop = this.nucleo.clientHeight * 0.25 + 'px';
        this.nucleo.style.paddingBottom = this.nucleo.clientHeight * 0.25 + 'px';

        for (let i = 0; i < this.electron.length; i++)
        {
            this.electron[i].style.backgroundColor = colorElectron;
        }
    }

    AjustarEscalaDiagrama()
    {
        let escalaMinimaX;
        let escalaMinimaY;
        escalaMinimaX = 0;
        escalaMinimaY = 0;

        escalaMinimaX = this.nucleo.offsetWidth;
        escalaMinimaY = this.nucleo.offsetHeight;

        for (let index = 0; index < this.orbitas.length; index++)
        {
            escalaMinimaX += this.distanciaOrbitas * 2;
        }
        for (let index = 0; index < this.orbitas.length; index++)
        {
            escalaMinimaY += this.distanciaOrbitas * 2;
        }

        this.diagrama.style.width = escalaMinimaX + this.escalaElectronesPx + 'px'
        this.diagrama.style.height = escalaMinimaY + this.escalaElectronesPx + 'px'
    }

    OrdenarElementos()
    {
        for (let h = 0; h < 2; h++)
        {
            PosicionarRespectoAlPadre(this.nucleo, 0.5, 0.5, this.diagrama);

            for (let index = 0; index < this.orbitas.length; index++)
            {
                this.orbitas[index].style.width = this.nucleo.clientWidth + ((index + 1) * this.distanciaOrbitas * 2) + 'px';
                this.orbitas[index].style.height = this.nucleo.clientHeight + ((index + 1) * this.distanciaOrbitas * 2) + 'px';
                PosicionarRespectoAlPadre(this.orbitas[index], 0.5, 0.5, this.diagrama);
            }

            for (let i = 0; i < this.orbitas.length; i++)
            {
                for (let j = 0; j < this.orbitas[i].childElementCount; j++)
                {
                    PosicionarRespectoAlPadre(this.orbitas[i].children[j], 0.5, 0.5, this.orbitas[i]);

                    this.orbitas[i].children[j].style.width = this.orbitas[i].style.width;
                    this.orbitas[i].children[j].style.height = this.orbitas[i].style.height;

                    PosicionarRespectoAlPadre(this.orbitas[i].children[j].children[0], 0.5, 0, this.orbitas[i].children[j])
                }
            }

            for (let i = 0; i < this.orbitas.length; i++)
            {
                let distanciaAngulos = 360 / this.orbitas[i].childElementCount;
                let inicioAngulo;
                if(this.orbitas[i].childElementCount % 2 == 0)
                {
                    inicioAngulo = -90;

                    for (let j = 0; j < this.orbitas[i].childElementCount; j++)
                    {
                        this.orbitas[i].children[j].style.transform = `rotate(${inicioAngulo}deg)`;
                        inicioAngulo += distanciaAngulos;
                    }
                }
                else
                {
                    inicioAngulo = 0;

                    for (let j = 0; j < this.orbitas[i].childElementCount; j++)
                    {
                        this.orbitas[i].children[j].style.transform = `rotate(${inicioAngulo}deg)`;
                        inicioAngulo += distanciaAngulos;
                    }
                }
            }
        }
    }
}

class DiagramaMolecula
{
    constructor(idMolecula, padreMolecula, indexAtomo0, indexAtomo1)
    {
        /* diagrama */
        this.Crear(idMolecula, padreMolecula)
        this.diagramaMolecula = document.getElementById(idMolecula)
        this.escalaNucleoPx = 50
        this.escalaElectronesPx = 20
        this.distanciaOrbitas = 40
        this.objetoAtomo = new Array(2)
        this.CambioElementos(indexAtomo0, indexAtomo1)
        this.AjustarEscalaMolecula();
        this.EstiloMolecula();

        /* Datos molecula */
        this.formulacionGeneral;
        this.tipoEnlace;
        this.DefiniendoDatos();
    }

    Crear(idMolecula, padreMolecula)
    {
        let molecula = document.createElement('div')
        molecula.id = idMolecula
        padreMolecula.appendChild(molecula)
    }

    CambioElementos(indexAtomo0, indexAtomo1)
    {
        this.objetoAtomo[0] = new DiagramaHTMLElemQuimic(indexAtomo0, this.diagramaMolecula, "diagrama0", 50, 20, 40, "red");
        this.objetoAtomo[1] = new DiagramaHTMLElemQuimic(indexAtomo1, this.diagramaMolecula, "diagrama1", this.escalaNucleoPx, this.escalaElectronesPx, this.distanciaOrbitas, "blue")
    }

    AjustarEscalaMolecula()
    {
        this.diagramaMolecula.style.width = this.objetoAtomo[0].diagrama.clientWidth + this.objetoAtomo[1].diagrama.clientWidth - this.objetoAtomo[0].escalaElectronesPx +'px';

        if(this.objetoAtomo[0].diagrama.clientHeight >= this.objetoAtomo[1].diagrama.clientHeight)
        {
            this.diagramaMolecula.style.height = this.objetoAtomo[0].diagrama.clientHeight + 'px'
        }
        else
        {
            this.diagramaMolecula.style.height = this.objetoAtomo[1].diagrama.clientHeight + 'px'
        }
    }

    EstiloMolecula()
    {
        this.objetoAtomo[0].diagrama.style.position = "absolute"
        this.objetoAtomo[1].diagrama.style.position = "absolute"

        PosicionarRespectoAlPadre(this.objetoAtomo[0].diagrama, undefined, 0.5, this.diagramaMolecula)
        PosicionarRespectoAlPadre(this.objetoAtomo[1].diagrama, undefined, 0.5, this.diagramaMolecula)

        this.objetoAtomo[0].diagrama.style.left = '0%'
        this.objetoAtomo[1].diagrama.style.right = '0%'
    }

    DefiniendoDatos()
    {
        if (this.objetoAtomo[0].simbolo == this.objetoAtomo[1].simbolo)
        {
            this.formulacionGeneral = this.objetoAtomo[0].simbolo + 2
            console.log("a")
        }
        else if(this.objetoAtomo[0].electronegatividad < this.objetoAtomo[1].electronegatividad)
        {
            this.formulacionGeneral = this.objetoAtomo[0].simbolo + this.objetoAtomo[1].simbolo
            console.log("b")
        }
        else if(this.objetoAtomo[0].electronegatividad > this.objetoAtomo[1].electronegatividad)
        {
            this.formulacionGeneral = this.objetoAtomo[1].simbolo + this.objetoAtomo[0].simbolo
            console.log("c")
        }
        else if (this.objetoAtomo[0].protones < this.objetoAtomo[1].protones)
        {
            this.formulacionGeneral = this.objetoAtomo[0].simbolo + this.objetoAtomo[1].simbolo
            console.log("d")
        }
        else
        {
            this.formulacionGeneral = this.objetoAtomo[1].simbolo + this.objetoAtomo[0].simbolo
            console.log("e")
        }

        if(this.objetoAtomo[0].metal != this.objetoAtomo[1].metal)
        {
            this.tipoEnlace = 0 //ionico
        }
        else if(this.objetoAtomo[0].metal == false && this.objetoAtomo[1].metal == false)
        {
            this.tipoEnlace = 1 //covalente
        }
        else if(this.objetoAtomo[0].metal == true && this.objetoAtomo[1].metal == true)
        {
            this.tipoEnlace = 2 //metalico
        }
    }

    ReemplazarElementos(indexAtomo0, indexAtomo1)
    {
        this.CambioElementos(indexAtomo0, indexAtomo1)
        this.AjustarEscalaMolecula()
        this.EstiloMolecula()

        /*Datos molecula*/
        this.DefiniendoDatos()
    }
}