<?php
$name = $_POST['name'];
$url = $_POST['url'];
$openid = $_POST['openid'];
$loginTime = $_POST['loginTime'];
$servername = "localhost";
$username = "root";
$password = "root";//服务器中连接数据库的密码
$dbname = "water";//使用的数据库名
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("connect server fail: " . $conn->connect_error);
}
$sql = "INSERT INTO user (username,headimg,openid,loginTime) VALUES ('$name', '$url','$openid','$loginTime')";
if ($conn->query($sql) === TRUE) {
    echo "insert success";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>