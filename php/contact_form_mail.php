<?php
  $name = $_GET['name'];
  $nachname = $_GET['mail'];
  $content = $_GET['content'];

  $msg = "$name $nachname\n $content"

  mail("lipka.bastian04@gmail.com", "@shademedia mail form $name $nachname", $msg);
?>
