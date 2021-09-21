<?php 
	$username = $_POST['username'];
	$password = $_POST['password'];
	$hashed_password = password_hash($password, PASSWORD_DEFAULT);

	
	$conn = new mysqli('dbpublic.c8qhphxyl0rn.eu-west-1.rds.amazonaws.com','root','12345678','user_module');
	if($conn->connect_error){
		die('Connection Failed : '.$conn->connect_error);
	}else{
/*		

			$stmt = $conn->prepare("insert into user_login(username, password)
			values(?, ?)");
			$stmt->bind_param("ss",$username, $hashed_password);
			$stmt->execute();
			$stmt->close();
			$conn->close();
	}
*/

		$qry = "SELECT username, password FROM user_login";
		$result = mysqli_query($conn, $qry);
		$row = mysqli_fetch_array($result);
		
		$db_user = $row['username'];
		$db_pass = password_verify($password, $row['password']);
		
		if($username == $db_user && $db_pass )
			{
				header('Location: WAP.html');
			}
		else
			{
				header('Location: index.html');
			}
		}
?>
