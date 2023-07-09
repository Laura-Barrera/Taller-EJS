const express = require('express')
const {assignOffice, loginDoctor, getCurrentUser}=require('./../resources/management')
const {getDoctors,addDoctor, deleteDoctor, updateDoctor, findDoctor} = require('./../resources/doctors')
const { getOffices } = require('../resources/offices')


const router = express.Router()


router.get('/',(req,res)=> res.render('index',{'title':'SI Nueva EPS'}))
router.get('/login',(req,res)=> res.render('login',{'title':'Login SI Nueva EPS'}))
router.post('/login',(req,res)=>{
    const {user,password} = req.body
    if(user=="admin"&&password=="admin"){
        res.redirect('/admMain')
    }else{
        if(loginDoctor(user,password)){

            res.redirect('/doctorMain')
        }
    }
})
router.get('/key',(req,res)=> res.render('recoverKey',{'title':'Recuperar SI Nueva EPS'}))
router.get('/register',(req,res)=> res.render('register',{'title':'Registro SI Nueva EPS'}))


router.get('/admMain',(req,res)=> res.render('./administrator/main.ejs',{'title':'Administrador SI Nueva EPS', 'currentPage': 'admMain'}))
router.get('/managementDoctor',(req,res)=> {
    const filtro = req.query.filtro;

    let data = getDoctors();
    if(filtro || filtro===""){
        data = getDoctors().filter(dato => {
       
            const valorFiltro = filtro?.toLocaleLowerCase();
            return dato.nombre.toLowerCase().includes(valorFiltro)||dato.especialidad.toLowerCase().includes(valorFiltro)
            ||dato.documento_identidad.toLowerCase().includes(valorFiltro)||dato.registro_medico.toLowerCase().includes(valorFiltro);
          });
          res.render('./administrator/tablaDoctors',{'title':'Administrador SI Nueva EPS','currentPage': 'managementDoctor','data':data,'msg':''})
    }else{
        res.render('./administrator/medicalManagement.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'managementDoctor','data':data,'msg':''})
    }
    
})
router.post('/createDoctor',(req,res)=>{
    const {documentoIdentidad,nombre, registroMedico,especialidad,usuario,contrasena}=req.body
    const answer=addDoctor(documentoIdentidad,nombre,especialidad,registroMedico,usuario,contrasena)
    if(answer){
        res.render('./administrator/medicalManagement.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'managementDoctor','data':getDoctors(),'msg':'Creado exitosamente'})
    }else{
        res.render('./administrator/medicalManagement.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'managementDoctor','data':getDoctors(),'msg':'Un medico con la misma identificación ya existe'})
    }
})
router.post('/deleteDoctor',(req,res)=>{
    const {documentoIdentidad}=req.body
    const answer=deleteDoctor(documentoIdentidad)
    if(answer){
        res.render('./administrator/medicalManagement.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'managementDoctor','data':getDoctors(),'msg':'Eliminado exitosamente'})
    }else{
        res.render('./administrator/medicalManagement.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'managementDoctor','data':getDoctors(),'msg':'Médico no encontrado'})
    }
})
router.post('/updateDoctor',(req,res)=>{
    const {documentoIdentidad,nombre, registroMedico,especialidad,usuario,contrasena}=req.body
    const answer=updateDoctor(documentoIdentidad,nombre,especialidad,registroMedico,usuario,contrasena)
    if(answer){
        res.render('./administrator/medicalManagement.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'managementDoctor','data':getDoctors(),'msg':'Actualizado exitosamente'})
    }else{
        res.render('./administrator/medicalManagement.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'managementDoctor','data':getDoctors(),'msg':'Error al actualizar el médico, no encontrado'})
    }
})


router.get('/assigment',(req,res)=> {
    const filtro = req.query.filtro;

    let dataOffices = getOffices();
    if(filtro || filtro===""){
        dataOffices = getOffices().filter(dato => {
       
            const valorFiltro = filtro?.toLocaleLowerCase();

            return dato.piso.toString().toLowerCase().includes(valorFiltro)||dato.numero_consultorio.toLowerCase().includes(valorFiltro)
            ||dato.asignacion.find(n=>{return findDoctor(n.documento_medico).nombre.toLowerCase().includes(filtro)?true:false})||dato.asignacion.find(n=>{return findDoctor(n.documento_medico).especialidad.toLowerCase().includes(filtro)?true:false})
            ||dato.asignacion.find(n=>{return n.documento_medico.includes(filtro)?true:false})||dato.asignacion.find(n=>{return n.fecha.includes(filtro)?true:false})||dato.asignacion.find(n=>{return n.horario.includes(filtro)?true:false})
          });
          res.render('./administrator/tablaOffices',{'title':'Administrador SI Nueva EPS','currentPage': 'assigment','data':dataOffices,'dataMedico':getDoctors(),'msg':''})
    }else{
        res.render('./administrator/makeAssignment.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'assigment','data':dataOffices,'dataMedico':getDoctors(),'msg':''})
    }

})
router.get('/seeAsigment',(req,res)=> {
    const filtro = req.query.filtro;

    let dataOffices = getOffices();
    if(filtro || filtro===""){
        dataOffices = getOffices().filter(dato => {
       
            const valorFiltro = filtro?.toLocaleLowerCase();

            return dato.piso.toString().toLowerCase().includes(valorFiltro)||dato.numero_consultorio.toLowerCase().includes(valorFiltro)
            ||dato.asignacion.find(n=>{return findDoctor(n.documento_medico).nombre.toLowerCase().includes(filtro)?true:false})||dato.asignacion.find(n=>{return findDoctor(n.documento_medico).especialidad.toLowerCase().includes(filtro)?true:false})
            ||dato.asignacion.find(n=>{return n.documento_medico.includes(filtro)?true:false})||dato.asignacion.find(n=>{return n.fecha.includes(filtro)?true:false})||dato.asignacion.find(n=>{return n.horario.includes(filtro)?true:false})
          });
          res.render('./administrator/tablaOffices',{'title':'Administrador SI Nueva EPS','currentPage': 'seeAsigment','data':dataOffices,'dataMedico':getDoctors(),'msg':''})
    }else{
        res.render('./administrator/seeAssignment.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'seeAsigment','data':dataOffices,'dataMedico':getDoctors(),'msg':''})
    }
})
router.post('/assignOffice',(req,res)=>{
    const {documentoMedico,numeroConsultorio,fecha,turno}=req.body
    let fechaFormat =fecha.toString().split('-');

    const response = assignOffice(numeroConsultorio,documentoMedico,fechaFormat[2]+"-"+fechaFormat[1]+"-"+fechaFormat[0],turno)
    if (response==true){
        res.render('./administrator/makeAssignment.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'assigment','data':getOffices(),'dataMedico':getDoctors(),'msg':'Asignado satisfactoriamente'})
    }else if(response==false){
        res.render('./administrator/makeAssignment.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'assigment','data':getOffices(),'dataMedico':getDoctors(),'msg':'Error al asignar, consultorio ocupado'})
    }else{
        res.render('./administrator/makeAssignment.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'assigment','data':getOffices(),'dataMedico':getDoctors(),'msg':response})
    }
})

router.get('/doctorMain',(req,res)=> res.render('./doctor/main.ejs',{'title':'Médico SI Nueva EPS', 'currentPage': 'doctorMain'}))
router.get('/seeAsigment1',(req,res)=> {
    const filtro = req.query.filtro;
    console.log(getCurrentUser())
    let dataOffices = getOffices();
    if(filtro || filtro===""){
        dataOffices = getOffices().filter(dato => {
       
            const valorFiltro = filtro?.toLocaleLowerCase();

            return dato.piso.toString().toLowerCase().includes(valorFiltro)||dato.numero_consultorio.toLowerCase().includes(valorFiltro)
           ||dato.asignacion.find(n=>{return n.fecha.includes(filtro)?true:false})||dato.asignacion.find(n=>{return n.horario.includes(filtro)?true:false})
          });
          res.render('./doctor/tableDoctor.ejs',{'title':'Médico SI Nueva EPS','currentPage': 'seeAsigment1','data':getOffices(), 'doc':getCurrentUser()})
    }else{
        res.render('./doctor/seeAssigment1.ejs',{'title':'Médico SI Nueva EPS','currentPage': 'seeAsigment1', 'data':getOffices(),'doc':getCurrentUser()})
    }

})

module.exports = router