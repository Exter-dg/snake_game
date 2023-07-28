# snake_game
The vintage snake game using React.


## Demo

- Check the demo at [https://exter-dg.github.io/snake_game/](https://exter-dg.github.io/snake_game/)

  <img width="1440" alt="image" src="https://github.com/Exter-dg/snake_game/assets/46609729/8ede321e-6e3c-4337-81b6-7246bdb72af6">



## Implementation

### UI

- The Game box is structured as a div element with 20 rows.
- Another div represents each row.
- Each row consists of 30 spans, each representing a cell in the grid.
- A cell can be in one of the four states:
  - `Snake Head State`: The cell contains the head of the snake.
  - `Checked State`: The cell contains a part of the snake's body.
  - `Food State`: The cell contains the food.
  - `Empty State`: The cell is currently unoccupied

### Snake's Movement

- The snake is implemented as a queue data structure. The first element represents the snake's tail and the last element represents the snake's head.
- Each time the snake moves to a new cell, the first element in the queue (representing the tail of the snake) is removed, and a new element is added to the queue to represent the new cell where the snake's head moves.
- In the event that the snake consumes a piece of fruit (food), the popping step is skipped, allowing the snake's length to increase by 1 without removing the tail from the queue.
- A combination of the `setInterval` function and an event listener on the `keydown` event is utilized to move the snake in the specified direction at regular intervals. As the length of the snake increases, this interval is dynamically reduced to maintain a responsive and smooth gameplay experience.
 
### Collision

- Collision detection is performed each time the snake's head moves to a new cell.
- If the snake's head reaches the boundary of the grid, the game ends.
- Similarly, if the snake's head occupies a position that is already part of the snake array (positions already occupied by the snake), the game ends.

### Scoring 

- The level in the game is represented by the length of the snake, meaning that as the snake grows longer, the player advances to higher levels.
- Each time the snake's length increases, the player's score is calculated. The score increment is inversely proportional to the time delay of the interval, resulting in higher scores gained at higher levels due to faster gameplay.

### Food Generation

- After the snake consumes a food, a new location for the food is calculated using the `Math.random` function.
- To avoid collisions, we ensure that the newly generated location does not overlap with the cells occupied by the snake in its array.

