const fs = require('fs');
const path = require('path');
const doctorsFilePath = path.join(__dirname, '../resources/doctors.json');

let doctorsData = { medicos: [] };
    if (fs.existsSync(doctorsFilePath)) {
        const doctorsFile = fs.readFileSync(doctorsFilePath);
        doctorsData = JSON.parse(doctorsFile);
} 

const doctorsJson = require('./doctors.json')

let doctors = doctorsJson.medicos


let addDoctor = function (documentoIdentidad, nombre, especialidad, registro_medico, usuario, constrasenha) {

    const exist=doctors.find(n=>n.documento_identidad===documentoIdentidad)
    if(!exist){
        const nuevoMedico = {
            "documento_identidad": documentoIdentidad,
            "nombre": nombre,
            "especialidad": especialidad,
            "registro_medico": registro_medico,
            "usuario": usuario,
            "contraseña": constrasenha
        };

        // Agregar el nuevo médico a los datos existentes
        doctorsData.medicos.push(nuevoMedico);

        // Guardar los datos actualizados en el archivo doctors.json
        fs.writeFileSync(doctorsFilePath, JSON.stringify(doctorsData, null, 2));

        doctors.push({ documento_identidad: documentoIdentidad, nombre: nombre, especialidad: especialidad, registro_medico: registro_medico, usuario: usuario, 'contraseña': constrasenha })
        return true;
    }else{
        return false;
    }
    
}

let deleteDoctor = function (documentoIdentidad) {
    const exist = doctorsData.medicos.find(n => n.documento_identidad === documentoIdentidad);

    if (exist) {
        // Eliminar el médico de los datos existentes en memoria
        doctorsData.medicos = doctorsData.medicos.filter(n => n.documento_identidad !== documentoIdentidad);

        // Guardar los datos actualizados en el archivo doctors.json
        fs.writeFileSync(doctorsFilePath, JSON.stringify(doctorsData, null, 2));

        doctors = doctors.filter(n=>n.documento_identidad!=documentoIdentidad)

        return true;
    } else {
        return false;
    }
}

let updateDoctor = function (documentoIdentidad, nombre, especialidad, registro_medico, usuario, constrasenha){
    const exist=doctors.find(n=>n.documento_identidad===documentoIdentidad)
    if(exist){
        doctors.find(n=>{
            if(n.documento_identidad==documentoIdentidad){
                n.nombre=nombre
                n.especialidad=especialidad
                n.registro_medico=registro_medico
                n.usuario=usuario
                n.contraseña=constrasenha
                return true;
            }else{
                return false;
            }
        })

        doctorsData.medicos.forEach(n => {
            if (n.documento_identidad === documentoIdentidad) {
                n.nombre = nombre;
                n.especialidad = especialidad;
                n.registro_medico = registro_medico;
                n.usuario = usuario;
                n.contraseña = constrasenha;
            }
        });

        // Guardar los datos actualizados en el archivo doctors.json
        fs.writeFileSync(doctorsFilePath, JSON.stringify(doctorsData, null, 2));

        return true;
    }else{
        return false;
    }
}

let findDoctor = function (documentoIdentidad){
    const exist=doctors.find(n=>n.documento_identidad===documentoIdentidad)
    if(exist){     
        return exist;
    }else{
        return false;
    }
}

let getDoctors=function(){
    return doctors;
}
module.exports = {getDoctors,addDoctor,deleteDoctor,updateDoctor,findDoctor}
