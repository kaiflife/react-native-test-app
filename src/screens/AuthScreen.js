import React, {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {useNavigation} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {authRequest} from "../actions/auth";
import {startRequestLoading} from "../actions/request";
import {openErrorModal} from "../actions/modal";

const AuthScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [loginData, setLoginData] = useState({email: 'test@mail.ru', password: 'qwerty123XD'});
	const languageWords = useSelector(state => state.languageReducer.languageWords);
	const isRequestLoading = useSelector(state => state.requestReducer.isRequestLoading);
	const token = useSelector(state => state.authReducer.token);

	const changeAuthData = (value, type) => {
		setLoginData({...loginData, [type]: value});
	}

	const sendAuthData = async () => {
		if(!isRequestLoading) {
			dispatch(startRequestLoading(true));
			try {
				const { email, password } = loginData
				await dispatch(authRequest({email, password}));
			} catch (e) {
				dispatch(openErrorModal());
			}
			dispatch(startRequestLoading(false));
		}
	}

	useEffect(() => {
		if(token) {
			navigation.push('Boards', {screen: 'Boards'});
		}
	}, [token]);

	const inputsValues = [
		{id: 0, type: 'email', text: loginData.email},
		{id: 1, type: 'password', text: loginData.password}
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

	const disabledButton = !loginData.email.length || !loginData.password.length;

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