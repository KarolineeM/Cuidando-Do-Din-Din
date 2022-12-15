//const month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
// let newDate = new Date();
//  let dataFormatada = ((newDate.getDate() + "/" + month[(newDate.getMonth())] + "/" + newDate.getFullYear()));
//  const saveDate = dataFormatada.save();

const mongoose = require("mongoose");
const dataSchema = require("../models/dataSchema")
const DiceSchema = require("../models/dataSchema.js")

const all = async (req, res) => {
  try {
    const allMonths = await DiceSchema.find()
    res.status(200).json({
      statusCode: 200,
      message: 'Informações carregadas com sucesso!'
    })

  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message
    })
  }
}

const searchData = async (req, res) => {
  try {
    const data = await DiceSchema.find()
    res.status(200).json({
      statusCode: 200,
      message: 'Informações carregadas com sucesso!',

    })
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message
    })
  }
}
const create = async (req, res) => {
  const { mes, data, produto, entrada, saida } = req.body;

  try {
    const newData = new dataSchema({
      mes: req.body.mês,
      data: req.body.data,
      produto: req.body.produto,
      entrad: req.body.entrada,
      saida: req.body.saida,
    
    })

    const savedData = await newData.save();
    return res.status(201).json({
      statusCode: 201,
      message: `Criado com sucesso`,
    
    })
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message
    })
  }
}

const update = async (req, res) => {
  const { mes, data, produto, entrada, saida } = req.body;
  const id = req.params.id
  try {
    const findData = await DiceSchema.findById(id)

    if (!findData) return res.status(404).json({
      statusCode: 404,
      message: `Registro ${id} não encontrado`
    })

    findData.mes = mes || findData.mes
    findData.data = data || findData.data
    findData.produto = produto || findData.produto
    findData.entrada = entrada || findData.entrada
    findData.saida = saida || findData.saida

    const updatedData = await findData.save()

    return res.status(200).json({
      statusCode: 200,
      message: `Registro atualizado com sucesso`,

    })

  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message
    })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    const findData = await findData.findById(id)

    if (!findData) return res.status(404).json({
      statusCode: 404,
      message: `Registro ${id} não encontrado`
    })

    await findData.delete()

    return res.status(200).json({
      statusCode: 200,
      message: `Registro deletado com sucesso`
    })

  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message
    })
  }
}

module.exports = { all, searchData, create, update, remove }