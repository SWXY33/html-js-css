<?php
$realname = $_GET['username'];
$servername = "localhost";
$username = "root";
$password = "root";//服务器中连接数据库的密码
$dbname = "water";//使用的数据库名
$arr = array ();//创建json数组
$userIdArr = array ();
$waterIdArr = array ();
$waterDataArr = array ();
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败： " . $conn->connect_error);
}


$bianma = mysqli_query($conn,'set names utf8');

    $sql = "SELECT * FROM user WHERE realname='$realname'";
    $result = $conn->query($sql);
// 返回记录数
$rowcount=mysqli_num_rows($result);
if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
        array_push($userIdArr,$row["user_id"]);
// 创建一个数组，其中包含具有键值对的数组
            // 每个数组都将被转换为一个对象
         $arr1 =   array(
                "user_id" => $row["user_id"],
                "username" => $row["username"],
                "phone" => $row["phone"],
                "headimg" => $row["headimg"],
                "openid" => $row["openid"],
                "loginTime" =>$row["loginTime"],
                "address" => $row["address"],
                "realname" => $row["realname"],
            );
        array_push($arr,$arr1);

       /* echo "user_id: " . $row["user_id"]. " - username: " . $row["username"]. " - phone:" . $row["phone"].
            " - headimg:" . $row["headimg"]. " - openid:" . $row["openid"]." - loginTime:" . $row["loginTime"].
            " - address:" . $row["address"]." - realname:" . $row["realname"]."!<br/>";*/
    }
} else {
    echo "0 结果";
}

echo (json_encode($arr));
$conn->close();

?>