//const month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
// let newDate = new Date();
//  let dataFormatada = ((newDate.getDate() + "/" + month[(newDate.getMonth())] + "/" + newDate.getFullYear()));
//  const saveDate = dataFormatada.save();

const mongoose = require("mongoose");
const dataSchema = require("../models/dataSchema")
const DiceSchema = require("../models/dataSchema.js")

const all = async (req, res) => {
  const { mes } = req.params;
  try {
    const allMonths = await DiceSchema.find({mes});
    let mesesregistrados = 0;

    buscarMes.forEach((a) => {
      mesesregistrados = mesesregistrados
    })
    res.status(200).json({
      message: 'Informações carregadas com sucesso!',
      allMonths
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

const searchData = async (req, res) => {
  try {
    const data = await DiceSchema.find()
    res.status(200).json({
      message: 'Informações carregadas com sucesso!',

    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}
const create = async (req, res) => {
  const { mes, data, produto, entradas, saidas } = req.body;

  try {
    const newData = new dataSchema(req.body)
    const savedData = await newData.save();

    const fluxoDeCaixa = {
      userId: savedData.userId,
      mes: savedData.mes,
      data: savedData.data,
      produto: savedData.produto,
      entradas: savedData.entradas,
      saidas: savedData.saidas,
    }
    return res.status(201).json({
      message: `Criado com sucesso`,
      fluxoDeCaixa
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

const update = async (req, res) => {
  const { mes, data, produto, entradas, saidas } = req.body;
  const { userId } = req.params
  try {
    const savedData = await DiceSchema.find({userId}).updateOne({
      mes, data, produto, entradas, saidas
    })

    const dateAtualizada = await DiceSchema.find({
      userId 
    })
    
    const fluxoDeCaixa = {
      userId: dateAtualizada[0].userId,
      mes: dateAtualizada[0].mes,
      data: dateAtualizada[0].data,
      produto: dateAtualizada[0].produto,
      entradas: dateAtualizada[0].entradas,
      saidas: dateAtualizada[0].saidas,
    }

    if (fluxoDeCaixa.length == 0) 
      return res.status(404).json({
      message: `Registro ${userId} não encontrado`
    })

    return res.status(200).json({
      message: `Registro atualizado com sucesso`,
      fluxoDeCaixa

    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const remove = async (req, res) => {
  const { userId } = req.params

  try {
    const findData = await DiceSchema.deleteOne({userId})

    if (!findData) return res.status(404).json({
      message: `Registro ${userId} não encontrado`
    })

    return res.status(200).json({
      message: `Registro deletado com sucesso`
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const calcularValores = async (request, response) => {
  const { mes } = request.params;
  try {
    const buscarMes = await DiceSchema.find({ mes });

    let valorEntradas = 0;
    let valorSaidas = 0
    let valorFinal = 0

    buscarMes.forEach((a) => {
      valorEntradas  += a.entradas;
      valorSaidas += a.saidas;
      valorFinal += a.entradas - a.saidas

    });

    response.status(200).json({ Mês: `${mes}: ` + `Entradas: ` + valorEntradas.toFixed(2) + `  Saídas: ` + valorSaidas.toFixed(2) + `  Valor final: ` + valorFinal.toFixed(2)});
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { all, searchData, create, update, remove, calcularValores}