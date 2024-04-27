#! /usr/bin/env node

import inquirer from "inquirer";

const studentId: number = Math.floor(10000 + Math.random() * 90000);

let accountBalance: number = 0;

const studentData = await inquirer.prompt([
    {
        name: "studentName",
        type: "input",
        message: "Enter student name:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    },
    {
        name: "selectedCourse",
        type: "list",
        message: "Select the course to enroll",
        choices: ["Web Development", "Data Science", "Mobile App Development", "Machine Learning", "Cybersecurity"]
    }
]);

const courseFees: { [key: string]: number } = {
    "Web Development": 3000,
    "Data Science": 4000,
    "Mobile App Development": 5000,
    "Machine Learning": 6000,
    "Cybersecurity": 7000
};

console.log(`\nCourse Fees: ${courseFees[studentData.selectedCourse]}\n`);
console.log(`Account Balance: ${accountBalance}\n`);

const paymentInfo = await inquirer.prompt([
    {
        name: "paymentMethod",
        type: "list",
        message: "Select payment method",
        choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
    },
    {
        name: "paymentAmount",
        type: "input",
        message: "Enter payment amount:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    }
]);

console.log(`\nYou selected ${paymentInfo.paymentMethod} as the payment method\n`);

const courseFee = courseFees[studentData.selectedCourse];
const paymentAmount = parseFloat(paymentInfo.paymentAmount);

if (paymentAmount >= courseFee) {
    console.log(`Congratulations, you have successfully enrolled in ${studentData.selectedCourse}.\n`);

    let userChoice = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View status", "Exit"]
        }
    ])

    if (userChoice.action === "View status") {
        console.log("\nStatus:\n");
        console.log(`Student Name: ${studentData.studentName}`);
        console.log(`Student ID: ${studentId}`);
        console.log(`Course: ${studentData.selectedCourse}`);
        console.log(`Course Fees Paid: ${paymentAmount}`);
        console.log(`Account Balance: ${accountBalance += paymentAmount}`);
    }

} else {
    console.log("Insufficient payment amount for the selected course\n");
}
