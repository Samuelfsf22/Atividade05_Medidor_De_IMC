const formulario = document.querySelector("#formulario")

const inputNome = document.querySelector(".inputNome")
const inputAltura = document.querySelector(".inputAltura")
const inputPeso = document.querySelector(".inputPeso")

const radio = document.querySelectorAll('input[name="sexo"]');

const btnCalc = document.querySelector("#btnCalc")
const btnLimpar = document.querySelector("#btnLimpar")


const lblNomeResult = document.querySelector(".lblNomeResult")
const lblAlturaResult = document.querySelector(".lblAlturaResult")
const lblPesoResult = document.querySelector(".lblPesoResult")
const lblSexoResult = document.querySelector(".lblSexoResult")
const lblIMCResult = document.querySelector(".lblIMCResult")
const lblCondiçãoResult = document.querySelector(".lblCondiçãoResult")

const lblAviso = document.querySelector(".lblAviso")

const sectionResultados = document.querySelector(".sectionResultados")

formulario.addEventListener("submit", (evento) =>{
    evento.preventDefault();
})

btnCalc.addEventListener("click", () =>{
    lblNomeResult.innerHTML = "Nome: " + inputNome.value
    lblAlturaResult.innerHTML = "Altura: " + inputAltura.value + "cm"
    lblPesoResult.innerHTML = "Peso: " + inputPeso.value + "Kg"

    const radioSelecionado = document.querySelector('input[name="sexo"]:checked');

    if(radioSelecionado){
        lblSexoResult.innerHTML = "Sexo: " + radioSelecionado.value;
    } else{

    }

    const altura = parseFloat(inputAltura.value);
    const peso = parseFloat(inputPeso.value);
    const imc = CalcularIMC(altura, peso);
    lblIMCResult.innerHTML = "IMC: " + imc.toFixed(2);
    
    let condicao;

    if(radioSelecionado.value == "Masculino"){
        if(imc < 20.7){
            condicao = "Abaixo do peso"
        } else if((imc >= 20.7) && (imc <= 26.4)){
            condicao = "No peso normal"
        } else if((imc > 26.4) && (imc <= 27.8)){
            condicao = "Marginalmente acima do peso"
        } else if((imc > 27.8) && (imc <= 31.1)){
            condicao = "Acima do peso"
        } else if(imc > 31.1){
            condicao = "Obeso"
        }
    }

    if(radioSelecionado.value == "Feminino"){
        if(imc < 19.1){
            condicao = "Abaixo do peso"
        } else if((imc >= 19.1) && (imc <= 25.8)){
            condicao = "No peso normal"
        } else if((imc > 25.8) && (imc <= 27.3)){
            condicao = "Marginalmente acima do peso"
        } else if((imc > 27.3) && (imc <= 32.3)){
            condicao = "Acima do peso"
        } else if(imc > 32.3){
            condicao = "Obesa"
        }
    }

    lblCondiçãoResult.innerHTML = "Condição: " + condicao;

    const {pesoMinimo, pesoMaximo} = PesoIdeal(inputAltura.value, radioSelecionado.value);

    let pesoNecessario;
    if (peso < pesoMinimo) {
        pesoNecessario = pesoMinimo - peso;
        lblAviso.innerHTML = `Você precisa ganhar ${pesoNecessario.toFixed(2)} kg para atingir o peso ideal.`;
    } else if (peso > pesoMaximo) {
        pesoNecessario = peso - pesoMaximo;
        lblAviso.innerHTML = `Você precisa perder ${pesoNecessario.toFixed(2)} kg para atingir o peso ideal.`;
    } else {
        lblAviso.innerHTML = "Você está dentro da faixa de peso normal.";
    }

    sectionResultados.classList.remove("invisivel")
})

btnLimpar.addEventListener("click", () =>{
    inputNome.value = ""
    inputAltura.value = ""
    inputPeso.value = ""

    radio.forEach(function(radio) {
        radio.checked = false;
    });

    lblNomeResult.innerHTML = "";
    lblAlturaResult.innerHTML = "";
    lblPesoResult.innerHTML = "";
    lblSexoResult.innerHTML = "";
    lblIMCResult.innerHTML = "";
    lblCondiçãoResult.innerHTML = "";
    lblAviso.innerHTML = "";

    sectionResultados.classList.add("invisivel")
})

function CalcularIMC(Altura, Peso){
    return parseFloat(Peso / (Altura * Altura));
}

function PesoIdeal(Altura, sexo){

    let imcIdealMin = 0.0;
    let imcIdealMax = 0.0;
    
    let pesoMinimo = 0.0; 
    let pesoMaximo = 0.0;

    if(sexo == "Masculino"){
        imcIdealMin = 20.7;
        imcIdealMax = 26.4;

        pesoMinimo = imcIdealMin * (Altura * Altura);
        pesoMaximo  = imcIdealMax * (Altura * Altura);

        return { pesoMinimo, pesoMaximo };
    } else if(sexo == "Feminino"){
        imcIdealMin = 19.1;
        imcIdealMax = 25.8;

        pesoMinimo = imcIdealMin * (Altura * Altura);
        pesoMaximo  = imcIdealMax * (Altura * Altura);

        return { pesoMinimo, pesoMaximo };
    }
}