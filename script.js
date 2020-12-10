let grille = document.getElementById("grille");
let timer = document.getElementById("timer");
let nbBomb = 0;

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

function afficher(slot, event, grille, nbBomb) {
    if (event.button === 0) {
        slot.style.backgroundColor = "cadetblue";
        if (slot.className.includes("bomb")) {
            let icone = document.createElement("i");
            icone.className = "fas fa-bomb";
            icone.style.color = "coral";
            if (slot.getElementsByTagName("i")[0] !== undefined) {
                slot.removeChild(slot.getElementsByTagName("i")[0]);
            }
            if (slot.getElementsByTagName("span")[0] !== undefined) {
                slot.removeChild(slot.getElementsByTagName("span")[0]);
            }
            slot.appendChild(icone);
            grille.style.animationName = "fondu";
            grille.style.animationDuration = "2s"
            window.setTimeout(function () {
                grille.style.animationName = "";
                let ligne = grille.getElementsByClassName("ligne");
                for (let i = ligne.length - 1; i >= 0; i--) {
                    grille.removeChild(ligne[i])
                }
                grille = initGrid(10, grille);
                initBomb(grille, 10);
            }, 1900);

        } else if (!slot.className.includes("bomb")) {
            if (slot.getElementsByTagName("i")[0] !== undefined) {
                slot.removeChild(slot.getElementsByTagName("i")[0]);
            }
            if (slot.getElementsByTagName("span")[0] !== undefined) {
                slot.removeChild(slot.getElementsByTagName("span")[0]);
            }
            let span = document.createElement("span");
            span.innerHTML = slot.className.split(" ")[1];
            span.style.color = "coral";
            slot.appendChild(span);
        }

    } else if (event.button === 2) {
        slot.style.backgroundColor = "cadetblue";
        let icone = document.createElement("i");
        if (slot.getElementsByTagName("i")[0] !== undefined) {
            slot.removeChild(slot.getElementsByTagName("i")[0]);
        }
        if (slot.getElementsByTagName("span")[0] !== undefined) {
            slot.removeChild(slot.getElementsByTagName("span")[0]);
        }
        icone.className = "far fa-flag";
        icone.style.color = "coral";
        if(slot.getElementsByTagName("i") !== undefined){
            if(slot.className.split(" ")[2] !== undefined){
                if(slot.className.split(" ")[2] === "bomb"){
                    slot.className += " captured"
                }
            }
        }
        slot.appendChild(icone);
        gagner(grille, nbBomb);
    }
}

function gagner(grille, nbBomb) {
    let ligne = grille.getElementsByClassName("ligne");
    let tab = []
    for (let i = 0; i < ligne.length; i++) {
        let slot = ligne[i].getElementsByClassName("slot");
        for(let j = 0; j < slot.length; j ++){
            if(slot[j].className.includes("captured")){
                tab.push(1);
            }
        }
    }
    if(tab.length === nbBomb){
        console.log("gagné");
    }
    console.log(tab)
}

function initGrid(width, grille, nbBomb) {
    for (let i = 0; i < width; i++) {
        let ligne = document.createElement("div");
        ligne.className = "ligne";
        ligne.style.height = "calc(100% / " + width + ")";
        for (let j = 0; j < width; j++) {
            let slot = document.createElement("div");
            slot.style.width = "calc(100% / " + width + ")";
            slot.style.height = "100%";
            slot.className = "slot 0";
            slot.addEventListener("mouseup", function (event) {
                afficher(slot, event, grille,nbBomb);
            })
            ligne.prepend(slot);
        }
        grille.prepend(ligne);
    }
    return grille;
}

function initBomb(grille, chance) {
    let ligne = grille.getElementsByClassName("ligne");
    let nbBombFunc = 0;
    for (let i = 0; i < ligne.length; i++) {
        let slot = ligne[i].getElementsByClassName("slot")
        for (let j = 0; j < slot.length; j++) {
            let random = Math.trunc(Math.random() * chance);
            if (random === 1) {
                slot[j].className += " bomb";
                nbBombFunc ++;
                //gauche
                if (slot[j - 1] !== undefined && slot[j - 1].className.split(" ")[2] === undefined) {
                    let classe = slot[j - 1].className.split(" ");
                    classe[1] = 1 + parseInt(classe[1]);
                    slot[j - 1].className = classe.join(" ");
                }

                //droite
                if (slot[j + 1] !== undefined && slot[j + 1].className.split(" ")[2] === undefined) {
                    let classe = slot[j + 1].className.split(" ");
                    classe[1] = 1 + parseInt(classe[1]);
                    slot[j + 1].className = classe.join(" ");
                }

                //haut
                if (ligne[i - 1] !== undefined && ligne[i - 1].getElementsByClassName("slot")[j] !== undefined &&
                    ligne[i - 1].getElementsByClassName("slot")[j].className.split(" ")[2] === undefined) {
                    let classe = ligne[i - 1].getElementsByClassName("slot")[j].className.split(" ");
                    classe[1] = 1 + parseInt(classe[1]);
                    ligne[i - 1].getElementsByClassName("slot")[j].className = classe.join(" ");
                }

                //bas
                if (ligne[i + 1] !== undefined && ligne[i + 1].getElementsByClassName("slot")[j] !== undefined &&
                    ligne[i + 1].getElementsByClassName("slot")[j].className.split(" ")[2] === undefined) {
                    let classe = ligne[i + 1].getElementsByClassName("slot")[j].className.split(" ");
                    classe[1] = 1 + parseInt(classe[1]);
                    ligne[i + 1].getElementsByClassName("slot")[j].className = classe.join(" ");
                }

                //haut gauche
                if (ligne[i - 1] !== undefined && ligne[i - 1].getElementsByClassName("slot")[j - 1] !== undefined &&
                    ligne[i - 1].getElementsByClassName("slot")[j - 1].className.split(" ")[2] === undefined) {
                    let classe = ligne[i - 1].getElementsByClassName("slot")[j - 1].className.split(" ");
                    classe[1] = 1 + parseInt(classe[1]);
                    ligne[i - 1].getElementsByClassName("slot")[j - 1].className = classe.join(" ");
                }

                //haut droite
                if (ligne[i - 1] !== undefined && ligne[i - 1].getElementsByClassName("slot")[j + 1] !== undefined &&
                    ligne[i - 1].getElementsByClassName("slot")[j + 1].className.split(" ")[2] === undefined) {
                    let classe = ligne[i - 1].getElementsByClassName("slot")[j + 1].className.split(" ");
                    classe[1] = 1 + parseInt(classe[1]);
                    ligne[i - 1].getElementsByClassName("slot")[j + 1].className = classe.join(" ");
                }

                //bas droite
                if (ligne[i + 1] !== undefined && ligne[i + 1].getElementsByClassName("slot")[j + 1] !== undefined &&
                    ligne[i + 1].getElementsByClassName("slot")[j + 1].className.split(" ")[2] === undefined) {
                    let classe = ligne[i + 1].getElementsByClassName("slot")[j + 1].className.split(" ");
                    classe[1] = 1 + parseInt(classe[1]);
                    ligne[i + 1].getElementsByClassName("slot")[j + 1].className = classe.join(" ");
                }

                //bas gauche
                if (ligne[i + 1] !== undefined && ligne[i + 1].getElementsByClassName("slot")[j - 1] !== undefined &&
                    ligne[i + 1].getElementsByClassName("slot")[j - 1].className.split(" ")[2] === undefined) {
                    let classe = ligne[i + 1].getElementsByClassName("slot")[j - 1].className.split(" ");
                    classe[1] = 1 + parseInt(classe[1]);
                    ligne[i + 1].getElementsByClassName("slot")[j - 1].className = classe.join(" ");
                }

            }
        }
    }
    nbBomb = nbBombFunc;
    console.log(nbBomb);
}

function adjacent(grille) {
    let ligne = grille.getElementsByClassName("ligne");
    for (let i = 0; i < ligne.length; i++) {
        let slot = ligne[i].getElementsByClassName("slot");
        for (let j = 0; j < slot.length; j++) {
            if (slot[j].getElementsByTagName("span")[0] !== undefined) {
                if(slot[j].getElementsByTagName("span")[0].innerHTML === "0"){

                    //gauche
                    if (slot[j - 1] !== undefined) {
                        if (parseInt(slot[j - 1].className.split(" ")[1]) >= 0) {
                            if (slot[j - 1].getElementsByTagName("span")[0] === undefined) {
                                let span = document.createElement("span");
                                span.innerHTML = parseInt(slot[j - 1].className.split(" ")[1]);
                                slot[j - 1].style.backgroundColor = "cadetblue";
                                span.style.color = "coral"
                                slot[j - 1].appendChild(span);
                            }

                        }
                    }

                    //droite
                    if (slot[j + 1] !== undefined) {
                        if (parseInt(slot[j + 1].className.split(" ")[1]) >= 0) {
                            if (slot[j + 1].getElementsByTagName("span")[0] === undefined) {
                                let span = document.createElement("span");
                                span.innerHTML = parseInt(slot[j + 1].className.split(" ")[1]);
                                slot[j + 1].style.backgroundColor = "cadetblue";
                                span.style.color = "coral"
                                slot[j + 1].appendChild(span);
                            }

                        }
                    }

                    //haut
                    if(ligne[i - 1] !== undefined){
                        if (ligne[i - 1].getElementsByClassName("slot")[j] !== undefined) {
                            if (parseInt(ligne[i - 1].getElementsByClassName("slot")[j].className.split(" ")[1]) >= 0) {
                                if (ligne[i - 1].getElementsByClassName("slot")[j].getElementsByTagName("span")[0] === undefined) {
                                    let span = document.createElement("span");
                                    span.innerHTML = parseInt(ligne[i - 1].getElementsByClassName("slot")[j].className.split(" ")[1]);
                                    ligne[i - 1].getElementsByClassName("slot")[j].style.backgroundColor = "cadetblue";
                                    span.style.color = "coral"
                                    ligne[i - 1].getElementsByClassName("slot")[j].appendChild(span);
                                }

                            }
                        }
                    }

                    //bas
                    if(ligne[i + 1] !== undefined){
                        if (ligne[i + 1].getElementsByClassName("slot")[j] !== undefined) {
                            if (parseInt(ligne[i + 1].getElementsByClassName("slot")[j].className.split(" ")[1]) >= 0) {
                                if (ligne[i + 1].getElementsByClassName("slot")[j].getElementsByTagName("span")[0] === undefined) {
                                    let span = document.createElement("span");
                                    span.innerHTML = ligne[i + 1].getElementsByClassName("slot")[j].className.split(" ")[1];
                                    ligne[i + 1].getElementsByClassName("slot")[j].style.backgroundColor = "cadetblue";
                                    span.style.color = "coral"
                                    ligne[i + 1].getElementsByClassName("slot")[j].appendChild(span);
                                }

                            }
                        }
                    }
                }
            }
        }
    }
}

grille = initGrid(10, grille);
nbBomb = initBomb(grille, 10);

window.setInterval(function(){
    adjacent(grille)
},200);

window.setInterval(function (){
    timer.getElementsByTagName("span")[0].innerHTML = 1 + parseInt(timer.getElementsByTagName("span")[0].innerHTML);
},1000)