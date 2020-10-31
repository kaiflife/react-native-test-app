import React, { useState } from 'react';
import { View } from 'react-native';
import {BOARD_NOT_FOUND} from "../constants/languages";
import CustomFontText from "./CustomFontText";
import {useSelector} from "react-redux";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

const Modal = ({ title = 'update task', onPress = () => {}, buttonTitle = 'create' }) => {
  const languageWords = useSelector(state => state.language.languageWords);
  const error = useSelector(state => state.boards.error);
  const [title, setTitle] = useState('');

  const changeBoardTitle = (newTitle) => setTitle(newTitle);

  return (
    <View>
      <CustomFontText text={languageWords[title]} />
      <CustomInput text={title} isError={error === BOARD_NOT_FOUND} onChangeText={changeBoardTitle} />
      <CustomButton disable={!title.length} onPress={onPress} text={languageWords[buttonTitle]} />
    </View>
  )
}

export default Modal;