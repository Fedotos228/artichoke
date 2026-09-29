<?php
/**
 * Plugin Name: Artichoke Revalidate Webhook
 * Description: Notifies the Next.js site when a project is published, updated, trashed or deleted.
 *
 * Install: copy to wp-content/mu-plugins/ and add to wp-config.php:
 *   define('ARTICHOKE_REVALIDATE_URL', 'https://YOUR-SITE/api/revalidate');
 *   define('ARTICHOKE_REVALIDATE_SECRET', 'same value as REVALIDATE_SECRET in Next.js');
 */

function artichoke_revalidate($post_id) {
    if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) return;
    $post = get_post($post_id);
    if (!$post || $post->post_type !== 'projects') return;
    if (!defined('ARTICHOKE_REVALIDATE_URL') || !defined('ARTICHOKE_REVALIDATE_SECRET')) return;

    wp_remote_post(add_query_arg('secret', ARTICHOKE_REVALIDATE_SECRET, ARTICHOKE_REVALIDATE_URL), [
        'timeout' => 5,
        'blocking' => false,
        'headers' => ['Content-Type' => 'application/json'],
        'body' => wp_json_encode(['type' => 'project', 'slug' => $post->post_name]),
    ]);
}

// Publish / update / status change (draft, trash, restore).
add_action('save_post_projects', 'artichoke_revalidate');
add_action('transition_post_status', function ($new, $old, $post) {
    if ($new !== $old) artichoke_revalidate($post->ID);
}, 10, 3);
// Trash and permanent delete.
add_action('wp_trash_post', 'artichoke_revalidate');
add_action('before_delete_post', 'artichoke_revalidate');
