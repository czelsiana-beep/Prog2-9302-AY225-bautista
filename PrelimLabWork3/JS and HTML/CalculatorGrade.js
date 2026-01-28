/**
 * Prelim Grade Calculator - JavaScript Implementation
 * 
 * This JavaScript file contains the core logic for calculating the required
 * Prelim Exam score needed for a student to pass (75) or achieve excellent
 * standing (100) based on their current attendance and lab work grades.
 * 
 * Grading Formula:
 * - Prelim Grade = (0.30 × Prelim Exam) + (0.70 × Class Standing)
 * - Class Standing = (0.40 × Attendance) + (0.60 × Lab Work Average)
 * - Lab Work Average = (LW1 + LW2 + LW3) / 3
 * 
 * @version 1.0
 */

/**
 * Main calculation function
 * Gets input values, validates them, performs calculations, and displays results
 */
function calculateGrade() {
    // Get input values from the form
    const attendance = parseFloat(document.getElementById('attendance').value);
    const labWork1 = parseFloat(document.getElementById('labWork1').value);
    const labWork2 = parseFloat(document.getElementById('labWork2').value);
    const labWork3 = parseFloat(document.getElementById('labWork3').value);
    
    // Get output elements
    const outputSection = document.getElementById('outputSection');
    const outputContent = document.getElementById('outputContent');
    
    // Validate that all inputs are numbers
    if (isNaN(attendance) || isNaN(labWork1) || isNaN(labWork2) || isNaN(labWork3)) {
        displayError('❌ Please fill in all fields with valid numbers!', outputContent, outputSection);
        return;
    }
    
    // Validate attendance is not negative
    if (attendance < 0) {
        displayError('❌ Attendance cannot be negative!', outputContent, outputSection);
        return;
    }
    
    // Validate lab work grades are in valid range (0-100)
    if (!isValidGrade(labWork1) || !isValidGrade(labWork2) || !isValidGrade(labWork3)) {
        displayError('❌ Lab work grades must be between 0 and 100!', outputContent, outputSection);
        return;
    }
    
    // Perform calculations
    const results = performCalculations(attendance, labWork1, labWork2, labWork3);
    
    // Display results
    displayResults(results, outputContent, outputSection);
}

/**
 * Validates if a grade is within valid range (0-100)
 * @param {number} grade - Grade to validate
 * @returns {boolean} True if grade is valid, false otherwise
 */
function isValidGrade(grade) {
    return grade >= 0 && grade <= 100;
}

/**
 * Performs all required calculations
 * @param {number} attendance - Number of attendances
 * @param {number} labWork1 - Lab Work 1 grade
 * @param {number} labWork2 - Lab Work 2 grade
 * @param {number} labWork3 - Lab Work 3 grade
 * @returns {object} Object containing all calculated values
 */
function performCalculations(attendance, labWork1, labWork2, labWork3) {
    // Formula 1: Lab Work Average = (LW1 + LW2 + LW3) / 3
    const labWorkAverage = (labWork1 + labWork2 + labWork3) / 3.0;
    
    // Formula 2: Class Standing = (0.40 × Attendance) + (0.60 × Lab Work Average)
    const classStanding = (0.40 * attendance) + (0.60 * labWorkAverage);
    
    // Formula 3: Prelim Grade = (0.30 × Prelim Exam) + (0.70 × Class Standing)
    // Solving for Prelim Exam:
    // Prelim Exam = (Prelim Grade - 0.70 × Class Standing) / 0.30
    
    const requiredExamForPassing = (75.0 - (0.70 * classStanding)) / 0.30;
    const requiredExamForExcellent = (100.0 - (0.70 * classStanding)) / 0.30;
    
    return {
        attendance: attendance,
        labWork1: labWork1,
        labWork2: labWork2,
        labWork3: labWork3,
        labWorkAverage: labWorkAverage,
        classStanding: classStanding,
        requiredExamForPassing: requiredExamForPassing,
        requiredExamForExcellent: requiredExamForExcellent
    };
}

/**
 * Displays error message to the user
 * @param {string} message - Error message to display
 * @param {HTMLElement} outputContent - Element to display content in
 * @param {HTMLElement} outputSection - Section to make visible
 */
function displayError(message, outputContent, outputSection) {
    outputContent.innerHTML = `<div class="error">${message}</div>`;
    outputSection.classList.add('show');
}

/**
 * Displays calculation results to the user
 * @param {object} results - Object containing calculation results
 * @param {HTMLElement} outputContent - Element to display content in
 * @param {HTMLElement} outputSection - Section to make visible
 */
function displayResults(results, outputContent, outputSection) {
    let output = '<div class="output-box">';
    
    // Header
    output += '<div style="text-align: center; font-weight: bold; font-size: 16px; margin-bottom: 20px; color: #667eea;">';
    output += '═══════════════════════════════════════════════════════\n';
    output += '           PRELIM GRADE CALCULATION RESULTS\n';
    output += '═══════════════════════════════════════════════════════';
    output += '</div>';
    
    // Input Data Section
    output += '<div class="section-title">INPUT DATA:</div>';
    output += `Attendance Score:           ${results.attendance}\n`;
    output += `Lab Work 1 Grade:           ${results.labWork1.toFixed(2)}\n`;
    output += `Lab Work 2 Grade:           ${results.labWork2.toFixed(2)}\n`;
    output += `Lab Work 3 Grade:           ${results.labWork3.toFixed(2)}\n`;
    
    output += '<div class="divider"></div>';
    
    // Computed Values Section
    output += '<div class="section-title">COMPUTED VALUES:</div>';
    output += `Lab Work Average:           ${results.labWorkAverage.toFixed(2)}\n`;
    output += `Class Standing (70%):       ${results.classStanding.toFixed(2)}\n`;
    
    output += '<div class="divider"></div>';
    
    // Required Scores Section
    output += '<div class="section-title">REQUIRED PRELIM EXAM SCORES:</div>';
    output += `To Pass (75):               ${results.requiredExamForPassing.toFixed(2)}\n`;
    output += `For Excellent (100):        ${results.requiredExamForExcellent.toFixed(2)}\n`;
    
    output += '<div class="divider"></div>';
    
    // Evaluation Section
    output += '<div class="section-title">EVALUATION:</div>';
    output += generateEvaluation(results.requiredExamForPassing, results.requiredExamForExcellent);
    
    output += '\n═══════════════════════════════════════════════════════';
    output += '</div>';
    
    // Display output
    outputContent.innerHTML = output;
    outputSection.classList.add('show');
    
    // Scroll to output smoothly
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Generates evaluation text based on required scores
 * @param {number} requiredForPassing - Required score to pass
 * @param {number} requiredForExcellent - Required score for excellent
 * @returns {string} Evaluation text
 */
function generateEvaluation(requiredForPassing, requiredForExcellent) {
    let evaluation = '';
    
    // Evaluation for passing grade
    if (requiredForPassing > 100) {
        evaluation += '⚠ Unfortunately, it is mathematically IMPOSSIBLE to\n';
        evaluation += '  pass the Prelim period, even with a perfect score\n';
        evaluation += '  of 100 on the Prelim Exam. Your Class Standing is\n';
        evaluation += '  too low to achieve a passing grade of 75.\n';
    } else if (requiredForPassing < 0) {
        evaluation += '★ Congratulations! You have already PASSED the Prelim\n';
        evaluation += '  period based on your Class Standing alone!\n';
        evaluation += '  Any score on the Prelim Exam will keep you passing.\n';
    } else {
        evaluation += `• You need a Prelim Exam score of ${requiredForPassing.toFixed(2)} to pass.\n`;
        if (requiredForPassing <= 100) {
            evaluation += '  This is achievable with proper preparation.\n';
        }
    }
    
    evaluation += '\n';
    
    // Evaluation for excellent grade
    if (requiredForExcellent > 100) {
        evaluation += '⚠ Achieving an Excellent grade (100) is not possible,\n';
        evaluation += '  as it would require a Prelim Exam score above 100.\n';
    } else if (requiredForExcellent < 0) {
        evaluation += '★ You have already achieved EXCELLENT standing!\n';
        evaluation += '  Your Class Standing guarantees a grade of 100.\n';
    } else {
        evaluation += `• You need a Prelim Exam score of ${requiredForExcellent.toFixed(2)} for excellent.\n`;
        if (requiredForExcellent <= 100) {
            evaluation += '  Aim high and give your best effort!\n';
        }
    }
    
    return evaluation;
}

/**
 * Clears all input fields and output
 */
function clearAllFields() {
    document.getElementById('attendance').value = '';
    document.getElementById('labWork1').value = '';
    document.getElementById('labWork2').value = '';
    document.getElementById('labWork3').value = '';
    
    const outputSection = document.getElementById('outputSection');
    outputSection.classList.remove('show');
    
    // Focus on first input field
    document.getElementById('attendance').focus();
}

/**
 * Initializes event listeners when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Allow Enter key to trigger calculation
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculateGrade();
        }
    });
    
    // Focus on first input field on load
    document.getElementById('attendance').focus();
});

/**
 * Alternative simple implementation using prompts and alerts
 * Useful for environments without HTML forms
 */
function calculateGradeSimple() {
    // Get inputs using prompts
    let attendance = prompt("Enter the number of attendances:");
    let labWork1 = prompt("Enter Lab Work 1 grade (0-100):");
    let labWork2 = prompt("Enter Lab Work 2 grade (0-100):");
    let labWork3 = prompt("Enter Lab Work 3 grade (0-100):");
    
    // Convert to numbers
    attendance = parseFloat(attendance);
    labWork1 = parseFloat(labWork1);
    labWork2 = parseFloat(labWork2);
    labWork3 = parseFloat(labWork3);
    
    // Validate inputs
    if (isNaN(attendance) || isNaN(labWork1) || isNaN(labWork2) || isNaN(labWork3)) {
        alert("❌ ERROR: Please enter valid numbers for all fields!");
        return;
    }
    
    if (attendance < 0) {
        alert("❌ ERROR: Attendance cannot be negative!");
        return;
    }
    
    if (labWork1 < 0 || labWork1 > 100 || labWork2 < 0 || labWork2 > 100 || labWork3 < 0 || labWork3 > 100) {
        alert("❌ ERROR: Lab work grades must be between 0 and 100!");
        return;
    }
    
    // Perform calculations
    const results = performCalculations(attendance, labWork1, labWork2, labWork3);
    
    // Build output message
    let output = "═══════════════════════════════════════════════════════\n";
    output += "           PRELIM GRADE CALCULATION RESULTS\n";
    output += "═══════════════════════════════════════════════════════\n\n";
    
    output += "INPUT DATA:\n";
    output += "───────────────────────────────────────────────────────\n";
    output += `Attendance Score:           ${results.attendance}\n`;
    output += `Lab Work 1 Grade:           ${results.labWork1.toFixed(2)}\n`;
    output += `Lab Work 2 Grade:           ${results.labWork2.toFixed(2)}\n`;
    output += `Lab Work 3 Grade:           ${results.labWork3.toFixed(2)}\n\n`;
    
    output += "COMPUTED VALUES:\n";
    output += "───────────────────────────────────────────────────────\n";
    output += `Lab Work Average:           ${results.labWorkAverage.toFixed(2)}\n`;
    output += `Class Standing (70%):       ${results.classStanding.toFixed(2)}\n\n`;
    
    output += "REQUIRED PRELIM EXAM SCORES:\n";
    output += "───────────────────────────────────────────────────────\n";
    output += `To Pass (75):               ${results.requiredExamForPassing.toFixed(2)}\n`;
    output += `For Excellent (100):        ${results.requiredExamForExcellent.toFixed(2)}\n\n`;
    
    output += "EVALUATION:\n";
    output += "───────────────────────────────────────────────────────\n";
    output += generateEvaluationSimple(results.requiredExamForPassing, results.requiredExamForExcellent);
    
    output += "\n═══════════════════════════════════════════════════════";
    
    // Display output in alert
    alert(output);
    
    // Also log to console for easy copy-paste
    console.log(output);
}

/**
 * Generates evaluation text for simple implementation
 * @param {number} requiredForPassing - Required score to pass
 * @param {number} requiredForExcellent - Required score for excellent
 * @returns {string} Evaluation text
 */
function generateEvaluationSimple(requiredForPassing, requiredForExcellent) {
    let evaluation = '';
    
    if (requiredForPassing > 100) {
        evaluation += "⚠ Unfortunately, it is mathematically IMPOSSIBLE to\n";
        evaluation += "  pass the Prelim period, even with a perfect score\n";
        evaluation += "  of 100 on the Prelim Exam. Your Class Standing is\n";
        evaluation += "  too low to achieve a passing grade of 75.\n";
    } else if (requiredForPassing < 0) {
        evaluation += "★ Congratulations! You have already PASSED the Prelim\n";
        evaluation += "  period based on your Class Standing alone!\n";
        evaluation += "  Any score on the Prelim Exam will keep you passing.\n";
    } else {
        evaluation += `• You need a Prelim Exam score of ${requiredForPassing.toFixed(2)} to pass.\n`;
        if (requiredForPassing <= 100) {
            evaluation += "  This is achievable with proper preparation.\n";
        }
    }
    
    evaluation += "\n";
    
    if (requiredForExcellent > 100) {
        evaluation += "⚠ Achieving an Excellent grade (100) is not possible,\n";
        evaluation += "  as it would require a Prelim Exam score above 100.\n";
    } else if (requiredForExcellent < 0) {
        evaluation += "★ You have already achieved EXCELLENT standing!\n";
        evaluation += "  Your Class Standing guarantees a grade of 100.\n";
    } else {
        evaluation += `• You need a Prelim Exam score of ${requiredForExcellent.toFixed(2)} for excellent.\n`;
        if (requiredForExcellent <= 100) {
            evaluation += "  Aim high and give your best effort!\n";
        }
    }
    
    return evaluation;
}