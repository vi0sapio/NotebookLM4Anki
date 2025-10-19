# NotebookLM4Anki

A Firefox extension that extracts flashcards from Google's NotebookLM and converts them to Anki-compatible CSV format.

## Features

- One-click extraction of flashcards from NotebookLM
- Automatic conversion to Anki-compatible CSV format
- Immediate download of the converted flashcards

### Media
![](https://github.com/user-attachments/assets/a59a41b9-f49e-4771-8d8b-a28d6885f961)


### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the extension directory
5. The extension should now appear in your toolbar

## Usage

1. Navigate to [NotebookLM](https://notebooklm.google.com/) and open a notebook with flashcards
2. Click the NotebookLM4Anki extension icon in your browser toolbar
3. Click the "Extract Flashcards" button
4. The flashcards will be downloaded as a CSV file named `notebooklm_flashcards.csv`

## Importing to Anki

1. Open Anki
2. Click "Import File" from the main screen
3. Select the downloaded CSV file
4. Make sure the field mapping is correct (Front → Front, Back → Back)
5. Make sure `Field separator (guessed)` is set to `Comma`
6. Click "Import"

## License

[GNU LESSER GENERAL PUBLIC LICENSE](LICENSE)

## Support

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/vi0sapio/NotebookLM4Anki/issues) on GitHub.

