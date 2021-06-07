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
        1 = Alcalinotérreos
        2 = Latánidos
        3 = Actínidos
        4 = Metales de transición
        5 = Otros metales
        6 = Metaloides
        7 = Otros no metales
        8 = Halógenos
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

EQ[0] = new ElementoQuimico("hidrógeno", "H", 1, [1], 0, 1.00794, 7, false, "#ffffff", 2.20);
EQ[0].descripcion = "muchos metales pueden sufrir fragilidad en su presencia, Es altamente soluble en diversos compuestos que poseen tierras raras y metales de transición, y puede ser disuelto tanto en metales cristalinos como amorfos.";

EQ[1] = new ElementoQuimico("helio", "He", 2, [2], 2, 4.002602, 9, false, "#bbffff", 0);
EQ[1].descripcion = "es un gas monoatómico incoloro e inodoro que cuenta con el menor punto de ebullición de todos los elementos químicos y solo puede ser licuado bajo presiones muy grandes y no puede ser congelado.";

EQ[2] = new ElementoQuimico("litio", "Li", 3, [2, 1], 4, 6.941, 0, true, "#d49cff", 0.98);
EQ[2].descripcion = "se emplea especialmente en aleaciones conductoras del calor, en baterías eléctricas y, sus sales, en el tratamiento del trastorno bipolar. Acercado a una llama la torna carmesí pero, si la combustión es violenta, la llama adquiere un color blanco brillante.";

EQ[3] = new ElementoQuimico("berilio", "Be", 4, [2, 2], 5, 9.012182, 1,true, "#ceff00", 1.57);
EQ[3].descripcion = "es un elemento Alcalinotérreo bivalente, tóxico, de color gris, duro, ligero y quebradizo. Se emplea principalmente como endurecedor en aleaciones, especialmente de cobre.";

EQ[4] = new ElementoQuimico("boro", "B", 5, [2, 3], 6, 10.811, 6, true, "#fec4c3", 2.04);
EQ[4].descripcion = "hay dos alótropos del boro; el boro amorfo es un polvo marrón, pero el boro metálico es negro. La forma metálica es dura (9,5 en la escala de Mohs) y es un mal conductor a temperatura ambiente. No se ha encontrado libre en la naturaleza.";

EQ[5] = new ElementoQuimico("carbono", "C", 6, [2, 4], 9, 12.0107, 7, false, "#808080", 2.55);
EQ[5].descripcion = "los átomos de carbono pueden unirse de diferentes maneras, denominadas alótropos del carbono, reflejo de las condiciones de formación. Los más conocidos que ocurren naturalmente son el grafito, el diamante y el carbono amorfo. Las propiedades físicas del carbono varían ampliamente con la forma alotrópica.";

EQ[6] = new ElementoQuimico("nitrógeno", "N", 7, [2, 5], 7, 14.0067, 7, false, "#0000ff", 3.04);
EQ[6].descripcion = "se emplea industrialmente para crear atmósferas protectoras y como gas criogénico para obtener temperaturas del orden de 78K de forma sencilla y económica. Inclusive se utiliza para inflar los neumáticos en los trenes de aterrizaje de los aviones, evitando condensación de agua a grandes alturas o su combustión al aterrizar.";

EQ[7] = new ElementoQuimico("oxígeno", "O", 8, [2, 6], 8, 15.9994, 7, false, "#ff0000", 3.44);
EQ[7].descripcion = "se produce por cianobacterias, algas y plantas y todas las formas complejas de vida lo usan para su respiración celular.";

EQ[8] = new ElementoQuimico("flúor", "F", 9, [2, 7], 10, 18.998403, 8, false, "#9bc5ff", 3.98);
EQ[8].descripcion = "reacciona explosivamente con el hidrógeno. El flúor diatómico, F2, en condiciones normales es un gas corrosivo de color amarillo casi blanco, fuertemente oxidante.";

EQ[9] = new ElementoQuimico("neón", "Ne", 10, [2, 8], 10, 20.1797, 9, false, "#c2e7f9", 0);
EQ[9].descripcion = "presenta un poder de refrigeración, por unidad de volumen, 40 veces mayor que el del helio líquido y tres veces mayor que el del hidrógeno líquido.";

EQ[10] = new ElementoQuimico("sodio", "Na", 11, [2, 8, 1], 12, 22.98976, 0, true, "#bc7cf6", 0.93);
EQ[10].descripcion = "es un metal blando, ligero y de color plateado que no se encuentra libre en la naturaleza. El sodio flota en el agua descomponiéndola, desprendiendo hidrógeno y formando un hidróxido. Normalmente no arde en contacto con el aire por debajo de 40 °C.";

EQ[11] = new ElementoQuimico("magnesio", "Mg", 12, [2, 8, 2], 12, 24.3050, 1, true, "#a4fe06", 1.31);
EQ[11].descripcion = "el ion magnesio es esencial para todas las células vivas. El metal puro no se encuentra en la naturaleza. Una vez producido a partir de las sales de magnesio, este metal alcalino-térreo es utilizado como un elemento de aleación.";

EQ[12] = new ElementoQuimico("aluminio", "Al", 13, [2, 8, 3], 14, 26.98153, 5, true, "#ccbaba", 1.61);
EQ[12].descripcion = "este metal posee una combinación de propiedades que lo hacen muy útil en ingeniería de materiales, tales como su baja densidad (2812,5 kg/m³) y su alta resistencia a la corrosión. Mediante aleaciones adecuadas se puede aumentar sensiblemente su resistencia mecánica (hasta los 690 MPa).";

EQ[13] = new ElementoQuimico("silicio", "Si", 14, [2, 8, 4], 14, 28.0855, 6, true, "#9aaead", 1.90);
EQ[13].descripcion = "se presenta en forma amorfa y cristalizada; el primero es un polvo parduzco, más activo que la variante cristalina, que se presenta en octaedros de color azul grisáceo y brillo metálico.";

EQ[14] = new ElementoQuimico("fósforo", "P", 15, [2, 8, 5], 16, 30.97696, 7, false, "#ff9900", 2.19);
EQ[14].descripcion = "es muy reactivo y se oxida espontáneamente en contacto con el oxígeno atmosférico emitiendo luz. su reservorio es la corteza terrestre. El elemento se almacena en rocas fosfatadas y a medida que estas son erosionadas se van liberando compuestos fosfatados hacia el suelo y el agua. Luego son absorbidos por las plantas.";

EQ[15] = new ElementoQuimico("azufre", "S", 16, [2, 8, 6], 16, 32.065, 7, false, "#c2c305", 2.58);
EQ[15].descripcion = "es un elemento químico esencial constituyente de los aminoácidos cisteina y metionina​ y, por consiguiente, necesario para la síntesis de proteínas presentes en todos los organismos vivos. Se usa principalmente como fertilizante pero también en la fabricación de pólvora, laxantes, fósforos e insecticidas.";

EQ[16] = new ElementoQuimico("cloro", "Cl", 17, [2, 8, 7], 18, 35.453, 8, false, "#2ef22c", 3.16);
EQ[16].descripcion = "en condiciones normales y en estado puro forma dicloro: un gas tóxico amarillo-verdoso formado por moléculas diatómicas (Cl2) unas 2,5 veces más pesado que el aire, de olor desagradable y tóxico.";

EQ[17] = new ElementoQuimico("argón", "Ar", 18, [2, 8, 8], 22, 39.948, 9, false, "#9bdae9", 0);
EQ[17].descripcion = "se emplea como gas de relleno en lámparas incandescentes ya que no reacciona con el material del filamento incluso a alta temperatura y presión, prolongando de este modo la vida útil de la bombilla";

EQ[18] = new ElementoQuimico("potasio", "K", 19, [2, 8, 8, 1], 20, 39.0983, 0, true, "#a558dc", 0.82);
EQ[18].descripcion = "se oxida rápidamente en el aire, es muy reactivo, especialmente en agua, y se parece químicamente al sodio.  es un sólido blando que se corta con facilidad con un cuchillo, tiene un punto de fusión muy bajo, arde con llama violeta y presenta un color plateado en las superficies expuestas al aire, en cuyo contacto se oxida con rapidez, lo que obliga a almacenarlo recubierto de aceite.";

EQ[19] = new ElementoQuimico("calcio", "Ca", 20, [2, 8, 8, 2], 20, 40.078, 1, true, "#50ff04", 1.00);
EQ[19].descripcion = "se encuentra en el medio interno de los organismos como ion calcio (Ca2+) o formando parte de otras moléculas; en algunos seres vivos se halla precipitado en forma de esqueleto interno (huesos de los vertebrados) o externo (concha de los moluscos). Los iones de calcio actúan de cofactor en muchas reacciones enzimáticas, intervienen en el metabolismo del glucógeno y, junto al potasio y el sodio, regulan la contracción muscular."

EQ[20] = new ElementoQuimico("escandio", "Sc", 21, [2, 8, 9, 2], 24, 44.95591, 4, true, "#ebebeb", 1.36);
EQ[20].descripcion = "es un metal blando, muy ligero, resistente al ataque del ácido nítrico y fluorhídrico, cuyo color plateado deslustra expuesto al aire adoptando un color ligeramente rosado. Su estado de oxidación más común es +3 y sus sales son incoloras."

EQ[21] = new ElementoQuimico("titanio", "Ti", 22, [2, 8, 10, 2], 26, 47.867, 4, true, "#cccccc", 1.54);
EQ[21].descripcion = "es el elemento metálico que posee la mayor proporción de dureza-densidad. Es un metal fuerte, con una baja densidad y alta ductilidad (especialmente en ambientes libres de oxígeno), de color blanco metálico. Su punto de fusión es relativamente alto, sobre los 1650 °C (1920 K), lo que hace que sea útil como metal refractario.";

EQ[22] = new ElementoQuimico("vanadio", "V", 23, [2, 8, 11, 2], 27, 50.9415, 4, true, "#b3b3b3", 1.63);
EQ[22].descripcion = "el vanadio es un metal de transición blanco agrisado, dúctil y brillante. Este metal de transición presenta una alta resistencia a las bases, al ácido sulfúrico (H2SO4) y al ácido clorhídrico (HCl). Reacciona con el agua regia o con una mezcla de ácido nítrico y fluoruro de hidrógeno.";

EQ[23] = new ElementoQuimico("cromo", "Cr", 24, [2, 8, 13, 1], 24, 51.9962, 4, true, "#a3add1", 1.66);
EQ[23].descripcion = "es un metal de transición duro, frágil, color blanco agrisado y brillante. Es muy resistente frente a la corrosión. Se utiliza principalmente en metalurgia para aportar resistencia a la corrosión y un acabado brillante.";

EQ[24] = new ElementoQuimico("manganeso", "Mn", 25, [2, 8, 13, 2], 20, 51.9962, 4, true, "#b394d1", 1.55);
EQ[24].descripcion = "como elemento libre, el manganeso es un metal con aleación de metales industriales con importantes usos, sobre todo en los aceros inoxidables. El fosfatado de manganeso se utiliza como tratamiento para la prevención de la oxidación y corrosión del acero.";

EQ[25] = new ElementoQuimico("hierro", "Fe", 26, [2, 8, 14, 2], 29, 55.845, 4, true, "#e68542", 1.83);
EQ[25].descripcion = "es un metal maleable, de color gris plateado y presenta propiedades magnéticas; es ferromagnético a temperatura ambiente y presión atmosférica. Es extremadamente duro y denso. Presenta diferentes formas estructurales dependiendo de la temperatura y presión. A presión atmosférica: Hierro-α, Hierro-γ y Hierro-ε.";

EQ[26] = new ElementoQuimico("cobalto", "Co", 27, [2, 8, 15, 2], 33, 58.93319, 4, true, "#f2a6b3", 1.91);
EQ[26].descripcion = "es un metal ferromagnético, de color blanco azulado. Su temperatura de Curie es de 1388 K. Normalmente se encuentra junto con níquel, y ambos suelen formar parte de los meteoritos de hierro.";

EQ[27] = new ElementoQuimico("niquel", "Ni", 28, [2, 8, 17, 1], 34, 58.6934, 4, true, "#6bd96b", 1.88);
EQ[27].descripcion = "es un metal de transición de color blanco con un ligerísimo tono amarillo, conductor de la electricidad y del calor, muy dúctil y maleable por lo que se puede laminar, pulir y forjar fácilmente, y presentando ferromagnetismo a temperatura ambiental.";

EQ[28] = new ElementoQuimico("cobre", "Cu", 29, [2, 8, 18, 1], 25, 63.546, 4, true, "#d19c45", 1.90);
EQ[28].descripcion = "se caracteriza por ser uno de los mejores conductores de electricidad (el segundo después de la plata). Gracias a su alta conductividad eléctrica, ductilidad y maleabilidad, se ha convertido en el material más utilizado para fabricar cables eléctricos y otros elementos eléctricos y componentes electrónicos.";

EQ[29] = new ElementoQuimico("zinc", "Zn", 30, [2, 8, 18, 2], 35, 65.38, 4, true, "#9699bf", 1.65);
EQ[29].descripcion = "es un metal de color blanco azulado que arde en el aire con llama verde azulada. El aire seco no le ataca pero en presencia de humedad se forma una capa superficial de óxido o carbonato básico que aísla al metal y lo protege de la corrosión.";

EQ[30] = new ElementoQuimico("galio", "Ga", 31, [2, 8, 18, 3], 39, 69.723, 5, true, "#cca6a6", 1.81);
EQ[30].descripcion = "es un metal blando, grisáceo en estado líquido y plateado brillante al solidificar, sólido deleznable a bajas temperaturas que funde a temperaturas cercanas a la del ambiente. El rango de temperatura en el que permanece líquido es uno de los más altos de los metales (2174 °C separan sus puntos de fusión y ebullición) y la presión de vapor es baja incluso a altas temperaturas.";

EQ[31] = new ElementoQuimico("germanio", "Ge", 32, [2, 8, 18, 4], 41, 72.64, 6, true, "#87a5a7", 2.01);
EQ[31].descripcion = "es un semimetal, de color blanco grisáceo lustroso, quebradizo, que conserva el brillo a temperaturas ordinarias. Presenta la misma estructura cristalina que el diamante y resiste a los ácidos y álcalis.";

EQ[32] = new ElementoQuimico("arsénico", "As", 33, [2, 8, 18, 5], 42, 64.92160, 6, true, "#cb9be7", 2.18);
EQ[32].descripcion = "siendo extremadamente tóxicos, aunque se emplean como componentes en algunos medicamentos. El arsénico es usado para la fabricación de semiconductores y como componente de semiconductores III-V como el arseniuro de galio. Se presenta en tres estados alotrópicos, gris o metálico, amarillo y negro.";

EQ[33] = new ElementoQuimico("selenio", "Se", 34, [2, 8, 18, 6], 45, 78.96, 7, false, "#ffb300", 2.55);
EQ[33].descripcion = "Es insoluble en agua y alcohol, ligeramente soluble en disulfuro de carbono y soluble en éter. Presenta el efecto fotoeléctrico, convirtiendo la luz en electricidad, y, además, su conductividad eléctrica aumenta al exponerlo a la luz. Por debajo de su punto de fusión es un material semiconductor tipo p, y se encuentra en su forma natural.";

EQ[34] = new ElementoQuimico("bromo", "Br", 35, [2, 8, 18, 7], 45, 79.904, 8, false, "#ba3838", 2.96);
EQ[34].descripcion = "a temperatura ambiente es un líquido rojo, volátil y denso. Su reactividad es intermedia entre el cloro y el yodo. En estado líquido es peligroso para el tejido humano y sus vapores irritan los ojos y la garganta.";

EQ[35] = new ElementoQuimico("kriptón", "Kr", 36, [2, 8, 18, 8], 48, 83.798, 9, false, "#7bc8da", 3.00);
EQ[35].descripcion = "caracterizado por un espectro de líneas verde y rojo-naranja muy brillantes. Es uno de los productos de la fisión nuclear del uranio. puede formar clatratos con el agua al quedar sus átomos atrapados en la red de moléculas de agua. También se han sintetizado clatratos con hidroquinona y fenol.";

EQ[36] = new ElementoQuimico("rubidio", "Rb", 37, [2, 8, 18, 8, 1], 48, 85.4678, 0, true, "#8e42c0", 0.82);
EQ[36].descripcion = " es un metal alcalino blando, de color plateado blanco brillante que empaña rápidamente al aire, muy reactivo. Al igual que los demás elementos del grupo 1 puede arder espontáneamente en aire con llama de color violeta amarillento, reacciona violentamente con el agua desprendiendo hidrógeno y forma amalgama con mercurio.";

EQ[37] = new ElementoQuimico("estroncio", "Sr", 38, [2, 8, 18, 8, 2], 50, 87.62, 1, true, "#00ff00", 0.95);
EQ[37].descripcion = "es un metal blando de color plateado brillante, algo maleable, también alcalino térreo, que rápidamente se oxida en presencia de aire adquiriendo un tono amarillento por la formación de óxido, por lo que debe conservarse sumergido en parafina.";

EQ[38] = new ElementoQuimico("itrio", "Y", 39, [2, 8, 18, 9, 2], 50, 88.90585, 4, true, "#acfefc", 1.22);
EQ[38].descripcion = "el itrio es un metal plateado, brillante, ligero, dúctil y maleable. Su punto de ebullición es de 3609 K. Químicamente se asemeja a los lantánidos. Es bastante estable en el aire, ya que arde por encima de los 600 K, pero reactivo en ciertas condiciones. El polvo del metal y sus virutas pueden encenderse a temperatura ambiente.";

EQ[39] = new ElementoQuimico("zirconio", "Zr", 40, [2, 8, 18, 10, 2], 51, 91.224, 4, true, "#a7e9e7", 1.60);
EQ[39].descripcion = "es un metal de transición brillante, de color blanco grisáceo, duro, resistente a la corrosión, de apariencia similar al acero.";

EQ[40] = new ElementoQuimico("niobio", "Nb", 41, [2, 8, 18, 12, 1], 52, 92.90638, 4, true, "#8fd0d6", 1.60);
EQ[40].descripcion = "es un metal de transición dúctil, gris, blando y poco abundante. Se encuentra en el mineral niobita, también llamado columbita, y se utiliza en aleaciones. Se emplea principalmente aleado en aceros, a los cuales confiere una alta resistencia.";

EQ[41] = new ElementoQuimico("molibdeno", "Mo", 42, [2, 8, 18, 13, 1], 54, 95.96, 4, true, "#70c4c4", 2.16);
EQ[41].descripcion = "es un metal plateado, tiene el sexto punto de fusión más alto de cualquier elemento. El molibdeno no se produce como el metal libre en la naturaleza, sino en varios estados de oxidación en los minerales. Industrialmente, los compuestos de molibdeno se emplean en aplicaciones de alta presión y alta temperatura, como pigmentos y catalizadores.";

EQ[42] = new ElementoQuimico("tecnecio", "Tc", 43, [2, 8, 18, 14, 1], 55, 98, 4, true, "#4db4b3", 1.90);
EQ[42].descripcion = "las propiedades químicas de este metal de transición cristalino de color gris plateado son intermedias a las del renio y las del manganeso. Su isómero nuclear 99mTc, de muy corta vida y emisor de rayos gamma, se usa en medicina nuclear para efectuar una amplia variedad de pruebas diagnósticas. El 99Tc se usa como fuente de partículas beta libre de la emisión de rayos gamma. El anión pertecnetato (TcO4-) se emplea como inhibidor de corrosión anódica para aceros.";

EQ[43] = new ElementoQuimico("rutenio", "Ru", 44, [2, 8, 18, 15, 1], 57, 101.07, 4, true, "#35a5a6", 2.20);
EQ[43].descripcion = "es un metal blanco duro y frágil; presenta cuatro formas cristalinas diferentes. Se disuelve en bases fundidas, y no es atacado por ácidos a temperatura ambiente. A altas temperaturas reacciona con halógenos y con hidróxidos.";

EQ[44] = new ElementoQuimico("rodio", "Rh", 45, [2, 8, 28, 16, 1], 58, 102.9055, 4, true, "#1396a8", 2.28);
EQ[44].descripcion = "es un metal blanco duro y frágil; presenta cuatro formas cristalinas diferentes. Se disuelve en bases fundidas, y no es atacado por ácidos a temperatura ambiente. A altas temperaturas reacciona con halógenos y con hidróxidos. Se puede aumentar la dureza del paladio y el platino con pequeñas cantidades de rutenio. Igualmente, la adición de pequeñas cantidades aumenta la resistencia a la corrosión del titanio de forma importante.";

EQ[45] = new ElementoQuimico("paladio", "Pd",46,[2,8,18,18], 60, 106.42,4, true,"#0a869e", 2.20);
EQ[45].descripcion ="el paladio se encuentra en muchos productos electrónicos como computadoras, teléfonos móviles, condensadores de múltiples capas de cerámica, revestimiento de componentes de baja tensión, contactos eléctricos y televisores";

EQ[46]= new ElementoQuimico("plata", "Ag", 47, [2,8,18,18,1], 61, 107.8682, 4, true,"#e7e7ff", 1.93);
EQ[46].descripcion="es un metal muy dúctil y maleable, algo más duro que el oro, y presenta un brillo blanco metálico susceptible al pulimento. Se mantiene en agua y aire, si bien su superficie se empaña en presencia de ozono, sulfuro de hidrógeno o aire con azufre.";

EQ[47]=new ElementoQuimico("cadmio","Cd", 48,[2,8,18,18,2], 64, 112.411,4, true, "#fee1a7", 1.69);
EQ[47].descripcion="es uno de los metales tóxicos emitidos al medio ambiente que más tiende a acumularse en los alimentos. La principal fuente de contaminación de cadmio en el ser humano es la ingesta de vegetales contaminados con este metal";

EQ[48] = new ElementoQuimico("indio", "In", 49, [2, 8, 18, 18, 3], 66, 114.818, 5, true, "#b9918f", 1.78);
EQ[48].descripcion = "es un metal blanco plateado, muy blando, que presenta un lustre brillante. Cuando se dobla el metal emite un sonido característico.";

EQ[49] = new ElementoQuimico("estaño", "Sn", 50, [2, 8, 18, 18, 4], 69, 114.818, 5, true, "#869a9b", 1.96);
EQ[49].descripcion = "es maleable, y se oxida de forma superficial a temperatura ambiente. Este efecto lo hace resistente a la corrosión mediante pasivación. Por tanto se utiliza para recubrir otros metales, protegiéndolos así de la corrosión. Se encuentra además en muchas aleaciones.";

EQ[50] = new ElementoQuimico("antimonio", "Sb", 51, [2, 8, 18, 18, 5], 71, 121.760, 6, true, "#b284c4", 2.05);
EQ[50].descripcion = "en su forma elemental es un sólido cristalino, fundible, quebradizo, blanco plateado que presenta una conductividad eléctrica y térmica baja y se evapora a bajas temperaturas. Este elemento semimetálico se parece a los metales en su aspecto y propiedades físicas, pero se comportan químicamente como un no metal.";

EQ[51] = new ElementoQuimico("telurio", "Te", 52, [2, 8, 18, 18, 6], 76, 127.60, 6, true, "#dd9606", 2.10);
EQ[51].descripcion = "es un elemento relativamente estable, insoluble en agua y ácido clorhídrico, pero soluble en ácido nítrico y en agua regia. Reacciona con un exceso de cloro para formar dicloruro de teluro, TeCl2 y tetracloruro de teluro, TeCl4. Se oxida con ácido nítrico y produce dióxido de teluro, TeO2, y con ácido crómico para dar ácido telúrico, H2TeO4. En combinación con el hidrógeno y ciertos metales, forma telururos, como el telururo de hidrógeno, H2Te, y el telururo de sodio, Na2Te.";

EQ[52] = new ElementoQuimico("yodo", "I", 53, [2, 8, 18, 18, 7], 74, 126.9044, 8, false, "#ab06aa", 2.66);
EQ[52].descripcion = "es un oligoelemento y se emplea principalmente en medicina, fotografía y como colorante. Químicamente, el yodo es el halógeno menos reactivo y electronegativo. Como con todos los otros halógenos (miembros del Grupo XVII en la tabla periódica), el yodo forma moléculas diatómicas y por ello forma el diyodo de fórmula molecular I2.";

EQ[53] = new ElementoQuimico("xenón", "Xe", 54, [2, 8, 18, 18, 8], 77, 131.293, 9, false, "#5cb2c1", 2.60);
EQ[53].descripcion = "la palabra \"inerte\" ya no se usa para describir esta serie química, dado que algunos elementos de valencia cero forman compuestos. En un tubo lleno de gas xenón, se emite un brillo azul cuando se le excita con una descarga eléctrica. Se ha conseguido xenón metálico aplicándole presiones de varios cientos de kilobares. El xenón también puede formar clatratos con agua cuando sus átomos quedan atrapados en un entramado de moléculas de oxígeno.";

EQ[54] = new ElementoQuimico("cesio", "Cs", 55, [2, 8, 18, 18, 8, 1], 78, 132.9054, 0, true, "#7424a9", 0.79);  
EQ[54].descripcion = "reacciona en forma vigorosa con oxígeno para formar una mezcla de óxidos. En aire húmedo, el calor de oxidación puede ser suficiente para fundir y prender el metal. El cesio no reacciona con nitrógeno para formar nitruros, pero reacciona con el hidrógeno a temperaturas altas para producir un hidruro muy estable; reacciona en forma violenta con el agua y aun con hielo a temperaturas de hasta -116 °C (-177 °F) así como con los halógenos, amoníaco y monóxido de carbono.";

EQ[55] = new ElementoQuimico("bario", "Ba", 56, [2, 8, 18, 18, 8, 2], 81, 137.327, 1, true, "#00d900", 0.89);
EQ[55].descripcion = "Reacciona con el cobre y se oxida rápidamente en el agua. El elemento es tan reactivo que no existe en estado libre en la naturaleza, aunque también se presenta en forma de férricos o azufres no solubles en agua. Algunos de sus compuestos se consideran diamantes.";

EQ[56] = new ElementoQuimico("lantano", "La", 57, [2,8,18,18,9,2], 82, 138.9054, 2, true, "#94dafe", 1.10);
EQ[56].descripcion = "existe solo en minerales a causa de su reactividad química";

EQ[57] = new ElementoQuimico("cerio","Ce" ,58, [2,8,18,19,9,2], 82, 140.116, 2, true, "#f9ffcf", 1.10);
EQ[57].descripcion = "es el lantánido más abundante y económico. El metal es duro y de color gris acerado, tornándose pardo rojizo. Es buen conductor del calor y la electricidad. Reacciona con los ácidos diluidos y con el agua (produciendo hidrógeno). Es inestable en el aire seco, cubriéndose de una capa de óxido en el aire húmedo";

EQ[58]=new ElementoQuimico("praseodimio","Pr",59 ,[2,8,18,21,8,2], 82, 140.9076, 2, true, "#dcffd5", 1.12);
EQ[58].descripcion = "está disponible en pequeñas cantidades en la corteza terrestre (9,5 ppm). Se encuentra en los minerales de tierra rara monacita y bastnasita, comprendiendo típicamente cerca del 5% de los lantánidos contenidos en estos, y puede ser recuperado de la bastnasita o de la monazita por un proceso de intercambio de iones, o por extracción solvente de contracorriente. El praseodimio también compone cerca del 5% del mischmetal";

EQ[59]=new ElementoQuimico("neodimio", "Nd", 60, [2,8,18,22,8,2], 85, 144.242, 2, true, "#cdffd3", 1.14);
EQ[59].descripcion = "está compuesto por 5 isótopos estables: 142Nd, 143Nd, 145Nd, 146Nd y 148Nd, siendo el más abundante (con un 27.2%) el 142Nd, y dos radioisótopos, 144Nd y 150Nd. Se han caracterizado en total 31 radioisótopos del neodimio, siendo el más estable el 150Nd con un período de semidesintegración (T½) de más de 1.1×1019 años, el 144Nd con uno de 2.29×1015 años, y el 147Nd con uno de 10.98 días. Los demás isótopos radiactivos tienen períodos de semidesintegración por debajo de los 3.38 días, y la mayoría son inferiores a los 71 segundos";

EQ[60]=new ElementoQuimico("prometio", "Pm", 61, [2,8,18,23,8,2], 146, 145, 2, true, "#b1ffd0", 0);
EQ[60].descripcion = "es un elemento químico de la tabla periódica cuyo símbolo es Pm y su número atómico es 61. Algún tiempo se le denominó ilinio (por Illinois). Aunque, tras la observación de ciertas líneas espectrales, algunos científicos han reclamado haber descubierto este elemento en la naturaleza, nadie ha podido aislarlo de sustancias naturales";

EQ[61]=new ElementoQuimico("samario", "Sm", 62, [2,8,18,24,8,2], 88, 150.36, 2, true, "#a7fed1", 1.17);
EQ[61].descripcion = "es un elemento químico de símbolo Sm y número atómico 62. Es miembro del grupo de las tierras raras. Su peso atómico es de 150,35 y son 7 los isótopos que se encuentran en la naturaleza; 147Sm, 148Sm y 149Sm son radiactivos y emiten partículas";

EQ[62] = new ElementoQuimico("europio","Eu", 63, [2,8,18,25,8,2], 89, 151.964, 2, true, "#80ffd1", 0)
EQ[62].descripcion="es uno de los elementos químicos que forman compuestos fluorescentes usados en dispositivos como televisiones en color, lámparas fluorescentes y cristales. Todos sus compuestos químicos raros tienen propiedades comparables. En concreto, el óxido de europio (Eu2O3) es ampliamente usado como sustancia fluorescente en los aparatos de televisión y como un activador de otros fosforescentes basados en el itrio"

EQ[63] = new ElementoQuimico("gadolinio", "Gd", 64, [2, 8, 18, 25, 9, 2], 63, 157.25, 2, true, "#5dfed4", 1.20);
EQ[63].descripcion = "es un metal raro de color blanco plateado, es maleable y dúctil. Solo se encuentra en la naturaleza de forma combinada (sal). Puesto que la temperatura de Curie del gadolinio es 292 K (18,85 °C) su magnetismo dependerá de la temperatura ambiente. Por encima de dicha temperatura será paramagnético, y ferromagnético por debajo.";

EQ[64] = new ElementoQuimico("terbio", "Tb", 65, [2, 8, 18, 27, 8, 2], 94, 158.9253, 2, true, "#43fed3", 0);
EQ[64].descripcion = "tiene una densidad de 8,3 g/cm³. Con un punto de fusión de 1.360 °C y un punto de ebullición de 3.041 °C. Es un metal de transición interna de la familia de los lantánidos del Sistema Periódico. Se encuentra habitualmente como óxido en las tierras raras. Forma sales trivalentes de color blanco cuyas soluciones son incoloras. Su concentración en la corteza terrestre es de 0,09 ppm.";

EQ[65] = new ElementoQuimico("disprosio", "Dy", 66, [2, 8, 18, 28, 8, 2], 96, 162.500, 2, true, "#29fed0", 1.22);
EQ[65].descripcion = "es una tierra rara que presenta brillo metálico plateado. Es tan blando que puede ser cortado con una navaja, y puede ser procesado por máquinas sin emitir chispas, si se evita el sobrecalentamiento. Sus propiedades pueden verse muy afectadas por cantidades muy pequeñas de impurezas.";

EQ[66] = new ElementoQuimico("holmio", "Ho", 67, [2, 8, 18, 29, 8, 2], 98, 164.9303, 2, true, "#06feb2", 1.23);
EQ[66].descripcion = "es un elemento metálico colocado en el grupo de las tierras raras. El isótopo estable 165Ho constituye el 100% del elemento en la naturaleza. El metal es paramagnético, pero a medida que la temperatura disminuye se convierte en antiferromagnético y luego al sistema ferromagnético.";

EQ[67] = new ElementoQuimico("erbio", "Er", 68, [2, 8, 18, 30, 8, 2], 99, 167.259, 2, true, "#02ec95", 1.24);
EQ[67].descripcion = "es un elemento trivalente, maleable, relativamente estable en el aire y no se oxida tan rápidamente como otros metales de las tierras raras. Sus sales son rosadas y el elemento origina un característico espectro de absorción en el espectro visible, ultravioleta y cerca del infrarrojo. Su óxido es la erbia. Las propiedades del erbio están muy influenciadas por la cantidad y tipo de impurezas presentes. El erbio no tiene papel biológico conocido alguno aunque algunos creen que es capaz de estimular el metabolismo.";

EQ[68] = new ElementoQuimico("tulio", "Tm", 69, [2, 8, 18, 31, 8, 2], 100, 168.9342, 2, true, "#09db6e", 1.25);
EQ[68].descripcion = "es el menos abundante de los lantánidos (el prometio es menos abundante que el Tulio, pero no se lo encuentra naturalmente en la Tierra). Es un metal blando, con un lustre gris plateado brillante. A pesar de su alto precio y escasez, el tulio es utilizado como fuente de radiación en los equipos de rayos X portátiles y láseres de estado sólido.";

EQ[69] = new ElementoQuimico("iterbio", "Yb", 70, [2, 8, 18, 32, 8, 2], 103, 173.054, 2, true, "#07cb4d", 0.00);
EQ[69].descripcion = "es un elemento metálico plateado blando, una tierra rara de la serie de los lantánidos que se halla en la gadolinita, la monazita y el xenotimo. Es un elemento blando, maleable y bastante dúctil que exhibe un lustre plateado brillante. Es una tierra rara, fácilmente atacable y disoluble con ácidos minerales, reacciona lentamente con el agua, y se oxida al aire.";

EQ[70] = new ElementoQuimico("lutecio", "Lu", 71, [2, 8, 18, 32, 9, 2], 104, 174.9668, 2, true, "#06bc34", 1.27);
EQ[70].descripcion = "es un metal trivalente, de color blanco plateado, resistente a la corrosión y, en presencia de aire, relativamente estable. De todas las tierras raras es el elemento más pesado y duro.";

EQ[71] = new ElementoQuimico("hafnio", "Hf", 72, [2, 8, 18, 32, 10, 2], 106, 178.49, 4, true, "#6cceff", 1.30);
EQ[71].descripcion = "Es un metal de transición, brillante, gris-plateado, químicamente muy parecido al circonio, encontrándose en los mismos minerales y compuestos, y siendo difícil separarlos. Se usa en aleaciones con wolframio en filamentos y en electrodos. También se utiliza como material de barras de control de reactores nucleares debido a su capacidad de absorción de neutrones.";

EQ[72] = new ElementoQuimico("tantalio", "Ta", 73, [2, 8, 18, 32, 11, 2], 108, 180.9478, 4, true, "#66b8ff", 1.50);
EQ[72].descripcion = "es un metal gris, brillante, pesado, dúctil, de alto punto de fusión, buen conductor de la electricidad y del calor y muy duro. Es muy resistente al ataque por ácidos; se disuelve empleando ácido fluorhídrico o mediante fusión alcalina.";

EQ[73] = new ElementoQuimico("wolframio", "W", 74, [2, 8, 18, 32, 12, 2], 110, 183.84, 4, true, "#30ace2", 2.36);
EQ[73].descripcion = "Es un metal escaso en la corteza terrestre, pero se encuentra en determinados minerales en forma de óxidos o sales. Es de color gris acerado, muy duro y denso, tiene el punto de fusión más elevado de todos los metales y el punto de ebullición más alto de todos los elementos conocidos.";

EQ[74] = new ElementoQuimico("renio", "Re", 75, [2, 8, 18, 32, 13, 2], 111, 186.207, 4, true, "#3598c1", 1.90);
EQ[74].descripcion = "es capaz de formar aniones complejos, tales como el pentacloruro de renio, que son capaces de crear sales diferentes debido al efecto de oxidación que produce este elemento cuando recibe el contacto del aire a elevadas temperaturas.";

EQ[75] = new ElementoQuimico("osmio", "Os", 76, [2, 8, 18, 32, 14, 2], 114, 190.23, 4, true, "#3587af", 2.20);
EQ[75].descripcion = "en su forma metálica es de color blanco grisáceo, duro y brillante, incluso a altas temperaturas, aunque es difícil encontrarlo en esta forma. Es más fácil obtener osmio en polvo, aunque expuesto al aire tiende a la formación del tetraóxido de osmio, OsO4, compuesto tóxico (peligroso para los ojos), oxidante enérgico, de un olor fuerte, y volátil.";

EQ[76] = new ElementoQuimico("irdio", "Ir", 77, [2, 8, 18, 32, 15, 2], 177, 192.217, 4, true, "#2472a2", 2.20);
EQ[76].descripcion = "es de color blanco, parecido al platino, pero presenta una ligera coloración amarilla.​ Es difícil trabajar este metal, pues es muy duro y quebradizo.​ Es el metal más resistente a la corrosión. No es atacado por los ácidos, ni siquiera por el agua regia.";

EQ[77] = new ElementoQuimico("platino", "Pt", 78, [2, 8, 18, 32, 17, 1], 117, 195.084, 4, true, "#f6f1db", 2.28);
EQ[77].descripcion = "se trata de un metal de transición blanco grisáceo, precioso, pesado, maleable y dúctil. Es resistente a la corrosión y se encuentra en distintos minerales, frecuentemente junto con níquel y cobre; también se puede encontrar como metal. Se emplea en joyería, equipamiento de laboratorio, contactos eléctricos, empastes y catalizadores de automóviles.";

EQ[78] = new ElementoQuimico("oro", "Au", 79, [2, 8, 18, 32, 18, 1], 118, 196.9665, 4, true, "#d9d926", 2.54);
EQ[78].descripcion = "es un metal de transición blando, brillante, amarillo, pesado, maleable y dúctil. El oro no reacciona con la mayoría de los productos químicos, pero es sensible y soluble al cianuro, al mercurio, al agua regia, al cloro y a la lejía. Este metal se encuentra normalmente en estado puro, en forma de pepitas y depósitos aluviales. Es un elemento que se crea gracias a las condiciones extremas en el núcleo colapsante de las supernovas.";

EQ[79] = new ElementoQuimico("mercurio", "Hg", 80, [2, 8, 18, 32, 18, 2], 121, 200.59, 4, true, "#c2c4d0", 2.00);
EQ[79].descripcion = "El envenenamiento por mercurio puede resultar de la exposición a las formas solubles en agua del mercurio, por la inhalación de vapor de mercurio, o por la ingestión de cualquiera de sus formas. se usa en termómetros, barómetros, manómetros, esfigmomanómetros, algunos tipos de válvulas como las bombas de vacío, los interruptores de mercurio, las lámparas fluorescentes y otros dispositivos, a pesar de que la preocupación sobre la toxicidad del elemento ha llevado a los termómetros y tensiómetros de mercurio a ser eliminados en gran medida en entornos clínicos en favor de otras alternativas";

EQ[80] = new ElementoQuimico("talio", "Tl", 81, [2, 8, 18, 32, 18, 3], 123, 204.3833, 5, true, "#b77368", 1.62);
EQ[80].descripcion = "este metal es muy blando y maleable; se puede cortar con un cuchillo. Al ser expuesto al aire pasa de presentar un brillo metálico a rápidamente empañarse con un tono gris azulado parecido al plomo.";

EQ[81] = new ElementoQuimico("plomo", "Pb", 82, [2, 8, 18, 32, 18, 4], 125, 207.2, 5, true, "#757984", 2.23);
EQ[81].descripcion = "es flexible, inelástico y se funde con facilidad. Es relativamente resistente al ataque del ácido sulfúrico y del ácido clorhídrico, aunque se disuelve con lentitud en ácido nítrico y ante la presencia de bases nitrogenadas. Es un metal pesado y tóxico, y la intoxicación por plomo se denomina como saturnismo o plumbosis.";

EQ[82] = new ElementoQuimico("bismuto", "Bi", 83, [2, 8, 18, 32, 18, 5], 126, 208.9804, 5, true, "#b26cc5", 2.02);
EQ[82].descripcion = "es sólido flota sobre su estado líquido, por tener menor densidad en el estado sólido. Se expande al solidificarse; esta extraña propiedad lo convierte en un metal idóneo para fundiciones. Algunas de sus aleaciones tienen puntos de fusión inusualmente bajos. Es una de las sustancias más fuertemente diamagnéticas (dificultad para magnetizarse). Es un mal conductor del calor y la electricidad, y puede incrementarse su resistencia eléctrica en un campo magnético, propiedad que lo hace útil en instrumentos para medir la fuerza de estos campos.";

EQ[83] = new ElementoQuimico("polonio", "Po", 84, [	2, 8, 18, 32, 18, 6], 126, 210, 6, true, "#c07a0a", 2.00);
EQ[83].descripcion = "estas sustancias se disuelven con mucha facilidad en ácidos, pero es solo ligeramente soluble en alcalinos. Está químicamente relacionado con el teluro y el bismuto. El polonio es un metal volátil, reducible al 50% tras 45 horas al aire a una temperatura de 54,8 °C (328 K). Ninguno de los 50 isotopos [número estimado] de polonio es estable. Es extremadamente tóxico y altamente radiactivo.";

EQ[84] = new ElementoQuimico("astato", "At", 85, [ 2, 8, 18, 32, 18, 7], 125, 210, 8, false, "#926c5f", 2.20);
EQ[84].descripcion = "el comportamiento químico de este elemento altamente radiactivo es muy similar al de otros halógenos, especialmente el yodo. Se piensa que el ástato es más metálico que el yodo. Investigadores del Laboratorio Nacional de Brookhaven han realizado experimentos en los que se han identificado y medido reacciones elementales que involucran al ástato.";

EQ[85] = new ElementoQuimico("radón", "Rn", 86, [ 2, 8, 18, 32, 18, 8], 134, 220, 9, false, "#599db0", 0.00);
EQ[85].descripcion = "es un elemento radiactivo y gaseoso, encuadrado dentro de los llamados gases nobles. En su forma gaseosa es incoloro, inodoro e insípido y en forma sólida su color es rojizo. Es producto de la desintegración del radio (226Ra), elemento altamente radiactivo. El isótopo 219Rn es producto de la desintegración del actinio, llamado actinón y tiene una vida media de 4 segundos.";

EQ[86] = new ElementoQuimico("francio", "Fr", 87, [ 2, 8, 18, 32, 18, 8, 1], 136, 223, 0, true, "#5c0587", 0.70);
EQ[86].descripcion = "fuera del laboratorio, el francio es extremadamente escaso, encontrándose en trazas en menas de uranio y de torio, donde el 223Fr está continuamente formándose y desintegrándose. Es menos estable que cualquier otro elemento más ligero que el nobelio (elemento 102);3​ su isótopo más estable, el 223Fr, posee un período de semidesintegración menor de 22 minutos.";

EQ[87] = new ElementoQuimico("radio", "Ra", 88, [2, 8, 18, 32, 18, 8, 2], 138, 226, 1, true, "#059905", 0.90);
EQ[87].descripcion = "es el elemento más pesado de los metales alcalinotérreos, es intensamente radiactivo y se parece químicamente al bario. Los preparados de radio son destacables porque son capaces de mantenerse a más alta temperatura que su entorno y por sus radiaciones, que pueden ser de tres tipos: rayos alfa, rayos beta y rayos gamma. Además, el radio produce neutrones si se mezcla con berilio.";

EQ[88] = new ElementoQuimico("actinio", "Ac", 89, [2, 8, 18, 32, 18, 9, 2], 138, 227, 3, true, "#8ebbff", 1.10);
EQ[88].descripcion = "es un elemento metálico, radiactivo como todos los actínidos y de color plateado. Debido a su intensa radiactividad brilla en la oscuridad con una luz azulada. El isótopo 227Ac, que se encuentra sólo en trazas en los minerales de uranio, es un emisor de partículas α y β con un periodo de semidesintegración de 21,773 años. Una tonelada de mineral de uranio contiene cerca de 0,1 g de actinio.";

EQ[89] = new ElementoQuimico("torio", "Th", 90, [2, 8, 18, 32, 18, 10, 2], 142, 232.0380, 3, true, "#08c6ff", 1.30);
EQ[89].descripcion = "pertenece a la familia de las sustancias radiactivas, si bien su periodo de semidesintegración es extremadamente largo. Su potencial como combustible nuclear, como material fértil, se debe a que presenta una alta sección eficaz frente a neutrones lentos (térmicos), derivando en protactinio-233, que rápidamente se desintegra en uranio-233, el cual es un isótopo fisible que puede sostener una reacción nuclear en cadena. Esta aplicación todavía está en fase de desarrollo.";

EQ[90] = new ElementoQuimico("protactinio", "Pa", 91, [2, 8, 18, 32, 20, 9, 2], 140, 231.0358, 3, true, "#07b5fe", 1.50);
EQ[90].descripcion = "presenta un brillo metálico intenso. Debido a su escasez, alta radioactividad y toxicidad, actualmente no existen usos para el protactinio fuera de la investigación científica básica. El Protactinio-231 (que se forma por la desintegración alfa del Uranio-235 seguido de una desintegración beta del Torio-231) podría quizás mantener una reacción nuclear en cadena y, en principio, podría ser usado para construir una bomba nuclear. La masa crítica, según Walter Seifritz, es 750±180 kg. Otros autores concluyen que no es posible una reacción en cadena usando 231Pa.";

EQ[91] = new ElementoQuimico("uranio", "U", 92, [2, 8, 18, 32, 21, 9, 2], 146, 238.0289, 3, true, "#00a5ff", 1.38);
EQ[91].descripcion = "tiene el mayor peso atómico de entre todos los elementos que se encuentran en la naturaleza. El uranio es aproximadamente un 70 % más denso que el plomo, aunque menos denso que el oro o el wolframio. Es levemente radiactivo. en la naturaleza se presenta en muy bajas concentraciones (unas pocas partes por millón o ppm) en rocas, tierras, agua y los seres vivos. Para su uso el uranio debe ser extraído y concentrado a partir de minerales que lo contienen, como por ejemplo la uranitita";

EQ[92] = new ElementoQuimico("neptunio", "Np", 93, [2, 8, 18, 32, 22, 9, 2], 144, 237, 3, true, "#069bff", 1.36);
EQ[92].descripcion = "se obtiene artificialmente. Es un metal blanco plateado, similar químicamente al uranio. Existen diversas variedades cristalinas. El neptunio es un elemento reactivo que es mezclable a la mayoría de los elementos.";

EQ[93] = new ElementoQuimico("plutonio", "Pu", 94, [2, 8, 18, 32, 24, 8, 2], 150, 244, 3, true, "#078afe", 1.28);
EQ[93].descripcion = "es un metal actínido con apariencia gris plateada que se oscurece cuando es expuesto al aire, formando una capa opaca cuando se oxida. El elemento normalmente exhibe seis estados alotrópicos y cuatro de oxidación. Reacciona con el carbono, los halógenos, nitrógeno y silicio. Cuando se expone al aire húmedo forma óxidos e hidruros que expanden hasta un 70% su volumen, que a su vez, se desprende en forma de polvo que puede inflamarse de forma espontánea. También es un elemento radiactivo y se puede acumular en los huesos. Estas propiedades hacen que manipular plutonio sea peligroso.";

EQ[94] = new ElementoQuimico("americio", "Am", 95, [2, 8, 18, 32, 25, 8, 2], 148, 243, 3, true, "#727cf5", 1.30);
EQ[94].descripcion = "Todos sus isótopos son radiactivos y no existen en la naturaleza. Tiene un lustre plateado y blanco. Es más plateado que el plutonio y el neptunio, y aparentemente más maleable que este o el uranio. La desintegración alfa de 241Am es aproximadamente tres veces la del radio. Unos cuantos gramos de 241Am emiten una alta cantidad de rayos gamma, lo cual crearía serios problemas de salud a cualquiera que se expusiese al elemento. También presenta la característica de que es fisible.";

EQ[95] = new ElementoQuimico("curio", "Cm", 96, [2, 8, 18, 32, 25, 9, 2], 151, 247, 3, true, "#937ce8", 1.30);
EQ[95].descripcion = "se produce bombardeando plutonio con partículas alfa (iones de helio). Es un actínido. El curio no existe en el ambiente terrestre, pero puede producirse en forma artificial. Sus propiedades químicas se parecen tanto a las de las tierras raras típicas que, si no fuera por su radiactividad, podría confundirse fácilmente con uno de estos elementos. Entre los isótopos conocidos del curio figuran los de número de masa 238 a 250. El isótopo 244Cm es de particular interés a causa de su uso potencial como una fuente compacta de fuerza termoeléctrica, al utilizarse el calor generado por decaimiento nuclear para generar fuerza eléctrica.";

EQ[96] = new ElementoQuimico("berkelio", "Bk", 97, [2, 8, 18, 32, 27, 8, 2], 150, 247, 3, true, "#a36de7", 1.30);
EQ[96].descripcion = "el isótopo principal del berkelio es el berkelio-249,4​ el cual se sintetiza en cantidades ínfimas en un reactor nuclear de alto flujo, especialmente en el Oak Ridge National Laboratory de Tennessee, Estados Unidos, y en el Research Institute of Atomic Reactors de Dimitrovgrad, Rusia. Para producir el isótopo berkelio-247, se irradia el isótopo sintético curio-244, que es muy escaso, con partículas alfa de alta energía.";

EQ[97] = new ElementoQuimico("californio", "Cf", 98, [2, 8, 18, 32, 28, 8, 2], 153, 251, 3, true, "#b44bdc", 1.30);
EQ[97].descripcion = " es un elemento químico radiactivo. de color blanco plateado con un punto de fusión de 900 ± 30 °C y un punto de ebullición estimado de 1745 °C.​ El metal puro es maleable y puede ser cortado fácilmente con una cuchilla de afeitar. El californio metálico empieza a evaporarse por encima de los 300 °C en el vacío.​ Por debajo de 51 K (−220 °C) es ferromagnético o ferrimagnético —actúa como un imán—, entre 48 y 66 K es antiferromagnético —un estado intermedio— y por encima de los 160 K (−110 °C) es paramagnético, por lo que puede convertirse en magnético gracias a campos magnéticos externos.";

EQ[98] = new ElementoQuimico("einstenio", "Es", 99, [2, 8, 18, 32, 29, 8, 2], 153, 252, 3, true, "#c32cdd", 1.30);
EQ[98].descripcion = "su método de obtención consiste en irradiar aproximadamente 1 kg de Pu-239 en un reactor para generar Pu-242. Este Pu-242 se introduce en bolas de óxido de plutonio y aluminio en polvo. Posteriormente estas bolas se introducen en varillas y se irradian. Finalmente, se introducen las varillas en un reactor isotópico de alto flujo. Tras todo esto se separa el einstenio del californio.";

EQ[99] = new ElementoQuimico("fermio", "Fm", 100, [2, 8, 18, 32, 30, 8, 2], 157, 257, 3, true, "#c22cc9", 1.30);
EQ[99].descripcion = "no se encuentra en la naturaleza; su descubrimiento y producción se alcanza por transmutación artificial de elementos más ligeros. es un elemento químico radiactivo. La fisión espontánea es el modo principal de decaimiento para 244Fm, 256Fm y 258Fm. El isótopo con vida más larga es 257Fm, el cual tiene una vida media de unos 100 días.";

EQ[100] = new ElementoQuimico("mandelevio", "Md", 101, [2, 8, 18, 32, 31, 8, 2], 157, 258, 3, true, "#cb14a0", 1.30);
EQ[100].descripcion = "Lo identificaron Albert Ghiorso, Bernard G. Harvey, Gregory R. Choppin, Stanley G. Thompson y Glenn T. Seaborg el 19 de febrero de 1955 mediante el bombardeo del isótopo einstenio-253 con iones helio en el ciclotrón de 60 pulgadas de la Universidad de California en Berkeley. El isótopo producido fue el 256-Md (vida media de 76 minutos). El isótopo 258-Md (55 días) se ha obtenido por bombardeo de un isótopo del einstenio con iones helio.";

EQ[101] = new ElementoQuimico("nobelio", "No", 102, [2, 8, 18, 32, 32, 8, 2], 157, 259, 3, true, "#cb14a0", 1.30);
EQ[101].descripcion = "su decaimiento se realiza por emisión de partículas alfa, es decir, un ion de helio doblemente cargado. Hasta la fecha solo se han producido cantidades atómicas del elemento. El nobelio es el décimo elemento más pesado que el uranio producido sintéticamente y el 14.º miembro de los actínidos.";

EQ[102] = new ElementoQuimico("laurencio", "Lr", 103, [2, 8, 18, 32, 32, 8, 2], 159, 262, 3, true, "#d30687", 0.00);
EQ[102].descripcion = "también es un elemento sintético radiactivo de la tabla periódica de los elementos. Los primeros átomos de lawrencio fueron producidos al bombardear un blanco de tres miligramos, compuesto de tres isótopos de californio con núcleos de boro-10 y boro-11 del Acelerador lineal de iones pesados. Todos los isótopos del lawrencio son radiactivos; su isótopo más estable conocido es 266Lr, con un período de semidesintegración de aproximadamente 11 horas.4​ Todos los demás isótopos, excepto 260Lr, 261Lr, 262Lr y 266Lr, se desintegran con una vida menor a un minuto.";

EQ[103] = new ElementoQuimico("Rutherfordio", "Rf", 104, [2, 8 , 18, 32, 32, 10, 2], 153, 261, 4, true, "#da0473", 0);
EQ[103].descripcion = "su nombre fue elegido en honor del Barón Ernest Rutherford, científico colaborador del modelo atómico y física nuclear. Este es un elemento sintético altamente radiactivo cuyo isótopo más estable es el 261Rf con una vida media de aproximadamente 13 horas.";

EQ[104] = new ElementoQuimico("dubnio", "Db", 105, [2, 8, 18, 32, 32, 11, 2], 157, 262, 4, true, "#dc056d", 0.00);
EQ[104].descripcion = "es un elemento sintético y radiactivo; y su isótopo más estable conocido, dubnio-268, tiene un período de semidesintegración de aproximadamente veintiocho horas. Se produjeron cantidades microscópicas de dubnio en laboratorios de la Unión Soviética y California. Fue descubierto por el ruso Georgii Flerov en 1967-1970, y por el estadounidense Albert Ghiorso en 1970. Cuando se descubrió, la prioridad del descubrimiento y por lo tanto el nombramiento del elemento, se disputó entre los científicos soviéticos y estadounidenses, que unos propusieron llamarlo Nielsbohrio y los otros Hahnio, aunque estos nombres no fueron reconocidos internacionalmente.";

EQ[105] = new ElementoQuimico("seaborgio", "Sg", 106, [2, 8, 18, 32, 32, 12, 2], 160, 266, 4, true, "#e00664", 0.00);
EQ[105].descripcion = "es un elemento sintético cuyo isótopo más estable es el 271Sg que tiene una vida media de 2,4 minutos. Su naturaleza química es similar a la del wolframio. Existen 12 isótopos conocidos del seaborgio, el de mayor vida media es el 271Sg que decae por desintegración alfa y fisión espontánea. Tiene una vida media de 2,4 minutos. El isótopo encontrado de menor vida media es el 258Sg que también sufre desintegración alfa y fisión espontánea. Su vida media es de 2,9 ms.";

EQ[106] = new ElementoQuimico("bohrio", "Bh", 107, [2, 8, 18, 32, 32, 13, 2], 157, 264, 4, true, "#e8054d", 0.00);
EQ[106].descripcion = "fue sintetizado e identificado sin ambigüedad en 1981 por un equipo de Darmstadt, Alemania, equipo dirigido por P. Armbruster y G. Müzenberg. La reacción usada para producir el elemento fue propuesta y aplicada en 1976 por un grupo de Dubna (cerca de Moscú), que estaba bajo la guía de Yuri Oganesián. Un blanco de 209Bi fue bombardeado por un haz de proyectiles de 54Cr. La mejor técnica par identificar un nuevo isótopo es su correlación genética con isótopos conocidos a través de una cadena de desintegración radiactiva. En general, estas cadenas de decaimiento se interrumpen por fisión espontánea. Con el fin de aplicar el análisis de cadena de decaimiento deberían producirse aquellos isótopos que son más estables frente a la fisión espontánea, es decir, isótopos con números impares de protones y neutrones.";

EQ[107] = new ElementoQuimico("hassio", "Hs", 108, [2, 8, 16, 32, 32, 16, 2], 169, 277, 4, true, "#ea0641", 0.00);
EQ[107].descripcion = "su isótopo más estable es el Hs-269, que tiene un periodo de semidesintegración de 9,7 segundos. Fue sintetizado por primera vez en 1984 por el grupo de investigación alemán Gesellschaft für Schwerionenforschung localizado en Darmstadt. El nombre hasio propuesto por el grupo se debe al estado alemán de Hesse en el que se encuentra el GSI.";

EQ[108] = new ElementoQuimico("meitnerio", "Mt", 109, [2, 8, 18, 32, 32, 15, 2], 159, 268, 4, true, "#f10438", 0.00);
EQ[108].descripcion = "es un elemento sintético cuyo isótopo más estable es el 278Mt, cuya vida media es de 7,6 s. Fue encontrado por accidente en 1982 por Peter Armbruster y Gottfried Münzenberg en el Instituto de Investigación de iones Pesados (Gesellschaft für Schwerionenforschung) en Darmstadt. El equipo lo consiguió bombardeando bismuto-209 con núcleos acelerados de hierro-58. La creación de este elemento demostró que las técnicas de fusión nuclear podían ser usadas para crear nuevos núcleos pesados.";

EQ[109] = new ElementoQuimico("darmstatio", "Ds", 110, [2, 8, 18, 32, 32, 16, 2], 161, 271, 4, true, "#f5022e", 0.00);
EQ[109].descripcion = "es un elemento sintético que decae rápidamente; sus isótopos de números másicos entre 267 y 273 tienen periodos de semidesintegración del orden de los microsegundos. Fue sintetizado por primera vez el miércoles 9 de noviembre de 1994 en la Gesellschaft für Schwerionenforschung en Darmstadt, Alemania, por P. Armbruster, S. Hofmann, G. Münzenberg y otros.";

EQ[110] = new ElementoQuimico("roentgenio", "Rg", 111, [2, 8, 18, 32, 32, 17, 2], 161, 272, 4, true, "#f50630", 0.00);
EQ[110].descripcion = "fue descubierto en 1994 por científicos alemanes en Darmstadt. En noviembre del 2004 recibió el nombre de roentgenio en honor a Wilhelm Conrad Roentgen (1845-1923), premio Nobel de Física, descubridor de los rayos X. El roentgenio se obtiene a través del bombardeo de hojas de bismuto (Bi) con iones de níquel (Ni), decayendo en 15 milisegundos.";

EQ[111] = new ElementoQuimico("copernicio", "Cn", 112, [2, 8, 18, 32, 32, 18, 2], 173, 285, 4, true, "#f6052f", 0.00);
EQ[111].descripcion = "su apariencia física no se conoce aún, pero podría calcularse, sabiendo que por ahora el isótopo conocido, de 285 de masa atómica, tiene una vida media de 0,24 ms. Se trata de un elemento químico superpesado que, en ese entonces, a falta de un nombre (tienen el privilegio de elegirlo), se llamaba unumbio, que en latín significa «uno uno dos». Este elemento, que en realidad fue descubierto en 1996, ve así confirmada su existencia, aunque sólo han conseguido producir literalmente cuatro átomos de él.";

EQ[112] = new ElementoQuimico("nihonio", "Nh", 113, [2, 8, 18, 32, 32, 18, 3], 171, 284, 5, true, "#fa042b", 0.00);
EQ[112].descripcion = "es un elemento transactínido del bloque p, y es miembro del séptimo período dentro del grupo del boro, aunque no se realizó ningún experimento químico que haya confirmado que este se comporte como el homólogo más pesado que el talio dentro de este grupo. Se cree que el nihonio tenga algunas propiedades similares a la de sus homólogos más livianos, es decir, boro, aluminio, galio, indio y talio, aunque también debería mostrar varias diferencias con estos. A diferencia de otros elementos del bloque p, se prevé que muestre algunas características de metales de transición."

EQ[113] = new ElementoQuimico("flerovio", "Fl", 114, [2, 8, 18, 32, 32, 18, 4], 175, 289, 5, true, "#ff051e", 0.00);
EQ[113].descripcion = "se han observado alrededor de 80 desintegraciones de átomos de flerovio, 50 de ellas directamente y 30 de la desintegración de los elementos más pesados livermorio y oganesón. Todas las desintegraciones han sido asignadas a los cuatro isótopos vecinos con números de masa 286-289. El isótopo de más larga vida conocido actualmente es el 289Fl114 con una vida media de aproximadamente 2,6 s, aunque hay evidencias de un isómero, 289bFl114, con una vida media de aproximadamente 66 s, que sería uno de los núcleos más longevos en la región de los elementos superpesados.";

EQ[114] = new ElementoQuimico("moscovio", "Mc", 115, [2, 8, 18, 32, 32, 18, 5], 173, 288, 5, true, "#ff0423", 0.00);
EQ[114].descripcion = "actualmente se conocen cuatro isótopos desde 287Mc hasta 290Mc. Se prevé que el isótopo más estable del moscovio sea el 299Mc, que contiene el número mágico de 184 neutrones. El isótopo con mayor número de neutrones conocido hasta la fecha es el 290Mc, con 175 neutrones. Es muy inestable, con una vida media de milésimas de segundo. Su nombre hace referencia a la provincia de Moscú, región a la que pertenece la ciudad rusa donde se descubrió, Dubná.";

EQ[115] = new  ElementoQuimico("livermorio", "Lv", 116, [2, 8, 18, 32, 32, 18, 6], 176, 292, 5, true, "#ff0520", 0.00);
EQ[115].descripcion = "por su inestabilidad, vida media tan reducida y dificultad de obtención, en la actualidad son nulas las aplicaciones industriales, comerciales o propagandísticas de este elemento muy pesado por lo que su aplicación se relega sólo a la investigación científica..";

EQ[116] = new ElementoQuimico("teneso", "Ts", 117, [2, 8, 18, 32, 32, 18, 7], 177, 294, 8, false, "#ff0423", 0.00);
EQ[116].descripcion = "en un experimento en 2011, se creó directamente uno de sus productos de desintegración, confirmando parcialmente los resultados del experimento inicial; el experimento, además, fue repetido con éxito en 2012. es probable que el teneso tenga propiedades significativamente diferentes de las del resto de elementos del grupo, aunque se prevé que el punto de fusión, el punto de ebullición y la primera energía de ionización sigan las tendencias periódicas.";

EQ[117] = new ElementoQuimico("oganesón", "Og", 118, [2, 8, 18, 32, 32, 18, 8], 176, 294, 9, false, "#ff0222", 0.00);
EQ[117].descripcion = "es radiactivo y altamente inestable, por lo que desde 2002 solo se han detectado tres o posiblemente cuatro átomos del isótopo 294Og.13​ Si bien este hecho no posibilita un estudio experimental adecuado que pueda caracterizar sus propiedades y sus posibles compuestos, varios cálculos teóricos han permitido predecir muchas de sus cualidades, incluidas algunas inesperadas. Si bien inicialmente se pensaba que era un gas, ahora se supone que es un sólido bajo condiciones normales de presión y temperatura.";