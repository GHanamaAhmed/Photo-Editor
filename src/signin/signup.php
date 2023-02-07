<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
class signup
{
    public $con;
    public $username;
    public $email;
    public $pwd;
    public $fname;
    public $lname;
    public $tel;
    public $company;
    public function set_inf()
    {
        $this->con = new mysqli("localhost", "root", "", "photoshop");
        $data = file_get_contents("php://input");
        $data = json_decode($data, true);
        $res = array("msg" => "", "res" => false);
        if (isset($data["username"])) {
            $this->username = $data["username"];
            $this->email = $data["email"];
            $this->pwd = $data["pwd"];
            $this->fname = $data["fname"];
            $this->lname = $data["lname"];
            $this->tel = $data["tel"];
            $this->company = $data["company"];
            $query = "select COUNT(*) from user where username='" . $data["username"] . "'";
            $count = mysqli_query($this->con, $query);
            $count = mysqli_fetch_row($count)[0];
            $query = "select COUNT(*) from user where email='" . $data["email"] . "'";
            $count2 = mysqli_query($this->con, $query);
            $count2 = mysqli_fetch_row($count2)[0];
            $query = "select COUNT(*) from user where tel='" . $data["tel"] . "'";
            $count3 = mysqli_query($this->con, $query);
            $count3 = mysqli_fetch_row($count3)[0];
            if (!$count && !$count2 && !$count3) {
                $query = "insert into `user`(`username`, `email`, `pwd`, `fname`, `lname`, `tel`, `company`) VALUES ('$this->username','$this->email','$this->pwd','$this->fname','$this->lname','$this->tel','$this->company')";
                mysqli_query($this->con, $query);
                $res["msg"] = "Sign up secsussful";
                $res["res"] = true;
                echo json_encode($res);
            } else {
                $res["msg"] = [];
                if ($count) {
                    array_push($res["msg"], "username is exist!");
                }
                if ($count2) {
                    array_push($res["msg"], "email is exist!");
                }
                if ($count3) {
                    array_push($res["msg"], "tel is exist!");
                }
                echo json_encode($res);
            }
        } else {
            $res["msg"] = "entry your data plase!";
            echo json_encode($res);
        }
    }
}
$user = new signup();
$user->set_inf();
