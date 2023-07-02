import { useInputData } from "context/inputData";
import { styled } from "styled-components";

const SearchResultList = ({ selectedItem, searchedData, setSelectedItem }) => {
	const { inputData, setInputData } = useInputData();
	// 텍스트 하이라이트
	const highlightMatchedText = (text, keyword) => {
		const regex = new RegExp(`(${keyword})`, "gi");
		return text.replace(regex, "<span class='highlight'>$1</span>");
	};

	// 완전히 일치하는 단어가 있으면 보여주기
	let perfectMatch;
	if (searchedData) {
		perfectMatch = searchedData.find(word => word === inputData);
	}

	const handleMouseOver = index => {
		setSelectedItem(index);
	};

	const handleItemClick = data => {
		setInputData(data);
	};

	return (
		<>
			<S.SearchResults>
				{perfectMatch && (
					<S.OneSearched>
						<span className="highlight">{perfectMatch}</span>
					</S.OneSearched>
				)}
				{searchedData ? (
					<>
						<div>
							<span>추천 검색어</span>
						</div>
						<hr />
						{searchedData.map((data, index) => (
							<S.OneSearched
								key={index}
								selected={index === selectedItem}
								onMouseOver={() => handleMouseOver(index)}
								onClick={() => handleItemClick(data)}
							>
								<span
									dangerouslySetInnerHTML={{
										__html: highlightMatchedText(data, inputData),
									}}
								/>
							</S.OneSearched>
						))}
					</>
				) : (
					<NoResult>검색 결과가 없습니다.</NoResult>
				)}
			</S.SearchResults>
		</>
	);
};

export default SearchResultList;

const SearchResults = styled.div`
	width: 645px;
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

const OneSearched = styled.div`
	font-size: 24px;
	font-weight: 100;
	margin: 20px 0;
	padding: 10px;
	width: 600px;
	display: flex;
	justify-content: space-between;
	background-color: ${props => (props.selected ? "#a252c8" : "white")};
	background-color: ${props => (props.selected ? "#a252c8" : "white")};
	span.highlight {
		background-color: #ecdbf4;
	}
`;

const NoResult = styled.div`
	font-size: 24px;
	font-weight: 100;
	margin: 20px 0;
	padding: 10px;
	width: 600px;
`;

const S = {
	SearchResults,
	OneSearched,
	NoResult,
};
