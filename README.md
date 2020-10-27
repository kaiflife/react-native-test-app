# IF YOU HAVE NO AUTOLINKING
Put it in terminal
`cd ios && pod install && cd ..`

That's it :D

# HOW TO ADD CUSTOM FONTS
1. First step (Set Font Naming For Cross Platform)

2. Add Fonts to Assets

3. Define assets directory
    1) create file with name 'react-native.config.js'
    2) Pass code like this
    `module.exports = {
    	project: {
    		ios: {},
    		android: {},
    	},
    	assets: ['.src/assets/fonts/'], //react-native link to activate link for assets/fonts
    };`
    3) In package.json add this
    `"rnpm": {
        "ios": {},
        "android": {},
        "assets": ["./assets"]
      },`

# HOW TO ADD SVGS
1) `yarn add react-native-svg`
2) `react-native link react-native-svg`

# HOW TO ADD ASYNC STORAGE
1) `yarn add @react-native-async-storage/async-storage`
2) `react-native link @react-native-async-storage/async-storage`