const fs = require('fs');
const path = require('path');
const officesFilePath = path.join(__dirname, 'offices.json');

let officesData = { consultorios: [] };
if (fs.existsSync(officesFilePath)) {
    const officesFile = fs.readFileSync(officesFilePath);
    officesData = JSON.parse(officesFile);
}

let {getDoctors,addDoctor,deleteDoctor,updateDoctor,findDoctor} = require("./doctors.js")
const {getOffices,findOffice} = require("./offices.js")
let currenUser=""

const assignOffice=function(numero_consultorio,documento_doctor,fecha,hora){
    let office=findOffice(numero_consultorio)
    let officeIndex = officesData.consultorios.findIndex(consultorio => consultorio.numero_consultorio === numero_consultorio);
    if(office){
        let datos = officesData.consultorios[officeIndex];
        if(findDoctor(documento_doctor)){
            const yaOcupado = office.asignacion.find(n=>n.fecha==fecha && n.horario==hora)
            const medicoAsignado = officesData.consultorios.some(consultorio => {
                return consultorio.asignacion.some(asignacion => asignacion.documento_medico === documento_doctor && asignacion.fecha === fecha && asignacion.horario === hora);
            });

            if (!yaOcupado && !medicoAsignado) {
                findOffice(numero_consultorio).asignacion.push({ "documento_medico": documento_doctor, "fecha": fecha, "horario": hora });
                datos.asignacion.push({ "documento_medico": documento_doctor, "fecha": fecha, "horario": hora });

                // Guardar los datos actualizados en el archivo offices.json
                fs.writeFileSync(officesFilePath, JSON.stringify(officesData, null, 2));

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