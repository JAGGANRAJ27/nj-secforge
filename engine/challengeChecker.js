function checkChallenge(lab, result, mode) {

  // Only count exploit success in vulnerable mode
  if (mode !== "vulnerable") {
    return {
      completed: false,
      message: "Secure mode active — attack prevented."
    };
  }

  if (
    lab.instructions.challenge.type === "login-bypass" &&
    result.length > 0
  ) {
    return {
      completed: true,
      message: lab.instructions.challenge.successMessage
    };
  }

  return {
    completed: false,
    message: "Challenge not completed yet."
  };
}

module.exports = checkChallenge;