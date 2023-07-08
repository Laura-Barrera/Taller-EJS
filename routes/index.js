const express = require('express')

const router = express.Router()

router.get('/',(req,res)=> res.render('index',{'title':'SI Nueva EPS'}))
router.get('/login',(req,res)=> res.render('login',{'title':'Login SI Nueva EPS'}))
router.get('/key',(req,res)=> res.render('recoverKey',{'title':'Recuperar SI Nueva EPS'}))
router.get('/register',(req,res)=> res.render('register',{'title':'Registro SI Nueva EPS'}))

router.get('/admMain',(req,res)=> res.render('./administrator/main.ejs',{'title':'Administrador SI Nueva EPS', 'currentPage': 'admMain'}))
router.get('/managementDoctor',(req,res)=> res.render('./administrator/medicalManagement.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'managementDoctor'}))
router.get('/assigment',(req,res)=> res.render('./administrator/makeAssignment.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'assigment'}))
router.get('/seeAsigment',(req,res)=> res.render('./administrator/seeAssignment.ejs',{'title':'Administrador SI Nueva EPS','currentPage': 'seeAsigment'}))

router.get('/doctorMain',(req,res)=> res.render('./doctor/main.ejs',{'title':'Médico SI Nueva EPS', 'currentPage': 'doctorMain'}))
router.get('/seeAsigment1',(req,res)=> res.render('./doctor/seeAssigment1.ejs',{'title':'Médico SI Nueva EPS','currentPage': 'seeAsigment1'}))

module.exports = router