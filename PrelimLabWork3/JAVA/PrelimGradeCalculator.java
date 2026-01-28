import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

/**
 * Prelim Grade Calculator - Java Implementation
 * 
 * This program calculates the required Prelim Exam score needed for a student
 * to pass (75) or achieve excellent standing (100) based on their current
 * attendance and lab work grades.
 * 
 * Grading Formula:
 * - Prelim Grade = (0.30 × Prelim Exam) + (0.70 × Class Standing)
 * - Class Standing = (0.40 × Attendance) + (0.60 × Lab Work Average)
 * - Lab Work Average = (LW1 + LW2 + LW3) / 3
 * 
 * @author Student Name
 * @version 1.0
 */
public class GradeCalculator extends JFrame {
    
    // Input fields
    private JTextField attendanceField;
    private JTextField labWork1Field;
    private JTextField labWork2Field;
    private JTextField labWork3Field;
    
    // Output area
    private JTextArea outputArea;
    
    // Buttons
    private JButton calculateButton;
    private JButton clearButton;
    
    /**
     * Constructor - Initializes the GUI components
     */
    public GradeCalculator() {
        // Set up the frame
        setTitle("Prelim Grade Calculator - Java Version");
        setSize(650, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout(10, 10));
        
        // Create panels
        JPanel inputPanel = createInputPanel();
        JPanel outputPanel = createOutputPanel();
        JPanel buttonPanel = createButtonPanel();
        
        // Add panels to frame
        add(inputPanel, BorderLayout.NORTH);
        add(outputPanel, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);
        
        // Center the frame on screen
        setLocationRelativeTo(null);
    }
    
    /**
     * Creates the input panel with text fields for user input
     * @return JPanel containing input fields
     */
    private JPanel createInputPanel() {
        JPanel panel = new JPanel(new GridLayout(4, 2, 10, 10));
        panel.setBorder(BorderFactory.createTitledBorder(
            BorderFactory.createLineBorder(new Color(102, 126, 234), 2),
            "Student Information",
            0,
            0,
            new Font("Arial", Font.BOLD, 14),
            new Color(102, 126, 234)
        ));
        panel.setBackground(Color.WHITE);
        
        // Attendance
        JLabel attendanceLabel = new JLabel("Number of Attendances:");
        attendanceLabel.setFont(new Font("Arial", Font.PLAIN, 13));
        panel.add(attendanceLabel);
        attendanceField = new JTextField();
        attendanceField.setFont(new Font("Arial", Font.PLAIN, 13));
        panel.add(attendanceField);
        
        // Lab Work 1
        JLabel lw1Label = new JLabel("Lab Work 1 Grade (0-100):");
        lw1Label.setFont(new Font("Arial", Font.PLAIN, 13));
        panel.add(lw1Label);
        labWork1Field = new JTextField();
        labWork1Field.setFont(new Font("Arial", Font.PLAIN, 13));
        panel.add(labWork1Field);
        
        // Lab Work 2
        JLabel lw2Label = new JLabel("Lab Work 2 Grade (0-100):");
        lw2Label.setFont(new Font("Arial", Font.PLAIN, 13));
        panel.add(lw2Label);
        labWork2Field = new JTextField();
        labWork2Field.setFont(new Font("Arial", Font.PLAIN, 13));
        panel.add(labWork2Field);
        
        // Lab Work 3
        JLabel lw3Label = new JLabel("Lab Work 3 Grade (0-100):");
        lw3Label.setFont(new Font("Arial", Font.PLAIN, 13));
        panel.add(lw3Label);
        labWork3Field = new JTextField();
        labWork3Field.setFont(new Font("Arial", Font.PLAIN, 13));
        panel.add(labWork3Field);
        
        return panel;
    }
    
    /**
     * Creates the output panel with text area for displaying results
     * @return JPanel containing output text area
     */
    private JPanel createOutputPanel() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBorder(BorderFactory.createTitledBorder(
            BorderFactory.createLineBorder(new Color(102, 126, 234), 2),
            "Calculation Results",
            0,
            0,
            new Font("Arial", Font.BOLD, 14),
            new Color(102, 126, 234)
        ));
        panel.setBackground(Color.WHITE);
        
        outputArea = new JTextArea(18, 50);
        outputArea.setEditable(false);
        outputArea.setFont(new Font("Monospaced", Font.PLAIN, 12));
        outputArea.setBackground(new Color(248, 249, 250));
        outputArea.setMargin(new Insets(10, 10, 10, 10));
        
        JScrollPane scrollPane = new JScrollPane(outputArea);
        panel.add(scrollPane, BorderLayout.CENTER);
        
        return panel;
    }
    
    /**
     * Creates the button panel with Calculate and Clear buttons
     * @return JPanel containing action buttons
     */
    private JPanel createButtonPanel() {
        JPanel panel = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 10));
        panel.setBackground(Color.WHITE);
        
        // Calculate button
        calculateButton = new JButton("Calculate Required Prelim Exam Score");
        calculateButton.setFont(new Font("Arial", Font.BOLD, 13));
        calculateButton.setBackground(new Color(102, 126, 234));
        calculateButton.setForeground(Color.WHITE);
        calculateButton.setFocusPainted(false);
        calculateButton.setPreferredSize(new Dimension(280, 35));
        calculateButton.addActionListener(new CalculateButtonListener());
        
        // Clear button
        clearButton = new JButton("Clear All Fields");
        clearButton.setFont(new Font("Arial", Font.BOLD, 13));
        clearButton.setBackground(new Color(200, 200, 200));
        clearButton.setForeground(Color.BLACK);
        clearButton.setFocusPainted(false);
        clearButton.setPreferredSize(new Dimension(150, 35));
        clearButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                clearFields();
            }
        });
        
        panel.add(calculateButton);
        panel.add(clearButton);
        
        return panel;
    }
    
    /**
     * Event listener for the Calculate button
     */
    private class CalculateButtonListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            try {
                // Get input values
                int attendance = Integer.parseInt(attendanceField.getText().trim());
                double labWork1 = Double.parseDouble(labWork1Field.getText().trim());
                double labWork2 = Double.parseDouble(labWork2Field.getText().trim());
                double labWork3 = Double.parseDouble(labWork3Field.getText().trim());
                
                // Validate inputs
                if (attendance < 0) {
                    showError("Attendance cannot be negative!");
                    return;
                }
                
                if (labWork1 < 0 || labWork1 > 100) {
                    showError("Lab Work 1 grade must be between 0 and 100!");
                    return;
                }
                
                if (labWork2 < 0 || labWork2 > 100) {
                    showError("Lab Work 2 grade must be between 0 and 100!");
                    return;
                }
                
                if (labWork3 < 0 || labWork3 > 100) {
                    showError("Lab Work 3 grade must be between 0 and 100!");
                    return;
                }
                
                // Calculate and display results
                calculateAndDisplay(attendance, labWork1, labWork2, labWork3);
                
            } catch (NumberFormatException ex) {
                showError("Please enter valid numeric values in all fields!");
            }
        }
    }
    
    /**
     * Performs calculations and displays results
     * 
     * @param attendance Number of attendances
     * @param labWork1 Grade for Lab Work 1
     * @param labWork2 Grade for Lab Work 2
     * @param labWork3 Grade for Lab Work 3
     */
    private void calculateAndDisplay(int attendance, double labWork1, double labWork2, double labWork3) {
        // Formula 1: Lab Work Average = (LW1 + LW2 + LW3) / 3
        double labWorkAverage = (labWork1 + labWork2 + labWork3) / 3.0;
        
        // Formula 2: Class Standing = (0.40 × Attendance) + (0.60 × Lab Work Average)
        double classStanding = (0.40 * attendance) + (0.60 * labWorkAverage);
        
        // Formula 3: Prelim Grade = (0.30 × Prelim Exam) + (0.70 × Class Standing)
        // Solving for Prelim Exam:
        // Prelim Exam = (Prelim Grade - 0.70 × Class Standing) / 0.30
        
        double requiredExamForPassing = (75.0 - (0.70 * classStanding)) / 0.30;
        double requiredExamForExcellent = (100.0 - (0.70 * classStanding)) / 0.30;
        
        // Build output string
        StringBuilder output = new StringBuilder();
        
        output.append("═══════════════════════════════════════════════════════════\n");
        output.append("              PRELIM GRADE CALCULATION RESULTS\n");
        output.append("═══════════════════════════════════════════════════════════\n\n");
        
        output.append("INPUT DATA:\n");
        output.append("─────────────────────────────────────────────────────────────\n");
        output.append(String.format("Attendance Score:              %d\n", attendance));
        output.append(String.format("Lab Work 1 Grade:              %.2f\n", labWork1));
        output.append(String.format("Lab Work 2 Grade:              %.2f\n", labWork2));
        output.append(String.format("Lab Work 3 Grade:              %.2f\n\n", labWork3));
        
        output.append("COMPUTED VALUES:\n");
        output.append("─────────────────────────────────────────────────────────────\n");
        output.append(String.format("Lab Work Average:              %.2f\n", labWorkAverage));
        output.append(String.format("Class Standing (70%%):          %.2f\n\n", classStanding));
        
        output.append("REQUIRED PRELIM EXAM SCORES:\n");
        output.append("─────────────────────────────────────────────────────────────\n");
        output.append(String.format("To Pass (75):                  %.2f\n", requiredExamForPassing));
        output.append(String.format("For Excellent (100):           %.2f\n\n", requiredExamForExcellent));
        
        output.append("EVALUATION:\n");
        output.append("─────────────────────────────────────────────────────────────\n");
        
        // Provide evaluation remarks
        if (requiredExamForPassing > 100) {
            output.append("⚠ Unfortunately, it is mathematically IMPOSSIBLE to pass\n");
            output.append("  the Prelim period, even with a perfect score of 100 on\n");
            output.append("  the Prelim Exam. Your Class Standing is too low to\n");
            output.append("  achieve a passing grade of 75.\n");
        } else if (requiredExamForPassing < 0) {
            output.append("★ Congratulations! You have already PASSED the Prelim\n");
            output.append("  period based on your Class Standing alone!\n");
            output.append("  Any score on the Prelim Exam will keep you passing.\n");
        } else {
            output.append(String.format("• You need a Prelim Exam score of %.2f to pass.\n", requiredExamForPassing));
            if (requiredExamForPassing <= 100) {
                output.append("  This is achievable with proper preparation.\n");
            }
        }
        
        output.append("\n");
        
        if (requiredExamForExcellent > 100) {
            output.append("⚠ Achieving an Excellent grade (100) is not possible,\n");
            output.append("  as it would require a Prelim Exam score above 100.\n");
        } else if (requiredExamForExcellent < 0) {
            output.append("★ You have already achieved EXCELLENT standing!\n");
            output.append("  Your Class Standing guarantees a grade of 100.\n");
        } else {
            output.append(String.format("• You need a Prelim Exam score of %.2f for excellent.\n", requiredExamForExcellent));
            if (requiredExamForExcellent <= 100) {
                output.append("  Aim high and give your best effort!\n");
            }
        }
        
        output.append("\n═══════════════════════════════════════════════════════════\n");
        
        // Display in output area
        outputArea.setText(output.toString());
    }
    
    /**
     * Clears all input fields and output area
     */
    private void clearFields() {
        attendanceField.setText("");
        labWork1Field.setText("");
        labWork2Field.setText("");
        labWork3Field.setText("");
        outputArea.setText("");
        attendanceField.requestFocus();
    }
    
    /**
     * Displays an error message dialog
     * @param message Error message to display
     */
    private void showError(String message) {
        JOptionPane.showMessageDialog(
            this,
            message,
            "Input Error",
            JOptionPane.ERROR_MESSAGE
        );
    }
    
    /**
     * Main method - Entry point of the application
     */
    public static void main(String[] args) {
        // Use SwingUtilities to ensure thread safety
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                GradeCalculator calculator = new GradeCalculator();
                calculator.setVisible(true);
            }
        });
    }
}