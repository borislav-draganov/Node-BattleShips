# Node BattleShips #

[![Build Status](https://travis-ci.org/borislav-draganov/Node-BattleShips.svg?branch=master)](https://travis-ci.org/borislav-draganov/Node-BattleShips)

## The Task ##
Implement a very simple game of battleships ( http://en.wikipedia.org/wiki/Battleship_(game) ). If you’ve never played the game, you can get a feel for it from this online flash game ( http://www.learn4good.com/games/board/battleship.htm ). You should create a simple console (browser or terminal) application to allow a single human player to play a one-sided game of battleships against the computer. The program should create a 10x10 grid, and place a number of ships on the grid at random with the following sizes:
* 1x Battleship (5 squares)
* 2x Destroyers (4 squares)

The console application should accept input from the user in the format “A5” to signify a square to target, and feedback to the user whether the shot was success, and additionally report on the sinking of any vessels. Do not spend any time formatting output in the console window (displaying a grid etc) - focus on the domain rather than the presentation.

## How to run ##
* From the root directory of the project run the command
```
      node app.js
```

## Notes ##
* Both player's and the computer's ships are placed randomly when starting the game

## Tools Used ##
* Node.js 0.12.7