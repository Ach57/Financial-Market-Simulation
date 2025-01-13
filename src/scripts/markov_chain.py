import sys
import json
import random


def generate_transitions(bullish_to_bullish, bullish_to_bearish, bullish_to_stagnant):
    """
    Generates a transition matrix based on user-defined probabilities.
    """
    return {
        "Bullish": {
            "Bullish": bullish_to_bullish,
            "Bearish": bullish_to_bearish,
            "Stagnant": bullish_to_stagnant,
        },
        "Bearish": {
            "Bullish": 0.3,
            "Bearish": 0.6,
            "Stagnant": 0.1,
        },
        "Stagnant": {
            "Bullish": 0.4,
            "Bearish": 0.3,
            "Stagnant": 0.3,
        },
    }


def markov_chain_simulation(transitions, initial_state, steps, initial_price):
    """
    Simulates a single Markov chain path starting from an initial state and price.
    """
    current_state = initial_state
    current_price = initial_price
    results = [{"state": current_state, "price": current_price}]

    for _ in range(steps):
        # Determine next state
        probabilities = transitions[current_state]
        next_state = random.choices(list(probabilities.keys()), weights=probabilities.values())[0]
        # Adjust price based on state
        if next_state == "Bullish":
            current_price *= 1.05  
        elif next_state == "Bearish":
            current_price *= 0.95  
        # Add stagnation as no change
        results.append({"state": next_state, "price": current_price})
        current_state = next_state

    return results


if __name__ == "__main__":
    try:
    
        input_data = json.loads(sys.stdin.read())
        initial_price = float(input_data["initialPrice"])
        time_horizon = int(input_data["timeHorizon"])
        iterations = int(input_data["iterations"])
        bullish_to_bullish = float(input_data["bullishToBullish"])
        bullish_to_bearish = float(input_data["bullishToBearish"])
        bullish_to_stagnant = float(input_data["bullishToStagnant"])

        # Validate transition probabilities
        if abs(bullish_to_bullish + bullish_to_bearish + bullish_to_stagnant - 1.0) > 1e-6:
            raise ValueError("Bullish transition probabilities must sum to 1.")

        # Generate transitions
        transitions = generate_transitions(bullish_to_bullish, bullish_to_bearish, bullish_to_stagnant)

        # Run simulations
        all_results = []
        for _ in range(iterations):
            results = markov_chain_simulation(transitions, "Bullish", time_horizon, initial_price)
            all_results.append(results)

        # Output results
        print(json.dumps({"success": True, "results": all_results}))

    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
