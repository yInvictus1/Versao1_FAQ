<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $data = json_decode(file_get_contents("php://input"), true);

  $mensagem = "[" . date("Y-m-d H:i:s") . "] ";
  $mensagem .= "Usuário: " . $data["usuario"] . "\n";
  $mensagem .= "Bot: " . $data["bot"] . "\n\n";

  file_put_contents("conversas.txt", $mensagem, FILE_APPEND);
  echo json_encode(["status" => "ok"]);
}
?>