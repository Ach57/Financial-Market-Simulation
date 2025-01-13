import sys
import json
import random


def markov_chain_simulation(transitions, initial_state, steps) ->list:
    current_state = initial_state
    results =[current_state]
    for _ in range(steps):
        probabilities = transitions[current_state]
        next_state = random.choices(list(probabilities.keys()), weights=probabilities.values())[0]
        results.append(next_state)
        current_state = next_state
    
    return results

if __name__=="__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        transitions = input_data['transitions'] 
        initial_state = input_data['initialState']
        steps = input_data['steps']
        
        results = markov_chain_simulation(transitions, initial_state, steps)
        print(json.dumps({"success": True, "results": results}))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
    