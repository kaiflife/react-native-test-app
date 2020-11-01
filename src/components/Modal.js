import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {BOARD_NOT_FOUND} from "../constants/languages";
import CustomFontText from "./CustomFontText";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import {changeModalData} from "../actions/modal";
import {generalStyles} from "../constants/theme";

const Modal = ({ onPress = () => {} }) => {
  const dispatch = useDispatch();
  const languageWords = useSelector(state => state.languageReducer.languageWords);
  const { isOpenedModal, modalInputText, modalTitle, modalButtonTitle, modalText, hideTimer } = useSelector(state => state.modalReducer);
  const currentTheme = useSelector(state => state.themeReducer.currentTheme);
  const error = useSelector(state => state.boardsReducer.error);

  useEffect(() => {
    return () => dispatch(changeModalData({modalButtonTitle: '', modalTitle: ''}));
  }, []);

  useEffect(() => {
    if(hideTimer) {
      setTimeout(() => {
        const haveTime = (hideTimer - 1) !== 0;
        dispatch(changeModalData({hideTimer: hideTimer-1, isOpenedModal: haveTime}));
      }, 1000);
    }
  }, [hideTimer]);

  const changeBoardTitle = (newTitle) => dispatch(changeModalData({modalText: newTitle}));

  const defaultModalStyles = isOpenedModal ? generalStyles.loading : generalStyles.hideFullScreenComponent;

  if(!isOpenedModal) return <></>

  return (
    <View style={{...styles.container, ...currentTheme.modalContainer, ...defaultModalStyles}}>
      <CustomFontText text={languageWords[modalTitle]} />
      {!!modalInputText && <CustomInput text={modalInputText} isError={error === BOARD_NOT_FOUND} onChangeText={changeBoardTitle} />}
      <CustomFontText text={languageWords[modalText]} />
      {!!modalButtonTitle && <CustomButton disable={!modalTitle.length} onPress={onPress} text={languageWords[modalButtonTitle]} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  }
})

export default Modal;