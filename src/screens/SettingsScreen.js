import React, { useEffect, useState, useCallback } from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import CustomFontText from "../components/CustomFontText";
import CustomInput from "../components/CustomInput";
import {useDispatch, useSelector} from "react-redux";
import {EMAIL_INSTRUCTIONS, FULL_NAME_INSTRUCTIONS, PASSWORD_INSTRUCTIONS} from "../constants/languages";
import CustomButton from "../components/CustomButton";
import {clearAuthData, getUserDataRequest, updateUserDataRequest} from "../actions/auth";
import {useFocusEffect} from "@react-navigation/native";

const SettingsScreen = () => {
	const dispatch = useDispatch();
	const languageWords = useSelector(state => state.languageReducer.languageWords);
	const { error, email, password, firstName, lastName, token } = useSelector(state => state.authReducer);
	const [newUserData, setNewUserData] = useState({
		email: '', password: '', firstName: '', lastName: ''
	});

	const changeAuthData = (value, type) => {
		setNewUserData({
			...newUserData,
			[type]: value,
		})
	}

	const initialRequests = async () => {
		await dispatch(getUserDataRequest());
	};

	const onFocusBoards = useCallback(() => {
		initialRequests();
	}, [token])

	useFocusEffect(onFocusBoards);

	const onSaveData = async () => {
		await dispatch(updateUserDataRequest(newUserData));
	};

	const onLogout = useCallback(() => {
		dispatch(clearAuthData());
	}, [token]);

	const inputsValues = [
		{id: 0, type: 'firstName', text: newUserData.firstName || firstName, errorType: FULL_NAME_INSTRUCTIONS},
		{id: 1, type: 'lastName', text: newUserData.lastName || lastName, errorType: FULL_NAME_INSTRUCTIONS},
		{id: 2, type: 'email', text: newUserData.email || email, errorType: EMAIL_INSTRUCTIONS},
		{id: 3, type: 'password', text: newUserData.password || password, errorType: PASSWORD_INSTRUCTIONS},
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
				onChangeText={(value) => changeAuthData(value, item.type)}
			/>
		)
	});

	const disabledButton = !newUserData.lastName || !newUserData.firstName || !newUserData.password || !newUserData.email;

	return (
		<View style={styles.container}>
			<CustomFontText text='My settings' />
			<ScrollView>
				<View>
					{inputsComponent}
					<CustomButton disable={disabledButton} onPress={onSaveData} text={languageWords.authorize} />
				</View>
				<CustomButton text={languageWords.logout} onPress={onLogout} />
			</ScrollView>
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