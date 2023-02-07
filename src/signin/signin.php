<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
class signin
{
    public $con;
    public $username;
    public $email;
    public $password;
    public function set_info()
    {
        $response = array("mes" => "", "res" => false);
        $this->con = new mysqli("localhost", "root", "", "photoshop");
        $data = file_get_contents("php://input");
        $data = json_decode($data, true);
        if (isset($data["username"])) {
            $username = $data["username"];
            $password = $data["password"];
            $count = mysqli_query($this->con, "select COUNT(*) from `user` where username='" . $username."'");
            $count = mysqli_fetch_row($count)[0];
            if ($count) {
                $count = mysqli_query($this->con, "select COUNT(*) from `user` where username='" . $username . "' and pwd='" . $password."'");
                $count = mysqli_fetch_row($count)[0];
                if ($count) {
                    $response["res"] = true;
                    $response["mes"] = "correct";
                    echo json_encode($response);
                } else {
                    $response["res"] = false;
                    $response["mes"] = "password incorrect!";
                    echo json_encode($response);
                }
            } else {
                $response["res"] = false;
                $response["mes"] = "username dont exist!";
                echo json_encode($response);
            }
        } elseif (isset($data["email"])) {
            $email = $data["email"];
            $password = $data["password"];
            $count = mysqli_query($this->con, "select COUNT(*) from `user` where email='" . $email."'");
            $count = mysqli_fetch_row($count)[0];
            if ($count) {
                $count = mysqli_query($this->con, "select COUNT(*) from `user` where email='" . $email . "' and pwd='" . $password."'");
                $count = mysqli_fetch_row($count)[0];
                if ($count) {
                    $response["res"] = true;
                    $response["mes"] = "correct";
                    echo json_encode($response);
                } else {
                    $response["res"] = false;
                    $response["mes"] = "password incorrect!";
                    echo json_encode($response);
                }
            } else {
                $response["res"] = false;
                $response["mes"] = "email dont exist!";
                echo json_encode($response);
            }
        } else {
            $response["res"] = false;
            $response["mes"] = "entry your data please!";
            echo json_encode($response);
        }
    }
}
$user=new signin();
$user->set_info();