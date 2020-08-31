<?php
$realname = $_GET['username'];
$servername = "localhost";
$username = "root";
$password = "root";//服务器中连接数据库的密码
$dbname = "water";//使用的数据库名
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败： " . $conn->connect_error);
}
$charset=mysqli_character_set_name($conn);  //返回数据库默认字符集的编码utf8
echo "默认字符集为: " . $charset;
printf("----------1111 realname=".$realname."!<br/>");
$bianma = mysqli_query($conn,'set names utf8');
echo "*****".$bianma."****";
    $sql = "SELECT * FROM user WHERE realname='$realname'";
    $result = $conn->query($sql);

// 返回记录数
$rowcount=mysqli_num_rows($result);
echo "rowcount=".$rowcount;
printf("总共返回 %d 行数据。",$rowcount);
if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
        echo "user_id: " . $row["user_id"]. " - username: " . $row["username"]. " - phone:" . $row["phone"].
            " - headimg:" . $row["headimg"]. " - openid:" . $row["openid"]." - loginTime:" . $row["loginTime"].
            " - address:" . $row["address"]." - realname:" . $row["realname"]."!<br/>";
    }
} else {
    echo "0 结果";
}
$conn->close();
?>