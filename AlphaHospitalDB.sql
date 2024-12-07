-- Drop the database if it exists
DROP DATABASE IF EXISTS AlphaHospitalDB;

-- Create the new database
CREATE DATABASE AlphaHospitalDB;

-- Use the newly created database
USE AlphaHospitalDB;

-- Create Doctors table
CREATE TABLE Doctors (
    DoctorID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DOB DATE,
    CNIC VARCHAR(15),
    Specialization VARCHAR(100),
    Gender VARCHAR(10),
    Role VARCHAR(20),
    Experience INT,
    Education VARCHAR(255), -- New field for doctor education
    SatisfiedPatients INT,  -- New field for patient satisfaction percentage
    Fee DECIMAL(10, 2),     -- New field for doctor consultation fee
    Availability VARCHAR(255), -- New field for doctor availability
    Password NVARCHAR(255)
);

-- Create Patients table
CREATE TABLE Patients (
    PatientID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DOB DATE,
    CNIC VARCHAR(15),
    MedicalHistory TEXT,
    Password NVARCHAR(255)
);

-- Create Appointments table (New)
CREATE TABLE Appointments (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    DoctorID INT,
    Date DATE,
    Time TIME,
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);

-- Create Feedback table (New)
CREATE TABLE Feedback (
    FeedbackID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    DoctorID INT,
    Feedback TEXT,
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);

-- Insert sample data into Doctors table
INSERT INTO Doctors (FirstName, LastName, DOB, CNIC, Specialization, Gender, Role, Experience, Education, SatisfiedPatients, Fee, Availability, Password)
VALUES
('John', 'Doe', '1990-01-01', '12345-6789012-3', 'Cardiology', 'Male', 'Physician', 10, 'MBBS, FCPS', 95, 2000.00, 'Monday-Friday 9am-5pm', 'hashed_password'),
('Jane', 'Smith', '1985-05-12', '98765-4321012-4', 'Dermatology', 'Female', 'Consultant', 8, 'MBBS, DDerm', 90, 1500.00, 'Tuesday-Thursday 10am-4pm', 'hashed_password');

-- Insert sample data into Patients table
INSERT INTO Patients (FirstName, LastName, DOB, CNIC, MedicalHistory, Password)
VALUES
('Alice', 'Brown', '1995-03-15', '11111-2222233-4', 'No significant history', 'hashed_password'),
('Bob', 'White', '1992-07-20', '55555-6666677-8', 'Asthma', 'hashed_password');

-- Insert sample data into Appointments table
INSERT INTO Appointments (PatientID, DoctorID, Date, Time)
VALUES
(1, 1, '2024-12-10', '10:00:00'),
(2, 2, '2024-12-12', '11:30:00');

-- Insert sample data into Feedback table
INSERT INTO Feedback (PatientID, DoctorID, Feedback)
VALUES
(1, 1, 'Very professional and helpful.'),
(2, 2, 'Excellent consultation and care.');


INSERT INTO Doctors (FirstName, LastName, DOB, CNIC, Specialization, Gender, Role, Experience, Education, SatisfiedPatients, Fee, Availability, Password)
VALUES
('John', 'Fade', '1990-01-01', '12325-6789012-3', 'Cardiology', 'Male', 'Physician', 9, 'MBBS, FCPS', 95, 2000.00, 'Monday-Friday 9am-5pm', '2345'),
('Jane', 'Halley', '1985-05-12', '91765-4321012-4', 'Dermatology', 'Female', 'Consultant', 8, 'MBBS, DDerm', 90, 1500.00, 'Tuesday-Thursday 10am-4pm', 'ab2345');
-- Verify data with SELECT queries
SELECT * FROM Doctors;
SELECT * FROM Patients;
SELECT * FROM Appointments;
SELECT * FROM Feedback;
