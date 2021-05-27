'use strict';

const eventData = require('../data/queries');

const getAllFiscalias = async (req, res, next) => {
    try {

        const eventlist = await eventData.getFiscalias();
        res.send(eventlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getFiscalia = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await eventData.getById(eventId);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addFiscalia = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await eventData.createFiscalia(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateFiscalia = async (req, res, next) => {
    try {
        const Id =  req.params.id;
        const data = req.body;
        const updated = await eventData.updateFiscalia(Id, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteFiscalia = async (req, res, next) => {
    try {
        const Id = req.params.id;
        const deletedEvent = await eventData.deleteFiscalia(Id);
        res.send(deletedEvent);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllFiscalias,
    getFiscalia,
    addFiscalia,
    updateFiscalia,
    deleteFiscalia
}