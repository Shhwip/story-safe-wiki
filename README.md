# story-safe-wiki

<p align="center">
  <img src="https://github.com/Story-Safe/story-safe-wiki/blob/main/front-end/src/assets/Horizontal_Combination_Mark_dark_background.jpg?raw=true" alt="Story Safe Wiki logo">
</p>

Story Safe Wiki is a unique wiki platform designed to enhance the user experience for fans of various narratives. This wiki platform allows users to set their preferred spoiler level. By setting a spoiler level users that haven't read the entire story can freely explore the content up to the point that they have read without having to worry about the rest of the story being spoiled. As an open source project we want to encourage people to use our platform to start up wiki's for whatever story they want. Our spoiler level system is number based and allows you to wrap any content in a spoiler tag based on the number associated with whatever point in the story you want. 

Information about how to use the wiki and import other wikis is found [here](import.md)

<details>
<summary>Table of Contents</summary>

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Connecting Your Database](#connecting-your-database)
  - [Running Story Safe Wiki Locally](#running-story-safe-wiki-locally)
- [Installing Git](#installing-git)


</details>



# Getting Started


## Prerequisites
- Ensure that you have Node.js and npm installed on your machine. You can download them from [Node.js website](https://nodejs.org/).
- Also ensure that you have Git installed on your machine. [How to install git](#installing-git)
- You will need some form of text editor or IDE, [Visual Studio Code](https://code.visualstudio.com/download) works very nicely.
- Lastly you will need your own mongodb atlas account and obtain your connection string. You can find a tutorial on how to create an account and get this connection string [here](https://www.mongodb.com/docs/guides/atlas/connection-string/). We will need this string later.

## Clone the Repository
1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Run the following command to clone the repository:
```bash
   git clone https://github.com/Story-Safe/story-safe-wiki.git
```

## Install Dependencies
1. Open terminal or command prompt and navigate to the front end of newly created project directory:
```bash
  cd story-safe-wiki/front-end
```
2. Run the following command to install the front-end project dependencies:
```bash
  npm install
```
3. Now navigate to the back end:
```bash
  cd ../back-end
```
4. Run the following command to install the back-end project dependencies:
```bash
  npm install
```

## Connecting Your Database
For this step you will need your Mongodb connection string, if you don't have this please see the [Prerequisites](#prerequisites) section of this article.
1. In your text editor of choice open the file at the path:
```
   story-safe-wiki/back-end/.env
```
2. In that file you will find on the first line the exact spot you need to add in your connection string
```javascript
  ATLAS_URI=<Insert your connection string here>?retryWrites=true&w=majority
```

## Running Story Safe Wiki Locally
1. Navigate to the front end folder in terminal or command prompt.
```bash
  cd story-safe-wiki/front-end
```
2. Run the Front end with this command.
```bash
  npm start
```
3. Now navigate to the back end in a new terminal or command prompt window.
```bash
  cd story-safe-wiki/back-end
```
4. Run the back end now with this command.
```bash
  npm start
```
5. To kill the running process for the front end or back end, simply hit "ctrl + c" while in the window that it is running in.

## Congrats!
You now have the project running in the background, to open your new site simply navigate to this link in your browser while the front and back end is running. [story-safe-wiki](http://localhost:5173/)

# Installing Git

## Windows:
### Git Bash (Git with Bash):
1. Download the Git for Windows installer from the official Git website: [Git for Windows.](https://gitforwindows.org/)
2. Run the installer and follow the on-screen instructions.
3. During the installation, you can choose the default settings unless you have specific preferences.
4. When prompted, select "Use Git from Git Bash only" if you prefer Git Bash.
   
### GitHub Desktop:
Alternatively, if you prefer a graphical interface, you can use GitHub Desktop, which includes Git:

1. Download GitHub Desktop from the GitHub Desktop website: GitHub Desktop.
2. Run the installer and follow the on-screen instructions.
3. Sign in with your GitHub account or create one.

## Linux:
### Debian/Ubuntu-based Systems:
  ```bash
  sudo apt update
  sudo apt install git
```
### Red Hat/Fedora-based Systems:
  ```bash
  sudo dnf install git
```

## macOS
### Homebrew:
If you have Homebrew installed, you can use it to install Git:
```bash
  brew install git
```
### Xcode Comand Line Tools:
Alternatively, you can install Git through Xcode Command Line Tools:
1. Open Terminal.
2. Run the following command:
```bash
  xcode-select --install
```
1. Follow the on-screen instructions to complete the installation.

After installation, you can verify whether Git is installed by opening a terminal and typing:
```bash
  git --version
```






