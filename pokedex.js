let estadoPokedex = {
    digitando : false,
}

let numPokemon = '';

const key1 = document.querySelector('#key-1');
const key2 = document.querySelector('#key-2');
const key3 = document.querySelector('#key-3');
const key4 = document.querySelector('#key-4');
const key5 = document.querySelector('#key-5');
const key6 = document.querySelector('#key-6');
const key7 = document.querySelector('#key-7');
const key8 = document.querySelector('#key-8');
const key9 = document.querySelector('#key-9');
const key10 = document.querySelector('#key-10');
const btnWhiteLeft = document.querySelector('#btn-white-left');
const btnWhiteRight = document.querySelector('#btn-white-right');
const numberDisplay = document.querySelector('#number-display');
const infoScreen = document.querySelector('#info-screen');
const mainScreen = document.querySelector('#main-screen');

key1.addEventListener('click', () => leituraTeclado('1'));
key2.addEventListener('click', () => leituraTeclado('2'));
key3.addEventListener('click', () => leituraTeclado('3'));
key4.addEventListener('click', () => leituraTeclado('4'));
key5.addEventListener('click', () => leituraTeclado('5'));
key6.addEventListener('click', () => leituraTeclado('6'));
key7.addEventListener('click', () => leituraTeclado('7'));
key8.addEventListener('click', () => leituraTeclado('8'));
key9.addEventListener('click', () => leituraTeclado('9'));
key10.addEventListener('click', () => leituraTeclado('0'));
btnWhiteLeft.addEventListener('click', buscarPokemon);
btnWhiteRight.addEventListener('click', apagar);

function leituraTeclado(tecla)
{
    if(estadoPokedex.digitando === false)
    {
        infoScreen.textContent = ''
        estadoPokedex.digitando = true
    }
    numPokemon += tecla;
    infoScreen.textContent = numPokemon
}

function apagar()
{
    if(estadoPokedex.digitando)
    {
        numPokemon = numPokemon.slice(0, -1)
        if(numPokemon.length < 1){
            estadoPokedex.digitando = false;
            infoScreen.textContent = 'Aguardando dados…'
        }
        else
        {
            infoScreen.textContent = numPokemon
        }
    }
    numberDisplay.textContent = '#000'
    mainScreen.innerHTML = "Nenhum Pokémon carregado";

}

async function consultarApi(msg)
{
    try
    {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${msg}`);
        const data = await response.json();
        carregarFoto(msg);
        infoScreen.innerHTML = `
        <strong>${data.name.toUpperCase()}</strong><br>
        Nº ${data.id} /
        Altura: ${data.height / 10} m /
        Peso: ${data.weight / 10} kg /
        Tipo: ${data.types.map(t => t.type.name).join(', ')}`;
    }
    catch(erro)
    {
        console.log(erro.msg)
    }
}

function buscarPokemon()
{
    if(estadoPokedex.digitando) consultarApi(numPokemon)

    if(Number(numPokemon) > 1025)
    {
        numberDisplay.textContent = '#000'
    }
    else
    {
        numberDisplay.textContent = `#${numPokemon}`
    }
}

async function carregarFoto(img)
{
    try
    {
        if(img < 1025)
        {
        const imagem = document.createElement("img");
        imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${img}.png`;
        imagem.style.width = "100%";
        imagem.style.height = "100%";  
        imagem.style.objectPosition = "center";
        mainScreen.innerHTML = "";
        mainScreen.appendChild(imagem);
        }
        else
        {
            mainScreen.innerHTML = "NÃO ENCONTRADO";
        }
    } 
    catch(erro)
    {
        console.log(erro.msg)
    }
} 

function atualizarNumero(id)
{
    let idString = '' + id;
    while(idString.length < 4) idString = '0' + idString;
    idString = '#' + idString;
    numberDisplay.textContent = idString;
}