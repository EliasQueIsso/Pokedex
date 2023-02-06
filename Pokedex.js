var formulario = document.querySelector('form');

formulario.addEventListener('submit', function(e){
    // Bloqueia o refresh da página
    e.preventDefault()
    
    // URL da pesquisa dos pokemons
    let urlForm = "https://pokeapi.co/api/v2/pokemon/"

    // Valor do input name
    let nome = document.getElementById('name')

    // Concatenar a URL com o input name
    urlForm = urlForm + this.name.value

    // Transforma os valores em minusculos
    urlForm = urlForm.toLocaleLowerCase()

    // Id do pokemons que a api irá retornar
    let retorno = document.getElementById('EtcPokemon')

    // Id da imagem do pokemon
    let imagem = document.getElementById('imgPokemon')

    // Resposta em HTML
    let html = ''

    fetch(urlForm)
        .then(retorno => retorno.json())    
        .then(function(data){
            console.log(data)
            html = 'Nome: ' + maiuscula(data.name) + '<br>'
            html = html + 'Número: ' + data.id + '<br>'
            html = html + 'Tipo: ' + maiuscula(data.types[0].type.name)
            retorno.innerHTML = html

            imagem.innerHTML = "<img src='"+ data.sprites.front_default + "'><img src='"+ data.sprites.back_default + "'>"
        })
        .catch(function(err){
            if(err == 'SyntaxError: Unexpected token N, Not Found is not valid JSON'){
                html = 'Erro: ' + err
            } else {
                html = 'Pokémon não encontrado! ⊙﹏⊙∥'
            }
            retorno.innerHTML = html
        })
});

function maiuscula(val){
    return val[0].toUpperCase() + val.substr(1)
}