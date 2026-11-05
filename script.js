
class AnimalSafari {
    constructor(nombre, habitat, descripcion) {
        this.nombre = nombre;
        this.habitat = habitat;
        this.descripcion = descripcion;
        this.fecha = new Date().toLocaleDateString();
    }

   
    describirAccion() {
        return `Observado en su hábitat natural.`;
    }

    
    renderCard() {
        return `
            <div class="animal-card">
                <h3>${this.nombre}</h3>
                <span class="habitat-tag">🌍 ${this.habitat}</span>
                <p><strong>Descripción:</strong> ${this.descripcion}</p>
                <p class="action-info">🐾 ${this.describirAccion()}</p>
                <small style="color: gray;">Registrado el: ${this.fecha}</small>
            </div>
        `;
    }
}


class Depredador extends AnimalSafari {
    constructor(nombre, habitat, descripcion, tecnicaCaza) {
        super(nombre, habitat, descripcion);
        this.tecnicaCaza = tecnicaCaza;
    }

   
    describirAccion() {
        return `Depredador activo. Técnica de caza: ${this.tecnicaCaza}.`;
    }
}


class AveVoladora extends AnimalSafari {
    constructor(nombre, habitat, descripcion, altitudVuelo) {
        super(nombre, habitat, descripcion);
        this.altitudVuelo = altitudVuelo;
    }

    
    describirAccion() {
        return `Ave en vuelo. Altitud estimada: ${this.altitudVuelo}.`;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sightning-form');
    const container = document.getElementById('sightnings-container');
    const tipoSelect = document.getElementById('tipo');
    const extraFieldContainer = document.getElementById('extra-field-container');
    const extraInput = document.getElementById('extra');

   
    const avistamientos = [];

    
    if (tipoSelect && extraFieldContainer && extraInput) {
        tipoSelect.addEventListener('change', (e) => {
            const valor = e.target.value;
            const labelExtra = document.querySelector('#extra-field-container label');
            
            if (valor === 'depredador') {
                extraFieldContainer.style.display = 'block';
                extraInput.placeholder = 'Ej. Acecho nocturno, Manada...';
                if (labelExtra) labelExtra.textContent = 'Técnica de caza:';
            } else if (valor === 'volador') {
                extraFieldContainer.style.display = 'block';
                extraInput.placeholder = 'Ej. 2000 metros, Vuelo planeado...';
                if (labelExtra) labelExtra.textContent = 'Altitud de vuelo:';
            } else {
                extraFieldContainer.style.display = 'none';
            }
        });

        
        tipoSelect.dispatchEvent(new Event('change'));
    }

    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const habitat = document.getElementById('habitat').value.trim();
            const descripcion = document.getElementById('descripcion').value.trim();
            const tipo = tipoSelect ? tipoSelect.value : 'general';
            const extra = extraInput ? extraInput.value.trim() : '';

            let nuevoAvistamiento;

            
            if (tipo === 'depredador') {
                nuevoAvistamiento = new Depredador(nombre, habitat, descripcion, extra || 'Acecho');
            } else if (tipo === 'volador') {
                nuevoAvistamiento = new AveVoladora(nombre, habitat, descripcion, extra || '1000m');
            } else {
                nuevoAvistamiento = new AnimalSafari(nombre, habitat, descripcion);
            }

            
            avistamientos.push(nuevoAvistamiento);

            
            renderizarAvistamientos();

            
            form.reset();
            if (tipoSelect) tipoSelect.dispatchEvent(new Event('change'));
        });
    }

    
    function renderizarAvistamientos() {
        if (!container) return; // Evita errores si el contenedor no existe
        
        container.innerHTML = '';
        
        if (avistamientos.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: gray;">No hay avistamientos registrados todavía.</p>`;
            return;
        }

       
        avistamientos.forEach((avistamiento) => {
            container.innerHTML += avistamiento.renderCard();
        });
    }

    
    renderizarAvistamientos();
});