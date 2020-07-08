const { router, joiValidator } = require("../../common/routerBootstrap");
const accountController = require("./account.controller");

// schemas
const { account } = require("./account.schema");

/**
 * @swagger
 *
 * /account:
 *  get:
 *    summary: Consulta el estado de la cuenta
 *    tags:
 *      - accounts
 *    parameters:
 *      - in: path
 *        name: address
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 1
 *        description: Direccion publica de cuenta
 *    responses:
 *      '200':
 *        description: 200 response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AccountCardStatus'
 * */
router.get(
  "/account/:address",
  joiValidator.params(account),
  accountController.getAccountActive
);

router.get(
  "/balance/:address",
  joiValidator.params(account),
  accountController.getAccountBalance
);

router.get("/quotation", accountController.getQoutation);

module.exports = router;
