import { styled } from "styled-components";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";

const SearchBar = () => {
  const [isContainerOpen, setIsContainerOpen] = useState(false);

  // change 이벤트 함수
  const [inputData, setInputData] = useState("");

  const handleInputChange = async (e) => {
    setInputData(e.target.value);
  };

  return (
    <>
      <S.Container>
        <form name="value">
          <input
            placeholder="SEARCH..."
            onClick={() => setIsContainerOpen(true)}
            onChange={handleInputChange}
            value={inputData}
          />
          <IoIosCloseCircle
            className="close-icon"
            onClick={() => setIsContainerOpen(false)}
          />
          <button>
            <BsFillSearchHeartFill className="search-icon" />
          </button>
        </form>
      </S.Container>

      {isContainerOpen && (
        <S.SearchHistory>
          <div>
            <span>최근 검색어</span>
            <span>전체 삭제</span>
          </div>
          <hr />
          <ul></ul>
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
      :hover {
        opacity: 1;
        -webkit-animation: flash 1.5s;
        animation: flash 1.5s;
      }
      @-webkit-keyframes flash {
        0% {
          opacity: 0.4;
        }
        100% {
          opacity: 1;
        }
      }
      @keyframes flash {
        0% {
          opacity: 0.4;
        }
        100% {
          opacity: 1;
        }
      }
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
      &:hover {
        color: #a252c8;
        font-weight: bold;
      }
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
  width: 600px;
  display: flex;
  justify-content: space-between;
  span.highlight {
    background-color: #ecdbf4;
  }
`;

const S = {
  Container,
  SearchHistory,
  EachWord,
  SearchResults,
  OneSearched,
};
