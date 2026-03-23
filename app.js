const products = [
    "Xarope Caramelo Salgado", "Xarope Vanilla", "Xarope Avelã", "Xarope Limão Siciliano",
    "Xarope Gengibre", "Xarope Pumpkin Spice", "Xarope Pistache", "Xarope Torta de maçã",
    "Xarope Marshmallow tostado", "Xarope Tiramissú", "Xarope Chá Chai", "Xarope chá de Framboesa",
    "Xarope chá de Pêssego", "Chai Tea (maçã com canela)", "Chantilly", "Calda de Chocolate",
    "Calda de Caramelo", "Leite Integral", "Leite Zero Lactose", "Leite Vegetal",
    "Amido de milho", "Ampola nitro (Chantilly)", "Massala em pó", "Pistache em pó",
    "Filtro Hario", "Filtro Chemex", "Creme Americano", "Creme de Avelã",
    "Croissant Amanteigado", "Agua com Gas", "Agua sem Gas", "Cold Brew",
    "Tônica", "Sachê açúcar refinado", "Sachê açúcar mascavo", "Sachê adoçante",
    "Guardanapo", "Chocolate em Pó Gelado", "Chocolate em Pó 50%", "Chocolate pastilhas Preto",
    "Chocolate pastilhas Branco", "Canudo"
];

let inventoryData = JSON.parse(localStorage.getItem('inventory_data')) || {};

function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';

    products.forEach((name, index) => {
        const data = inventoryData[name] || { open: '', closed: '', finished: false };
        const card = document.createElement('div');
        card.className = `product-card ${data.finished ? 'out-of-stock' : (data.open !== '' || data.closed !== '' ? 'filled' : '')}`;
        card.id = `card-${index}`;

        card.innerHTML = `
            <div class="product-name">${name}</div>
            <div class="inputs-row">
                <div class="input-group">
                    <label>Aberto</label>
                    <input type="number" step="any" value="${data.open}" 
                        oninput="updateData('${name}', 'open', this.value, ${index})" 
                        ${data.finished ? 'disabled' : ''}>
                </div>
                <div class="input-group">
                    <label>Fechado</label>
                    <input type="number" step="any" value="${data.closed}" 
                        oninput="updateData('${name}', 'closed', this.value, ${index})" 
                        ${data.finished ? 'disabled' : ''}>
                </div>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" ${data.finished ? 'checked' : ''} 
                    onchange="updateData('${name}', 'finished', this.checked, ${index})">
                <label>ACABOU</label>
            </div>
        `;
        list.appendChild(card);
    });
}

function updateData(name, field, value, index) {
    if (!inventoryData[name]) {
        inventoryData[name] = { open: '', closed: '', finished: false };
    }
    
    const card = document.getElementById(`card-${index}`);
    const inputs = card.querySelectorAll('input[type="number"]');

    if (field === 'finished') {
        inventoryData[name].finished = value;
        inputs.forEach(i => i.disabled = value);
        
        if (value) {
            card.classList.add('out-of-stock');
            card.classList.remove('filled');
        } else {
            card.classList.remove('out-of-stock');
            // Re-check if filled
            if (inventoryData[name].open !== '' || inventoryData[name].closed !== '') {
                card.classList.add('filled');
            }
        }
    } else {
        inventoryData[name][field] = value;
        if (!inventoryData[name].finished && (inventoryData[name].open !== '' || inventoryData[name].closed !== '')) {
            card.classList.add('filled');
        } else {
            card.classList.remove('filled');
        }
    }
    
    // Auto-save on change (UX improvement)
    localStorage.setItem('inventory_data', JSON.stringify(inventoryData));
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

document.getElementById('btn-save').addEventListener('click', () => {
    localStorage.setItem('inventory_data', JSON.stringify(inventoryData));
    showToast('Progresso salvo localmente!');
});

// Initial render
renderProducts();
