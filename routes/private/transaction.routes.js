var express = require('express');
var router = express.Router();
const Transaction = require('../../models/transaction.model');

// ROUTE prefix: '/transaction'
router.get('/', async (req, res) => {
    /* 
     * #swagger.path = '/transaction'
     * #swagger.security = [{ bearerAuth: [] }]
     */
    res.json({ transactions: await Transaction.find({}) });
});

router.post('/', async (req, res) => {
    /* 
     * #swagger.path = '/transaction'
     * #swagger.security = [{ bearerAuth: [] }]
     */
    /*	
     * #swagger.parameters['obj'] = {
         in: 'body',
         description: 'transaction information.',
         required: true,
         schema: { $ref: "#/definitions/Transaction" }
       } 
     */
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();
    if (!savedTransaction) res.json({ message: 'Ocorreu algum erro ao cadastrar o transação!' });
    res.json({ message: 'Transação salva com sucesso!' });
});

router.get('/:id', async (req, res) => {
    /* 
     * #swagger.path = '/transaction/{id}'
     * #swagger.security = [{ bearerAuth: [] }]
     */
    /* #swagger.responses[200] = { schema: { "$ref": "#/definitions/Transaction" } } 
     */
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    res.json(transaction);
});

router.put('/:id', async (req, res) => {
    /* 
     * #swagger.path = '/transaction/{id}'
     * #swagger.security = [{ bearerAuth: [] }]
     */
    /*	
     * #swagger.parameters['obj'] = {
         in: 'body',
         description: 'transaction information.',
         required: true,
         schema: { $ref: "#/definitions/Transaction" }
       } 
     */
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.json(transaction);
});

router.delete('/:id', async (req, res) => {
    /* 
     * #swagger.path = '/transaction/{id}'
     * #swagger.security = [{ bearerAuth: [] }]
     */
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    res.json({ message: `Transação "${deletedTransaction.name}" deletada com sucesso!` });
});

module.exports = router;