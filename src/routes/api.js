const express = require('express');
const { monteCarloSimulation,
    markovChainSimulation,
    geneticAlgorithmSimulation,
 } = require('../controllers/simulationController');

const router = express.Router();

// Simulation endpoint
router.post('/simulate', async (req, res) => {
    try {


        const { simulationType, ...formData} = req.body;

        if (simulationType =="monteCarlo"){
                const { initialPrice, volatility, timeHorizon, iterations } = formData;
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
        } else if("markovChain"){
            const {initialPrice,
                timeHorizon,
                iterations,
                bullishToBullish,
                bullishToBearish,
                bullishToStagnant,
            } = formData;


            if (
                isNaN(initialPrice) || 
                isNaN(timeHorizon) || 
                isNaN(iterations) || 
                isNaN(bullishToBullish) || 
                isNaN(bullishToBearish) || 
                isNaN(bullishToStagnant)
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid input. All fields are required and must be numbers.',
                });
            }

            const inputData = {
                initialPrice: parseFloat(initialPrice),
                timeHorizon: parseInt(timeHorizon, 10),
                iterations: parseInt(iterations, 10),
                bullishToBullish: parseFloat(bullishToBullish),
                bullishToBearish: parseFloat(bullishToBearish),
                bullishToStagnant: parseFloat(bullishToStagnant),
            };

            const results = await markovChainSimulation(inputData);
            console.log(results);
            return res.json({
                success: true,
                data: results,
            });

            
        } else{
            const { populationSize, mutationRate, crossoverRate, generations } = formData;

            if (
                isNaN(populationSize) || 
                isNaN(mutationRate) || 
                isNaN(crossoverRate) || 
                isNaN(generations)
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid input. All fields are required and must be numbers.',
                });
            }


            const inputData = {
                populationSize: parseInt(populationSize, 10),
                mutationRate: parseFloat(mutationRate),
                crossoverRate: parseFloat(crossoverRate),
                generations: parseInt(generations, 10),
            };

            const results = await geneticAlgorithmSimulation(inputData);

            return res.json({
                success: true,
                data: results,
            });
   
        }
        
    } catch (error) {
        console.error('Error running simulation:', error);
        res.status(500).json({
            success: false,
            message: 'Simulation failed. Please try again later.',
        });
    }
});

module.exports = router;
