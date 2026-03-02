function checkChallenge(lab, result, mode) {
  // Handle different challenge types based on lab instructions

  // A01:2025 Broken Access Control Challenge
  if (lab.instructions.challenge.type === "access-control") {

    const success = result && result.length > 0;

    return {
      completed: success,
      message: success
        ? "Admin panel accessed!"
        : "Access denied."
    };
  }

  // A02:2025 Security Misconfiguration Challenge
  if (lab.instructions.challenge.type === "misconfiguration") {

    const success = result && result.length > 0;

    return {
      completed: success,
      message: success
        ? "Debug panel exposed!"
        : "Debug mode disabled."
    };
  }
  // A03:2025 - Supply Chain Vulnerability Challenge
  if (lab.instructions.challenge.type === "supply-chain") {

    const success = result && result.length > 0;

    return {
      completed: success,
      message: success
        ? "Malicious dependency leaked sensitive data!"
        : "Execution completed safely."
    };
  }

  // A04:2025 Cryptographic Failures Challenge
  if (lab.instructions.challenge.type === "crypto-login") {

    const success = result && result.length > 0;

    return {
      completed: success,
      message: success
        ? "Admin login achieved using exposed credentials!"
        : "Login failed."
    };
  }
  // A06:2025 - Insecure Design Challenge
  if (lab.instructions.challenge.type === "price-manipulation") {

    const success = result && result.length > 0;

    return {
      completed: success,
      message: success
        ? "Item purchased using manipulated price!"
        : "Purchase rejected."
    };
  }


  // A07:2025 Authentication Failures Challenge
  if (lab.instructions.challenge.type === "auth-failure") {

    const success = result && result.length > 0;

    return {
      completed: success,
      message: success
        ? "Admin session hijacked!"
        : "Session invalid."
    };
  }

  // A08:2025 Software and Data Integrity Failures Challenge
  if (lab.instructions.challenge.type === "data-tamper") {

    const success = result && result.length > 0;

    return {
      completed: success,
      message: success
        ? "Admin access granted via tampered data!"
        : "Integrity validation failed."
    };
  }

  // A09:2025 Security Logging and Alerting Failures Challenge
  if (lab.instructions.challenge.type === "logging-failure") {

    const success = result && result.length > 0;

    return {
      completed: success,
      message: success
        ? "Security alert detected suspicious activity!"
        : "No alert triggered yet."
    };
  }

  // A10:2025 Mishandling of Exceptional Conditions Challenge
  if (lab.instructions.challenge.type === "exception-leak") {

    const success = result && result.length > 0;

    return {
      completed: success,
      message: success
        ? "Sensitive error details exposed!"
        : "No sensitive information leaked."
    };
  }

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