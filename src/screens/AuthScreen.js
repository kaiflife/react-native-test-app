import React, {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "../components/CustomInput";
import {AUTH_REQUEST, CHANGE_AUTH_DATA} from "../actions/auth/action";
import CustomButton from "../components/CustomButton";
import {useNavigation} from '@react-navigation/native';

const AuthScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const { email, password } = useSelector(state => state.auth);
	const languageWords = useSelector(state => state.language.languageWords);
	const token = useSelector(state => state.auth.token);

	const changeAuthData = (value, type) => {
		dispatch({ type: CHANGE_AUTH_DATA, payload: { [type]: value }});
	}

	const sendAuthData = async () => {
		if(!isLoading) {
			dispatch({ type: AUTH_REQUEST, payload: { email, password }});
			setIsLoading(true);
		}
	}

	useEffect(() => {
		setIsLoading(false);
		if(token) {
			navigation.push('Boards', {screen: 'Boards'});
		}
	}, [token]);

	const inputsValues = [email, password];
	const inputsComponent = inputsValues.map(item => {
		return <CustomInput key={item} text={item} onPress={(value) => changeAuthData(value, item)} />
	});

	return (
		<View style={styles.container}>
			{inputsComponent}
			<CustomButton onPress={sendAuthData} text={languageWords.authorize} />
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

export default AuthScreen;