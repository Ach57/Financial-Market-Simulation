const express = require('express');
const { runSimulation } = require('../controllers/simulationController');

const router = express.Router();

// Simulation endpoint
router.post('/simulate', async (req, res) => {
    try {
        const { initialPrice, volatility, timeHorizon, iterations } = req.body;

        if (
            isNaN(initialPrice) || 
            isNaN(volatility) || 
            isNaN(timeHorizon) || 
            isNaN(iterations)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input. All fields are required and must be numbers.',
            });
        }
        const inputData = {
            initialPrice: parseFloat(initialPrice),
            volatility: parseFloat(volatility),
            timeHorizon: parseInt(timeHorizon, 10),
            iterations: parseInt(iterations, 10),
        };

        
        const results = await monteCarloSimulation(inputData);

        res.json({
            success: true,
            data: results,
        });
    } catch (error) {
        console.error('Error running simulation:', error);
        res.status(500).json({
            success: false,
            message: 'Simulation failed. Please try again later.',
        });
    }
});

module.exports = router;
