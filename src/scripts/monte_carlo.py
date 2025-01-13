import sys
import json
import random




def monte_carlo_simulation(initial_investment, years, risk, simulations=1000) -> list:
    results = []
    
    for _ in range(simulations):
        value = initial_investment
        for _ in range(years):
            annual_return = 1 + (random.uniform(-risk, risk))
            value *= annual_return
        results.append(value)
    
    return results

if __name__=="__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        initial_investment = input_data['initialPrice']
        years = input_data['timeHorizon']  
        risk = input_data['volatility'] / 100 
        simulations = input_data.get('iterations', 1000) 
        results = monte_carlo_simulation(initial_investment, years, risk, simulations)
        print(json.dumps({"success": True, "results": results}))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))


    
    