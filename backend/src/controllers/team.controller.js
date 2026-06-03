import Team from "../models/team.model.js";
import User from "../models/user.model.js";

export const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    const team = await Team.create({
      name,
      description,
      adminId: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, {
      teamId: team._id,
      role: "ADMIN",
    });

    res.status(201).json({
      success: true,
      team,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create team",
    });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("adminId", "name email");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    res.json({
      success: true,
      team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// todo: confirm if this endpoint fetch every team that is created by user.
export const getMyTeam = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.teamId) {
      return res.status(404).json({
        success: false,
        message: "User not assigned to any team",
      });
    }

    // const team = await Team.find({ adminId: req.user._id });
    const team = await Team.find(user.teamId);

    res.json({
      success: true,
      team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};