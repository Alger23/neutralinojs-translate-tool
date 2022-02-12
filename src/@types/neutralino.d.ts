// Type definitions for Neutralino 3.2.0
// Project: https://github.com/neutralinojs
// Definitions project: https://github.com/neutralinojs/neutralino.js

declare namespace Neutralino {

    declare namespace filesystem {
        interface ReadFileResponse {
            data: string;
            success: boolean;
        }
        type EntryType = "FILE" | "DIRECTORY";
        interface FileOrDirectoryEntry {
            entry: string;
            type: EntryType;
        }
        interface FileOrDirectoryEntries {
            entries: Array<FileOrDirectoryEntry>;
        }
        interface FileStats {
            size: number;
            isFile: boolean;
            isDirectory: boolean;
        }
        function createDirectory(path: string): Promise<any>;
        function removeDirectory(path: string): Promise<any>;
        function writeFile(path: string, data: string): Promise<any>;
        function writeBinaryFile(path: string, data: ArrayBuffer): Promise<any>;
        function readFile(path: string): Promise<ReadFileResponse>;
        function readBinaryFile(path: string): Promise<ArrayBuffer>;
        function removeFile(path: string): Promise<any>;
        function readDirectory(path: string): Promise<FileOrDirectoryEntries>;
        function copyFile(source: string, destination: string): Promise<any>;
        function moveFile(source: string, destination: string): Promise<any>;
        function getStats(path: string): Promise<FileStats>;
    }
    declare namespace os {
        interface ExecCommandOptions {
            stdIn?: string;
            background?: boolean;
        }
        interface CommandOutput {
            pid: Number;
            stdOut: string;
            stdErr: string;
            exitCode: Number;
        }
        interface Envar {
            value: string;
        }
        interface OpenDialogOptions {
            multiSelections?: boolean;
            filters?: Filter[];
        }
        interface SaveDialogOptions {
            forceOverwrite?: boolean;
            filters?: Filter[];
        }
        interface Filter {
            name: string;
            extensions: string[];
        }
        interface DialogResponse {
            selectedEntry?: string;
            success?: boolean;
            error?: string;
        }
        interface TrayOptions {
            icon?: string;
            menu?: TrayMenuItem[];
        }
        interface TrayMenuItem {
            id?: string;
            text: string;
            isDisabled?: boolean;
            isChecked?: boolean;
        }
        enum Icon {
            WARNING = "WARNING",
            ERROR = "ERROR",
            INFO = "INFO",
            QUESTION = "QUESTION"
        }
        enum MessageBoxChoice {
            OK = "OK",
            OK_CANCEL = "OK_CANCEL",
            YES_NO = "YES_NO",
            YES_NO_CANCEL = "YES_NO_CANCEL",
            RETRY_CANCEL = "RETRY_CANCEL",
            ABORT_RETRY_IGNORE = "ABORT_RETRY_IGNORE"
        }
        interface MessageBoxResult {
            yesButtonClicked: boolean;
        }
        function execCommand(command: string, options?: ExecCommandOptions): Promise<CommandOutput>;
        function getEnv(key: string): Promise<Envar>;
        function showOpenDialog(title?: string, options?: OpenDialogOptions): Promise<DialogResponse>;
        function showFolderDialog(title?: string): Promise<any>;
        function showSaveDialog(title?: string, options?: SaveDialogOptions): Promise<DialogResponse>;
        function showNotification(title: string, content: string, icon?: Icon): Promise<any>;
        function showMessageBox(title: string, content: string, choice?: MessageBoxChoice, icon?: Icon): Promise<MessageBoxResult>;
        function setTray(options: TrayOptions): Promise<any>;
        function open(url: string): Promise<void>;
        function getPath(name: string): Promise<any>;
    }
    declare namespace computer {
        function getMemoryInfo(): Promise<MemoryInfo>;
        interface MemoryInfo {
            total: number;
            available: number;
        }
    }
    declare namespace storage {
        interface StorageSettDataResponse {
            success?: boolean;
            error?: string;
        }
        interface StorageGetDataResponse {
            data?: string;
            success?: boolean;
            error?: string;
        }
        function setData(key: string, data: string): Promise<StorageSettDataResponse>;
        function getData(key: string): Promise<StorageGetDataResponse>;
    }
    declare namespace debug {
        enum LoggerType {
            WARNING = "WARNING",
            ERROR = "ERROR",
            INFO = "INFO"
        }
        function log(message: string, type?: LoggerType): Promise<any>;
    }
    declare namespace app {
        interface OpenActionOptions {
            url: string;
        }
        interface RestartOptions {
            args: string;
        }
        function exit(code?: number): Promise<any>;
        function killProcess(): Promise<any>;
        function restartProcess(options?: RestartOptions): Promise<any>;
        function getConfig(): Promise<any>;
        function broadcast(event: string, data?: any): Promise<any>;
    }
    declare namespace window {
        interface WindowOptions extends WindowSizeOptions {
            title?: string;
            icon?: string;
            fullScreen?: boolean;
            alwaysOnTop?: boolean;
            enableInspector?: boolean;
            borderless?: boolean;
            maximize?: boolean;
            hidden?: boolean;
            maximizable?: boolean;
            processArgs?: string;
        }
        interface WindowSizeOptions {
            width?: number;
            height?: number;
            minWidth?: number;
            minHeight?: number;
            maxWidth?: number;
            maxHeight?: number;
            resizable?: boolean;
        }
        function setTitle(title: string): Promise<any>;
        function getTitle(): Promise<any>;
        function maximize(): Promise<any>;
        function unmaximize(): Promise<any>;
        function isMaximized(): Promise<boolean>;
        function minimize(): Promise<any>;
        function setFullScreen(): Promise<any>;
        function exitFullScreen(): Promise<any>;
        function isFullScreen(): Promise<boolean>;
        function show(): Promise<any>;
        function hide(): Promise<any>;
        function isVisible(): Promise<boolean>;
        function focus(): Promise<any>;
        function setIcon(icon: string): Promise<any>;
        function move(x: number, y: number): Promise<any>;
        function setDraggableRegion(domElementOrId: string | HTMLElement): Promise<any>;
        function unsetDraggableRegion(domElementOrId: string | HTMLElement): Promise<any>;
        function setSize(options: WindowSizeOptions): Promise<any>;
        function getSize(): Promise<any>;
        function setAlwaysOnTop(onTop: boolean): Promise<any>;
        function create(url: string, options?: WindowOptions): Promise<any>;
    }
    declare namespace events {
        function on(event: string, handler: any): Promise<any>;
        function off(event: string, handler: any): Promise<any>;
        function dispatch(event: string, data?: any): Promise<any>;
        function broadcast(event: string, data?: any): Promise<any>;
    }
    declare namespace extensions {
        function dispatch(extensionId: string, event: string, data?: any): Promise<any>;
        function broadcast(event: string, data?: any): Promise<any>;
        function getStats(): Promise<any>;
    }
    declare namespace updater {
        function checkForUpdates(url: string): Promise<any>;
        function install(url: string): Promise<any>;
    }
    declare namespace clipboard {
        function readText(key: string, data: string): Promise<any>;
        function writeText(data: string): Promise<any>;
    }
    declare function init(): void;

}

/** Basic authentication token */
declare const NL_TOKEN: string;

/** Operating system name: Linux, Windows, or Darwin */
declare const NL_OS: "Linux"|"Windows"|"Darwin";

/** Application identifier */
declare const NL_APPID: string;

/** Application port */
declare const NL_PORT: number;

/** Mode of the application: window, browser, or cloud */
declare const NL_MODE: "window"|"browser"|"cloud";

/** Neutralinojs server version */
declare const NL_VERSION: string;

/** Neutralinojs client version */
declare const NL_CVERSION: "3.2.0";

/** Current working directory */
declare const NL_CWD: string;

/** Application path */
declare const NL_PATH: string;

/** Command-line arguments */
declare const NL_ARGS: string[];

/** Current process's identifier */
declare const NL_PID: number

