document.getElementById('simulation-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form data
    const formData = {
        initialPrice: document.getElementById('initialPrice').value,
        volatility: document.getElementById('volatility').value,
        timeHorizon: document.getElementById('timeHorizon').value,
        iterations: document.getElementById('iterations').value,
    };

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
            displaySimulationChart(results);
        } else {
            console.error('Simulation failed:', result.message);
            alert('Simulation failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error); 
        alert('An error occurred. Please try again.');
    }
});

function displaySimulationChart(data) {
    const results = data.results; 
    const ctx = document.getElementById('simulationChart').getContext('2d');
    
    if (window.simulationChart && typeof window.simulationChart.destroy === 'function') {
        window.simulationChart.destroy();
    }

    // Create a new chart
    window.simulationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: results.map((_, i) => i + 1),   
            datasets: [
                {
                    label: 'Stock Price Over Time',
                    data: results, 
                    borderColor: 'rgb(28, 197, 39)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,   
            plugins: {
                legend: {
                    display: true,
                },
            },
            scales: {
                x: { title: { display: true, text: 'Day' } },
                y: { title: { display: true, text: 'Price' } },
            },
            
        },
    });
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




