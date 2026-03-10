// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{Arc, Mutex};
use tauri::{Manager, RunEvent};
use tauri_plugin_shell::{process::CommandChild, ShellExt};

fn start_api_server(app_handle: tauri::AppHandle) -> Result<(), String> {
    if let Some(state) = app_handle.try_state::<Arc<Mutex<Option<CommandChild>>>>() {
        let child_process = state.lock().unwrap();
        if child_process.is_some() {
            println!("api server is already running");
            return Ok(());
        }
    }
    let api_cmd = app_handle
        .shell()
        .sidecar("api")
        .unwrap()
        .arg("--platform=lite")
        .arg("--port=6521");
    let (_rv, child) = api_cmd.spawn().map_err(|err| err.to_string())?;

    if let Some(state) = app_handle.try_state::<Arc<Mutex<Option<CommandChild>>>>() {
        *state.lock().unwrap() = Some(child);
    } else {
        return Err("failed to access api server state".to_string());
    }

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            app.manage(Arc::new(Mutex::new(None::<CommandChild>)));
            let app_handle = app.handle().clone();
            println!("starting api server");
            start_api_server(app_handle).map_err(|err| err.to_string())?;
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|app_handle, ev| match ev {
            RunEvent::ExitRequested { .. } => {
                if let Some(state) = app_handle.try_state::<Arc<Mutex<Option<CommandChild>>>>() {
                    let mut child_process = state.lock().unwrap();
                    if let Some(child) = child_process.take() {
                        let _ = child.kill().unwrap();
                    }
                }
            }
            _ => {}
        })
}
