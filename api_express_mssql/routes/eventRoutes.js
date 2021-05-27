'use strict';

const express = require('express');
const eventControll = require('../controllers/eventController');
const router = express.Router();

router.get('/fiscalias', eventControll.getAllFiscalias);
router.get('/fiscalias/:id', eventControll.getFiscalia);
router.post('/fiscalias', eventControll.addFiscalia);
router.put('/fiscalias/:id', eventControll.updateFiscalia);
router.delete('/fiscalias/:id', eventControll.deleteFiscalia);


module.exports = {
    routes: router
}