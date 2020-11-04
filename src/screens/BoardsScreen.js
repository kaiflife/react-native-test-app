import React, {useCallback, useState} from "react";
import {View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {changeBoardsData, createBoardRequest, getBoardsRequest} from "../actions/boards";
import {changeModalData, closeModal, openErrorModal} from "../actions/modal";
import CustomButton from "../components/CustomButton";
import {generalStyles} from "../constants/theme";
import Gallery from "../components/Gallary";

const BoardsScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const { boardsType, invitesBoards, ownersBoards} = useSelector(state => state.boardsReducer);
	const languageWords = useSelector(state => state.languageReducer.languageWords);
	const currentTheme = useSelector(state => state.themeReducer.currentTheme);
	const accessToken = useSelector(state => state.authReducer.accessToken);

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
	}, [accessToken])

	useFocusEffect(onFocusBoards);

	const sendCreateRequest = async () => {
		setIsLoading(true);
		dispatch(changeModalData({isLoading: true}));
		await dispatch(createBoardRequest());
		await dispatch(getBoardsRequest());
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
			modalFooterStyles: {flexDirection: 'row', justifyContent: 'space-between', width: '100%'},
			footerButtons: [
				{text: 'create', onPress: async () => sendCreateRequest()},
				{text: 'cancel', onPress: () => onCloseModal()}
			],
		}));
	};

	const boardsTypeValues = boardsType === 'all' ? [...ownersBoards, ...invitesBoards] : 'owner' ? ownersBoards : invitesBoards;

	const selectBoard = (boardId) => {
		dispatch(changeBoardsData({selectedBoardId: boardId}))
		navigation.push('Board');
	}

	const boardsComponents = boardsTypeValues.map(item => {
		const participantsCount = item.participantsId ? item.participantsId.length : 0;
		const ownersCount = item.ownersId.length;
		const membersCount = participantsCount + ownersCount;
		return (
			<View style={{...generalStyles.boardItem, ...currentTheme.boardItem}} key={item.id}>
				<TouchableOpacity style={{flex: 1, width: '100%'}} onPress={() => selectBoard(item.id)}>
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
		<View style={styles.container}>
			<ScrollView style={{...styles.scrollViewContainer, ...currentTheme.boardsContainer}}>
				{(!!boardsComponents.length && <Gallery component={boardsComponents} />) || <CustomFontText propsStyles={currentTheme.noBoards} text={languageWords.noBoards} />}
			</ScrollView>
			<CustomButton text={languageWords.createBoard} onPress={openModal} />
		</View>

	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		justifyContent: 'space-between',
		height: '100%',
		width: '100%',
	},
	scrollViewContainer: {
		width: '100%',
	}
});

export default React.memo(BoardsScreen);