<?php
    session_start();
?>
    <!DOCTYPE html>
<html>
   <head>
       <title>Repair Shop-error</title>
       <link rel="stylesheet" type="text/css" href="css/main.css" />       
   </head>
   <body>
       <?php include("header.php"); ?>
       <main>
        <h1>Error</h1>
        
        <p><?php echo $_SESSION["add_error"]; ?></p>
       </main>
       <?php include("footer.php"); ?>
   </body>
</html>