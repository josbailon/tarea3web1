document.addEventListener('DOMContentLoaded', function() {
    const clienteForm = document.getElementById('clienteForm');
    const listaClientes = document.getElementById('listaClientes');

    // Cargar los clientes desde el Local Storage
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    function actualizarListaClientes() {
        listaClientes.innerHTML = '';
        clientes.forEach((cliente, index) => {
            const li = document.createElement('li');
            li.textContent = `Nombre: ${cliente.nombre}, Email: ${cliente.email}, Teléfono: ${cliente.telefono}, Dirección: ${cliente.direccion}`;
            
            // Botón para eliminar el cliente
            const eliminarButton = document.createElement('button');
            eliminarButton.textContent = 'Eliminar';
            
            eliminarButton.addEventListener('click', function() {
                // Eliminar el cliente de la lista
                clientes.splice(index, 1);
                // Actualizar el Local Storage
                localStorage.setItem('clientes', JSON.stringify(clientes));
                // Actualizar la lista de clientes en la página
                actualizarListaClientes();
            });

            li.appendChild(eliminarButton);
            listaClientes.appendChild(li);
        });
    }

    actualizarListaClientes();

    clienteForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;

        // Validar el nombre (solo letras)
        if (!/^[A-Za-z\s]+$/.test(nombre)) {
            alert('Por favor, ingresa un nombre válido (solo letras).');
            return;
        }

        // Validar el email
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }

        // Validar el teléfono (solo números)
        if (!/^\d+$/.test(telefono)) {
            alert('Por favor, ingresa un teléfono válido (solo números).');
            return;
        }

        // Validar la dirección (puede contener letras, números y caracteres especiales)
        if (!/^[\w\s.,#-]+$/.test(direccion)) {
            alert('Por favor, ingresa una dirección válida.');
            return;
        }

        // Validar los datos del formulario
        if (!nombre || !email || !telefono) {
            alert('Por favor, completa todos los campos obligatorios (Nombre, Email, Teléfono).');
            return;
        }

        // Guardar el cliente en la lista
        clientes.push({ nombre, email, telefono, direccion });
        // Actualizar el Local Storage
        localStorage.setItem('clientes', JSON.stringify(clientes));

        // Limpiar el formulario después de guardar los datos
        clienteForm.reset();

        // Actualizar la lista de clientes
        actualizarListaClientes();

        // Mostrar un mensaje de éxito
        alert('Cliente guardado exitosamente.');
    });
});
