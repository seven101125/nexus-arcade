
/* =====================================================
   ELEMENTOS
===================================================== */

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const games =
    document.querySelectorAll(".game-card");

const categories =
    document.querySelectorAll(".category");

const noResults =
    document.getElementById("noResults");

const gameCounter =
    document.getElementById("gameCounter");

const gameModal =
    document.getElementById("gameModal");

const currentGame =
    document.getElementById("currentGame");


/* =====================================================
   BUSCADOR
===================================================== */

function searchGames() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    let visibleGames = 0;

    games.forEach(game => {

        const name =
            game.dataset.name.toLowerCase();

        const category =
            game.dataset.category.toLowerCase();

        if (
            name.includes(search) ||
            category.includes(search)
        ) {

            game.style.display = "";

            visibleGames++;

        } else {

            game.style.display = "none";

        }

    });

    updateCounter(visibleGames);

    if (visibleGames === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


/*=====================================================
   BOTÓN DE BÚSQUEDA
===================================================== */

searchButton.addEventListener(
    "click",
    searchGames
);


/* =====================================================
   BUSCAR MIENTRAS SE ESCRIBE
===================================================== */

searchInput.addEventListener(
    "input",
    searchGames
);


/* =====================================================
   FILTRO DE CATEGORÍAS
===================================================== */

categories.forEach(category => {

    category.addEventListener(
        "click",
        () => {

            categories.forEach(button => {

                button.classList.remove("active");

            });

            category.classList.add("active");

            const selected =
                category.dataset.category;

            let visibleGames = 0;

            games.forEach(game => {

                const gameCategory =
                    game.dataset.category;

                if (
                    selected === "todos" ||
                    gameCategory === selected
                ) {

                    game.style.display = "";

                    visibleGames++;

                } else {

                    game.style.display = "none";

                }

            });

            updateCounter(visibleGames);

            if (visibleGames === 0) {

                noResults.style.display = "block";

            } else {

                noResults.style.display = "none";

            }

        }
    );

});


/* =====================================================
   CONTADOR
===================================================== */

function updateCounter(number) {

    gameCounter.textContent =
        `${number} JUEGO${number === 1 ? "" : "S"}`;

}


/* =====================================================
   ABRIR JUEGO
===================================================== */
function playGame(gameName) {

    currentGame.textContent = gameName;

    const gameFrame =
        document.getElementById("gameFrame");


    /*
       Seleccionamos qué juego
       debe abrirse.
    */

    if (gameName === "Cyber Run") {

        gameFrame.src =
            "games/cyber-run/index.html";

    }


    gameModal.classList.add("active");

    document.body.style.overflow =
        "hidden";
}



/* =====================================================
   CERRAR JUEGO
===================================================== */

function closeGame() { 
    const gameFrame = document.getElementById("gameFrame"); 
    /* Detenemos el juego al cerrar el modal. */ 
    gameFrame.src = "";
     gameModal.classList.remove("active"); 
    document.body.style.overflow = ""; }

/* =====================================================
   CERRAR CON ESC
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            gameModal.classList.contains("active")
        ) {

            closeGame();

        }

    }
);


/* =====================================================
   CERRAR AL HACER CLICK FUERA
===================================================== */

gameModal.addEventListener(
    "click",
    event => {

        if (
            event.target === gameModal
        ) {

            closeGame();

        }

    }
);


/* =====================================================
   SCROLL A JUEGOS
===================================================== */

function scrollToGames() {

    document
        .getElementById("juegos")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   MENSAJE INICIAL
===================================================== */

console.log(
    "🎮 NEXUS ARCADE iniciado correctamente."
);

console.log(
    "Sistema preparado para cargar videojuegos."
);

