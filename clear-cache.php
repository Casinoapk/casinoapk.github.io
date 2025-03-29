<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (defined('W3TC')) {
        require_once WP_CONTENT_DIR . '/plugins/w3-total-cache/w3-total-cache-api.php';
    }

    if (class_exists('W3TC\\Util_Admin')) {
        W3TC\Util_Admin::flush_all();
        echo json_encode(["status" => "success", "message" => "Кэш очищен!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Ошибка: W3 Total Cache API недоступен."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Неверный метод запроса."]);
}
?>
