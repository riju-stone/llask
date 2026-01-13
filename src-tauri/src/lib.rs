// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{WebviewUrl, WebviewWindowBuilder};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![])
        .setup(|app| {
            let window = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("Ask")
                .inner_size(600.0, 300.0)
                .decorations(false)
                .transparent(true)
                // .always_on_top(true)
                .build()
                .unwrap();

            // set background color only when building for macOS
            #[cfg(target_os = "macos")]
            {
                use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

                // Apply blur effect with 10px rounded corners
                let blur = NSVisualEffectMaterial::FullScreenUI;
                // let blur = NSVisualEffectMaterial::FullScreenUI;

                // let blur = NSVisualEffectMaterial::Sidebar (Current, thick frosted glass)
                // let blur = NSVisualEffectMaterial::HudWindow (Darker, thinner)
                // let blur = NSVisualEffectMaterial::Menu (Thin, standard menu transparency)
                // let blur = NSVisualEffectMaterial::Popover (Similar to Menu)
                // let blur = NSVisualEffectMaterial::UnderWindowBackground (Standard window blur)
                // let blur = NSVisualEffectMaterial::UnderPageBackground (Subtle)
                // let blur = NSVisualEffectMaterial::FullScreenUI (Dark and thick)

                apply_vibrancy(&window, blur, None, Some(10.0))
                    .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
            }

            #[cfg(target_os = "windows")]
            {
                use window_vibrancy::apply_blur;
                apply_blur(&window, Some(10.0)).expect("Unsupported platform! 'apply_blur' is only supported on Windows");
            }

            // Register cleanup handler for when the app is closing
            window.on_window_event(
                move |event| {
                    if let tauri::WindowEvent::CloseRequested { .. } = event {}
                },
            );

            Ok(())
        })
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    }
