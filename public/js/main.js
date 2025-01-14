document.getElementById('simulation-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const simulationType = document.getElementById('simulationSelect').value;
    var formData;
    if (simulationType ==="monteCarlo"){
            // Get form data
        formData = {
            simulationType: simulationType,
            initialPrice: document.getElementById('initialPrice').value,
            volatility: document.getElementById('volatility').value,
            timeHorizon: document.getElementById('timeHorizon').value,
            iterations: document.getElementById('iterations').value,
        };

    }else if (simulationType==="markovChain"){
        formData = {
            simulationType: simulationType,
            initialPrice: document.getElementById('initialPrice').value,
            timeHorizon: document.getElementById("timeHorizon").value,
            iterations: document.getElementById("iterations").value,
            bullishToBullish: document.getElementById("bullishToBullish").value,
            bullishToBearish: document.getElementById("bullishToBearish").value,
            bullishToStagnant: document.getElementById("bullishToStagnant").value,
        }

    }else{
        formData = {
            simulationType: simulationType,
            populationSize: document.getElementById("populationSize").value,
            mutationRate: document.getElementById("mutationRate").value,
            crossoverRate: document.getElementById("crossoverRate").value,
            generations: document.getElementById("generations").value

        }
    }

    try {
        // Send a POST request to the backend
        const response = await fetch('/api/simulate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
            // Display results in the chart
            const results = result.data;
            displaySimulationChart(simulationType,results);
        } else {
            console.error('Simulation failed:', result.message);
            alert('Simulation failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error); 
        alert('An error occurred. Please try again.');
    }
});

function displaySimulationChart(simulationType,data) {
    const ctx = document.getElementById('simulationChart').getContext('2d');

    if (window.simulationChart && typeof window.simulationChart.destroy === 'function') {
        window.simulationChart.destroy();
    }

    const results = data.results;

    let chartConfig = {
        type: 'line',
        data: {},
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
            },
            scales: {
                x: { title: { display: true, text: '' } },
                y: { title: { display: true, text: '' } },
            },
        },
    };


    if (simulationType === "monteCarlo"){
        console.log(results)
        chartConfig.data = {
            labels: results.map((_, i) => i + 1), // Days
            datasets: [
                {
                    label: 'Stock Price Over Time',
                    data: results, // Stock prices
                    borderColor: 'rgb(28, 197, 39)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        };
        chartConfig.options.scales.x.title.text = 'Day';
        chartConfig.options.scales.y.title.text = 'Price';

    }else if(simulationType ==="markovChain"){

        chartConfig.data = {
            labels: Array.from({ length: results[0].length }, (_, i) => i + 1), // Time intervals (assumes uniform length across simulations)
            datasets: ['Bullish', 'Bearish', 'Stagnant'].map((stateName) => ({
                label: stateName, // Label for the state
                data: results
                    .flatMap((simulation) =>
                        simulation.filter((entry) => entry.state === stateName).map((entry) => entry.price)
                    ), // Extract prices for the current state across simulations
                borderColor:
                    stateName === 'Bullish'
                        ? 'rgb(28, 197, 39)'
                        : stateName === 'Bearish'
                        ? 'rgb(255, 99, 132)'
                        : 'rgb(54, 162, 235)',
                borderWidth: 2,
                fill: false,
            })),
        };
        chartConfig.options.scales.x.title.text = 'Time Interval';
        chartConfig.options.scales.y.title.text = 'Price';
    }else{
        
        chartConfig.data = {
            labels: results.generations, // Generations
            datasets: [
                {
                    label: 'Best Fitness Over Generations',
                    data: results.bestFitness, // Best fitness values
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: 'Average Fitness Over Generations',
                    data: results.averageFitness, // Average fitness values
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        };
        chartConfig.options.scales.x.title.text = 'Generation';
        chartConfig.options.scales.y.title.text = 'Fitness';
        

    };
    window.simulationChart = new Chart(ctx, chartConfig);
    
};


function changeSimulationType(){
    var selectedSimulation = document.getElementById("simulationSelect").value;
    document.getElementById("monteCarloForm").style.display = "none"  ;
    document.getElementById("markovChainForm").style.display = "none";
    document.getElementById("geneticAlgorithmForm").style.display = "none";

    // Show the selected simulation form
    if (selectedSimulation === "monteCarlo") {
        document.getElementById("monteCarloForm").style.display = "block";
    } else if (selectedSimulation === "markovChain") {
        document.getElementById("markovChainForm").style.display = "block";
    } else if (selectedSimulation === "geneticAlgorithm") {
        document.getElementById("geneticAlgorithmForm").style.display = "block";
    }
};




