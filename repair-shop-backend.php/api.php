<?php
header("Content-Type: application/json");
require 'db.php';

$action = $_GET['action'] ?? ''; // Fetch the action parameter
$id = $_GET['id'] ?? null; // Fetch the ID parameter if provided

switch ($action) {
    case 'getCustomers':
        // Retrieve all customers
        $stmt = $pdo->query("SELECT * FROM customers");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

        case 'addCustomer':
            $data = json_decode(file_get_contents("php://input"), true);
            $image = $_FILES['image']['name'];
            move_uploaded_file($_FILES['image']['tmp_name'], "uploads/" . $image);
        
            $stmt = $pdo->prepare("INSERT INTO customers (name, email, phone, image) VALUES (:name, :email, :phone, :image)");
            $stmt->execute([
                ':name' => $data['name'],
                ':email' => $data['email'],
                ':phone' => $data['phone'],
                ':image' => $image
            ]);
            echo json_encode(['message' => 'Customer added successfully']);
            break;
    
    case 'updateCustomer':
        $data = json_decode(file_get_contents("php://input"), true);
        $image = $_FILES['image']['name'];
        move_uploaded_file($_FILES['image']['tmp_name'], "uploads/" . $image);
    
        $stmt = $pdo->prepare("UPDATE customers SET name = :name, email = :email, phone = :phone, image_path = :image_path WHERE id = :id");
        $stmt->execute([
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':phone' => $data['phone'],
            ':image' => $image
        ]);
        echo json_encode(['message' => 'Customer updated successfully']);
        break;
        
        
    case 'deleteCustomer':
        // Delete a customer by ID
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM customers WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['message' => 'Customer deleted successfully']);
        } else {
            echo json_encode(['message' => 'Invalid customer ID']);
        }
        break;

    default:
        // Handle invalid actions
        echo json_encode(['message' => 'Invalid action']);
        break;
}
?>
