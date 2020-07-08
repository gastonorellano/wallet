const throwError = require("../../common/utils/throwError");
const axios = require("axios");
const config = require("config");
const logger = require("express-logger");
const SEGUNDOSANUALES = 31536000;

/**
 * Retorna la cotización de Eth con Euro / Dolar
 * @param {*} req
 * @param {*} res
 */
async function getQoutation(req, res) {
  try {
    const Quotation = config.get("services.ether.Quotation");

    res.status(200).json(Quotation);
  } catch (error) {
    logger.error(error.message);
    throwError(error.message, "001", "Under Construction");
  }
}

/**
 * Retorna la cotización de Eth con Euro / Dolar
 * @param {*} req
 * @param {*} res
 */
async function getAccountActive(req, res) {
  try {
    // LLamara a la app
    const url = config.get("services.ether.url") || "https://etherscan.io/api";
    const apikey =
      config.get("services.ether.apikey") ||
      "NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY";

    // ToDo: Contatenar valores por default
    const accountActiveParam = config.get("services.ether.getaccountactive");

    const resp = await axios.get(
      `${url}module=${accountActiveParam.module}&action=${accountActiveParam.action}&address=${req.params.address}&startblock=${accountActiveParam.startblock}&endblock=${accountActiveParam.endblock}&apikey=${apikey}`
    );

    const init = new Date(Date.UTC(70, 0, 1, 0, 0, 0));
    let viejo = true;

    if (resp.status == 200 && resp.data.result.length > 0) {
      // Calculo de fecha
      init.setSeconds(resp.data.result[0].timeStamp);
      if (
        new Date().valueOf() / 1000 - resp.data.result[0].timeStamp <=
        SEGUNDOSANUALES
      ) {
        viejo = false;
      }

      res.status(200).json({ old: viejo, date: init });
    } else {
      res.status(400).json({ old: true, timestamp: null });
    }
  } catch (error) {
    throwError(error, "500", "HIGH");
    res.status(500).json(error.throwError());
  }
}

async function getAccountBalance(req, res) {
  try {
    // LLamara a la app
    const url = config.get("services.ether.url") || "https://etherscan.io/api";
    const apikey =
      config.get("services.ether.apikey") ||
      "NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY";

    const denominador =
      config.get("services.ether.denominador") || 1000000000000000000;

    const accountActiveParam = config.get("services.ether.getaccountbalance");

    const resp = await axios.get(
      `${url}module=${accountActiveParam.module}&action=${accountActiveParam.action}&address=${req.params.address}&tag=${accountActiveParam.tag}&apikey=${apikey}`
    );

    if (resp.status == 200 && resp.data.result > 0) {
      res.status(200).json({
        eth: resp.data.result / denominador,
      });
    } else {
      res.status(400).json({ eth: 0 });
    }
  } catch (error) {
    throwError(error, "500", "HIGH");
    res.status(500).json(error.throwError());
  }
}

module.exports = {
  getAccountActive,
  getQoutation,
  getAccountBalance,
};
