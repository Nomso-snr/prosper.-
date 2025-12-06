/**
 * Decimal to Binary Converter
 * Converts decimal numbers (including floating-point) to binary representation
 */

/**
 * Convert a decimal number to binary representation
 * @param {number} decimalNum - The decimal number to convert
 * @param {number} maxFractionalBits - Maximum number of fractional bits (default: 20)
 * @returns {object} Object containing binary string and explanation
 */
function decimalToBinary(decimalNum, maxFractionalBits = 20) {
    if (decimalNum === 0) {
        return {
            binary: "0",
            explanation: "Zero is represented as 0 in binary."
        };
    }

    // Handle negative numbers
    const isNegative = decimalNum < 0;
    decimalNum = Math.abs(decimalNum);

    // Split into integer and fractional parts
    const integerPart = Math.floor(decimalNum);
    let fractionalPart = decimalNum - integerPart;

    // Convert integer part to binary
    let binaryInteger = integerPart === 0 ? "0" : integerPart.toString(2);

    // Convert fractional part to binary
    let binaryFractional = "";
    let steps = [];
    let seen = new Set();

    while (fractionalPart > 0 && binaryFractional.length < maxFractionalBits) {
        if (seen.has(fractionalPart.toFixed(10))) {
            binaryFractional += " (repeating)";
            break;
        }
        seen.add(fractionalPart.toFixed(10));

        fractionalPart *= 2;
        if (fractionalPart >= 1) {
            binaryFractional += "1";
            steps.push(`${fractionalPart.toFixed(4)} × 2 ≥ 1 → bit: 1`);
            fractionalPart -= 1;
        } else {
            binaryFractional += "0";
            steps.push(`${(fractionalPart).toFixed(4)} × 2 < 1 → bit: 0`);
        }
    }

    // Combine parts
    let binaryResult = binaryFractional ? binaryInteger + "." + binaryFractional : binaryInteger;

    // Add negative sign if needed
    if (isNegative) {
        binaryResult = "-" + binaryResult;
    }

    // Create explanation
    let explanation = `Integer part (${integerPart}): ${binaryInteger}`;
    if (fractionalPart !== 0 && binaryFractional) {
        explanation += `\n\nFractional part conversion steps:\n${steps.slice(0, 5).join("\n")}${steps.length > 5 ? "..." : ""}`;
    }

    return {
        binary: binaryResult,
        explanation: explanation
    };
}

/**
 * Display the conversion result
 * @param {number} decimalNum - The decimal number to convert
 */
function displayConversion(decimalNum) {
    const resultsDiv = document.getElementById("results");
    const decimalDisplay = document.getElementById("decimalDisplay");
    const binaryDisplay = document.getElementById("binaryDisplay");
    const explanationDisplay = document.getElementById("explanation");

    const result = decimalToBinary(decimalNum);

    decimalDisplay.textContent = decimalNum;
    binaryDisplay.textContent = result.binary;
    explanationDisplay.textContent = result.explanation;

    // Show results with animation
    resultsDiv.style.display = "none";
    setTimeout(() => {
        resultsDiv.style.display = "block";
    }, 10);
}

/**
 * Convert example number
 * @param {number} exampleNum - Example number to convert
 */
function convertExample(exampleNum) {
    document.getElementById("decimalInput").value = exampleNum;
    displayConversion(exampleNum);
}

/**
 * Initialize event listeners
 */
document.addEventListener("DOMContentLoaded", function() {
    const decimalInput = document.getElementById("decimalInput");
    const convertBtn = document.getElementById("convertBtn");

    // Convert button click handler
    convertBtn.addEventListener("click", function() {
        const value = decimalInput.value.trim();

        if (!value) {
            alert("Please enter a decimal number!");
            decimalInput.focus();
            return;
        }

        const decimalNum = parseFloat(value);

        if (isNaN(decimalNum)) {
            alert("Invalid input! Please enter a valid decimal number.");
            decimalInput.focus();
            return;
        }

        displayConversion(decimalNum);
    });

    // Enter key handler
    decimalInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            convertBtn.click();
        }
    });

    // Focus on input field on load
    decimalInput.focus();
});
