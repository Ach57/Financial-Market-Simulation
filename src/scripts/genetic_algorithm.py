import sys
import json
import random

def genetic_algorithm(population_size, generations, fitness_fn, mutation_rate=0.1):
    population = [random.uniform(0, 1) for _ in range(population_size)]  
    best_fitness_per_generation = []
    avg_fitness_per_generation = []
    
    for _ in range(generations):
        population = sorted(population, key=fitness_fn, reverse=True)[:population_size // 2] 
        
        # Record best and average fitness
        best_fitness_per_generation.append(fitness_fn(population[0]))
        avg_fitness_per_generation.append(sum(fitness_fn(ind) for ind in population) / len(population))
        
        offspring = []
        while len(offspring) < population_size:
            parent1, parent2 = random.sample(population, 2)
            child = (parent1 + parent2) / 2  # Crossover
            if random.random() < mutation_rate:
                child += random.uniform(-0.1, 0.1)  # Mutation
            offspring.append(child)
        
        population = offspring

    return best_fitness_per_generation, avg_fitness_per_generation

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        population_size = int(input_data['populationSize'])
        generations = int(input_data['generations'])
        mutation_rate = float(input_data.get('mutationRate', 0.1))
        
        fitness_fn = lambda x: -abs(x - 0.8)
        
        best_fitness, avg_fitness = genetic_algorithm(population_size, generations, fitness_fn, mutation_rate)
        results = {
            "generations": list(range(1, generations + 1)),
            "bestFitness": best_fitness,
            "averageFitness": avg_fitness
        }
        print(json.dumps({"success": True, "results": results}))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
