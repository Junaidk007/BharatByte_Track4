const schemes = require("../data/data.json");
const axios = require("axios");

exports.getRecommendations = async (req, res) => {
  try {
    const user = req.body;

    // 🔹 STEP 1: Rule-Based Filtering
    const filteredSchemes = schemes.filter((scheme) => {

      if (scheme.incomeLimit && user.annualIncome > scheme.incomeLimit)
        return false;

      if (scheme.minAge && user.age < scheme.minAge)
        return false;

      if (
        scheme.occupation &&
        !scheme.occupation.includes("All") &&
        !scheme.occupation.includes(user.occupation)
      )
        return false;

      return true;
    });

    // 🔹 STEP 4: Send Final Response
    res.json({
      success: true,
      recommendedSchemes: scoredSchemes
    });
  } catch (error) {
    console.error("Error in getRecommendations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }  
};  