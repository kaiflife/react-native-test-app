import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_AUTH_DATA} from "../actions/auth/action";
import CustomButton from "../components/CustomButton";
import {useNavigation} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {registrationRequest} from "../actions/auth";
import {startRequestLoading} from "../actions/request";
import {
	BOARD_NOT_FOUND,
	EMAIL_INSTRUCTIONS,
	FULL_NAME_INSTRUCTIONS,
	PASSWORD_INSTRUCTIONS
} from "../constants/languages";
import {createBoardRequest, getBoardsRequest} from "../actions/boards";
import {TouchableOpacity} from "react-native-web";

const BoardsScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const isRequestLoading = useSelector(state => state.request.isRequestLoading);
	const { email, password, firstName, lastName } = useSelector(state => state.auth);
	const boards = useSelector(state => state.boardsReducer.boards);
	const languageWords = useSelector(state => state.language.languageWords);
	const token = useSelector(state => state.auth.token);
	const error = useSelector(state => state.auth.error);

	useEffect(() => {
		if(token) {
			dispatch(getBoardsRequest());
		}
	}, [token]);

	const sendCreateRequest = async (payload) => {
		if(!isRequestLoading) {
			dispatch(startRequestLoading(true));
			await dispatch(createBoardRequest(payload));
			dispatch(startRequestLoading(false));
		}
	}

	const boardsComponents = boards.map(item => {
		const participantsCount = item.participantsId ? item.participantsId.length : 0;
		const ownersCount = item.ownersId ? item.ownersId.length : 0;
		const membersCount = participantsCount + ownersCount;
		return (
			<View>
				<TouchableOpacity onPress={() => navigation.push('Board')}>
					<CustomFontText text={item.title} />
					<View>
						<CustomFontText text={membersCount} />
						<CustomFontText text={participantsCount} />
						<CustomFontText text={ownersCount} />
					</View>
				</TouchableOpacity>
			</View>
		)
	});

	return (
		<ScrollView style={styles.container}>
			<CustomFontText propsStyles={{color: 'black', marginBottom: 20}} text={languageWords.registration} />
			{inputsComponent}
			<CustomButton onPress={sendRegistrationData} text={languageWords.authorize} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 40,
		flex: 1,
	}
});

export default BoardsScreen;