import { edit, getAll, remove, save, selectOne, checkDuplicate } from "./firebase.js"
let id = 0

document.getElementById('btnGuardar').addEventListener('click', async () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const Pobres = {
            'run': document.getElementById('run').value,
            'nombre': document.getElementById('nombre').value.trim(),
            'apellido': document.getElementById('apellido').value.trim(),
            'fecha': document.getElementById('fecha').value,
            'genero': document.querySelector('input[name="genero"]:checked').value,
            'fono': document.getElementById('fono').value,
            'sueldo': document.getElementById('sueldo').value
        }
        
        const isDuplicate = await checkDuplicate(Pobres.run)
        
        if (isDuplicate && document.getElementById('btnGuardar').value == 'Guardar') {
            Swal.fire({
                title: "Error",
                text: "El run ingresado ya existe.",
                icon: "error"
            })
        } else {
            if (document.getElementById('btnGuardar').value == 'Guardar') {
                save(Pobres)
                Swal.fire({
                    title: "Guardado",
                    text: "El registro ha sido guardado exitosamente.",
                    icon: "success"
                })
            } else {
                edit(id, Pobres)
                id = 0
                document.getElementById('btnGuardar').value = 'Guardar'
                Swal.fire({
                    title: "Editado",
                    text: "El registro ha sido editado exitosamente.",
                    icon: "success"
                })
            }
            limpiar()
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getAll(empleados => {
        let tabla = ''
        empleados.forEach(doc => {
            const item = doc.data()

            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.nombre}</td>
                <td>${item.apellido}</td>
                <td>${item.fecha}</td>
                <td>${item.genero}</td>
                <td>${item.fono}</td>
                <td>${item.sueldo}</td>
                <td nowrap>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado.",
                            icon: "success"
                        });
                    }
                });
            })
        })

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const emp = await selectOne(btn.id)
                const item = emp.data()

                document.getElementById('run').value = item.run
                document.getElementById('nombre').value = item.nombre
                document.getElementById('apellido').value = item.apellido
                document.getElementById('fecha').value = item.fecha
                document.querySelector(`input[name="genero"][value="${item.genero}"]`).checked = true
                document.getElementById('fono').value = item.fono
                document.getElementById('sueldo').value = item.sueldo
                
                document.getElementById('btnGuardar').value = 'Editar'
                
                id = btn.id
            })
        })
    })
})

function limpiar() {
    document.getElementById('run').value = ''
    document.getElementById('nombre').value = ''
    document.getElementById('apellido').value = ''
    document.getElementById('fecha').value = ''
    document.querySelector('input[name="genero"]:checked').checked = false
    document.getElementById('fono').value = ''
    document.getElementById('sueldo').value = ''
    document.getElementById('btnGuardar').value = 'Guardar'
}
