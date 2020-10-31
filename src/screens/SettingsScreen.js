import React, { useEffect, useState } from "react";
import {View, StyleSheet} from "react-native";
import CustomFontText from "../components/CustomFontText";
import CustomInput from "../components/CustomInput";
import {useDispatch, useSelector} from "react-redux";
import {EMAIL_INSTRUCTIONS, FULL_NAME_INSTRUCTIONS, PASSWORD_INSTRUCTIONS} from "../constants/languages";
import {CHANGE_AUTH_DATA} from "../actions/auth/action";
import {startRequestLoading} from "../actions/request";
import CustomButton from "../components/CustomButton";
import { useFocusEffect } from '@react-navigation/native';

const SettingsScreen = () => {
	const dispatch = useDispatch();
	const { error, email, password, firstName, lastName, token } = useSelector(state => state.authReducer);
	const [newUserData, setNewUserData] = useState({firstName, lastName, password, email});

	const changeAuthData = (value, type) => {
		dispatch({ type: CHANGE_AUTH_DATA, payload: { [type]: value }});
	}

	const onGetUserSettings = async () => {
		dispatch(startRequestLoading(true));
		await dispatch(getUserSettingsRequest());
		dispatch(startRequestLoading(false));
	}

	useEffect(() => {
		if(token) {
			onGetUserSettings();
		}
	}, [token]);

	useFocusEffect(() => {
		return () => setNewUserData({});
	})

	const inputsValues = [
		{id: 0, type: 'firstName', text: firstName, errorType: FULL_NAME_INSTRUCTIONS},
		{id: 1, type: 'lastName', text: lastName, errorType: FULL_NAME_INSTRUCTIONS},
		{id: 2, type: 'email', text: email, errorType: EMAIL_INSTRUCTIONS},
		{id: 3, type: 'password', text: password, errorType: PASSWORD_INSTRUCTIONS},
	];

	const inputsComponent = inputsValues.map(item => {
		const secureTextEntry = item.type === 'password';
		return (
			<CustomInput
				secureTextEntry={secureTextEntry}
				key={item.id}
				isError={error === item.errorType}
				text={item.text}
				placeholder={item.type}
				onChange={(value) => changeAuthData(value, item.type)}
			/>
		)
	});



	return (
		<View style={styles.container}>
			<CustomFontText text='My settings' />
			{inputsComponent}
			<CustomButton disable={disabledButton} onPress={sendRegistrationData} text={languageWords.authorize} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});

export default SettingsScreen;