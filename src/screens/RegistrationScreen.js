import React, {useEffect} from "react";
import {View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "../components/CustomInput";
import {CHANGE_AUTH_DATA} from "../actions/auth/action";
import CustomButton from "../components/CustomButton";
import {useNavigation} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {registrationRequest} from "../actions/auth";
import {startRequestLoading} from "../actions/request";

const RegistrationScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const isRequestLoading = useSelector(state => state.request.isRequestLoading);
	const { email, password, firstName, lastName } = useSelector(state => state.auth);
	const languageWords = useSelector(state => state.language.languageWords);
	const token = useSelector(state => state.auth.token);

	const changeAuthData = (value, type) => {
		dispatch({ type: CHANGE_AUTH_DATA, payload: { [type]: value }});
	}

	const sendRegistrationData = async () => {
		if(!isRequestLoading) {
			dispatch(startRequestLoading(true));
			await dispatch(registrationRequest());
			dispatch(startRequestLoading(false));
		}
	}

	useEffect(() => {
		if(token) {
			navigation.push('Authorization');
		}
	}, [token]);

	const inputsValues = [
		{id: 0, type: 'firstName', text: firstName},
		{id: 1, type: 'lastName', text: lastName},
		{id: 2, type: 'email', text: email},
		{id: 3, type: 'password', text: password},
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

	return (
		<View style={styles.container}>
			<CustomFontText propsStyles={{color: 'black', marginBottom: 20}} text={languageWords.registration} />
			{inputsComponent}
			<CustomButton onPress={sendRegistrationData} text={languageWords.authorize} />
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