# Gitter client for your terminal

![gitter-cli example](https://dl.dropboxusercontent.com/u/73676286/GitHub/gitter-cli-example-2.gif)

## Install

You can install gitter-cli with **npm** globally.

```
npm install -g gitter-cli
```

Then you will need to set the authentication-token for your user in gitter. Follow these steps to get your token:
1. Visit https://developer.gitter.im
2. Click login (top right)
3. You will see your personal access token

## Usage

```
Usage: gitter-cli [options] [command]


Commands:

  join|j [name]        Join a room with the specified name.
  authorize|set-auth   Set the access-key token for client authentication.
  whoami|me            Display your user information based on the existing token.
  rooms|status         Display a list of rooms that you are part of.

Options:

  -h, --help       output usage information
  -V, --version    output the version number
  --token [token]  Set the access-key token for client authentication. This won't be persisted.
```


**On a room:**

- Use **k** or **arrow-up** to go up in the chat board.
- Use **j** or **arrow-down** to go on down in the chat board.
- When focusing on the screen, press **i** for writing mode.
- Use **ESC** to toggle between the screen and the input box.
- When focusing on the input box, press **ctrl-s** to send the message.

----------

## License

The MIT License (MIT)

Copyright (c) 2015 Rodrigo Espinosa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
