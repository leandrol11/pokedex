const nomePokemon = document.querySelector(".nome-pokemon")
const numeroPokemon = document.querySelector(".id-pokemon")
const imgPokemon = document.querySelector(".pokemon-img")
const form = document.querySelector(".form-pesquisa")
const formPesquisa = document.querySelector(".pesquisa")
const btnAnterior = document.querySelector(".btn-anterior")
const btnProximo = document.querySelector(".btn-proximo")

let pesquisaPokemon = 1

const buscaPokemon = async (pokemon) => {
    const respostaApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const dados = await respostaApi.json()
    return dados
}

const exibePokemon = async (pokemon) => {
    const dados = await buscaPokemon(pokemon)
    nomePokemon.innerHTML = dados.name
    numeroPokemon.innerHTML = dados.id
    imgPokemon.src = dados["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    formPesquisa.value = ""
    pesquisaPokemon = dados.id
}


const pesquisa = (event) => {
    event.preventDefault()
    exibePokemon(formPesquisa.value.toLowerCase())
}

form.addEventListener("submit", pesquisa)

btnAnterior.addEventListener("click", () => {
    if (pesquisaPokemon > 1) {
        pesquisaPokemon -= 1
        exibePokemon(pesquisaPokemon)
    }
})

btnProximo.addEventListener("click", () => {
    pesquisaPokemon += 1
    exibePokemon(pesquisaPokemon)
})

exibePokemon(pesquisaPokemon)