<?php
  $data = json_decode(file_get_contents('php://input'), true);
  $to = "ravr4864@gmail.com";
  $subject = "Як з нами зв’язатися";
  
  $message = 'Ім’я: '.$data["Ім’я"].' Телефон: '.$data["Телефон"].' E-mail:'.$data["E-mail"].' Вибраний пункт:'.$data["Вибраний пункт"].' Коментар:'.$data["Коментар"];
  
  $header = "From:abc@somedomain.com \r\n";
  $header .= "Cc:afgh@somedomain.com \r\n";
  $header .= "MIME-Version: 1.0\r\n";
  $header .= "Content-type: text/html\r\n";
  
  $retval = mail ($to,$subject,$message,$header);

  if($retval) {
    echo 'success';
  } else {
    echo 'failed';
  }
