import React from "react";
import Svg, {G, Path, Rect} from "react-native-svg";
import {Animated} from "react-native-web";

const LoaderSvg = () => {
  return (
    <Svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
      <G id="XMLID_1_">
        <Path id="XMLID_5_" d="M256,0C116.4,0,3.7,111.7,0,250.4c2.8-121,95-217.8,207.6-217.8c114.5,0,207.6,100.5,207.6,224.3
          c0,26.1,21.4,48.4,48.4,48.4s48.4-21.4,48.4-48.4C512,114.5,397.5,0,256,0z M256,512c139.6,0,252.3-111.7,256-250.4
          c-2.8,121-95,217.8-207.6,217.8c-114.5,0-207.6-100.5-207.6-224.3c0-26.1-21.4-48.4-48.4-48.4S0,228.1,0,255.1
          C0,397.5,114.5,512,256,512z"
        />
      </G>
    </Svg>
  )
}

const AnimatedLoaderSvg = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <Rect x="19" y="19" width="20" height="20" fill="#e15b64">
        <Animated attributeName="fill" values="#f8b26a;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0s" calcMode="discrete"/>
      </Rect>
      <Rect x="40" y="19" width="20" height="20" fill="#e15b64">
        <Animated attributeName="fill" values="#f8b26a;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.125s" calcMode="discrete"/>
      </Rect>
      <Rect x="61" y="19" width="20" height="20" fill="#e15b64">
        <Animated attributeName="fill" values="#f8b26a;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.25s" calcMode="discrete"/>
      </Rect>
      <Rect x="19" y="40" width="20" height="20" fill="#e15b64">
        <Animated attributeName="fill" values="#f8b26a;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.875s" calcMode="discrete"/>
      </Rect>
      <Rect x="61" y="40" width="20" height="20" fill="#e15b64">
        <Animated attributeName="fill" values="#f8b26a;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.375s" calcMode="discrete"/>
      </Rect>
      <Rect x="19" y="61" width="20" height="20" fill="#e15b64">
        <Animated attributeName="fill" values="#f8b26a;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.75s" calcMode="discrete"/>
      </Rect>
      <Rect x="40" y="61" width="20" height="20" fill="#e15b64">
        <Animated attributeName="fill" values="#f8b26a;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.625s" calcMode="discrete"/>
      </Rect>
      <Rect x="61" y="61" width="20" height="20" fill="#e15b64">
        <Animated attributeName="fill" values="#f8b26a;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.5s" calcMode="discrete"/>
      </Rect>
    </Svg>
  )
}



export {
  LoaderSvg,
  AnimatedLoaderSvg,
};