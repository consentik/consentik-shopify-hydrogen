@echo off

:: Define source and target directories
SET "SOURCE_DIR=%CD%\dist"
SET "TARGET_DIR=E:\Project\thang-test\node_modules\consentik-shopify-hydrogen\dist\"

:: Check if source directory exists
IF NOT EXIST "%SOURCE_DIR%" (
    echo Source directory %SOURCE_DIR% does not exist. Exiting...
    exit /b 1
)
:: Check if target directory exists, remove if it does
IF EXIST "%TARGET_DIR%" (
    echo Target directory %TARGET_DIR% exists. Removing...
    rmdir /s /q "%TARGET_DIR%"
)

:: Check if target directory exists, create if not
IF NOT EXIST "%TARGET_DIR%" (
    echo Target directory %TARGET_DIR% does not exist. Creating...
    mkdir "%TARGET_DIR%"
)

:: Copy the build folder to the target directory
echo Copying build folder to %TARGET_DIR%...
xcopy /e /i /y "%SOURCE_DIR%\*" "%TARGET_DIR%"

:: Check if copy was successful
IF %ERRORLEVEL% EQU 0 (
    echo Build folder successfully copied.
) ELSE (
    echo Failed to copy build folder. Exiting...
)

pause