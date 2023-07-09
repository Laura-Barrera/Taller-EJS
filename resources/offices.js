const officesJson=require("./offices.json")

let offices = officesJson.consultorios;


let findOffice = function(numero_consultorio){
    const find = offices.find(n=>n.numero_consultorio==numero_consultorio)
    if (find){
        return find;
    }else{
        return false;
    }
}

let getOffices=function(){
    return offices;
}
module.exports = {getOffices, findOffice}
