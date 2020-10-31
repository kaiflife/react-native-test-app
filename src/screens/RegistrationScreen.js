import React from "react";
import {View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "../components/CustomInput";
import {CHANGE_AUTH_DATA} from "../actions/auth/action";
import CustomButton from "../components/CustomButton";
import {useNavigation} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {registrationRequest} from "../actions/auth";
import {startRequestLoading} from "../actions/request";
import {EMAIL_INSTRUCTIONS, FULL_NAME_INSTRUCTIONS, PASSWORD_INSTRUCTIONS} from "../constants/languages";

const RegistrationScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const isRequestLoading = useSelector(state => state.request.isRequestLoading);
	const { email, password, firstName, lastName } = useSelector(state => state.auth);
	const languageWords = useSelector(state => state.language.languageWords);
	const error = useSelector(state => state.auth.error);

	const changeAuthData = (value, type) => {
		dispatch({ type: CHANGE_AUTH_DATA, payload: { [type]: value }});
	}

	const sendRegistrationData = async () => {
		if(!isRequestLoading) {
			dispatch(startRequestLoading(true));
			await dispatch(registrationRequest());
			dispatch(startRequestLoading(false));
			navigation.replace('Authorization');
		}
	}

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

	const disabledButton = !firstName.length || !lastName.length || !email.length || !password.length;

	return (
		<View style={styles.container}>
			<CustomFontText propsStyles={{color: 'black', marginBottom: 20}} text={languageWords.registration} />
			{inputsComponent}
			<CustomButton disable={disabledButton} onPress={sendRegistrationData} text={languageWords.authorize} />
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

export default RegistrationScreen;