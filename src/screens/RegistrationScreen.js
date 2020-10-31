import React, { useEffect } from "react";
import {View, StyleSheet, TextInput} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "../components/CustomInput";
import {CHANGE_AUTH_DATA} from "../actions/auth/action";
import CustomButton from "../components/CustomButton";

const RegistrationScreen = () => {
	const dispatch = useDispatch();
	const { fullName, email, password } = useSelector(state => state.auth);
	const [name, surname] = fullName.split(' ');

	const changeAuthData = (value, type) => {
		dispatch({ type: CHANGE_AUTH_DATA, payload: { [type]: value }});
	}

	const inputsValues = [name, surname, email, password];

	const inputsComponent = inputsValues.map(item => {
		return <CustomInput key={item} text={item} onPress={(value) => changeAuthData(value, item)} />
	})

	return (
		<View style={styles.container}>
			{inputsComponent}
			<CustomButton onPress={sendAuthData} text={customTranslate('sendAuthData')} />
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

export default RegistrationScreen;