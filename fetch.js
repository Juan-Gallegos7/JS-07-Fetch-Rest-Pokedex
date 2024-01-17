/////////////////// EJERCICIOS
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch



// Fetch
//
// POST

const BASE_URL = 'https://pokeapi.co/api/v2/';

// Fetch no async
/*
fetch(BASE_URL + 'pokemon/ditto')
    .then(res => res.json())
    .then(data => console.log(data));
*/
// fetch async

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

// Boton get. Obtener pokemon
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem('currentPokeId', pokemon.id);
        mostrarTarjetaPokemon(pokemon);
        console.log(pokemon.name)
        console.log(pokemon.generation)
    })

// al cargar la pagina 
document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    mostrarTarjetaPokemon(pokemon);
})

// obtener el anterior
//
//
// obtener el siguiente

// Boton previous. Obtener el anterior
document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max(1, currentPokeId -1);
        const pokemon = await fetchPokemon(newId);
        mostrarTarjetaPokemon(pokemon);
    })

// Boton next. Obtener el siguiente
document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        const pokemon = await fetchPokemon(newId);
        mostrarTarjetaPokemon(pokemon);
    })



////////////////// POST
//

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.json())
    .then(json => console.log(json))





// Función para mostrar la tarjeta del Pokémon en el DOM
const mostrarTarjetaPokemon = (pokemon) => {
    // Seleccionar el contenedor donde se mostrará la tarjeta
    const contenedorTarjeta = document.querySelector('.card--container');
    
    // Crear elementos HTML para la tarjeta del Pokémon
    const tarjeta = document.createElement('div');
    
    const nombre = document.createElement('h2');
    nombre.textContent = `Name: ${pokemon.name}`;
    
    const id = document.createElement('p');
    id.textContent = `Poke ID: ${pokemon.id}`;
    
    const peso = document.createElement('p');
    peso.textContent = `Weigth: ${pokemon.weight} g`;


    // Añadir los elementos a la tarjeta
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(id);
    tarjeta.appendChild(peso);


    // Limpiar el contenido anterior del contenedor
    contenedorTarjeta.innerHTML = '';


    // Añadir la tarjeta al contenedor
    contenedorTarjeta.appendChild(tarjeta);
}
