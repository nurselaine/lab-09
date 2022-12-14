'use strict';

const express = require('express');
const bearerAuth = require('../auth/middleware/bearer-auth');
const permission = require('../auth/middleware/access-control');
const router = express.Router();

const dataModules = require('../models/index');

router.param('model', (req, res, next) => {
  console.log('auth route function', req.params.model);
  const modelName = req.params.model;
  // console.log(modelName);
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    // console.log('valid model');
    next();
  } else {
    // next('Invalid Model');
    res.status(404).send('Invalid Model');
  }
});

router.get('/:model', bearerAuth, handleGetAll);
router.get('/:model/:id', bearerAuth, handleGetOne);
router.post('/:model', bearerAuth, permission('create'), handleCreate);
router.put('/:model/:id', bearerAuth, permission('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, permission('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  console.log('hello handle create function')
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;