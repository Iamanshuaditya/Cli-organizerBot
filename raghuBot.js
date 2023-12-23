const fs = require("fs");
const path = require("path");
const readline = require("readline");
const chokidar = require("chokidar");

const scriptDirectory = process.cwd();

function organizeFiles(directory) {
  if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
    console.error("Invalid directory path. Exiting.");
    return;
  }

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const fileExtension = path.extname(file).toLowerCase();
        const targetFolder = getTargetFolder(fileExtension, directory);

        if (!fs.existsSync(targetFolder)) {
          fs.mkdirSync(targetFolder);
        }

        const newFilePath = path.join(targetFolder, file);
        fs.renameSync(filePath, newFilePath);
        console.log(`Moved: ${file} to ${targetFolder}`);
      }
    });

    console.log("Organizing complete!");
  });
}

function getTargetFolder(fileExtension, parentDirectory) {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".tiff",
    ".webp",
    ".svg",
    ".ico",
    ".raw",
    ".heif",
    ".heic",
    ".AVIF",
  ];
  const videoExtensions = [".mp4", ".avi", ".mkv", ".mov"];
  const musicExtensions = [".mp3", ".wav", ".flac"];
  const zipExtensions = [".zip", ".rar", ".7z"];
  const appExtensions = [".exe", ".dmg", ".app"];
  const pdfExtensions = [".pdf"];

  if (imageExtensions.includes(fileExtension)) {
    return path.join(parentDirectory, "images");
  } else if (videoExtensions.includes(fileExtension)) {
    return path.join(parentDirectory, "videos");
  } else if (musicExtensions.includes(fileExtension)) {
    return path.join(parentDirectory, "music");
  } else if (zipExtensions.includes(fileExtension)) {
    return path.join(parentDirectory, "zips");
  } else if (appExtensions.includes(fileExtension)) {
    return path.join(parentDirectory, "apps");
  } else if (pdfExtensions.includes(fileExtension)) {
    return path.join(parentDirectory, "files");
  } else {
    return path.join(parentDirectory, "other");
  }
}

function handleUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the path of the directory to organize: ", (answer) => {
    const targetDirectory = answer.trim();

    if (!fs.existsSync(targetDirectory)) {
      console.log("Invalid directory path. Exiting.");
      rl.close();
      return;
    }

    startWatcher(targetDirectory);

    rl.close();
  });
}

function startWatcher(directory) {
  const watcher = chokidar.watch(directory, {
    ignored: /^\./,
    persistent: true,
  });

  watcher.on("add", (filePath) => {
    console.log(`File ${filePath} has been added`);

    organizeFiles(directory);
  });

  console.log(`Watching for new downloads in ${directory}`);
}

handleUserInput();
