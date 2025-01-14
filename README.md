# Simulation Project

This project provides a web-based interface for running and visualizing simulations using three powerful computational techniques: **Monte Carlo**, **Markov Chain**, and **Genetic Algorithm**. Users can explore these algorithms by adjusting parameters and analyzing the results interactively.

---

## Features

- **Interactive Web Interface**: Customize simulation parameters via a user-friendly web interface.
- **Real-Time Visualizations**: View results through interactive charts and progress bars.
- **Three Simulation Methods**:
  - Monte Carlo Simulation
  - Markov Chain Simulation
  - Genetic Algorithm Simulation
- **Extensible Codebase**: Easily add more simulations or enhance existing ones.

---

## Simulation Descriptions

### 1. Monte Carlo Simulation
Monte Carlo simulations use random sampling to solve problems that might be deterministic in principle. This technique is especially useful for estimating numerical results in high-dimensional spaces.

**Formula**:
To estimate the value of an integral:
\[
I = \int_a^b f(x) dx \approx \frac{b-a}{N} \sum_{i=1}^N f(x_i)
\]
Where:
- \(x_i\) are random samples from the uniform distribution over \([a, b]\).
- \(N\) is the total number of samples.

Applications:
- Risk analysis
- Option pricing in financial models
- Statistical physics problems

---

### 2. Markov Chain Simulation
Markov Chains model systems that transition between states with probabilities dependent only on the current state. The system evolves based on a transition matrix.

**Formula**:
A Markov Chain's state probability vector after \(n\) steps is:
\[
\mathbf{P}^{(n)} = \mathbf{P}^{(0)} \mathbf{T}^n
\]
Where:
- \(\mathbf{P}^{(0)}\) is the initial state vector.
- \(\mathbf{T}\) is the transition matrix, where \(T_{ij}\) represents the probability of transitioning from state \(i\) to state \(j\).

Applications:
- Predictive modeling (e.g., weather forecasting)
- PageRank algorithm
- Game theory

---

### 3. Genetic Algorithm
Genetic Algorithms (GAs) are optimization techniques inspired by natural selection. GAs iteratively evolve a population of candidate solutions to find the best solution for a given problem.

**Steps**:
1. Initialize a population of candidate solutions.
2. Evaluate fitness using a problem-specific objective function \(f(x)\).
3. Perform genetic operations:
   - **Selection**: Choose parents based on fitness.
   - **Crossover**: Combine parents to produce offspring.
   - **Mutation**: Randomly alter offspring for diversity.
4. Repeat until convergence.

**Fitness Maximization**:
\[
\text{Maximize: } f(x), \text{ where } x \in \text{Solution Space}
\]

Applications:
- Traveling Salesman Problem (TSP)
- Machine learning hyperparameter tuning
- Engineering design optimization

---

## Folder Structure

