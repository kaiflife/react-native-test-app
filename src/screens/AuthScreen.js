import React, {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "../components/CustomInput";
import {CHANGE_AUTH_DATA} from "../actions/auth/action";
import CustomButton from "../components/CustomButton";
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {authRequest, clearAuthData} from "../actions/auth";
import {startRequestLoading} from "../actions/request";
import {changeModalData} from "../actions/modal";

const AuthScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { email, password } = useSelector(state => state.authReducer);
	const languageWords = useSelector(state => state.languageReducer.languageWords);
	const isRequestLoading = useSelector(state => state.requestReducer.isRequestLoading);
	const token = useSelector(state => state.authReducer.token);

	const changeAuthData = (value, type) => {
		dispatch({ type: CHANGE_AUTH_DATA, payload: { [type]: value }});
	}


	const sendAuthData = async () => {
		if(!isRequestLoading) {
			dispatch(startRequestLoading(true));
			try {
				await dispatch(authRequest());
			} catch (e) {
				dispatch(changeModalData({
					hideTimer: 3,
					isOpenedModal: true,
					modalTitle: 'Error connection',
					modalText: 'Server is not responding',
				}));
			}
			dispatch(startRequestLoading(false));
		}
	}

	useFocusEffect(
		React.useCallback(() => {

			return () => {
				dispatch(clearAuthData());
			}
		}, [])
	);

	useEffect(() => {
		if(token) {
			navigation.push('Boards', {screen: 'Boards'});
		}
	}, [token]);

	const inputsValues = [
		{id: 0, type: 'email', text: email},
		{id: 1, type: 'password', text: password}
	];

	const inputsComponent = inputsValues.map(item => {
		const secureTextEntry = item.type === 'password';
		return (
			<CustomInput
				secureTextEntry={secureTextEntry}
				key={item.id}
				text={item.text}
				placeholder={item.type}
				onChange={(value) => changeAuthData(value, item.type)}
			/>
		)
	});

	const disabledButton = !email.length || !password.length;

	return (
		<View style={styles.container}>
			<CustomFontText propsStyles={{color: 'black', marginBottom: 20}} text={languageWords.authorize} />
			{inputsComponent}
			<CustomButton disable={disabledButton} onPress={sendAuthData} text={languageWords.signIn} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 40,
		flex: 1,
		alignItems: 'center',
	}
});

export default AuthScreen;