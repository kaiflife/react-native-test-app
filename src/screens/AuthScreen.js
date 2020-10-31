import React, {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "../components/CustomInput";
import {CHANGE_AUTH_DATA} from "../actions/auth/action";
import CustomButton from "../components/CustomButton";
import {useNavigation} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {authRequest} from "../actions/auth";
import {startRequestLoading} from "../actions/request";

const AuthScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { email, password } = useSelector(state => state.auth);
	const languageWords = useSelector(state => state.language.languageWords);
	const isRequestLoading = useSelector(state => state.request.isRequestLoading);
	const token = useSelector(state => state.auth.token);

	const changeAuthData = (value, type) => {
		dispatch({ type: CHANGE_AUTH_DATA, payload: { [type]: value }});
	}

	const sendAuthData = async () => {
		if(!isRequestLoading) {
			dispatch(startRequestLoading(true));
			await dispatch(authRequest());
			dispatch(startRequestLoading(false));
		}
	}

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
			<CustomFontText propsStyles={{color: 'black', marginBottom: 20}} text={languageWords.login} />
			{inputsComponent}
			<CustomButton disable={disabledButton} onPress={sendAuthData} text={languageWords.authorize} />
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