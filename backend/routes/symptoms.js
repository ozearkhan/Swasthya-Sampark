const express = require('express');
const { body, param } = require('express-validator');
const { validateInput } = require('../middleware/inputValidation');
const symptomService = require('../services/symptomService');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/initial',
    [body('symptom').isString().notEmpty()],
    validateInput,
    asyncHandler(symptomService.addInitialSymptom)
);

router.post('/expand',
    [body('symptom').isString().notEmpty()],
    validateInput,
    asyncHandler(symptomService.expandSymptom)
);

router.post('/select',
    [body('selectedSymptoms').isArray().notEmpty()],
    validateInput,
    asyncHandler(symptomService.selectSymptoms)
);

router.post('/further',
    [body('selectedSymptoms').isArray()],
    validateInput,
    asyncHandler(symptomService.checkFurtherSymptoms)
);

router.get('/client/:clientId',
    [param('clientId').isString().notEmpty()],
    validateInput,
    asyncHandler(async (req, res) => {
        const { clientId } = req.params;
        const symptoms = await symptomService.getSymptomsByClientId(clientId);
        res.json(symptoms);
    })
);


module.exports = router;