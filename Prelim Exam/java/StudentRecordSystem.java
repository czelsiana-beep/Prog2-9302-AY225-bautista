// Programmer Identifier: [YOUR FULL NAME] [YOUR STUDENT ID]
// Student Record System - Java Swing Implementation

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class StudentRecordSystem extends JFrame {
    private JTable table;
    private DefaultTableModel tableModel;
    private JTextField idField, nameField, gradeField;
    private JButton addButton, deleteButton;

    public StudentRecordSystem() {
        // SET YOUR NAME AND ID HERE
        setTitle("Student Records - [YOUR FULL NAME] [YOUR STUDENT ID]");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        
        initComponents();
        loadCSVData();
        
        setVisible(true);
    }

    private void initComponents() {
        // Main panel with BorderLayout
        setLayout(new BorderLayout(10, 10));

        // Table setup
        String[] columnNames = {"Student ID", "First Name", "Last Name", "Lab 1", "Lab 2", "Lab 3", "Prelim", "Attendance"};
        tableModel = new DefaultTableModel(columnNames, 0);
        table = new JTable(tableModel);
        table.setFont(new Font("Arial", Font.PLAIN, 12));
        table.setRowHeight(25);
        
        JScrollPane scrollPane = new JScrollPane(table);
        add(scrollPane, BorderLayout.CENTER);

        // Input panel
        JPanel inputPanel = new JPanel(new GridBagLayout());
        inputPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Student ID field
        gbc.gridx = 0;
        gbc.gridy = 0;
        inputPanel.add(new JLabel("Student ID:"), gbc);
        
        gbc.gridx = 1;
        gbc.weightx = 1.0;
        idField = new JTextField(15);
        inputPanel.add(idField, gbc);

        // First Name field
        gbc.gridx = 0;
        gbc.gridy = 1;
        gbc.weightx = 0;
        inputPanel.add(new JLabel("First Name:"), gbc);
        
        gbc.gridx = 1;
        gbc.weightx = 1.0;
        nameField = new JTextField(15);
        inputPanel.add(nameField, gbc);

        // Last Name field
        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.weightx = 0;
        inputPanel.add(new JLabel("Last Name:"), gbc);
        
        gbc.gridx = 1;
        gbc.weightx = 1.0;
        gradeField = new JTextField(15);
        inputPanel.add(gradeField, gbc);

        // Buttons panel
        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 0));
        
        addButton = new JButton("Add");
        addButton.setFont(new Font("Arial", Font.BOLD, 14));
        addButton.addActionListener(e -> addRecord());
        buttonPanel.add(addButton);

        deleteButton = new JButton("Delete");
        deleteButton.setFont(new Font("Arial", Font.BOLD, 14));
        deleteButton.addActionListener(e -> deleteRecord());
        buttonPanel.add(deleteButton);

        gbc.gridx = 0;
        gbc.gridy = 3;
        gbc.gridwidth = 2;
        gbc.weightx = 1.0;
        inputPanel.add(buttonPanel, gbc);

        add(inputPanel, BorderLayout.SOUTH);
    }

    private void loadCSVData() {
        try (BufferedReader br = new BufferedReader(new FileReader("MOCK_DATA.csv"))) {
            String line;
            boolean firstLine = true;
            
            while ((line = br.readLine()) != null) {
                // Skip header line
                if (firstLine) {
                    firstLine = false;
                    continue;
                }
                
                // Split the CSV line
                String[] data = line.split(",");
                
                if (data.length == 8) {
                    tableModel.addRow(data);
                }
            }
            
            JOptionPane.showMessageDialog(this, 
                "Successfully loaded " + tableModel.getRowCount() + " student records from MOCK_DATA.csv",
                "Data Loaded", 
                JOptionPane.INFORMATION_MESSAGE);
                
        } catch (IOException e) {
            JOptionPane.showMessageDialog(this,
                "Error reading CSV file: " + e.getMessage() + "\n" +
                "Please ensure MOCK_DATA.csv is in the same directory as the program.",
                "File Error",
                JOptionPane.ERROR_MESSAGE);
        }
    }

    private void addRecord() {
        String studentId = idField.getText().trim();
        String firstName = nameField.getText().trim();
        String lastName = gradeField.getText().trim();

        if (studentId.isEmpty() || firstName.isEmpty() || lastName.isEmpty()) {
            JOptionPane.showMessageDialog(this,
                "Please fill in Student ID, First Name, and Last Name",
                "Input Error",
                JOptionPane.WARNING_MESSAGE);
            return;
        }

        // Add new row with default grade values
        tableModel.addRow(new Object[]{studentId, firstName, lastName, "0", "0", "0", "0", "0"});

        // Clear input fields
        idField.setText("");
        nameField.setText("");
        gradeField.setText("");
        
        // Focus back to ID field
        idField.requestFocus();
    }

    private void deleteRecord() {
        int selectedRow = table.getSelectedRow();

        if (selectedRow == -1) {
            JOptionPane.showMessageDialog(this,
                "Please select a row to delete",
                "No Selection",
                JOptionPane.WARNING_MESSAGE);
            return;
        }

        // Confirm deletion
        int confirm = JOptionPane.showConfirmDialog(this,
            "Are you sure you want to delete this record?",
            "Confirm Delete",
            JOptionPane.YES_NO_OPTION);

        if (confirm == JOptionPane.YES_OPTION) {
            tableModel.removeRow(selectedRow);
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new StudentRecordSystem());
    }
}