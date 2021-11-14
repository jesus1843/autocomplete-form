document.addEventListener('DOMContentLoaded', function() {
    const codigo_postal = document.getElementById('codigo_postal');
    const estado = document.getElementById('estado');
    const municipio = document.getElementById('municipio');
    const colonia = document.getElementById('colonia');
    const calle_numero = document.getElementById('calle_numero');

    const apiBaseUrl = 'https://api.copomex.com/query/info_cp';
    const token = 'pruebas';

    codigo_postal.addEventListener('blur', function() {
        const cp = codigo_postal.value;
        const apiUrl = `${ apiBaseUrl }/${ cp }?type=simplified&token=${ token }`;
        
        fetch(apiUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                const { response } = data;
                
                estado.value = response.estado;
                municipio.value = response.municipio;
                
                vaciarSelect();
                response.asentamiento.forEach(function(asentamiento) {
                    const option = document.createElement('option');
                    option.value = asentamiento;
                    option.textContent = asentamiento;
                    colonia.appendChild(option);
                });
                colonia.removeAttribute('disabled');
                calle_numero.removeAttribute('disabled');
            })
            .catch(function(error) {
                console.log(error);
            });
    });

    function vaciarSelect() {
        while(colonia.firstChild) {
            colonia.firstChild.remove();
        }
    }
});
