import React, { useState } from "react";
import {View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {useNavigation} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {registrationRequest} from "../actions/auth";
import {
	EMAIL_INSTRUCTIONS,
	FULL_NAME_INSTRUCTIONS,
	PASSWORD_INSTRUCTIONS,
} from "../constants/languages";
import {openErrorModal} from "../actions/modal";

const RegistrationScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [registerData, setRegisterData] = useState({
		email: 'test@mail.ru', password: 'qwerty123XD', firstName: 'pavel', lastName: 'petrunkin'
	});
	const languageWords = useSelector(state => state.languageReducer.languageWords);
	const error = useSelector(state => state.authReducer.error);

	const onChangeAuthData = (value, type) => {
		setRegisterData({...registerData, [type]: value})
	}

	const sendRegistrationData = async () => {
		let result;
		const fullName = `${registerData.firstName} ${registerData.lastName}`;
		const { email, password } = registerData;
		try {
			setIsLoading(true);
			result = await dispatch(registrationRequest({email, password, fullName}));
		} catch (e) {
			dispatch(openErrorModal());
			result = null;
		}
		setIsLoading(false);
		if(!result) return;
		navigation.goBack();
	}

	const inputsValues = [
		{id: 0, type: 'firstName', text: registerData.firstName, errorType: FULL_NAME_INSTRUCTIONS},
		{id: 1, type: 'lastName', text: registerData.lastName, errorType: FULL_NAME_INSTRUCTIONS},
		{id: 2, type: 'email', text: registerData.email, errorType: EMAIL_INSTRUCTIONS},
		{id: 3, type: 'password', text: registerData.password, errorType: PASSWORD_INSTRUCTIONS},
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
				onChange={(value) => onChangeAuthData(value, item.type)}
			/>
		)
	});

	const disabledButton = isLoading && (!registerData.firstName.length || !registerData.lastName.length
		|| !registerData.email.length || !registerData.password.length);

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