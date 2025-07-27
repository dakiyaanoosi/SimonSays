# SimonSays

An interactive memory-based game inspired by the classic **Simon Says**, built using **HTML**, **CSS** and **JavaScript**.

## ⚙️ How to [Play](https://dakiyaanoosi.github.io/SimonSays/)

1. Press the **Start** button to begin the game.
2. The game shows a sequence of colors — watch the pads **light up** with sound!
3. **Repeat the sequence** — at each new level, click the same colors in the same order, starting from the beginning of the pattern.
4. Each correct sequence advances the level and adds a new color.
5. A wrong move ends the game.

## Features :

### Score

- The score is directly tied to the game level.
- Each time the player successfully matches the entire sequence, the level increases by 1.

### High Score

- The high score represents the best score achieved across all game sessions.
- Even after refreshing the page or reopening the browser, the high score remains saved.

### Game State

- Start the Game! → Shown when the game is ready to begin.

- Starting... / Restarting... → Shown briefly when the game begins or restarts.

- Level X → Shows your current level.

- Game Over → Appears when you make a mistake.

### Keyboard Controls

This Simon Says game can also be played using the keyboard for a smoother and faster experience.

| Key     | Action                       |
| ------- | ---------------------------- |
| `Enter` | **Start / Restart** the game |
| `R`     | Select **Red** pad           |
| `Y`     | Select **Yellow** pad        |
| `B`     | Select **Blue** pad          |
| `G`     | Select **Green** pad         |

### Play Sequence

- When enabled, the game **replays the entire color sequence** after every correct level.
- This helps players recall the full pattern — just like the original **classic Simon Says** game!
- The **Play Sequence** checkbox state is saved using `localStorage`, so the browser remembers your choice even after refreshing or reopening the game.
