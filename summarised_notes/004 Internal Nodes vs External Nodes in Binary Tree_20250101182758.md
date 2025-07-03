# Summary of Internal and External Nodes in Binary Trees

## Introduction
In this lesson, we will explore the relationship between internal nodes (non-leaf nodes) and external nodes (leaf nodes) in binary trees. We will determine if there is a mathematical relationship between the number of nodes based on their degrees.

## Definitions
- **Leaf Nodes (Degree 0)**: Nodes that do not have any children.
- **Non-Leaf Nodes**: Nodes that have at least one child, classified as:
  - **Degree 1**: Nodes with one child.
  - **Degree 2**: Nodes with two children.

## Analysis of Node Degrees
We analyzed several binary tree examples to count the number of nodes based on their degrees.

### Example 1
- **Degree 2 Nodes**: 2 nodes (both have 2 children)
- **Degree 1 Nodes**: 2 nodes (both have 1 child)
- **Degree 0 Nodes**: 3 nodes (leaf nodes)

### Example 2
- **Degree 2 Nodes**: 3 nodes (all have 2 children)
- **Degree 1 Nodes**: 5 nodes (all have 1 child)
- **Degree 0 Nodes**: 4 nodes (leaf nodes)

### Example 3
- **Degree 2 Nodes**: 1 node 
- **Degree 1 Nodes**: 4 nodes 
- **Degree 0 Nodes**: 2 nodes 

## Observations
Upon analyzing the examples, we noted the following:
- The internal nodes (degree 1 and degree 2) contribute to the structure of the tree, whereas the external nodes (degree 0) are the terminal points.
- There appears to be a relationship specifically between the number of degree 0 nodes (leaf nodes) and degree 2 nodes (nodes with two children).

## Formula Derived
The relationship identified in a binary tree can be expressed as:
- **Number of Degree 0 Nodes = Number of Degree 2 Nodes + 1**

This relationship holds true consistently within binary trees.

## Conclusion
In conclusion, we have established a clear relationship between internal and external nodes in binary trees. Understanding this relationship aids in the analysis and construction of binary tree structures.