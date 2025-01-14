import sys
import json
import random

def monte_carlo_simulation(initial_investment, days, daily_volatility, simulations=1000) -> list:
    results = []
    
    for _ in range(simulations):
        value = initial_investment
        for _ in range(days):
            daily_return = 1 + random.uniform(-daily_volatility, daily_volatility)
            value *= daily_return
        results.append(value)
    
    return results

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        initial_investment = input_data['initialPrice']
        days = input_data['timeHorizon']  # Number of days (time horizon)
        daily_volatility = input_data['volatility'] / 100  # Convert volatility to a percentage
        simulations = input_data.get('iterations', 1000)  # Default to 1000 simulations
        
        # Run Monte Carlo simulation
        results = monte_carlo_simulation(initial_investment, days, daily_volatility, simulations)
        print(json.dumps({"success": True, "results": results}))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
