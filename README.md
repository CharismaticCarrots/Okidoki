<p align="center"> <img src="https://user-images.githubusercontent.com/46302411/179603767-d2abeac6-b01e-482b-8e5d-7d1c2597a585.png" /> </p>

## About

### [Watch the Video Demo](https://youtu.be/pvkmPt4Fc00)

Okidoki is a gamified health app designed to gently motivate you into a more active lifestyle. The app connects to Healthkit on your iPhone and lets you set your daily step goal. Once that is set you will be given a virtual pet or “Doki” to take care of. The aim of the app is to encourage you to keep walking as when you reach your daily goal you are rewarded with currency which can be used to buy new treats and toys for your Doki. 

_Why "Okidoki"?_

Derived from the Japanese word for wristwatch, _udedokei_, and the sound of your heart, _dokidoki_, "Okidoki" encapsulates our integration with Apple and Android fitness technology and our goal to promote a heart healthy lifestyle.

Check out our [wiki](https://github.com/CharismaticCarrots/Okidoki/wiki) for more information on how our app works and how we set it up!

<br></br>
## Meet the Team

![Team_Angel (1)](https://user-images.githubusercontent.com/101146704/179840255-6980561d-0435-4ee7-9d70-d2dacb5a97d9.png)  | ![Team_Connie (1)](https://user-images.githubusercontent.com/101146704/179840276-df1dd862-407d-427e-8a2b-88c3da701bcb.png) | ![Team_Kristin (1)](https://user-images.githubusercontent.com/101146704/179840287-e3585a2f-398d-4bb8-a660-08675df1e18d.png)  | ![Team_Lydia (1)](https://user-images.githubusercontent.com/101146704/179840299-91379a54-aeee-405e-93c5-7e16aae9d2a4.png) |
|     :---:     |     :---:     |     :---:     |     :---:     |
| [Github](https://github.com/angely119)  | [Github](https://github.com/Conniec321)  | [Github](https://github.com/kristinlam)  | [Github](https://github.com/lydiakwa)  |
| [LinkedIn](https://www.linkedin.com/in/angel-yang-pharmd/)  | [LinkedIn](https://www.linkedin.com/in/conniekaichan/)  | [LinkedIn](https://www.linkedin.com/in/kristin-lam/)  | [LinkedIn](https://www.linkedin.com/in/lydia-kwa/)

<br></br>
## App Demo

### Sign in and Sign up

When the user opens the app, they will be requested to allow the app permission to their Apple Healthkit Data and push notifications. They can sign up as a new user through our form by submitting their name and email or they can sign up with their Google account. They are then directed to a page to set their step goal and to select their Doki!

<div align="center">
 <img src="https://media.giphy.com/media/eDSEThmrhVSg7tueam/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
 <img src="https://media.giphy.com/media/areJPpYHgv2W77TXKL/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
 <img src="https://media.giphy.com/media/nuTWTnr7MQSDtylhEp/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

---
### Hatching Doki and Tracking Steps

Before the user can interact with their Doki, they will first need to reach their step goal to hatch it. Once hatched, they can monitor and maintain its fullness and mood levels, which will decrement in the background by the hour. As the user meets their daily step goals, they will be rewarded with currency, in carrots, to care for their Doki.

<div align="center">
<img src="https://media.giphy.com/media/v697A1L5Eg4rUZ1e2z/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media.giphy.com/media/kVIGInWsJsKSdmuNPo/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media.giphy.com/media/7uuUcRX4tLHAFLTACu/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

----
### Interacting with Doki and the Store

Users can spend their carrots in the Doki Mart, where they can purchase toys for their Doki. They can access all of their items in the Doki Pack. Feeding their Doki carrots will increase its fullness, while tapping on a toy will increase its mood.

<div align="center">
<img src="https://media.giphy.com/media/oYRmjSh3EH5ljBL3Pw/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media.giphy.com/media/Ty4Xb6Ra2MNt5SC3QI/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media.giphy.com/media/wDCozWzYmoogtNyuCE/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

---
### Viewing Health Stats and Settings and Receiving Push Notifications

The user can take a closer look at their health goals in the stats page. Users can update their daily step goal in their settings. Lastly, they will receive popup notifications reminding them to feed and play with their Doki. 

<div align="center">
<img src="https://media.giphy.com/media/0dOuXZJLrcg84JTHZ9/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media.giphy.com/media/7jiyuwTR37FaNw1hLN/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="https://media.giphy.com/media/GjpdcCUga7V56q8NOe/giphy.gif" width="250"/>&nbsp;&nbsp;&nbsp;
</div>

<br></br>
## Getting Started
Download [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) and install the [Expo CLI](https://reactnative.dev/docs/environment-setup) to experience Okidoki on an iOS simulator.
Create a file called ```secrets.js```. To find your IP address, run ```ipconfig getifaddr en0```.
```
export const API_URL = "[YOUR IP ADDRESS.19002]";
export const GOOGLECLIENTID = "[GOOGLECLIENTID]"
```
Create a file called ```.env```.
```
PORT=19002
JWT="[SECRETKEY]"
GOOGLECLIENTID="[GOOGLECLIENTID]"
```
After creating these files, run the following commands to build the app:
```
npm install
cd ios &&  pod install
cd .. && expo run:ios
```

<br></br>
## Credits

* Video created by Shirley Cheng • [Portfolio](https://www.shirleycheng.work/) • [LinkedIn](https://www.linkedin.com/in/shirleyness/)
* Sprites
  * Fat Cat by [MariaParraGames](https://mariaparragames.itch.io/)
  * Foxpack by [SeethingSwarm](https://seethingswarm.itch.io/)
* Backgrounds
  * Home, Health Stats — [Tofu](https://twitter.com/TofuPixel)
  * Doki Mart — [miuks](https://twitter.com/sheepscreed)
  * User Settings – [Jubilee](https://twitter.com/16pxl)
* Fonts
  * [Singularity](https://www.dafont.com/FR/singularity-2.font) by 93fresh
  * [Antipasto](https://www.dafont.com/antipasto.font) by Cosimo Lorenzo Pancini
