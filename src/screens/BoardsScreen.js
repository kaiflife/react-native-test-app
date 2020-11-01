import React, {useEffect, useState} from "react";
import {View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {startRequestLoading} from "../actions/request";
import {createBoardRequest, getBoardsRequest} from "../actions/boards";
import CustomButton from "../components/CustomButton";
import {openErrorModal} from "../actions/modal";

const BoardsScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const isRequestLoading = useSelector(state => state.requestReducer.isRequestLoading);
	const boards = useSelector(state => state.boardsReducer.boards);
	const [isLoading, setIsLoading] = useState(false);
	const languageWords = useSelector(state => state.languageReducer.languageWords);
	const currentTheme = useSelector(state => state.themeReducer.currentTheme);
	const token = useSelector(state => state.authReducer.token);

	const onGetBoards = async () => {
		dispatch(startRequestLoading(true));
		try {
			await dispatch(getBoardsRequest());
		} catch (e) {
			dispatch(openErrorModal());
		}
		dispatch(startRequestLoading(false));
	}

	useEffect(() => {
			console.log('asd');
			// onGetBoards();
	}, []);

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
			<CustomFontText propsStyles={{color: 'black', marginBottom: 20}} text={languageWords.boards} />
			{(!!boardsComponents.length && boardsComponents) || <CustomFontText propsStyles={currentTheme.noBoards} text={languageWords.noBoards} />}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 40,
		flex: 1,
	}
});

export default React.memo(BoardsScreen);