# ogscript functions

## ogscript.asyncExec
function, delay ms

## FTP

### ogscript.ftp - Send an object to FTP
host, port, username, password, destPath, destName, isBinary, sourceFilePath, object

### ogscript.asyncFTP - Send a file to FTP (async)
host, port, username, password, destPath, destName, isBinary, sourceFilePath, callback(?)

### ogscript.ftpGet - Get an object from FTP
host, port, username, password, sourcePath, sourceName, isBinary, sourceFilePath

### ogscript.asyncFTPGet - Get a file from FTP (async)
host, port, username, password, sourcePath, sourceName, isBinary, destFilePath, callback(?)

### ogscript.asyncFTPListFiles - List files from FTP
host, port, username, password, path, fileName, isBinary, callback(?)

## HTTP

### ogscript.http - Call HTTP
url, method, contentType, data, includeResponse

### ogscript.asyncHTTP - Call HTTP (async)
url, method, contentType, data, callback(?)

## UDP

### ogscript.sendUDPBytes, ogscript.sendUDPString
host, port, data


## General

### ogscript.copyText - Copy text to Clipboard
string

### ogscript.pasteText - Paste text from clipboard


### ogscript.getAttribute - Get Attribute with id
attributeId

## ogscript.getFile - Get a local file from path
filePath

## ogscript.saveToFile - Save to a local file
filePath, data

## ogscript.debug - Write a debug string message
message

## UI

### ogscript.reload - Reload a UI element
id

### ogscript.reveal - Reveal a popup or tab
id

### ogscript.setXML - set XML for a UI component
id, xml

## Lookups

### ogscript.getString - Get string from global lookup
key

### ogscript.getPrivateString - Get string from private lookup
lookupId, key

### ogscript.putString - Put string into global lookup
key, value

### ogscript.putPrivateString - Put string into private lookup
lookupId, key, value

### ogscript.getObject - Get Object with id
key

### ogscript.putObject - Put object
key, value

## XML

## ogscript.parseXML
xml

## ogscript.runXPath
xpath, xml
