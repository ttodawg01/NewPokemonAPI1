// / get the from and everything

{
    let form = document.getElementById('Pokeform');
    console.log(form)

    async function handleSubmit(e){
        e.preventDefault()
        // console.log(e);
        let pokemonNames = e.target.pokemonNames.value;
        // console.log(pokemonNames)
        let PokemonInfo = await getPokemonInfo(pokemonNames);
        BuildPokemonCard(PokemonInfo)

        e.target.pokemonNames.value = ''
    }

    // create a fuction for the pokemon names

    async function getPokemonInfo(PokemonName){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonName}/`);
        // console.log(response)
        let data = await response.json();
        // console.log(data[0])
        return data
    }


    // function to take country object and build an HTML card
    function BuildPokemonCard(PokemonObj){
        // creating a card div
        let card = document.createElement('div');
        card.className = 'card'

        let image = document.createElement('img')
        image.className = 'card-img-top mb-3'
        image.src = PokemonObj.sprites.front_default
        // add image to the child 
        card.append(image)

        // create card body
        let cardBody = document.createElement('div')
        cardBody.className = 'card-body';

        // create pokemon name and its elements
        let pokemonTitle = document.createElement('h5')
        pokemonTitle.className = 'card-title';
        pokemonTitle.innerHTML = PokemonObj.species.name;

        let pokemonHeight = document.createElement('p')
        pokemonHeight.className = 'card-text';
        pokemonHeight.innerHTML = `height ${PokemonObj.height}`

        let pokemonWeight = document.createElement('p')
        pokemonWeight.className = 'card-text';
        pokemonWeight.innerHTML = `weight ${PokemonObj.weight}`

        // adding the title and weight and height to the card
        cardBody.append(pokemonTitle);
        cardBody.append(pokemonHeight);
        cardBody.append(pokemonWeight);

        // add cardbody to the card
        card.append(cardBody);

        // creating col
        let col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-3'

        col.append(card)


        // letting the pokemon display
        let display = document.getElementById('pokeGallery');

        display.append(col);

    }

    // add handlesubmit function
    form.addEventListener('submit', handleSubmit)
}