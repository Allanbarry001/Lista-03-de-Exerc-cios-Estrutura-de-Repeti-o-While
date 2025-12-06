// Dados dos exercícios - Parte 3 (While)
const exercises = [
    { id: 1, title: "Contar 1 a 10", icon: "fa-list-ol", desc: "Exibe números de 1 a 10." },
    { id: 2, title: "Soma 1 a 100", icon: "fa-calculator", desc: "Soma de todos os números de 1 a 100." },
    { id: 3, title: "Pares 1 a 50", icon: "fa-divide", desc: "Exibe apenas os números pares de 1 a 50." },
    { id: 4, title: "Média de 5", icon: "fa-chart-simple", desc: "Lê 5 números e calcula a média." },
    { id: 5, title: "Tabuada", icon: "fa-xmark", desc: "Exibe tabuada de um número." },
    { id: 6, title: "Divisores", icon: "fa-arrows-split-up-and-left", desc: "Exibe todos os divisores do número." },
    { id: 7, title: "Verificar Primo", icon: "fa-check", desc: "Verifica se é número primo." },
    { id: 8, title: "Fibonacci (Até N)", icon: "fa-arrow-up-right-dots", desc: "Sequência até o valor informado." },
    { id: 9, title: "Média Idades (5)", icon: "fa-users", desc: "Lê nome/idade de 5 pessoas e faz média." },
    { id: 10, title: "Fibonacci (20 primeiros)", icon: "fa-list-ul", desc: "Exibe os primeiros 20 termos." },
    { id: 11, title: "Soma Pares até N", icon: "fa-plus", desc: "Soma todos os pares entre 1 e o número." },
    { id: 12, title: "Ímpares 1 a 50", icon: "fa-sort-numeric-down", desc: "Exibe números ímpares de 1 a 50." },
    { id: 13, title: "Dígitos Separados", icon: "fa-scissors", desc: "Exibe cada dígito do número separadamente." },
    { id: 14, title: "Fatorial", icon: "fa-exclamation", desc: "Calcula o fatorial (ex: 5! = 120)." },
    { id: 15, title: "Loop até 'fim'", icon: "fa-stopwatch", desc: "Lê dados até digitar 'fim' no nome." }
];

// Elementos Globais
const menuContainer = document.getElementById('menu-container');
const appContainer = document.getElementById('app-container');

// Inicialização
function init() {
    renderMenu();
    loadExercise(1);
}

// Renderiza Menu Lateral
function renderMenu() {
    menuContainer.innerHTML = exercises.map(ex => `
        <button onclick="loadExercise(${ex.id})" class="menu-btn" id="btn-${ex.id}">
            <i class="fa-solid ${ex.icon}"></i>
            <span>${ex.id}. ${ex.title}</span>
        </button>
    `).join('');
}

// Carrega Interface do Exercício
function loadExercise(id) {
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${id}`).classList.add('active');

    const ex = exercises.find(e => e.id === id);
    const formHTML = getFormHTML(id);

    appContainer.innerHTML = `
        <header>
            <h2><i class="fa-solid ${ex.icon}"></i> ${ex.title}</h2>
            <p>${ex.desc}</p>
        </header>
        
        <div class="exercise-body">
            ${formHTML}
            
            <button onclick="runLogic(${id})" class="btn-action">
                <i class="fa-solid fa-play"></i> Executar Loop
            </button>

            <div id="result-area" class="result-box"></div>
        </div>
    `;
}

// Gerador de Formulários HTML
function getFormHTML(id) {
    const numInput = (lbl, i) => `<div class="form-group"><label>${lbl}</label><input type="number" id="n${i}" class="inp-num"></div>`;
    
    switch(id) {
        case 1: case 2: case 3: case 10: case 12: 
            return `<p style="margin-bottom:20px; color:#64748b;">Nenhum valor de entrada necessário. Clique em executar.</p>`;
        
        case 4: 
            let html4 = '';
            for(let i=1; i<=5; i++) html4 += numInput(`Número ${i}:`, i);
            return html4;

        case 5: case 6: case 7: case 8: case 11: case 13: case 14:
            return numInput('Digite um número inteiro:', 1);

        case 9:
            let html9 = '';
            for(let i=1; i<=5; i++) {
                html9 += `<div class="form-group" style="border-left:3px solid #cbd5e1; padding-left:10px;">
                            <label>Pessoa ${i} - Idade:</label>
                            <input type="number" id="age${i}">
                          </div>`;
            }
            return html9;

        case 15:
            return `<div class="form-group">
                        <label>Insira os dados (uma pessoa por linha):<br>
                        <span style="font-size:0.8rem; color:#666;">Formato: Nome, Idade</span></label>
                        <textarea id="bulkData" rows="6" placeholder="Ana, 20&#10;Carlos, 30&#10;fim"></textarea>
                    </div>`;

        default: return '';
    }
}

// Motor de Execução (Lógica While)
function runLogic(id) {
    const resDiv = document.getElementById('result-area');
    resDiv.className = 'result-box';
    let output = '';

    // Helper para pegar valor numérico
    const getNum = (eid) => parseInt(document.getElementById(eid).value);

    try {
        switch(id) {
            case 1: // 1 a 10
                let i1 = 1;
                while(i1 <= 10) { output += i1 + ' '; i1++; }
                break;

            case 2: // Soma 1 a 100
                let i2 = 1, soma2 = 0;
                while(i2 <= 100) { soma2 += i2; i2++; }
                output = `A soma de 1 a 100 é: <strong>${soma2}</strong>`;
                break;

            case 3: // Pares 1 a 50
                let i3 = 1;
                while(i3 <= 50) {
                    if(i3 % 2 === 0) output += i3 + ' ';
                    i3++;
                }
                break;

            case 4: // Média 5 nums
                let i4 = 1, soma4 = 0;
                while(i4 <= 5) {
                    const val = getNum(`n${i4}`);
                    if(isNaN(val)) throw "Preencha todos os 5 números.";
                    soma4 += val;
                    i4++;
                }
                output = `Média: ${(soma4 / 5).toFixed(2)}`;
                break;

            case 5: // Tabuada
                const n5 = getNum('n1');
                if(isNaN(n5)) throw "Digite um número.";
                let i5 = 1;
                output = `<strong>Tabuada de ${n5}:</strong><br>`;
                while(i5 <= 10) {
                    output += `${n5} x ${i5} = ${n5 * i5}<br>`;
                    i5++;
                }
                break;

            case 6: // Divisores
                const n6 = getNum('n1');
                if(isNaN(n6) || n6 <= 0) throw "Digite um número positivo.";
                let i6 = 1;
                output = `Divisores de ${n6}: `;
                while(i6 <= n6) {
                    if(n6 % i6 === 0) output += i6 + ' ';
                    i6++;
                }
                break;

            case 7: // Primo
                const n7 = getNum('n1');
                if(isNaN(n7)) throw "Digite um número.";
                let i7 = 2, isPrime = true;
                if (n7 < 2) isPrime = false;
                while(i7 < n7) {
                    if(n7 % i7 === 0) { isPrime = false; break; }
                    i7++;
                }
                output = `O número ${n7} ${isPrime ? '<strong>É PRIMO</strong>' : '<strong>NÃO É PRIMO</strong>'}.`;
                break;

            case 8: // Fibonacci até N
                const n8 = getNum('n1');
                if(isNaN(n8)) throw "Digite um número.";
                let a8 = 0, b8 = 1;
                output = `Fibonacci até ${n8}: `;
                while(a8 <= n8) {
                    output += a8 + ' ';
                    let temp = a8 + b8;
                    a8 = b8;
                    b8 = temp;
                }
                break;

            case 9: // Média Idades (5 pessoas)
                let i9 = 1, somaAge = 0;
                while(i9 <= 5) {
                    const val = parseInt(document.getElementById(`age${i9}`).value);
                    if(isNaN(val)) throw "Preencha todas as idades.";
                    somaAge += val;
                    i9++;
                }
                output = `Média das idades: ${(somaAge / 5).toFixed(1)} anos`;
                break;

            case 10: // Fib 20 termos
                let c10 = 0, x10 = 0, y10 = 1;
                output = 'Primeiros 20 Fibonacci: ';
                while(c10 < 20) {
                    output += x10 + ' ';
                    let next = x10 + y10;
                    x10 = y10;
                    y10 = next;
                    c10++;
                }
                break;

            case 11: // Soma pares até N
                const n11 = getNum('n1');
                let i11 = 1, soma11 = 0;
                while(i11 <= n11) {
                    if(i11 % 2 === 0) soma11 += i11;
                    i11++;
                }
                output = `Soma dos pares entre 1 e ${n11}: <strong>${soma11}</strong>`;
                break;

            case 12: // Ímpares 1 a 50
                let i12 = 1;
                while(i12 <= 50) {
                    if(i12 % 2 !== 0) output += i12 + ' ';
                    i12++;
                }
                break;

            case 13: // Dígitos separados
                let n13 = getNum('n1');
                if(isNaN(n13)) throw "Digite um número.";
                output = `Dígitos de ${n13}: `;
                let digits = [];
                // Usando while para pegar dígitos (matemática)
                while(n13 > 0) {
                    digits.push(n13 % 10);
                    n13 = Math.floor(n13 / 10);
                }
                // Como pegamos de trás pra frente, invertemos para exibir
                let idx = digits.length - 1;
                while(idx >= 0) {
                    output += digits[idx] + ' - ';
                    idx--;
                }
                break;

            case 14: // Fatorial
                let n14 = getNum('n1');
                if(isNaN(n14)) throw "Digite um número.";
                let fat = 1;
                let c14 = n14;
                while(c14 > 1) {
                    fat *= c14;
                    c14--;
                }
                output = `Fatorial de ${n14} é <strong>${fat}</strong>`;
                break;

            case 15: // Loop até 'fim'
                const rawText = document.getElementById('bulkData').value;
                const lines = rawText.split('\n');
                let ln = 0, totalAge = 0, countP = 0;
                let stop = false;

                while(ln < lines.length && !stop) {
                    let line = lines[ln].trim();
                    if(line) {
                        let parts = line.split(',');
                        // Verifica se digitou fim no nome
                        let nome = parts[0].trim().toLowerCase();
                        if(nome === 'fim') {
                            stop = true;
                        } else {
                            if(parts.length > 1) {
                                totalAge += parseInt(parts[1]);
                                countP++;
                            }
                        }
                    }
                    ln++;
                }
                
                if(countP === 0) output = "Nenhum dado válido processado antes do 'fim'.";
                else output = `Média de idade das ${countP} pessoas: <strong>${(totalAge/countP).toFixed(1)}</strong>`;
                break;
        }

        resDiv.innerHTML = output || "Executado.";
        resDiv.style.display = 'block';

    } catch (error) {
        resDiv.innerHTML = error;
        resDiv.classList.add('error');
        resDiv.style.display = 'block';
    }
}

// Inicia app
init();