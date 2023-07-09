const doctorsJson = require('./doctors.json')

let doctors = doctorsJson.medicos


let addDoctor = function (documentoIdentidad, nombre, especialidad, registro_medico, usuario, constrasenha) {

    const exist=doctors.find(n=>n.documento_identidad===documentoIdentidad)
    if(!exist){
        doctors.push({ documento_identidad: documentoIdentidad, nombre: nombre, especialidad: especialidad, registro_medico: registro_medico, usuario: usuario, 'contraseña': constrasenha })
        return true;
    }else{
        return false;
    }
    
}

let deleteDoctor = function (documentoIdentidad){
    const exist=doctors.find(n=>n.documento_identidad===documentoIdentidad)
    if(exist){
        doctors = doctors.filter(n=>n.documento_identidad!=documentoIdentidad)
        return true;
    }else{
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
