# Summary of Recursive Functions

## Definition and Structure:
- A **recursive function** is one that calls itself. 
- Example structure of a recursive function:
  1. **Pre-call Statement**: Executes before the function calls itself.
  2. **Recursive Call**: The function invokes itself.
  3. **Post-call Statement**: Executes after the function returns.

## Execution Phases:
- **Calling Time**:
  - The pre-call statement executes at this stage.
  
- **Returning Time**:
  - The post-call statement executes after the function completes and returns.
  - Any additional computations or statements following the function call will also execute at this time.

### Phase Breakdown:
- The **Ascending Phase**: This refers to the time just before the function calls itself, where pre-call statements or computations happen.
- The **Descending Phase**: This occurs after the recursive call has completed, where post-call statements or remaining computations are processed.

## Comparison with Loops:
- **Loops**: Primarily consist of repeated statements with only one phase (the looping phase).
- **Recursion**: Involves repetition through function calls but includes both ascending and descending phases.
- The inclusion of the descending phase is a unique strength of recursion, allowing for more nuanced and powerful coding solutions.

## Next Steps:
- In the upcoming video, we will explore how the stack is utilized in recursive functions and delve into the concept of time complexity. 

---

This summary encapsulates the key concepts of recursion, its phases, and its advantages compared to traditional loops, setting a foundation for more advanced topics.