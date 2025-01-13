const { spawn } = require('child_process');
const path = require('path');

// Monte Carlo Simulation
async function monteCarloSimulation(inputData) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [
            path.join(__dirname, '../scripts/monte_carlo.py'),
        ]);

        let output = '';
        let error = '';

        pythonProcess.stdin.write(JSON.stringify(inputData));
        pythonProcess.stdin.end();

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const results = JSON.parse(output);
                    resolve(results);
                } catch (err) {
                    reject(new Error(`Error parsing Python output: ${err.message}`));
                }
            } else {
                reject(new Error(`Python script exited with code ${code}: ${error}`));
            }
        });
    });
}

// Markov Chain Simulation
async function markovChainSimulation(inputData) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [
            path.join(__dirname, '../scripts/markov_chain.py'),
        ]);

        let output = '';
        let error = '';

        pythonProcess.stdin.write(JSON.stringify(inputData));
        pythonProcess.stdin.end();

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const results = JSON.parse(output);
                    resolve(results);
                } catch (err) {
                    reject(new Error(`Error parsing Python output: ${err.message}`));
                }
            } else {
                reject(new Error(`Python script exited with code ${code}: ${error}`));
            }
        });
    });
}

// Genetic Algorithm Simulation
async function geneticAlgorithmSimulation(inputData) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [
            path.join(__dirname, '../scripts/genetic_algorithm.py'),
        ]);

        let output = '';
        let error = '';

        pythonProcess.stdin.write(JSON.stringify(inputData));
        pythonProcess.stdin.end();

        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const results = JSON.parse(output);
                    resolve(results);
                } catch (err) {
                    reject(new Error(`Error parsing Python output: ${err.message}`));
                }
            } else {
                reject(new Error(`Python script exited with code ${code}: ${error}`));
            }
        });
    });
}

// Export functions
module.exports = { 
    monteCarloSimulation, 
    markovChainSimulation, 
    geneticAlgorithmSimulation 
};
