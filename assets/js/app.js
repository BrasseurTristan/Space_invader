const container= document.querySelector('.grille');
const scoring = document.querySelector('h3');
let resultats= 0;
let allDivs;
let ennemies = [];
let playerPosition = 229;
let direction = 1;
let width = 20;
let downRight = true;
let downLeft = true;
// Création des ennemis 
function ennemiesCreation() {
    let indexAttr = 0;
    for (let i = 0; i < 240; i++) {
        if(indexAttr === 0){
            const bloc = document.createElement('div');
            bloc.setAttribute('data-left','true');
            container.append(bloc);
            indexAttr++;
        }else if (indexAttr === 19){
            const bloc = document.createElement('div');
            bloc.setAttribute('data-right','true');
            container.append(bloc);
            indexAttr = 0;
        }else {
            const bloc = document.createElement('div');
            container.append(bloc);
            indexAttr++;
        }
    }
    for (let i = 1; i < 53; i++) {
        if (i === 13) {
            i = 21;
            ennemies.push(i);
        }else if (i === 33) {
            i = 41;
            ennemies.push(i);
        }else {
            ennemies.push(i);
        }
    } 
    allDivs = document.querySelectorAll('.grille div');
    ennemies.forEach(spaceShip => {
        allDivs[spaceShip].classList.add('ennemies');
    })
    allDivs[playerPosition].classList.add('player');
}

ennemiesCreation();

function playerMove(event){
    allDivs[playerPosition].classList.remove('player');
     // KeyCode 37 = flèche gauche
    if(event.keyCode === 37){
        if(playerPosition > 220){
            playerPosition -= 1;
        }
    }
        // KeyCode 39 = flèche droite
    else if (event.keyCode === 39){
        if (playerPosition < 239){
            playerPosition += 1;
        }
    }
    allDivs[playerPosition].classList.add('player');
}

document.addEventListener('keydown',playerMove);
function ennemiesMove() {

    for (let i = 0; i < ennemies.length; i++){

        if(allDivs[ennemies[i]].getAttribute('data-right')=== 'true'){
            
            if(downRight){
                direction = 20;
                setTimeout(() => {
                downRight = false;
                },50);
            }
            else if(downRight === false){
                direction = -1;
            }
            downLeft = true;
        }
        else if(allDivs[ennemies[i]].getAttribute('data-left')=== 'true'){

            if(downLeft){
                direction = 20;
                setTimeout(() => {
                downLeft = false;
                },50);
            }
            else if(downLeft === false){
                direction = 1;
            }
            downRight = true;
        }
    }

    for (let i = 0; i < ennemies.length; i++) {
        allDivs[ennemies[i]].classList.remove('ennemies');
    }

    for (let i = 0; i < ennemies.length; i++) {
        ennemies[i] += direction;
    }

    for (let i = 0; i < ennemies.length; i++) {
        allDivs[ennemies[i]].classList.add('ennemies');
    }

    if(allDivs[playerPosition].classList.contains('ennemies','player')){
        scoring.textContent = 'YOU LOSE !'
        allDivs[playerPosition].classList.add('boom');
        clearInterval(invaderId);
    }
    for (let i = 0; i < ennemies.length; i++){

        if(ennemies[i] > allDivs.length - width){
            scoring.textContent = 'YOU LOSE !';
            clearInterval(ennemiesId); 
        }

    }
}

let ennemiesId = setInterval(ennemiesMove,500);


function fire(e){
    
    let laserId;
    let laserShot = playerPosition;
    
    function bulletMovement(){
        //Déplacement du tir
        allDivs[laserShot].classList.remove('laser');
        laserShot -= width;
        allDivs[laserShot].classList.add('laser');
        // Si le tir touche un ennemi
        if(allDivs[laserShot].classList.contains('ennemies')){
            allDivs[laserShot].classList.remove('laser');
            allDivs[laserShot].classList.remove('ennemies');
            allDivs[laserShot].classList.add('boom');

            ennemies = ennemies.filter(el => el !== laserShot)
            setTimeout(() => {
                allDivs[laserShot].classList.remove('boom');
            }, 150);
            clearInterval(laserId);
            resultats++;
            if(resultats === 36){
                scoring.textContent = 'YOU WIN !'
                clearInterval(ennemiesId)
            }else {
                scoring.textContent = ` Score : ${resultats}`; 
            }
            // Efface le tir si arrivé en haut de la div
            if(laserShot < width){
                clearInterval(laserId);
                setTimeout(() => {
                    allDivs[laserShot].classList.remove('laser'); 
                }, 100);
            }
        }


    }

    if(e.keyCode === 32){
        laserId = setInterval(() => {
            bulletMovement();
        }, 100);
    }
}

document.addEventListener('keyup', fire );
