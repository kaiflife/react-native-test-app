# (START) HOW TO ADD CUSTOM FONTS
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
    	assets: ['./assets/fonts/'], //react-native link to activate link for assets/fonts
    };`
    3) In package.json add this
    `"rnpm": {
        "ios": {},
        "android": {},
        "assets": ["./assets"]
      },`
# (END) HOW TO ADD CUSTOM FONTS