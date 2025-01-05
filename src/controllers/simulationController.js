const { spawn } = require('child_process');
const path = require('path');

async function runSimulation(inputData) {
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
                    const results = JSON.parse(output); // Parse Python script output
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

module.exports = { runSimulation };
