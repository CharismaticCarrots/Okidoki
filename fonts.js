import * as Font from 'expo-font'

export default useFonts = async () => {
  await Font.loadAsync({
    'singularity': require('./assets/fonts/singularity.ttf'),
     'antipasto': require('./assets/fonts/Antipasto.ttf'),
     'antipasto-bold': require('./assets/fonts/Antipasto-Pro-ExtraBold-trial.ttf'),
     'antipasto-light': require('./assets/fonts/Antipasto-Pro-ExtraLight-trial.ttf'),
   });
};