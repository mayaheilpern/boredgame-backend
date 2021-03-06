import GameState from "../../models/gameStateSchema.js";
import errorHandler from "../../utilities/error.js";

// Read current game state:
export const getGame = (req, res) => {
    try {
        GameState.findById(req.params.id, (error, foundGame) => {
            if (foundGame) {
                const { playerNum, territories, turn } = foundGame;
                return res.json(errorHandler(false, `Found game ${req.params.id}!`, {
                    Game:
                        {
                            playerNum: `${playerNum}`,
                            territories: `${territories}`,
                            turn: `${turn}`,
                        }
                }));
            } else {
                return res.json(errorHandler(true, "Game not found. Please contact project owner."));
            }
        });
    } catch (error) {
        res.json(errorHandler(true, "Error finding game. Please contact project owner."))
    };
};
