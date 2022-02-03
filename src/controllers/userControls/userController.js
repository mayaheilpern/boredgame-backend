import User from "../../models/userSchema.js";
import errorHandler from "../../utilities/error.js";

// This is currently without auth. 
    // This will allow for testing of CRUD operations on user data.

// Read all user profiles:
    // Game states currently not required.
export const fetchAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find (
            {},
            {
                _id: 1,
                userName: 1,
                email: 1,
                password_digest: 1,
                // games: 1
            }
        );

        if (allUsers) {
            return res.json(errorHandler(false, "Fetching all users.", allUsers))
        } else {
            return res.status(403).json(errorHandler(true, "Error fetching users."))
        };

    } catch (error) {
        return res.status(400).json(errorHandler(true, "Error fetching users."))
    };
};

// Read individual user profile by ID:
export const findUserById = (req, res) => {
    try {
        User.findById(req.params.id, (error, foundUser) => {
            if (foundUser) {
                const { userName, email, password_digest } = foundUser;
                return res.json(errorHandler(false, `Found user ${req.params.id}`, {
                    userProfile:
                        {
                            userName: `${userName}`,
                            email: `${email}`,
                            password_digest: `${password_digest}`,
                        }
                }));
            } else {
                return res.json(errorHandler(true, "Error finding user."));
            }
        });
    } catch (error) {
        res.json(errorHandler(true, "Error finding user."))
    };
};

// Create new user:
export const createUser = async (req, res) => {
    try {
        const newUser = new User (
            {
                userName: req.body.userName,
                email: req.body.email,
                password_digest: req.body.password_digest,
            }
        );

        await newUser.save();

        if (newUser) {
            res.json(errorHandler(false, "New user created!"));
        } else {
            return res.json(errorHandler(true, "Error creating a new user."))
        };
    } catch (error) {
        return res.json(errorHandler(true, "Error creating a new user."))
    };
};

// Update user profile:
export const updateUserById = (req, res) => {
    try {
        User.findOneAndUpdate (
            { _id: req.params.id },
            req.body,
            { new: true },
            (error, updatedUser) => {
                if (updatedUser) {
                    res.json(errorHandler(false, "Updated user profile!", updatedUser))
                } else {
                    return res.json(errorHandler(true, "Error updating user.", { error }))
                };
            }
        );
    } catch (error) {
        return res.json(true, "Error updating user.")
    };
};

// Delete user profile:
export const deleteUser = (req, res) => {
    try {
        User.findByIdAndRemove (
            req.params.id,
            { new: true },
            (error, deletedUser) => {
                if (deletedUser) {
                    return res.json(errorHandler(false, "Deleting user.", deletedUser))
                } else {
                    return res.json(errorHandler(true, "Error deleting user."))
                };
            }
        );
    } catch (error) {
        return res.json(errorHandler(true, "Error deleting user."));
    };
};
