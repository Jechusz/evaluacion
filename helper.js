const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'sueldo') {
            if (input.value < 500000) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No pagamos menos de $500.000</span>'
            }
        }
        if (id == 'run') {
            if (!validarRun(input.value) /*|| input.value.length<9*/) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run ingresado no es válido</span>'
            }
        }
        if (id == 'fecha') {
            if (validarFecha(input.value) < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No se puede contratar a futuro</span>'
            }
        }
        if (id == 'email') {
            if (!validaEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'

            }
        }
    }
}


const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    //al limpiar volvemos el run y btn a la normalidad
    document.getElementById('run').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'

}

const soloNumero = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}


const validarFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    //(1000*60*60*24) permite pasarlo a días
    const dia = (resta / (1000 * 60 * 60 * 24))
    //toFixed permite añadir cantidad de decimales 
    return dia.toFixed(0)
}

const validarRun = (run) => {
    const Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut: function (rutCompleto) {
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-') //se separa en dos el run antes del guión y despues
            const digv = tmp[1];  //se asigna l aparte del dígito verificador
            const rut = tmp[0]; //se asigna la parte númerica
            if (digv == 'K') digv = 'k'
            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }
    return Fn.validaRut(run)
}