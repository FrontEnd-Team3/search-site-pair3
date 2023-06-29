import { styled } from "styled-components";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useWordList } from "context/targetwords";

const SearchBar = () => {
	const [isHistoryOpen, setIsHistoryOpen] = useState(false);
	// 검색어 창 닫힘 버튼
	const handleCloseHistory = () => {
		setIsHistoryOpen(false);
	};

	// change 이벤트 함수
	const [inputData, setInputData] = useState("");
	const handleInputData = e => {
		setText(e.target.value);
		setInputData(e.target.value);
	};

	// submit 이벤트 함수
	const { targetWords, setTargetWords } = useWordList();
	const handleTargetWords = e => {
		e.preventDefault();
		// Only when there is a search value
		if (inputData) {
			const newTargetWords = [...targetWords];
			newTargetWords.unshift(inputData);
			// Manage recent search word array
			if (newTargetWords.length >= 5) {
				setTargetWords(newTargetWords.slice(0, 5));
			} else {
				setTargetWords(newTargetWords);
			}
		}
		setInputData("");
	};

	// 검색 기록 배열 확인용
	useEffect(() => {
		console.log(targetWords);
	}, [targetWords]);

	// input 창에 보이는 글자 설정
	const [text, setText] = useState("");

	// 최근 검색어 개별 삭제
	const handleDeleteEachWord = target => {
		const newTargetWords = targetWords.filter(word => word !== target);
		setTargetWords(newTargetWords);
	};

	// 최근 검색어 전체 삭제
	const handleDeleteEveryWord = () => {
		setTargetWords([]);
	};

	// Debounce 기능
	const debounce = (func, delay) => {
		let timeoutId;
		return function (...args) {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				func.apply(this, args);
			}, delay);
		};
	};

	// Debounced version of handleInputData
	const handleDebouncedInputData = debounce(handleInputData, 300);

	return (
		<>
			<S.Container>
				<form name="value">
					<input
						placeholder="SEARCH"
						onClick={() => setIsHistoryOpen(true)}
						onChange={handleInputData}
						value={inputData} // Updated to inputData
					/>
					<IoIosCloseCircle
						className="close icon"
						onClick={handleCloseHistory}
					/>
					<button onClick={handleTargetWords}>
						<BsFillSearchHeartFill className="search-icon" />
					</button>
				</form>
			</S.Container>
			{isHistoryOpen && (
				<S.SearchHistory>
					<div>
						<span>최근 검색어</span>
						<span className="deleteAll" onClick={handleDeleteEveryWord}>
							전체 삭제
						</span>
					</div>
					<hr />
					<ul>
						{targetWords.map((word, i) => (
							<S.EachWord key={i}>
								{word}
								<AiOutlineCloseCircle
									className="delete-icon"
									onClick={() => handleDeleteEachWord(word)}
								/>
							</S.EachWord>
						))}
					</ul>
				</S.SearchHistory>
			)}
		</>
	);
};

export default SearchBar;

const Container = styled.div`
	border: 1px solid black;
	width: 650px;
	height: 60px;
	margin: 40px auto;
	display: flex;
	form {
		width: 650px;
		display: flex;
		justify-content: space-between;
		background-color: white;
		input {
			display: inline-block;
			border: none;
			outline: none;
			width: 550px;
			font-size: 20px;
			padding-left: 20px;
			font-family: "Rajdhani", sans-serif;
			font-weight: 100;
			letter-spacing: 5px;
		}
		.close-icon {
			width: 30px;
			height: 30px;
			margin-top: 15px;
			color: lightgray;
		}
	}

	button {
		background-color: white;
		border: none;
		width: 60px;
		.search-icon {
			width: 30px;
			height: 30px;
			color: #a252c8;
		}
	}
`;

const SearchHistory = styled.div`
	width: 645px;
	height: 300px;
	background-color: white;
	margin: -40px auto;
	padding: 20px;
	font-weight: 100;
	div {
		display: flex;
		justify-content: space-between;
		.deleteAll {
			font-size: 14px;
			color: gray;
		}
	}
`;

const EachWord = styled.li`
	font-size: 24px;
	font-weight: 100;
	margin: 20px 0;
	width: 600px;
	display: flex;
	justify-content: space-between;
	.delete-icon {
		width: 15px;
		height: 15px;
		margin-top: 5px;
		color: #a252c8;
	}
`;

const S = {
	Container,
	SearchHistory,
	EachWord,
};
