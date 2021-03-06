/* Declaraciones Extra */
function ConversarColoresHTML_RGB(colorHtml)
{
    let htmlColor = colorHtml
    htmlColor = htmlColor.replace("#", "")
    let notacionHTML = new Array()
    notacionHTML[0] = "0"
    notacionHTML[1] = "1"
    notacionHTML[2] = "2"
    notacionHTML[3] = "3"
    notacionHTML[4] = "4"
    notacionHTML[5] = "5"
    notacionHTML[6] = "6"
    notacionHTML[7] = "7"
    notacionHTML[8] = "8"
    notacionHTML[9] = "9"
    notacionHTML[10] = "a"
    notacionHTML[11] = "b"
    notacionHTML[12] = "c"
    notacionHTML[13] = "d"
    notacionHTML[14] = "e"
    notacionHTML[15] = "f"
    let rgb = new Array();
    rgb[0] = htmlColor.slice(0, -4);
    rgb[1] = htmlColor.slice(2, -2);
    rgb[2] = htmlColor.slice(4);

    for(let i = 0; i < rgb.length; i++)
    {
        let a;
        let b;
        for (let j = 0; j < notacionHTML.length; j++)
        {
            if(rgb[i][0] == notacionHTML[j])
            {
                a = j
            }

            if(rgb[i][1] == notacionHTML[j])
            {
                b = j
            }
        }
        rgb[i] = (16 * a) + b
    }

    return new Array(rgb[0], rgb[1], rgb[2])
}

//Variables del Contenedor
var colorCaregoria = new Array(10);
colorCaregoria[0] = "red";
colorCaregoria[1] = "blue";
colorCaregoria[2] = "pink";
colorCaregoria[3] = "violet";
colorCaregoria[4] = "aquamarine";
colorCaregoria[5] = "orange";
colorCaregoria[6] = "coral";
colorCaregoria[7] = "lime";
colorCaregoria[8] = "yellow";                                                                                                                                                              
colorCaregoria[9] = "cyan";

//Clase para definir los elementos quimicos
class ElementoQuimico
{
    constructor(nombre, simbolo, numProtones, numElectrones, numNeutrones, masaAtomica, categoria, metal, colorElemento, electronegatividad)
    {
        /*No parametro*/this.indexObject = numProtones - 1;
        this.nombre = nombre;
        this.simbolo = simbolo;
        this.protones = numProtones;
        this.electrones = numElectrones;
        this.neutrones = numNeutrones;
        /*No parametro*/this.numeroAtomico = this.protones;
        this.masaAtomica = masaAtomica;
        /*No parametro*/this.celdaTablaPeriodica = document.getElementById("celda" + this.simbolo);
        this.categoria = categoria;
        /*0 = Alcalinos
        1 = Alcalinot??rreos
        2 = Lat??nidos
        3 = Act??nidos
        4 = Metales de transici??n
        5 = Otros metales
        6 = Metaloides
        7 = Otros no metales
        8 = Hal??genos
        9 = Gases nobles*/
        this.metal = metal;
        this.colorElemento = colorElemento;
        this.electronegatividad = electronegatividad;
        /*No parametro*/this.descripcion;
    }
    Inicio()
    {
        this.celdaTablaPeriodica.children[0].innerHTML = this.numeroAtomico;
        this.celdaTablaPeriodica.children[1].innerHTML = this.simbolo;
        this.celdaTablaPeriodica.children[2].innerHTML = this.nombre;
        this.celdaTablaPeriodica.setAttribute("onclick", `clickElementoCeldaTP(${this.protones - 1})`);
    }
    OnLoad()
    {

    }

    BrilloOscuroColorElemento()
    {
        for (let i = 0; i < 3; i++)
        {
            if(ConversarColoresHTML_RGB(this.colorElemento)[i] > 127)
            {
                return true;
            }
        }
        
        return false;
    }

    CambiarColorElemento()
    {
        this.celdaTablaPeriodica.style.backgroundColor = this.colorElemento;
        this.celdaTablaPeriodica.style.color = "black"
        
        if(this.BrilloOscuroColorElemento() == true)
        {
            this.celdaTablaPeriodica.style.color = "black"
            this.celdaTablaPeriodica.style.borderColor = "white"
        }
        else
        {
            this.celdaTablaPeriodica.style.color = "white"
            this.celdaTablaPeriodica.style.borderColor = "black"
        }
    }

    CambiarColorCategoria()
    {
        this.celdaTablaPeriodica.style.backgroundColor = colorCaregoria[this.categoria];
        this.celdaTablaPeriodica.style.color = "black"
    }

    CambiarColorMasaAtomica()
    {
        let masaAtomicaMaxima = 295
        let masaAtomicaFraccion = this.masaAtomica / masaAtomicaMaxima
        let colorMaximo = 510
        let intensidadColor = masaAtomicaFraccion * colorMaximo

        if(intensidadColor <= 255) //claro
        {
            this.celdaTablaPeriodica.style.backgroundColor = `rgb(255, ${255 - intensidadColor}, ${255 - intensidadColor})`
        }
        else if(intensidadColor > 255)
        {
            this.celdaTablaPeriodica.style.backgroundColor = `rgb(${255 - (intensidadColor - 255)}, 0, 0)`
        }

        if(intensidadColor <= 319)
        {
            this.celdaTablaPeriodica.style.color = "black"
            this.celdaTablaPeriodica.style.borderColor = "white"
        }
        else
        {
            this.celdaTablaPeriodica.style.color = "white"
            this.celdaTablaPeriodica.style.borderColor = "black"
        }
    }

    CambiarColorElectronegatividad()
    {
        let electronegatividadMaxima = 4.00;
        let electronegatividadFraccion = this.electronegatividad / electronegatividadMaxima;
        let colorMaximo = 510
        let intensidadColor = electronegatividadFraccion * colorMaximo;

        if(intensidadColor <= 255) //claro
        {
            this.celdaTablaPeriodica.style.background = `rgb(${255 - intensidadColor}, ${255 - intensidadColor}, 255)`
        }
        else if(intensidadColor > 255)
        {
            this.celdaTablaPeriodica.style.background = `rgb(0, 0, ${255 - (intensidadColor - 255)})`
        }

        if(intensidadColor <= 319)
        {
            this.celdaTablaPeriodica.style.color = "black"
            this.celdaTablaPeriodica.style.borderColor = "white"
        }
        else
        {
            this.celdaTablaPeriodica.style.color = "white"
            this.celdaTablaPeriodica.style.borderColor = "black"
        }
    }

    CambiarColorMetal()
    {
        if(this.metal == true)
        {
            this.celdaTablaPeriodica.style.backgroundColor = "#000000"
            this.celdaTablaPeriodica.style.color = "white"
            this.celdaTablaPeriodica.style.borderColor = "black"
        }
        else
        {
            this.celdaTablaPeriodica.style.backgroundColor = "#ffffff"
            this.celdaTablaPeriodica.style.color = "black"
            this.celdaTablaPeriodica.style.borderColor = "white"
        }
    }
}
var EQ = new Array();

EQ[0] = new ElementoQuimico("hidr??geno", "H", 1, [1], 0, 1.00794, 7, false, "#ffffff", 2.20);
EQ[0].descripcion = "muchos metales pueden sufrir fragilidad en su presencia, Es altamente soluble en diversos compuestos que poseen tierras raras y metales de transici??n, y puede ser disuelto tanto en metales cristalinos como amorfos.";

EQ[1] = new ElementoQuimico("helio", "He", 2, [2], 2, 4.002602, 9, false, "#bbffff", 0);
EQ[1].descripcion = "es un gas monoat??mico incoloro e inodoro que cuenta con el menor punto de ebullici??n de todos los elementos qu??micos y solo puede ser licuado bajo presiones muy grandes y no puede ser congelado.";

EQ[2] = new ElementoQuimico("litio", "Li", 3, [2, 1], 4, 6.941, 0, true, "#d49cff", 0.98);
EQ[2].descripcion = "se emplea especialmente en aleaciones conductoras del calor, en bater??as el??ctricas y, sus sales, en el tratamiento del trastorno bipolar. Acercado a una llama la torna carmes?? pero, si la combusti??n es violenta, la llama adquiere un color blanco brillante.";

EQ[3] = new ElementoQuimico("berilio", "Be", 4, [2, 2], 5, 9.012182, 1,true, "#ceff00", 1.57);
EQ[3].descripcion = "es un elemento Alcalinot??rreo bivalente, t??xico, de color gris, duro, ligero y quebradizo. Se emplea principalmente como endurecedor en aleaciones, especialmente de cobre.";

EQ[4] = new ElementoQuimico("boro", "B", 5, [2, 3], 6, 10.811, 6, true, "#fec4c3", 2.04);
EQ[4].descripcion = "hay dos al??tropos del boro; el boro amorfo es un polvo marr??n, pero el boro met??lico es negro. La forma met??lica es dura (9,5 en la escala de Mohs) y es un mal conductor a temperatura ambiente. No se ha encontrado libre en la naturaleza.";

EQ[5] = new ElementoQuimico("carbono", "C", 6, [2, 4], 9, 12.0107, 7, false, "#808080", 2.55);
EQ[5].descripcion = "los ??tomos de carbono pueden unirse de diferentes maneras, denominadas al??tropos del carbono, reflejo de las condiciones de formaci??n. Los m??s conocidos que ocurren naturalmente son el grafito, el diamante y el carbono amorfo. Las propiedades f??sicas del carbono var??an ampliamente con la forma alotr??pica.";

EQ[6] = new ElementoQuimico("nitr??geno", "N", 7, [2, 5], 7, 14.0067, 7, false, "#0000ff", 3.04);
EQ[6].descripcion = "se emplea industrialmente para crear atm??sferas protectoras y como gas criog??nico para obtener temperaturas del orden de 78K de forma sencilla y econ??mica. Inclusive se utiliza para inflar los neum??ticos en los trenes de aterrizaje de los aviones, evitando condensaci??n de agua a grandes alturas o su combusti??n al aterrizar.";

EQ[7] = new ElementoQuimico("ox??geno", "O", 8, [2, 6], 8, 15.9994, 7, false, "#ff0000", 3.44);
EQ[7].descripcion = "se produce por cianobacterias, algas y plantas y todas las formas complejas de vida lo usan para su respiraci??n celular.";

EQ[8] = new ElementoQuimico("fl??or", "F", 9, [2, 7], 10, 18.998403, 8, false, "#9bc5ff", 3.98);
EQ[8].descripcion = "reacciona explosivamente con el hidr??geno. El fl??or diat??mico, F2, en condiciones normales es un gas corrosivo de color amarillo casi blanco, fuertemente oxidante.";

EQ[9] = new ElementoQuimico("ne??n", "Ne", 10, [2, 8], 10, 20.1797, 9, false, "#c2e7f9", 0);
EQ[9].descripcion = "presenta un poder de refrigeraci??n, por unidad de volumen, 40 veces mayor que el del helio l??quido y tres veces mayor que el del hidr??geno l??quido.";

EQ[10] = new ElementoQuimico("sodio", "Na", 11, [2, 8, 1], 12, 22.98976, 0, true, "#bc7cf6", 0.93);
EQ[10].descripcion = "es un metal blando, ligero y de color plateado que no se encuentra libre en la naturaleza. El sodio flota en el agua descomponi??ndola, desprendiendo hidr??geno y formando un hidr??xido. Normalmente no arde en contacto con el aire por debajo de 40 ??C.";

EQ[11] = new ElementoQuimico("magnesio", "Mg", 12, [2, 8, 2], 12, 24.3050, 1, true, "#a4fe06", 1.31);
EQ[11].descripcion = "el ion magnesio es esencial para todas las c??lulas vivas. El metal puro no se encuentra en la naturaleza. Una vez producido a partir de las sales de magnesio, este metal alcalino-t??rreo es utilizado como un elemento de aleaci??n.";

EQ[12] = new ElementoQuimico("aluminio", "Al", 13, [2, 8, 3], 14, 26.98153, 5, true, "#ccbaba", 1.61);
EQ[12].descripcion = "este metal posee una combinaci??n de propiedades que lo hacen muy ??til en ingenier??a de materiales, tales como su baja densidad (2812,5 kg/m??) y su alta resistencia a la corrosi??n. Mediante aleaciones adecuadas se puede aumentar sensiblemente su resistencia mec??nica (hasta los 690 MPa).";

EQ[13] = new ElementoQuimico("silicio", "Si", 14, [2, 8, 4], 14, 28.0855, 6, true, "#9aaead", 1.90);
EQ[13].descripcion = "se presenta en forma amorfa y cristalizada; el primero es un polvo parduzco, m??s activo que la variante cristalina, que se presenta en octaedros de color azul gris??ceo y brillo met??lico.";

EQ[14] = new ElementoQuimico("f??sforo", "P", 15, [2, 8, 5], 16, 30.97696, 7, false, "#ff9900", 2.19);
EQ[14].descripcion = "es muy reactivo y se oxida espont??neamente en contacto con el ox??geno atmosf??rico emitiendo luz. su reservorio es la corteza terrestre. El elemento se almacena en rocas fosfatadas y a medida que estas son erosionadas se van liberando compuestos fosfatados hacia el suelo y el agua. Luego son absorbidos por las plantas.";

EQ[15] = new ElementoQuimico("azufre", "S", 16, [2, 8, 6], 16, 32.065, 7, false, "#c2c305", 2.58);
EQ[15].descripcion = "es un elemento qu??mico esencial constituyente de los amino??cidos cisteina y metionina??? y, por consiguiente, necesario para la s??ntesis de prote??nas presentes en todos los organismos vivos. Se usa principalmente como fertilizante pero tambi??n en la fabricaci??n de p??lvora, laxantes, f??sforos e insecticidas.";

EQ[16] = new ElementoQuimico("cloro", "Cl", 17, [2, 8, 7], 18, 35.453, 8, false, "#2ef22c", 3.16);
EQ[16].descripcion = "en condiciones normales y en estado puro forma dicloro: un gas t??xico amarillo-verdoso formado por mol??culas diat??micas (Cl2) unas 2,5 veces m??s pesado que el aire, de olor desagradable y t??xico.";

EQ[17] = new ElementoQuimico("arg??n", "Ar", 18, [2, 8, 8], 22, 39.948, 9, false, "#9bdae9", 0);
EQ[17].descripcion = "se emplea como gas de relleno en l??mparas incandescentes ya que no reacciona con el material del filamento incluso a alta temperatura y presi??n, prolongando de este modo la vida ??til de la bombilla";

EQ[18] = new ElementoQuimico("potasio", "K", 19, [2, 8, 8, 1], 20, 39.0983, 0, true, "#a558dc", 0.82);
EQ[18].descripcion = "se oxida r??pidamente en el aire, es muy reactivo, especialmente en agua, y se parece qu??micamente al sodio.  es un s??lido blando que se corta con facilidad con un cuchillo, tiene un punto de fusi??n muy bajo, arde con llama violeta y presenta un color plateado en las superficies expuestas al aire, en cuyo contacto se oxida con rapidez, lo que obliga a almacenarlo recubierto de aceite.";

EQ[19] = new ElementoQuimico("calcio", "Ca", 20, [2, 8, 8, 2], 20, 40.078, 1, true, "#50ff04", 1.00);
EQ[19].descripcion = "se encuentra en el medio interno de los organismos como ion calcio (Ca2+) o formando parte de otras mol??culas; en algunos seres vivos se halla precipitado en forma de esqueleto interno (huesos de los vertebrados) o externo (concha de los moluscos). Los iones de calcio act??an de cofactor en muchas reacciones enzim??ticas, intervienen en el metabolismo del gluc??geno y, junto al potasio y el sodio, regulan la contracci??n muscular."

EQ[20] = new ElementoQuimico("escandio", "Sc", 21, [2, 8, 9, 2], 24, 44.95591, 4, true, "#ebebeb", 1.36);
EQ[20].descripcion = "es un metal blando, muy ligero, resistente al ataque del ??cido n??trico y fluorh??drico, cuyo color plateado deslustra expuesto al aire adoptando un color ligeramente rosado. Su estado de oxidaci??n m??s com??n es +3 y sus sales son incoloras."

EQ[21] = new ElementoQuimico("titanio", "Ti", 22, [2, 8, 10, 2], 26, 47.867, 4, true, "#cccccc", 1.54);
EQ[21].descripcion = "es el elemento met??lico que posee la mayor proporci??n de dureza-densidad. Es un metal fuerte, con una baja densidad y alta ductilidad (especialmente en ambientes libres de ox??geno), de color blanco met??lico. Su punto de fusi??n es relativamente alto, sobre los 1650 ??C (1920 K), lo que hace que sea ??til como metal refractario.";

EQ[22] = new ElementoQuimico("vanadio", "V", 23, [2, 8, 11, 2], 27, 50.9415, 4, true, "#b3b3b3", 1.63);
EQ[22].descripcion = "el vanadio es un metal de transici??n blanco agrisado, d??ctil y brillante. Este metal de transici??n presenta una alta resistencia a las bases, al ??cido sulf??rico (H2SO4) y al ??cido clorh??drico (HCl). Reacciona con el agua regia o con una mezcla de ??cido n??trico y fluoruro de hidr??geno.";

EQ[23] = new ElementoQuimico("cromo", "Cr", 24, [2, 8, 13, 1], 24, 51.9962, 4, true, "#a3add1", 1.66);
EQ[23].descripcion = "es un metal de transici??n duro, fr??gil, color blanco agrisado y brillante. Es muy resistente frente a la corrosi??n. Se utiliza principalmente en metalurgia para aportar resistencia a la corrosi??n y un acabado brillante.";

EQ[24] = new ElementoQuimico("manganeso", "Mn", 25, [2, 8, 13, 2], 20, 51.9962, 4, true, "#b394d1", 1.55);
EQ[24].descripcion = "como elemento libre, el manganeso es un metal con aleaci??n de metales industriales con importantes usos, sobre todo en los aceros inoxidables. El fosfatado de manganeso se utiliza como tratamiento para la prevenci??n de la oxidaci??n y corrosi??n del acero.";

EQ[25] = new ElementoQuimico("hierro", "Fe", 26, [2, 8, 14, 2], 29, 55.845, 4, true, "#e68542", 1.83);
EQ[25].descripcion = "es un metal maleable, de color gris plateado y presenta propiedades magn??ticas; es ferromagn??tico a temperatura ambiente y presi??n atmosf??rica. Es extremadamente duro y denso. Presenta diferentes formas estructurales dependiendo de la temperatura y presi??n. A presi??n atmosf??rica: Hierro-??, Hierro-?? y Hierro-??.";

EQ[26] = new ElementoQuimico("cobalto", "Co", 27, [2, 8, 15, 2], 33, 58.93319, 4, true, "#f2a6b3", 1.91);
EQ[26].descripcion = "es un metal ferromagn??tico, de color blanco azulado. Su temperatura de Curie es de 1388 K. Normalmente se encuentra junto con n??quel, y ambos suelen formar parte de los meteoritos de hierro.";

EQ[27] = new ElementoQuimico("niquel", "Ni", 28, [2, 8, 17, 1], 34, 58.6934, 4, true, "#6bd96b", 1.88);
EQ[27].descripcion = "es un metal de transici??n de color blanco con un liger??simo tono amarillo, conductor de la electricidad y del calor, muy d??ctil y maleable por lo que se puede laminar, pulir y forjar f??cilmente, y presentando ferromagnetismo a temperatura ambiental.";

EQ[28] = new ElementoQuimico("cobre", "Cu", 29, [2, 8, 18, 1], 25, 63.546, 4, true, "#d19c45", 1.90);
EQ[28].descripcion = "se caracteriza por ser uno de los mejores conductores de electricidad (el segundo despu??s de la plata). Gracias a su alta conductividad el??ctrica, ductilidad y maleabilidad, se ha convertido en el material m??s utilizado para fabricar cables el??ctricos y otros elementos el??ctricos y componentes electr??nicos.";

EQ[29] = new ElementoQuimico("zinc", "Zn", 30, [2, 8, 18, 2], 35, 65.38, 4, true, "#9699bf", 1.65);
EQ[29].descripcion = "es un metal de color blanco azulado que arde en el aire con llama verde azulada. El aire seco no le ataca pero en presencia de humedad se forma una capa superficial de ??xido o carbonato b??sico que a??sla al metal y lo protege de la corrosi??n.";

EQ[30] = new ElementoQuimico("galio", "Ga", 31, [2, 8, 18, 3], 39, 69.723, 5, true, "#cca6a6", 1.81);
EQ[30].descripcion = "es un metal blando, gris??ceo en estado l??quido y plateado brillante al solidificar, s??lido deleznable a bajas temperaturas que funde a temperaturas cercanas a la del ambiente. El rango de temperatura en el que permanece l??quido es uno de los m??s altos de los metales (2174 ??C separan sus puntos de fusi??n y ebullici??n) y la presi??n de vapor es baja incluso a altas temperaturas.";

EQ[31] = new ElementoQuimico("germanio", "Ge", 32, [2, 8, 18, 4], 41, 72.64, 6, true, "#87a5a7", 2.01);
EQ[31].descripcion = "es un semimetal, de color blanco gris??ceo lustroso, quebradizo, que conserva el brillo a temperaturas ordinarias. Presenta la misma estructura cristalina que el diamante y resiste a los ??cidos y ??lcalis.";

EQ[32] = new ElementoQuimico("ars??nico", "As", 33, [2, 8, 18, 5], 42, 64.92160, 6, true, "#cb9be7", 2.18);
EQ[32].descripcion = "siendo extremadamente t??xicos, aunque se emplean como componentes en algunos medicamentos. El ars??nico es usado para la fabricaci??n de semiconductores y como componente de semiconductores III-V como el arseniuro de galio. Se presenta en tres estados alotr??picos, gris o met??lico, amarillo y negro.";

EQ[33] = new ElementoQuimico("selenio", "Se", 34, [2, 8, 18, 6], 45, 78.96, 7, false, "#ffb300", 2.55);
EQ[33].descripcion = "Es insoluble en agua y alcohol, ligeramente soluble en disulfuro de carbono y soluble en ??ter. Presenta el efecto fotoel??ctrico, convirtiendo la luz en electricidad, y, adem??s, su conductividad el??ctrica aumenta al exponerlo a la luz. Por debajo de su punto de fusi??n es un material semiconductor tipo p, y se encuentra en su forma natural.";

EQ[34] = new ElementoQuimico("bromo", "Br", 35, [2, 8, 18, 7], 45, 79.904, 8, false, "#ba3838", 2.96);
EQ[34].descripcion = "a temperatura ambiente es un l??quido rojo, vol??til y denso. Su reactividad es intermedia entre el cloro y el yodo. En estado l??quido es peligroso para el tejido humano y sus vapores irritan los ojos y la garganta.";

EQ[35] = new ElementoQuimico("kript??n", "Kr", 36, [2, 8, 18, 8], 48, 83.798, 9, false, "#7bc8da", 3.00);
EQ[35].descripcion = "caracterizado por un espectro de l??neas verde y rojo-naranja muy brillantes. Es uno de los productos de la fisi??n nuclear del uranio. puede formar clatratos con el agua al quedar sus ??tomos atrapados en la red de mol??culas de agua. Tambi??n se han sintetizado clatratos con hidroquinona y fenol.";

EQ[36] = new ElementoQuimico("rubidio", "Rb", 37, [2, 8, 18, 8, 1], 48, 85.4678, 0, true, "#8e42c0", 0.82);
EQ[36].descripcion = " es un metal alcalino blando, de color plateado blanco brillante que empa??a r??pidamente al aire, muy reactivo. Al igual que los dem??s elementos del grupo 1 puede arder espont??neamente en aire con llama de color violeta amarillento, reacciona violentamente con el agua desprendiendo hidr??geno y forma amalgama con mercurio.";

EQ[37] = new ElementoQuimico("estroncio", "Sr", 38, [2, 8, 18, 8, 2], 50, 87.62, 1, true, "#00ff00", 0.95);
EQ[37].descripcion = "es un metal blando de color plateado brillante, algo maleable, tambi??n alcalino t??rreo, que r??pidamente se oxida en presencia de aire adquiriendo un tono amarillento por la formaci??n de ??xido, por lo que debe conservarse sumergido en parafina.";

EQ[38] = new ElementoQuimico("itrio", "Y", 39, [2, 8, 18, 9, 2], 50, 88.90585, 4, true, "#acfefc", 1.22);
EQ[38].descripcion = "el itrio es un metal plateado, brillante, ligero, d??ctil y maleable. Su punto de ebullici??n es de 3609 K. Qu??micamente se asemeja a los lant??nidos. Es bastante estable en el aire, ya que arde por encima de los 600 K, pero reactivo en ciertas condiciones. El polvo del metal y sus virutas pueden encenderse a temperatura ambiente.";

EQ[39] = new ElementoQuimico("zirconio", "Zr", 40, [2, 8, 18, 10, 2], 51, 91.224, 4, true, "#a7e9e7", 1.60);
EQ[39].descripcion = "es un metal de transici??n brillante, de color blanco gris??ceo, duro, resistente a la corrosi??n, de apariencia similar al acero.";

EQ[40] = new ElementoQuimico("niobio", "Nb", 41, [2, 8, 18, 12, 1], 52, 92.90638, 4, true, "#8fd0d6", 1.60);
EQ[40].descripcion = "es un metal de transici??n d??ctil, gris, blando y poco abundante. Se encuentra en el mineral niobita, tambi??n llamado columbita, y se utiliza en aleaciones. Se emplea principalmente aleado en aceros, a los cuales confiere una alta resistencia.";

EQ[41] = new ElementoQuimico("molibdeno", "Mo", 42, [2, 8, 18, 13, 1], 54, 95.96, 4, true, "#70c4c4", 2.16);
EQ[41].descripcion = "es un metal plateado, tiene el sexto punto de fusi??n m??s alto de cualquier elemento. El molibdeno no se produce como el metal libre en la naturaleza, sino en varios estados de oxidaci??n en los minerales. Industrialmente, los compuestos de molibdeno se emplean en aplicaciones de alta presi??n y alta temperatura, como pigmentos y catalizadores.";

EQ[42] = new ElementoQuimico("tecnecio", "Tc", 43, [2, 8, 18, 14, 1], 55, 98, 4, true, "#4db4b3", 1.90);
EQ[42].descripcion = "las propiedades qu??micas de este metal de transici??n cristalino de color gris plateado son intermedias a las del renio y las del manganeso. Su is??mero nuclear 99mTc, de muy corta vida y emisor de rayos gamma, se usa en medicina nuclear para efectuar una amplia variedad de pruebas diagn??sticas. El 99Tc se usa como fuente de part??culas beta libre de la emisi??n de rayos gamma. El ani??n pertecnetato (TcO4-) se emplea como inhibidor de corrosi??n an??dica para aceros.";

EQ[43] = new ElementoQuimico("rutenio", "Ru", 44, [2, 8, 18, 15, 1], 57, 101.07, 4, true, "#35a5a6", 2.20);
EQ[43].descripcion = "es un metal blanco duro y fr??gil; presenta cuatro formas cristalinas diferentes. Se disuelve en bases fundidas, y no es atacado por ??cidos a temperatura ambiente. A altas temperaturas reacciona con hal??genos y con hidr??xidos.";

EQ[44] = new ElementoQuimico("rodio", "Rh", 45, [2, 8, 28, 16, 1], 58, 102.9055, 4, true, "#1396a8", 2.28);
EQ[44].descripcion = "es un metal blanco duro y fr??gil; presenta cuatro formas cristalinas diferentes. Se disuelve en bases fundidas, y no es atacado por ??cidos a temperatura ambiente. A altas temperaturas reacciona con hal??genos y con hidr??xidos. Se puede aumentar la dureza del paladio y el platino con peque??as cantidades de rutenio. Igualmente, la adici??n de peque??as cantidades aumenta la resistencia a la corrosi??n del titanio de forma importante.";

EQ[45] = new ElementoQuimico("paladio", "Pd",46,[2,8,18,18], 60, 106.42,4, true,"#0a869e", 2.20);
EQ[45].descripcion ="el paladio se encuentra en muchos productos electr??nicos como computadoras, tel??fonos m??viles, condensadores de m??ltiples capas de cer??mica, revestimiento de componentes de baja tensi??n, contactos el??ctricos y televisores";

EQ[46]= new ElementoQuimico("plata", "Ag", 47, [2,8,18,18,1], 61, 107.8682, 4, true,"#e7e7ff", 1.93);
EQ[46].descripcion="es un metal muy d??ctil y maleable, algo m??s duro que el oro, y presenta un brillo blanco met??lico susceptible al pulimento. Se mantiene en agua y aire, si bien su superficie se empa??a en presencia de ozono, sulfuro de hidr??geno o aire con azufre.";

EQ[47]=new ElementoQuimico("cadmio","Cd", 48,[2,8,18,18,2], 64, 112.411,4, true, "#fee1a7", 1.69);
EQ[47].descripcion="es uno de los metales t??xicos emitidos al medio ambiente que m??s tiende a acumularse en los alimentos. La principal fuente de contaminaci??n de cadmio en el ser humano es la ingesta de vegetales contaminados con este metal";

EQ[48] = new ElementoQuimico("indio", "In", 49, [2, 8, 18, 18, 3], 66, 114.818, 5, true, "#b9918f", 1.78);
EQ[48].descripcion = "es un metal blanco plateado, muy blando, que presenta un lustre brillante. Cuando se dobla el metal emite un sonido caracter??stico.";

EQ[49] = new ElementoQuimico("esta??o", "Sn", 50, [2, 8, 18, 18, 4], 69, 114.818, 5, true, "#869a9b", 1.96);
EQ[49].descripcion = "es maleable, y se oxida de forma superficial a temperatura ambiente. Este efecto lo hace resistente a la corrosi??n mediante pasivaci??n. Por tanto se utiliza para recubrir otros metales, protegi??ndolos as?? de la corrosi??n. Se encuentra adem??s en muchas aleaciones.";

EQ[50] = new ElementoQuimico("antimonio", "Sb", 51, [2, 8, 18, 18, 5], 71, 121.760, 6, true, "#b284c4", 2.05);
EQ[50].descripcion = "en su forma elemental es un s??lido cristalino, fundible, quebradizo, blanco plateado que presenta una conductividad el??ctrica y t??rmica baja y se evapora a bajas temperaturas. Este elemento semimet??lico se parece a los metales en su aspecto y propiedades f??sicas, pero se comportan qu??micamente como un no metal.";

EQ[51] = new ElementoQuimico("telurio", "Te", 52, [2, 8, 18, 18, 6], 76, 127.60, 6, true, "#dd9606", 2.10);
EQ[51].descripcion = "es un elemento relativamente estable, insoluble en agua y ??cido clorh??drico, pero soluble en ??cido n??trico y en agua regia. Reacciona con un exceso de cloro para formar dicloruro de teluro, TeCl2 y tetracloruro de teluro, TeCl4. Se oxida con ??cido n??trico y produce di??xido de teluro, TeO2, y con ??cido cr??mico para dar ??cido tel??rico, H2TeO4. En combinaci??n con el hidr??geno y ciertos metales, forma telururos, como el telururo de hidr??geno, H2Te, y el telururo de sodio, Na2Te.";

EQ[52] = new ElementoQuimico("yodo", "I", 53, [2, 8, 18, 18, 7], 74, 126.9044, 8, false, "#ab06aa", 2.66);
EQ[52].descripcion = "es un oligoelemento y se emplea principalmente en medicina, fotograf??a y como colorante. Qu??micamente, el yodo es el hal??geno menos reactivo y electronegativo. Como con todos los otros hal??genos (miembros del Grupo XVII en la tabla peri??dica), el yodo forma mol??culas diat??micas y por ello forma el diyodo de f??rmula molecular I2.";

EQ[53] = new ElementoQuimico("xen??n", "Xe", 54, [2, 8, 18, 18, 8], 77, 131.293, 9, false, "#5cb2c1", 2.60);
EQ[53].descripcion = "la palabra \"inerte\" ya no se usa para describir esta serie qu??mica, dado que algunos elementos de valencia cero forman compuestos. En un tubo lleno de gas xen??n, se emite un brillo azul cuando se le excita con una descarga el??ctrica. Se ha conseguido xen??n met??lico aplic??ndole presiones de varios cientos de kilobares. El xen??n tambi??n puede formar clatratos con agua cuando sus ??tomos quedan atrapados en un entramado de mol??culas de ox??geno.";

EQ[54] = new ElementoQuimico("cesio", "Cs", 55, [2, 8, 18, 18, 8, 1], 78, 132.9054, 0, true, "#7424a9", 0.79);  
EQ[54].descripcion = "reacciona en forma vigorosa con ox??geno para formar una mezcla de ??xidos. En aire h??medo, el calor de oxidaci??n puede ser suficiente para fundir y prender el metal. El cesio no reacciona con nitr??geno para formar nitruros, pero reacciona con el hidr??geno a temperaturas altas para producir un hidruro muy estable; reacciona en forma violenta con el agua y aun con hielo a temperaturas de hasta -116 ??C (-177 ??F) as?? como con los hal??genos, amon??aco y mon??xido de carbono.";

EQ[55] = new ElementoQuimico("bario", "Ba", 56, [2, 8, 18, 18, 8, 2], 81, 137.327, 1, true, "#00d900", 0.89);
EQ[55].descripcion = "Reacciona con el cobre y se oxida r??pidamente en el agua. El elemento es tan reactivo que no existe en estado libre en la naturaleza, aunque tambi??n se presenta en forma de f??rricos o azufres no solubles en agua. Algunos de sus compuestos se consideran diamantes.";

EQ[56] = new ElementoQuimico("lantano", "La", 57, [2,8,18,18,9,2], 82, 138.9054, 2, true, "#94dafe", 1.10);
EQ[56].descripcion = "existe solo en minerales a causa de su reactividad qu??mica";

EQ[57] = new ElementoQuimico("cerio","Ce" ,58, [2,8,18,19,9,2], 82, 140.116, 2, true, "#f9ffcf", 1.10);
EQ[57].descripcion = "es el lant??nido m??s abundante y econ??mico. El metal es duro y de color gris acerado, torn??ndose pardo rojizo. Es buen conductor del calor y la electricidad. Reacciona con los ??cidos diluidos y con el agua (produciendo hidr??geno). Es inestable en el aire seco, cubri??ndose de una capa de ??xido en el aire h??medo";

EQ[58]=new ElementoQuimico("praseodimio","Pr",59 ,[2,8,18,21,8,2], 82, 140.9076, 2, true, "#dcffd5", 1.12);
EQ[58].descripcion = "est?? disponible en peque??as cantidades en la corteza terrestre (9,5 ppm). Se encuentra en los minerales de tierra rara monacita y bastnasita, comprendiendo t??picamente cerca del 5% de los lant??nidos contenidos en estos, y puede ser recuperado de la bastnasita o de la monazita por un proceso de intercambio de iones, o por extracci??n solvente de contracorriente. El praseodimio tambi??n compone cerca del 5% del mischmetal";

EQ[59]=new ElementoQuimico("neodimio", "Nd", 60, [2,8,18,22,8,2], 85, 144.242, 2, true, "#cdffd3", 1.14);
EQ[59].descripcion = "est?? compuesto por 5 is??topos estables: 142Nd, 143Nd, 145Nd, 146Nd y 148Nd, siendo el m??s abundante (con un 27.2%) el 142Nd, y dos radiois??topos, 144Nd y 150Nd. Se han caracterizado en total 31 radiois??topos del neodimio, siendo el m??s estable el 150Nd con un per??odo de semidesintegraci??n (T??) de m??s de 1.1??1019 a??os, el 144Nd con uno de 2.29??1015 a??os, y el 147Nd con uno de 10.98 d??as. Los dem??s is??topos radiactivos tienen per??odos de semidesintegraci??n por debajo de los 3.38 d??as, y la mayor??a son inferiores a los 71 segundos";

EQ[60]=new ElementoQuimico("prometio", "Pm", 61, [2,8,18,23,8,2], 146, 145, 2, true, "#b1ffd0", 0);
EQ[60].descripcion = "es un elemento qu??mico de la tabla peri??dica cuyo s??mbolo es Pm y su n??mero at??mico es 61. Alg??n tiempo se le denomin?? ilinio (por Illinois). Aunque, tras la observaci??n de ciertas l??neas espectrales, algunos cient??ficos han reclamado haber descubierto este elemento en la naturaleza, nadie ha podido aislarlo de sustancias naturales";

EQ[61]=new ElementoQuimico("samario", "Sm", 62, [2,8,18,24,8,2], 88, 150.36, 2, true, "#a7fed1", 1.17);
EQ[61].descripcion = "es un elemento qu??mico de s??mbolo Sm y n??mero at??mico 62. Es miembro del grupo de las tierras raras. Su peso at??mico es de 150,35 y son 7 los is??topos que se encuentran en la naturaleza; 147Sm, 148Sm y 149Sm son radiactivos y emiten part??culas";

EQ[62] = new ElementoQuimico("europio","Eu", 63, [2,8,18,25,8,2], 89, 151.964, 2, true, "#80ffd1", 0)
EQ[62].descripcion="es uno de los elementos qu??micos que forman compuestos fluorescentes usados en dispositivos como televisiones en color, l??mparas fluorescentes y cristales. Todos sus compuestos qu??micos raros tienen propiedades comparables. En concreto, el ??xido de europio (Eu2O3) es ampliamente usado como sustancia fluorescente en los aparatos de televisi??n y como un activador de otros fosforescentes basados en el itrio"

EQ[63] = new ElementoQuimico("gadolinio", "Gd", 64, [2, 8, 18, 25, 9, 2], 63, 157.25, 2, true, "#5dfed4", 1.20);
EQ[63].descripcion = "es un metal raro de color blanco plateado, es maleable y d??ctil. Solo se encuentra en la naturaleza de forma combinada (sal). Puesto que la temperatura de Curie del gadolinio es 292 K (18,85 ??C) su magnetismo depender?? de la temperatura ambiente. Por encima de dicha temperatura ser?? paramagn??tico, y ferromagn??tico por debajo.";

EQ[64] = new ElementoQuimico("terbio", "Tb", 65, [2, 8, 18, 27, 8, 2], 94, 158.9253, 2, true, "#43fed3", 0);
EQ[64].descripcion = "tiene una densidad de 8,3 g/cm??. Con un punto de fusi??n de 1.360 ??C y un punto de ebullici??n de 3.041 ??C. Es un metal de transici??n interna de la familia de los lant??nidos del Sistema Peri??dico. Se encuentra habitualmente como ??xido en las tierras raras. Forma sales trivalentes de color blanco cuyas soluciones son incoloras. Su concentraci??n en la corteza terrestre es de 0,09 ppm.";

EQ[65] = new ElementoQuimico("disprosio", "Dy", 66, [2, 8, 18, 28, 8, 2], 96, 162.500, 2, true, "#29fed0", 1.22);
EQ[65].descripcion = "es una tierra rara que presenta brillo met??lico plateado. Es tan blando que puede ser cortado con una navaja, y puede ser procesado por m??quinas sin emitir chispas, si se evita el sobrecalentamiento. Sus propiedades pueden verse muy afectadas por cantidades muy peque??as de impurezas.";

EQ[66] = new ElementoQuimico("holmio", "Ho", 67, [2, 8, 18, 29, 8, 2], 98, 164.9303, 2, true, "#06feb2", 1.23);
EQ[66].descripcion = "es un elemento met??lico colocado en el grupo de las tierras raras. El is??topo estable 165Ho constituye el 100% del elemento en la naturaleza. El metal es paramagn??tico, pero a medida que la temperatura disminuye se convierte en antiferromagn??tico y luego al sistema ferromagn??tico.";

EQ[67] = new ElementoQuimico("erbio", "Er", 68, [2, 8, 18, 30, 8, 2], 99, 167.259, 2, true, "#02ec95", 1.24);
EQ[67].descripcion = "es un elemento trivalente, maleable, relativamente estable en el aire y no se oxida tan r??pidamente como otros metales de las tierras raras. Sus sales son rosadas y el elemento origina un caracter??stico espectro de absorci??n en el espectro visible, ultravioleta y cerca del infrarrojo. Su ??xido es la erbia. Las propiedades del erbio est??n muy influenciadas por la cantidad y tipo de impurezas presentes. El erbio no tiene papel biol??gico conocido alguno aunque algunos creen que es capaz de estimular el metabolismo.";

EQ[68] = new ElementoQuimico("tulio", "Tm", 69, [2, 8, 18, 31, 8, 2], 100, 168.9342, 2, true, "#09db6e", 1.25);
EQ[68].descripcion = "es el menos abundante de los lant??nidos (el prometio es menos abundante que el Tulio, pero no se lo encuentra naturalmente en la Tierra). Es un metal blando, con un lustre gris plateado brillante. A pesar de su alto precio y escasez, el tulio es utilizado como fuente de radiaci??n en los equipos de rayos X port??tiles y l??seres de estado s??lido.";

EQ[69] = new ElementoQuimico("iterbio", "Yb", 70, [2, 8, 18, 32, 8, 2], 103, 173.054, 2, true, "#07cb4d", 0.00);
EQ[69].descripcion = "es un elemento met??lico plateado blando, una tierra rara de la serie de los lant??nidos que se halla en la gadolinita, la monazita y el xenotimo. Es un elemento blando, maleable y bastante d??ctil que exhibe un lustre plateado brillante. Es una tierra rara, f??cilmente atacable y disoluble con ??cidos minerales, reacciona lentamente con el agua, y se oxida al aire.";

EQ[70] = new ElementoQuimico("lutecio", "Lu", 71, [2, 8, 18, 32, 9, 2], 104, 174.9668, 2, true, "#06bc34", 1.27);
EQ[70].descripcion = "es un metal trivalente, de color blanco plateado, resistente a la corrosi??n y, en presencia de aire, relativamente estable. De todas las tierras raras es el elemento m??s pesado y duro.";

EQ[71] = new ElementoQuimico("hafnio", "Hf", 72, [2, 8, 18, 32, 10, 2], 106, 178.49, 4, true, "#6cceff", 1.30);
EQ[71].descripcion = "Es un metal de transici??n, brillante, gris-plateado, qu??micamente muy parecido al circonio, encontr??ndose en los mismos minerales y compuestos, y siendo dif??cil separarlos. Se usa en aleaciones con wolframio en filamentos y en electrodos. Tambi??n se utiliza como material de barras de control de reactores nucleares debido a su capacidad de absorci??n de neutrones.";

EQ[72] = new ElementoQuimico("tantalio", "Ta", 73, [2, 8, 18, 32, 11, 2], 108, 180.9478, 4, true, "#66b8ff", 1.50);
EQ[72].descripcion = "es un metal gris, brillante, pesado, d??ctil, de alto punto de fusi??n, buen conductor de la electricidad y del calor y muy duro. Es muy resistente al ataque por ??cidos; se disuelve empleando ??cido fluorh??drico o mediante fusi??n alcalina.";

EQ[73] = new ElementoQuimico("wolframio", "W", 74, [2, 8, 18, 32, 12, 2], 110, 183.84, 4, true, "#30ace2", 2.36);
EQ[73].descripcion = "Es un metal escaso en la corteza terrestre, pero se encuentra en determinados minerales en forma de ??xidos o sales. Es de color gris acerado, muy duro y denso, tiene el punto de fusi??n m??s elevado de todos los metales y el punto de ebullici??n m??s alto de todos los elementos conocidos.";

EQ[74] = new ElementoQuimico("renio", "Re", 75, [2, 8, 18, 32, 13, 2], 111, 186.207, 4, true, "#3598c1", 1.90);
EQ[74].descripcion = "es capaz de formar aniones complejos, tales como el pentacloruro de renio, que son capaces de crear sales diferentes debido al efecto de oxidaci??n que produce este elemento cuando recibe el contacto del aire a elevadas temperaturas.";

EQ[75] = new ElementoQuimico("osmio", "Os", 76, [2, 8, 18, 32, 14, 2], 114, 190.23, 4, true, "#3587af", 2.20);
EQ[75].descripcion = "en su forma met??lica es de color blanco gris??ceo, duro y brillante, incluso a altas temperaturas, aunque es dif??cil encontrarlo en esta forma. Es m??s f??cil obtener osmio en polvo, aunque expuesto al aire tiende a la formaci??n del tetra??xido de osmio, OsO4, compuesto t??xico (peligroso para los ojos), oxidante en??rgico, de un olor fuerte, y vol??til.";

EQ[76] = new ElementoQuimico("irdio", "Ir", 77, [2, 8, 18, 32, 15, 2], 177, 192.217, 4, true, "#2472a2", 2.20);
EQ[76].descripcion = "es de color blanco, parecido al platino, pero presenta una ligera coloraci??n amarilla.??? Es dif??cil trabajar este metal, pues es muy duro y quebradizo.??? Es el metal m??s resistente a la corrosi??n. No es atacado por los ??cidos, ni siquiera por el agua regia.";

EQ[77] = new ElementoQuimico("platino", "Pt", 78, [2, 8, 18, 32, 17, 1], 117, 195.084, 4, true, "#f6f1db", 2.28);
EQ[77].descripcion = "se trata de un metal de transici??n blanco gris??ceo, precioso, pesado, maleable y d??ctil. Es resistente a la corrosi??n y se encuentra en distintos minerales, frecuentemente junto con n??quel y cobre; tambi??n se puede encontrar como metal. Se emplea en joyer??a, equipamiento de laboratorio, contactos el??ctricos, empastes y catalizadores de autom??viles.";

EQ[78] = new ElementoQuimico("oro", "Au", 79, [2, 8, 18, 32, 18, 1], 118, 196.9665, 4, true, "#d9d926", 2.54);
EQ[78].descripcion = "es un metal de transici??n blando, brillante, amarillo, pesado, maleable y d??ctil. El oro no reacciona con la mayor??a de los productos qu??micos, pero es sensible y soluble al cianuro, al mercurio, al agua regia, al cloro y a la lej??a. Este metal se encuentra normalmente en estado puro, en forma de pepitas y dep??sitos aluviales. Es un elemento que se crea gracias a las condiciones extremas en el n??cleo colapsante de las supernovas.";

EQ[79] = new ElementoQuimico("mercurio", "Hg", 80, [2, 8, 18, 32, 18, 2], 121, 200.59, 4, true, "#c2c4d0", 2.00);
EQ[79].descripcion = "El envenenamiento por mercurio puede resultar de la exposici??n a las formas solubles en agua del mercurio, por la inhalaci??n de vapor de mercurio, o por la ingesti??n de cualquiera de sus formas. se usa en term??metros, bar??metros, man??metros, esfigmoman??metros, algunos tipos de v??lvulas como las bombas de vac??o, los interruptores de mercurio, las l??mparas fluorescentes y otros dispositivos, a pesar de que la preocupaci??n sobre la toxicidad del elemento ha llevado a los term??metros y tensi??metros de mercurio a ser eliminados en gran medida en entornos cl??nicos en favor de otras alternativas";

EQ[80] = new ElementoQuimico("talio", "Tl", 81, [2, 8, 18, 32, 18, 3], 123, 204.3833, 5, true, "#b77368", 1.62);
EQ[80].descripcion = "este metal es muy blando y maleable; se puede cortar con un cuchillo. Al ser expuesto al aire pasa de presentar un brillo met??lico a r??pidamente empa??arse con un tono gris azulado parecido al plomo.";

EQ[81] = new ElementoQuimico("plomo", "Pb", 82, [2, 8, 18, 32, 18, 4], 125, 207.2, 5, true, "#757984", 2.23);
EQ[81].descripcion = "es flexible, inel??stico y se funde con facilidad. Es relativamente resistente al ataque del ??cido sulf??rico y del ??cido clorh??drico, aunque se disuelve con lentitud en ??cido n??trico y ante la presencia de bases nitrogenadas. Es un metal pesado y t??xico, y la intoxicaci??n por plomo se denomina como saturnismo o plumbosis.";

EQ[82] = new ElementoQuimico("bismuto", "Bi", 83, [2, 8, 18, 32, 18, 5], 126, 208.9804, 5, true, "#b26cc5", 2.02);
EQ[82].descripcion = "es s??lido flota sobre su estado l??quido, por tener menor densidad en el estado s??lido. Se expande al solidificarse; esta extra??a propiedad lo convierte en un metal id??neo para fundiciones. Algunas de sus aleaciones tienen puntos de fusi??n inusualmente bajos. Es una de las sustancias m??s fuertemente diamagn??ticas (dificultad para magnetizarse). Es un mal conductor del calor y la electricidad, y puede incrementarse su resistencia el??ctrica en un campo magn??tico, propiedad que lo hace ??til en instrumentos para medir la fuerza de estos campos.";

EQ[83] = new ElementoQuimico("polonio", "Po", 84, [	2, 8, 18, 32, 18, 6], 126, 210, 6, true, "#c07a0a", 2.00);
EQ[83].descripcion = "estas sustancias se disuelven con mucha facilidad en ??cidos, pero es solo ligeramente soluble en alcalinos. Est?? qu??micamente relacionado con el teluro y el bismuto. El polonio es un metal vol??til, reducible al 50% tras 45 horas al aire a una temperatura de 54,8 ??C (328 K). Ninguno de los 50 isotopos [n??mero estimado] de polonio es estable. Es extremadamente t??xico y altamente radiactivo.";

EQ[84] = new ElementoQuimico("astato", "At", 85, [ 2, 8, 18, 32, 18, 7], 125, 210, 8, false, "#926c5f", 2.20);
EQ[84].descripcion = "el comportamiento qu??mico de este elemento altamente radiactivo es muy similar al de otros hal??genos, especialmente el yodo. Se piensa que el ??stato es m??s met??lico que el yodo. Investigadores del Laboratorio Nacional de Brookhaven han realizado experimentos en los que se han identificado y medido reacciones elementales que involucran al ??stato.";

EQ[85] = new ElementoQuimico("rad??n", "Rn", 86, [ 2, 8, 18, 32, 18, 8], 134, 220, 9, false, "#599db0", 0.00);
EQ[85].descripcion = "es un elemento radiactivo y gaseoso, encuadrado dentro de los llamados gases nobles. En su forma gaseosa es incoloro, inodoro e ins??pido y en forma s??lida su color es rojizo. Es producto de la desintegraci??n del radio (226Ra), elemento altamente radiactivo. El is??topo 219Rn es producto de la desintegraci??n del actinio, llamado actin??n y tiene una vida media de 4 segundos.";

EQ[86] = new ElementoQuimico("francio", "Fr", 87, [ 2, 8, 18, 32, 18, 8, 1], 136, 223, 0, true, "#5c0587", 0.70);
EQ[86].descripcion = "fuera del laboratorio, el francio es extremadamente escaso, encontr??ndose en trazas en menas de uranio y de torio, donde el 223Fr est?? continuamente form??ndose y desintegr??ndose. Es menos estable que cualquier otro elemento m??s ligero que el nobelio (elemento 102);3??? su is??topo m??s estable, el 223Fr, posee un per??odo de semidesintegraci??n menor de 22 minutos.";

EQ[87] = new ElementoQuimico("radio", "Ra", 88, [2, 8, 18, 32, 18, 8, 2], 138, 226, 1, true, "#059905", 0.90);
EQ[87].descripcion = "es el elemento m??s pesado de los metales alcalinot??rreos, es intensamente radiactivo y se parece qu??micamente al bario. Los preparados de radio son destacables porque son capaces de mantenerse a m??s alta temperatura que su entorno y por sus radiaciones, que pueden ser de tres tipos: rayos alfa, rayos beta y rayos gamma. Adem??s, el radio produce neutrones si se mezcla con berilio.";

EQ[88] = new ElementoQuimico("actinio", "Ac", 89, [2, 8, 18, 32, 18, 9, 2], 138, 227, 3, true, "#8ebbff", 1.10);
EQ[88].descripcion = "es un elemento met??lico, radiactivo como todos los act??nidos y de color plateado. Debido a su intensa radiactividad brilla en la oscuridad con una luz azulada. El is??topo 227Ac, que se encuentra s??lo en trazas en los minerales de uranio, es un emisor de part??culas ?? y ?? con un periodo de semidesintegraci??n de 21,773 a??os. Una tonelada de mineral de uranio contiene cerca de 0,1 g de actinio.";

EQ[89] = new ElementoQuimico("torio", "Th", 90, [2, 8, 18, 32, 18, 10, 2], 142, 232.0380, 3, true, "#08c6ff", 1.30);
EQ[89].descripcion = "pertenece a la familia de las sustancias radiactivas, si bien su periodo de semidesintegraci??n es extremadamente largo. Su potencial como combustible nuclear, como material f??rtil, se debe a que presenta una alta secci??n eficaz frente a neutrones lentos (t??rmicos), derivando en protactinio-233, que r??pidamente se desintegra en uranio-233, el cual es un is??topo fisible que puede sostener una reacci??n nuclear en cadena. Esta aplicaci??n todav??a est?? en fase de desarrollo.";

EQ[90] = new ElementoQuimico("protactinio", "Pa", 91, [2, 8, 18, 32, 20, 9, 2], 140, 231.0358, 3, true, "#07b5fe", 1.50);
EQ[90].descripcion = "presenta un brillo met??lico intenso. Debido a su escasez, alta radioactividad y toxicidad, actualmente no existen usos para el protactinio fuera de la investigaci??n cient??fica b??sica. El Protactinio-231 (que se forma por la desintegraci??n alfa del Uranio-235 seguido de una desintegraci??n beta del Torio-231) podr??a quiz??s mantener una reacci??n nuclear en cadena y, en principio, podr??a ser usado para construir una bomba nuclear. La masa cr??tica, seg??n Walter Seifritz, es 750??180 kg. Otros autores concluyen que no es posible una reacci??n en cadena usando 231Pa.";

EQ[91] = new ElementoQuimico("uranio", "U", 92, [2, 8, 18, 32, 21, 9, 2], 146, 238.0289, 3, true, "#00a5ff", 1.38);
EQ[91].descripcion = "tiene el mayor peso at??mico de entre todos los elementos que se encuentran en la naturaleza. El uranio es aproximadamente un 70 % m??s denso que el plomo, aunque menos denso que el oro o el wolframio. Es levemente radiactivo. en la naturaleza se presenta en muy bajas concentraciones (unas pocas partes por mill??n o ppm) en rocas, tierras, agua y los seres vivos. Para su uso el uranio debe ser extra??do y concentrado a partir de minerales que lo contienen, como por ejemplo la uranitita";

EQ[92] = new ElementoQuimico("neptunio", "Np", 93, [2, 8, 18, 32, 22, 9, 2], 144, 237, 3, true, "#069bff", 1.36);
EQ[92].descripcion = "se obtiene artificialmente. Es un metal blanco plateado, similar qu??micamente al uranio. Existen diversas variedades cristalinas. El neptunio es un elemento reactivo que es mezclable a la mayor??a de los elementos.";

EQ[93] = new ElementoQuimico("plutonio", "Pu", 94, [2, 8, 18, 32, 24, 8, 2], 150, 244, 3, true, "#078afe", 1.28);
EQ[93].descripcion = "es un metal act??nido con apariencia gris plateada que se oscurece cuando es expuesto al aire, formando una capa opaca cuando se oxida. El elemento normalmente exhibe seis estados alotr??picos y cuatro de oxidaci??n. Reacciona con el carbono, los hal??genos, nitr??geno y silicio. Cuando se expone al aire h??medo forma ??xidos e hidruros que expanden hasta un 70% su volumen, que a su vez, se desprende en forma de polvo que puede inflamarse de forma espont??nea. Tambi??n es un elemento radiactivo y se puede acumular en los huesos. Estas propiedades hacen que manipular plutonio sea peligroso.";

EQ[94] = new ElementoQuimico("americio", "Am", 95, [2, 8, 18, 32, 25, 8, 2], 148, 243, 3, true, "#727cf5", 1.30);
EQ[94].descripcion = "Todos sus is??topos son radiactivos y no existen en la naturaleza. Tiene un lustre plateado y blanco. Es m??s plateado que el plutonio y el neptunio, y aparentemente m??s maleable que este o el uranio. La desintegraci??n alfa de 241Am es aproximadamente tres veces la del radio. Unos cuantos gramos de 241Am emiten una alta cantidad de rayos gamma, lo cual crear??a serios problemas de salud a cualquiera que se expusiese al elemento. Tambi??n presenta la caracter??stica de que es fisible.";

EQ[95] = new ElementoQuimico("curio", "Cm", 96, [2, 8, 18, 32, 25, 9, 2], 151, 247, 3, true, "#937ce8", 1.30);
EQ[95].descripcion = "se produce bombardeando plutonio con part??culas alfa (iones de helio). Es un act??nido. El curio no existe en el ambiente terrestre, pero puede producirse en forma artificial. Sus propiedades qu??micas se parecen tanto a las de las tierras raras t??picas que, si no fuera por su radiactividad, podr??a confundirse f??cilmente con uno de estos elementos. Entre los is??topos conocidos del curio figuran los de n??mero de masa 238 a 250. El is??topo 244Cm es de particular inter??s a causa de su uso potencial como una fuente compacta de fuerza termoel??ctrica, al utilizarse el calor generado por decaimiento nuclear para generar fuerza el??ctrica.";

EQ[96] = new ElementoQuimico("berkelio", "Bk", 97, [2, 8, 18, 32, 27, 8, 2], 150, 247, 3, true, "#a36de7", 1.30);
EQ[96].descripcion = "el is??topo principal del berkelio es el berkelio-249,4??? el cual se sintetiza en cantidades ??nfimas en un reactor nuclear de alto flujo, especialmente en el Oak Ridge National Laboratory de Tennessee, Estados Unidos, y en el Research Institute of Atomic Reactors de Dimitrovgrad, Rusia. Para producir el is??topo berkelio-247, se irradia el is??topo sint??tico curio-244, que es muy escaso, con part??culas alfa de alta energ??a.";

EQ[97] = new ElementoQuimico("californio", "Cf", 98, [2, 8, 18, 32, 28, 8, 2], 153, 251, 3, true, "#b44bdc", 1.30);
EQ[97].descripcion = " es un elemento qu??mico radiactivo. de color blanco plateado con un punto de fusi??n de 900 ?? 30 ??C y un punto de ebullici??n estimado de 1745 ??C.??? El metal puro es maleable y puede ser cortado f??cilmente con una cuchilla de afeitar. El californio met??lico empieza a evaporarse por encima de los 300 ??C en el vac??o.??? Por debajo de 51 K (???220 ??C) es ferromagn??tico o ferrimagn??tico ???act??a como un im??n???, entre 48 y 66 K es antiferromagn??tico ???un estado intermedio??? y por encima de los 160 K (???110 ??C) es paramagn??tico, por lo que puede convertirse en magn??tico gracias a campos magn??ticos externos.";

EQ[98] = new ElementoQuimico("einstenio", "Es", 99, [2, 8, 18, 32, 29, 8, 2], 153, 252, 3, true, "#c32cdd", 1.30);
EQ[98].descripcion = "su m??todo de obtenci??n consiste en irradiar aproximadamente 1 kg de Pu-239 en un reactor para generar Pu-242. Este Pu-242 se introduce en bolas de ??xido de plutonio y aluminio en polvo. Posteriormente estas bolas se introducen en varillas y se irradian. Finalmente, se introducen las varillas en un reactor isot??pico de alto flujo. Tras todo esto se separa el einstenio del californio.";

EQ[99] = new ElementoQuimico("fermio", "Fm", 100, [2, 8, 18, 32, 30, 8, 2], 157, 257, 3, true, "#c22cc9", 1.30);
EQ[99].descripcion = "no se encuentra en la naturaleza; su descubrimiento y producci??n se alcanza por transmutaci??n artificial de elementos m??s ligeros. es un elemento qu??mico radiactivo. La fisi??n espont??nea es el modo principal de decaimiento para 244Fm, 256Fm y 258Fm. El is??topo con vida m??s larga es 257Fm, el cual tiene una vida media de unos 100 d??as.";

EQ[100] = new ElementoQuimico("mandelevio", "Md", 101, [2, 8, 18, 32, 31, 8, 2], 157, 258, 3, true, "#cb14a0", 1.30);
EQ[100].descripcion = "Lo identificaron Albert Ghiorso, Bernard G. Harvey, Gregory R. Choppin, Stanley G. Thompson y Glenn T. Seaborg el 19 de febrero de 1955 mediante el bombardeo del is??topo einstenio-253 con iones helio en el ciclotr??n de 60 pulgadas de la Universidad de California en Berkeley. El is??topo producido fue el 256-Md (vida media de 76 minutos). El is??topo 258-Md (55 d??as) se ha obtenido por bombardeo de un is??topo del einstenio con iones helio.";

EQ[101] = new ElementoQuimico("nobelio", "No", 102, [2, 8, 18, 32, 32, 8, 2], 157, 259, 3, true, "#cb14a0", 1.30);
EQ[101].descripcion = "su decaimiento se realiza por emisi??n de part??culas alfa, es decir, un ion de helio doblemente cargado. Hasta la fecha solo se han producido cantidades at??micas del elemento. El nobelio es el d??cimo elemento m??s pesado que el uranio producido sint??ticamente y el 14.?? miembro de los act??nidos.";

EQ[102] = new ElementoQuimico("laurencio", "Lr", 103, [2, 8, 18, 32, 32, 8, 2], 159, 262, 3, true, "#d30687", 0.00);
EQ[102].descripcion = "tambi??n es un elemento sint??tico radiactivo de la tabla peri??dica de los elementos. Los primeros ??tomos de lawrencio fueron producidos al bombardear un blanco de tres miligramos, compuesto de tres is??topos de californio con n??cleos de boro-10 y boro-11 del Acelerador lineal de iones pesados. Todos los is??topos del lawrencio son radiactivos; su is??topo m??s estable conocido es 266Lr, con un per??odo de semidesintegraci??n de aproximadamente 11 horas.4??? Todos los dem??s is??topos, excepto 260Lr,???261Lr,???262Lr y 266Lr, se desintegran con una vida menor a un minuto.";

EQ[103] = new ElementoQuimico("Rutherfordio", "Rf", 104, [2, 8 , 18, 32, 32, 10, 2], 153, 261, 4, true, "#da0473", 0);
EQ[103].descripcion = "su nombre fue elegido en honor del Bar??n Ernest Rutherford, cient??fico colaborador del modelo at??mico y f??sica nuclear. Este es un elemento sint??tico altamente radiactivo cuyo is??topo m??s estable es el 261Rf con una vida media de aproximadamente 13 horas.";

EQ[104] = new ElementoQuimico("dubnio", "Db", 105, [2, 8, 18, 32, 32, 11, 2], 157, 262, 4, true, "#dc056d", 0.00);
EQ[104].descripcion = "es un elemento sint??tico y radiactivo; y su is??topo m??s estable conocido, dubnio-268, tiene un per??odo de semidesintegraci??n de aproximadamente veintiocho horas. Se produjeron cantidades microsc??picas de dubnio en laboratorios de la Uni??n Sovi??tica y California. Fue descubierto por el ruso Georgii Flerov en 1967-1970, y por el estadounidense Albert Ghiorso en 1970. Cuando se descubri??, la prioridad del descubrimiento y por lo tanto el nombramiento del elemento, se disput?? entre los cient??ficos sovi??ticos y estadounidenses, que unos propusieron llamarlo Nielsbohrio y los otros Hahnio, aunque estos nombres no fueron reconocidos internacionalmente.";

EQ[105] = new ElementoQuimico("seaborgio", "Sg", 106, [2, 8, 18, 32, 32, 12, 2], 160, 266, 4, true, "#e00664", 0.00);
EQ[105].descripcion = "es un elemento sint??tico cuyo is??topo m??s estable es el 271Sg que tiene una vida media de 2,4 minutos. Su naturaleza qu??mica es similar a la del wolframio. Existen 12 is??topos conocidos del seaborgio, el de mayor vida media es el 271Sg que decae por desintegraci??n alfa y fisi??n espont??nea. Tiene una vida media de 2,4 minutos. El is??topo encontrado de menor vida media es el 258Sg que tambi??n sufre desintegraci??n alfa y fisi??n espont??nea. Su vida media es de 2,9 ms.";

EQ[106] = new ElementoQuimico("bohrio", "Bh", 107, [2, 8, 18, 32, 32, 13, 2], 157, 264, 4, true, "#e8054d", 0.00);
EQ[106].descripcion = "fue sintetizado e identificado sin ambig??edad en 1981 por un equipo de Darmstadt, Alemania, equipo dirigido por P. Armbruster y G. M??zenberg. La reacci??n usada para producir el elemento fue propuesta y aplicada en 1976 por un grupo de Dubna (cerca de Mosc??), que estaba bajo la gu??a de Yuri Oganesi??n. Un blanco de 209Bi fue bombardeado por un haz de proyectiles de 54Cr. La mejor t??cnica par identificar un nuevo is??topo es su correlaci??n gen??tica con is??topos conocidos a trav??s de una cadena de desintegraci??n radiactiva. En general, estas cadenas de decaimiento se interrumpen por fisi??n espont??nea. Con el fin de aplicar el an??lisis de cadena de decaimiento deber??an producirse aquellos is??topos que son m??s estables frente a la fisi??n espont??nea, es decir, is??topos con n??meros impares de protones y neutrones.";

EQ[107] = new ElementoQuimico("hassio", "Hs", 108, [2, 8, 16, 32, 32, 16, 2], 169, 277, 4, true, "#ea0641", 0.00);
EQ[107].descripcion = "su is??topo m??s estable es el Hs-269, que tiene un periodo de semidesintegraci??n de 9,7 segundos. Fue sintetizado por primera vez en 1984 por el grupo de investigaci??n alem??n Gesellschaft f??r Schwerionenforschung localizado en Darmstadt. El nombre hasio propuesto por el grupo se debe al estado alem??n de Hesse en el que se encuentra el GSI.";

EQ[108] = new ElementoQuimico("meitnerio", "Mt", 109, [2, 8, 18, 32, 32, 15, 2], 159, 268, 4, true, "#f10438", 0.00);
EQ[108].descripcion = "es un elemento sint??tico cuyo is??topo m??s estable es el 278Mt, cuya vida media es de 7,6 s. Fue encontrado por accidente en 1982 por Peter Armbruster y Gottfried M??nzenberg en el Instituto de Investigaci??n de iones Pesados (Gesellschaft f??r Schwerionenforschung) en Darmstadt. El equipo lo consigui?? bombardeando bismuto-209 con n??cleos acelerados de hierro-58. La creaci??n de este elemento demostr?? que las t??cnicas de fusi??n nuclear pod??an ser usadas para crear nuevos n??cleos pesados.";

EQ[109] = new ElementoQuimico("darmstatio", "Ds", 110, [2, 8, 18, 32, 32, 16, 2], 161, 271, 4, true, "#f5022e", 0.00);
EQ[109].descripcion = "es un elemento sint??tico que decae r??pidamente; sus is??topos de n??meros m??sicos entre 267 y 273 tienen periodos de semidesintegraci??n del orden de los microsegundos. Fue sintetizado por primera vez el mi??rcoles 9 de noviembre de 1994 en la Gesellschaft f??r Schwerionenforschung en Darmstadt, Alemania, por P. Armbruster, S. Hofmann, G. M??nzenberg y otros.";

EQ[110] = new ElementoQuimico("roentgenio", "Rg", 111, [2, 8, 18, 32, 32, 17, 2], 161, 272, 4, true, "#f50630", 0.00);
EQ[110].descripcion = "fue descubierto en 1994 por cient??ficos alemanes en Darmstadt. En noviembre del 2004 recibi?? el nombre de roentgenio en honor a Wilhelm Conrad Roentgen (1845-1923), premio Nobel de F??sica, descubridor de los rayos X. El roentgenio se obtiene a trav??s del bombardeo de hojas de bismuto (Bi) con iones de n??quel (Ni), decayendo en 15 milisegundos.";

EQ[111] = new ElementoQuimico("copernicio", "Cn", 112, [2, 8, 18, 32, 32, 18, 2], 173, 285, 4, true, "#f6052f", 0.00);
EQ[111].descripcion = "su apariencia f??sica no se conoce a??n, pero podr??a calcularse, sabiendo que por ahora el is??topo conocido, de 285 de masa at??mica, tiene una vida media de 0,24 ms. Se trata de un elemento qu??mico superpesado que, en ese entonces, a falta de un nombre (tienen el privilegio de elegirlo), se llamaba unumbio, que en lat??n significa ??uno uno dos??. Este elemento, que en realidad fue descubierto en 1996, ve as?? confirmada su existencia, aunque s??lo han conseguido producir literalmente cuatro ??tomos de ??l.";

EQ[112] = new ElementoQuimico("nihonio", "Nh", 113, [2, 8, 18, 32, 32, 18, 3], 171, 284, 5, true, "#fa042b", 0.00);
EQ[112].descripcion = "es un elemento transact??nido del bloque p, y es miembro del s??ptimo per??odo dentro del grupo del boro, aunque no se realiz?? ning??n experimento qu??mico que haya confirmado que este se comporte como el hom??logo m??s pesado que el talio dentro de este grupo. Se cree que el nihonio tenga algunas propiedades similares a la de sus hom??logos m??s livianos, es decir, boro, aluminio, galio, indio y talio, aunque tambi??n deber??a mostrar varias diferencias con estos. A diferencia de otros elementos del bloque p, se prev?? que muestre algunas caracter??sticas de metales de transici??n."

EQ[113] = new ElementoQuimico("flerovio", "Fl", 114, [2, 8, 18, 32, 32, 18, 4], 175, 289, 5, true, "#ff051e", 0.00);
EQ[113].descripcion = "se han observado alrededor de 80 desintegraciones de ??tomos de flerovio, 50 de ellas directamente y 30 de la desintegraci??n de los elementos m??s pesados livermorio y oganes??n. Todas las desintegraciones han sido asignadas a los cuatro is??topos vecinos con n??meros de masa 286-289. El is??topo de m??s larga vida conocido actualmente es el 289Fl114 con una vida media de aproximadamente 2,6 s, aunque hay evidencias de un is??mero, 289bFl114, con una vida media de aproximadamente 66 s, que ser??a uno de los n??cleos m??s longevos en la regi??n de los elementos superpesados.";

EQ[114] = new ElementoQuimico("moscovio", "Mc", 115, [2, 8, 18, 32, 32, 18, 5], 173, 288, 5, true, "#ff0423", 0.00);
EQ[114].descripcion = "actualmente se conocen cuatro is??topos desde 287Mc hasta 290Mc. Se prev?? que el is??topo m??s estable del moscovio sea el 299Mc, que contiene el n??mero m??gico de 184 neutrones. El is??topo con mayor n??mero de neutrones conocido hasta la fecha es el 290Mc, con 175 neutrones. Es muy inestable, con una vida media de mil??simas de segundo. Su nombre hace referencia a la provincia de Mosc??, regi??n a la que pertenece la ciudad rusa donde se descubri??, Dubn??.";

EQ[115] = new  ElementoQuimico("livermorio", "Lv", 116, [2, 8, 18, 32, 32, 18, 6], 176, 292, 5, true, "#ff0520", 0.00);
EQ[115].descripcion = "por su inestabilidad, vida media tan reducida y dificultad de obtenci??n, en la actualidad son nulas las aplicaciones industriales, comerciales o propagand??sticas de este elemento muy pesado por lo que su aplicaci??n se relega s??lo a la investigaci??n cient??fica..";

EQ[116] = new ElementoQuimico("teneso", "Ts", 117, [2, 8, 18, 32, 32, 18, 7], 177, 294, 8, false, "#ff0423", 0.00);
EQ[116].descripcion = "en un experimento en 2011, se cre?? directamente uno de sus productos de desintegraci??n, confirmando parcialmente los resultados del experimento inicial; el experimento, adem??s, fue repetido con ??xito en 2012. es probable que el teneso tenga propiedades significativamente diferentes de las del resto de elementos del grupo, aunque se prev?? que el punto de fusi??n, el punto de ebullici??n y la primera energ??a de ionizaci??n sigan las tendencias peri??dicas.";

EQ[117] = new ElementoQuimico("oganes??n", "Og", 118, [2, 8, 18, 32, 32, 18, 8], 176, 294, 9, false, "#ff0222", 0.00);
EQ[117].descripcion = "es radiactivo y altamente inestable, por lo que desde 2002 solo se han detectado tres o posiblemente cuatro ??tomos del is??topo 294Og.13??? Si bien este hecho no posibilita un estudio experimental adecuado que pueda caracterizar sus propiedades y sus posibles compuestos, varios c??lculos te??ricos han permitido predecir muchas de sus cualidades, incluidas algunas inesperadas. Si bien inicialmente se pensaba que era un gas, ahora se supone que es un s??lido bajo condiciones normales de presi??n y temperatura.";