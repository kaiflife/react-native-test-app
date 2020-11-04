import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomFontText from "./CustomFontText";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import {changeModalData} from "../actions/modal";
import {generalStyles} from "../constants/theme";

const Modal = ({ onPress = () => {} }) => {
  const dispatch = useDispatch();
  const languageWords = useSelector(state => state.languageReducer.languageWords);
  const { modalInputsInfo, isOpenedModal, modalFooterStyles, footerButtons, modalTitle, modalButtonTitle, modalText, hideTimer } = useSelector(state => state.modalReducer);
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

  const inputsMap = modalInputsInfo.map((input, index) => {
    return (
      <CustomInput
        key={input.id}
        propsStyles={input.styles}
        text={input.value}
        onChangeText={(value) => input.onChangeText({value, index})}
        isError={input.isError === error}
      />
    )
  });

  const footerButtonsMap = footerButtons.map(button => {
    return (
      <CustomButton
        key={button.text}
        propsStyles={{...generalStyles.modalFooterButtonStyles, ...button.styles}}
        text={button.text}
        onPress={() => button.onPress()}
      />
    )
  })

  const defaultModalStyles = isOpenedModal ? generalStyles.loading : generalStyles.hideFullScreenComponent;

  if(!isOpenedModal) return <></>

  return (
    <View style={[styles.container, currentTheme.modalContainer, defaultModalStyles]}>
      <CustomFontText text={languageWords[modalTitle]} />
      {!!inputsMap.length && inputsMap}
      <CustomFontText text={languageWords[modalText]} />
      {!!modalButtonTitle && <CustomButton disable={!modalTitle.length} onPress={onPress} text={languageWords[modalButtonTitle]} />}
      <View style={[modalFooterStyles]}>{footerButtonsMap}</View>
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