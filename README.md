# CLI File Organizer Bot

A simple command-line interface (CLI) bot designed to organize your files based on their types. Say goodbye to manual file categorization and let the bot handle it for you!

## Installation

1. **Clone Repository:**
   ```bash
   git clone https://github.com/your-username/cli-file-organizer-bot.git
   ```

2. **Install Dependencies:**
   ```bash
   cd cli-file-organizer-bot
   npm install
   ```

## Usage

1. **Run the Bot:**
   Open your terminal and navigate to the directory where the bot is located.
   ```bash
   node bot.js
   ```

2. **Enter Directory Path:**
   The bot will prompt you to enter the path of the directory you want to organize. For example:
   ```bash
   Enter the path of the directory to organize: C:\Users\YourUsername\Downloads
   ```

3. **Watch for Changes:**
   The bot will start watching for new files in the specified directory. Whenever a new file is added, it will automatically organize the files.

4. **Organizing Manually:**
   If you want to trigger manual organization, simply press Enter in the terminal, and the bot will organize the files in the specified directory.

## Dependencies

- [fs](https://nodejs.org/api/fs.html): Node.js File System module
- [path](https://nodejs.org/api/path.html): Node.js Path module
- [readline](https://nodejs.org/api/readline.html): Readline module for user input
- [chokidar](https://www.npmjs.com/package/chokidar): File system watcher

## Note

- Ensure you have [Node.js](https://nodejs.org/) installed on your system.
- This bot is designed for command-line usage, not as a Discord bot.

Enjoy the convenience of automated file organization with the CLI File Organizer Bot!
