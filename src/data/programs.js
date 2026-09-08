const programs = [
  {
    id: 1,
    number: "01",
    title: "Operators & Variables",
    category: "PHP",
    shortDescription:
      "Understand variables and commonly used PHP operators.",

    aim:
      "To demonstrate variables and different types of operators in PHP.",

    algorithm: [
      "Declare two integer variables.",
      "Perform arithmetic operations.",
      "Demonstrate assignment and comparison operators.",
      "Demonstrate logical and increment/decrement operators.",
      "Display the results.",
      "Stop the program.",
    ],

    code: `<?php

$a = 20;
$b = 10;

echo "First Number: $a<br>";
echo "Second Number: $b<br><br>";

echo "Arithmetic Operators<br>";
echo "Addition: " . ($a + $b) . "<br>";
echo "Subtraction: " . ($a - $b) . "<br>";
echo "Multiplication: " . ($a * $b) . "<br>";
echo "Division: " . ($a / $b) . "<br>";
echo "Modulus: " . ($a % $b) . "<br><br>";

$c = $a;
$c += $b;

echo "Assignment Operator<br>";
echo "After c += b: $c<br><br>";

echo "Comparison Operators<br>";

echo "a == b: ";
echo ($a == $b) ? "True" : "False";
echo "<br>";

echo "a > b: ";
echo ($a > $b) ? "True" : "False";
echo "<br>";

echo "a < b: ";
echo ($a < $b) ? "True" : "False";
echo "<br><br>";

echo "Logical Operators<br>";

echo "(a > 10 && b < 20): ";
echo ($a > 10 && $b < 20) ? "True" : "False";
echo "<br>";

echo "(a > 30 || b < 20): ";
echo ($a > 30 || $b < 20) ? "True" : "False";
echo "<br><br>";

$x = 5;

echo "Increment and Decrement Operators<br>";
echo "Initial x: $x<br>";

$x++;
echo "After Increment: $x<br>";

$x--;
echo "After Decrement: $x<br>";

?>`,

    output: `First Number: 20
Second Number: 10

Arithmetic Operators
Addition: 30
Subtraction: 10
Multiplication: 200
Division: 2
Modulus: 0

Assignment Operator
After c += b: 30

Comparison Operators
a == b: False
a > b: True
a < b: False

Logical Operators
(a > 10 && b < 20): True
(a > 30 || b < 20): True

Increment and Decrement Operators
Initial x: 5
After Increment: 6
After Decrement: 5`,

    howItWorks: [
      "Variables store the values 20 and 10.",
      "Arithmetic operators perform calculations on the values.",
      "Comparison and logical operators check conditions.",
      "Increment and decrement change the value of a variable.",
    ],

    examTips: [
      "Remember the difference between = and ==.",
      "Know the basic arithmetic operators.",
      "Remember ++ increases a value by 1.",
      "Remember -- decreases a value by 1.",
    ],
  },

  {
    id: 2,
    number: "02",
    title: "Registration Form",
    category: "PHP",
    shortDescription:
      "Create a simple registration form using basic controls.",

    aim:
      "To create a simple registration form using basic HTML controls and PHP.",

    algorithm: [
      "Create a registration form.",
      "Add controls for name, email, age, gender, and course.",
      "Accept the values entered by the user.",
      "Check whether the form is submitted.",
      "Retrieve the submitted values using $_POST.",
      "Display the registration details.",
      "Stop the program.",
    ],

    code: `<?php

if (isset($_POST["submit"])) {

    $name = $_POST["name"];
    $email = $_POST["email"];
    $age = $_POST["age"];
    $gender = $_POST["gender"];
    $course = $_POST["course"];

    echo "<h2>Registration Details</h2>";

    echo "Name: $name<br>";
    echo "Email: $email<br>";
    echo "Age: $age<br>";
    echo "Gender: $gender<br>";
    echo "Course: $course<br>";
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Registration Form</title>
</head>

<body>

<h2>Student Registration</h2>

<form method="POST">

    Name:
    <input type="text" name="name" required>
    <br><br>

    Email:
    <input type="email" name="email" required>
    <br><br>

    Age:
    <input type="number" name="age" required>
    <br><br>

    Gender:
    <input type="radio" name="gender" value="Male" required>
    Male

    <input type="radio" name="gender" value="Female">
    Female

    <br><br>

    Course:
    <select name="course">
        <option value="B.Sc Computer Science">
            B.Sc Computer Science
        </option>

        <option value="BCA">
            BCA
        </option>

        <option value="B.Sc IT">
            B.Sc IT
        </option>
    </select>

    <br><br>

    <input type="submit" name="submit" value="Register">

</form>

</body>
</html>`,

    output: `Registration Details

Name: Saravanan
Email: saravanan@gmail.com
Age: 21
Gender: Male
Course: B.Sc Computer Science`,

    howItWorks: [
      "The form collects information from the user.",
      "The POST method sends the submitted values to PHP.",
      "PHP reads the values using $_POST.",
      "The entered details are displayed after submission.",
    ],

    examTips: [
      "Remember the form method: POST.",
      "Know how $_POST is used.",
      "Remember the name attribute of form controls.",
      "Understand the purpose of the submit button.",
    ],
  },

  {
    id: 3,
    number: "03",
    title: "Decision & Loops",
    category: "PHP",
    shortDescription:
      "Demonstrate decision-making and looping statements in PHP.",

    aim:
      "To demonstrate decision-making and looping statements in PHP.",

    algorithm: [
      "Store a student's mark.",
      "Use an if-else statement to check the result.",
      "Display PASS if the mark is 50 or above.",
      "Otherwise display FAIL.",
      "Use a for loop to display numbers from 1 to 5.",
      "Stop the program.",
    ],

    code: `<?php

$mark = 75;

echo "Mark: $mark<br><br>";

if ($mark >= 50) {
    echo "Result: PASS<br>";
} else {
    echo "Result: FAIL<br>";
}

echo "<br>Numbers from 1 to 5:<br>";

for ($i = 1; $i <= 5; $i++) {
    echo $i . "<br>";
}

?>`,

    output: `Mark: 75

Result: PASS

Numbers from 1 to 5:
1
2
3
4
5`,

    howItWorks: [
      "The mark is stored in the $mark variable.",
      "The if-else statement checks whether the mark is at least 50.",
      "The for loop starts at 1 and continues until 5.",
      "Each loop iteration displays the current number.",
    ],

    examTips: [
      "Remember the if-else syntax.",
      "Understand the three parts of a for loop.",
      "Know how the loop variable changes.",
      "Change the mark to test PASS and FAIL.",
    ],
  },
  {
  id: 4,
  number: "04",
  title: "File Handling",
  category: "PHP",
  shortDescription:
    "Open a file, write content into it, and close the file.",

  aim:
    "To demonstrate opening, writing, and closing a file using PHP.",

  algorithm: [
    "Open or create a file using fopen().",
    "Write content into the file using fwrite().",
    "Close the file using fclose().",
    "Display a success message.",
    "Stop the program.",
  ],

  code: `<?php

$file = fopen("student.txt", "w");

fwrite($file, "Welcome to PHP File Handling.");

fclose($file);

echo "File created and written successfully.";

?>`,

  output: `File created and written successfully.`,

  howItWorks: [
    "fopen() opens the file in write mode.",
    "fwrite() writes the given text into the file.",
    "fclose() closes the file after writing.",
  ],

  examTips: [
    "Remember fopen() is used to open a file.",
    "Remember fwrite() is used to write content.",
    "Remember fclose() is used to close the file.",
    "The mode w is used for writing.",
  ],
},
{
  id: 5,
  number: "05",
  title: "Append to a File",
  category: "PHP",
  shortDescription:
    "Add new content to an existing file without removing its old content.",

  aim:
    "To demonstrate appending contents to an existing file using PHP.",

  algorithm: [
    "Open the existing file using fopen() in append mode.",
    "Add new content using fwrite().",
    "Close the file using fclose().",
    "Display a success message.",
    "Stop the program.",
  ],

  code: `<?php

$file = fopen("student.txt", "a");

fwrite($file, "\\nThis content is appended to the file.");

fclose($file);

echo "Content appended successfully.";

?>`,

  output: `Content appended successfully.`,

  howItWorks: [
    "fopen() opens the existing file in append mode.",
    "The mode a keeps the existing content and adds new content at the end.",
    "fwrite() adds the new text.",
    "fclose() closes the file after the operation.",
  ],

  examTips: [
    "Remember a means append mode.",
    "Append mode keeps the existing content.",
    "Use fwrite() to add new content.",
    "Always close the file using fclose().",
  ],
},
{
  id: 6,
  number: "06",
  title: "Ascending Array Sort",
  category: "PHP",
  shortDescription:
    "Sort array elements from the smallest value to the largest value.",

  aim:
    "To sort the elements of an array in ascending order using PHP.",

  algorithm: [
    "Declare an array containing numbers.",
    "Use sort() to arrange the elements in ascending order.",
    "Display the sorted array elements.",
    "Stop the program.",
  ],

  code: `<?php

$numbers = array(50, 20, 40, 10, 30);

sort($numbers);

echo "Array elements in ascending order:<br>";

foreach ($numbers as $number) {
    echo $number . " ";
}

?>`,

  output: `Array elements in ascending order:
10 20 30 40 50`,

  howItWorks: [
    "The array contains five numbers in an unsorted order.",
    "sort() arranges the array elements from smallest to largest.",
    "foreach is used to display each element of the sorted array.",
  ],

  examTips: [
    "Remember sort() is used for ascending order.",
    "sort() changes the original array.",
    "Use foreach to display array elements one by one.",
  ],
},
{
  id: 7,
  number: "07",
  title: "Merge Two Arrays",
  category: "PHP",
  shortDescription:
    "Combine two arrays and store their elements in a new array.",

  aim:
    "To merge two arrays into a new array using PHP.",

  algorithm: [
    "Declare the first array.",
    "Declare the second array.",
    "Use array_merge() to combine both arrays.",
    "Store the result in a new array.",
    "Display the elements of the new array.",
    "Stop the program.",
  ],

  code: `<?php

$array1 = array("Apple", "Banana", "Mango");
$array2 = array("Orange", "Grapes", "Pineapple");

$newArray = array_merge($array1, $array2);

echo "Merged Array:<br>";

foreach ($newArray as $item) {
    echo $item . "<br>";
}

?>`,

  output: `Merged Array:
Apple
Banana
Mango
Orange
Grapes
Pineapple`,

  howItWorks: [
    "Two separate arrays are created.",
    "array_merge() combines the elements of both arrays.",
    "The merged result is stored in $newArray.",
    "foreach displays each element of the new array.",
  ],

  examTips: [
    "Remember array_merge() is used to combine arrays.",
    "The result can be stored in a new array.",
    "The elements of the first array appear before the second array.",
  ],
},
{
  id: 8,
  number: "08",
  title: "Customer Table",
  category: "MYSQL",
  shortDescription:
    "Create a customer table and insert five customer records using MySQL.",

  aim:
    "To create a customer table and insert five records into the table using MySQL.",

  algorithm: [
    "Create a database named market_db.",
    "Select the market_db database.",
    "Create the customer table with required fields.",
    "Insert five customer records into the table.",
    "Display the records using SELECT.",
    "Stop the program.",
  ],

  code: `CREATE DATABASE market_db;

USE market_db;

CREATE TABLE customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    product VARCHAR(100) NOT NULL,
    quantity INT NOT NULL
);

INSERT INTO customer
(customer_name, email, product, quantity)
VALUES
('Arun', 'arun@gmail.com', 'Rice', 5),
('Priya', 'priya@gmail.com', 'Milk', 3),
('Karthik', 'karthik@gmail.com', 'Wheat', 4),
('Meena', 'meena@gmail.com', 'Sugar', 2),
('Vijay', 'vijay@gmail.com', 'Cooking Oil', 3);

SELECT * FROM customer;`,

  output: `customer_id | customer_name | email              | product      | quantity
1           | Arun          | arun@gmail.com     | Rice         | 5
2           | Priya         | priya@gmail.com    | Milk         | 3
3           | Karthik       | karthik@gmail.com  | Wheat        | 4
4           | Meena         | meena@gmail.com    | Sugar        | 2
5           | Vijay         | vijay@gmail.com    | Cooking Oil  | 3`,

  howItWorks: [
    "CREATE DATABASE creates the market_db database.",
    "CREATE TABLE creates the customer table with five columns.",
    "INSERT INTO adds five customer records.",
    "SELECT * displays all records from the customer table.",
  ],

  examTips: [
    "Remember CREATE TABLE is used to create a table.",
    "PRIMARY KEY uniquely identifies each customer.",
    "AUTO_INCREMENT automatically generates the customer ID.",
    "INSERT INTO is used to add records.",
    "SELECT * displays all columns and records.",
  ],
},
{
  id: 9,
  number: "09",
  title: "MySQL String Functions",
  category: "MYSQL",
  shortDescription:
    "Demonstrate commonly used string functions in MySQL with student data.",

  aim:
    "To implement various string functions in MySQL.",

  algorithm: [
    "Create a student table and insert sample records.",
    "Use UPPER() and LOWER() to change letter case.",
    "Use LENGTH() and CHAR_LENGTH() to find string length.",
    "Use CONCAT() and CONCAT_WS() to combine strings.",
    "Use LEFT(), RIGHT(), and SUBSTRING() to extract characters.",
    "Use REPLACE() and TRIM() to modify strings.",
    "Use REVERSE(), LOCATE(), and LPAD() for string operations.",
    "Display the results.",
    "Stop the program.",
  ],

  code: `CREATE DATABASE student_string_db;

USE student_string_db;

CREATE TABLE student (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    course VARCHAR(100)
);

INSERT INTO student VALUES
(1, 'Arun Kumar', 'Computer Science'),
(2, 'Priya Devi', 'Information Technology'),
(3, 'Karthik Rajan', 'Computer Applications');

SELECT UPPER(name) AS upper_name
FROM student;

SELECT LOWER(name) AS lower_name
FROM student;

SELECT LENGTH(name) AS name_length
FROM student;

SELECT CHAR_LENGTH(name) AS character_length
FROM student;

SELECT CONCAT(name, ' - ', course) AS student_details
FROM student;

SELECT CONCAT_WS(' | ', name, course) AS student_details
FROM student;

SELECT LEFT(name, 4) AS first_four_characters
FROM student;

SELECT RIGHT(name, 4) AS last_four_characters
FROM student;

SELECT SUBSTRING(name, 1, 5) AS part_of_name
FROM student;

SELECT REPLACE(course, 'Computer', 'C')
AS changed_course
FROM student;

SELECT TRIM('   PHP MYSQL   ')
AS trimmed_text;

SELECT REVERSE(name) AS reversed_name
FROM student;

SELECT LOCATE('Kumar', name) AS position
FROM student
WHERE id = 1;

SELECT LPAD(name, 15, '*') AS padded_name
FROM student;`,

  output: `UPPER: ARUN KUMAR
LOWER: arun kumar
LENGTH: 10
CHAR_LENGTH: 10
CONCAT: Arun Kumar - Computer Science
CONCAT_WS: Arun Kumar | Computer Science
LEFT: Arun
RIGHT: umar
SUBSTRING: Arun 
REPLACE: C Science
TRIM: PHP MYSQL
REVERSE: ramuK nurA
LOCATE: 6
LPAD: *****Arun Kumar`,

  howItWorks: [
    "UPPER() converts text to uppercase.",
    "LOWER() converts text to lowercase.",
    "LENGTH() returns the length of a string in bytes.",
    "CHAR_LENGTH() returns the number of characters.",
    "CONCAT() joins multiple strings together.",
    "CONCAT_WS() joins strings using a separator.",
    "LEFT() returns characters from the beginning of a string.",
    "RIGHT() returns characters from the end of a string.",
    "SUBSTRING() extracts a portion of a string.",
    "REPLACE() replaces matching text with new text.",
    "TRIM() removes leading and trailing spaces.",
    "REVERSE() reverses a string.",
    "LOCATE() finds the position of a substring.",
    "LPAD() adds characters to the left side of a string.",
  ],

  examTips: [
    "Remember UPPER() and LOWER() are used for changing case.",
    "LENGTH() and CHAR_LENGTH() are used to find string length.",
    "CONCAT() is used to join strings.",
    "LEFT(), RIGHT(), and SUBSTRING() extract parts of a string.",
    "REPLACE() changes matching text.",
    "TRIM() removes extra spaces at the beginning and end.",
    "REVERSE() reverses the string.",
    "LOCATE() returns the position of a substring.",
    "LPAD() adds characters to the left side.",
  ],
},
{
  id: 10,
  number: "10",
  title: "User-Defined Functions",
  category: "PHP",
  shortDescription:
    "Create and use user-defined functions with parameters and return values.",

  aim:
    "To implement the concept of user-defined functions using PHP.",

  algorithm: [
    "Define a function to calculate the total of three marks.",
    "Pass three marks as parameters to the function.",
    "Return the calculated total.",
    "Define another function to calculate the average.",
    "Pass the total as a parameter.",
    "Return the calculated average.",
    "Display the total and average.",
    "Stop the program.",
  ],

  code: `<?php

function calculateTotal($mark1, $mark2, $mark3)
{
    return $mark1 + $mark2 + $mark3;
}

function calculateAverage($total)
{
    return $total / 3;
}

$mark1 = 75;
$mark2 = 80;
$mark3 = 70;

$total = calculateTotal($mark1, $mark2, $mark3);
$average = calculateAverage($total);

echo "Student Marks<br>";
echo "Mark 1: $mark1<br>";
echo "Mark 2: $mark2<br>";
echo "Mark 3: $mark3<br>";
echo "Total: $total<br>";
echo "Average: $average<br>";

?>`,

  output: `Student Marks
Mark 1: 75
Mark 2: 80
Mark 3: 70
Total: 225
Average: 75`,

  howItWorks: [
    "calculateTotal() is a user-defined function with three parameters.",
    "It adds the three marks and returns the total.",
    "calculateAverage() receives the total as a parameter.",
    "It calculates and returns the average.",
    "The returned values are stored in variables and displayed.",
  ],

  examTips: [
    "A user-defined function is created by using the function keyword.",
    "Parameters are values passed to a function.",
    "return is used to send a value back from the function.",
    "A function is called using its function name followed by parentheses.",
    "This program demonstrates parameterized functions with return values.",
  ],
},
{
  id: 11,
  number: "11",
  title: "Update, Alter & Delete",
  category: "MYSQL",
  shortDescription:
    "Update records, alter the customer table, and delete a record using MySQL.",

  aim:
    "To perform update, alter, and delete operations on records stored in the customer table.",

  algorithm: [
    "Create the market_operations_db database.",
    "Select the database.",
    "Create the customer table and insert five records.",
    "Update an existing customer record.",
    "Alter the table by adding a new column.",
    "Update values in the new column.",
    "Delete a customer record.",
    "Display the final records.",
    "Stop the program.",
  ],

  code: `CREATE DATABASE market_operations_db;

USE market_operations_db;

CREATE TABLE customer (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50),
    product VARCHAR(50),
    quantity INT
);

INSERT INTO customer VALUES
(1, 'Arun', 'Rice', 5),
(2, 'Priya', 'Milk', 3),
(3, 'Karthik', 'Wheat', 4),
(4, 'Meena', 'Sugar', 2),
(5, 'Vijay', 'Oil', 3);

SELECT * FROM customer;

UPDATE customer
SET product = 'Basmati Rice'
WHERE customer_id = 1;

ALTER TABLE customer
ADD price INT;

UPDATE customer
SET price = 500
WHERE customer_id = 1;

UPDATE customer
SET price = 150
WHERE customer_id = 2;

UPDATE customer
SET price = 300
WHERE customer_id = 3;

UPDATE customer
SET price = 100
WHERE customer_id = 4;

UPDATE customer
SET price = 250
WHERE customer_id = 5;

DELETE FROM customer
WHERE customer_id = 5;

SELECT * FROM customer;`,

  output: `customer_id | customer_name | product       | quantity | price
1           | Arun          | Basmati Rice  | 5        | 500
2           | Priya         | Milk          | 3        | 150
3           | Karthik       | Wheat         | 4        | 300
4           | Meena         | Sugar         | 2        | 100`,

  howItWorks: [
    "UPDATE changes existing data in a record.",
    "ALTER TABLE changes the structure of the table by adding the price column.",
    "The price column is then given values for the records.",
    "DELETE removes the customer whose customer_id is 5.",
    "The final SELECT displays the remaining records.",
  ],

  examTips: [
    "UPDATE is used to modify existing records.",
    "Always use a WHERE condition with UPDATE when changing a specific record.",
    "ALTER TABLE is used to change the structure of a table.",
    "ADD is used with ALTER TABLE to add a new column.",
    "DELETE is used to remove records.",
    "Always use WHERE with DELETE when removing a specific record.",
  ],
},
{
  id: 12,
  number: "12",
  title: "Retrieve MySQL Data",
  category: "PHP",
  shortDescription:
    "Connect PHP with MySQL and retrieve records from a database.",

  aim:
    "To retrieve and display data from a MySQL database using PHP.",

  algorithm: [
    "Connect PHP to the MySQL database.",
    "Check whether the database connection is successful.",
    "Execute a SELECT query to retrieve records.",
    "Check whether the query is successful.",
    "Fetch the records using mysqli_fetch_assoc().",
    "Display the retrieved records.",
    "Close the database connection.",
    "Stop the program.",
  ],

  code: `<?php

$conn = mysqli_connect("localhost", "root", "", "student_system");

if (!$conn) {
    die("Database connection failed");
}

$sql = "SELECT * FROM students";

$result = mysqli_query($conn, $sql);

if (!$result) {
    die("SQL Error: " . mysqli_error($conn));
}

echo "Student Records<br><br>";

while ($row = mysqli_fetch_assoc($result)) {
    echo "ID: " . $row["id"] . "<br>";
    echo "Name: " . $row["name"] . "<br>";
    echo "Email: " . $row["email"] . "<br>";
    echo "Age: " . $row["age"] . "<br>";
    echo "Course: " . $row["course"] . "<br>";
    echo "Phone: " . $row["phone"] . "<br>";
    echo "--------------------------<br><br>";
}

mysqli_close($conn);

?>`,

  output: `Student Records

ID: 1
Name: Saravanan
Email: saravanan@gmail.com
Age: 21
Course: B.Sc Computer Science
Phone: 9876543210
--------------------------

ID: 2
Name: Arun
Email: arun@gmail.com
Age: 20
Course: BCA
Phone: 9876543211
--------------------------`,

  howItWorks: [
    "mysqli_connect() establishes a connection between PHP and MySQL.",
    "The SELECT query retrieves records from the students table.",
    "mysqli_query() executes the SQL query.",
    "mysqli_fetch_assoc() fetches each record as an associative array.",
    "The retrieved values are displayed using echo.",
    "mysqli_close() closes the database connection.",
  ],

  examTips: [
    "Remember mysqli_connect() is used to connect PHP with MySQL.",
    "SELECT is used to retrieve records.",
    "mysqli_query() executes the SQL query.",
    "mysqli_fetch_assoc() fetches records one by one.",
    "Use mysqli_close() to close the connection.",
  ],
},

];

export default programs;