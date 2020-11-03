import React, {useCallback, useState} from "react";
import {View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {createBoardRequest, getBoardsRequest} from "../actions/boards";
import {changeModalData, closeModal, openErrorModal} from "../actions/modal";
import CustomButton from "../components/CustomButton";

const BoardsScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const boards = useSelector(state => state.boardsReducer.boards);
	const languageWords = useSelector(state => state.languageReducer.languageWords);
	const currentTheme = useSelector(state => state.themeReducer.currentTheme);
	const token = useSelector(state => state.authReducer.token);

	const onGetBoards = async () => {
		console.log('getBoardsRequest');
		try {
			await dispatch(getBoardsRequest());
		} catch (e) {
			dispatch(openErrorModal());
		}
	}

	const onFocusBoards = useCallback(() => {
		onGetBoards();
	}, [token])

	useFocusEffect(onFocusBoards);

	const sendCreateRequest = async () => {
		setIsLoading(true);
		await dispatch(createBoardRequest());
		dispatch(closeModal());
		setIsLoading(false);
	}

	const onCloseModal = () => {
		dispatch(closeModal());
	}

	const openModal = () => {
		dispatch(changeModalData({
			isOpenedModal: true,
			modalTitle: 'createBoard',
			modalContainerStyles: {backgroundColor: 'white', padding: 40},
			modalInputsInfo: [
				{
					id: 0,
					isError: 'titleInstructions',
					placeholder: 'title',
					onChangeText: ({value, index}) => {
						dispatch(changeModalData({newInputInfo: {value, index}}))
					},
					value: '',
				},
			],
			modalButtonApply: {
				text: 'create',
				onPress: async (title) => sendCreateRequest(title)
			},
			modalButtonCancel: {
				text: 'cancel',
				onPress: () => onCloseModal()
			},
		}));
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
		);
	});


	return (
		<View>
			<ScrollView horizontal style={{...styles.container, ...currentTheme.boardsContainer}}>
				{(!!boardsComponents.length && boardsComponents) || <CustomFontText propsStyles={currentTheme.noBoards} text={languageWords.noBoards} />}
			</ScrollView>
			<CustomButton text={languageWords.createBoard} onPress={openModal} />
		</View>

	);
};

const styles = StyleSheet.create({
	container: {
		padding: 40,
		flex: 1,
	}
});

export default React.memo(BoardsScreen);