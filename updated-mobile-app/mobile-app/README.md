### Start project:
yarn install  
For ios:  
cd ios && pod install && cd ..  
yarn ios  
For android:  
yarn android

### Mapbox ios pod install error
Error installing MapboxCommon solution
```
Go to Terminal and write cd ~
Press Enter.
Write vi .netrc . It will open the empty file in the terminal.
Press i here to insert data here. When you enter i it will open in insert mode.
Now paste

  machine api.mapbox.com
  login mapbox
  password sk.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

sk.xxx - secret download token from mapbox
Note: Don't put < braces in password >

Press Esc Key from keyboard.
Write :w to write all data on file.
Now write :q to quit from file.
You successfully save the file.
Run Pod install
```

3rd apps login
  Google
  - [ ] android
  - [ ] ios
  Apple
  - [ ] ios
  Facebook
  - [ ] android
  - [ ] ios