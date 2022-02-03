import mongoose from "mongoose";
import playerSchema from "./playerSchema.js";
import territorySchema from "./territorySchema.js";

// Schema of state of a game when saving to DB:
const gameStateSchema = mongoose.Schema(
    {
        playerNames: [playerSchema],          // Names of players entered on starting a new game.
        territories: [territorySchema],       // 42 Territories on a board. This also represents the territory cards.
        turn: { type: String, required: true }  // Name of player who's turn it is currently.
    },
    { timestamps: true }      
);

const GameState = mongoose.model("gameState", gameStateSchema);

export default GameState;
