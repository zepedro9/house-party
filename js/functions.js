Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function removeSubstrFromStr(str, substr) {
    if(str.includes(substr)) {
        if(str.indexOf(substr) === 0) str = str.substring(substr.length, str.length);
        else if(str.indexOf(substr) === str.length-substr.length) str = str.substring(0, str.length-substr.length);
        else str = str.substring(0, str.indexOf(substr)) + str.substring(str.indexOf(substr) + substr.length, str.length);
    }
    return str;
}

function populatePlayersArray(arrayTo, arrayFrom) {
    arrayFrom.forEach(function (item) {
        let isMale = true;
        if(item.includes("<F>")) {
            isMale = false;
            item = item.replace("<F>", "");
        } else item = item.replace("<M>", "");

        let aux = new Jogador(item, isMale);
        if(arrayTo.length === 0) aux.isOwner = true;
        arrayTo.push(aux);
    });
}

function populateEventsArray(arrayTo, arrayFrom) {
    arrayFrom.forEach(function (item) {
        let numJg, mortes = 0, rarity, isRepeatable = true;
        if(item.includes("<x")) {
            mortes = item.substring(item.indexOf("<x") + 2, item.length - 1);
            item = removeSubstrFromStr(item, "<x" + mortes + ">");
        }
        numJg = (item.match(/<jogador>/g) || []).length;
        rarity = parseInt(item.charAt(2));
        item = removeSubstrFromStr(item, "<r" + rarity + ">");
        if(item.includes("<nr>")) {
            isRepeatable = false;
            item = removeSubstrFromStr(item, "<nr>");
        }
        let aux = new Evento(item, numJg, mortes, rarity, isRepeatable);
        for(let i = 3; i >= rarity; i--) arrayTo.push(aux);
    });
}

function populateSpecialEventsArray(arrayTo, arrayFrom) {
    arrayFrom.forEach(function (item) {
        let titulo, isFixed;
        titulo = item.substring(0, item.indexOf("<"));
        isFixed = item.includes("<H");
        let aux = new Evento_Especial(titulo, isFixed);
        if(isFixed) aux.hourIfFixed = item.substr(item.indexOf("<H") + 2, 5);
        arrayTo.push(aux);
    });
}

function getEventsForSpecialEvent(titulo) {
    switch(titulo) {
        case "Polícia toca à campainha!":
            return eventosPolicia;
        case "A luz vai abaixo!":
            return eventosLuzAbaixo;
        case "Exército arromba as portas":
            return eventosExercito;
        case "Várias Celebridades Internacionais aparecem na festa!":
            return eventosCelebrities;
        case "Uma camioneta cheia de strippers chega à festa!":
            return eventosStrippers;
        case "After Party":
            return eventoAfterParty;
    }
}

function getArrayFromArray(array, comparator, value) {
    let newArray = [];
    array.forEach(function (item) {
        if(comparator(item) === value) newArray.push(item);
    });
    return newArray;
}

/* comparators */

function isFixedSpecialEvent(item) {
    return item.isFixed;
}

/* comparators */

function getFixedSpecialEventEvents(e) {
    switch (e.hourIfFixed) {
        case "23:00":
            return eventosInicio;
        case "08:00":
            return eventoAfterParty;
        default:
            alert("ERRO: EVENTO ESPECIAL INVÁLIDO!");
    }
}

function colorText(text, color) {
    return "<span style=\"color: " + color + ";\">" + text + "</span>";
}

function getRandomSpecialEvent(eventos) {
    return eventos[Math.floor(Math.random() * eventos.length)];
}

function getRandomEvent(eventos, maxPlayers, isSpecialEvent) {
    if(isSpecialEvent && eventos.length === 1) return eventos[0];
    if(maxPlayers === 0) {
        alert("ERRO: Procura de evento com máximo 0 jogadores!");
        return undefined;
    }
    let evento = eventos[Math.floor(Math.random() * eventos.length)];
    while (evento.numJogadores > maxPlayers || evento.quemMorre.length >= maxPlayers) evento = eventos[Math.floor(Math.random() * eventos.length)];
    if(!isSpecialEvent)
        if(timeProgress < Math.floor(Math.random() * 11))
            while (evento.quemMorre !== 0 || evento.numJogadores > maxPlayers) evento = eventos[Math.floor(Math.random() * eventos.length)];
    return evento;
}

function getRandomPlayer(jogadores) {
    let aux = Math.floor(Math.random() * jogadores.length);
    if(jogadores[aux] === undefined)
        alert("ERROR: Player undefined found");
    return jogadores[aux];
}

function displayPlayerList(jogadores) {
    jogadores.forEach(function (item) {
        let jogador = document.createElement('span');
        if(item.isMale) jogador.innerHTML = colorText(item.nome, "#2574a9");
        else jogador.innerHTML = colorText(item.nome, "#f62459");
        jogador.setAttribute("onClick", "togglePlayer(this)");
        jogador.setAttribute("data-isSelected", "true");
        jogador.setAttribute("style", "");
        document.getElementById("jogadores").appendChild(jogador);
    });
}

// noinspection JSUnusedGlobalSymbols
function togglePlayer(jogador) {
    if(jogador.getAttribute("data-isSelected") === "false") {
        jogador.setAttribute("style", "text-decoration: none;");
        jogador.setAttribute("data-isSelected", "true");
    } else {
        jogador.setAttribute("style", "text-decoration: line-through;");
        jogador.setAttribute("data-isSelected", "false");
    }
}

function addPlayer() {
    let jogador = new Jogador("Erro", false);
    let nome = prompt("Qual é o nome?", "");
    if (nome != null && nome !== "") {
        let sexo = prompt("Qual é o sexo? (M ou F)", "M");
        if (sexo != null && (sexo === "m" || sexo === "f" || sexo === "M" || sexo === "F")) {
            if(sexo === "m" || sexo === "M") jogador.isMale = true;
            jogador.nome = nome;
        } else {
            alert("Sexo inválido!");
            return;
        }
    } else {
        alert("Nenhum nome escrito!");
        return;
    }
    jogadores.push(jogador);
    let aux = [];
    aux.push(jogador);
    displayPlayerList(aux);
}

function nextHour(hour) {
    if(hour === "23:40") return "00:00";
    if(hour === "09:40") return "10:00";
    if(hour === "19:40") return "20:00";
    else {
        if(hour.charAt(hour.length - 2) === "4") return hour.charAt(0) + (parseInt(hour.charAt(1)) + 1) + ":00";
        if(hour.charAt(hour.length - 2) === "2") return hour.charAt(0) + hour.charAt(1) + ":40";
        else return hour.charAt(0) + hour.charAt(1) + ":20";
    }
}

function removeStrikedPlayers() {
    let jogs = document.getElementById("jogadores").children;
    for (let i = 0; i < jogs.length; i++) {
        if(jogs[i].getAttribute("style").includes("line-through")) {
            jogadores.remove(jogadores.find(pl => pl.nome === jogs[i].children[0].innerText));
        }
    }
}

function startParty() {
    document.getElementById("jogadores").setAttribute("style", "display:none");
    document.getElementById("start").setAttribute("style", "display:none");
    document.getElementById("add").setAttribute("style", "display:none");
    document.getElementById("eventos").setAttribute("style", "display:flex");
    document.getElementById("next").setAttribute("style", "display:block");
    document.getElementById("hora").setAttribute("style", "display:block");

    removeStrikedPlayers();
    eventosNaoFixos = getArrayFromArray(eventosEspeciais, isFixedSpecialEvent, false);
    generateEvents().then();
}

function endParty() {
    document.getElementById("eventos").setAttribute("style", "display:none");
    document.getElementById("next").setAttribute("style", "display:none");
    document.getElementById("evento_especial").setAttribute("style", "display:block");
    document.getElementById("evento_especial").innerText = "Fim da Festa";
    document.getElementById("vencedores").setAttribute("style", "display:block");
    let player = jogadores[0];
    let name;
    if(player.isMale) name = colorText(player.nome, "#2574a9");
    else name = colorText(player.nome, "#f62459");

    let titulo = document.createElement("p");
    titulo.innerText = "Os Resistentes:";
    document.getElementById("vencedores").append(titulo);

    jogadores.forEach(function (item) {
        let winner = document.createElement('p');
        if(item.isMale) winner.innerHTML = colorText(item.nome, "#2574a9");
        else winner.innerHTML = colorText(item.nome, "#f62459");
        document.getElementById("vencedores").append(winner);
    });
}

function nextEvents() {
    document.getElementById("hora").innerText = nextHour(document.getElementById("hora").innerText);
    document.getElementById("eventos").innerHTML = '';
    timeProgress++;

    if(!isAfterParty) {
        if(document.getElementById("hora").innerText === "08:00" || jogadores.length === 1) {
            let rand = Math.floor(Math.random() * 100);
            if(rand < AFTER_PARTY_PROBABILITY) {
                isAfterParty = true;
                generateEvents().then();
            } else endParty();
        } else generateEvents().then();
    } else {
        if(document.getElementById("hora").innerText === "12:00" || jogadores.length === 1) endParty();
        else generateEvents().then();
    }
}

async function generateEvents() {
    if(jogadores.length === 1) {
        endParty();
        return;
    }

    let hora = document.getElementById("hora").innerText;
    let eventoEspecial = eventosEspeciais.find(event => event.hourIfFixed === hora);
    let eventosAux, isPartyStart = false, isSpecialEvent = false;
    if(eventoEspecial !== undefined) {
        isSpecialEvent = true;
        document.getElementById("evento_especial").innerText = eventoEspecial.titulo;
        document.getElementById("evento_especial").setAttribute("style", "display:block");

        if(eventoEspecial.hourIfFixed === "23:00") isPartyStart = true;
        eventosAux = [...getFixedSpecialEventEvents(eventoEspecial)];
    } else {
        let rand = Math.floor(Math.random() * 100);
        if(rand < SPECIAL_EVENT_PROBABILITY && timeProgress >= 1 && eventosNaoFixos.length > 0) {
            isSpecialEvent = true;
            let spEvent = getRandomSpecialEvent(eventosNaoFixos);
            eventosNaoFixos.remove(spEvent);
            eventosAux = [...getEventsForSpecialEvent(spEvent.titulo)];
            document.getElementById("evento_especial").innerText = "Evento Especial: " + spEvent.titulo;
            document.getElementById("evento_especial").setAttribute("style", "display:block");
        } else {
            document.getElementById("evento_especial").setAttribute("style", "display:none");
            eventosAux = [...eventos];
        }
    }

    let jogadoresAux;
    if(isAfterParty && hora === "08:00") jogadoresAux = [...jogadoresForaDaFesta];
    else jogadoresAux = [...jogadores];
    let evento, str, player, isThereMale, span;
    while(jogadoresAux.length > 0) {
        if(isPartyStart) jogadoresAux.remove(jogadoresAux.find(pl => pl.isOwner === true));
        span = document.createElement('span');
        evento = getRandomEvent(eventosAux, jogadoresAux.length, isSpecialEvent);
        if(!evento.repeatable) eventosAux.remove(evento);
        isThereMale = false;
        str = evento.frase;
        for(let i = 1; i <= evento.numJogadores; i++) {
            player = getRandomPlayer(jogadoresAux);
            jogadoresAux.remove(player);
            if(evento.quemMorre.toString().includes(i.toString()) && jogadores.length > 1) {
                jogadores.remove(player);
                jogadoresForaDaFesta.push(player);
            }
            if(isAfterParty && hora === "08:00") jogadores.push(player);
            if(player.isMale) isThereMale = true;
            if(player.isMale) {
                str = str.replace(/<jogador>/, colorText(player.nome, "#2574a9"));
                str = str.replace("<j"+i+">", colorText(player.nome, "#2574a9"));
                switch (i) {
                    case 1:
                        str = str.replace(/\(1([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$1");
                        break;
                    case 2:
                        str = str.replace(/\(2([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$1");
                        break;
                    case 3:
                        str = str.replace(/\(3([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$1");
                        break;
                    case 4:
                        str = str.replace(/\(4([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$1");
                        break;
                    case 5:
                        str = str.replace(/\(5([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$1");
                        break;
                    case 6:
                        str = str.replace(/\(6([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$1");
                        break;
                    default:
                        alert("ERRO: Número de jogadores a mais a gerar eventos!");
                        return;
                }
            } else {
                str = str.replace(/<jogador>/, colorText(player.nome, "#f62459"));
                str = str.replace("<j"+i+">", colorText(player.nome, "#f62459"));
                switch (i) {
                    case 1:
                        str = str.replace(/\(1([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$2");
                        break;
                    case 2:
                        str = str.replace(/\(2([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$2");
                        break;
                    case 3:
                        str = str.replace(/\(3([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$2");
                        break;
                    case 4:
                        str = str.replace(/\(4([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$2");
                        break;
                    case 5:
                        str = str.replace(/\(5([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$2");
                        break;
                    case 6:
                        str = str.replace(/\(6([a-zA-Z\u00C0-\u00FF\s,-]*)\/([a-zA-Z\u00C0-\u00FF\s,-]*)\)/g, "$2");
                        break;
                    default:
                        alert("ERRO: Número de jogadores a mais a gerar eventos!");
                        return;
                }
            }
        }
        if(isThereMale) {
            str = str.replace(/\(0([a-zA-Z\u00C0-\u00FF]*)\/([a-zA-Z\u00C0-\u00FF]*)\)/g, "$1");
        } else {
            str = str.replace(/\(0([a-zA-Z\u00C0-\u00FF]*)\/([a-zA-Z\u00C0-\u00FF]*)\)/g, "$2");
        }
        span.innerHTML = str;
        document.getElementById("eventos").appendChild(span);
        if(isAfterParty && hora === "08:00") break;
    }
    document.getElementById("eventos").lastElementChild.setAttribute("style", "margin-bottom: 150px");
    await sleep(250);
    document.getElementById("eventos").scrollIntoView({ behavior: 'smooth', block: 'center' });
    let spans = document.getElementById("eventos").children;
    for (let i = 0; i < spans.length; i++) {
        await sleep(25);
        document.getElementById("eventos").children[i].setAttribute("style", "opacity: 1; margin-top: 0px;");
    }
}