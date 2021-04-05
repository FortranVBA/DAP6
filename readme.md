# Openclassroom Dev Application Python - Projet 4

## Description

This project is part of the training of Python Web Developer online course provided by OpenClassroom.
The purpose of this project is to develop a python offline application to manage chess tournament encounters.
The program is composed of several menus, for which the indicated commands have to be typed in python terminal.

The player and tournament data can be saved and loaded as json file (using tinyDB library).

## Requirements

- Python 3.7 or higher (developed and tested with python 3.7.1)

## Installation

1. Download the repository content.
2. From project root folder, type in vscode (or other python interpretor for Windows) or your OS terminal (Linux or Mac OS) 
    ```python -m venv .venv #Create a new environment.```
3. Type in vscode (or other python interpretor for Windows) or your OS terminal (Linux or Mac OS) 
    - For windows: ```. .venv/Scripts/activate #Activate your new environment.```
    - For MAC OS / Linux: ```. .venv/bin/activate #Activate your new environment.```
4. Type in vscode (or other python interpretor for Windows) or your OS terminal (Linux or Mac OS)
    ```pip install -r requirements.txt #Install all required librairies.```

## Operation

- Activate your environment (you may have already done it during the installation steps, but you need to re-activate it each time you close your terminal / vscode and start with a new terminal).
You can do so by typing in vscode (or other python interpretor for Windows) or your OS terminal (Linux or Mac OS):
    - For windows: ```. .venv/Scripts/activate #Activate your new environment.```
    - For MAC OS / Linux: ```. .venv/bin/activate #Activate your new environment.```

- Execute main.py from project root folder:
    - Type ```python main.py``` in terminal (vscode or other python interpretor for Windows)
    - Or type ```python3 main.py``` in terminal (Linux or Mac OS)

## Generate flake8 report

- To generate flake8 report, activate your environment (see above) and type ```flake8``` in your terminal (configuration is taken from .flake8 file).
The generated flake8 report is located in flake-report folder.
