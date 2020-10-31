import React from "react";
import {View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "../components/CustomInput";
import {CHANGE_AUTH_DATA} from "../actions/auth/action";
import CustomButton from "../components/CustomButton";
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {clearAuthData, registrationRequest} from "../actions/auth";
import {startRequestLoading} from "../actions/request";
import {EMAIL_INSTRUCTIONS, FULL_NAME_INSTRUCTIONS, PASSWORD_INSTRUCTIONS} from "../constants/languages";
import {changeModalData} from "../actions/modal";

const RegistrationScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const isRequestLoading = useSelector(state => state.requestReducer.isRequestLoading);
	const { email, password, firstName, lastName } = useSelector(state => state.authReducer);
	const languageWords = useSelector(state => state.languageReducer.languageWords);
	const error = useSelector(state => state.authReducer.error);

	const changeAuthData = (value, type) => {
		dispatch({ type: CHANGE_AUTH_DATA, payload: { [type]: value }});
	}

	const sendRegistrationData = async () => {
		if(!isRequestLoading) {
			dispatch(startRequestLoading(true));
			let networkError;
			try {
				await dispatch(registrationRequest());
			} catch (e) {
				dispatch(changeModalData({
					hideTimer: 3,
					isOpenedModal: true,
					modalTitle: 'Error connection',
					modalText: 'Server is not responding',
				}));
				networkError = true;
			}
			dispatch(startRequestLoading(false));
			if(networkError) return;
			navigation.replace('Authorization');
		}
	}

	useFocusEffect(
		React.useCallback(() => {
			return () => {
				dispatch(clearAuthData());
			}
		}, [])
	);

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
			<CustomButton disable={disabledButton} onPress={sendRegistrationData} text={languageWords.signUp} />
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