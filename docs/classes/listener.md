# listener

## this

### getInputStream()
### writeString(String str, utf?: boolean): boolean
### writeAsBytes(String data): boolean
### writeBytes(byte[] bytes): boolean;


## event - ReadCommandEvent

### getRemotePort() int;
### getRemoteHost(): String;
### getEventType(): int;    // 0=CONNECT, 1=MESSAGE, 2=DISCONNECT
### isConnectEvent(): boolean;
### isMessageEvent(): boolean;
### isDisconnectEvent(): boolean;
### getBytes(): byte[];
### getBytesAsString(): String;
