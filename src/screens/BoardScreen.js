import React, {useCallback, useState} from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from '@react-navigation/native';
import CustomFontText from "../components/CustomFontText";
import {createColumnRequest, getBoardsRequest} from "../actions/boards";
import {changeModalData, closeModal, openErrorModal} from "../actions/modal";
import CustomButton from "../components/CustomButton";
import {generalStyles} from "../constants/theme";
import Gallery from "../components/Gallary";
import CustomScrollView from "../components/CustomScrollView";
import CustomInput from "../components/CustomInput";

const BoardScreen = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [searchInputText, setSearchInputText] = useState('');
	const [searchedColumns, setSearchedColumns] = useState([]);
	const selectedBoardId = useSelector(state => state.boardsReducer.selectedBoardId);
	const { columns } = useSelector(state => state.boardsReducer);
	const languageWords = useSelector(state => state.languageReducer.languageWords);
	const currentTheme = useSelector(state => state.themeReducer.currentTheme);
	const accessToken = useSelector(state => state.authReducer.accessToken);

	const onGetBoards = async () => {
		console.log('getBoardRequest');
		try {
			await dispatch(getBoardsRequest(selectedBoardId));
		} catch (e) {
			dispatch(openErrorModal());
		}
	}

	const onFocusBoards = useCallback(() => {
		onGetBoards();
	}, [accessToken, selectedBoardId]);

	useFocusEffect(onFocusBoards);

	const sendCreateColumnRequest = async () => {
		setIsLoading(true);
		dispatch(changeModalData({isLoading: true}));
		await dispatch(createColumnRequest());
		await dispatch(getBoardsRequest(selectedBoardId));
		dispatch(closeModal());
		setIsLoading(false);
	}

	const onCloseModal = () => {
		dispatch(closeModal());
	}

	const openModal = () => {
		dispatch(changeModalData({
			isOpenedModal: true,
			modalTitle: 'createColumn',
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
				{text: 'create', onPress: async () => sendCreateColumnRequest()},
				{text: 'cancel', onPress: () => onCloseModal()}
			],
		}));
	};

	const onChangeSearchText = newSearchText => {
		setSearchedColumns(columns.filter(column => column.title.toLowerCase().includes(newSearchText.toLowerCase())));
		setSearchInputText(newSearchText);
	}
	
	const filteredColumns = !!searchInputText.length ? searchedColumns : columns;

	const columnsComponents = filteredColumns.map(item => {
		const participantsCount = item.participantsId ? item.participantsId.length : 0;
		const ownersCount = item.ownersId.length;
		const membersCount = `${languageWords.membersCount}: ${participantsCount + ownersCount}`;
		return (
			<View style={[generalStyles.boardItem, currentTheme.columnItem]} key={item.id}>
				<TouchableOpacity style={generalStyles.boardClickContainer}>
					<CustomFontText propsStyles={[generalStyles.boardTitle]} text={item.title} />
					<View>
						<CustomFontText text={membersCount} />
						<CustomFontText text={`${languageWords.participantsCount}: ${participantsCount}`} />
						<CustomFontText text={`${languageWords.ownersCount}: ${ownersCount}`} />
					</View>
				</TouchableOpacity>
			</View>
		);
	});

	const galleryComponent = <Gallery components={columnsComponents} noComponentsText='noColumns' />;

	return (
		<View style={styles.container}>
			<CustomInput propsStyles={{input: {marginBottom: 0}}} text={searchInputText} onChangeText={onChangeSearchText} placeholder={'Search by title'} />
			<View style={styles.boardsContainer}>
				<CustomScrollView component={galleryComponent} />
			</View>
			<CustomButton text={languageWords.createColumn} onPress={openModal} />
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
	boardsContainer: {
		height: '75%'
	},
});

export default React.memo(BoardScreen);