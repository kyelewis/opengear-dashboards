# rosstalk:

## getQueueSize()
## getPort(): int;
## setPort(): int;
## getHost(): string;
## setHost(): string;
## sendMessage(message: string): void;
## sendMessage(message: string, callback): void;
## sendMessage(host: string, port: int, message: string): void;
## sendMessage(host: string, port: int, message: string, callback): void;

## sendAsBytes(message: string): void;
## ...


# rosstalk sender:

## callback: (success: boolean, sendData: string, result: string, callbackException: Error);
