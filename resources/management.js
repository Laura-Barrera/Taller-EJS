let {getDoctors,addDoctor,deleteDoctor,updateDoctor,findDoctor} = require("./doctors.js")
const {getOffices,findOffice} = require("./offices.js")
let currenUser=""

const assignOffice=function(numero_consultorio,documento_doctor,fecha,hora){
    let office=findOffice(numero_consultorio)
    if(office){
        if(findDoctor(documento_doctor)){
            const yaOcupado = office.asignacion.find(n=>n.fecha==fecha && n.horario==hora)
            if(!yaOcupado){
                findOffice(numero_consultorio).asignacion.push({"documento_medico":documento_doctor,"fecha":fecha,"horario":hora})
                return true;
            }else{
                return false
            }
        }else{
            return "Doctor no existe"
        }
    }else{
        return "Consultorio no existe"
    }
}


const loginDoctor = function(user, password){
    const exist = getDoctors().find(n=>n.usuario==user&&n.contraseña==password);
    if (exist){
        currenUser=exist.documento_identidad;
        return true;
    }else {
        return false;
    }
}
const getCurrentUser=function(){
    return currenUser
}

module.exports = {assignOffice, loginDoctor,getCurrentUser}